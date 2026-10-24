import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
  metadataBase: new URL("https://albionide.com"),
  title: {
    default: "Albion — The AI Code Editor That Shows You The Price First",
    template: "%s | Albion IDE",
  },
  description:
    "Albion routes your prompts through the fastest open frontier models, tracks every token in real-time, and enforces hard caps. Built in Nigeria for developers everywhere. Free standalone download for Windows, macOS, and Linux.",
  keywords: [
    "Albion IDE",
    "AI code editor",
    "Cursor alternative",
    "Windsurf alternative",
    "open frontier models",
    "DeepSeek V4 code editor",
    "Qwen coder IDE",
    "developer tools Nigeria",
    "sovereign AI editor",
    "predictable AI pricing",
    "paystack AI editor",
  ],
  authors: [{ name: "Albion Technologies Ltd", url: "https://albionide.com" }],
  creator: "Albion Team",
  publisher: "Albion Technologies Ltd",
  alternates: {
    canonical: "https://albionide.com",
  },
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
      "Routes open frontier models with real-time token tracking and hard spending caps. Download free for Windows, macOS, and Linux.",
    url: "https://albionide.com",
    siteName: "Albion IDE",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Albion IDE — Sovereign AI Code Editor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Albion: The AI code editor that shows you the price first.",
    description: "Routes open frontier models with real-time token tracking and hard spending caps.",
    creator: "@albion_ide",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <Analytics />
      </body>
    </html>
  );
}
