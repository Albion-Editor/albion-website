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
    "Tier upgrades and payments are managed directly inside the Albion IDE via Paystack (Naira / African cards) and Lemon Squeezy (USD / International cards). Tokens bind instantly to your account with zero website redirects.",
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    priceUsd: 0,
    period: "forever",
    description: "Essential coding assistance powered by our resilient free-tier chain.",
    caps: [
      { modelName: "Daily Cap", amount: "50 requests / 50k tok", percent: 15 },
      { modelName: "Free Chain", amount: "OpenRouter & Groq", percent: 100 },
    ],
    features: [
      "OpenRouter free round-robin rotation",
      "Groq instant free fallback on 429",
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
      { modelName: "Free Failover", amount: "Automatic on cap", percent: 100 },
    ],
    features: [
      "2M DeepSeek-V4-Flash tokens",
      "Sub-second priority proxy gateway",
      "Silent free fallback when quota hits",
      "Zero overdraft billing risk",
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
    description: "The complete toolkit for daily engineering: reasoning, vision, and frontend generation.",
    caps: [
      { modelName: "Flash (Routine)", amount: "8,000,000", percent: 65 },
      { modelName: "Vision (Qwen)", amount: "1,500,000", percent: 50 },
      { modelName: "Pro (Reasoning)", amount: "500,000", percent: 50 },
      { modelName: "GLM-5.2 (UI)", amount: "150,000", percent: 60 },
    ],
    features: [
      "8M DeepSeek-V4-Flash tokens",
      "1.5M Qwen3.6 vision tokens for screenshots",
      "500K DeepSeek-V4-Pro reasoning tokens",
      "150K GLM-5.2 frontend tokens",
      "Isolated .albion-shadow/ testing suite",
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
      { modelName: "Flash (Routine)", amount: "12,000,000", percent: 100 },
      { modelName: "Vision (Qwen)", amount: "3,000,000", percent: 100 },
      { modelName: "Pro (Reasoning)", amount: "1,000,000", percent: 100 },
      { modelName: "GLM-5.2 (UI)", amount: "250,000", percent: 100 },
    ],
    features: [
      "12M DeepSeek-V4-Flash tokens",
      "3M Qwen3.6 vision tokens",
      "1M DeepSeek-V4-Pro reasoning tokens",
      "250K GLM-5.2 frontend generation tokens",
      "Dedicated high-throughput channel",
    ],
    ctaLabel: "Upgrade in Albion IDE",
    ctaHref: "#download",
  },
];
