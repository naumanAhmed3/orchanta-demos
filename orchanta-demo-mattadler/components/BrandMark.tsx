type BrandMarkProps = {
  size?: number;
};

export default function BrandMark({ size = 38 }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      className="brand__mark"
    >
      <circle cx="22" cy="22" r="20.5" stroke="var(--gold)" strokeWidth="1.3" />
      <circle cx="22" cy="22" r="16" stroke="var(--gold)" strokeWidth="0.7" opacity="0.5" />
      {/* eight-point compass star */}
      <path
        d="M22 6 L24 20 L38 22 L24 24 L22 38 L20 24 L6 22 L20 20 Z"
        fill="var(--gold)"
        opacity="0.92"
      />
      <path
        d="M22 11 L23 21 L33 22 L23 23 L22 33 L21 23 L11 22 L21 21 Z"
        fill="var(--teal-950)"
        opacity="0.55"
      />
      <circle cx="22" cy="22" r="2.1" fill="var(--gold-bright)" />
    </svg>
  );
}
