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
    } catch (e) {
      // Ignore if canvas-confetti is running in test environment
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-artisan-bg select-none text-center">
      <div className="my-auto space-y-6">
        {/* Big Success Check Circle */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full border-4 border-forest/30 bg-forest-light flex items-center justify-center text-forest mx-auto shadow-xl animate-bounce" style={{ animationDuration: '2s' }}>
            <Check className="w-12 h-12 stroke-[3]" />
          </div>
          <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-400 text-amber-900 flex items-center justify-center shadow-md animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-artisan-text tracking-tight">
            Your product is live!
          </h2>
          <p className="text-xs text-artisan-muted leading-relaxed max-w-xs mx-auto">
            Your handprinted <span className="font-bold text-artisan-text">{productName}</span> is published to <span className="text-terracotta font-bold">Kaarigar Bazaar</span>.
          </p>
        </div>

        {/* WhatsApp Notification Prompt Box */}
        <div className="bg-white rounded-2xl p-4 border border-artisan-border shadow-soft flex items-start gap-3 text-left">
          <div className="w-9 h-9 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] shrink-0 mt-0.5">
            <MessageSquare className="w-4 h-4 fill-current" />
          </div>
          <p className="text-xs text-artisan-muted leading-relaxed">
            We'll message you on WhatsApp as soon as you get your first order. Keep your phone active!
          </p>
        </div>
      </div>

      {/* Bottom Action Button */}
      <div className="pt-4 pb-2">
        <button
          onClick={onGoToShop}
          className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-3.5 px-4 rounded-2xl font-bold text-xs shadow-craft active:scale-[0.99] transition flex items-center justify-center gap-2"
        >
          <span>Go to My Shop</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
