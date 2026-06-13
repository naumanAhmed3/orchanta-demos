import BrandMark from "./BrandMark";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header__row">
        <a href="#top" className="brand" aria-label="Adler Journeys — home">
          <BrandMark size={40} />
          <span>
            <span className="brand__name">
              Adler <b>Journeys</b>
            </span>
            <span className="brand__tag">Heritage travel, from the inside</span>
          </span>
        </a>
        <div className="header-cta">
          <span className="concept-pill">Concept</span>
          <a href="#enquiry" className="btn btn--ghost">
            Enquire
          </a>
        </div>
      </div>
    </header>
  );
}
