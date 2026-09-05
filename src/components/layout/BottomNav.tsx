import React from 'react';
import { Home, ShoppingBag, IndianRupee, User } from 'lucide-react';
import { NavTab, ScreenId } from '../../types';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab, onNavigate }) => {
  const navItems: { tab: NavTab; label: string; icon: React.FC<{ className?: string }>; targetScreen: ScreenId }[] = [
    { tab: 'home', label: 'Home', icon: Home, targetScreen: 'home' },
    { tab: 'orders', label: 'Orders', icon: ShoppingBag, targetScreen: 'orders' },
    { tab: 'earnings', label: 'Earnings', icon: IndianRupee, targetScreen: 'earnings' },
    { tab: 'profile', label: 'Profile', icon: User, targetScreen: 'profile' },
  ];

  return (
    <nav className="shrink-0 bg-white border-t border-[#EAE3D6] px-3 py-2 flex items-center justify-around z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
      {navItems.map((item) => {
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
                ? 'text-terracotta font-semibold scale-105'
                : 'text-[#8A8175] hover:text-artisan-text'
            }`}
          >
            <div className={`p-1 rounded-lg transition-colors ${isActive ? 'bg-terracotta/10' : ''}`}>
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}`} />
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
