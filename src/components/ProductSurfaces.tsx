"use client";

import React, { useState } from "react";
import {
  Code2,
  ShieldCheck,
  Fuel,
  Terminal,
  Cpu,
  CheckCircle2,
  Gauge,
  ArrowRight,
} from "lucide-react";
import { AgenticCoreVisual } from "./AgenticCoreVisual";
import { TrustEngineVisual } from "./TrustEngineVisual";
import { LiveCostRadarVisual } from "./LiveCostRadarVisual";

interface ProductSurfacesProps {
  usdToNgn?: number;
}

export function ProductSurfaces({ usdToNgn = 1332 }: ProductSurfacesProps) {
  // Mock Fuel Gauge state for the interactive preview
  const [fuelSimTier, setFuelSimTier] = useState<"starter" | "pro">("starter");

  return (
    <section id="features" className="py-24 md:py-32 bg-bg-base border-t border-hairline" aria-label="Product Surfaces">
      <div className="max-w-container mx-auto px-4 sm:px-6 space-y-28 md:space-y-36">

        {/* ── Surface 1: The Agentic Core & Autonomous Orchestrator ──────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control bg-surface border border-hairline mb-4">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                Surface 01 · Agentic Core
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
              Albion IDE: The fully-featured agentic editor.
            </h2>
            <p className="text-muted text-base leading-relaxed mb-6">
              Complete with a native agent manager, persistent project memory, and codebase understanding via local Language Server Protocol (LSP). Albion coordinates parallel sub-agents to read files, search symbols, and execute tests without manual intervention.
            </p>
            <ul className="space-y-3 text-sm text-slate-300 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Multi-step autonomous task execution with sub-agents</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Deep codebase AST indexing without cloud telemetry</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Artifact rendering for plan reviews and code diffs</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7 w-full">
            <AgenticCoreVisual />
          </div>
        </div>

        {/* ── Surface 2: Live Cost Radar ────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7 w-full order-2 lg:order-1">
            <LiveCostRadarVisual usdToNgn={usdToNgn} />
          </div>
          <div className="lg:col-span-5 flex flex-col items-start order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control bg-surface border border-hairline mb-4">
              <Gauge className="w-3.5 h-3.5 text-gold-400" />
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                Surface 02 · Live Cost Radar
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
              Know the exact price on every keystroke.
            </h2>
            <p className="text-muted text-base leading-relaxed mb-6">
              No opaque tokens or surprise invoices. Albion calculates pre-flight token volume and dollar costs in real-time. Drop a screenshot, and it automatically engages native vision routing to multimodal models.
            </p>
            <div className="p-4 rounded-control bg-surface border border-hairline w-full space-y-2 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between text-muted">
                <span>Keystroke Tokenization:</span>
                <span className="text-white font-semibold">Instant (Client-Side)</span>
              </div>
              <div className="flex items-center justify-between text-muted">
                <span>Multimodal Switch:</span>
                <span className="text-blue-400 font-semibold">Qwen3.6-35B-A3B</span>
              </div>
              <div className="flex items-center justify-between text-muted">
                <span>Currency Display:</span>
                <span className="text-emerald-400 font-semibold">USD + Dual Naira Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Surface 3: The Trust Engine ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control bg-surface border border-hairline mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                Surface 03 · The Trust Engine
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
              Changes stage in isolation. Green shield only when tests pass.
            </h2>
            <p className="text-muted text-base leading-relaxed mb-6">
              AI code generators frequently write plausible code that breaks at runtime. Albion stages every edit in <code className="text-gold-400 font-mono text-xs bg-gold-400/10 px-1.5 py-0.5 rounded">.albion-shadow/</code> and executes your automated test suite in an isolated sandbox. Only passing suites earn the Verified badge.
            </p>
            <ul className="space-y-3 text-sm text-slate-300 font-medium">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero uncommitted filesystem damage during code refactors</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Explicit Unverified warnings when test coverage is absent</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Single-click atomic rollback if test suites fail</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7 w-full">
            <TrustEngineVisual />
          </div>
        </div>

        {/* ── Surface 4: Persistent Fuel Gauge & Terminal CLI Integration ────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Terminal & PTY Visual */}
          <div className="lg:col-span-7 w-full order-2 lg:order-1">
            <div className="rounded-panel bg-[#0A101D] border border-hairline p-5 md:p-6 shadow-xl overflow-hidden font-mono text-xs">
              {/* Window Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline text-muted">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-white font-semibold">Albion Embedded PTY · Node v20.x</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  PERSISTENT SESSION
                </span>
              </div>

              {/* Terminal Session Content */}
              <div className="space-y-2 text-slate-300 bg-[#070C18] p-4 rounded border border-hairline">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400">➜</span>
                  <span className="text-blue-400">~/projects/albion-app</span>
                  <span className="text-slate-500 font-sans">git:(main)</span>
                  <span className="text-gold-400">$</span>
                  <span className="text-white">albion agent --task &quot;audit auth leaks&quot;</span>
                </div>
                <div className="text-slate-500">[INFO] Spawning sub-agent #1 in shadow workspace</div>
                <div className="text-slate-400">[PROXY] Route: DeepSeek-V4-Flash | Tokens: 840 (Quota remaining: 7.99M)</div>
                <div className="text-emerald-400">✔ Scanned 48 source files. 0 plaintext secret leaks detected.</div>
                <div className="flex items-center gap-2 pt-2 border-t border-hairline text-slate-400">
                  <span className="text-emerald-400">➜</span>
                  <span className="text-blue-400">~/projects/albion-app</span>
                  <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-1 align-middle" />
                </div>
              </div>

              {/* Fuel Gauge Quota Bars inside Terminal */}
              <div className="mt-4 pt-3 border-t border-hairline space-y-2">
                <div className="flex items-center justify-between text-[11px] text-muted">
                  <span className="font-semibold text-slate-200">Proxy Quota Enforcement:</span>
                  <span className="text-emerald-400">Cap Reached → 402 Returned · Zero Overdraft</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px]">
                  <div className="p-2 rounded bg-surface border border-hairline">
                    <div className="text-slate-400">DeepSeek V4.1 Flash</div>
                    <div className="font-bold text-white mt-0.5">1.2M / 4.0M (30%)</div>
                    <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                      <div className="w-[30%] h-full bg-blue-500 rounded-full" />
                    </div>
                  </div>
                  <div className="p-2 rounded bg-surface border border-hairline">
                    <div className="text-slate-400">MiMo v2.6 Flash</div>
                    <div className="font-bold text-white mt-0.5">800k / 4.0M (20%)</div>
                    <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                      <div className="w-[20%] h-full bg-gold-400 rounded-full" />
                    </div>
                  </div>
                  <div className="p-2 rounded bg-surface border border-hairline col-span-2 sm:col-span-1">
                    <div className="text-slate-400">Qwen 3 Coder 30B</div>
                    <div className="font-bold text-white mt-0.5">45k / 100k (45%)</div>
                    <div className="w-full h-1 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                      <div className="w-[45%] h-full bg-emerald-400 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-start order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control bg-surface border border-hairline mb-4">
              <Fuel className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
                Surface 04 · Persistent Fuel Gauge & PTY
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
              Hard proxy caps and real shell access.
            </h2>
            <p className="text-muted text-base leading-relaxed mb-6">
              Caps are strictly enforced on the proxy, not in cosmetic client UI. When you reach your monthly allocation, Albion returns HTTP 402 — no overdraft, no surprise charge. Your editor stays open and your wallet stays safe.
            </p>
            <div className="space-y-3 text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Embedded PTY with true interactive terminal sessions</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero bill shock: hard limits reject unexpected spikes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Manual model selection — pick DeepSeek, Qwen, MiMo or Grok per session</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
