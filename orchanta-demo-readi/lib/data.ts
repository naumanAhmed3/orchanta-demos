/**
 * Sample data for the Servicing Copilot concept.
 * ALL borrowers, lenders, loans and amounts are FICTIONAL (demo-scale,
 * shaped like Ontario private first mortgages). No real PII.
 */

export const AS_OF = "2026-06-10"; // fixed "today" for the deterministic demo

export type PaymentStatus = "current" | "late" | "NSF";

export type TapeRow = {
  loan_id: string;
  borrower: string;
  property_city: string;
  principal_balance: number;
  rate: number;
  payment_status: PaymentStatus;
  renewal_date: string;
};

export type TimelineEntry = { date: string; label: string };

export type CaseFile = {
  loan_id: string;
  borrower: string;
  monthly_payment: number;
  initial_status: string;
  resolved_status: string; // status after the classified next action is applied
  timeline: TimelineEntry[];
  reply: { from: string; received: string; subject: string; body: string };
};

export type Lender = {
  id: string; // tenant key: lender_id
  name: string;
  csv: string;
  caseFile: CaseFile;
};

/* ---------- tiny CSV parser (the table really is parsed from the tape) ---------- */

export function parseTape(csv: string): TapeRow[] {
  const [header, ...lines] = csv.trim().split("\n");
  const cols = header.split(",");
  return lines.map((line) => {
    const cells = line.split(",");
    const rec: Record<string, string> = {};
    cols.forEach((c, i) => (rec[c.trim()] = (cells[i] ?? "").trim()));
    return {
      loan_id: rec.loan_id,
      borrower: rec.borrower,
      property_city: rec.property_city,
      principal_balance: Number(rec.principal_balance),
      rate: Number(rec.rate),
      payment_status: rec.payment_status as PaymentStatus,
      renewal_date: rec.renewal_date,
    };
  });
}

/* ---------- deterministic batch checksum (djb2 → hex) for idempotency ---------- */

export function checksum(text: string): string {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = ((h << 5) + h + text.charCodeAt(i)) >>> 0;
  return h.toString(16).padStart(8, "0");
}

/* ---------- helpers ---------- */

export function daysFrom(asOf: string, iso: string): number {
  return Math.round(
    (Date.parse(iso + "T00:00:00Z") - Date.parse(asOf + "T00:00:00Z")) / 86400000,
  );
}

export const cad = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 0,
});

export function fmtDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso + "T00:00:00Z"));
}

/* ---------- Lender A — Maplegate Capital (fictional) ---------- */

const maplegateCsv = `loan_id,borrower,property_city,principal_balance,rate,payment_status,renewal_date
MG-1041,Tess Testwell,Hamilton,412000,8.99,NSF,2026-08-01
MG-1042,Stu Stubbins,Barrie,287500,9.49,current,2026-11-15
MG-1043,Faye Fakener,Oshawa,533250,8.99,current,2027-01-31
MG-1044,Sam Sampleton,London,364000,9.25,late,2026-07-12
MG-1045,Dana Demoore,Kitchener,451800,8.99,NSF,2026-09-30
MG-1046,Pat Placewell,St. Catharines,298000,9.75,current,2026-12-01
MG-1047,Mo Mockley,Windsor,512400,8.99,current,2027-02-28
MG-1048,Finn Fixture,Sudbury,389900,9.49,current,2026-07-31`;

const maplegateCase: CaseFile = {
  loan_id: "MG-1041",
  borrower: "Tess Testwell",
  monthly_payment: 3090,
  initial_status: "Open — NSF follow-up",
  resolved_status: "PTP scheduled — recheck Jun 12",
  timeline: [
    { date: "2026-06-01", label: "Pre-authorized debit of $3,090 returned — EFT return code 901 (NSF)" },
    { date: "2026-06-03", label: "NSF notice emailed to borrower (template nsf_first_notice_v2)" },
    { date: "2026-06-10", label: "Inbound borrower reply received — awaiting triage" },
  ],
  reply: {
    from: "t.testwell@sample-mail.test",
    received: "2026-06-10",
    subject: "Re: Missed payment on your mortgage — MG-1041",
    body:
      "Hi — I saw the June payment came back NSF and I’m sorry about that. My pay came in late this month. I can pay half ($1,545) this Friday and the rest by the 26th. I want to keep this on track, please don’t start anything formal.",
  },
};

/* ---------- Lender B — Birchline Lending (fictional) ---------- */

const birchlineCsv = `loan_id,borrower,property_city,principal_balance,rate,payment_status,renewal_date
BL-2207,Barb Borrowman,Guelph,605000,8.99,current,2026-10-15
BL-2208,Cal Casefile,Brampton,718200,8.99,NSF,2026-08-20
BL-2209,Nora Notreal,Kingston,342750,9.49,current,2027-03-01
BL-2210,Gus Givensample,Whitby,489000,9.25,current,2026-12-20
BL-2211,Ida Imaginary,Cambridge,276400,9.75,late,2026-07-05
BL-2212,Rex Redacted,Thunder Bay,331000,9.49,NSF,2027-01-10
BL-2213,Liv Loremfield,Ottawa,564300,8.99,current,2026-09-01
BL-2214,Ty Templeman,Niagara Falls,415750,9.25,current,2026-07-22`;

const birchlineCase: CaseFile = {
  loan_id: "BL-2208",
  borrower: "Cal Casefile",
  monthly_payment: 5381,
  initial_status: "Open — NSF follow-up",
  resolved_status: "On hold — verifying payment",
  timeline: [
    { date: "2026-06-01", label: "Pre-authorized debit of $5,381 returned — EFT return code 901 (NSF)" },
    { date: "2026-06-02", label: "NSF notice emailed to borrower (template nsf_first_notice_v2)" },
    { date: "2026-06-10", label: "Inbound borrower reply received — awaiting triage" },
  ],
  reply: {
    from: "cal.casefile@sample-mail.test",
    received: "2026-06-10",
    subject: "Re: Missed payment on your mortgage — BL-2208",
    body:
      "This must be a bank error — I already sent the e-transfer on Monday and I have confirmation #ET-99412 from my bank. Please check on your side before charging me an NSF fee.",
  },
};

export const LENDERS: Lender[] = [
  { id: "ln_maplegate", name: "Maplegate Capital", csv: maplegateCsv, caseFile: maplegateCase },
  { id: "ln_birchline", name: "Birchline Lending", csv: birchlineCsv, caseFile: birchlineCase },
];
