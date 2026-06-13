import Logo from "@/components/Logo";
import { CLINIC } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted">
            {CLINIC.address}
          </p>
          <p className="mt-1 text-sm text-muted">Appointments: {CLINIC.phoneDisplay}</p>
        </div>
        <div className="text-sm text-muted sm:text-right">
          <p className="font-semibold text-ink">
            A working concept built by Orchanta for {CLINIC.name}
          </p>
          <p className="mt-1">Demo mode — sample content, no live bookings.</p>
        </div>
      </div>
    </footer>
  );
}
