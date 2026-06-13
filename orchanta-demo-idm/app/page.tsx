import { IDMLogo } from "../components/Logo";
import Configurator from "../components/Configurator";

export default function Page() {
  return (
    <main>
      {/* HEADER */}
      <header className="border-b border-line-soft bg-paper">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
          <IDMLogo />
          <p className="text-[13px] font-semibold text-mute">
            Configure a product → get a QR that carries the exact order.
          </p>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-line-soft bg-panel">
        <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-6 sm:py-14">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-magenta">
            Scan-to-Order · a working concept
          </div>
          <h1 className="idm-h mt-3 max-w-3xl text-[34px] leading-[1.05] sm:text-[48px]">
            <span className="text-magenta">Scan</span> <span className="text-ink">it.</span>{" "}
            <span className="text-magenta">Order</span> <span className="text-ink">it.</span>{" "}
            <span className="text-magenta">Paid</span> <span className="text-ink">it.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-mute">
            You asked for a plug-in that turns an exact product choice — colour, size, the lot —
            into a QR code with the total and payment details. No off-the-shelf plug-in does it,
            so we built the real thing below. Pick the options, watch the code redraw, scan it
            with your phone. (Yes, the World comes next. HaHa.)
          </p>
        </div>
      </section>

      {/* CENTERPIECE */}
      <section className="bg-paper">
        <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-6">
          <Configurator />
        </div>
      </section>

      {/* USE-CASE STRIP */}
      <section className="border-t border-line-soft bg-panel">
        <div className="mx-auto max-w-[1100px] px-5 py-8 sm:px-6">
          <h2 className="idm-h text-[15px]">
            <span className="text-magenta">Where</span> <span className="text-ink">it earns its keep</span>
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <UseCase
              title="Counter cards at fairs & workshops"
              body="A printed card per variant on the stand — customers scan, see the price, pay on the spot."
            />
            <UseCase
              title="Product tags on the shelf"
              body="Hang one on each finished piece; the tag itself is the order form."
            />
            <UseCase
              title="Invoice & quote slips"
              body="Drop the code on a commission quote — bank, PayPal or card, ref included."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-line bg-paper">
        <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-2 px-5 py-5 text-[12px] text-mute sm:px-6">
          <span>
            A working concept built by Orchanta for IDM Imagineering —{" "}
            <span className="font-bold text-magenta">demo mode</span>. Fictional product, sample
            payment details, no live orders.
          </span>
          <span className="font-semibold">orchanta.tech</span>
        </div>
      </footer>
    </main>
  );
}

function UseCase({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-line bg-paper p-4">
      <div className="text-[14px] font-bold leading-snug">{title}</div>
      <p className="mt-1 text-[13px] leading-snug text-mute">{body}</p>
    </div>
  );
}
