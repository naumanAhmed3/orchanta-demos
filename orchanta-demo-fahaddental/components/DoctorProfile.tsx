import { DOCTOR } from "@/lib/data";

export default function DoctorProfile() {
  const initials = DOCTOR.name
    .replace("Dr. ", "")
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <section id="doctor" className="scroll-mt-20 bg-brand-tint py-16 sm:py-20">
      <div className="mx-auto grid max-w-5xl gap-8 px-5 md:grid-cols-[260px_1fr] md:items-center">
        <div className="flex flex-col items-center rounded-3xl border border-line bg-surface p-7 text-center shadow-sm">
          <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand text-3xl font-bold text-white">
            {initials}
          </span>
          <p className="mt-4 text-lg font-bold text-ink">{DOCTOR.name}</p>
          <p className="mt-1 text-sm text-muted">{DOCTOR.title}</p>
          <span className="mt-3 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
            {DOCTOR.experience}
          </span>
        </div>

        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">Meet your dentist</h2>
          <p className="mt-3 max-w-xl text-muted">{DOCTOR.bio}</p>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {DOCTOR.credentials.map((c) => (
              <li key={c} className="flex items-start gap-2.5 text-sm text-ink">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  className="mt-0.5 shrink-0"
                >
                  <circle cx="10" cy="10" r="10" fill="#0d7d8c" />
                  <path
                    d="m6 10.5 2.5 2.5L14 7.5"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
