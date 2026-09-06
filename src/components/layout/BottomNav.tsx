import React from 'react';
import { Home, ShoppingBag, IndianRupee, User, Mic } from 'lucide-react';
import { NavTab, ScreenId } from '../../types';
import { useLanguage } from '../../services/i18n';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenVoice?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  onNavigate,
  onOpenVoice,
}) => {
  const { t } = useLanguage();

  const navItems: { tab: NavTab; labelKey: string; icon: React.FC<{ className?: string }>; targetScreen: ScreenId }[] = [
    { tab: 'home', labelKey: 'nav.home', icon: Home, targetScreen: 'home' },
    { tab: 'orders', labelKey: 'nav.orders', icon: ShoppingBag, targetScreen: 'orders' },
    { tab: 'earnings', labelKey: 'nav.earnings', icon: IndianRupee, targetScreen: 'earnings' },
    { tab: 'profile', labelKey: 'nav.profile', icon: User, targetScreen: 'profile' },
  ];

  return (
    <nav className="shrink-0 bg-[#191c1e]/95 backdrop-blur-md border-t border-[#1E293B] px-3 py-2 flex items-center justify-around z-30 shadow-[0_-8px_24px_rgba(0,0,0,0.5)] relative">
      {navItems.slice(0, 2).map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => {
              onSelectTab(item.tab);
              onNavigate(item.targetScreen);
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-[#b4c5ff] font-medium scale-105'
                : 'text-[#8d90a0] hover:text-[#e0e3e5]'
            }`}
          >
            <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-[#2563eb]/20 text-[#b4c5ff] border border-[#2563eb]/40 shadow-glow-blue' : ''}`}>
              <Icon className={`w-4.5 h-4.5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
            </div>
            <span className="text-[10px] mt-1 tracking-wider uppercase font-mono">{t(item.labelKey)}</span>
          </button>
        );
      })}

      {/* Center Voice Mic Button */}
      {onOpenVoice && (
        <button
          onClick={onOpenVoice}
          className="-mt-5 w-12 h-12 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center shadow-glow-blue ring-4 ring-[#101415] active:scale-95 transition-all group relative"
          title={t('nav.voiceAssistant')}
        >
          <div className="absolute inset-0 rounded-full bg-[#2563eb]/30 animate-ping pointer-events-none" />
          <Mic className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
        </button>
      )}

      {navItems.slice(2).map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => {
              onSelectTab(item.tab);
              onNavigate(item.targetScreen);
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${
              isActive
                ? 'text-[#b4c5ff] font-medium scale-105'
                : 'text-[#8d90a0] hover:text-[#e0e3e5]'
            }`}
          >
            <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-[#2563eb]/20 text-[#b4c5ff] border border-[#2563eb]/40 shadow-glow-blue' : ''}`}>
              <Icon className={`w-4.5 h-4.5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
            </div>
            <span className="text-[10px] mt-1 tracking-wider uppercase font-mono">{t(item.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
};
