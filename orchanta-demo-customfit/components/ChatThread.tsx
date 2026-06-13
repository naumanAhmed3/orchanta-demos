import { site } from "@/lib/data";

type ChatThreadProps = {
  app: "imessage" | "messenger";
  fixed: boolean;
};

/** A CSS-only image placeholder for the preview card (no hotlinked assets). */
function CardImage() {
  return (
    <div
      className="flex h-[110px] items-center justify-center gap-2"
      style={{
        background:
          "linear-gradient(135deg, var(--color-blush) 0%, var(--color-blush-deep) 55%, var(--color-rose) 130%)",
      }}
    >
      <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 16 L52 25 L32 34 L12 25 Z" fill="var(--color-rosewood)" />
        <path
          d="M22 30.5 V39 c0 4 20 4 20 0 v-8.5 l-10 4.5 Z"
          fill="var(--color-rose)"
        />
      </svg>
      <span className="font-display text-lg font-semibold tracking-wide text-rosewood">
        {site.siteName}
      </span>
    </div>
  );
}

/** The rich link-preview card a crawler-built OG snapshot produces. */
function PreviewCard() {
  return (
    <div className="w-[88%] overflow-hidden rounded-2xl border border-line bg-paper text-left shadow-sm">
      <CardImage />
      <div className="space-y-0.5 px-3 py-2.5">
        <p className="text-[12.5px] font-semibold leading-snug text-ink">
          {site.ogTitle}
        </p>
        <p className="line-clamp-2 text-[11px] leading-snug text-mute">
          {site.ogDescription}
        </p>
        <p className="pt-0.5 text-[10px] uppercase tracking-wide text-mute">
          {site.domain}
        </p>
      </div>
    </div>
  );
}

/** A simulated chat thread — same conversation, with or without a working preview. */
export function ChatThread({ app, fixed }: ChatThreadProps) {
  const isIMessage = app === "imessage";
  const appName = isIMessage ? "iMessage" : "Messenger";
  const blue = isIMessage ? "bg-imsg" : "bg-msgr";

  return (
    <figure className="m-0 w-full max-w-[330px]">
      <div className="overflow-hidden rounded-[2rem] border border-line bg-paper shadow-[0_14px_44px_-20px_rgba(68,45,43,0.4)]">
        {/* Phone header */}
        <div className="flex flex-col items-center gap-1 border-b border-line bg-blush/60 px-4 pb-2.5 pt-3.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose text-[13px] font-semibold text-paper">
            J
          </span>
          <span className="text-[12px] font-semibold text-ink">Jenna R.</span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-mute">
            {appName}
          </span>
        </div>

        {/* Thread */}
        <div className="flex min-h-[330px] flex-col justify-end gap-2 px-3 pb-4 pt-3">
          <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-bubble px-3 py-2 text-[12.5px] leading-snug text-ink">
            We&rsquo;re starting the college search with Maya — any counselor
            you&rsquo;d recommend?
          </div>

          <div
            className={`max-w-[85%] self-end rounded-2xl rounded-br-md ${blue} px-3 py-2 text-[12.5px] leading-snug text-white`}
          >
            Yes — we worked with Custom Fit. Here&rsquo;s their site:
          </div>

          {fixed ? (
            <div className="flex flex-col items-end gap-1 self-end">
              <PreviewCard />
              <div
                className={`max-w-[85%] rounded-2xl rounded-br-md ${blue} px-3 py-2 text-[12.5px] text-white`}
              >
                <span className="underline decoration-white/70">
                  {site.domain}
                </span>
              </div>
            </div>
          ) : (
            <div
              className={`max-w-[85%] self-end rounded-2xl rounded-br-md ${blue} px-3 py-2 text-[12.5px] leading-snug text-white`}
            >
              <span className="underline decoration-white/70">
                https://www.{site.domain}/
              </span>
            </div>
          )}

          <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-bubble px-3 py-2 text-[12.5px] leading-snug text-ink">
            {fixed
              ? "Oh nice, college prep in Florida — I’ll reach out!"
              : "Hmm, it’s just a bare link… what is it?"}
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-[11px] text-mute">
        Simulated {appName} thread
      </figcaption>
    </figure>
  );
}
