"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Errors = Partial<Record<"name" | "org" | "email" | "message", string>>;

export default function Contact() {
  const [form, setForm] = useState({ name: "", org: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function validate(): Errors {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Please tell us your name.";
    if (!form.email.trim()) e.email = "An email lets us reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "That email does not look right.";
    if (!form.message.trim()) e.message = "A line or two about what you are weighing up helps.";
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  }

  const field =
    "w-full rounded-xl border border-hairline bg-paper px-4 py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-indigo";

  return (
    <section className="mesh min-h-[80vh]">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 md:grid-cols-[1fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow text-[12px] font-semibold text-indigo">Contact</p>
          <h1 className="font-display mt-6 text-[36px] font-medium leading-[1.06] tracking-[-0.01em] text-ink sm:text-[52px]">
            Start a <span className="italic text-indigo">conversation</span>.
          </h1>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-muted">
            Tell us a little about what you are considering across Vietnam or ASEAN. We read every
            message and reply personally, usually within two working days.
          </p>
          <dl className="mt-12 space-y-6 text-[14px]">
            <div className="border-l-2 border-indigo/30 pl-4">
              <dt className="font-semibold text-ink">Where we are</dt>
              <dd className="mt-1 text-muted">Ho Chi Minh City, Vietnam · advisory across ASEAN</dd>
            </div>
            <div className="border-l-2 border-indigo/30 pl-4">
              <dt className="font-semibold text-ink">Proposals</dt>
              <dd className="mt-1 text-muted">Subject line: Website Proposal Enquiry</dd>
            </div>
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[26px] border border-hairline bg-paper2/70 p-7 backdrop-blur-sm sm:p-9"
        >
          {sent ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </motion.div>
              <h2 className="font-display mt-6 text-[26px] font-medium text-ink">Thank you, {form.name.split(" ")[0] || "there"}.</h2>
              <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-muted">
                Your message has been received in this concept preview. On the live site it would reach
                the Aliro team directly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setForm({ name: "", org: "", email: "", message: "" });
                }}
                className="mt-7 text-[13.5px] font-semibold text-indigo hover:text-indigo-deep"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-[13px] font-semibold text-ink">Name</label>
                <input id="name" className={field} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                {errors.name && <p className="mt-1.5 text-[12.5px] text-indigo">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="org" className="mb-1.5 block text-[13px] font-semibold text-ink">Organisation</label>
                <input id="org" className={field} placeholder="Company or institution" value={form.org} onChange={(e) => setForm({ ...form, org: e.target.value })} />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-ink">Email</label>
                <input id="email" type="email" className={field} placeholder="you@organisation.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {errors.email && <p className="mt-1.5 text-[12.5px] text-indigo">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-[13px] font-semibold text-ink">Message</label>
                <textarea id="message" rows={4} className={`${field} resize-none`} placeholder="What are you weighing up?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                {errors.message && <p className="mt-1.5 text-[12.5px] text-indigo">{errors.message}</p>}
              </div>
              <button type="submit" className="w-full rounded-full bg-indigo px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-indigo-deep">
                Send message
              </button>
              <p className="text-center text-[11.5px] text-muted">
                Concept preview · this form validates and confirms but does not store anything.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
