import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { THEME_DEFAULTS } from "@/lib/config";
import { ContactProvider } from "@/components/ContactModal";

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
  title: "Joshua Verceles - Software Engineer",
  description: "Full-stack software engineer specializing in Web Developing and Python. Building modern web applications, mobile apps, and leading developer communities.",
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
        <script dangerouslySetInnerHTML={{ __html: `(function(){function g(k){try{var r=localStorage.getItem(k);if(!r)return null;var p=JSON.parse(r);if(Date.now()>p.expiry){localStorage.removeItem(k);return null;}return p.value;}catch(e){return null;}}var t=g('theme');if(t==='dark'||(!t&&'${THEME_DEFAULTS.mode}'==='dark'))document.documentElement.classList.add('dark');var a=g('accent');if(a)document.documentElement.style.setProperty('--primary',a);var r=g('radius');if(r){document.documentElement.style.setProperty('--ui-radius',r);document.documentElement.style.setProperty('--card-radius',r==='999px'?'24px':r);}})()` }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ContactProvider>
          {children}
          <footer style={{
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
