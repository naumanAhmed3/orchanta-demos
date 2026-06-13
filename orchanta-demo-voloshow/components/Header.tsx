"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ink/85 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2">
          <svg viewBox="0 0 64 64" className="h-7 w-7" aria-hidden="true">
            <defs>
              <linearGradient id="hdr-v" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="hsl(263,90%,60%)" />
                <stop offset="1" stopColor="hsl(166,100%,46%)" />
              </linearGradient>
            </defs>
            <rect width="64" height="64" rx="14" fill="#0d0d0d" stroke="#222" strokeWidth="2" />
            <path d="M16 18 L32 50 L48 18" fill="none" stroke="url(#hdr-v)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-base font-semibold tracking-tight text-fg">voloshow</span>
        </a>
        <nav className="hidden items-center gap-6 text-sm text-mute md:flex" aria-label="Sections">
          <a href="#try" className="transition-colors hover:text-fg">Try it</a>
          <a href="#use-cases" className="transition-colors hover:text-fg">Use cases</a>
          <a href="#pricing" className="transition-colors hover:text-fg">Pricing</a>
          <a href="#how" className="transition-colors hover:text-fg">How it works</a>
        </nav>
        <button
          type="button"
          onClick={() =>
            document.getElementById("try")?.scrollIntoView({ behavior: "smooth", block: "center" })
          }
          className="rounded-lg bg-violet px-3.5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Try 3 free
        </button>
      </div>
    </header>
  );
}
