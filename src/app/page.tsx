import React from "react";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProductSurfaces } from "@/components/ProductSurfaces";
import { ModelsSection } from "@/components/ModelsSection";
import { PricingSection } from "@/components/PricingSection";
import { DownloadSection } from "@/components/DownloadSection";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";
import { getExchangeRate } from "@/lib/exchangeRate";

export const revalidate = 3600; // 1-hour ISR for reference exchange rate

export default async function HomePage() {
  const fx = await getExchangeRate();

  return (
    <div className="min-h-screen bg-bg-base text-text-main flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Announcement Banner (Easily removable when paid tiers go live) */}
      <AnnouncementBanner />

      {/* Global Navbar */}
      <Navbar />

      {/* Main Content Area (targeted by skip-to-content) */}
      <main id="main-content" className="flex-1">
        {/* Hero Section with authentic editor UI & Signal Grid */}
        <HeroSection />

        {/* 4 Core Surfaces with Coded Visual Mockups */}
        <ProductSurfaces usdToNgn={fx.rate ?? 1332} />

        {/* Frontier Parity Benchmarks Table */}
        <ModelsSection />

        {/* Predictable Pricing & Model Quota Bars */}
        <PricingSection
          exchangeRate={fx.rate}
          formattedUpdateTime={fx.formattedUpdateTime}
        />

        {/* Standalone OS Binary Downloads */}
        <DownloadSection />

        {/* Closing Call to Action */}
        <ClosingCta />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
