import Header from "@/components/Header";
import TryIt from "@/components/TryIt";
import UseCaseArt from "@/components/UseCaseArt";
import { packs, steps, trustPoints, useCases } from "@/lib/data";

export default function Home() {
  return (
    <div id="top" className="min-h-screen">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Hero */}
        <section className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-line-2 bg-card px-3 py-1 text-xs font-medium text-mute">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" aria-hidden="true" />
              AI creative studio — conversion-first concept
            </p>
            <h1 className="font-display mt-5 text-4xl leading-tight font-semibold tracking-tight sm:text-5xl">
              Product photos that sell.{" "}
              <span className="text-violet-soft">Generated in seconds.</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-mute">
              Describe the shot you need — Voloshow turns it into catalog-ready
              photos, clean cutouts, and short product videos. Judge the quality
              yourself first: your first three generations are free, before we
              ever ask for an email.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-mute">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-teal" aria-hidden="true">✓</span>
                Exact credit cost shown before every generation
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-teal" aria-hidden="true">✓</span>
                Failed tasks refund their credits automatically
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-teal" aria-hidden="true">✓</span>
                Commercial use included on paid plans
              </li>
            </ul>
          </div>
          <div id="try" className="scroll-mt-20">
            <TryIt />
          </div>
        </section>

        {/* Use cases */}
        <section id="use-cases" className="scroll-mt-20 border-t border-line py-12 sm:py-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            One studio, three jobs done
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-mute">
            Not a model zoo — outcomes. Every example below is the actual shape
            of work Voloshow produces, shown as before → after.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {useCases.map((uc) => (
              <article key={uc.id} className="rounded-2xl border border-line bg-card p-4">
                <UseCaseArt useCase={uc} />
                <h3 className="mt-4 text-base font-semibold text-fg">{uc.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mute">{uc.blurb}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="scroll-mt-20 border-t border-line py-12 sm:py-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Pricing that does the math for you
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-mute">
            Credits, translated into plain numbers: one image ≈ 1 credit, one
            short video ≈ 5 credits. No surprises after checkout.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {packs.map((pack) => (
              <article
                key={pack.name}
                className={`rounded-2xl border p-6 ${
                  pack.featured
                    ? "border-violet bg-violet-glow"
                    : "border-line bg-card"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-semibold text-fg">{pack.name}</h3>
                  {pack.featured && (
                    <span className="rounded-full bg-violet px-2.5 py-0.5 text-[11px] font-semibold text-white">
                      Most popular
                    </span>
                  )}
                </div>
                <p className="mt-3">
                  <span className="text-4xl font-semibold tracking-tight text-fg">
                    {pack.price}
                  </span>
                  <span className="ml-1 text-sm text-mute">{pack.per}</span>
                </p>
                <p className="mt-4 text-sm font-medium text-fg">{pack.credits}</p>
                <ul className="mt-2 space-y-1 text-sm text-mute">
                  <li>{pack.images}</li>
                  <li>{pack.videos}</li>
                  <li className="text-teal">{pack.perImage}</li>
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-line-2 bg-card px-5 py-4">
            <p className="text-sm text-fg">
              <span className="font-semibold">Can I sell what I make?</span>{" "}
              <span className="text-mute">
                Yes — paid-plan generations are eligible for commercial use, as
                long as you own the rights to anything you upload.
              </span>
            </p>
          </div>
          <p className="mt-3 text-xs text-dim">
            Pack structure mirrors Voloshow’s live catalog — presented here as a
            concept, not a live offer.
          </p>
        </section>

        {/* How it works + trust */}
        <section id="how" className="scroll-mt-20 border-t border-line py-12 sm:py-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            How it works
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.n} className="rounded-2xl border border-line bg-card p-6">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-violet text-sm font-semibold text-violet-soft">
                  {step.n}
                </span>
                <h3 className="mt-4 text-base font-semibold text-fg">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-mute">{step.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-line bg-card-2 p-6">
            <h3 className="text-sm font-semibold tracking-wide text-fg uppercase">
              Earn trust before asking for money
            </h3>
            <div className="mt-4 grid gap-5 sm:grid-cols-3">
              {trustPoints.map((tp) => (
                <div key={tp.title}>
                  <p className="text-sm font-semibold text-teal">{tp.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-mute">{tp.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
          <p className="text-sm text-mute">
            A working concept built by Orchanta for Voloshow — demo mode.
          </p>
          <p className="mt-2 text-xs text-dim">
            No real AI calls — every visual on this page is a deterministic
            CSS/SVG simulation, clearly labeled as sample output. No
            testimonials or user counts are shown because none are claimed.
          </p>
        </div>
      </footer>
    </div>
  );
}
