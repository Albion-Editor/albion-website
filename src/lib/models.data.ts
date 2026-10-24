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
    id: "deepseek-v4.5-instruct",
    name: "DeepSeek V4.5 Instruct",
    provider: "DeepInfra · Pro Tier",
    badge: "Pro Only",
    bestFor: "Hard Refactoring",
    sweBenchVerified: "80.6%",
    sweBenchNumeric: 80.6,
    costPer1MOutput: "~$0.87",
    costNumeric: 0.87,
    valueVsFrontier: "29x Cheaper",
    isAlbionPremium: true,
    notes: "Top open-weight coding reasoning model. Available on Pro tier.",
  },
  {
    id: "grok-4.1-fast",
    name: "Grok 4.1 Fast",
    provider: "DeepInfra · Pro Tier",
    badge: "Pro Only",
    bestFor: "Agentic Tasks",
    sweBenchVerified: "~78.0%",
    sweBenchNumeric: 78.0,
    costPer1MOutput: "~$1.20",
    costNumeric: 1.2,
    valueVsFrontier: "21x Cheaper",
    isAlbionPremium: true,
    notes: "xAI Grok model optimised for multi-step agentic coding workflows.",
  },
  {
    id: "deepseek-v4.1-flash",
    name: "DeepSeek V4.1 Flash",
    provider: "DeepInfra · Learner / Starter / Pro",
    badge: "Manual Select",
    bestFor: "Routine Edits",
    sweBenchVerified: "~73.0%",
    sweBenchNumeric: 73.0,
    costPer1MOutput: "~$0.28",
    costNumeric: 0.28,
    valueVsFrontier: "89x Cheaper",
    notes: "Sub-second response speed for daily file editing and fast autocomplete.",
  },
  {
    id: "mimo-v2.6-flash",
    name: "MiMo v2.6 Flash",
    provider: "DeepInfra · Starter / Pro",
    badge: "Manual Select",
    bestFor: "UI / Frontend Gen",
    sweBenchVerified: "~65.0%",
    sweBenchNumeric: 65.0,
    costPer1MOutput: "~$0.40",
    costNumeric: 0.4,
    valueVsFrontier: "62x Cheaper",
    notes: "Xiaomi MiMo — optimised for component generation and visual design tasks.",
  },
  {
    id: "qwen3-coder-30b",
    name: "Qwen 3 Coder 30B",
    provider: "DeepInfra · Free Tier",
    badge: "Free",
    bestFor: "Free-Tier Coding",
    sweBenchVerified: "73.4%",
    sweBenchNumeric: 73.4,
    costPer1MOutput: "Provider Dep.",
    costNumeric: 0.1,
    valueVsFrontier: "Best Free Open-Weight",
    notes: "Qwen 3 Coder — powers the Albion free tier. 100k lifetime tokens, no card.",
  },
];

export const BENCHMARK_FOOTNOTE =
  "Benchmarks don't predict every task. On the hardest problems, top closed models still lead. Albion gives you manual model selection — choose the right model per session and see the cost first. Data sourced from official model reports and SWE-bench Verified leaderboards (as of Oct 2026).";
