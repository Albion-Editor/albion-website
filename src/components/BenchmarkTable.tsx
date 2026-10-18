import React from "react";
import { BENCHMARK_MODELS, BENCHMARK_FOOTNOTE } from "@/lib/models.data";

export function BenchmarkTable() {
  return (
    <div className="w-full">
      {/* Table Container */}
      <div className="overflow-x-auto rounded-panel border border-hairline bg-surface shadow-lg">
        <table className="w-full text-left text-sm font-sans border-collapse">
          <thead>
            <tr className="border-b border-hairline bg-[#0B1220] font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
              <th scope="col" className="py-4 px-5 font-semibold">
                Model
              </th>
              <th scope="col" className="py-4 px-5 font-semibold">
                Best For
              </th>
              <th scope="col" className="py-4 px-5 font-semibold">
                SWE-bench Verified
              </th>
              <th scope="col" className="py-4 px-5 font-semibold">
                Cost / 1M Output
              </th>
              <th scope="col" className="py-4 px-5 font-semibold text-right">
                Value vs. Frontier
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hairline/60">
            {BENCHMARK_MODELS.map((model) => {
              const isRef = model.isReference;
              const isPrem = model.isAlbionPremium;

              return (
                <tr
                  key={model.id}
                  className={`transition-colors ${
                    isPrem
                      ? "bg-gold-500/[0.03] hover:bg-gold-500/[0.07]"
                      : isRef
                      ? "bg-surface/30 opacity-80 hover:opacity-100"
                      : "hover:bg-surface-raised"
                  }`}
                >
                  {/* Model Name & Provider Badge */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white tracking-tight">
                        {model.name}
                      </span>
                      {model.badge && (
                        <span
                          className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                            isPrem
                              ? "bg-gold-500/15 text-gold-400 border-gold-500/30 font-semibold"
                              : "bg-blue-500/15 text-blue-300 border-blue-500/25"
                          }`}
                        >
                          {model.badge}
                        </span>
                      )}
                      {isRef && (
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                          Closed Baseline
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-[11px] text-muted mt-0.5">
                      {model.provider}
                    </div>
                  </td>

                  {/* Best For */}
                  <td className="py-4 px-5 text-slate-300 text-sm">
                    {model.bestFor}
                  </td>

                  {/* SWE-bench Verified */}
                  <td className="py-4 px-5 font-mono">
                    <span
                      className={`font-semibold ${
                        isRef
                          ? "text-slate-200"
                          : isPrem
                          ? "text-gold-400"
                          : "text-blue-400"
                      }`}
                    >
                      {model.sweBenchVerified}
                    </span>
                  </td>

                  {/* Cost per 1M Output */}
                  <td className="py-4 px-5 font-mono">
                    <span className="text-white font-medium">
                      {model.costPer1MOutput}
                    </span>
                  </td>

                  {/* Value vs. Frontier */}
                  <td className="py-4 px-5 text-right font-mono">
                    <span
                      className={`inline-block px-2 py-0.5 rounded font-bold text-xs ${
                        isRef
                          ? "text-slate-400 bg-slate-800/60"
                          : isPrem
                          ? "text-gold-400 bg-gold-500/10 border border-gold-500/25"
                          : "text-emerald-400 bg-emerald-500/10 border border-emerald-500/25"
                      }`}
                    >
                      {model.valueVsFrontier}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Required Footnote */}
      <p className="mt-4 text-xs font-mono text-muted leading-relaxed">
        {BENCHMARK_FOOTNOTE}
      </p>
    </div>
  );
}
