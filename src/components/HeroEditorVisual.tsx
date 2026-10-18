"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShieldCheck, Sparkles, Terminal, FileCode2, Check, ArrowUpRight } from "lucide-react";

export function HeroEditorVisual() {
  const [tokens, setTokens] = useState(0);
  const [costNgn, setCostNgn] = useState(0.00);
  const [gaugePercent, setGaugePercent] = useState(0);

  // Entrance tick animation for numbers and gauge
  useEffect(() => {
    const timer = setTimeout(() => {
      let currentToken = 0;
      const targetTokens = 1420;
      const interval = setInterval(() => {
        currentToken += 71;
        if (currentToken >= targetTokens) {
          currentToken = targetTokens;
          clearInterval(interval);
        }
        setTokens(currentToken);
        setCostNgn(Number(((currentToken / 1000) * 0.00014 * 1332).toFixed(2)));
        setGaugePercent(Math.min(100, Math.floor((currentToken / targetTokens) * 30)));
      }, 35);

      return () => clearInterval(interval);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full rounded-panel overflow-hidden bg-[#0A101D] border border-hairline shadow-[0_24px_50px_-12px_rgba(0,0,0,0.65)] select-none">
      {/* Top Window Chrome */}
      <div className="h-9 px-3.5 bg-[#0D1526] border-b border-hairline flex items-center justify-between text-xs text-muted">
        {/* Window controls */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]/70" />
          <span className="ml-2 font-mono text-[11px] text-slate-400 font-medium">
            albion-workspace — src/auth/tokenManager.ts
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Proxy: 3000
          </span>
        </div>
      </div>

      {/* Editor Tabs */}
      <div className="h-8 bg-[#090E1A] border-b border-hairline flex items-center px-2 gap-1 text-xs font-mono">
        <div className="h-full px-3 bg-[#0A101D] border-r border-hairline text-text-main flex items-center gap-2 border-t-2 border-t-blue-500">
          <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
          <span>tokenManager.ts</span>
        </div>
        <div className="h-full px-3 text-muted hover:text-slate-300 flex items-center gap-2 transition-colors">
          <span>albionTransport.ts</span>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 sm:p-5 font-mono text-[12.5px] leading-relaxed text-slate-300 overflow-x-auto">
        <div className="grid grid-cols-[30px_1fr] gap-4">
          {/* Line Numbers */}
          <div className="text-slate-600 text-right select-none space-y-1 text-xs">
            <div>24</div>
            <div>25</div>
            <div>26</div>
            <div>27</div>
            <div>28</div>
            <div>29</div>
            <div>30</div>
            <div>31</div>
          </div>

          {/* Code Lines */}
          <div className="space-y-1 text-slate-200">
            <div>
              <span className="text-blue-400">export async function</span>{" "}
              <span className="text-[#FFCB3D]">saveSecureToken</span>
              <span className="text-slate-400">(token: string): Promise&lt;void&gt; &#123;</span>
            </div>
            <div className="pl-4 text-slate-400">
              <span className="text-blue-400">if</span> (safeStorage.isEncryptionAvailable()) &#123;
            </div>
            <div className="pl-8 text-slate-300">
              <span className="text-blue-400">const</span> encrypted = safeStorage.encryptString(token);
            </div>
            <div className="pl-8 text-slate-400">
              <span className="text-blue-400">await</span> secureStore.write(
              <span className="text-emerald-400">&apos;albion:auth&apos;</span>, encrypted);
            </div>
            <div className="pl-4 text-slate-400">&#125;</div>
            <div className="text-slate-400">&#125;</div>
            <div className="text-slate-600 italic">// AI refactor verified against 12 test suites</div>
          </div>
        </div>

        {/* Real-time Inline Cost Radar Box */}
        <div className="mt-5 p-3.5 rounded-control bg-[#0E1729] border border-blue-500/25 shadow-inner">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-text-main font-semibold">Live Cost Radar</span>
              <span className="text-muted text-[11px]">(pre-flight estimate)</span>
            </div>
            <div className="font-mono text-xs text-blue-400 font-medium">
              EST. TOKENS: <span className="text-white font-bold">{tokens.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono pt-2 border-t border-hairline/60">
            <div className="flex items-center gap-2 text-muted">
              <span>ROUTED:</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-300 font-semibold text-[11px]">
                DeepSeek V4 Flash
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-muted text-[11px]">Input Cost:</span>
              <span className="text-gold-400 font-bold">$0.0002</span>
              <span className="text-slate-400 text-[11px]">(≈ ₦{costNgn.toFixed(2)})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editor Status Bar / Fuel Gauge (Exact replica from Albion Fuel Gauge) */}
      <div className="h-8 px-3 bg-[#0B1220] border-t border-hairline flex items-center justify-between text-[11px] font-mono text-muted overflow-x-auto whitespace-nowrap">
        {/* Left: Tier & Active Model */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="font-bold text-slate-200">Albion: Starter</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">GLM: 45k/150k ({gaugePercent}%)</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Flash: 1.2M/8M</span>
        </div>

        {/* Right: Verified Shield & Cost */}
        <div className="flex items-center gap-3 pl-3">
          <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>12 tests passed: Verified</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Included</span>
        </div>
      </div>
    </div>
  );
}
