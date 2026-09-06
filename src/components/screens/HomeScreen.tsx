import React, { useState } from 'react';
import { Camera, Sparkles, MessageSquare, ChevronRight, Mic } from 'lucide-react';
import { ArtisanProfile } from '../../types';
import { useLanguage } from '../../services/i18n';

interface HomeScreenProps {
  profile: ArtisanProfile;
  onStartSell: () => void;
  onNavigateTab: (tab: any) => void;
  onOpenVoiceAssistant?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  profile,
  onStartSell,
  onNavigateTab,
  onOpenVoiceAssistant,
}) => {
  const { languageConfig, t } = useLanguage();
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-[#101415] text-[#e0e3e5] overflow-y-auto space-y-4">
      {/* Top Profile Header */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-[#191c1e] border border-[#1E293B] shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#2563eb]/60 shadow-glow-blue"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#2563eb] text-white text-[10px] font-mono font-bold flex items-center justify-center border border-[#101415]">
              {profile.initial}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold text-white leading-tight">
                {t('home.greeting')}, {profile.name}
              </h1>
              <span className="w-2 h-2 rounded-full bg-[#22C55E] ring-2 ring-[#22C55E]/20" title="Online" />
            </div>
            <p className="text-xs text-[#8d90a0] font-mono mt-0.5">
              {profile.title} • {profile.location}
            </p>
          </div>
        </div>

        {/* Language Badge */}
        <button
          onClick={() => onNavigateTab('profile')}
          className="px-2.5 py-1 rounded-lg bg-[#101415] border border-[#1E293B] hover:border-[#2563eb]/50 flex items-center gap-1 text-[#e0e3e5] transition"
          title="Switch Language in Profile"
        >
          <span className="text-xs font-bold text-[#b4c5ff] font-mono">{languageConfig.native}</span>
        </button>
      </div>

      {/* Prominent Voice Assistant Quick Card (Stitch HUD Style) */}
      <div
        onClick={onOpenVoiceAssistant}
        className="bg-gradient-to-r from-[#191c1e] via-[#1d2022] to-[#191c1e] rounded-2xl p-3.5 border border-[#2563eb]/40 shadow-glow-blue flex items-center justify-between cursor-pointer hover:border-[#2563eb] transition group"
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#2563eb] flex items-center justify-center text-white shadow-glow-blue group-hover:scale-105 transition-transform">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white">
                {t('home.voicePromptTitle')}
              </h3>
              <span className="text-[9px] font-mono font-bold bg-[#2563eb]/20 text-[#b4c5ff] px-1.5 py-0.5 rounded border border-[#2563eb]/30">
                AI VOICE
              </span>
            </div>
            <p className="text-[11px] text-[#8d90a0] font-mono mt-0.5 line-clamp-1">
              "{languageConfig.samplePrompt}"
            </p>
          </div>
        </div>

        <div className="w-7 h-7 rounded-lg bg-[#101415] border border-[#1E293B] text-[#b4c5ff] flex items-center justify-center shrink-0 group-hover:border-[#2563eb] transition">
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* Hero "Sell a Product" Card */}
      <div className="bg-[#191c1e] rounded-2xl p-4 border border-[#1E293B] shadow-soft relative overflow-hidden space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1.5 flex-1 pr-2">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#2563eb]/20 text-[#b4c5ff] text-[10px] font-mono font-bold border border-[#2563eb]/30">
              <Sparkles className="w-3 h-3 text-[#b4c5ff]" />
              <span>COGNITIVE VISION</span>
            </div>
            <h2 className="text-base font-bold text-white leading-snug">
              {t('home.sellCardTitle')}
            </h2>
            <p className="text-xs text-[#8d90a0] leading-relaxed">
              {t('home.sellCardDesc')}
            </p>
          </div>

          <div className="w-20 h-20 rounded-xl overflow-hidden border border-[#1E293B] shadow-sm shrink-0 relative">
            <img
              src="/assets/indigo_cushion.jpg"
              alt="Craft Sample"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
              <span className="text-[9px] text-[#b4c5ff] font-mono font-bold tracking-tight">Cushion</span>
            </div>
          </div>
        </div>

        <button
          onClick={onStartSell}
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-glow-blue active:scale-[0.99] transition-all flex items-center justify-center gap-2 group border border-[#b4c5ff]/20"
        >
          <Camera className="w-4 h-4 group-hover:rotate-12 transition-transform text-white" />
          <span>{t('home.sellButton')}</span>
        </button>
      </div>

      {/* Your Performance Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-mono font-bold text-[#8d90a0] uppercase tracking-wider">
            {t('home.performanceTitle')}
          </h3>
          <button
            onClick={() => onNavigateTab('earnings')}
            className="text-[11px] font-mono text-[#b4c5ff] hover:underline flex items-center gap-0.5"
          >
            <span>{t('home.details')}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 font-mono">
          {/* Card 1: Orders Today */}
          <div
            onClick={() => onNavigateTab('orders')}
            className="bg-[#191c1e] p-3 rounded-xl border border-[#1E293B] shadow-sm flex flex-col justify-between cursor-pointer hover:border-[#2563eb]/60 transition"
          >
            <span className="text-2xl font-bold text-white">2</span>
            <div className="mt-1">
              <span className="text-[10px] text-[#8d90a0] block leading-tight">
                {t('home.ordersToday')}
              </span>
            </div>
          </div>

          {/* Card 2: Items Live */}
          <div
            onClick={() => onNavigateTab('shop')}
            className="bg-[#191c1e] p-3 rounded-xl border border-[#1E293B] shadow-sm flex flex-col justify-between cursor-pointer hover:border-[#2563eb]/60 transition"
          >
            <span className="text-2xl font-bold text-white">4</span>
            <div className="mt-1">
              <span className="text-[10px] text-[#8d90a0] block leading-tight">
                {t('home.itemsLive')}
              </span>
            </div>
          </div>

          {/* Card 3: This Week */}
          <div
            onClick={() => onNavigateTab('earnings')}
            className="bg-[#191c1e] p-3 rounded-xl border border-[#1E293B] shadow-sm flex flex-col justify-between cursor-pointer hover:border-[#2563eb]/60 transition"
          >
            <span className="text-lg font-bold text-[#22C55E]">₹4,280</span>
            <div className="mt-1">
              <span className="text-[10px] text-[#8d90a0] block leading-tight">
                {t('home.thisWeek')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Daily Summary Card */}
      <div className="bg-[#191c1e] rounded-xl p-3.5 border border-[#1E293B] shadow-sm flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-[#22C55E]/15 border border-[#22C55E]/30 flex items-center justify-center text-[#22C55E]">
            <MessageSquare className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">{t('home.whatsappSummary')}</h4>
            <p className="text-[11px] text-[#8d90a0] font-mono">{t('home.everyEvening')}</p>
          </div>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={() => setWhatsappEnabled(!whatsappEnabled)}
          className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
            whatsappEnabled ? 'bg-[#22C55E]' : 'bg-[#323537]'
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
