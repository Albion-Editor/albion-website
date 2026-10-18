import React from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, ShieldCheck, Terminal, Cpu, CheckCircle2, Radar, Gauge, Lock } from "lucide-react";

export const metadata = {
  title: "Documentation — Albion IDE",
  description: "Getting Started with Albion, Trust Engine guide, and API Routing architecture.",
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans">
      {/* ── TOP NAV ──────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#0F172A]/80 border-b border-slate-800/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 relative">
                <img src="/albion-logo.svg" alt="Albion Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Albion Docs</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="/" 
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* ── MAIN DOCS CONTENT ────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* Header */}
        <div className="space-y-3 border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" /> Albion Architecture & Manual
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white">
            Albion Documentation
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to know about setting up Albion, the Trust Engine shadow staging pipeline, and our smart proxy routing.
          </p>
        </div>

        {/* Section 1: Getting Started */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
              1
            </div>
            <h2 className="text-2xl font-bold text-white">Getting Started</h2>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              Albion is an <strong>AI-Native IDE</strong> combining full VS Code-grade editor ergonomics (Monaco, terminal, file tree, Git) with an integrated autonomous agent loop.
            </p>
            <h3 className="text-base font-semibold text-white pt-2">Installation</h3>
            <ol className="list-decimal list-inside space-y-2 text-slate-400 pl-2">
              <li>Download the installer for your operating system (<code className="text-blue-400 text-xs">.exe</code> for Windows, <code className="text-blue-400 text-xs">.dmg</code> for macOS, or <code className="text-blue-400 text-xs">.AppImage</code> for Linux).</li>
              <li>Launch Albion. Upon first start, authenticate with your Albion account (e.g., <code className="text-amber-400 text-xs">test@albion.dev</code> / <code className="text-amber-400 text-xs">Password123!</code> in test mode).</li>
              <li>Your encrypted session JWT is securely stored in the system safeStorage keystore and passed to the local proxy.</li>
            </ol>
          </div>
        </section>

        {/* Section 2: Trust Engine Guide */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-sm">
              2
            </div>
            <h2 className="text-2xl font-bold text-white">Trust Engine & Shadow Staging</h2>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              Traditional AI coding assistants apply file mutations directly to your workspace. If the AI introduces syntax bugs or breaks assertions, you spend tokens and time debugging what it broke.
            </p>
            <p>
              Albion intercepts all write operations (<code className="text-amber-400 text-xs">WriteToFile</code> and <code className="text-amber-400 text-xs">StrReplace</code>) through the <strong>Verification Hook</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/60 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Green Shield</span>
                <div className="font-semibold text-white text-sm">Verified Passing</div>
                <p className="text-xs text-slate-400">Tests were discovered in your project and passed with exit code 0. Writes are applied atomically.</p>
              </div>

              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/60 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Yellow Shield</span>
                <div className="font-semibold text-white text-sm">Unverified Safe</div>
                <p className="text-xs text-slate-400">No test suite was found in package.json. Writes apply immediately with an explicit badge warning.</p>
              </div>

              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/60 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Red Shield</span>
                <div className="font-semibold text-white text-sm">Blocked Failing</div>
                <p className="text-xs text-slate-400">Tests failed. The agent is given test failure context for up to 2 bounded retries, blocking broken diffs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Smart Proxy & API Routing */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-sm">
              3
            </div>
            <h2 className="text-2xl font-bold text-white">Smart Proxy & Transparent Routing</h2>
          </div>

          <div className="p-6 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              Albion communicates through a local, sovereign proxy gateway enforcing strict financial transparency:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 pl-2">
              <li><strong className="text-white">Live Cost Radar:</strong> Before invoking completions, the proxy queries <code className="text-blue-400 text-xs">/api/pricing</code> to present accurate per-token pricing based on actual prompt length and image presence.</li>
              <li><strong className="text-white">Strict Cap Enforcer:</strong> Quotas are checked before forwarding prompts. Once a tier allowance is reached, requests auto-failover to zero-cost free providers rather than overdrafting your payment card.</li>
              <li><strong className="text-white">Instant Model Override:</strong> The Premium Toggle header (<code className="text-amber-400 text-xs">X-Albion-Force-Model</code>) allows developers to explicitly select Pro frontier reasoning or low-cost Flash generation on demand.</li>
            </ul>
          </div>
        </section>
      </div>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800 py-8 px-6 bg-slate-950/80 text-xs text-slate-400 mt-auto text-center">
        © 2026 Albion. Built for Sovereign Builders.
      </footer>
    </div>
  );
}
