import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

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
      <div className="w-full max-w-md mx-auto min-h-screen bg-[#101415] text-[#e0e3e5] flex flex-col shadow-2xl relative overflow-hidden border-x border-[#1E293B]">
        {/* Status Bar */}
        <div className="bg-[#191c1e]/95 backdrop-blur-md px-6 pt-3 pb-2 flex items-center justify-between text-xs font-mono text-[#c3c6d7] border-b border-[#1E293B] z-40 sticky top-0">
          <span className="font-semibold tracking-wider text-[12px] text-[#b4c5ff]">{currentTime}</span>
          <div className="flex items-center gap-2 text-xs">
            <Signal className="w-3.5 h-3.5 text-[#b4c5ff]" />
            <Wifi className="w-3.5 h-3.5 text-[#b4c5ff]" />
            <Battery className="w-4 h-4 fill-[#b4c5ff] text-[#b4c5ff]" />
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden relative bg-[#101415]">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto my-3 transition-all duration-300">
      {/* Phone Outer Shell */}
      <div className="w-[392px] h-[840px] max-h-[94vh] bg-[#0c0f10] rounded-[52px] p-[10px] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(180,197,255,0.15),inset_0_0_6px_rgba(255,255,255,0.1)] flex flex-col relative">
        {/* Outer Phone Bezel Buttons */}
        <div className="absolute -left-[13px] top-[115px] w-[3px] h-[26px] bg-[#22272e] rounded-l-sm border-l border-white/10" />
        <div className="absolute -left-[13px] top-[155px] w-[3px] h-[48px] bg-[#22272e] rounded-l-sm border-l border-white/10" />
        <div className="absolute -left-[13px] top-[215px] w-[3px] h-[48px] bg-[#22272e] rounded-l-sm border-l border-white/10" />
        <div className="absolute -right-[13px] top-[165px] w-[3px] h-[64px] bg-[#22272e] rounded-r-sm border-r border-white/10" />

        {/* Screen Bezel & Display */}
        <div className="w-full h-full bg-[#101415] rounded-[42px] overflow-hidden flex flex-col relative border border-[#1E293B]">
          {/* iOS Dynamic Island & Status Bar */}
          <div className="bg-[#191c1e] shrink-0 px-6 pt-3 pb-2 flex items-center justify-between text-xs font-mono text-[#c3c6d7] z-40 relative select-none border-b border-[#1E293B]/60">
            <span className="font-bold tracking-tight text-[12px] pl-1 text-[#b4c5ff]">{currentTime}</span>
            {/* Dynamic Island Pill */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-[100px] h-[24px] bg-[#0b0f10] border border-[#1E293B] rounded-full flex items-center justify-center px-2.5 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-[#161a1d] ring-1 ring-[#1E293B] ml-auto mr-1.5" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-pulse mr-auto" />
            </div>
            {/* Right Icons */}
            <div className="flex items-center gap-1.5 text-xs text-[#c3c6d7] pr-1">
              <Signal className="w-3.5 h-3.5 stroke-[2] text-[#b4c5ff]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2] text-[#b4c5ff]" />
              <div className="flex items-center">
                <div className="w-5 h-2.5 border border-[#8d90a0] rounded-[3px] p-0.5 flex items-center">
                  <div className="w-full h-full bg-[#22C55E] rounded-[1px]" />
                </div>
                <div className="w-0.5 h-1 bg-[#8d90a0] rounded-r-[1px]" />
              </div>
            </div>
          </div>

          {/* Screen Body */}
          <div className="flex-1 flex flex-col overflow-hidden relative bg-[#101415] text-[#e0e3e5]">
            {children}
          </div>

          {/* Home Indicator Bar */}
          <div className="shrink-0 bg-[#101415] py-2 flex justify-center items-center z-40 select-none">
            <div className="w-32 h-1 bg-[#323537] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
