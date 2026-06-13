import { LinkPreviewDemo } from "@/components/LinkPreviewDemo";
import { Logo } from "@/components/Logo";
import { steps } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-paper">
      {/* Header */}
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-3 px-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <p className="text-[13.5px] text-mute sm:max-w-[300px] sm:text-right">
            When a parent shares your site, this is what they see.
          </p>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-blush/50">
          <div className="mx-auto max-w-5xl px-5 pb-14 pt-12 text-center sm:pt-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-rosewood">
              An Orchanta working concept
            </p>
            <h1 className="font-display mt-3 text-5xl font-semibold tracking-tight text-espresso sm:text-6xl">
              Your link, fixed.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-mute">
              Word of mouth is how families find you — and today, when a parent
              pastes your homepage into iMessage or Messenger, the preview
              crawler hits a server error and no card ever appears. Toggle below
              to see the same conversation once a lightweight proxy answers the
              crawler properly.
            </p>
          </div>
        </section>

        {/* Before / after demonstrator */}
        <div className="mx-auto max-w-5xl px-5 pb-16 pt-10 sm:-mt-6 sm:pt-0">
          <LinkPreviewDemo />
        </div>

        {/* How it works */}
        <section className="border-y border-line bg-blush/40">
          <div className="mx-auto max-w-5xl px-5 py-14">
            <h2 className="font-display text-center text-3xl font-semibold tracking-tight text-espresso">
              How the fix works
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-[14px] text-mute">
              A small edge proxy in front of your homepage — nothing about your
              Wix site changes.
            </p>
            <ol className="mt-9 grid list-none gap-5 p-0 sm:grid-cols-3">
              {steps.map((step) => (
                <li
                  key={step.n}
                  className="rounded-2xl border border-line bg-paper p-6"
                >
                  <span className="font-display flex h-9 w-9 items-center justify-center rounded-full bg-rosewood text-lg font-semibold text-paper">
                    {step.n}
                  </span>
                  <h3 className="mt-4 text-[15px] font-semibold text-espresso">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-mute">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-paper">
        <div className="mx-auto max-w-5xl px-5 py-8 text-center">
          <p className="text-[13px] text-mute">
            A working concept built by Orchanta for Custom Fit College
            Counseling — simulated previews, demo mode.
          </p>
          <p className="mt-1 text-[11.5px] text-mute/80">
            Preview card text comes from the site&rsquo;s own published page
            metadata; conversations are illustrative.
          </p>
        </div>
      </footer>
    </div>
  );
}
