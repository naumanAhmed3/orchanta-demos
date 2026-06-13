import Dashboard from "@/components/Dashboard";

export default function Home() {
  return (
    <>
      <Dashboard />
      <footer className="border-t border-[var(--hairline)] bg-[var(--wine-950)] text-[var(--cream-50)]">
        <div className="shell flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="serif text-lg">Sojourn Cellars · Custom Analytics</p>
            <p className="mt-1 max-w-md text-[0.82rem] leading-relaxed text-[rgba(247,241,231,0.62)]">
              A working concept built by Orchanta for Sojourn Cellars — sample data, demo mode.
            </p>
          </div>
          <div className="text-[0.74rem] text-[rgba(247,241,231,0.6)] sm:text-right">
            <p>Custom Shopify reporting, tailored to the cellar.</p>
            <p className="mt-1">Pinot Noir · Chardonnay · Cabernet · Sonoma</p>
          </div>
        </div>
      </footer>
    </>
  );
}
