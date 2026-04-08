export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Joshua Verceles",
    alternateName: "jshmslf",
    url: "https://jshmslf.dev",
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Mayon Capital",
      url: "https://mayoncapital.com",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pangasinan",
      addressCountry: "PH",
    },
    sameAs: [
      "https://github.com/jshmslf",
      "https://www.linkedin.com/in/jshmslf/",
      "https://instagram.com/jshmslf",
    ],
    knowsAbout: ["Next.js", "TypeScript", "Python", "Angular", "FastAPI", "Machine Learning"],
    description: "Software Engineer at Mayon Capital. Building web solutions, graphic art on the side. Based in Pangasinan, Philippines.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
