import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/art", "/testimonial"],
        disallow: ["/form-generate", "/testimonial/"],
      },
    ],
    sitemap: "https://jshmslf.is-a.dev/sitemap.xml",
  };
}
