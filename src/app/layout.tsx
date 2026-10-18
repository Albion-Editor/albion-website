import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { VisitorTracker } from "@/components/VisitorTracker";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Albion: The AI code editor that shows you the price first.",
  description:
    "Albion routes your prompts through the fastest open frontier models, tracks every token in real-time, and enforces hard caps — so you're always in control of your code and your wallet. Built in Nigeria for developers everywhere.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Albion: The AI code editor that shows you the price first.",
    description:
      "The AI code editor that tracks every token in real-time and enforces hard caps. Routes open frontier models like DeepSeek V4 and Qwen with zero bill shock.",
    url: "https://albionide.com",
    siteName: "Albion IDE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Albion: The AI code editor that shows you the price first.",
    description: "The AI code editor that tracks every token in real-time and enforces hard caps.",
    creator: "@albion_ide",
  },
};

export const viewport: Viewport = {
  themeColor: "#070C18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jetbrains.variable} dark scroll-smooth`}>
      <body className="bg-bg-base text-text-main min-h-screen antialiased selection:bg-blue-500 selection:text-white">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <VisitorTracker />
        {children}
      </body>
    </html>
  );
}
