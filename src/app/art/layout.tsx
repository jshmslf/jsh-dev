import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Art Portfolio",
  description: "Graphic art and design work by Joshua Verceles - social media content, vector illustrations, photo composites, brand identity, and typography.",
  keywords: ["Joshua Verceles", "jshmslf", "Art Portfolio", "Graphic Design", "Vector Art", "Social Media Design", "Photo Manipulation", "Brand Identity", "Typography"],
  openGraph: {
    title: "Art Portfolio - Joshua Verceles",
    description: "Graphic art and design work spanning social media content, vector illustrations, photo composites, and more.",
    url: "https://jshmslf.is-a.dev/art",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Joshua Verceles Art Portfolio" }],
  },
  twitter: {
    title: "Art Portfolio - Joshua Verceles",
    description: "Graphic art and design work spanning social media content, vector illustrations, photo composites, and more.",
    images: ["/og.png"],
  },
  alternates: { canonical: "https://jshmslf.is-a.dev/art" },
};

export default function ArtLayout({ children }: { children: React.ReactNode }) {
  return children;
}
