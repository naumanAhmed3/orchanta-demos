import Logo from "@/components/Logo";
import Membership from "@/components/Membership";

const STATS = [
  { value: "200+", label: "Footballers trained" },
  { value: "10+", label: "Years of experience" },
  { value: "3", label: "Specialised paths" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-5">
        <Logo />
        <p className="rounded-full border border-line px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream-60">
          Working concept
        </p>
      </header>

      {/* Hero */}
      <section className="mx-auto w-full max-w-5xl px-5 pb-14 pt-10 text-center sm:pt-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
          Elite youth soccer · New York City
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-2xl font-extrabold uppercase leading-snug tracking-[0.08em] sm:text-4xl">
          Your development. <span className="text-crimson-bright">Your Path.</span> Your Game.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream-60 sm:text-base">
          Soccer training programs that build technical skills, confidence, and leadership in the
          next generation of athletes — now with memberships you can join in under a minute.
        </p>

        <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3">
          {STATS.map((s) => (
            <div key={s.label} className="rounded-card border border-line bg-surface px-3 py-4">
              <dt className="order-last mt-1 text-[11px] uppercase tracking-[0.14em] text-cream-60">
                {s.label}
              </dt>
              <dd className="font-display text-xl font-extrabold text-cream sm:text-2xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Memberships — the centerpiece */}
      <Membership />

      {/* Footer */}
      <footer className="border-t border-line-soft">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 px-5 py-8 text-center">
          <Logo />
          <p className="text-xs text-cream-40">
            A working concept built by Orchanta for Salas Training — payments shown in demo mode.
          </p>
        </div>
      </footer>
    </main>
  );
}
