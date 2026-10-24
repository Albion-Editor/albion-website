import React from "react";
import { BenchmarkTable } from "./BenchmarkTable";
import { ShieldCheck, Zap, DollarSign } from "lucide-react";

export function ModelsSection() {
  return (
    <section
      id="models"
      className="py-24 md:py-32 bg-[#080E1B] border-t border-hairline"
      aria-label="Frontier Parity Benchmarks"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control bg-surface border border-hairline mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
              Model Intelligence &amp; Cost Parity
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            Close to the frontier. Nowhere near the frontier&apos;s price.
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            Every model Albion routes to, what it&apos;s for, what it costs, and how it scores. We focus on coding-specific benchmarks where open-weight models punch directly above their weight class.
          </p>
        </div>

        {/* Highlight Banner: 29x Cost Efficiency */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-5 rounded-panel bg-surface border border-hairline flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-muted mb-2">
              <Zap className="w-3.5 h-3.5 text-gold-400" />
              <span>SWE-BENCH VERIFIED</span>
            </div>
            <div className="font-display text-2xl sm:text-3xl font-bold text-gold-400">
              80.6%
            </div>
            <div className="text-xs text-slate-300 mt-1">
              DeepSeek V4.5 Instruct on verified coding benchmarks
            </div>
          </div>

          <div className="p-5 rounded-panel bg-surface border border-hairline flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-muted mb-2">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>COST MULTIPLIER</span>
            </div>
            <div className="font-display text-2xl sm:text-3xl font-bold text-emerald-400">
              29x Cheaper
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Output price relative to closed frontier reference
            </div>
          </div>

          <div className="p-5 rounded-panel bg-surface border border-hairline flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-muted mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>MANUAL SELECT</span>
            </div>
            <div className="font-display text-2xl sm:text-3xl font-bold text-blue-400">
              Zero Surprise Burn
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Choose your model per session — Pro tier unlocks frontier models
            </div>
          </div>
        </div>

        {/* Sourced Benchmark Table */}
        <BenchmarkTable />
      </div>
    </section>
  );
}
