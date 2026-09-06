import React, { useState } from 'react';
import { ArrowLeft, Zap, ZapOff, Image as ImageIcon, RefreshCw } from 'lucide-react';

interface TakePhotoScreenProps {
  onBack: () => void;
  onCapture: () => void;
}

export const TakePhotoScreen: React.FC<TakePhotoScreenProps> = ({ onBack, onCapture }) => {
  const [flashOn, setFlashOn] = useState(false);
  const [isShutterPressed, setIsShutterPressed] = useState(false);

  const handleShutter = () => {
    setIsShutterPressed(true);
    setTimeout(() => {
      setIsShutterPressed(false);
      onCapture();
    }, 300);
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#101415] text-[#e0e3e5] relative overflow-hidden select-none">
      {/* Top Header Bar */}
      <div className="px-4 pt-3 pb-2.5 flex items-center justify-between z-20 bg-[#101415]/90 backdrop-blur-md border-b border-[#1E293B]">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-[#191c1e] border border-[#1E293B] flex items-center justify-center text-white hover:bg-[#272a2c] transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center font-mono">
          <h2 className="text-sm font-bold text-white tracking-tight">Product Capture</h2>
          <span className="text-[10px] text-[#b4c5ff] bg-[#2563eb]/20 px-2 py-0.2 rounded border border-[#2563eb]/30">STEP 1 OF 6</span>
        </div>

        <button
          onClick={() => setFlashOn(!flashOn)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition border ${
            flashOn ? 'bg-[#FACC15] text-black border-[#FACC15]' : 'bg-[#191c1e] text-white border-[#1E293B] hover:bg-[#272a2c]'
          }`}
        >
          {flashOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
        </button>
      </div>

      {/* Simulated Camera Viewfinder */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-black">
        {/* Background Craft Image Simulation */}
        <img
          src="/assets/indigo_cushion.jpg"
          alt="Product in Viewfinder"
          className="absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-105"
        />

        {/* Viewfinder Target Framing Box */}
        <div className="relative w-[280px] h-[340px] border border-[#2563eb]/50 rounded-2xl flex flex-col items-center justify-between p-4 shadow-2xl backdrop-blur-[0.5px]">
          {/* Corner Guides */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-3 border-l-3 border-[#2563eb] rounded-tl-lg shadow-glow-blue" />
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-3 border-r-3 border-[#2563eb] rounded-tr-lg shadow-glow-blue" />
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-3 border-l-3 border-[#2563eb] rounded-bl-lg shadow-glow-blue" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-3 border-r-3 border-[#2563eb] rounded-br-lg shadow-glow-blue" />

          <div className="bg-[#101415]/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-[#b4c5ff] border border-[#2563eb]/30">
            CENTER OBJECT IN FRAME
          </div>

          {/* Guidance Tip */}
          <div className="bg-[#101415]/85 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-[11px] font-mono text-[#e0e3e5] border border-[#1E293B] text-center shadow-lg">
            Keep the textile flat under natural sunlight.
          </div>
        </div>
      </div>

      {/* Bottom Camera Controls */}
      <div className="px-6 py-4 bg-[#101415]/95 backdrop-blur-md border-t border-[#1E293B] flex items-center justify-around z-20">
        {/* Gallery picker */}
        <button
          onClick={onCapture}
          className="w-11 h-11 rounded-xl bg-[#191c1e] border border-[#1E293B] flex items-center justify-center text-[#b4c5ff] hover:bg-[#272a2c] transition shadow-sm"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        {/* Big Shutter Button */}
        <button
          onClick={handleShutter}
          className={`w-18 h-18 rounded-full border-4 border-[#2563eb] p-1 flex items-center justify-center transition-all shadow-glow-blue ${
            isShutterPressed ? 'scale-90 bg-[#2563eb]/40' : 'hover:scale-105 active:scale-95'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center" />
        </button>

        {/* Camera Flip / Reset */}
        <button
          className="w-11 h-11 rounded-xl bg-[#191c1e] border border-[#1E293B] flex items-center justify-center text-[#c3c6d7] hover:bg-[#272a2c] transition shadow-sm"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
