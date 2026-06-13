// Sample data for the Record OS Self Assessment prototype (built by Orchanta).
// All data is fictional and clearly sample. UK rules for the 2024/25 tax year.

export const taxYear = "2024/25";

export const taxpayer = {
  name: "Priya Sharma",
  trade: "Freelance brand & web designer",
  basis: "Sole trader (SA103)",
  utr: "•••• ••• 4471",
  bank: "Starling Bank",
};

export const TAX = {
  personalAllowance: 12570,
  basicRateLimit: 50270, // income tax basic-rate band top
  basicRate: 0.2,
  higherRate: 0.4,
  class4Lower: 12570,
  class4Upper: 50270,
  class4MainRate: 0.06, // 2024/25 main Class 4 rate
  class4UpperRate: 0.02,
  homeOfficeSimplified: 312, // HMRC simplified use-of-home, £26/mo (25+ hrs)
};

export type TxType = "income" | "expense";
export type Category =
  | "Design income"
  | "Software"
  | "Equipment"
  | "Premises"
  | "Travel"
  | "Professional fees"
  | "Phone & internet"
  | "Subsistence";

export interface Tx {
  id: string;
  date: string; // DD MMM YYYY
  desc: string;
  amount: number; // positive = money in, negative = money out
  type: TxType;
  category: Category;
  allowable: boolean; // for expenses: claimable against trade profit
  reason: string; // the AI's one-line justification
  flag?: "disallow"; // expense the AI excluded as not wholly & exclusively for trade
}

export const transactions: Tx[] = [
  // ── Income: client invoices (open-banking import) ──
  { id: "t01", date: "14 May 2024", desc: "Northwind Studios — brand identity", amount: 6500, type: "income", category: "Design income", allowable: true, reason: "Client invoice paid — trading income." },
  { id: "t02", date: "11 Jun 2024", desc: "Studio Vale — illustration set", amount: 2900, type: "income", category: "Design income", allowable: true, reason: "Client invoice paid — trading income." },
  { id: "t03", date: "02 Jul 2024", desc: "Acme Co — website build", amount: 4200, type: "income", category: "Design income", allowable: true, reason: "Client invoice paid — trading income." },
  { id: "t04", date: "27 Aug 2024", desc: "Tide & Co — packaging design", amount: 3600, type: "income", category: "Design income", allowable: true, reason: "Client invoice paid — trading income." },
  { id: "t05", date: "19 Sep 2024", desc: "Leeds City Council — campaign", amount: 3800, type: "income", category: "Design income", allowable: true, reason: "Client invoice paid — trading income." },
  { id: "t06", date: "08 Nov 2024", desc: "Finch & Co — Q3 retainer", amount: 7200, type: "income", category: "Design income", allowable: true, reason: "Client invoice paid — trading income." },
  { id: "t07", date: "15 Dec 2024", desc: "Meridian — landing pages", amount: 4600, type: "income", category: "Design income", allowable: true, reason: "Client invoice paid — trading income." },
  { id: "t08", date: "22 Jan 2025", desc: "Harbour Health — app UI", amount: 5400, type: "income", category: "Design income", allowable: true, reason: "Client invoice paid — trading income." },
  { id: "t09", date: "18 Feb 2025", desc: "Oakfield School — prospectus", amount: 2400, type: "income", category: "Design income", allowable: true, reason: "Client invoice paid — trading income." },
  { id: "t10", date: "03 Mar 2025", desc: "Bramble Coffee — rebrand", amount: 3100, type: "income", category: "Design income", allowable: true, reason: "Client invoice paid — trading income." },

  // ── Allowable business expenses ──
  { id: "t11", date: "06 Apr 2024", desc: "Adobe Creative Cloud — annual", amount: -735.6, type: "expense", category: "Software", allowable: true, reason: "Design tooling — wholly & exclusively for the trade." },
  { id: "t12", date: "06 Apr 2024", desc: "Figma — annual plan", amount: -144, type: "expense", category: "Software", allowable: true, reason: "Design tooling — allowable." },
  { id: "t13", date: "20 May 2024", desc: "Apple — MacBook Pro 14″", amount: -2499, type: "expense", category: "Equipment", allowable: true, reason: "Capital equipment — fully relievable under the Annual Investment Allowance." },
  { id: "t14", date: "30 Apr 2024", desc: "Huckletree — coworking desk (12 mo)", amount: -2160, type: "expense", category: "Premises", allowable: true, reason: "Business premises cost — allowable." },
  { id: "t15", date: "14 Oct 2024", desc: "Trainline — client travel", amount: -612, type: "expense", category: "Travel", allowable: true, reason: "Travel to clients — allowable (not ordinary commuting)." },
  { id: "t16", date: "06 Apr 2024", desc: "Krystal — hosting & domains", amount: -138, type: "expense", category: "Software", allowable: true, reason: "Hosting for the business — allowable." },
  { id: "t17", date: "28 Feb 2025", desc: "Bell & Co — accountancy", amount: -600, type: "expense", category: "Professional fees", allowable: true, reason: "Accountancy fees — allowable." },
  { id: "t18", date: "Monthly", desc: "Mobile — business share", amount: -204, type: "expense", category: "Phone & internet", allowable: true, reason: "Business proportion of phone — allowable." },

  // ── Flagged: looks personal, excluded ──
  { id: "t19", date: "09 Sep 2024", desc: "The Ivy — lunch with a friend", amount: -86, type: "expense", category: "Subsistence", allowable: false, reason: "Not wholly & exclusively for the trade — excluded from allowable expenses.", flag: "disallow" },
];
