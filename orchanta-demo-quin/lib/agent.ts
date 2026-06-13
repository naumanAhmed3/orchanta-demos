// One agent slice, end to end: observe → detect → decide → act.
//
// Everything here is pure and deterministic — no network, no model call.
// The point is the shape, not the inference: each step consumes and emits a
// *typed contract* (TransactionWindow, Finding, ActionProposal, ActionDraft),
// the same contract-first approach Quin's production loop would use, with the
// types living in a shared contracts repo, the loop running on FastAPI,
// state in Supabase/Postgres, and Groq doing inference inside `detect`.
// Swap the detector for a model and nothing else changes shape.

import { Transaction } from "./data";

// ---------------------------------------------------------------------------
// Contracts — in production these are the shared TS types the API speaks.
// ---------------------------------------------------------------------------

/** observe → what the agent loaded: a tenant-scoped window of transactions. */
export interface TransactionWindow {
  contract: "TransactionWindow";
  user_id: string;
  from: string;
  to: string;
  txn_count: number;
  inflow_cents: number;
  outflow_cents: number;
  recurring_merchants: string[];
}

/** detect → one evidenced anomaly, plus what was checked and cleared. */
export interface Finding {
  contract: "Finding";
  kind: "subscription_creep";
  user_id: string;
  merchant: string;
  /** Month-by-month price trail backing the call. */
  evidence: { posted_at: string; amount_cents: number }[];
  consecutive_increases: number;
  total_increase_pct: number;
  cleared: { merchant: string; reason: string }[];
}

/** decide → a structured proposal; the agent never acts on prose. */
export interface ActionProposal {
  contract: "ActionProposal";
  user_id: string;
  action: "cancel_or_downgrade";
  merchant: string;
  est_monthly_savings_cents: number;
  est_annual_savings_cents: number;
  confidence: number;
  requires_user_approval: true;
  rationale: string;
}

/** act → the drafted action, persisted and parked until the user approves. */
export interface ActionDraft {
  contract: "ActionDraft";
  user_id: string;
  run_id: string;
  type: "downgrade_request";
  merchant: string;
  draft: string;
  status: "awaiting_user_approval";
}

export type StepPhase = "observe" | "detect" | "decide" | "act";

/** One rendered step of the plan: a label plus its structured output. */
export interface AgentStep {
  phase: StepPhase;
  contractName: "TransactionWindow" | "Finding" | "ActionProposal" | "ActionDraft";
  title: string;
  summary: string;
  output: TransactionWindow | Finding | ActionProposal | ActionDraft;
}

// ---------------------------------------------------------------------------
// The loop. Each step is a small pure function; runAgent chains them.
// ---------------------------------------------------------------------------

/** Step 1 — observe: summarize the window the agent is allowed to see. */
function observe(txns: Transaction[]): TransactionWindow {
  const dates = txns.map((t) => t.posted_at).sort();
  const recurring = [...new Set(txns.filter((t) => t.category === "subscription").map((t) => t.merchant))].sort();
  return {
    contract: "TransactionWindow",
    user_id: txns[0].user_id,
    from: dates[0],
    to: dates[dates.length - 1],
    txn_count: txns.length,
    inflow_cents: txns.filter((t) => t.amount_cents > 0).reduce((s, t) => s + t.amount_cents, 0),
    outflow_cents: txns.filter((t) => t.amount_cents < 0).reduce((s, t) => s + Math.abs(t.amount_cents), 0),
    recurring_merchants: recurring,
  };
}

/**
 * Step 2 — detect: subscription creep. A merchant is flagged only when its
 * price rose two months in a row; a single bump or a flat price is cleared.
 * This rule is computed from the data, not hardcoded to a merchant — and in
 * production this is the one step a Groq-served model augments.
 */
function detect(txns: Transaction[], window: TransactionWindow): Finding {
  let flagged: { merchant: string; trail: Transaction[]; streak: number } | null = null;
  const cleared: Finding["cleared"] = [];

  for (const merchant of window.recurring_merchants) {
    const trail = txns
      .filter((t) => t.merchant === merchant)
      .sort((a, b) => a.posted_at.localeCompare(b.posted_at));
    // Count consecutive month-over-month price increases (outflows compared by magnitude).
    let streak = 0;
    for (let i = 1; i < trail.length; i++) {
      if (Math.abs(trail[i].amount_cents) > Math.abs(trail[i - 1].amount_cents)) streak += 1;
      else streak = 0;
    }
    if (streak >= 2 && (!flagged || streak > flagged.streak)) {
      flagged = { merchant, trail, streak };
    } else {
      cleared.push({
        merchant,
        reason: streak === 1 ? "one increase only — watching, not flagging" : "price stable across the window",
      });
    }
  }

  // The dataset guarantees one creeping subscription; guard anyway.
  if (!flagged) throw new Error("detect: no subscription creep in window");

  const first = Math.abs(flagged.trail[0].amount_cents);
  const last = Math.abs(flagged.trail[flagged.trail.length - 1].amount_cents);
  return {
    contract: "Finding",
    kind: "subscription_creep",
    user_id: window.user_id,
    merchant: flagged.merchant,
    evidence: flagged.trail.map((t) => ({ posted_at: t.posted_at, amount_cents: Math.abs(t.amount_cents) })),
    consecutive_increases: flagged.streak,
    total_increase_pct: Math.round(((last - first) / first) * 1000) / 10,
    cleared,
  };
}

/** Step 3 — decide: turn the finding into a structured, costed proposal. */
function decide(finding: Finding): ActionProposal {
  const first = finding.evidence[0].amount_cents;
  const last = finding.evidence[finding.evidence.length - 1].amount_cents;
  const monthly = last - first; // what reverting the creep saves each month
  return {
    contract: "ActionProposal",
    user_id: finding.user_id,
    action: "cancel_or_downgrade",
    merchant: finding.merchant,
    est_monthly_savings_cents: monthly,
    est_annual_savings_cents: monthly * 12,
    confidence: 0.92,
    requires_user_approval: true,
    rationale: `${finding.merchant} rose ${finding.consecutive_increases} months in a row (+${finding.total_increase_pct}% across the window).`,
  };
}

/** Step 4 — act: draft the action and park it. The user has the last word. */
function act(proposal: ActionProposal): ActionDraft {
  return {
    contract: "ActionDraft",
    user_id: proposal.user_id,
    run_id: "run_2026_06_12_001", // fixed for the demo; uuid in production
    type: "downgrade_request",
    merchant: proposal.merchant,
    draft: `Downgrade ${proposal.merchant} to the Standard plan and undo two months of price creep (saves ~$${(proposal.est_annual_savings_cents / 100).toFixed(2)}/yr).`,
    status: "awaiting_user_approval",
  };
}

/** Run the whole plan over a transaction window. Pure in, steps out. */
export function runAgent(txns: Transaction[]): AgentStep[] {
  const window = observe(txns);
  const finding = detect(txns, window);
  const proposal = decide(finding);
  const draft = act(proposal);

  return [
    {
      phase: "observe",
      contractName: "TransactionWindow",
      title: "Load the transaction window",
      summary: `${window.txn_count} transactions, ${window.from} → ${window.to}, ${window.recurring_merchants.length} recurring merchants.`,
      output: window,
    },
    {
      phase: "detect",
      contractName: "Finding",
      title: "Scan recurring spend for creep",
      summary: `${finding.merchant} rose ${finding.consecutive_increases} months in a row (+${finding.total_increase_pct}%); ${finding.cleared.length} merchants checked and cleared.`,
      output: finding,
    },
    {
      phase: "decide",
      contractName: "ActionProposal",
      title: "Propose a structured action",
      summary: `Cancel or downgrade ${proposal.merchant} — est. $${(proposal.est_annual_savings_cents / 100).toFixed(2)}/yr back.`,
      output: proposal,
    },
    {
      phase: "act",
      contractName: "ActionDraft",
      title: "Draft the action, wait for the human",
      summary: `Downgrade request drafted for ${draft.merchant}. Nothing executes until it is approved.`,
      output: draft,
    },
  ];
}
