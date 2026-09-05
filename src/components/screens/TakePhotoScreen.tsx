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
    <div className="flex-1 flex flex-col justify-between bg-black text-white relative overflow-hidden select-none">
      {/* Top Header Bar */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between z-20 bg-gradient-to-b from-black/80 to-transparent">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <h2 className="text-sm font-bold tracking-tight">Take a Product Photo</h2>
          <span className="text-[11px] text-neutral-300 font-medium">1 of 6</span>
        </div>

        <button
          onClick={() => setFlashOn(!flashOn)}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
            flashOn ? 'bg-amber-400 text-black' : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          {flashOn ? <Zap className="w-4 h-4 fill-current" /> : <ZapOff className="w-4 h-4" />}
        </button>
      </div>

      {/* Simulated Camera Viewfinder */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* Background Craft Image Simulation */}
        <img
          src="/assets/indigo_cushion.jpg"
          alt="Product in Viewfinder"
          className="absolute inset-0 w-full h-full object-cover filter brightness-95"
        />

        {/* Viewfinder Target Framing Box */}
        <div className="relative w-[280px] h-[340px] border-2 border-white/60 rounded-3xl flex flex-col items-center justify-between p-4 shadow-2xl backdrop-blur-[1px]">
          {/* Corner Guides */}
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-xl" />
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-xl" />
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-xl" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-xl" />

          <div className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-white/90 border border-white/20">
            Center your product here
          </div>

          {/* Golden Sunlight Guidance Tip */}
          <div className="bg-black/65 backdrop-blur-md px-3.5 py-1.5 rounded-2xl text-[11px] font-medium text-amber-200 border border-amber-300/30 text-center shadow-lg">
            Keep the cushion cover flat in warm sunlight.
          </div>
        </div>
      </div>

      {/* Bottom Camera Controls */}
      <div className="px-6 py-6 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-around z-20">
        {/* Gallery picker */}
        <button
          onClick={onCapture}
          className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        {/* Big Shutter Button */}
        <button
          onClick={handleShutter}
          className={`w-18 h-18 rounded-full border-4 border-white p-1 flex items-center justify-center transition-all ${
            isShutterPressed ? 'scale-90 bg-white/40' : 'hover:scale-105 active:scale-95'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center" />
        </button>

        {/* Camera Flip / Reset */}
        <button
          className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
