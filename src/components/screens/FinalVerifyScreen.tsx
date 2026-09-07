import React from 'react';
import { ArrowLeft, Check, Sparkles, ShieldCheck } from 'lucide-react';

interface FinalVerifyScreenProps {
  onBack: () => void;
  onPublish: () => void;
  price?: number;
}

export const FinalVerifyScreen: React.FC<FinalVerifyScreenProps> = ({
  onBack,
  onPublish,
  price = 620,
}) => {
  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-artisan-bg overflow-y-auto select-none space-y-4">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-1">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-artisan-border flex items-center justify-center text-artisan-text hover:bg-neutral-100 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <h2 className="text-sm font-bold text-artisan-text tracking-tight">Final Confirmation</h2>
          <span className="text-[11px] text-artisan-muted font-medium">Step 6 of 6</span>
        </div>

        <div className="w-9" />
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto my-auto">
        {/* Title & Guidance */}
        <div className="space-y-1">
          <h3 className="text-xl font-extrabold text-artisan-text">Verify & Publish</h3>
          <p className="text-xs text-artisan-muted leading-relaxed">
            Double check your artisan item summary before buyers in Telangana see it.
          </p>
        </div>

        {/* Product Card Summary */}
        <div className="bg-white rounded-3xl p-4 border border-artisan-border shadow-soft space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-artisan-border shrink-0 shadow-sm">
              <img
                src="/assets/indigo_cushion.jpg"
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-extrabold text-terracotta tracking-wider uppercase">
                CUSHION COVER
              </span>
              <h4 className="text-sm font-bold text-artisan-text leading-snug">
                Indigo Floral Cushion Cover
              </h4>
              <p className="text-[11px] text-artisan-muted">
                Home Décor • Textiles
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-artisan-border flex items-center justify-between">
            <span className="text-xs font-semibold text-artisan-muted">Buyer Price:</span>
            <span className="text-xl font-black text-artisan-text">₹{price}</span>
          </div>
        </div>

        {/* Kaarigar Bazaar Trust Badge */}
        <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-artisan-border/70 flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-forest shrink-0" />
          <p className="text-[11px] text-artisan-muted leading-tight">
            Ready to list on Kaarigar Bazaar network. Guaranteed direct payment to your bank account.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2">
        <button
          onClick={onPublish}
          className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-3.5 px-4 rounded-2xl font-bold text-xs shadow-craft active:scale-[0.99] transition flex items-center justify-center gap-2"
        >
          <span>Publish Listing</span>
          <Check className="w-4 h-4 stroke-[3]" />
        </button>

        <button
          onClick={onBack}
          className="w-full bg-white hover:bg-neutral-50 text-artisan-text border border-artisan-border py-3 px-4 rounded-2xl font-bold text-xs shadow-soft transition"
        >
          Go Back & Edit
        </button>
      </div>
    </div>
  );
};
