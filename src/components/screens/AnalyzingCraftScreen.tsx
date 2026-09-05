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
    <div className="flex-1 flex flex-col justify-between p-4 bg-artisan-bg overflow-y-auto select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-2">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-artisan-border flex items-center justify-center text-artisan-text hover:bg-neutral-100 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <h2 className="text-sm font-bold text-artisan-text tracking-tight">Analyzing Craft</h2>
          <span className="text-[11px] text-artisan-muted font-medium">3 of 6</span>
        </div>

        {/* Skip button for fast previewing */}
        <button
          onClick={onComplete}
          className="text-[11px] font-semibold text-terracotta hover:underline"
        >
          Skip
        </button>
      </div>

      {/* Main Image with Radar Scan Effect */}
      <div className="my-auto space-y-5">
        <div className="w-full aspect-square rounded-3xl overflow-hidden border-2 border-terracotta/40 shadow-xl relative bg-neutral-900">
          <img
            src="/assets/indigo_cushion.jpg"
            alt="Analyzing Craft"
            className="w-full h-full object-cover opacity-85"
          />

          {/* Radar Scan Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 rounded-full border-2 border-amber-300 animate-ping-slow" />
            <div className="w-36 h-36 rounded-full border border-amber-400/50 animate-pulse" />
            <div className="w-12 h-12 rounded-full bg-terracotta/80 backdrop-blur-md flex items-center justify-center text-white shadow-xl">
              <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '4s' }} />
            </div>
          </div>

          {/* Scan Laser Bar */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-300 to-transparent animate-scan-laser shadow-[0_0_12px_#FCD34D]" />

          {/* AI Badge Overlay */}
          <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-amber-300 border border-amber-300/30 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3" />
            <span>AI Vision Engine</span>
          </div>
        </div>

        {/* Step Progression Card */}
        <div className="bg-white rounded-2xl p-4 border border-artisan-border shadow-soft space-y-3">
          <div className="space-y-2.5">
            {steps.map((s, idx) => {
              const isDone = stepIndex > idx;
              const isCurrent = stepIndex === idx;

              return (
                <div key={idx} className="flex items-center gap-2.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-terracotta animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-neutral-300 shrink-0" />
                  )}

                  <span
                    className={`text-xs transition-colors ${
                      isDone
                        ? 'text-artisan-text font-semibold'
                        : isCurrent
                        ? 'text-terracotta font-bold'
                        : 'text-artisan-subtle'
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
        <p className="text-[11px] text-artisan-muted leading-relaxed">
          This takes about 10 seconds. You can always edit everything in the next step.
        </p>
      </div>
    </div>
  );
};
