export function Stars({ count, size = 18 }: { count: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          aria-hidden
          className={i < count ? "" : "opacity-25"}
        >
          <path
            d="M12 2.6l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.9 6.5 19.3l1.1-6.1-4.5-4.2 6.1-.8z"
            fill={i < count ? "#F6B43C" : "#163E5C"}
          />
        </svg>
      ))}
    </span>
  );
}
