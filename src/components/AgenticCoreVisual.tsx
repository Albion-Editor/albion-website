"use client";

import React, { useState, useEffect } from "react";
import { Bot, FileCode, Terminal, CheckCircle2, GitMerge, CornerDownRight } from "lucide-react";

export function AgenticCoreVisual() {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-cycle through the multi-agent pipeline steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full rounded-panel bg-[#0A101D] border border-hairline p-5 md:p-7 shadow-xl overflow-hidden select-none">
      {/* Decorative subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#5A9BFF 1px, transparent 1px), linear-gradient(90deg, #5A9BFF 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-hairline">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-control bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
            <Bot className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white tracking-tight">
              Albion Agent Orchestrator
            </div>
            <div className="font-mono text-[10px] text-muted">
              PARALLEL SUB-AGENTS · PTY SESSION #402
            </div>
          </div>
        </div>

        {/* Step indicator pills */}
        <div className="flex items-center gap-1.5 font-mono text-[10.5px]">
          {["01 Prompt", "02 Parallel Execution", "03 Synthesis"].map((s, idx) => (
            <span
              key={s}
              className={`px-2 py-0.5 rounded transition-all duration-300 ${
                (activeStep === 0 && idx === 0) ||
                ((activeStep === 1 || activeStep === 2) && idx === 1) ||
                (activeStep === 3 && idx === 2)
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/40 font-semibold"
                  : "bg-surface text-slate-500 border border-hairline"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Pipeline Visual Flow */}
      <div className="relative z-10 mt-6 space-y-6">
        {/* Step 1: User Prompt Input */}
        <div
          className={`p-3.5 rounded-control transition-all duration-400 border ${
            activeStep >= 0
              ? "bg-[#0E172A] border-blue-500/40 shadow-sm"
              : "bg-surface/40 border-hairline opacity-60"
          }`}
        >
          <div className="flex items-center gap-2 mb-1.5 text-xs text-muted font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>DISPATCHING TASK:</span>
          </div>
          <div className="text-xs sm:text-sm text-slate-100 font-medium">
            &ldquo;Refactor token expiration handling in <code className="text-gold-400 font-mono text-xs">tokenManager.ts</code> and verify zero regressions with unit tests.&rdquo;
          </div>
        </div>

        {/* Dynamic Branching Connector Lines (SVG) */}
        <div className="w-full flex justify-center py-0.5" aria-hidden="true">
          <svg className="w-full max-w-md h-8 text-blue-500/30" viewBox="0 0 320 32" fill="none">
            {/* Split from center to 2 parallel paths */}
            <path
              d="M 160 0 L 160 10 L 80 18 L 80 32"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className={activeStep >= 1 ? "text-blue-400 stroke-dash-animated" : ""}
            />
            <path
              d="M 160 0 L 160 10 L 240 18 L 240 32"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className={activeStep >= 1 ? "text-blue-400 stroke-dash-animated" : ""}
            />
          </svg>
        </div>

        {/* Step 2: Parallel Sub-Agent Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Sub-Agent A: File & AST Inspector */}
          <div
            className={`p-4 rounded-control border transition-all duration-300 ${
              activeStep === 1 || activeStep === 2
                ? "bg-[#0D182E] border-blue-500/50 shadow-md ring-1 ring-blue-500/30"
                : "bg-surface border-hairline"
            }`}
          >
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-blue-500/10 flex items-center justify-center">
                  <FileCode className="w-3.5 h-3.5 text-blue-400" />
                </div>
                <span className="font-semibold text-slate-200">Sub-Agent A: File Inspector</span>
              </div>
              <span className="font-mono text-[10px] text-blue-400 px-1.5 py-0.5 rounded bg-blue-500/10">
                ACTIVE
              </span>
            </div>

            <div className="font-mono text-xs text-slate-300 space-y-1.5 bg-[#070C18] p-2.5 rounded border border-hairline">
              <div className="text-slate-500 text-[11px]">// Reading AST definitions</div>
              <div className="text-emerald-400 text-[11.5px]">✓ read_file(src/auth/tokenManager.ts)</div>
              <div className="text-slate-400 text-[11.5px] pl-3">↳ 114 lines parsed · SafeStorage validated</div>
              <div className="text-gold-400 text-[11.5px]">✓ stage_diff(.albion-shadow/)</div>
            </div>
          </div>

          {/* Sub-Agent B: Embedded Terminal PTY */}
          <div
            className={`p-4 rounded-control border transition-all duration-300 ${
              activeStep === 2 || activeStep === 3
                ? "bg-[#0D182E] border-emerald-500/40 shadow-md ring-1 ring-emerald-500/30"
                : "bg-surface border-hairline"
            }`}
          >
            <div className="flex items-center justify-between mb-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-emerald-500/10 flex items-center justify-center">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="font-semibold text-slate-200">Sub-Agent B: Persistent PTY</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10">
                EXEC
              </span>
            </div>

            <div className="font-mono text-xs text-slate-300 space-y-1 bg-[#070C18] p-2.5 rounded border border-hairline">
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="text-emerald-400">$</span>
                <span className="text-slate-200">npm test -- auth</span>
              </div>
              <div className="text-slate-500 text-[11px]">PASS src/auth/tokenManager.test.ts</div>
              <div className="text-emerald-400 text-[11.5px] font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>12 passed (1.42s) · 0 regressions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Merge Connector Lines (SVG) */}
        <div className="w-full flex justify-center py-0.5" aria-hidden="true">
          <svg className="w-full max-w-md h-8 text-blue-500/30" viewBox="0 0 320 32" fill="none">
            {/* Merge from 2 parallel paths into center */}
            <path
              d="M 80 0 L 80 14 L 160 22 L 160 32"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className={activeStep >= 2 ? "text-emerald-400 stroke-dash-animated" : ""}
            />
            <path
              d="M 240 0 L 240 14 L 160 22 L 160 32"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              className={activeStep >= 2 ? "text-emerald-400 stroke-dash-animated" : ""}
            />
          </svg>
        </div>

        {/* Step 3: Synthesis & Verification Merge */}
        <div
          className={`p-3.5 rounded-control transition-all duration-300 border flex items-center justify-between gap-3 ${
            activeStep === 3
              ? "bg-[#091524] border-emerald-500/50 shadow-sm"
              : "bg-surface border-hairline"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-emerald-500/10 flex items-center justify-center">
              <GitMerge className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div>
              <span className="text-xs font-semibold text-white">
                Atomic Stage Commit
              </span>
              <span className="hidden sm:inline text-xs text-muted ml-2">
                · Verified against test suite before applying to disk
              </span>
            </div>
          </div>
          <span className="font-mono text-xs text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 shrink-0">
            READY TO APPLY
          </span>
        </div>
      </div>

      {/* Caption per specification */}
      <div className="mt-6 pt-4 border-t border-hairline text-center">
        <p className="text-xs sm:text-sm text-slate-400 font-medium">
          Autonomous, multi-step reasoning. Albion doesn&apos;t just guess; it reads, tests, and verifies.
        </p>
      </div>
    </div>
  );
}
