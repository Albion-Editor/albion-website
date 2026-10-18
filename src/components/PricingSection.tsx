"use client";

import React, { useState } from "react";
import { Check, CheckCircle2, AlertCircle } from "lucide-react";
import { PRICING_PLANS, PRICING_STATUS_BANNER } from "@/lib/pricing.config";
import { formatNairaPrice } from "@/lib/exchangeRate";

interface PricingSectionProps {
  exchangeRate?: number | null;
  formattedUpdateTime?: string | null;
}

export function PricingSection({ exchangeRate = 1332, formattedUpdateTime }: PricingSectionProps) {
  const [currency, setCurrency] = useState<"usd" | "ngn">("usd");

  return (
    <section
      id="pricing"
      className="py-24 md:py-32 bg-bg-base border-t border-hairline"
      aria-label="Pricing Plans"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control bg-surface border border-hairline mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
              Predictable Billing
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            Predictable plans. Zero surprise overages.
          </h2>
          <p className="text-muted text-base leading-relaxed mb-6">
            Hard caps enforced on the proxy. When your monthly allocation runs out, Albion routes to our free resilience chain rather than charging credit card overdrafts.
          </p>

          {/* Currency Toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-control bg-surface border border-hairline font-mono text-xs">
            <button
              type="button"
              onClick={() => setCurrency("usd")}
              className={`px-3 py-1 rounded transition-colors ${
                currency === "usd"
                  ? "bg-blue-500 text-white font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              USD ($)
            </button>
            <button
              type="button"
              onClick={() => setCurrency("ngn")}
              className={`px-3 py-1 rounded transition-colors ${
                currency === "ngn"
                  ? "bg-emerald-500 text-white font-semibold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Naira (₦)
            </button>
          </div>
        </div>

        {/* Status Banner per Section 6.5 */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="p-4 rounded-control bg-surface border border-hairline flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-gold-400 shrink-0 mt-1.5 animate-pulse" />
            <div className="text-xs font-mono text-slate-300 leading-relaxed">
              <span className="font-semibold text-white">Public Launch Notice: </span>
              {PRICING_STATUS_BANNER.detail}
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.isPopular;
            const nairaPrice = formatNairaPrice(plan.priceUsd, exchangeRate);

            return (
              <div
                key={plan.id}
                className={`relative rounded-panel p-6 flex flex-col justify-between transition-all duration-200 border ${
                  isPopular
                    ? "bg-[#0E1729] border-blue-500/60 shadow-[0_12px_36px_rgba(47,111,237,0.12)] ring-1 ring-blue-500/30"
                    : "bg-surface border-hairline hover:border-slate-700"
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gold-500 text-slate-950 font-mono text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {plan.badge}
                  </div>
                )}

                <div>
                  {/* Tier Name */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-display font-bold text-lg text-white">
                      {plan.name}
                    </span>
                    <span className="font-mono text-[11px] text-muted">
                      {plan.id === "free" ? "No Card" : "Subscription"}
                    </span>
                  </div>

                  <p className="text-xs text-muted mb-5 min-h-[32px] leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-5 border-b border-hairline">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-4xl font-extrabold text-white">
                        {currency === "usd" || plan.priceUsd === 0
                          ? `$${plan.priceUsd}`
                          : nairaPrice.replace("≈ ", "")}
                      </span>
                      <span className="text-muted text-xs font-mono">
                        {plan.priceUsd === 0 ? "forever" : "/month"}
                      </span>
                    </div>

                    {/* Dual Rate Note */}
                    {plan.priceUsd > 0 && (
                      <div className="text-[11px] font-mono text-emerald-400 mt-1">
                        {currency === "usd"
                          ? `${nairaPrice} / month`
                          : `$${plan.priceUsd} USD base`}
                      </div>
                    )}
                  </div>

                  {/* Proportional Model Cap Bars */}
                  <div className="space-y-3 mb-6">
                    <div className="font-mono text-[10.5px] uppercase tracking-wider text-muted">
                      Monthly Model Quotas:
                    </div>
                    {plan.caps.map((cap) => (
                      <div key={cap.modelName} className="font-mono text-xs">
                        <div className="flex items-center justify-between text-slate-300 text-[11px] mb-1">
                          <span>{cap.modelName}</span>
                          <span className="font-semibold text-white">{cap.amount}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isPopular ? "bg-blue-400" : "bg-slate-400"
                            }`}
                            style={{ width: `${Math.max(8, cap.percent)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button: Free downloads IDE, Paid tiers upgrade inside IDE */}
                {plan.id === "free" ? (
                  <a
                    href="#download"
                    className="w-full h-10 rounded-control font-semibold text-xs flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white shadow-sm transition-all"
                  >
                    Download free
                  </a>
                ) : (
                  <a
                    href="#download"
                    className={`w-full h-10 rounded-control font-semibold text-xs flex items-center justify-center transition-all ${
                      isPopular
                        ? "bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/40"
                        : "bg-surface-raised hover:bg-slate-700 text-slate-200 hover:text-white border border-hairline"
                    }`}
                  >
                    Upgrade in Albion IDE
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Currency Caption per Section 7 */}
        <div className="mt-8 text-center text-xs font-mono text-muted">
          Naira shown at the daily reference rate (updated {formattedUpdateTime || "today at 00:00 UTC"}). Final payment amount is set at checkout.
        </div>
      </div>
    </section>
  );
}
