"use client";

import { useMemo, useState } from "react";
import { AS_OF, LENDERS, checksum, parseTape } from "../lib/data";
import { classifyReply, type ClassifyResult } from "../lib/classify";
import ImportPanel from "./ImportPanel";
import CaseDetail from "./CaseDetail";
import ActivityLog from "./ActivityLog";

export type AuditEntry = {
  n: number;
  ts: string;
  batch: string;
  result: string;
  actor: string;
};

export type EventEntry = {
  seq: number;
  ts: string;
  type: string;
  message: string;
  lender_id: string;
};

type TenantState = {
  imported: boolean;
  importCount: number;
  audit: AuditEntry[];
  events: EventEntry[];
  classification: ClassifyResult | null;
  caseStatus: string;
  actionApplied: boolean;
};

function freshTenant(initialStatus: string): TenantState {
  return {
    imported: false,
    importCount: 0,
    audit: [],
    events: [],
    classification: null,
    caseStatus: initialStatus,
    actionApplied: false,
  };
}

/** Simulated session clock — deterministic: 09:02:14 + 41s per event. */
function simClock(seq: number): string {
  let s = 9 * 3600 + 2 * 60 + 14 + seq * 41;
  const h = Math.floor(s / 3600);
  s -= h * 3600;
  const m = Math.floor(s / 60);
  const sec = s - m * 60;
  const pad = (x: number) => String(x).padStart(2, "0");
  return `${pad(h)}:${pad(m)}:${pad(sec)}`;
}

export default function CopilotApp() {
  const [activeId, setActiveId] = useState(LENDERS[0].id);
  const [seq, setSeq] = useState(0);
  const [tenants, setTenants] = useState<Record<string, TenantState>>(() =>
    Object.fromEntries(LENDERS.map((l) => [l.id, freshTenant(l.caseFile.initial_status)])),
  );

  const lender = LENDERS.find((l) => l.id === activeId)!;
  const tenant = tenants[activeId];
  const rows = useMemo(() => parseTape(lender.csv), [lender.csv]);
  const batch = useMemo(() => checksum(lender.csv), [lender.csv]);

  function patch(update: (t: TenantState, ts: string) => Partial<TenantState>) {
    const ts = simClock(seq);
    setSeq(seq + 1);
    setTenants((prev) => ({ ...prev, [activeId]: { ...prev[activeId], ...update(prev[activeId], ts) } }));
  }

  function importTape() {
    patch((t, ts) => {
      const n = t.importCount + 1;
      const first = !t.imported;
      const result = first
        ? `${rows.length} new, 0 unchanged — tape loaded`
        : `0 new, ${rows.length} unchanged — duplicate import detected, no-op`;
      const audit: AuditEntry = { n, ts, batch, result, actor: "ops@" + activeId.replace("ln_", "") };
      const event: EventEntry = {
        seq,
        ts,
        type: first ? "tape.import.completed" : "tape.import.duplicate_skipped",
        message: first
          ? `Loan tape imported — ${rows.length} rows written (batch ${batch})`
          : `Duplicate tape rejected — batch ${batch} already applied, no rows written`,
        lender_id: activeId,
      };
      return {
        imported: true,
        importCount: n,
        audit: [...t.audit, audit],
        events: [event, ...t.events],
      };
    });
  }

  function classify() {
    patch((t, ts) => {
      const result = classifyReply(lender.caseFile.reply.body, AS_OF);
      const event: EventEntry = {
        seq,
        ts,
        type: "case.reply.classified",
        message: `Reply on ${lender.caseFile.loan_id} classified — intent=${result.intent} (confidence ${result.confidence.toFixed(2)})`,
        lender_id: activeId,
      };
      return { classification: result, events: [event, ...t.events] };
    });
  }

  function applyNextAction() {
    patch((t, ts) => {
      if (!t.classification || t.actionApplied) return {};
      const event: EventEntry = {
        seq,
        ts,
        type: "case.status.changed",
        message: `${lender.caseFile.loan_id} status: “${t.caseStatus}” → “${lender.caseFile.resolved_status}” (action ${t.classification.next_action})`,
        lender_id: activeId,
      };
      return {
        caseStatus: lender.caseFile.resolved_status,
        actionApplied: true,
        events: [event, ...t.events],
      };
    });
  }

  return (
    <div className="mx-auto max-w-[1180px] px-4 pb-10 sm:px-6">
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pine font-display text-[15px] font-bold text-sage">
            SC
          </div>
          <div>
            <div className="font-display text-[19px] font-semibold leading-tight text-pine">
              Servicing Copilot
            </div>
            <div className="text-[11px] text-mute">
              trial scope, working — an Orchanta concept for Readi Financial
            </div>
          </div>
          <span className="ml-1 rounded-full border border-line bg-paper px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-mute">
            concept
          </span>
        </div>

        {/* Lender switcher — multi-tenant by lender_id */}
        <div className="flex items-center gap-3">
          <div className="flex rounded-lg border border-line bg-paper p-0.5">
            {LENDERS.map((l) => (
              <button
                key={l.id}
                onClick={() => setActiveId(l.id)}
                className={`rounded-md px-3 py-1.5 text-[12.5px] font-semibold transition-colors ${
                  l.id === activeId ? "bg-pine text-sage" : "text-mute hover:text-ink"
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>
          <span className="hidden rounded-md bg-sage px-2 py-1 font-mono text-[11px] text-pine sm:inline">
            lender_id: {activeId}
          </span>
        </div>
      </header>

      {/* Scope + sample-data strip */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-line bg-paper px-3.5 py-2.5 text-[12px]">
        <div className="text-mute">
          <span className="font-semibold text-ink">Trial scope:</span> idempotent tape import
          · case detail · structured reply classification · event-driven activity log.
          Switch lenders above — every panel is isolated per tenant.
        </div>
        <div className="rounded-md bg-warn-soft px-2 py-0.5 font-semibold text-warn">
          Sample data — all borrowers fictional · deterministic demo, no live calls
        </div>
      </div>

      {/* Main grid */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-4">
          <ImportPanel
            key={`import-${activeId}`}
            lender={lender}
            rows={rows}
            batch={batch}
            asOf={AS_OF}
            imported={tenant.imported}
            audit={tenant.audit}
            onImport={importTape}
          />
          <CaseDetail
            key={`case-${activeId}`}
            lender={lender}
            rows={rows}
            imported={tenant.imported}
            classification={tenant.classification}
            caseStatus={tenant.caseStatus}
            actionApplied={tenant.actionApplied}
            onClassify={classify}
            onApply={applyNextAction}
          />
        </div>
        <ActivityLog events={tenant.events} lenderId={activeId} />
      </div>
    </div>
  );
}
