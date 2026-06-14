import Link from "next/link";
import { Wordmark } from "./Brand";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-hairline bg-ink text-white">
      <div className="mesh pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Wordmark light />
            <p className="font-display mt-6 max-w-sm text-[22px] leading-snug text-white/90">
              Access to sustainable healthcare growth across Vietnam and ASEAN.
            </p>
          </div>

          <div>
            <p className="eyebrow text-[10.5px] font-semibold text-white/45">Explore</p>
            <ul className="mt-5 space-y-3 text-[14px] text-white/75">
              <li><Link href="/who-we-are" className="transition-colors hover:text-white">Who We Are</Link></li>
              <li><Link href="/services" className="transition-colors hover:text-white">Services</Link></li>
              <li><Link href="/business-cases" className="transition-colors hover:text-white">Business Cases</Link></li>
              <li><Link href="/insights" className="transition-colors hover:text-white">Insights</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-[10.5px] font-semibold text-white/45">Get in touch</p>
            <ul className="mt-5 space-y-3 text-[14px] text-white/75">
              <li><Link href="/contact" className="transition-colors hover:text-white">Start a conversation</Link></li>
              <li>Ho Chi Minh City, Vietnam</li>
              <li>Advisory across ASEAN</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-[12px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>Aliro Consulting · Established 2018</span>
          <span>Concept preview · not the live Aliro website</span>
        </div>
      </div>
    </footer>
  );
}
