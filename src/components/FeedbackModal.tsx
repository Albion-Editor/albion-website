'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, CheckCircle2, Loader2 } from 'lucide-react';

export function FeedbackModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_email: email.trim() || null, message: message.trim() }),
      });
      if (res.ok) {
        setSent(true);
        setTimeout(() => {
          setSent(false);
          setOpen(false);
          setMessage('');
          setEmail('');
        }, 2000);
      }
    } catch (err) {
      console.error('Feedback submit error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1E293B] hover:bg-slate-800 text-slate-200 border border-slate-700/80 shadow-2xl hover:border-[#3B82F6]/60 transition-all transform hover:-translate-y-0.5 group"
        aria-label="Send Feedback"
      >
        <span className="w-2 h-2 rounded-full bg-[#F59E0B] group-hover:animate-ping" />
        <MessageSquare className="w-4 h-4 text-[#3B82F6]" />
        <span className="text-xs font-semibold tracking-wide">Send Feedback</span>
      </button>

      {/* Feedback Modal Backdrop */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="w-full max-w-md bg-[#1E293B] border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {sent ? (
              <div className="py-8 flex flex-col items-center text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#10B981] animate-bounce" />
                <h3 className="text-lg font-bold text-white">Thank You for Your Feedback!</h3>
                <p className="text-xs text-slate-400 max-w-xs">
                  Your thoughts help us shape the future of Albion. We review every single note.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Share Your Thoughts</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Have an idea, found an issue, or want a feature in Albion? Let us know directly.
                  </p>
                </div>

                <div>
                  <label htmlFor="feedback-email" className="block text-xs font-medium text-slate-300 mb-1">
                    Your Email <span className="text-slate-500 font-normal">(Optional, for replies)</span>
                  </label>
                  <input
                    id="feedback-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="developer@example.com"
                    className="w-full bg-[#0F172A] border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] transition"
                  />
                </div>

                <div>
                  <label htmlFor="feedback-message" className="block text-xs font-medium text-slate-300 mb-1">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="feedback-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you think or what we should build next..."
                    className="w-full bg-[#0F172A] border border-slate-700/80 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] transition resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !message.trim()}
                    className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#3B82F6] hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-md transition"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" /> Submit Feedback
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
