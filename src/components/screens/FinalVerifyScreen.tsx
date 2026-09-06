import React from 'react';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react';

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
    <div className="flex-1 flex flex-col justify-between p-4 bg-[#101415] text-[#e0e3e5] overflow-y-auto select-none space-y-4">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-1">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-[#191c1e] border border-[#1E293B] flex items-center justify-center text-white hover:bg-[#272a2c] transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center font-mono">
          <h2 className="text-sm font-bold text-white tracking-tight">Final Confirmation</h2>
          <span className="text-[10px] text-[#b4c5ff] bg-[#2563eb]/20 px-2 py-0.2 rounded border border-[#2563eb]/30">STEP 6 OF 6</span>
        </div>

        <div className="w-9" />
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto my-auto font-mono">
        {/* Title & Guidance */}
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">Verify & Publish</h3>
          <p className="text-xs text-[#8d90a0] leading-relaxed">
            Double check your artisan item summary before buyers in Telangana see it.
          </p>
        </div>

        {/* Product Card Summary */}
        <div className="bg-[#191c1e] rounded-2xl p-4 border border-[#1E293B] shadow-sm space-y-4">
          <div className="flex items-center gap-3.5">
            <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#1E293B] shrink-0 shadow-sm">
              <img
                src="/assets/indigo_cushion.jpg"
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1 flex-1">
              <span className="text-[10px] font-bold text-[#b4c5ff] bg-[#2563eb]/20 px-1.5 py-0.5 rounded tracking-wider uppercase border border-[#2563eb]/30">
                CUSHION COVER
              </span>
              <h4 className="text-sm font-bold text-white leading-snug pt-0.5">
                Indigo Floral Cushion Cover
              </h4>
              <p className="text-[11px] text-[#8d90a0]">
                Home Décor • Textiles
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#1E293B] flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8d90a0]">Buyer Price:</span>
            <span className="text-2xl font-bold text-white">₹{price}</span>
          </div>
        </div>

        {/* Kaarigar Bazaar Trust Badge */}
        <div className="bg-[#191c1e] p-3 rounded-xl border border-[#1E293B] flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#22C55E] shrink-0" />
          <p className="text-[11px] text-[#8d90a0] leading-tight">
            Ready to list on Kaarigar Bazaar network. Direct escrow payout to your registered bank account.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-2 font-mono">
        <button
          onClick={onPublish}
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-glow-blue active:scale-[0.99] transition flex items-center justify-center gap-2 border border-[#b4c5ff]/30"
        >
          <span>Publish Listing</span>
          <Check className="w-4 h-4 stroke-[3]" />
        </button>

        <button
          onClick={onBack}
          className="w-full bg-[#191c1e] hover:bg-[#272a2c] text-[#c3c6d7] border border-[#1E293B] py-3 px-4 rounded-xl font-bold text-xs transition"
        >
          Go Back & Edit
        </button>
      </div>
    </div>
  );
};
