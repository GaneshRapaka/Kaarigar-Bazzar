import React, { useState } from 'react';
import { Camera, Sparkles, MessageSquare, TrendingUp, Package, Eye, ChevronRight } from 'lucide-react';
import { ArtisanProfile } from '../../types';

interface HomeScreenProps {
  profile: ArtisanProfile;
  onStartSell: () => void;
  onNavigateTab: (tab: any) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  onStartSell,
  onNavigateTab,
}) => {
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-artisan-bg overflow-y-auto space-y-4">
      {/* Top Profile Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-terracotta/40 shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-terracotta text-white text-[10px] font-bold flex items-center justify-center border border-white">
              {profile.initial}
            </div>
          </div>
          <div>
            <h1 className="text-lg font-bold text-artisan-text leading-tight">
              Namaste, {profile.name}
            </h1>
            <p className="text-xs text-artisan-muted font-medium">
              {profile.title} from {profile.location}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('profile')}
          className="w-9 h-9 rounded-full bg-white border border-artisan-border flex items-center justify-center text-artisan-text hover:bg-neutral-50 shadow-soft"
        >
          <span className="text-xs font-bold text-terracotta">తె</span>
        </button>
      </div>

      {/* Hero "Sell a Product" Card */}
      <div className="bg-white rounded-3xl p-4 border border-artisan-border shadow-soft relative overflow-hidden space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1 flex-1 pr-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-terracotta/10 text-terracotta text-[10px] font-bold">
              <Sparkles className="w-3 h-3" />
              <span>AI Assistant Ready</span>
            </div>
            <h2 className="text-base font-extrabold text-artisan-text leading-snug">
              Have a new product to list?
            </h2>
            <p className="text-xs text-artisan-muted leading-relaxed">
              Take a quick photo. Our smart assistant will write the details and suggest the price for you.
            </p>
          </div>

          <div className="w-20 h-20 rounded-2xl overflow-hidden border border-artisan-border shadow-sm shrink-0 relative">
            <img
              src="/assets/indigo_cushion.jpg"
              alt="Craft Sample"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-1">
              <span className="text-[9px] text-white font-bold tracking-tight">Cushion</span>
            </div>
          </div>
        </div>

        <button
          onClick={onStartSell}
          className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-3 px-4 rounded-2xl font-bold text-xs shadow-craft active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
        >
          <Camera className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>Sell a Product</span>
        </button>
      </div>

      {/* Your Performance Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-artisan-text uppercase tracking-wider">
            Your Performance
          </h3>
          <button
            onClick={() => onNavigateTab('earnings')}
            className="text-[11px] font-semibold text-terracotta hover:underline flex items-center gap-0.5"
          >
            <span>Details</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Card 1: Orders Today */}
          <div
            onClick={() => onNavigateTab('orders')}
            className="bg-white p-3 rounded-2xl border border-artisan-border shadow-soft flex flex-col justify-between cursor-pointer hover:border-terracotta/40 transition"
          >
            <span className="text-2xl font-extrabold text-artisan-text">3</span>
            <div className="mt-1">
              <span className="text-[10px] font-medium text-artisan-muted block leading-tight">
                Orders Today
              </span>
            </div>
          </div>

          {/* Card 2: Items Live */}
          <div
            onClick={() => onNavigateTab('shop')}
            className="bg-white p-3 rounded-2xl border border-artisan-border shadow-soft flex flex-col justify-between cursor-pointer hover:border-terracotta/40 transition"
          >
            <span className="text-2xl font-extrabold text-artisan-text">12</span>
            <div className="mt-1">
              <span className="text-[10px] font-medium text-artisan-muted block leading-tight">
                Items Live
              </span>
            </div>
          </div>

          {/* Card 3: This Week */}
          <div
            onClick={() => onNavigateTab('earnings')}
            className="bg-white p-3 rounded-2xl border border-artisan-border shadow-soft flex flex-col justify-between cursor-pointer hover:border-terracotta/40 transition"
          >
            <span className="text-lg font-extrabold text-forest">₹4,280</span>
            <div className="mt-1">
              <span className="text-[10px] font-medium text-artisan-muted block leading-tight">
                This Week
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Daily Summary Card */}
      <div className="bg-white rounded-2xl p-3.5 border border-artisan-border shadow-soft flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
            <MessageSquare className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-artisan-text">WhatsApp Summary</h4>
            <p className="text-[11px] text-artisan-muted">Sent every evening at 8 PM</p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={() => setWhatsappEnabled(!whatsappEnabled)}
          className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
            whatsappEnabled ? 'bg-forest' : 'bg-neutral-300'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
              whatsappEnabled ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    </div>
  );
};
