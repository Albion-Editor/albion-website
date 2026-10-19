"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X } from "lucide-react";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Paid tiers announcement"
      className="relative z-50 w-full overflow-hidden bg-gradient-to-r from-[#0B132B] via-[#101D42] to-[#0B132B] border-b border-blue-500/25 text-white transition-all duration-300"
    >
      {/* Animated glowing sheen background highlight */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent animate-pulse"
        aria-hidden="true"
      />

      <div className="relative max-w-container mx-auto px-4 sm:px-6 py-2.5 sm:py-2 flex items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Left / Center content: Animated Live Pulse Badge + Message */}
        <div className="flex-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1 text-center sm:text-left">
          {/* Animated Status Pill */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-[11px] font-semibold tracking-wide uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            <span>Paid Tier Coming Soon</span>
          </div>

          {/* Main Announcement Copy */}
          <p className="text-slate-200 font-medium">
            <span className="text-white font-semibold">Running low on free tokens?</span>{" "}
            Paid plans & instant top-ups are launching shortly as Paystack & Lemon Squeezy merchant integrations finalize.
          </p>

          {/* Jump Link to Pricing */}
          <a
            href="#pricing"
            className="inline-flex items-center gap-1 font-semibold text-blue-400 hover:text-blue-300 hover:underline transition-colors shrink-0"
          >
            <span>Preview upcoming tiers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
