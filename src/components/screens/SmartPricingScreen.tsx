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
    <div className="flex-1 flex flex-col justify-between p-4 bg-artisan-bg overflow-y-auto select-none space-y-3">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-1">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-artisan-border flex items-center justify-center text-artisan-text hover:bg-neutral-100 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <h2 className="text-sm font-bold text-artisan-text tracking-tight">Smart Pricing Suggestion</h2>
          <span className="text-[11px] text-artisan-muted font-medium">5 of 6</span>
        </div>

        <div className="w-9" />
      </div>

      <div className="space-y-3.5 flex-1 overflow-y-auto">
        {/* Title & Calculation Logic */}
        <div className="space-y-1">
          <h3 className="text-base font-extrabold text-artisan-text">Suggested Selling Price</h3>
          <p className="text-xs text-artisan-muted leading-relaxed">
            Calculated based on print size, cotton cost, and current artisan trends.
          </p>
        </div>

        {/* Cost vs Market Suggestion Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Your Cost Price */}
          <div className="bg-white rounded-2xl p-3.5 border border-artisan-border shadow-soft space-y-1">
            <span className="text-[10px] font-bold text-artisan-muted uppercase tracking-wider block">
              Your Cost Price
            </span>
            <div className="text-xl font-extrabold text-artisan-text">₹{costPrice}</div>
          </div>

          {/* Market Suggestion */}
          <div className="bg-white rounded-2xl p-3.5 border border-terracotta/30 bg-[#FFFDFB] shadow-soft space-y-1 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-terracotta uppercase tracking-wider block">
                Market Suggestion
              </span>
              <Sparkles className="w-3 h-3 text-terracotta" />
            </div>
            <div className="text-xl font-extrabold text-terracotta">₹{initialPrice}</div>
            <span className="inline-block text-[9px] px-1.5 py-0.5 rounded bg-terracotta/10 text-terracotta font-bold">
              AI Assisted
            </span>
          </div>
        </div>

        {/* Why this price? Expandable trigger */}
        <div className="bg-white rounded-2xl p-3 border border-artisan-border shadow-soft">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="w-full flex items-center justify-between text-xs font-bold text-artisan-text hover:text-terracotta transition"
          >
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-terracotta" />
              <span>Why this price? (Includes block artisan premium)</span>
            </span>
            <span className="text-xs text-neutral-400">{showExplanation ? '−' : '+'}</span>
          </button>

          {showExplanation && (
            <div className="mt-2.5 pt-2.5 border-t border-artisan-border text-[11px] text-artisan-muted leading-relaxed space-y-1 animate-fadeIn">
              <p>• <strong>Raw Cotton & Weave:</strong> ₹180</p>
              <p>• <strong>Natural Indigo Fermentation Dye:</strong> ₹160</p>
              <p>• <strong>Hand Block Labor & Margin:</strong> ₹280</p>
              <p className="text-terracotta font-semibold">Buyers in Telangana are currently purchasing hand block cushion covers at ₹600 - ₹680.</p>
            </div>
          )}
        </div>

        {/* Adjust Final Selling Price Stepper */}
        <div className="bg-white rounded-2xl p-4 border border-artisan-border shadow-soft space-y-3">
          <div className="text-center space-y-0.5">
            <label className="text-xs font-bold text-artisan-text block">
              Adjust your final selling price:
            </label>
            <span className="text-[10px] text-artisan-muted">Tap minus or plus to adjust</span>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handleDecrease}
              className="w-12 h-12 rounded-2xl bg-[#FAF7F2] hover:bg-neutral-200 active:scale-95 border border-artisan-border flex items-center justify-center text-artisan-text font-bold transition shadow-sm"
            >
              <Minus className="w-5 h-5" />
            </button>

            <div className="w-32 h-14 rounded-2xl bg-white border-2 border-terracotta/40 flex items-center justify-center shadow-inner">
              <span className="text-2xl font-black text-artisan-text">₹{sellingPrice}</span>
            </div>

            <button
              onClick={handleIncrease}
              className="w-12 h-12 rounded-2xl bg-[#FAF7F2] hover:bg-neutral-200 active:scale-95 border border-artisan-border flex items-center justify-center text-artisan-text font-bold transition shadow-sm"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Estimated Profit Pill */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-light text-forest text-xs font-bold border border-forest/20">
              <span>Estimated profit:</span>
              <span className="text-sm font-extrabold">₹{profit}</span>
            </div>
          </div>
        </div>

        {/* Suggestion note */}
        <p className="text-[11px] text-artisan-muted text-center px-2">
          You decide the final price — this is just our suggestion.
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="pt-2">
        <button
          onClick={() => onProceed(sellingPrice)}
          className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-3.5 px-4 rounded-2xl font-bold text-xs shadow-craft active:scale-[0.99] transition flex items-center justify-center gap-2"
        >
          <span>Publish Your Cushion Cover</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
