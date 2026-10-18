-- ==============================================================================
-- ALBION ADMIN DASHBOARD & TELEMETRY SCHEMA (Supabase PostgreSQL)
-- ==============================================================================

-- 1. Table: user_feedback
CREATE TABLE IF NOT EXISTS public.user_feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast status filtering and timeline sorting
CREATE INDEX IF NOT EXISTS idx_user_feedback_status_created 
    ON public.user_feedback (status, created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;

-- Allow anyone (visitors/authenticated users) to submit feedback
CREATE POLICY "Allow public insert to user_feedback" 
    ON public.user_feedback 
    FOR INSERT 
    WITH CHECK (true);

-- Allow only service_role (Admin API backend) to view and manage feedback
CREATE POLICY "Allow service_role full access to user_feedback" 
    ON public.user_feedback 
    FOR ALL 
    TO service_role 
    USING (true) 
    WITH CHECK (true);


-- 2. Table: site_visitors
CREATE TABLE IF NOT EXISTS public.site_visitors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_address TEXT,
    user_agent TEXT,
    page_path TEXT NOT NULL DEFAULT '/',
    visited_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast visitor time-range aggregation (24h, 7d, 30d)
CREATE INDEX IF NOT EXISTS idx_site_visitors_visited_at 
    ON public.site_visitors (visited_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.site_visitors ENABLE ROW LEVEL SECURITY;

-- Allow public logging of page visits
CREATE POLICY "Allow public insert to site_visitors" 
    ON public.site_visitors 
    FOR INSERT 
    WITH CHECK (true);

-- Allow only service_role (Admin API backend) to view visitor analytics
CREATE POLICY "Allow service_role full access to site_visitors" 
    ON public.site_visitors 
    FOR ALL 
    TO service_role 
    USING (true) 
    WITH CHECK (true);
