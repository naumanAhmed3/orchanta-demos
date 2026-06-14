import Store from "@/components/Store";

export default function Home() {
  return (
    <main className="min-h-dvh">
      {/* demo banner */}
      <div className="bg-ink px-4 py-2 text-center text-[11px] font-medium tracking-wide text-cream/80">
        Concept storefront for Sip Dopa · built by Orchanta · review quotes, ratings &amp; savings shown are SAMPLE data
      </div>

      <Store />

      <footer className="border-t border-ink/8 bg-cream px-5 pb-10 pt-8 text-center sm:px-8">
        <p className="font-display text-lg font-semibold text-ink">Sip the difference.</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-ink/55">
          Six flavours. One matcha. Sourced from Uji, Japan — £22/month, cancel anytime.
        </p>
        <p className="mt-5 text-[11px] text-ink/35">
          Demo built by Orchanta · sample data throughout
        </p>
      </footer>
    </main>
  );
}
