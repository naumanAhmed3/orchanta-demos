"use client";

import { useState } from "react";
import { crawlerLog } from "@/lib/data";
import { ChatThread } from "./ChatThread";

export function LinkPreviewDemo() {
  const [fixed, setFixed] = useState(false);
  const log = fixed ? crawlerLog.fixed : crawlerLog.today;

  return (
    <section aria-label="Before and after link previews">
      {/* State toggle */}
      <div
        role="group"
        aria-label="Preview state"
        className="mx-auto flex w-fit rounded-full border border-line bg-blush p-1"
      >
        <button
          type="button"
          onClick={() => setFixed(false)}
          aria-pressed={!fixed}
          className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-colors ${
            !fixed
              ? "bg-espresso text-paper shadow-sm"
              : "text-rosewood hover:text-espresso"
          }`}
        >
          Today
        </button>
        <button
          type="button"
          onClick={() => setFixed(true)}
          aria-pressed={fixed}
          className={`rounded-full px-5 py-2 text-[13px] font-semibold transition-colors ${
            fixed
              ? "bg-espresso text-paper shadow-sm"
              : "text-rosewood hover:text-espresso"
          }`}
        >
          After the fix
        </button>
      </div>

      {/* Crawler log */}
      <div
        key={fixed ? "log-fixed" : "log-today"}
        className={`fade-up mx-auto mt-5 w-full max-w-xl rounded-xl border px-4 py-3 font-mono text-[12px] leading-relaxed ${
          fixed
            ? "border-ok/30 bg-ok-soft text-ok"
            : "border-err/30 bg-err-soft text-err"
        }`}
      >
        <span className="block text-[10px] uppercase tracking-[0.18em] opacity-70">
          crawler log · {log.ua}
        </span>
        <span className="font-semibold">{log.line}</span>
        <span className="opacity-80"> · {log.note}</span>
      </div>

      {/* The two simulated threads */}
      <div
        key={fixed ? "threads-fixed" : "threads-today"}
        className="fade-up mt-8 grid justify-items-center gap-10 sm:grid-cols-2 sm:gap-6"
      >
        <ChatThread app="imessage" fixed={fixed} />
        <ChatThread app="messenger" fixed={fixed} />
      </div>
    </section>
  );
}
