// tax.ts — the demo's "intelligence": categorise transactions and compute the UK Self
// Assessment (SA103) for a sole trader. Deterministic (reliable, no API key, accurate to
// 2024/25 rules). PRODUCTION NOTE: in a live build the categorisation step maps onto an LLM
// (Claude via @ai-sdk/anthropic) reading each transaction; the computation stays rules-based.
import { TAX, transactions, type Tx } from "./data";

export function gbp(n: number): string {
  return "£" + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export interface Computation {
  turnover: number;
  allowableExpenses: number;
  homeOffice: number;
  totalExpenses: number;
  netProfit: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: number;
  class4: number;
  class2: number;
  totalDue: number;
  effectiveRate: number;
}

export function compute(txs: Tx[], claimHomeOffice: boolean): Computation {
  const turnover = txs.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const allowableExpenses = txs
    .filter((t) => t.type === "expense" && t.allowable)
    .reduce((s, t) => s + Math.abs(t.amount), 0);
  const homeOffice = claimHomeOffice ? TAX.homeOfficeSimplified : 0;
  const totalExpenses = allowableExpenses + homeOffice;
  const netProfit = Math.max(0, turnover - totalExpenses);

  const taxableIncome = Math.max(0, netProfit - TAX.personalAllowance);
  const basicBand = TAX.basicRateLimit - TAX.personalAllowance;
  const basicPortion = Math.min(taxableIncome, basicBand);
  const higherPortion = Math.max(0, taxableIncome - basicBand);
  const incomeTax = basicPortion * TAX.basicRate + higherPortion * TAX.higherRate;

  const class4Main = Math.max(0, Math.min(netProfit, TAX.class4Upper) - TAX.class4Lower) * TAX.class4MainRate;
  const class4Upper = Math.max(0, netProfit - TAX.class4Upper) * TAX.class4UpperRate;
  const class4 = class4Main + class4Upper;
  const class2 = 0; // 2024/25: not due above the small-profits threshold (treated as paid)

  const totalDue = incomeTax + class4 + class2;
  return {
    turnover, allowableExpenses, homeOffice, totalExpenses, netProfit,
    personalAllowance: TAX.personalAllowance, taxableIncome,
    incomeTax, class4, class2, totalDue,
    effectiveRate: netProfit > 0 ? totalDue / netProfit : 0,
  };
}

// The streamed "Record AI" review reasoning (deterministic, derived from the data).
export function reviewSteps(): string[] {
  const income = transactions.filter((t) => t.type === "income");
  const expenses = transactions.filter((t) => t.type === "expense");
  const allowable = expenses.filter((t) => t.allowable);
  const disallowed = expenses.filter((t) => t.flag === "disallow");
  const turnover = income.reduce((s, t) => s + t.amount, 0);
  return [
    `Imported ${transactions.length} transactions from ${"Starling Bank"} via open banking for the ${"2024/25"} year…`,
    `Matched ${income.length} client payments to Design income — turnover ${gbp(turnover)}.`,
    `Categorised ${allowable.length} business costs against the “wholly & exclusively for the trade” test, including the MacBook under the Annual Investment Allowance.`,
    `Flagged “${disallowed[0]?.desc}” (${gbp(Math.abs(disallowed[0]?.amount || 0))}) as personal — excluded from allowable expenses.`,
    `Missed relief: you work 25+ hours a month from home but haven’t claimed use-of-home. HMRC’s simplified rate is ${gbp(TAX.homeOfficeSimplified)} for the year.`,
    `Drafted the SA103 self-employment pages and computed the return — ready for your review.`,
  ];
}

export const homeOfficeSuggestion = {
  amount: TAX.homeOfficeSimplified,
  label: "Use of home (simplified)",
  detail: "£26/month flat rate for 25+ hours a month worked from home — no receipts needed.",
};
