export default function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span aria-hidden className="grid h-9 w-9 place-items-center rounded-[10px] bg-crimson glow-crimson">
        <span className="font-display text-base font-extrabold leading-none text-cream">S</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-extrabold uppercase tracking-[0.18em] text-cream">
          Salas
        </span>
        <span className="font-display text-[10px] font-bold uppercase tracking-[0.42em] text-cream-60">
          Training
        </span>
      </span>
    </span>
  );
}
