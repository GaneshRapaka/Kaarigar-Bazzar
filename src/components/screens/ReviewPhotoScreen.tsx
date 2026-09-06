import React from 'react';
import { ArrowLeft, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';

interface ReviewPhotoScreenProps {
  onBack: () => void;
  onRetake: () => void;
  onProceed: () => void;
}

export const ReviewPhotoScreen: React.FC<ReviewPhotoScreenProps> = ({
  onBack,
  onRetake,
  onProceed,
}) => {
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
          <h2 className="text-sm font-bold text-white tracking-tight">Review Photo</h2>
          <span className="text-[10px] text-[#b4c5ff] bg-[#2563eb]/20 px-2 py-0.2 rounded border border-[#2563eb]/30">STEP 2 OF 6</span>
        </div>

        <div className="w-9" />
      </div>

      {/* Captured Photo Container */}
      <div className="my-auto space-y-4">
        <div className="w-full aspect-square rounded-2xl overflow-hidden border border-[#1E293B] shadow-md relative bg-[#0c0f10]">
          <img
            src="/assets/indigo_cushion.jpg"
            alt="Captured Craft"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 right-3 bg-[#101415]/90 backdrop-blur-md border border-[#1E293B] px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-white shadow-sm flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#22C55E]" />
            <span>HQ SENSOR PASS</span>
          </div>
        </div>

        {/* Feedback Card */}
        <div className="bg-[#191c1e] rounded-xl p-4 border border-[#1E293B] shadow-sm space-y-1.5">
          <div className="flex items-center gap-2 text-[#22C55E]">
            <CheckCircle2 className="w-4 h-4" />
            <h3 className="text-xs font-bold text-white font-mono">Clarity and lighting validated</h3>
          </div>
          <p className="text-xs text-[#8d90a0] leading-relaxed">
            Our assistant will now examine the print technique and pattern to build the listing draft.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-4 pb-1 font-mono">
        <button
          onClick={onRetake}
          className="bg-[#191c1e] hover:bg-[#272a2c] text-[#c3c6d7] border border-[#1E293B] py-3 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4 text-[#8d90a0]" />
          <span>Retake</span>
        </button>

        <button
          onClick={onProceed}
          className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-glow-blue active:scale-[0.99] transition flex items-center justify-center gap-1.5 border border-[#b4c5ff]/30"
        >
          <span>Looks Good</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
