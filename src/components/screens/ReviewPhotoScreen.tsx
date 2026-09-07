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
          <h2 className="text-sm font-bold text-artisan-text tracking-tight">Review Photo</h2>
          <span className="text-[11px] text-artisan-muted font-medium">2 of 6</span>
        </div>

        <div className="w-9" />
      </div>

      {/* Captured Photo Container */}
      <div className="my-auto space-y-4">
        <div className="w-full aspect-square rounded-3xl overflow-hidden border border-artisan-border shadow-md relative bg-neutral-100">
          <img
            src="/assets/indigo_cushion.jpg"
            alt="Captured Craft"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-artisan-text shadow-sm flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-forest" />
            <span>High Quality</span>
          </div>
        </div>

        {/* Feedback Card */}
        <div className="bg-white rounded-2xl p-4 border border-artisan-border shadow-soft space-y-1.5">
          <div className="flex items-center gap-2 text-forest">
            <CheckCircle2 className="w-4 h-4 fill-forest/10" />
            <h3 className="text-xs font-bold text-artisan-text">Photo looks sharp and clear!</h3>
          </div>
          <p className="text-xs text-artisan-muted leading-relaxed">
            Our assistant will now look closely at the print technique and pattern to build the listing draft.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-4 pb-1">
        <button
          onClick={onRetake}
          className="bg-white hover:bg-neutral-50 text-artisan-text border border-artisan-border py-3.5 px-4 rounded-2xl font-bold text-xs shadow-soft transition flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-4 h-4 text-artisan-muted" />
          <span>Retake</span>
        </button>

        <button
          onClick={onProceed}
          className="bg-terracotta hover:bg-terracotta-hover text-white py-3.5 px-4 rounded-2xl font-bold text-xs shadow-craft active:scale-[0.99] transition flex items-center justify-center gap-1.5"
        >
          <span>Looks Good</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
