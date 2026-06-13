"use client";

import { motion } from "framer-motion";
import { PILLARS, POSTS } from "./content";

export default function ContentGrid() {
  return (
    <section className="border-t hairline bg-paper-2/60 px-5 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta">
              The reading
            </p>
            <h2
              className="font-display mt-3 leading-tight"
              style={{ fontSize: "var(--text-h2)" }}
            >
              Four pillars, one voice.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {PILLARS.map((p) => (
              <span
                key={p}
                className="rounded-full border hairline px-3 py-1.5 text-xs text-ink-soft"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-9 grid gap-px overflow-hidden rounded-[var(--demo-radius)] border hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.title}
              className="group flex min-h-[170px] flex-col justify-between bg-paper p-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.24em] text-muted">
                  {post.pillar}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-terracotta">
                  {post.kicker}
                </span>
              </div>
              <h3 className="font-display mt-6 text-2xl leading-tight text-ink">
                {post.title}
              </h3>
              <span
                className="mt-5 inline-flex w-fit items-center gap-1 text-xs font-medium"
                style={{ color: "var(--accent)" }}
              >
                Read
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </motion.article>
          ))}

          {/* Subscribe cell to fill the 6th slot cleanly */}
          <div className="flex min-h-[170px] flex-col justify-between bg-ink p-6 text-paper">
            <span className="text-[10px] uppercase tracking-[0.24em] text-paper/60">
              The newsletter
            </span>
            <p className="font-display mt-6 text-2xl leading-tight">
              38,000+ readers who want more from life.
            </p>
            <span
              className="mt-5 inline-flex w-fit rounded-[var(--demo-radius)] px-3 py-1.5 text-xs font-semibold text-paper"
              style={{ backgroundColor: "var(--accent)" }}
            >
              Subscribe
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
