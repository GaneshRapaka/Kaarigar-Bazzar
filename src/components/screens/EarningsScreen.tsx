import React, { useState } from 'react';
import { IndianRupee, MessageSquare, TrendingUp, CheckCheck, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface EarningsScreenProps {
  onWithdraw?: () => void;
}

export const EarningsScreen: React.FC<EarningsScreenProps> = ({ onWithdraw }) => {
  const [reportSent, setReportSent] = useState(false);

  return (
    <div className="flex-1 flex flex-col p-4 bg-artisan-bg overflow-y-auto select-none space-y-4">
      {/* Lifetime Earnings Banner */}
      <div className="bg-gradient-to-br from-[#FAF7F2] to-white rounded-3xl p-5 border border-artisan-border shadow-soft space-y-1">
        <span className="text-[11px] font-extrabold text-artisan-muted uppercase tracking-widest block">
          TOTAL LIFETIME EARNINGS
        </span>
        <div className="text-3xl font-black text-artisan-text tracking-tight">
          ₹24,680
        </div>
      </div>

      {/* Metrics 3-Item Breakdown Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* This Week */}
        <div className="bg-white p-3 rounded-2xl border border-artisan-border shadow-soft space-y-1">
          <span className="text-[10px] font-bold text-artisan-muted block leading-tight">
            This week
          </span>
          <span className="text-base font-extrabold text-artisan-text block">
            ₹4,280
          </span>
        </div>

        {/* This Month */}
        <div className="bg-white p-3 rounded-2xl border border-artisan-border shadow-soft space-y-1">
          <span className="text-[10px] font-bold text-artisan-muted block leading-tight">
            This month
          </span>
          <span className="text-base font-extrabold text-artisan-text block">
            ₹12,350
          </span>
        </div>

        {/* Pending Payout */}
        <div className="bg-white p-3 rounded-2xl border border-terracotta/30 bg-[#FFF9F6] shadow-soft space-y-1">
          <span className="text-[10px] font-bold text-terracotta block leading-tight">
            Pending payout
          </span>
          <span className="text-base font-extrabold text-terracotta block">
            ₹3,200
          </span>
        </div>
      </div>

      {/* WhatsApp Verification Note */}
      <div className="bg-white rounded-2xl p-3 border border-artisan-border shadow-soft flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
        <span className="text-[11px] font-semibold text-artisan-text">
          Bank Payout Status: <span className="text-forest">WhatsApp Verified</span>
        </span>
      </div>

      {/* Full Sales Report on WhatsApp Section */}
      <div className="space-y-2 pt-1">
        <div className="bg-white rounded-3xl p-4 border border-artisan-border shadow-soft space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0 mt-0.5">
              <MessageSquare className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-artisan-text">
                Full Sales Report on WhatsApp
              </h3>
              <p className="text-[11px] text-artisan-muted leading-relaxed mt-0.5">
                Get daily updates, order slips, and performance tips automatically on your registered chat.
              </p>
            </div>
          </div>

          {/* Simulated WhatsApp Chat Bubble */}
          <div className="bg-[#EFEAE2] p-3 rounded-2xl space-y-1 border border-[#E0D9CD]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-neutral-600">
                Kaarigar Assistant
              </span>
              <span className="text-[9px] text-neutral-400">8:01 PM</span>
            </div>

            <div className="bg-white rounded-xl p-2.5 shadow-sm text-xs text-neutral-800 space-y-1 relative">
              <p className="font-bold text-[11px] text-terracotta">
                Weekly Business Report
              </p>
              <p className="text-[11px] leading-relaxed">
                This week: <strong>4 orders</strong>, <strong>₹2,480</strong> earned.
              </p>
              <p className="text-[11px] text-neutral-600">
                Your best seller: <strong>cushion covers</strong>.
              </p>

              <div className="flex justify-end items-center gap-1 text-[9px] text-neutral-400 pt-0.5">
                <span>8:01 PM</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" />
              </div>
            </div>
          </div>

          <button
            onClick={() => setReportSent(true)}
            className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>{reportSent ? 'Report Sent to WhatsApp!' : 'Send Instant PDF Report to WhatsApp'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
