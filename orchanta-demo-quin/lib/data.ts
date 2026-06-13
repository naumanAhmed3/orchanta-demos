// Sample dataset for the demo — ALL FICTIONAL. One tenant (user u_0042),
// twelve transactions across Apr–Jun 2026. Amounts are integer cents
// (never floats for money). StreamMax's price rises two months in a row —
// the creep the agent is meant to catch. CloudVault rises once (below the
// consecutive-increase threshold) and FitPass is flat, so the detector has
// something to correctly reject, not just something to find.

export interface Transaction {
  /** Stable row id, as it would come back from Postgres. */
  id: string;
  /** Multi-tenant scope — every row in every table carries user_id. */
  user_id: string;
  /** ISO date the transaction posted. */
  posted_at: string;
  merchant: string;
  category: "salary" | "rent" | "groceries" | "subscription";
  /** Integer cents. Positive = inflow, negative = outflow. */
  amount_cents: number;
}

export const DEMO_USER_ID = "u_0042";

/** Newest first, the way a feed reads. */
export const TRANSACTIONS: Transaction[] = [
  { id: "txn_012", user_id: DEMO_USER_ID, posted_at: "2026-06-09", merchant: "FitPass Gym", category: "subscription", amount_cents: -2900 },
  { id: "txn_011", user_id: DEMO_USER_ID, posted_at: "2026-06-07", merchant: "CloudVault", category: "subscription", amount_cents: -549 },
  { id: "txn_010", user_id: DEMO_USER_ID, posted_at: "2026-06-05", merchant: "StreamMax", category: "subscription", amount_cents: -1699 },
  { id: "txn_009", user_id: DEMO_USER_ID, posted_at: "2026-06-03", merchant: "FreshMart", category: "groceries", amount_cents: -8640 },
  { id: "txn_008", user_id: DEMO_USER_ID, posted_at: "2026-06-01", merchant: "Oakline Apartments", category: "rent", amount_cents: -145000 },
  { id: "txn_007", user_id: DEMO_USER_ID, posted_at: "2026-06-01", merchant: "Acme Corp Payroll", category: "salary", amount_cents: 420000 },
  { id: "txn_006", user_id: DEMO_USER_ID, posted_at: "2026-05-12", merchant: "FreshMart", category: "groceries", amount_cents: -11275 },
  { id: "txn_005", user_id: DEMO_USER_ID, posted_at: "2026-05-09", merchant: "FitPass Gym", category: "subscription", amount_cents: -2900 },
  { id: "txn_004", user_id: DEMO_USER_ID, posted_at: "2026-05-07", merchant: "CloudVault", category: "subscription", amount_cents: -499 },
  { id: "txn_003", user_id: DEMO_USER_ID, posted_at: "2026-05-05", merchant: "StreamMax", category: "subscription", amount_cents: -1499 },
  { id: "txn_002", user_id: DEMO_USER_ID, posted_at: "2026-04-18", merchant: "FreshMart", category: "groceries", amount_cents: -9520 },
  { id: "txn_001", user_id: DEMO_USER_ID, posted_at: "2026-04-05", merchant: "StreamMax", category: "subscription", amount_cents: -1299 },
];

/** Format integer cents as a signed dollar string for the feed. */
export function formatCents(cents: number): string {
  const sign = cents < 0 ? "−" : "+";
  const abs = Math.abs(cents);
  const dollars = Math.floor(abs / 100).toLocaleString("en-US");
  const rem = String(abs % 100).padStart(2, "0");
  return `${sign}$${dollars}.${rem}`;
}

// ---------------------------------------------------------------------------
// Data-layer sketch shown in the sidebar — the three tables this slice needs
// in Supabase/Postgres. Every table is tenant-scoped by user_id (RLS).
// ---------------------------------------------------------------------------

export interface TableSketch {
  name: string;
  note: string;
  columns: { name: string; type: string }[];
}

export const SCHEMA: TableSketch[] = [
  {
    name: "transactions",
    note: "append-only ledger; money as integer cents",
    columns: [
      { name: "id", type: "uuid pk" },
      { name: "user_id", type: "uuid → auth.users" },
      { name: "posted_at", type: "date" },
      { name: "merchant", type: "text" },
      { name: "category", type: "text" },
      { name: "amount_cents", type: "bigint" },
    ],
  },
  {
    name: "subscriptions",
    note: "derived by the observe step; one row per recurring merchant",
    columns: [
      { name: "id", type: "uuid pk" },
      { name: "user_id", type: "uuid → auth.users" },
      { name: "merchant", type: "text" },
      { name: "cadence", type: "text" },
      { name: "current_cents", type: "int" },
      { name: "prev_cents", type: "int" },
      { name: "last_seen", type: "date" },
    ],
  },
  {
    name: "agent_actions",
    note: "every proposal persisted; nothing executes without approval",
    columns: [
      { name: "id", type: "uuid pk" },
      { name: "user_id", type: "uuid → auth.users" },
      { name: "run_id", type: "uuid" },
      { name: "contract", type: "text" },
      { name: "payload", type: "jsonb" },
      { name: "status", type: "proposed | approved | dismissed" },
      { name: "approved_at", type: "timestamptz" },
    ],
  },
];
