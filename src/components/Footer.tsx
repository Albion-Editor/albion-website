import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-bg-base border-t border-hairline pt-16 pb-12" role="contentinfo">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-hairline/60">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <Image
                src="/albion-logo.svg"
                alt="Albion Logo"
                width={28}
                height={28}
                className="w-7 h-7 object-contain"
              />
              <span className="font-display font-bold text-lg text-white">Albion</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-sm mb-4">
              The AI code editor that routes open frontier models, tracks every token in real-time,
              and shows you the price first.
            </p>
            <p className="font-mono text-xs text-slate-500">
              Albion IDE: built in Nigeria, for developers everywhere.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Product */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-white font-semibold">
                Product
              </span>
              <a href="#features" className="text-sm text-muted hover:text-white transition-colors">
                Features
              </a>
              <a href="#models" className="text-sm text-muted hover:text-white transition-colors">
                Models
              </a>
              <a href="#pricing" className="text-sm text-muted hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#download" className="text-sm text-muted hover:text-white transition-colors">
                Download
              </a>
            </div>

            {/* Support */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-white font-semibold">
                Support
              </span>
              <a
                href="mailto:support@albionide.com"
                className="text-sm text-muted hover:text-white transition-colors"
              >
                support@albionide.com
              </a>
              <a
                href="mailto:support@albionide.com?subject=Albion%20feedback"
                className="text-sm text-muted hover:text-white transition-colors"
              >
                Send Feedback
              </a>
            </div>

            {/* Follow */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-white font-semibold">
                Follow
              </span>
              <a
                href="https://x.com/albion_ide"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <span>X (@albion_ide)</span>
                <span className="text-xs text-slate-500" aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>© {new Date().getFullYear()} Albion Technologies Ltd. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span className="text-emerald-400 inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
