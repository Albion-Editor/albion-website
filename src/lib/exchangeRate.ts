/**
 * Server-side exchange rate fetching with ISR (1 hour revalidation)
 * Primary: open.er-api.com
 * Fallback: fawazahmed0 currency-api on jsDelivr
 */

export interface ExchangeRateResult {
  rate: number | null;
  lastUpdatedUnix: number | null;
  formattedUpdateTime: string | null;
  source: 'primary' | 'fallback' | 'cached' | 'unavailable';
}

// In-memory fallback cache in case external network fails
let memoryCachedRate: ExchangeRateResult = {
  rate: 1332.0,
  lastUpdatedUnix: 1792281751,
  formattedUpdateTime: 'today at 00:00 UTC',
  source: 'cached',
};

function formatRelativeTime(unixSeconds: number): string {
  try {
    const diffSeconds = Math.floor(Date.now() / 1000) - unixSeconds;
    if (diffSeconds < 3600) {
      const mins = Math.max(1, Math.floor(diffSeconds / 60));
      return `${mins}m ago`;
    }
    if (diffSeconds < 86400) {
      const hours = Math.floor(diffSeconds / 3600);
      return `${hours}h ago`;
    }
    const date = new Date(unixSeconds * 1000);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }) + ' UTC';
  } catch {
    return 'earlier today';
  }
}

export async function getExchangeRate(): Promise<ExchangeRateResult> {
  // 1. Try Primary
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      next: { revalidate: 3600 },
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      const ngn = Number(data?.rates?.NGN);
      const unix = Number(data?.time_last_update_unix);
      if (ngn > 0 && unix > 0) {
        const result: ExchangeRateResult = {
          rate: ngn,
          lastUpdatedUnix: unix,
          formattedUpdateTime: formatRelativeTime(unix),
          source: 'primary',
        };
        memoryCachedRate = result;
        return result;
      }
    }
  } catch (err) {
    console.warn('[EXCHANGE-RATE] Primary endpoint failed, attempting fallback...', (err as Error).message);
  }

  // 2. Try Fallback
  try {
    const res = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json', {
      next: { revalidate: 3600 },
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      const ngn = Number(data?.usd?.ngn);
      const dateStr = data?.date;
      const unix = dateStr ? Math.floor(new Date(dateStr).getTime() / 1000) : Math.floor(Date.now() / 1000);
      if (ngn > 0) {
        const result: ExchangeRateResult = {
          rate: ngn,
          lastUpdatedUnix: unix,
          formattedUpdateTime: formatRelativeTime(unix),
          source: 'fallback',
        };
        memoryCachedRate = result;
        return result;
      }
    }
  } catch (err) {
    console.warn('[EXCHANGE-RATE] Fallback endpoint failed, using cached fallback...', (err as Error).message);
  }

  // 3. Last cached value
  return memoryCachedRate;
}

/**
 * Rounds a Naira value to the nearest ₦50 as specified
 */
export function roundToNearest50(amount: number): number {
  return Math.round(amount / 50) * 50;
}

/**
 * Derives Naira price from USD source of truth
 */
export function formatNairaPrice(usd: number, rate: number | null): string {
  if (!rate || rate <= 0) return '₦ equivalent shown at checkout';
  const rawNgn = usd * rate;
  const rounded = roundToNearest50(rawNgn);
  return `≈ ₦${rounded.toLocaleString('en-US')}`;
}
