"use client";

// The centerpiece: select a fictional customer, click "Service provisionieren",
// watch the deterministic 4-step pipeline run (validate → allocate → activate →
// notify), then see the status flip to "Aktiv" and a simulated invoice preview.
// All content is precomputed from lib/provision.ts; only the reveal is timed.

import { useEffect, useMemo, useRef, useState } from "react";
import { CUSTOMERS, type Customer } from "@/lib/data";
import { formatEUR, invoiceFor, pipelineFor } from "@/lib/provision";

/** Milliseconds between step completions during the animated reveal. */
const STEP_MS = 600;

type RunState = "idle" | "running" | "done";

function StatusBadge({ customer, provisioned, runningId }: {
  customer: Customer;
  provisioned: boolean;
  runningId: string | null;
}) {
  if (provisioned) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-ok-soft px-2 py-0.5 text-[11px] font-semibold text-ok">
        <span aria-hidden="true">●</span> Aktiv
      </span>
    );
  }
  if (runningId === customer.id) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-orange-soft px-2 py-0.5 text-[11px] font-semibold text-orange-deep">
        <span aria-hidden="true">●</span> Läuft…
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blau-soft px-2 py-0.5 text-[11px] font-semibold text-blau">
      <span aria-hidden="true">●</span> Bereit
    </span>
  );
}

export function ProvisioningConsole() {
  const [selectedId, setSelectedId] = useState(CUSTOMERS[0].id);
  const [runState, setRunState] = useState<RunState>("idle");
  const [doneSteps, setDoneSteps] = useState(0);
  const [provisionedIds, setProvisionedIds] = useState<readonly string[]>([]);
  const timersRef = useRef<number[]>([]);

  const selected = CUSTOMERS.find((c) => c.id === selectedId) ?? CUSTOMERS[0];
  const steps = useMemo(() => pipelineFor(selected), [selected]);
  const invoice = useMemo(() => invoiceFor(selected), [selected]);

  const isRunning = runState === "running";
  const isDone = runState === "done";
  const alreadyActive = provisionedIds.includes(selected.id);

  // Clear any pending reveal timers on unmount.
  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  function clearTimers() {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  }

  function selectCustomer(id: string) {
    if (isRunning || id === selectedId) return;
    clearTimers();
    setSelectedId(id);
    setRunState(provisionedIds.includes(id) ? "done" : "idle");
    setDoneSteps(provisionedIds.includes(id) ? 4 : 0);
  }

  function startProvisioning() {
    if (isRunning || alreadyActive) return;
    clearTimers();
    setRunState("running");
    setDoneSteps(0);
    // Tick one step green every STEP_MS; flip to done after the last one.
    steps.forEach((_, i) => {
      timersRef.current.push(
        window.setTimeout(() => {
          setDoneSteps(i + 1);
          if (i === steps.length - 1) {
            setRunState("done");
            setProvisionedIds((prev) => prev.includes(selectedId) ? prev : [...prev, selectedId]);
          }
        }, STEP_MS * (i + 1)),
      );
    });
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
      {/* Left: customer table + action */}
      <div className="rounded-xl border border-line bg-paper p-5 shadow-sm">
        <div className="mb-3 flex items-baseline justify-between gap-2">
          <h2 className="text-[15px] font-bold text-ink">
            Kunden <span className="ml-1 text-[12px] font-medium text-steel">Customers · fiktiv</span>
          </h2>
          <span className="text-[11px] font-medium text-steel">4 Datensätze</span>
        </div>
        <table className="w-full border-collapse text-left text-[13px]">
          <thead>
            <tr className="border-b border-line text-[11px] uppercase tracking-wide text-steel">
              <th className="py-2 pr-2 font-semibold" scope="col">Kunde</th>
              <th className="py-2 pr-2 font-semibold" scope="col">Tarif</th>
              <th className="py-2 font-semibold" scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => {
              const isSelected = c.id === selectedId;
              return (
                <tr
                  key={c.id}
                  onClick={() => selectCustomer(c.id)}
                  className={`cursor-pointer border-b border-line transition-colors last:border-b-0 ${
                    isSelected ? "bg-blau-soft" : "hover:bg-mist"
                  }`}
                >
                  <td className="py-2.5 pr-2">
                    <label className="flex cursor-pointer items-start gap-2">
                      <input
                        type="radio"
                        name="customer"
                        checked={isSelected}
                        onChange={() => selectCustomer(c.id)}
                        disabled={isRunning}
                        className="mt-0.5 accent-(--color-blau)"
                        aria-label={`${c.name} auswählen`}
                      />
                      <span>
                        <span className="block font-semibold text-ink">{c.name}</span>
                        <span className="block text-[11px] text-mute">{c.id} · {c.city}</span>
                      </span>
                    </label>
                  </td>
                  <td className="py-2.5 pr-2">
                    <span className="block font-medium text-blau">{c.plan.name}</span>
                    <span className="block text-[11px] text-mute">{c.plan.subtitle}</span>
                  </td>
                  <td className="py-2.5">
                    <StatusBadge
                      customer={c}
                      provisioned={provisionedIds.includes(c.id)}
                      runningId={isRunning ? selectedId : null}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={startProvisioning}
            disabled={isRunning || alreadyActive}
            className="rounded-lg bg-blau px-4 py-2 text-[13px] font-bold text-paper transition-colors hover:bg-blau-deep disabled:cursor-not-allowed disabled:opacity-45"
          >
            Service provisionieren
          </button>
          <span className="text-[11px] text-mute">
            {alreadyActive
              ? `${selected.plan.name} für ${selected.name} ist aktiv.`
              : isRunning
                ? "Pipeline läuft — jeder Schritt protokolliert."
                : `Startet die Pipeline für ${selected.name}.`}
          </span>
        </div>
      </div>

      {/* Right: pipeline + log + invoice preview */}
      <div className="flex flex-col gap-5">
        <div className="rounded-xl border border-line bg-paper p-5 shadow-sm">
          <h2 className="mb-3 text-[15px] font-bold text-ink">
            Pipeline <span className="ml-1 text-[12px] font-medium text-steel">validate → allocate → activate → notify</span>
          </h2>
          <ol className="space-y-2.5">
            {steps.map((step, i) => {
              const stepDone = doneSteps > i;
              const stepActive = isRunning && doneSteps === i;
              return (
                <li key={step.id} className="flex items-center gap-2.5">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                      stepDone
                        ? "bg-ok text-paper"
                        : stepActive
                          ? "bg-orange text-paper"
                          : "bg-mist text-steel"
                    }`}
                    aria-hidden="true"
                  >
                    {stepDone ? "✓" : i + 1}
                  </span>
                  <span className="text-[13px]">
                    <span className={`font-semibold ${stepDone ? "text-ok" : stepActive ? "text-orange-deep" : "text-ink"}`}>
                      {step.labelDe}
                    </span>
                    <span className="ml-1.5 text-[11px] text-steel">{step.labelEn}</span>
                  </span>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 rounded-lg bg-ink p-3 font-mono text-[11.5px] leading-relaxed text-paper/90" aria-live="polite">
            {doneSteps === 0 ? (
              <p className="text-paper/50">
                $ Bereit. Kunde wählen und „Service provisionieren“ klicken.
              </p>
            ) : (
              steps.slice(0, doneSteps).map((step) => (
                <p key={step.id} className="fade-up">
                  <span className="text-ok">✓</span> {step.log}
                </p>
              ))
            )}
          </div>
        </div>

        {isDone && (
          <div className="fade-up rounded-xl border border-line bg-paper p-5 shadow-sm">
            <div className="mb-3 flex items-baseline justify-between gap-2">
              <h2 className="text-[15px] font-bold text-ink">Rechnungsvorschau</h2>
              <span className="rounded-full bg-orange-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-deep">
                Simuliert · Beispieldaten
              </span>
            </div>
            <p className="mb-3 text-[12px] text-mute">
              {selected.name} · Kundennr. {selected.id} · {selected.city}
            </p>
            <dl className="space-y-1.5 text-[13px]">
              {invoice.lines.map((line) => (
                <div key={line.label} className="flex justify-between gap-4">
                  <dt className="text-ink">{line.label}</dt>
                  <dd className="font-mono text-ink">{formatEUR(line.amountCents)}</dd>
                </div>
              ))}
              <div className="flex justify-between gap-4 border-t border-line pt-1.5">
                <dt className="text-mute">Zwischensumme (netto)</dt>
                <dd className="font-mono text-mute">{formatEUR(invoice.netCents)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-mute">USt. 19 %</dt>
                <dd className="font-mono text-mute">{formatEUR(invoice.vatCents)}</dd>
              </div>
              <div className="flex justify-between gap-4 border-t border-line pt-1.5 text-[14px] font-bold">
                <dt className="text-ink">Gesamtbetrag (brutto)</dt>
                <dd className="font-mono text-blau">{formatEUR(invoice.grossCents)}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
