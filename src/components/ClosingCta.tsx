import React from "react";
import { Download, Mail } from "lucide-react";

export function ClosingCta() {
  return (
    <section className="py-20 md:py-28 bg-[#070C18] border-t border-hairline text-center relative overflow-hidden" aria-label="Closing Call to Action">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
          Download Albion. Start free.
        </h2>
        <p className="text-muted text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          The sovereign AI editor that shows you the price first. No credit card required to start coding with open frontier intelligence.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#download"
            className="inline-flex items-center gap-2 h-12 px-7 rounded-control bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm sm:text-base shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
          >
            <Download className="w-4 h-4 stroke-[2]" />
            <span>Download Albion</span>
          </a>
          <a
            href="mailto:support@albionide.com?subject=Albion%20Inquiry"
            className="inline-flex items-center gap-2 h-12 px-6 rounded-control bg-surface hover:bg-surface-raised border border-hairline text-slate-200 hover:text-white font-medium text-sm sm:text-base transition-colors"
          >
            <Mail className="w-4 h-4 text-muted" />
            <span>Email us</span>
          </a>
        </div>
      </div>
    </section>
  );
}
