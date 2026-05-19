import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "What people say about working with Joshua Verceles - software engineer and graphic artist based in Pangasinan, Philippines.",
  keywords: ["Joshua Verceles", "jshmslf", "Testimonials", "Reviews", "Software Engineer"],
  openGraph: {
    title: "Testimonials - Joshua Verceles",
    description: "What people say about working with Joshua Verceles.",
    url: "https://jshmslf.is-a.dev/testimonial",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Joshua Verceles Testimonials" }],
  },
  twitter: {
    title: "Testimonials - Joshua Verceles",
    description: "What people say about working with Joshua Verceles.",
    images: ["/og.png"],
  },
  alternates: { canonical: "https://jshmslf.is-a.dev/testimonial" },
};

export default function TestimonialLayout({ children }: { children: React.ReactNode }) {
  return children;
}
