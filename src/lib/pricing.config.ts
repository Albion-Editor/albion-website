export interface PlanCap {
  modelName: string;
  amount: string;
  percent: number; // For proportional bar
}

export interface PricingPlan {
  id: "free" | "learner" | "starter" | "pro";
  name: string;
  priceUsd: number;
  period: string;
  isPopular?: boolean;
  badge?: string;
  description: string;
  caps: PlanCap[];
  features: string[];
  ctaLabel: string;
  ctaHref: string;
}

export const PRICING_STATUS_BANNER = {
  headline: "In-App Subscription Management",
  detail:
    "Upgrade securely with USDC/USDT via NOWPayments — zero KYC, instant activation directly inside Albion IDE. Fiat cards (Paystack) launching soon.",
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    priceUsd: 0,
    period: "forever",
    description: "Start coding instantly — no card, no KYC, no monthly reset.",
    caps: [
      { modelName: "Lifetime Cap", amount: "100,000 tokens", percent: 100 },
      { modelName: "Model", amount: "Qwen 3 Coder 30B", percent: 100 },
    ],
    features: [
      "100,000 lifetime tokens (no monthly reset)",
      "Qwen 3 Coder 30B via DeepInfra",
      "Local Trust Engine test verification",
      "Live Cost Radar keystroke estimator",
    ],
    ctaLabel: "Download free",
    ctaHref: "#download",
  },
  {
    id: "learner",
    name: "Learner",
    priceUsd: 3,
    period: "/mo",
    description: "Reliable fast model access for active students and independent developers.",
    caps: [
      { modelName: "Flash Tokens", amount: "2,000,000", percent: 25 },
      { modelName: "Model", amount: "DeepSeek V4.1 Flash", percent: 100 },
    ],
    features: [
      "2M DeepSeek V4.1 Flash tokens / month",
      "Sub-second priority proxy gateway",
      "Hard cap enforced — zero overdraft risk",
      "Live Cost Radar + Trust Engine",
    ],
    ctaLabel: "Upgrade in Albion IDE",
    ctaHref: "#download",
  },
  {
    id: "starter",
    name: "Starter",
    priceUsd: 8,
    period: "/mo",
    isPopular: true,
    badge: "Most Popular",
    description: "The complete toolkit: fast edits and visual model access for daily engineering.",
    caps: [
      { modelName: "DeepSeek V4.1 Flash", amount: "4,000,000", percent: 50 },
      { modelName: "MiMo v2.6 Flash", amount: "4,000,000", percent: 50 },
    ],
    features: [
      "4M DeepSeek V4.1 Flash tokens",
      "4M MiMo v2.6 Flash tokens",
      "8M total tokens / month",
      "Isolated .albion-shadow/ testing suite",
      "Hard cap enforced — zero overdraft risk",
    ],
    ctaLabel: "Upgrade in Albion IDE",
    ctaHref: "#download",
  },
  {
    id: "pro",
    name: "Pro",
    priceUsd: 12,
    period: "/mo",
    description: "High-volume quota for professional engineers shipping multiple production apps.",
    caps: [
      { modelName: "DeepSeek V4.5 Instruct", amount: "4,000,000", percent: 33 },
      { modelName: "Grok 4.1 Fast", amount: "4,000,000", percent: 33 },
      { modelName: "MiMo v2.6 Flash", amount: "4,000,000", percent: 33 },
    ],
    features: [
      "4M DeepSeek V4.5 Instruct tokens",
      "4M Grok 4.1 Fast tokens",
      "4M MiMo v2.6 Flash tokens",
      "12M total tokens / month",
      "Dedicated high-throughput channel",
    ],
    ctaLabel: "Upgrade in Albion IDE",
    ctaHref: "#download",
  },
];
