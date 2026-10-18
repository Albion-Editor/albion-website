"use client";

import React, { useState, useEffect } from "react";
import { Download, ChevronDown, ChevronUp, Monitor, Apple, Terminal } from "lucide-react";
import { DOWNLOADS_CONFIG } from "@/lib/downloads.config";

export function DownloadSection() {
  const [visitorOs, setVisitorOs] = useState<"windows" | "macos" | "linux">("windows");
  const [showInstallNotes, setShowInstallNotes] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes("mac")) {
      setVisitorOs("macos");
    } else if (ua.includes("linux")) {
      setVisitorOs("linux");
    } else {
      setVisitorOs("windows");
    }
  }, []);

  const getPlatformIcon = (platformId: string) => {
    switch (platformId) {
      case "windows":
        return <Monitor className="w-5 h-5 text-blue-400" />;
      case "macos":
        return <Apple className="w-5 h-5 text-slate-300" />;
      case "linux":
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      default:
        return <Monitor className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="download"
      className="py-24 md:py-32 bg-[#090E1B] border-t border-hairline"
      aria-label="Download Albion IDE"
    >
      <div className="max-w-container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-control bg-surface border border-hairline mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-muted">
              All Platforms Available
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            Download Albion. Start free.
          </h2>
          <p className="text-muted text-base leading-relaxed">
            Direct standalone binary downloads for Windows, macOS &amp; Linux. Free tier requires no payment card.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {DOWNLOADS_CONFIG.map((item) => {
            const isVisitorMatch = visitorOs === item.platformId;

            return (
              <div
                key={item.platformId}
                className={`rounded-panel p-6 bg-surface border flex flex-col justify-between transition-all duration-200 relative ${
                  isVisitorMatch
                    ? "border-blue-500/70 shadow-[0_8px_30px_rgba(47,111,237,0.12)] ring-1 ring-blue-500/30"
                    : "border-hairline"
                }`}
              >
                {/* Detected OS Badge */}
                {isVisitorMatch && (
                  <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-blue-500 text-white font-mono text-[10px] font-semibold uppercase tracking-wider">
                    Your System
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-control bg-surface-raised border border-hairline flex items-center justify-center">
                        {getPlatformIcon(item.platformId)}
                      </div>
                      <div>
                        <div className="font-display font-bold text-lg text-white">
                          {item.title}
                        </div>
                        <div className="font-mono text-xs text-muted">
                          {item.version}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`font-mono text-[10.5px] px-2 py-0.5 rounded border ${
                        item.isAvailable
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-semibold"
                          : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <div className="font-mono text-xs text-slate-300 space-y-1.5 mb-6 bg-[#070C18] p-3 rounded border border-hairline">
                    <div className="text-muted">Package: {item.format}</div>
                    {item.sizeMB && <div>Size: ~{item.sizeMB} MB</div>}
                    {item.altFormat && (
                      <div className="text-slate-500">Alt: {item.altFormat} also available</div>
                    )}
                  </div>
                </div>

                {/* Download CTA Buttons */}
                <div className="space-y-2">
                  {item.isAvailable && item.url ? (
                    <>
                      <a
                        href={item.url}
                        className="w-full h-11 rounded-control bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors active:scale-[0.99]"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download for {item.osName}</span>
                      </a>
                      {item.altUrl && (
                        <a
                          href={item.altUrl}
                          className="w-full h-9 rounded-control bg-surface-raised hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs flex items-center justify-center border border-hairline transition-colors gap-1.5"
                        >
                          <Download className="w-3 h-3" />
                          <span>Download {item.altFormat}</span>
                        </a>
                      )}
                    </>
                  ) : (
                    <a
                      href={`mailto:support@albionide.com?subject=Albion%20Release%20Notification%20-%20${encodeURIComponent(
                        item.title
                      )}&body=Please%20notify%20me%20when%20Albion%20for%20${encodeURIComponent(
                        item.title
                      )}%20is%20officially%20released.`}
                      className="w-full h-11 rounded-control bg-surface-raised hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs flex items-center justify-center border border-hairline transition-colors"
                    >
                      Email me when it&apos;s out
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Collapsible Install Notes Accordion */}
        <div className="max-w-3xl mx-auto rounded-panel bg-surface border border-hairline overflow-hidden mb-6">
          <button
            type="button"
            onClick={() => setShowInstallNotes(!showInstallNotes)}
            className="w-full p-4 flex items-center justify-between text-left text-xs font-mono text-slate-300 hover:bg-surface-raised transition-colors"
          >
            <span className="font-semibold text-white">Installation &amp; Security Verification Notes</span>
            {showInstallNotes ? (
              <ChevronUp className="w-4 h-4 text-muted" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted" />
            )}
          </button>

          {showInstallNotes && (
            <div className="p-4 pt-0 border-t border-hairline/60 text-xs text-slate-400 space-y-3 font-mono leading-relaxed">
              <div>
                <span className="text-white font-semibold">Windows SmartScreen: </span>
                If Windows Defender warns during initial installation, click <span className="text-slate-200">&apos;More info&apos;</span> → <span className="text-slate-200">&apos;Run anyway&apos;</span> while code-signing certificates propagate.
              </div>
              <div>
                <span className="text-white font-semibold">macOS Gatekeeper: </span>
                If macOS flags unnotarized binaries on early preview builds: Right-click Albion.app in Applications → select <span className="text-slate-200">Open</span>.
              </div>
              <div>
                <span className="text-white font-semibold">Linux Permissions: </span>
                Ensure executable bit is set before launching: <code className="text-gold-400">chmod +x Albion-0.0.45-x86_64.AppImage</code>.
              </div>
            </div>
          )}
        </div>

        {/* Honest Guarantee Line */}
        <div className="text-center font-mono text-xs text-muted">
          Free tier needs no card. Paid plans open at launch.
        </div>
      </div>
    </section>
  );
}
