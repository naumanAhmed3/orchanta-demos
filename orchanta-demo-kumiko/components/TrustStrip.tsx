import { TRUST_FACTS } from "@/lib/data";

export default function TrustStrip() {
  return (
    <section
      aria-label="Why shop direct"
      className="border-y border-line bg-blush/60"
    >
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 gap-y-5 px-5 py-7 md:grid-cols-4">
        {TRUST_FACTS.map((f) => (
          <div key={f.stat}>
            <p className="font-display text-2xl italic text-violet">{f.stat}</p>
            <p className="mt-1 text-[13px] leading-snug text-maroon/75">
              {f.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
