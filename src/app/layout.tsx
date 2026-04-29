import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { THEME_DEFAULTS } from "@/lib/config";
import { ContactProvider } from "@/components/ContactModal";
import { ThemeInitializer } from "@/components/ThemeInitializer";
import { AIChatButton } from "@/components/AIChatButton";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/JsonLd";

const geistMonoHeading = Geist_Mono({subsets:['latin'],variable:'--font-heading'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jshmslf.is-a.dev"),
  title: {
    default: "Joshua Verceles — Software Engineer",
    template: "%s | Joshua Verceles",
  },
  description: "Software Engineer at Mayon Capital. Building web solutions, graphic art on the side. Based in Pangasinan, Philippines.",
  keywords: ["Joshua Verceles", "jshmslf", "Software Engineer", "Full Stack Developer", "Next.js", "TypeScript", "Python", "Pangasinan", "Philippines"],
  authors: [{ name: "Joshua Verceles", url: "https://jshmslf.is-a.dev" }],
  creator: "Joshua Verceles",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jshmslf.is-a.dev",
    siteName: "Joshua Verceles",
    title: "Joshua Verceles — Software Engineer",
    description: "Software Engineer at Mayon Capital. Building web solutions, graphic art on the side. Based in Pangasinan, Philippines.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Joshua Verceles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joshua Verceles — Software Engineer",
    description: "Software Engineer at Mayon Capital. Building web solutions, graphic art on the side.",
    creator: "@jshmslf",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://jshmslf.is-a.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, geistMonoHeading.variable)}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
        <script dangerouslySetInnerHTML={{ __html: `(function(){function g(k){try{var r=localStorage.getItem(k);if(!r)return null;var p=JSON.parse(r);if(Date.now()>p.expiry){localStorage.removeItem(k);return null;}return p.value;}catch(e){return null;}}var t=g('theme');if(t==='dark'||(!t&&'${THEME_DEFAULTS.mode}'==='dark'))document.documentElement.classList.add('dark');var a=g('accent');if(a)document.documentElement.style.setProperty('--primary',a);var r=g('radius');if(r){document.documentElement.style.setProperty('--ui-radius',r);document.documentElement.style.setProperty('--card-radius',r==='999px'?'24px':r);}})()` }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeInitializer />
        <Analytics/>
        <ContactProvider>
          {children}
          <AIChatButton />
          <footer className="cursor-default" style={{
            textAlign: "center",
            padding: "24px",
            fontFamily: "var(--font-geist-mono)",
            fontSize: "0.75rem",
            color: "var(--muted-foreground)",
          }}>
            © {new Date().getFullYear()} jshmslf. All rights reserved.
          </footer>
        </ContactProvider>
      </body>
    </html>
  );
}
