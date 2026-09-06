import React, { useState, useEffect } from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

interface AnalyzingCraftScreenProps {
  onBack: () => void;
  onComplete: () => void;
}

export const AnalyzingCraftScreen: React.FC<AnalyzingCraftScreenProps> = ({
  onBack,
  onComplete,
}) => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { text: 'Analyzing Your Craft...', time: 1200 },
    { text: 'Writing a description...', time: 2500 },
    { text: 'Identifying Indigo block-print style of Telangana.', time: 4000 },
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setStepIndex(1), 1200);
    const t2 = setTimeout(() => setStepIndex(2), 2600);
    const t3 = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-[#101415] text-[#e0e3e5] overflow-y-auto select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-2">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-[#191c1e] border border-[#1E293B] flex items-center justify-center text-white hover:bg-[#272a2c] transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center font-mono">
          <h2 className="text-sm font-bold text-white tracking-tight">Analyzing Craft</h2>
          <span className="text-[10px] text-[#b4c5ff] bg-[#2563eb]/20 px-2 py-0.2 rounded border border-[#2563eb]/30">STEP 3 OF 6</span>
        </div>

        {/* Skip button for fast previewing */}
        <button
          onClick={onComplete}
          className="text-[11px] font-mono font-semibold text-[#b4c5ff] hover:underline"
        >
          Skip
        </button>
      </div>

      {/* Main Image with Radar Scan Effect */}
      <div className="my-auto space-y-5">
        <div className="w-full aspect-square rounded-2xl overflow-hidden border border-[#2563eb]/50 shadow-glow-blue relative bg-[#0c0f10]">
          <img
            src="/assets/indigo_cushion.jpg"
            alt="Analyzing Craft"
            className="w-full h-full object-cover opacity-80"
          />

          {/* Radar Scan Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 rounded-full border-2 border-[#b4c5ff] animate-ping-slow" />
            <div className="w-36 h-36 rounded-full border border-[#2563eb]/60 animate-pulse" />
            <div className="w-12 h-12 rounded-xl bg-[#2563eb]/90 backdrop-blur-md flex items-center justify-center text-white shadow-glow-blue border border-[#b4c5ff]/40">
              <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          </div>

          {/* Scan Laser Bar */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#b4c5ff] to-transparent animate-scan-laser shadow-[0_0_16px_#2563eb]" />

          {/* AI Badge Overlay */}
          <div className="absolute top-3 left-3 bg-[#101415]/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-mono font-bold text-[#b4c5ff] border border-[#2563eb]/40 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3 h-3 text-[#b4c5ff]" />
            <span>AI VISION ENGINE</span>
          </div>
        </div>

        {/* Step Progression Card */}
        <div className="bg-[#191c1e] rounded-xl p-4 border border-[#1E293B] shadow-sm space-y-3 font-mono">
          <div className="space-y-2.5">
            {steps.map((s, idx) => {
              const isDone = stepIndex > idx;
              const isCurrent = stepIndex === idx;

              return (
                <div key={idx} className="flex items-center gap-2.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-[#22C55E] shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-[#b4c5ff] animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-[#434655] shrink-0" />
                  )}

                  <span
                    className={`text-xs transition-colors ${
                      isDone
                        ? 'text-white font-semibold'
                        : isCurrent
                        ? 'text-[#b4c5ff] font-bold'
                        : 'text-[#8d90a0]'
                    }`}
                  >
                    {s.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subtext info */}
      <div className="text-center py-2">
        <p className="text-[11px] text-[#8d90a0] leading-relaxed font-mono">
          This takes about 10 seconds. You can always edit everything in the next step.
        </p>
      </div>
    </div>
  );
};
