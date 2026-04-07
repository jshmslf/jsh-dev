import "../styles/ArtPortfolio.scss";

export default function ArtPortfolio() {
  return (
    <div className="art">
      <div className="art__bg" aria-hidden="true" />

      <div className="art__content">
        <nav className="art__nav">
          <a href="/" className="art__back">← Back</a>
        </nav>

        <header className="art__hero">
          <p className="art__hero-sub">Graphic Artist</p>
          <h1 className="art__hero-title">Art Portfolio</h1>
        </header>

        <section className="art__gallery">
          <div className="art__gallery-wrapper">
            <span className="art__coming-soon">// coming_soon</span>
            <div className="art__brutalism-card">
              <p className="art__brutalism-card-title">Works are being curated.</p>
              <p className="art__brutalism-card-body">
                This space will showcase selected works in branding, illustration, and digital art.
              </p>
              <span className="art__brutalism-card-footer">STATUS — UNDER_CONSTRUCTION</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
