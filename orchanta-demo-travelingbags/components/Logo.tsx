/**
 * Traveling Bags wordmark, mirroring the store's banner logo:
 * "TRAVELING" in brand red, a red location-pin mark, "BAGS" in navy,
 * finished with two navy suitcase silhouettes.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 select-none ${className}`}>
      <span className="font-bold uppercase tracking-tight text-brand-red text-2xl leading-none">
        Traveling
      </span>
      {/* Location pin with a tiny plane, echoing the store mark */}
      <svg aria-hidden="true" viewBox="0 0 24 30" className="h-7 w-auto -mt-1">
        <path
          d="M12 1C6.6 1 2.4 5.2 2.4 10.5c0 7 9.6 18 9.6 18s9.6-11 9.6-18C21.6 5.2 17.4 1 12 1Z"
          fill="#790b0a"
        />
        <path
          d="M6.5 11.6l4.4-1.2 2.3-3.6c.3-.5 1-.6 1.4-.2.3.3.4.7.2 1.1l-1.6 3.1 3.6 1c.4.1.5.6.2.9l-.7.6c-.2.2-.5.2-.8.2l-8.6-1c-.5-.1-.6-.8-.4-.9Z"
          fill="#ffffff"
        />
      </svg>
      <span className="font-bold uppercase tracking-tight text-brand-navy text-2xl leading-none">
        Bags
      </span>
      {/* Two suitcase silhouettes from the wordmark */}
      <svg aria-hidden="true" viewBox="0 0 44 26" className="h-5 w-auto text-brand-navy" fill="currentColor">
        <path d="M5.5 6.5V4.8C5.5 3.8 6.3 3 7.3 3h3.4c1 0 1.8.8 1.8 1.8v1.7h2A1.5 1.5 0 0 1 16 8v14a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 2 22V8a1.5 1.5 0 0 1 1.5-1.5h2Zm1.7 0h3.6V4.9H7.2v1.6Z" />
        <path d="M27.5 5V2.9c0-1.1.9-1.9 1.9-1.9h7.2c1 0 1.9.8 1.9 1.9V5h2A1.5 1.5 0 0 1 42 6.5v16a1.5 1.5 0 0 1-1.5 1.5h-15a1.5 1.5 0 0 1-1.5-1.5v-16A1.5 1.5 0 0 1 25.5 5h2Zm1.8 0h7.4V2.8h-7.4V5Z" />
      </svg>
    </span>
  );
}
