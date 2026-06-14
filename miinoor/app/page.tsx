import PhonePrototype from "@/components/PhonePrototype";

export default function Home() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-paper">
      {/* warm branded backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 50% 0%, #fff7d6 0%, rgba(255,247,214,0) 60%), radial-gradient(45% 40% at 100% 100%, rgba(254,211,36,0.35) 0%, rgba(255,255,255,0) 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #000 1px, transparent 0)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* sample-data banner */}
      <div className="relative z-10 w-full border-b border-black/10 bg-jet text-paper">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-4 py-2 text-center text-[11px] sm:text-xs">
          <span className="font-bold text-gold">Working concept</span>
          <span className="text-paper/70">
            · sample data · built by Orchanta for Miinoor — not a live store
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-10 px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:py-16">
        {/* pitch column (desktop first, mobile second) */}
        <div className="order-2 max-w-md text-center lg:order-1 lg:text-left">
          <span className="select-none text-3xl font-extrabold lowercase tracking-tight text-gold drop-shadow-sm">
            mi<span className="text-jet">i</span>noor
          </span>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
            Live shopping that{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">never drops a frame.</span>
              <span className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-gold/70" />
            </span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink/70">
            A rebuild of Miinoor&apos;s core live-shopping flow — go-live streams,
            in-stream buying, two-tap checkout, and the Miinoor AI assistant —
            hardened and on-brand. Try it on the phone.
          </p>

          <ul className="mx-auto mt-6 max-w-xs space-y-2.5 text-left lg:mx-0">
            {[
              "Go-live seller stream + floating reactions",
              "Tap a product → buy without leaving the stream",
              "Two-tap checkout, instant confirmation",
              "AI assistant: “find me something under $30”",
              "Swipe between live creators",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2.5 text-sm text-ink/80">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-[11px] font-extrabold text-jet">
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>

          <p className="mt-7 text-xs font-medium text-ink/45">
            A studio for software &amp; AI that ships — Orchanta
          </p>
        </div>

        {/* phone */}
        <div className="order-1 w-full lg:order-2 lg:w-auto">
          <PhonePrototype />
        </div>
      </div>
    </main>
  );
}
