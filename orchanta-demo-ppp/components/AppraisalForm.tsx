"use client";

import { useState } from "react";

const input = "w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-[14px] text-ink outline-none focus:border-teal";

export default function AppraisalForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="fade-up rounded-2xl border border-teal/30 bg-teal-soft p-6 text-center">
        <div className="font-display text-[22px] font-semibold text-teal-deep">Thanks — request received</div>
        <p className="mt-2 text-[14px] text-mute">
          We will be in touch within one working day to arrange your free, no-obligation appraisal and confirm your guaranteed monthly figure.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-2xl border border-line bg-paper p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input className={input} placeholder="Your name" aria-label="Your name" required />
        <input className={input} type="email" placeholder="Email" aria-label="Email" required />
        <input className={input} placeholder="Property postcode" aria-label="Property postcode" required />
        <select className={input} aria-label="Bedrooms" defaultValue="">
          <option value="" disabled>Bedrooms</option>
          <option>Studio</option><option>1</option><option>2</option><option>3</option><option>4+</option>
        </select>
      </div>
      <button type="submit" className="mt-4 w-full rounded-lg bg-teal py-3 text-[15px] font-semibold text-white transition-colors hover:bg-teal-deep">
        Book my free appraisal
      </button>
      <p className="mt-2 text-center text-[11px] text-soft">No obligation. Your details are only used to arrange the appraisal.</p>
    </form>
  );
}
