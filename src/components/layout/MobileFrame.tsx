import React from 'react';
import { Wifi, Battery, Signal, Sparkles } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  currentTime?: string;
  showDeviceFrame?: boolean;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  currentTime = '9:41',
  showDeviceFrame = true,
}) => {
  if (!showDeviceFrame) {
    return (
      <div className="w-full max-w-md mx-auto min-h-screen bg-artisan-bg flex flex-col shadow-2xl relative overflow-hidden">
        {/* Status Bar */}
        <div className="bg-white/90 backdrop-blur-sm px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold text-[#2B2521] border-b border-black/[0.04] z-40 sticky top-0">
          <span>{currentTime}</span>
          <div className="flex items-center gap-1.5 text-xs">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 fill-current" />
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto my-3 transition-all duration-300">
      {/* Phone Outer Shell */}
      <div className="w-[390px] h-[830px] max-h-[92vh] bg-[#1F1E1D] rounded-[50px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.12),inset_0_0_4px_rgba(255,255,255,0.2)] flex flex-col relative">
        {/* Outer Phone Bezel Buttons */}
        <div className="absolute -left-[13px] top-[115px] w-[3px] h-[26px] bg-[#3B3937] rounded-l-sm" />
        <div className="absolute -left-[13px] top-[155px] w-[3px] h-[48px] bg-[#3B3937] rounded-l-sm" />
        <div className="absolute -left-[13px] top-[215px] w-[3px] h-[48px] bg-[#3B3937] rounded-l-sm" />
        <div className="absolute -right-[13px] top-[165px] w-[3px] h-[64px] bg-[#3B3937] rounded-r-sm" />

        {/* Screen Bezel & Display */}
        <div className="w-full h-full bg-artisan-bg rounded-[40px] overflow-hidden flex flex-col relative border border-[#2E2B27]">
          {/* iOS Dynamic Island & Status Bar */}
          <div className="bg-[#FAF7F2] shrink-0 px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold text-[#2B2521] z-40 relative select-none">
            <span className="font-bold tracking-tight text-[13px] pl-1">{currentTime}</span>
            {/* Dynamic Island Pill */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-[96px] h-[24px] bg-black rounded-full flex items-center justify-center px-2 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-[#111] ring-1 ring-neutral-800 ml-auto mr-1" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse mr-auto" />
            </div>
            {/* Right Icons */}
            <div className="flex items-center gap-1.5 text-xs text-[#2B2521] pr-1">
              <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
              <div className="flex items-center">
                <div className="w-5 h-2.5 border border-[#2B2521] rounded-[3px] p-0.5 flex items-center">
                  <div className="w-full h-full bg-[#2B2521] rounded-[1px]" />
                </div>
                <div className="w-0.5 h-1 bg-[#2B2521] rounded-r-[1px]" />
              </div>
            </div>
          </div>

          {/* Screen Body */}
          <div className="flex-1 flex flex-col overflow-hidden relative bg-artisan-bg">
            {children}
          </div>

          {/* Home Indicator Bar */}
          <div className="shrink-0 bg-artisan-bg py-2 flex justify-center items-center z-40 select-none">
            <div className="w-32 h-1 bg-neutral-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
