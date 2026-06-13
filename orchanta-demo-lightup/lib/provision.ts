// Pure, deterministic provisioning logic — no I/O, no randomness, no Date.now().
// Given the same customer, these functions always return the same pipeline and
// the same invoice. The UI only animates the *reveal*; the content is fixed.

import type { Customer } from "./data";

export interface PipelineStep {
  /** Stable key, e.g. "validate" */
  id: string;
  /** German step label (primary) */
  labelDe: string;
  /** English subtitle */
  labelEn: string;
  /** The log line printed when the step completes */
  log: string;
}

/**
 * Build the 4-step provisioning pipeline for a customer:
 * validate → allocate number/line → activate → notify.
 * Every log line is derived only from the customer record.
 */
export function pipelineFor(customer: Customer): PipelineStep[] {
  const { id, name, plan, resource, resourceLabel } = customer;

  const activateLog =
    plan.kind === "voice"
      ? `Trunk registriert (SIP/UDP, Registrar sbc1.fra.beispiel.net) · 200 OK`
      : `Port aktiviert · Sync 100/40 Mbit/s stabil · Latenz 9 ms`;

  return [
    {
      id: "validate",
      labelDe: "Validieren",
      labelEn: "Validate",
      log: `Kundendatensatz ${id} (${name}) geprüft · Tarif „${plan.name}“ freigegeben`,
    },
    {
      id: "allocate",
      labelDe: "Nummer/Leitung zuweisen",
      labelEn: "Allocate number/line",
      log: `${resourceLabel} zugewiesen: ${resource}`,
    },
    {
      id: "activate",
      labelDe: "Aktivieren",
      labelEn: "Activate",
      log: activateLog,
    },
    {
      id: "notify",
      labelDe: "Benachrichtigen",
      labelEn: "Notify",
      log: `Kunde benachrichtigt (E-Mail, simuliert) · Auftrag ${id}-P1 abgeschlossen`,
    },
  ];
}

export interface InvoiceLine {
  label: string;
  amountCents: number;
}

export interface Invoice {
  lines: InvoiceLine[];
  netCents: number;
  vatCents: number; // 19 % German VAT (USt.)
  grossCents: number;
}

/** German VAT rate applied to the simulated invoice preview. */
export const VAT_RATE = 0.19;

/**
 * Build the simulated invoice preview for a freshly provisioned service:
 * one-off setup fee + first monthly fee, then net / 19 % VAT / gross.
 * VAT is rounded to the nearest cent; gross = net + VAT (no double rounding).
 */
export function invoiceFor(customer: Customer): Invoice {
  const { plan } = customer;
  const lines: InvoiceLine[] = [
    { label: `Einrichtung ${plan.name} (einmalig)`, amountCents: plan.setupCents },
    { label: plan.monthlyLabel, amountCents: plan.monthlyCents },
  ];
  const netCents = lines.reduce((sum, line) => sum + line.amountCents, 0);
  const vatCents = Math.round(netCents * VAT_RATE);
  return { lines, netCents, vatCents, grossCents: netCents + vatCents };
}

/**
 * Format euro cents as German currency text, e.g. 18900 → "189,00 €".
 * Hand-rolled (instead of Intl) so output is byte-identical everywhere.
 */
export function formatEUR(cents: number): string {
  const euros = Math.floor(cents / 100);
  const rest = Math.abs(cents % 100).toString().padStart(2, "0");
  const grouped = euros.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${grouped},${rest} €`;
}
