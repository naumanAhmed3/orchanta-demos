import Logo from "@/components/Logo";
import { SALON } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              {SALON.address}.
              <br />
              {SALON.hours}.
            </p>
          </div>
          <div className="text-sm text-ink-soft">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-rose-700">
              Bookings
            </p>
            <p className="mt-3 font-heading text-xl font-semibold text-plum">
              {SALON.whatsappDisplay}
            </p>
            <p className="mt-1 text-xs">Phone &amp; WhatsApp · women&apos;s salon</p>
          </div>
        </div>

        <p className="mt-10 border-t border-line pt-6 text-center text-xs text-ink-soft">
          A working concept built by Orchanta for Set My Hair Salon — demo mode.
        </p>
      </div>
    </footer>
  );
}
