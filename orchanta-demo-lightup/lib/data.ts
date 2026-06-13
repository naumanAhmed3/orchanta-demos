// Fictional sample data for the demo (Beispieldaten). No real Lightup customers.
// Plans mirror the kind of products a German/Swiss telecom full-service provider sells:
// SIP trunks, business DSL, hosted PBX.

export type PlanKind = "voice" | "data";

export interface Plan {
  /** Display name, e.g. "SIP-Trunk 10" */
  name: string;
  /** Short English subtitle shown under the German plan name */
  subtitle: string;
  /** Voice plans allocate a number block; data plans allocate a line/port. */
  kind: PlanKind;
  /** One-off setup fee in euro cents (net) */
  setupCents: number;
  /** Monthly recurring fee in euro cents (net) */
  monthlyCents: number;
  /** Label for the monthly line item on the invoice preview */
  monthlyLabel: string;
}

export interface Customer {
  /** Internal customer number, e.g. "K-1041" */
  id: string;
  name: string;
  city: string;
  plan: Plan;
  /**
   * The resource the allocation step assigns — fixed per customer so the
   * pipeline is fully deterministic (no randomness anywhere).
   */
  resource: string;
  /** German label for that resource ("Rufnummernblock" / "Leitungskennung") */
  resourceLabel: string;
}

export const PLANS = {
  sipTrunk10: {
    name: "SIP-Trunk 10",
    subtitle: "VoIP trunk, 10 channels",
    kind: "voice",
    setupCents: 4900,
    monthlyCents: 8900,
    monthlyLabel: "Monatsentgelt SIP-Trunk, 10 Sprachkanäle",
  },
  sipTrunk30: {
    name: "SIP-Trunk 30",
    subtitle: "VoIP trunk, 30 channels",
    kind: "voice",
    setupCents: 4900,
    monthlyCents: 18900,
    monthlyLabel: "Monatsentgelt SIP-Trunk, 30 Sprachkanäle",
  },
  dsl100: {
    name: "DSL 100",
    subtitle: "Business DSL 100/40 Mbit/s",
    kind: "data",
    setupCents: 9900,
    monthlyCents: 5490,
    monthlyLabel: "Monatsentgelt DSL 100/40, Business-SLA",
  },
  hostedPbx8: {
    name: "Hosted PBX 8",
    subtitle: "Cloud phone system, 8 extensions",
    kind: "voice",
    setupCents: 7900,
    monthlyCents: 6320,
    monthlyLabel: "Monatsentgelt Hosted PBX, 8 Nebenstellen",
  },
} as const satisfies Record<string, Plan>;

export const CUSTOMERS: Customer[] = [
  {
    id: "K-1041",
    name: "Stadtwerke Musterhausen GmbH",
    city: "Musterhausen",
    plan: PLANS.sipTrunk10,
    resource: "+49 69 91004 10-0 … -29",
    resourceLabel: "Rufnummernblock",
  },
  {
    id: "K-1042",
    name: "Kanzlei Weber & Brandt",
    city: "Frankfurt am Main",
    plan: PLANS.hostedPbx8,
    resource: "+49 69 91004 20-0 … -19",
    resourceLabel: "Rufnummernblock",
  },
  {
    id: "K-1043",
    name: "Hotel Rheinblick",
    city: "Bonn",
    plan: PLANS.dsl100,
    resource: "DSL-BN-004310 · Port 7/12",
    resourceLabel: "Leitungskennung",
  },
  {
    id: "K-1044",
    name: "TechWerk Zürich AG",
    city: "Zürich",
    plan: PLANS.sipTrunk30,
    resource: "+41 44 5550 44-0 … -49",
    resourceLabel: "Rufnummernblock",
  },
];

/**
 * The one-paragraph spec the provisioning slice on this page was built from.
 * Shown verbatim in the "Von der Idee zur Spezifikation" strip.
 */
export const SPEC_PARAGRAPH =
  "Ein Bestandskunde wählt einen Tarif (SIP-Trunk, DSL oder Hosted PBX). Ein Klick auf " +
  "„Service provisionieren“ startet eine vierstufige Pipeline — validieren, Nummer/Leitung " +
  "zuweisen, aktivieren, benachrichtigen — mit nachvollziehbarem Protokoll je Schritt. Nach " +
  "Abschluss wechselt der Servicestatus auf „Aktiv“ und eine Rechnungsvorschau (netto, zzgl. " +
  "19 % USt.) wird erzeugt. Vollständig deterministisch, ohne Backend; alle Daten sind " +
  "Beispieldaten.";
