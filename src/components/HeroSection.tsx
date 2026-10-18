"use client";

import React, { useEffect, useState } from "react";
import { Download, ChevronRight, CheckCircle2 } from "lucide-react";
import { SignalGrid } from "./SignalGrid";
import { HeroEditorVisual } from "./HeroEditorVisual";

export function HeroSection() {
  const [osName, setOsName] = useState<string>("Windows");

  // Client-side visitor OS detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes("mac")) {
      setOsName("macOS");
    } else if (ua.includes("linux")) {
      setOsName("Linux");
    } else {
      setOsName("Windows");
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative pt-[104px] pb-16 md:py-24 lg:py-28 overflow-hidden bg-bg-base"
      aria-label="Hero Overview"
    >
      {/* Background Signal Grid (Canvas 2D + CSS fallback) */}
      <SignalGrid />

      {/* Large soft blue radial glow behind the product visual (CSS only, 12s) */}
      <div
        className="absolute top-1/2 right-[5%] -translate-y-1/2 w-[540px] h-[540px] rounded-full pointer-events-none opacity-45 blur-[120px] bg-gradient-to-tr from-blue-600/30 via-blue-500/20 to-transparent animate-pulse-slow"
        aria-hidden="true"
      />

      <div className="relative max-w-container mx-auto px-4 sm:px-6">
        {/* 12-Column Grid (1024px+): text in 1-6, visual in 7-12 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text (Cols 1-6) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control bg-surface border border-hairline mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted font-medium">
                ALBION IDE · v0.0.45
              </span>
            </div>

            {/* H1 */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-[-0.02em] leading-[1.05] mb-6 text-balance">
              The AI code editor that shows you the price first.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted leading-relaxed mb-8 max-w-xl">
              Albion routes your prompts through the fastest open frontier models, tracks every
              token in real-time, and enforces hard caps — so you&apos;re always in control of your code
              and your wallet. Built in Nigeria for developers everywhere.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 w-full sm:w-auto">
              <a
                href="#download"
                className="inline-flex items-center justify-center gap-2.5 h-12 px-6 rounded-control bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all active:scale-[0.99] w-full sm:w-auto"
              >
                <Download className="w-4 h-4 stroke-[2]" aria-hidden="true" />
                <span>Download for {osName}</span>
              </a>

              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-1.5 h-12 px-5 rounded-control bg-surface hover:bg-surface-raised border border-hairline text-slate-200 hover:text-white font-medium text-sm sm:text-base transition-colors w-full sm:w-auto"
              >
                <span>See pricing</span>
                <ChevronRight className="w-4 h-4 text-muted" aria-hidden="true" />
              </a>
            </div>

            {/* Three Plain Facts Under CTAs */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-400 font-medium pt-4 border-t border-hairline/60">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>Free tier, no card</span>
              </div>
              <span className="text-slate-600 hidden sm:inline" aria-hidden="true">
                ·
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" aria-hidden="true" />
                <span>Hard token caps</span>
              </div>
              <span className="text-slate-600 hidden sm:inline" aria-hidden="true">
                ·
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" aria-hidden="true" />
                <span>Plans from $3/month</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Visual (Cols 7-12) */}
          <div className="lg:col-span-6 w-full z-10">
            <HeroEditorVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
