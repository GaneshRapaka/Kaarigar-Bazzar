import React from 'react';
import { ScreenId } from '../../types';
import { Smartphone, RotateCcw } from 'lucide-react';

interface ScreenSwitcherProps {
  currentScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  showDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
  onReset: () => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onSelectScreen,
  showDeviceFrame,
  onToggleDeviceFrame,
  onReset,
}) => {
  const screens: { id: ScreenId; label: string; group: string; number: number }[] = [
    { id: 'language_select', label: '1. Language Select', group: 'Onboarding', number: 1 },
    { id: 'login', label: '2. Mobile Sign In', group: 'Onboarding', number: 2 },
    { id: 'otp_auth', label: '3. OTP Verification', group: 'Onboarding', number: 3 },
    { id: 'minimal_onboarding', label: '4. Quick Setup', group: 'Onboarding', number: 4 },
    { id: 'home', label: '5. Artisan Home', group: 'Main', number: 5 },
    { id: 'take_photo', label: '6. Step 1: Camera', group: 'AI Listing Flow', number: 6 },
    { id: 'review_photo', label: '7. Step 2: Review Photo', group: 'AI Listing Flow', number: 7 },
    { id: 'analyzing_craft', label: '8. Step 3: AI Scanner', group: 'AI Listing Flow', number: 8 },
    { id: 'review_listing', label: '9. Step 4: Craft Draft', group: 'AI Listing Flow', number: 9 },
    { id: 'smart_pricing', label: '10. Step 5: Smart Pricing', group: 'AI Listing Flow', number: 10 },
    { id: 'final_verify', label: '11. Step 6: Verify & Publish', group: 'AI Listing Flow', number: 11 },
    { id: 'product_live', label: '12. Published Live', group: 'AI Listing Flow', number: 12 },
    { id: 'my_shop', label: '13. My Shop', group: 'Shop & Ops', number: 13 },
    { id: 'orders', label: '14. Your Orders', group: 'Shop & Ops', number: 14 },
    { id: 'earnings', label: '15. Earnings & Analytics', group: 'Shop & Ops', number: 15 },
    { id: 'profile', label: '16. Profile & KYC', group: 'Shop & Ops', number: 16 },
  ];

  return (
    <header className="w-full bg-[#101415] border-b border-[#1E293B] text-[#e0e3e5] px-4 py-2.5 z-50 select-none shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Project Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center text-white font-mono font-bold text-sm shadow-glow-blue">
            KB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm tracking-tight">Kaarigar Bazaar</span>
              <span className="text-xs text-[#8d90a0]">| Cognitive OS Design</span>
              <span className="text-[10px] font-mono bg-[#2563eb]/20 text-[#b4c5ff] px-2 py-0.5 rounded border border-[#2563eb]/40">
                16 Screens
              </span>
            </div>
            <p className="text-[11px] text-[#8d90a0] font-mono">
              Artisan Assistant • Stitch Reference Integration
            </p>
          </div>
        </div>

        {/* Screen Navigator Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1 scrollbar-none">
          {screens.map((s) => {
            const isActive = currentScreen === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectScreen(s.id)}
                className={`text-xs px-2.5 py-1.5 rounded font-mono font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#2563eb] text-white shadow-glow-blue scale-105 border border-[#b4c5ff]/40'
                    : 'bg-[#191c1e] hover:bg-[#272a2c] text-[#c3c6d7] border border-[#1E293B]'
                }`}
                title={s.label}
              >
                {s.number}
              </button>
            );
          })}
        </div>

        {/* Toolbar controls */}
        <div className="flex items-center gap-2 font-mono">
          <button
            onClick={onToggleDeviceFrame}
            className={`text-xs px-3 py-1.5 rounded border transition flex items-center gap-1.5 ${
              showDeviceFrame
                ? 'bg-[#191c1e] text-[#b4c5ff] border-[#2563eb]/50 shadow-sm'
                : 'bg-[#2563eb]/20 text-[#b4c5ff] border-[#2563eb]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{showDeviceFrame ? 'Frame: ON' : 'Frame: OFF'}</span>
          </button>

          <button
            onClick={onReset}
            className="text-xs px-3 py-1.5 rounded bg-[#191c1e] hover:bg-[#272a2c] text-[#c3c6d7] border border-[#1E293B] transition flex items-center gap-1.5"
            title="Reset to Screen 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
