import BrandMark from "./BrandMark";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__row">
        <a href="#top" className="brand" aria-label="Adler Journeys — back to top">
          <BrandMark size={34} />
          <span className="brand__name">
            Adler <b>Journeys</b>
          </span>
        </a>
        <small>
          A working concept built by Orchanta for Matt Adler — demo mode.
        </small>
      </div>
    </footer>
  );
}
