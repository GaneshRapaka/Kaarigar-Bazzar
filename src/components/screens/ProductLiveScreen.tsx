import React, { useEffect } from 'react';
import { Check, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProductLiveScreenProps {
  onGoToShop: () => void;
  productName?: string;
}

export const ProductLiveScreen: React.FC<ProductLiveScreenProps> = ({
  onGoToShop,
  productName = 'Indigo Cushion Cover',
}) => {
  useEffect(() => {
    // Fire festive artisan confetti
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.4 },
        colors: ['#C85A32', '#D9822B', '#2E7D32', '#1F3A52'],
      });
    } catch {
      // Ignore if canvas-confetti is running in test environment
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#101415] text-[#e0e3e5] select-none text-center">
      <div className="my-auto space-y-6">
        {/* Big Success Check Circle */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-2xl border border-[#22C55E] bg-[#191c1e] flex items-center justify-center text-[#22C55E] mx-auto shadow-glow-blue animate-bounce" style={{ animationDuration: '2s' }}>
            <Check className="w-12 h-12 stroke-[3]" />
          </div>
          <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-lg bg-[#2563eb] text-white flex items-center justify-center shadow-glow-blue animate-pulse border border-[#b4c5ff]/40">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white tracking-tight font-mono">
            Product is Live!
          </h2>
          <p className="text-xs text-[#8d90a0] leading-relaxed max-w-xs mx-auto font-mono">
            Your handprinted <span className="font-bold text-white">{productName}</span> is published to <span className="text-[#b4c5ff] font-bold">Kaarigar Bazaar</span>.
          </p>
        </div>

        {/* WhatsApp Notification Prompt Box */}
        <div className="bg-[#191c1e] rounded-xl p-4 border border-[#1E293B] shadow-sm flex items-start gap-3 text-left font-mono">
          <div className="w-9 h-9 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E] shrink-0 mt-0.5">
            <MessageSquare className="w-4 h-4 fill-current" />
          </div>
          <p className="text-xs text-[#8d90a0] leading-relaxed">
            We'll message you on WhatsApp as soon as you get your first order. Keep your phone active!
          </p>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="pt-4 pb-2 font-mono">
        <button
          onClick={onGoToShop}
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-glow-blue active:scale-[0.99] transition flex items-center justify-center gap-2 border border-[#b4c5ff]/30"
        >
          <span>Go to My Shop</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
