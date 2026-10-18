export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  badge?: string;
  bestFor: string;
  sweBenchVerified: string;
  sweBenchNumeric: number;
  costPer1MOutput: string;
  costNumeric: number; // in USD
  valueVsFrontier: string;
  isAlbionPremium?: boolean;
  isReference?: boolean;
  notes?: string;
}

export const BENCHMARK_MODELS: ModelInfo[] = [
  {
    id: "claude-opus-4",
    name: "Claude Opus 4",
    provider: "Anthropic Direct",
    bestFor: "Frontier Reasoning",
    sweBenchVerified: "88.6%",
    sweBenchNumeric: 88.6,
    costPer1MOutput: "~$25.00",
    costNumeric: 25.0,
    valueVsFrontier: "1x (Baseline)",
    isReference: true,
    notes: "Industry frontier reference model on SWE-bench Verified leaderboard.",
  },
  {
    id: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    provider: "Albion Premium Toggle",
    badge: "Premium Toggle",
    bestFor: "Hard Refactoring",
    sweBenchVerified: "80.6%",
    sweBenchNumeric: 80.6,
    costPer1MOutput: "~$0.87",
    costNumeric: 0.87,
    valueVsFrontier: "29x Cheaper",
    isAlbionPremium: true,
    notes: "Top open-weight coding reasoning model. Only runs when explicitly switched on.",
  },
  {
    id: "glm-5.2",
    name: "GLM-5.2",
    provider: "Albion Premium Toggle",
    badge: "Premium Toggle",
    bestFor: "UI/Frontend Gen",
    sweBenchVerified: "62.1% (SWE-bench Pro)",
    sweBenchNumeric: 62.1,
    costPer1MOutput: "~$4.40",
    costNumeric: 4.4,
    valueVsFrontier: "5.6x Cheaper",
    isAlbionPremium: true,
    notes: "Specialized in component generation and visual design tasks.",
  },
  {
    id: "deepseek-v4-flash",
    name: "DeepSeek V4 Flash",
    provider: "Albion Auto-Router",
    badge: "Default Router",
    bestFor: "Routine Edits",
    sweBenchVerified: "~73.0%",
    sweBenchNumeric: 73.0,
    costPer1MOutput: "~$0.28",
    costNumeric: 0.28,
    valueVsFrontier: "89x Cheaper",
    notes: "Sub-second response speed for daily file editing and fast autocomplete.",
  },
  {
    id: "qwen-35b-vision",
    name: "Qwen3.6-35B-A3B",
    provider: "Albion Vision Router",
    badge: "Native Multimodal",
    bestFor: "Multimodal/Screenshots",
    sweBenchVerified: "73.4%",
    sweBenchNumeric: 73.4,
    costPer1MOutput: "Provider Dep.",
    costNumeric: 0.35,
    valueVsFrontier: "Best Open-Weight Vision",
    notes: "Auto-activated when an image or UI screenshot is dropped into composer.",
  },
];

export const BENCHMARK_FOOTNOTE =
  "Benchmarks don't predict every task. On the hardest problems, top closed models still lead. That's why Albion keeps Pro and GLM-5.2 behind a premium toggle and shows you the cost first. Data sourced from official model reports and SWE-bench Verified leaderboards (as of Oct 2026).";
