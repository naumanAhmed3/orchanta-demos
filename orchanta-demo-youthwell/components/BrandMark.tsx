type Props = { className?: string };

/** A sprouting-heart motif: growth + care, in the calming brand palette. */
export default function BrandMark({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      role="img"
      aria-label="YouthWell"
    >
      <defs>
        <linearGradient id="bm-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38a895" />
          <stop offset="55%" stopColor="#2c8c7e" />
          <stop offset="100%" stopColor="#5fa8cc" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#bm-grad)" />
      {/* heart */}
      <path
        d="M24 35S13.4 28.6 13.4 21.4A5.6 5.6 0 0 1 24 18.5a5.6 5.6 0 0 1 10.6 2.9C34.6 28.6 24 35 24 35Z"
        fill="#fffdf8"
        opacity="0.96"
      />
      {/* sprout leaf */}
      <path
        d="M24 24c0-3 1.7-6 5.4-7.3-0.3 3.4-2.1 6-5.4 7.3Z"
        fill="#8fc9ad"
      />
      <path
        d="M24 24c0-3-1.7-6-5.4-7.3 0.3 3.4 2.1 6 5.4 7.3Z"
        fill="#cfe6f0"
      />
    </svg>
  );
}
