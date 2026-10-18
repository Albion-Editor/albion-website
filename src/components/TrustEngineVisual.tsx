"use client";

import React, { useState } from "react";
import { ShieldCheck, ShieldAlert, Lock, CheckCircle2, AlertTriangle, FileCode2, Terminal, RefreshCw } from "lucide-react";

export function TrustEngineVisual() {
  const [suiteResult, setSuiteResult] = useState<"pass" | "no-tests">("pass");
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = (target: "pass" | "no-tests") => {
    setIsSimulating(true);
    setSuiteResult(target);
    setTimeout(() => {
      setIsSimulating(false);
    }, 400);
  };

  return (
    <div className="relative w-full rounded-panel bg-[#0A101D] border border-hairline p-5 md:p-7 shadow-xl overflow-hidden select-none">
      {/* Top Bar with Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-hairline">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold text-white tracking-tight uppercase tracking-[0.08em] font-mono">
              The Trust Engine · Sandboxed Execution
            </span>
          </div>
          <p className="text-xs text-muted mt-0.5">
            Changes stage in <code className="text-gold-400 font-mono text-[11px]">.albion-shadow/</code> before touching your real working tree.
          </p>
        </div>

        {/* Toggle to prove we don't fake success */}
        <div className="flex items-center gap-2 bg-surface p-1 rounded-control border border-hairline text-xs font-mono">
          <button
            type="button"
            onClick={() => handleSimulate("pass")}
            className={`px-2.5 py-1 rounded transition-colors ${
              suiteResult === "pass"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Pass (12 Tests)
          </button>
          <button
            type="button"
            onClick={() => handleSimulate("no-tests")}
            className={`px-2.5 py-1 rounded transition-colors ${
              suiteResult === "no-tests"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 font-semibold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            No Tests (Unverified)
          </button>
        </div>
      </div>

      {/* 3-Step Horizontal Stepper Layout */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 relative">
        {/* Step 1: AI Code Edit */}
        <div className="p-4 rounded-control bg-surface border border-hairline flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
              <span className="text-blue-400 font-semibold">01 / GENERATE</span>
              <FileCode2 className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xs font-medium text-white mb-2">AI generates code edit</div>
            <div className="bg-[#070C18] p-2.5 rounded border border-hairline font-mono text-[11px] space-y-1">
              <div className="text-slate-500">// tokenManager.ts</div>
              <div className="text-gold-400 bg-gold-500/10 px-1 py-0.5 rounded border border-gold-500/20">
                + if (token.isExpired()) await refresh();
              </div>
              <div className="text-slate-400">  return activeSession;</div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-muted flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span>Yellow diff generated</span>
          </div>
        </div>

        {/* Step 2: Staged in .albion-shadow/ */}
        <div className="p-4 rounded-control bg-surface border border-hairline flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
              <span className="text-blue-400 font-semibold">02 / ISOLATE</span>
              <Lock className="w-4 h-4 text-gold-400" />
            </div>
            <div className="text-xs font-medium text-white mb-2">Locked in Shadow Tree</div>
            <div className="bg-[#070C18] p-2.5 rounded border border-hairline font-mono text-[11px] space-y-1">
              <div className="text-slate-400 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-gold-400 shrink-0" />
                <span className="text-slate-300">.albion-shadow/</span>
              </div>
              <div className="text-slate-500 pl-3">├── src/auth/tokenManager.ts</div>
              <div className="text-slate-500 pl-3">└── tsconfig.shadow.json</div>
            </div>
          </div>
          <div className="mt-3 text-[11px] text-muted flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>Working tree untouched</span>
          </div>
        </div>

        {/* Step 3: Test Execution & Shield Verification */}
        <div
          className={`p-4 rounded-control border flex flex-col justify-between transition-all duration-300 ${
            suiteResult === "pass"
              ? "bg-[#091522] border-emerald-500/40"
              : "bg-[#180F16] border-rose-500/40"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-muted mb-2">
              <span className={suiteResult === "pass" ? "text-emerald-400 font-semibold" : "text-rose-400 font-semibold"}>
                03 / VERIFY
              </span>
              <Terminal className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xs font-medium text-white mb-2">
              {suiteResult === "pass" ? "Suite Executed in Isolation" : "Zero Tests Discovered"}
            </div>

            <div className="bg-[#070C18] p-2.5 rounded border border-hairline font-mono text-[11px] space-y-1">
              <div className="text-slate-400">$ npm test -- --runInBand</div>
              {suiteResult === "pass" ? (
                <>
                  <div className="text-slate-500">12 test suites passed</div>
                  <div className="text-emerald-400 font-semibold flex items-center gap-1 pt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>0 errors · 0 warnings</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-rose-400 font-semibold flex items-center gap-1 pt-0.5">
                    <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
                    <span>No test files matched pattern</span>
                  </div>
                  <div className="text-slate-500">Unverified flag retained</div>
                </>
              )}
            </div>
          </div>

          {/* Dynamic Shield Banner */}
          <div className="mt-3 pt-2 border-t border-hairline">
            {suiteResult === "pass" ? (
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>12 tests passed: Verified ✓</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs">
                <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                <span>No tests found: Unverified</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Honest Guarantee Line */}
      <div className="mt-6 pt-4 border-t border-hairline text-center">
        <p className="text-xs text-slate-400">
          Albion only awards the green Verified shield when your local automated test suite executes cleanly and passes. No artificial claims.
        </p>
      </div>
    </div>
  );
}
