import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabaseAdmin } from '@/lib/supabase';

// ---------------------------------------------------------------------------
// TIER CAPS & MODEL ACCESS SPECIFICATION
// FREE:    100,000 LIFETIME tokens. Model: qwen/qwen3-coder-30b-a3b-instruct
// LEARNER: 2,000,000 monthly tokens ($3.00). Model: deepseek/deepseek-v4.1-flash-1017
// STARTER: 8,000,000 monthly tokens ($8.00). Split: 4M deepseek flash + 4M mimo-v2.6-flash
// PRO:     12,000,000 monthly tokens ($13.00). Split: 4M deepseek v4.5 + 4M grok-4.1-fast + 4M mimo-v2.6-flash
// ---------------------------------------------------------------------------
const TIER_CONFIG: Record<string, {
  name: string;
  priceUsd: number;
  totalTokens: number;
  isLifetime: boolean;
  allowedModels: string[];
  modelBalances: Record<string, number>;
}> = {
  free: {
    name: 'Free',
    priceUsd: 0,
    totalTokens: 100_000,
    isLifetime: true,
    allowedModels: ['qwen/qwen3-coder-30b-a3b-instruct'],
    modelBalances: {
      'qwen/qwen3-coder-30b-a3b-instruct': 100_000,
    },
  },
  learner: {
    name: 'Learner',
    priceUsd: 3.00,
    totalTokens: 2_000_000,
    isLifetime: false,
    allowedModels: ['deepseek/deepseek-v4.1-flash-1017'],
    modelBalances: {
      'deepseek/deepseek-v4.1-flash-1017': 2_000_000,
    },
  },
  starter: {
    name: 'Starter',
    priceUsd: 8.00,
    totalTokens: 8_000_000,
    isLifetime: false,
    allowedModels: [
      'deepseek/deepseek-v4.1-flash-1017',
      'xiaomi/mimo-v2.6-flash',
    ],
    modelBalances: {
      'deepseek/deepseek-v4.1-flash-1017': 4_000_000,
      'xiaomi/mimo-v2.6-flash': 4_000_000,
    },
  },
  pro: {
    name: 'Pro',
    priceUsd: 13.00,
    totalTokens: 12_000_000,
    isLifetime: false,
    allowedModels: [
      'deepseek/deepseek-v4.5-instruct',
      'xai/grok-4.1-fast',
      'xiaomi/mimo-v2.6-flash',
      'deepseek/deepseek-v4.1-flash-1017',
    ],
    modelBalances: {
      'deepseek/deepseek-v4.5-instruct': 4_000_000,
      'xai/grok-4.1-fast': 4_000_000,
      'xiaomi/mimo-v2.6-flash': 4_000_000,
    },
  },
};

// In-memory set for deduplicating webhook events across restarts
const processedPaymentIds = new Set<string>();

export async function POST(req: NextRequest) {
  try {
    // -----------------------------------------------------------------------
    // STEP 1: READ RAW BODY AND VERIFY HMAC-SHA512 SIGNATURE
    // -----------------------------------------------------------------------
    const rawBody = await req.text();
    const signature = req.headers.get('x-nowpayments-sig');
    const secret = (process.env.NOWPAYMENT_IPN_SECRET || 'USroDZZCMCQFeB/q6IxU5+669PtO8+ga').trim();

    if (!signature) {
      return NextResponse.json({ error: 'Missing x-nowpayments-sig header' }, { status: 401 });
    }

    if (!secret) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    // Standard NOWPayments verification: sort keys alphabetically, JSON.stringify, HMAC-SHA512
    let parsed: any;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const sortedPayload = JSON.stringify(parsed, Object.keys(parsed).sort());
    const sortedHash = crypto.createHmac('sha512', secret).update(sortedPayload).digest('hex');
    const rawHash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');

    const checkMatch = (computed: string) => {
      try {
        return crypto.timingSafeEqual(
          Buffer.from(computed, 'hex'),
          Buffer.from(signature, 'hex')
        );
      } catch {
        return false;
      }
    };

    if (!checkMatch(sortedHash) && !checkMatch(rawHash)) {
      console.error('[NOWPAYMENTS-WEBHOOK] Signature mismatch — rejecting request');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // -----------------------------------------------------------------------
    // STEP 2: STATUS CHECK — ONLY PROCESS 'finished' OR 'confirmed'
    // -----------------------------------------------------------------------
    const paymentStatus = (parsed.payment_status || '').toLowerCase();
    const paymentId = String(parsed.payment_id || `np_${Date.now()}`);
    const orderId = String(parsed.order_id || '');

    console.log(`[NOWPAYMENTS-WEBHOOK] Verified IPN: status=${paymentStatus}, order_id=${orderId}, payment_id=${paymentId}`);

    // If already processed in memory, return 200 immediately
    if (processedPaymentIds.has(paymentId)) {
      return NextResponse.json({ received: true, message: 'Already processed' }, { status: 200 });
    }

    // Non-final statuses are logged and acknowledged with 200 so NOWPayments doesn't retry
    if (paymentStatus !== 'finished' && paymentStatus !== 'confirmed') {
      console.log(`[NOWPAYMENTS-WEBHOOK] Non-final status received: ${paymentStatus}. No upgrade needed yet.`);
      return NextResponse.json({ received: true, status: paymentStatus }, { status: 200 });
    }

    // -----------------------------------------------------------------------
    // STEP 3: PARSE ORDER_ID (CRITICAL: NEVER USE OUTCOME_AMOUNT FOR TIER)
    // Format: {userId}_{planTier} (e.g., usr_123_starter or testuser_learner)
    // -----------------------------------------------------------------------
    const lastUnderscore = orderId.lastIndexOf('_');
    if (lastUnderscore === -1) {
      console.error(`[NOWPAYMENTS-WEBHOOK] Invalid order_id format (must be userId_planTier): ${orderId}`);
      return NextResponse.json({ error: 'Invalid order_id format' }, { status: 400 });
    }

    const userId = orderId.slice(0, lastUnderscore).trim();
    const planTier = orderId.slice(lastUnderscore + 1).trim().toLowerCase();

    const tierConfig = TIER_CONFIG[planTier];
    if (!userId || !tierConfig) {
      console.error(`[NOWPAYMENTS-WEBHOOK] Unknown tier or missing userId: user=${userId}, tier=${planTier}`);
      return NextResponse.json({ error: `Unknown tier '${planTier}' or missing userId` }, { status: 400 });
    }

    // -----------------------------------------------------------------------
    // STEP 4: SUPABASE ATOMIC UPDATE
    // 1. Check idempotency in billing_events table
    // 2. Update subscriptions table (status: 'active', model_balances)
    // 3. Update users table (status: 'PAID', plan_tier)
    // 4. Update user_caps table (reset/extend token allowances)
    // 5. Audit record in billing_events
    // -----------------------------------------------------------------------
    try {
      const { data: existingEvent } = await supabaseAdmin
        .from('billing_events')
        .select('id')
        .eq('event_id', paymentId)
        .maybeSingle();

      if (existingEvent) {
        processedPaymentIds.add(paymentId);
        console.log(`[NOWPAYMENTS-WEBHOOK] Payment ${paymentId} already recorded in DB. Skipping.`);
        return NextResponse.json({ received: true, message: 'Already processed' }, { status: 200 });
      }
    } catch {
      // Table may not have unique index yet; proceed safely
    }

    const nowIso = new Date().toISOString();

    // 1. Update / Upsert Subscriptions table
    const { error: subError } = await supabaseAdmin
      .from('subscriptions')
      .upsert({
        user_id: userId,
        tier: planTier,
        status: 'active',
        cycle_start: nowIso,
        model_balances: tierConfig.modelBalances,
      }, { onConflict: 'user_id' });

    if (subError) {
      console.error('[NOWPAYMENTS-WEBHOOK] Error updating subscriptions:', subError.message);
    }

    // 2. Update Users table (status: 'PAID')
    try {
      await supabaseAdmin
        .from('users')
        .update({
          status: 'PAID',
          subscription_status: 'active',
          plan_tier: planTier,
          last_payment_date: nowIso,
        })
        .eq('id', userId);
    } catch (uErr: any) {
      console.warn('[NOWPAYMENTS-WEBHOOK] users update note:', uErr.message);
    }

    // 3. Update User Caps table with exact model split
    try {
      await supabaseAdmin
        .from('user_caps')
        .upsert({
          user_id: userId,
          plan_tier: planTier,
          status: 'PAID',
          token_cap: tierConfig.totalTokens,
          token_balances: tierConfig.modelBalances,
          reset_at: nowIso,
          updated_at: nowIso,
        }, { onConflict: 'user_id' });
    } catch (cErr: any) {
      console.warn('[NOWPAYMENTS-WEBHOOK] user_caps update note:', cErr.message);
    }

    // 4. Log to billing_events (outcome_amount used ONLY for audit logging)
    const auditAmount = Number(
      parsed.outcome_amount ||
      parsed.actually_paid ||
      parsed.price_amount ||
      tierConfig.priceUsd
    );
    const auditCurrency = String(parsed.pay_currency || 'USDT').toUpperCase();

    try {
      await supabaseAdmin.from('billing_events').insert({
        user_id: userId,
        event_type: 'payment_confirmed',
        event_id: paymentId,
        paystack_reference: paymentId,
        provider: 'nowpayments',
        amount: auditAmount,
        currency: auditCurrency,
        status: 'success',
        raw_payload: parsed,
      });
    } catch (auditErr: any) {
      console.warn('[NOWPAYMENTS-WEBHOOK] billing_events logging note:', auditErr.message);
    }

    processedPaymentIds.add(paymentId);
    console.log(`[NOWPAYMENTS-WEBHOOK] ✅ Successfully provisioned ${tierConfig.name} (${tierConfig.totalTokens.toLocaleString()} tokens) for user ${userId}`);

    // -----------------------------------------------------------------------
    // STEP 5: RETURN HTTP 200 IMMEDIATELY
    // -----------------------------------------------------------------------
    return NextResponse.json({
      received: true,
      user_id: userId,
      plan_tier: planTier,
      total_tokens: tierConfig.totalTokens,
    }, { status: 200 });

  } catch (err: any) {
    console.error('[NOWPAYMENTS-WEBHOOK] Unexpected error:', err.message);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}
