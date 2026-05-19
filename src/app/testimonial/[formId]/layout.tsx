import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leave a Testimonial",
  robots: { index: false, follow: false },
};

export default function FormLayout({ children }: { children: React.ReactNode }) {
  return children;
}
