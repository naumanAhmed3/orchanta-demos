/**
 * Deterministic mock classifier.
 * Stands in for one LLM call with structured output (e.g. JSON schema /
 * tool-call response). Same input → same output, every time: keyword
 * signals decide the intent, and amount/date are genuinely extracted
 * from the reply text. No network, no keys.
 */

export type Intent = "promise_to_pay" | "payment_dispute" | "hardship" | "unclear";

export type Classification = {
  intent: Intent;
  amount: number | null;
  date: string | null;
  confidence: number;
  next_action: string;
};

export type ClassifyResult = Classification & { evidence: string[] };

const WEEKDAYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const PROMISE_SIGNALS = ["can pay", "will pay", "i’ll pay", "rest by", "keep this on track"];
const DISPUTE_SIGNALS = ["bank error", "already sent", "already paid", "confirmation #", "e-transfer", "please check"];
const HARDSHIP_SIGNALS = ["lost my job", "laid off", "can’t pay", "cannot pay"];

const NEXT_ACTION: Record<Intent, string> = {
  promise_to_pay: "schedule_ptp_followup",
  payment_dispute: "hold_nsf_fee_and_verify_payment",
  hardship: "escalate_to_workout_review",
  unclear: "queue_for_human_review",
};

function matches(text: string, signals: string[]): string[] {
  return signals.filter((s) => text.includes(s));
}

/** Resolve a weekday word to an ISO date relative to `asOf` (UTC math, deterministic). */
function resolveWeekday(name: string, asOf: string, dir: "next" | "prev"): string {
  const target = WEEKDAYS.indexOf(name);
  const d = new Date(asOf + "T00:00:00Z");
  if (dir === "next") {
    let delta = (target - d.getUTCDay() + 7) % 7;
    if (delta === 0) delta = 7;
    d.setUTCDate(d.getUTCDate() + delta);
  } else {
    let back = (d.getUTCDay() - target + 7) % 7;
    if (back === 0) back = 7;
    d.setUTCDate(d.getUTCDate() - back);
  }
  return d.toISOString().slice(0, 10);
}

export function classifyReply(body: string, asOf: string): ClassifyResult {
  const text = body.toLowerCase();

  const promise = matches(text, PROMISE_SIGNALS);
  const dispute = matches(text, DISPUTE_SIGNALS);
  const hardship = matches(text, HARDSHIP_SIGNALS);

  let intent: Intent = "unclear";
  let evidence: string[] = [];
  if (hardship.length >= 1 && hardship.length >= promise.length) {
    intent = "hardship";
    evidence = hardship;
  } else if (dispute.length > promise.length) {
    intent = "payment_dispute";
    evidence = dispute;
  } else if (promise.length >= 1) {
    intent = "promise_to_pay";
    evidence = promise;
  }

  // Amount: first $-figure in the reply.
  const amountMatch = text.match(/\$\s?(\d[\d,]*(?:\.\d{1,2})?)/);
  const amount = amountMatch ? Number(amountMatch[1].replace(/,/g, "")) : null;

  // Date: first weekday word — forward-looking for a promise, backward for a dispute.
  const weekdayMatch = text.match(/\b(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/);
  const date = weekdayMatch
    ? resolveWeekday(weekdayMatch[1], asOf, intent === "payment_dispute" ? "prev" : "next")
    : null;

  // Deterministic confidence: base + signal strength + extraction bonuses.
  const confidence =
    intent === "unclear"
      ? 0.4
      : Math.round(
          (0.7 + 0.05 * Math.min(evidence.length, 3) + (amount !== null ? 0.04 : 0) + (date ? 0.03 : 0)) * 100,
        ) / 100;

  return { intent, amount, date, confidence, next_action: NEXT_ACTION[intent], evidence };
}
