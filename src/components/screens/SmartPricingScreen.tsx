import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Minus, Plus, HelpCircle, ArrowRight } from 'lucide-react';

interface SmartPricingScreenProps {
  onBack: () => void;
  onProceed: (price: number) => void;
  initialPrice?: number;
  costPrice?: number;
}

export const SmartPricingScreen: React.FC<SmartPricingScreenProps> = ({
  onBack,
  onProceed,
  initialPrice = 620,
  costPrice = 340,
}) => {
  const [sellingPrice, setSellingPrice] = useState(initialPrice);
  const [showExplanation, setShowExplanation] = useState(false);

  const profit = Math.max(0, sellingPrice - costPrice);

  const handleDecrease = () => {
    if (sellingPrice > 350) {
      setSellingPrice((prev) => prev - 20);
    }
  };

  const handleIncrease = () => {
    setSellingPrice((prev) => prev + 20);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-[#101415] text-[#e0e3e5] overflow-y-auto select-none space-y-3">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-1">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-[#191c1e] border border-[#1E293B] flex items-center justify-center text-white hover:bg-[#272a2c] transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center font-mono">
          <h2 className="text-sm font-bold text-white tracking-tight">Smart Pricing Suggestion</h2>
          <span className="text-[10px] text-[#b4c5ff] bg-[#2563eb]/20 px-2 py-0.2 rounded border border-[#2563eb]/30">STEP 5 OF 6</span>
        </div>

        <div className="w-9" />
      </div>

      <div className="space-y-3.5 flex-1 overflow-y-auto">
        {/* Title & Calculation Logic */}
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white font-mono">Suggested Selling Price</h3>
          <p className="text-xs text-[#8d90a0] leading-relaxed font-mono">
            Calculated based on print size, cotton cost, and current artisan trends.
          </p>
        </div>

        {/* Cost vs Market Suggestion Cards */}
        <div className="grid grid-cols-2 gap-3 font-mono">
          {/* Your Cost Price */}
          <div className="bg-[#191c1e] rounded-xl p-3.5 border border-[#1E293B] shadow-sm space-y-1">
            <span className="text-[10px] font-bold text-[#8d90a0] uppercase tracking-wider block">
              Your Cost Price
            </span>
            <div className="text-xl font-bold text-white">₹{costPrice}</div>
          </div>

          {/* Market Suggestion */}
          <div className="bg-[#191c1e] rounded-xl p-3.5 border border-[#2563eb]/50 shadow-glow-blue space-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#b4c5ff] uppercase tracking-wider block">
                Market Suggestion
              </span>
              <Sparkles className="w-3 h-3 text-[#b4c5ff]" />
            </div>
            <div className="text-xl font-bold text-[#b4c5ff]">₹{initialPrice}</div>
            <span className="inline-block text-[9px] px-1.5 py-0.5 rounded bg-[#2563eb]/20 text-[#b4c5ff] font-bold border border-[#2563eb]/30">
              AI ASSISTED
            </span>
          </div>
        </div>

        {/* Why this price? Expandable trigger */}
        <div className="bg-[#191c1e] rounded-xl p-3 border border-[#1E293B] shadow-sm font-mono">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="w-full flex items-center justify-between text-xs font-bold text-white hover:text-[#b4c5ff] transition"
          >
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#b4c5ff]" />
              <span>Why this price? (Includes artisan premium)</span>
            </span>
            <span className="text-xs text-[#8d90a0]">{showExplanation ? '−' : '+'}</span>
          </button>

          {showExplanation && (
            <div className="mt-2.5 pt-2.5 border-t border-[#1E293B] text-[11px] text-[#8d90a0] leading-relaxed space-y-1 animate-fadeIn">
              <p>• <strong>Raw Cotton & Weave:</strong> ₹180</p>
              <p>• <strong>Natural Indigo Dye:</strong> ₹160</p>
              <p>• <strong>Hand Block Labor & Margin:</strong> ₹280</p>
              <p className="text-[#b4c5ff] font-semibold">Buyers in Telangana are currently purchasing hand block cushion covers at ₹600 - ₹680.</p>
            </div>
          )}
        </div>

        {/* Adjust Final Selling Price Stepper */}
        <div className="bg-[#191c1e] rounded-xl p-4 border border-[#1E293B] shadow-sm space-y-3 font-mono">
          <div className="text-center space-y-0.5">
            <label className="text-xs font-bold text-white block">
              Adjust your final selling price:
            </label>
            <span className="text-[10px] text-[#8d90a0]">Tap minus or plus to adjust</span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleDecrease}
              className="w-12 h-12 rounded-xl bg-[#101415] hover:bg-[#272a2c] active:scale-95 border border-[#1E293B] flex items-center justify-center text-white font-bold transition shadow-sm"
            >
              <Minus className="w-5 h-5" />
            </button>

            <div className="w-32 h-14 rounded-xl bg-[#101415] border border-[#2563eb] flex items-center justify-center shadow-glow-blue">
              <span className="text-2xl font-bold text-white">₹{sellingPrice}</span>
            </div>

            <button
              onClick={handleIncrease}
              className="w-12 h-12 rounded-xl bg-[#101415] hover:bg-[#272a2c] active:scale-95 border border-[#1E293B] flex items-center justify-center text-white font-bold transition shadow-sm"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Estimated Profit Pill */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22C55E]/15 text-[#22C55E] text-xs font-bold border border-[#22C55E]/30">
              <span>Estimated profit:</span>
              <span className="text-sm font-bold text-[#22C55E]">₹{profit}</span>
            </div>
          </div>
        </div>

        {/* Suggestion note */}
        <p className="text-[11px] text-[#8d90a0] text-center px-2 font-mono">
          You decide the final price — this is just our suggestion.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="pt-2 font-mono">
        <button
          onClick={() => onProceed(sellingPrice)}
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-glow-blue active:scale-[0.99] transition flex items-center justify-center gap-2 border border-[#b4c5ff]/30"
        >
          <span>Publish Your Cushion Cover</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
