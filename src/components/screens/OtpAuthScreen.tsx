import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Delete } from 'lucide-react';

interface OtpAuthScreenProps {
  onBack: () => void;
  onVerify: () => void;
  phone?: string;
}

export const OtpAuthScreen: React.FC<OtpAuthScreenProps> = ({
  onBack,
  onVerify,
  phone = '+91 98480 22338',
}) => {
  const [otp, setOtp] = useState<string[]>(['4', '2', '8', '']);
  const [autoDetected, setAutoDetected] = useState(true);

  // Allow keypad typing
  const handleDigitPress = (digit: string) => {
    const nextIndex = otp.findIndex((val) => val === '');
    if (nextIndex !== -1) {
      const newOtp = [...otp];
      newOtp[nextIndex] = digit;
      setOtp(newOtp);
    }
  };

  const handleBackspace = () => {
    const lastFilledIndex = [...otp].reverse().findIndex((val) => val !== '');
    if (lastFilledIndex !== -1) {
      const targetIndex = 3 - lastFilledIndex;
      const newOtp = [...otp];
      newOtp[targetIndex] = '';
      setOtp(newOtp);
      setAutoDetected(false);
    }
  };

  const isComplete = otp.every((val) => val !== '');

  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-artisan-bg select-none">
      <div className="space-y-5">
        {/* Top Back Nav */}
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-artisan-border flex items-center justify-center text-artisan-text hover:bg-neutral-100 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        {/* Title & Phone Info */}
        <div className="space-y-1.5">
          <h2 className="text-2xl font-extrabold text-artisan-text tracking-tight flex items-center gap-2">
            <span>Sign In / లాగిన్</span>
          </h2>
          <p className="text-xs text-artisan-muted leading-relaxed">
            We sent a 4-digit code to your phone{' '}
            <span className="font-semibold text-artisan-text">{phone}</span>
          </p>
        </div>

        {/* OTP Input Boxes */}
        <div className="py-2">
          <div className="flex items-center justify-center gap-3">
            {otp.map((digit, idx) => (
              <div
                key={idx}
                className={`w-14 h-16 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold transition-all ${
                  digit
                    ? 'border-terracotta bg-white text-artisan-text shadow-sm'
                    : 'border-artisan-border bg-white/70 text-neutral-400'
                }`}
              >
                {digit}
              </div>
            ))}
          </div>

          {/* OTP Auto-detected Indicator */}
          {autoDetected && (
            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs font-semibold text-forest">
              <CheckCircle2 className="w-4 h-4" />
              <span>OTP Auto-detected</span>
            </div>
          )}
        </div>
      </div>

      {/* Numeric Keypad & Primary Button */}
      <div className="space-y-4 pt-2">
        <button
          onClick={onVerify}
          className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-3.5 px-4 rounded-2xl font-bold text-sm shadow-craft active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          Verify & Proceed
        </button>

        {/* Custom Numeric Keypad */}
        <div className="bg-white/80 rounded-3xl p-3 border border-artisan-border shadow-soft grid grid-cols-3 gap-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleDigitPress(num)}
              className="h-12 rounded-xl bg-white hover:bg-[#FAF7F2] active:bg-terracotta/10 text-lg font-bold text-artisan-text shadow-sm border border-neutral-100 flex items-center justify-center transition"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleDigitPress('0')}
            className="h-12 rounded-xl bg-white hover:bg-[#FAF7F2] active:bg-terracotta/10 text-lg font-bold text-artisan-text shadow-sm border border-neutral-100 flex items-center justify-center transition"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="h-12 rounded-xl bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-artisan-text flex items-center justify-center transition"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
