import Logo from "./Logo";
import { studio } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-ivory-soft">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-8 border-b border-line pb-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-charcoal-soft">
              {studio.tagline}. {studio.address}.
            </p>
          </div>
          <dl className="grid grid-cols-1 gap-4 text-sm sm:text-right">
            <div>
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold-deep">
                WhatsApp
              </dt>
              <dd className="text-charcoal">{studio.whatsappDisplay}</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold-deep">
                Instagram
              </dt>
              <dd className="text-charcoal">{studio.instagramHandle}</dd>
            </div>
          </dl>
        </div>

        <p className="mt-8 text-center text-xs leading-relaxed text-muted">
          A working concept built by Orchanta for BS Studio by Ossama Adnan —
          sample portfolio, demo mode.
        </p>
      </div>
    </footer>
  );
}
