import Link from "next/link";
import Reveal from "./Reveal";

export default function Stub({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <section className="mesh min-h-[70vh]">
      <div className="mx-auto max-w-3xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <Reveal>
          <p className="eyebrow text-[12px] font-semibold text-indigo">{eyebrow}</p>
          <h1 className="font-display mt-5 text-[34px] font-medium leading-tight tracking-[-0.01em] text-ink sm:text-[50px]">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15.5px] leading-relaxed text-muted">{body}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-indigo px-7 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-indigo-deep"
            >
              Get in touch <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
            <Link href="/" className="text-[14px] font-semibold text-ink underline decoration-indigo/30 underline-offset-4 hover:decoration-indigo">
              Back home
            </Link>
          </div>
          <p className="mt-14 text-[12px] text-muted">
            This page is scaffolded in the concept to show the full 7-page structure. It would be built
            out with your approved content.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
