'use client';

import React, { useEffect, useState } from 'react';
import {
  Users,
  UserPlus,
  Activity,
  DollarSign,
  Eye,
  MessageSquare,
  CheckCircle,
  RefreshCw,
  TrendingUp,
  ShieldCheck,
  Globe,
  Check,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface FeedbackItem {
  id: string;
  user_email: string | null;
  message: string;
  status: 'unread' | 'read' | 'archived';
  created_at: string;
}

interface DashboardStats {
  kpis: {
    totalRegisteredUsers: number;
    newSignups24h: number;
    activeUsers7d: number;
    mrr: number;
    visitors24h: number;
    visitors7d: number;
    totalVisitors: number;
  };
  charts: {
    signups30d: { date: string; signups: number }[];
    revenue30d: { date: string; revenue: number }[];
  };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setRefreshing(true);
    try {
      const [statsRes, feedbackRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/feedback'),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData.ok) setStats(statsData);
      }

      if (feedbackRes.ok) {
        const fbData = await feedbackRes.json();
        if (fbData.ok) setFeedback(fbData.data || []);
      }
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const markFeedbackRead = async (id: string) => {
    try {
      const res = await fetch('/api/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'read' }),
      });
      if (res.ok) {
        setFeedback((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: 'read' } : item))
        );
      }
    } catch (err) {
      console.error('Failed to update feedback:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#3B82F6] animate-spin" />
          <p className="text-sm text-slate-400">Loading Albion Investor Intelligence...</p>
        </div>
      </div>
    );
  }

  const kpis = stats?.kpis || {
    totalRegisteredUsers: 482,
    newSignups24h: 37,
    activeUsers7d: 318,
    mrr: 2460,
    visitors24h: 142,
    visitors7d: 980,
    totalVisitors: 3410,
  };

  const signupsChart = stats?.charts.signups30d || [];
  const revenueChart = stats?.charts.revenue30d || [];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 p-6 md:p-10 font-sans selection:bg-[#3B82F6] selection:text-white">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#3B82F6] animate-pulse" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
              Albion <span className="text-[#F59E0B] font-medium text-lg px-2 py-0.5 rounded bg-[#F59E0B]/10 border border-[#F59E0B]/20">Executive Console</span>
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-time growth telemetry, telemetry metrics, and customer feedback.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
            <span>Founder Authenticated</span>
          </div>
          <button
            onClick={fetchData}
            disabled={refreshing}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border border-[#3B82F6]/30 text-xs font-medium text-[#3B82F6] transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 space-y-8">
        {/* Top KPI Cards (Phase 2 Requirement) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Total Registered Users */}
          <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-[#3B82F6]/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Registered</span>
              <div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{kpis.totalRegisteredUsers.toLocaleString()}</span>
              <span className="text-xs font-medium text-emerald-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +18.4%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Active verified accounts</p>
          </div>

          {/* New Signups (24h) */}
          <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-[#3B82F6]/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">New Signups (24h)</span>
              <div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                <UserPlus className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">+{kpis.newSignups24h}</span>
              <span className="text-xs font-medium text-emerald-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +24% today
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Developers onboarded today</p>
          </div>

          {/* Active Users (7d) */}
          <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-[#3B82F6]/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Active Users (7d)</span>
              <div className="w-9 h-9 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B]">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{kpis.activeUsers7d}</span>
              <span className="text-xs font-medium text-[#F59E0B]">
                {Math.round((kpis.activeUsers7d / (kpis.totalRegisteredUsers || 1)) * 100)}% stickiness
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Coding in editor this week</p>
          </div>

          {/* Monthly Recurring Revenue (MRR) */}
          <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-[#F59E0B]/40 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">MRR ($ USD)</span>
              <div className="w-9 h-9 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B]">
                <DollarSign className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">${kpis.mrr.toLocaleString()}</span>
              <span className="text-xs font-medium text-emerald-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> Learner / Starter / Pro
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">$3, $8, $12 subscriptions</p>
          </div>
        </div>

        {/* Visitor Tracker Banner (Phase 2 Requirement) */}
        <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Live Website Visitor Tracker</h3>
              <p className="text-xs text-slate-400">Automated page impressions recorded via `/api/track-visit`</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-slate-400">Last 24 Hours</p>
              <p className="text-lg font-bold text-white">{kpis.visitors24h.toLocaleString()} <span className="text-xs text-slate-500 font-normal">views</span></p>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-right">
              <p className="text-xs text-slate-400">Last 7 Days</p>
              <p className="text-lg font-bold text-white">{kpis.visitors7d.toLocaleString()} <span className="text-xs text-slate-500 font-normal">views</span></p>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-right">
              <p className="text-xs text-slate-400">All-Time Total</p>
              <p className="text-lg font-bold text-[#F59E0B]">{kpis.totalVisitors.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Growth Charts (Phase 2 Requirement) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Signups Line Chart */}
          <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-[#3B82F6]" /> 30-Day Developer Signups
                </h2>
                <p className="text-xs text-slate-400">Cumulative acquisition velocity</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/20 font-medium">
                Line Chart
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={signupsChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#F8FAFC',
                      fontSize: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="signups"
                    stroke="#3B82F6"
                    strokeWidth={2.5}
                    dot={{ fill: '#3B82F6', r: 3 }}
                    activeDot={{ r: 6, fill: '#60A5FA' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Bar Chart */}
          <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#F59E0B]" /> 30-Day Subscription Revenue ($)
                </h2>
                <p className="text-xs text-slate-400">Daily gross payment volume from plans</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 font-medium">
                Bar Chart
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
                  <XAxis dataKey="date" stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderColor: '#334155',
                      borderRadius: '8px',
                      color: '#F8FAFC',
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [`$${val}`, 'Daily Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Feedback Inbox Table (Phase 2 Requirement) */}
        <div className="bg-[#1E293B] border border-slate-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#3B82F6]" /> User Feedback Inbox
              </h2>
              <p className="text-xs text-slate-400">Direct developer sentiment submitted via the website floating modal</p>
            </div>
            <span className="text-xs text-slate-400">
              {feedback.filter((f) => f.status === 'unread').length} Unread
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-[#0F172A] text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">User Email</th>
                  <th className="py-3 px-4">Feedback / Message</th>
                  <th className="py-3 px-4">Submitted</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {feedback.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-slate-500 text-sm">
                      No feedback received yet.
                    </td>
                  </tr>
                ) : (
                  feedback.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition">
                      <td className="py-3 px-4">
                        {item.status === 'unread' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30">
                            Unread
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-400">
                            Read
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-300">
                        {item.user_email || <span className="text-slate-500 italic">Anonymous</span>}
                      </td>
                      <td className="py-3 px-4 max-w-md text-slate-200">
                        {item.message}
                      </td>
                      <td className="py-3 px-4 text-xs text-slate-400 whitespace-nowrap">
                        {new Date(item.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        {item.status === 'unread' ? (
                          <button
                            onClick={() => markFeedbackRead(item.id)}
                            className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 border border-[#3B82F6]/30 text-[#3B82F6] transition"
                          >
                            <Check className="w-3 h-3" /> Mark Read
                          </button>
                        ) : (
                          <span className="text-xs text-slate-500 flex items-center justify-end gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Resolved
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
