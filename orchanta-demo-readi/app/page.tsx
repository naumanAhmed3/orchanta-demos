import CopilotApp from "../components/CopilotApp";

export default function Page() {
  return (
    <main className="min-h-screen">
      <CopilotApp />
      <footer className="border-t border-line bg-paper">
        <div className="mx-auto max-w-[1180px] px-4 py-4 text-[12px] text-mute sm:px-6">
          A working concept built by Orchanta for Readi Financial — sample data, deterministic
          demo. Client-side only: no backend, no API keys, no live model calls.
        </div>
      </footer>
    </main>
  );
}
