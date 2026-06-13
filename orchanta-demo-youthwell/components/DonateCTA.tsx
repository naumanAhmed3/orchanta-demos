import Reveal from "./Reveal";

const AMOUNTS = ["$25", "$50", "$100", "$250"];

export default function DonateCTA() {
  return (
    <section id="donate" className="px-5 py-20 sm:px-7 sm:py-24">
      <div className="mx-auto w-full max-w-[1100px]">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[2.5rem] px-7 py-14 text-center sm:px-14 sm:py-20"
            style={{
              background:
                "radial-gradient(120% 120% at 10% 0%, #38a895 0%, #2c8c7e 45%, #1d6a5f 100%)",
            }}
          >
            {/* soft decorative shapes */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-25">
              <div className="float absolute -left-10 top-6 h-40 w-40 rounded-full bg-shell blur-2xl" />
              <div className="float-slow absolute bottom-[-3rem] right-4 h-56 w-56 rounded-full bg-sun blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              <span className="breathe mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-shell/15 backdrop-blur-sm">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#fffdf8" aria-hidden="true">
                  <path d="M12 20.5S3.5 14.7 3.5 8.9A4.6 4.6 0 0 1 12 6.3a4.6 4.6 0 0 1 8.5 2.6c0 5.8-8.5 11.6-8.5 11.6Z" />
                </svg>
              </span>

              <h2 className="font-display mt-6 text-[2.1rem] font-semibold leading-tight tracking-tight text-shell text-balance sm:text-[2.8rem]">
                Will you consider YouthWell in your annual giving?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-[1.1rem] leading-relaxed text-mint">
                Your donation — big or small — connects youth across Santa
                Barbara County to mental wellness resources before the crisis.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2.5">
                {AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className="lift rounded-full border-2 border-shell/40 bg-shell/10 px-5 py-2.5 text-[1rem] font-bold text-shell backdrop-blur-sm transition-colors duration-200 hover:bg-shell/20"
                  >
                    {amount}
                  </button>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#donate"
                  className="lift inline-flex items-center gap-2 rounded-full bg-coral px-7 py-3.5 text-[1.05rem] font-extrabold text-shell shadow-[0_18px_40px_-16px_rgba(0,0,0,0.5)]"
                >
                  Donate today
                </a>
                <a
                  href="#pathways"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-shell/60 px-6 py-3 text-[1.02rem] font-bold text-shell transition-colors duration-200 hover:bg-shell/15"
                >
                  Other ways to help
                </a>
              </div>

              <p className="mt-6 text-[0.92rem] font-semibold text-mint/90">
                YouthWell is a registered nonprofit serving Santa Barbara County.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
