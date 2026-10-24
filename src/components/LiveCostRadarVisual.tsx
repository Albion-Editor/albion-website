"use client";

import React, { useState, useMemo } from "react";
import { Image as ImageIcon, Send, Sparkles, Check, ArrowRight, CornerDownLeft } from "lucide-react";

interface LiveCostRadarVisualProps {
  usdToNgn?: number;
}

export function LiveCostRadarVisual({ usdToNgn = 1332 }: LiveCostRadarVisualProps) {
  const [prompt, setPrompt] = useState(
    "Write an async pipeline that validates incoming webhook signatures from NOWPayments and refreshes expired user sessions."
  );
  const [hasImage, setHasImage] = useState(false);

  // Compute tokens in real-time: ceil(chars / 4) + 640 tokens if image attached
  const tokenCount = useMemo(() => {
    const textTokens = Math.max(12, Math.ceil(prompt.length / 4));
    return hasImage ? textTokens + 640 : textTokens;
  }, [prompt, hasImage]);

  // Routing rule: image -> Qwen Vision, otherwise DeepSeek V4 Flash
  const activeModel = hasImage
    ? {
        name: "DeepSeek V4.1 Flash (Vision)",
        provider: "Native Multimodal",
        costPer1MTokens: 0.20,
        badge: "Image Detected",
      }
    : {
        name: "DeepSeek V4 Flash",
        provider: "DeepInfra · DeepSeek V4.1 Flash",
        costPer1MTokens: 0.14,
        badge: "Routine Fast Edit",
      };

  // Pre-flight cost estimate
  const costUsd = (tokenCount / 1_000_000) * activeModel.costPer1MTokens;
  const costNgn = costUsd * usdToNgn;

  return (
    <div className="relative w-full rounded-panel bg-[#0A101D] border border-hairline p-5 md:p-7 shadow-xl overflow-hidden select-none">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-hairline">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.08em] text-white">
            Pre-Flight Cost Radar · Interactive Composer
          </span>
        </div>
        <div className="font-mono text-[11px] text-muted">
          Type below or toggle screenshot to see live cost estimate
        </div>
      </div>

      {/* Mock Chat Composer */}
      <div className="mt-5 rounded-control bg-surface border border-hairline overflow-hidden focus-within:border-blue-500/50 transition-colors">
        <div className="p-3.5">
          <label htmlFor="mock-prompt-input" className="sr-only">
            Interactive Prompt Input
          </label>
          <textarea
            id="mock-prompt-input"
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type code instruction, bug fix, or refactor..."
            className="w-full bg-transparent text-sm text-text-main placeholder-slate-500 focus:outline-none resize-none font-mono leading-relaxed"
          />
        </div>

        {/* Composer Controls Bar */}
        <div className="px-3.5 py-2.5 bg-[#070C18] border-t border-hairline flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Image Toggle */}
          <button
            type="button"
            onClick={() => setHasImage(!hasImage)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control font-mono transition-all ${
              hasImage
                ? "bg-blue-500/20 text-blue-300 border border-blue-500/40 font-semibold"
                : "bg-surface text-slate-400 hover:text-white border border-hairline"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{hasImage ? "Screenshot Attached (+640 tok)" : "Attach Screenshot"}</span>
          </button>

          {/* Quick Preset Buttons */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-muted">
            <span>Try:</span>
            <button
              type="button"
              onClick={() =>
                setPrompt("Fix off-by-one index error in LRU cache eviction routine.")
              }
              className="hover:text-blue-400 underline decoration-slate-600 underline-offset-2"
            >
              Short Bugfix
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() =>
                setPrompt(
                  "Implement complete end-to-end OAuth2 token refresh with local safeStorage encryption, IPC listeners, and automated fallback tests across multiple renderer windows."
                )
              }
              className="hover:text-blue-400 underline decoration-slate-600 underline-offset-2"
            >
              Complex Refactor
            </button>
          </div>
        </div>
      </div>

      {/* Real-Time Live Radar Metric Panel */}
      <div className="mt-4 p-4 rounded-control bg-[#0E1729] border border-blue-500/30">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Metric 1: Token Count */}
          <div className="flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
              Estimated Tokens
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-mono text-xl font-bold text-white">
                {tokenCount.toLocaleString()}
              </span>
              <span className="font-mono text-xs text-slate-400">tokens</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono mt-0.5">
              ceil(characters / 4)
            </span>
          </div>

          {/* Metric 2: Active Routed Model */}
          <div className="flex flex-col">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
              Selected Model
            </span>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="font-mono text-sm font-bold text-blue-400">
                {activeModel.name}
              </span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono mt-0.5">
              ✓ {activeModel.badge}
            </span>
          </div>

          {/* Metric 3: Input Cost (USD + Naira) */}
          <div className="flex flex-col sm:text-right">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
              Pre-Flight Cost
            </span>
            <div className="mt-1 flex items-baseline sm:justify-end gap-1.5 font-mono">
              <span className="text-xl font-bold text-gold-400">
                ${costUsd < 0.0001 ? "<$0.0001" : costUsd.toFixed(4)}
              </span>
              <span className="text-xs text-slate-400 font-medium">USD</span>
            </div>
            <span className="text-[10.5px] text-emerald-400 font-mono mt-0.5">
              ≈ ₦{costNgn < 0.01 ? "<0.01" : costNgn.toFixed(2)} NGN
            </span>
          </div>
        </div>

        {/* Dynamic Model Comparison Table */}
        <div className="mt-4 pt-3 border-t border-hairline/60">
          <div className="flex items-center justify-between text-[11px] font-mono text-muted mb-2">
            <span>Model Alternative</span>
            <span>Est. Cost</span>
            <span>Status</span>
          </div>
          <div className="space-y-1.5 font-mono text-xs">
            {/* DeepSeek Flash */}
            <div
              className={`p-2 rounded flex items-center justify-between transition-colors ${
                !hasImage
                  ? "bg-blue-500/15 border border-blue-500/30 text-white font-semibold"
                  : "bg-surface/50 text-slate-400 border border-hairline"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${!hasImage ? "bg-blue-400" : "bg-slate-500"}`} />
                <span>DeepSeek V4 Flash</span>
              </div>
              <span className="text-gold-400 font-medium">
                ${((tokenCount / 1_000_000) * 0.14).toFixed(5)}
              </span>
              <span className="text-[10.5px]">
                {!hasImage ? "Active Route" : "Standard"}
              </span>
            </div>

            {/* Qwen Vision */}
            <div
              className={`p-2 rounded flex items-center justify-between transition-colors ${
                hasImage
                  ? "bg-blue-500/15 border border-blue-500/30 text-white font-semibold"
                  : "bg-surface/50 text-slate-400 border border-hairline"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${hasImage ? "bg-blue-400" : "bg-slate-500"}`} />
                <span>DeepSeek V4.1 Flash (Vision)</span>
              </div>
              <span className="text-gold-400 font-medium">
                ${((tokenCount / 1_000_000) * 0.20).toFixed(5)}
              </span>
              <span className="text-[10.5px]">
                {hasImage ? "Active Route (Multimodal)" : "Idle"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
