"use client";

import { useMemo, useState } from "react";
import { areas, bedroomOptions, propertyTypes, contracts, estimate, gbp } from "../lib/estimator";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-medium text-mute">{label}</span>
      {children}
    </label>
  );
}

const selectCls =
  "w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none focus:border-teal";

export default function Estimator() {
  const [area, setArea] = useState("ne1");
  const [bedroom, setBedroom] = useState("2");
  const [type, setType] = useState("flat");
  const [furnished, setFurnished] = useState(true);
  const [contract, setContract] = useState("3");

  const r = useMemo(() => estimate({ area, bedroom, type, furnished, contract }), [area, bedroom, type, furnished, contract]);
  const better = r.annualDiff >= 0;

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-paper shadow-sm md:grid-cols-2">
      {/* inputs */}
      <div className="border-b border-line p-6 md:border-b-0 md:border-r">
        <h3 className="font-display text-[22px] font-semibold text-ink">Your guaranteed rent</h3>
        <p className="mt-1 text-[13px] text-mute">Tell us about the property — get an indicative monthly figure instantly.</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <Field label="Area">
              <select className={selectCls} value={area} onChange={(e) => setArea(e.target.value)}>
                {areas.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Bedrooms">
            <select className={selectCls} value={bedroom} onChange={(e) => setBedroom(e.target.value)}>
              {bedroomOptions.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
            </select>
          </Field>
          <Field label="Property type">
            <select className={selectCls} value={type} onChange={(e) => setType(e.target.value)}>
              {propertyTypes.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
            </select>
          </Field>
          <Field label="Contract length">
            <select className={selectCls} value={contract} onChange={(e) => setContract(e.target.value)}>
              {contracts.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </Field>
          <div className="flex items-end">
            <button
              onClick={() => setFurnished((v) => !v)}
              className={`flex w-full items-center justify-between rounded-lg border px-3 py-2.5 text-[14px] transition-colors ${furnished ? "border-teal bg-teal-soft text-teal-deep" : "border-line bg-paper text-mute"}`}
            >
              Furnished
              <span className={`grid h-5 w-9 items-center rounded-full px-0.5 ${furnished ? "bg-teal" : "bg-line"}`}>
                <span className={`h-4 w-4 rounded-full bg-white transition-transform ${furnished ? "translate-x-4" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* result */}
      <div className="bg-ink p-6 text-paper">
        <div className="text-[12px] uppercase tracking-wide text-gold">Indicative guaranteed rent</div>
        <div className="mt-1 flex items-end gap-2">
          <span className="font-display text-[46px] font-bold leading-none text-paper">{gbp(r.guaranteed)}</span>
          <span className="mb-1 text-[14px] text-soft">/ month</span>
        </div>
        <div className="mt-1 text-[12px] text-soft">
          Fixed every month for {contracts.find((c) => c.id === contract)!.label.toLowerCase()} · zero voids · zero fees
        </div>

        <div className="mt-5 space-y-2 border-t border-line-dark pt-4 text-[13px]">
          <div className="flex items-center justify-between">
            <span className="text-soft">Standard letting (after a void + fees)</span>
            <span className="text-paper">{gbp(r.standardNetAnnual)}/yr net</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-soft">PPP guaranteed (gross = net)</span>
            <span className="text-paper">{gbp(r.pppNetAnnual)}/yr</span>
          </div>
        </div>

        {better && (
          <div className="mt-4 rounded-xl bg-teal/15 px-4 py-3 text-center">
            <span className="font-display text-[24px] font-semibold text-teal">+{gbp(r.annualDiff)} a year</span>
            <span className="block text-[12px] text-soft">more in your pocket — guaranteed, with none of the hassle</span>
          </div>
        )}

        <a href="#appraisal" className="mt-4 block rounded-lg bg-gold py-3 text-center text-[14px] font-semibold text-ink transition-colors hover:bg-gold-deep">
          Lock this in — book a free appraisal
        </a>
        <p className="mt-2 text-center text-[11px] text-soft">
          Indicative only, based on Newcastle market rents. Your exact figure is confirmed after a free appraisal.
        </p>
      </div>
    </div>
  );
}
