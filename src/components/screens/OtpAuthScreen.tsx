import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Delete, RefreshCw, AlertCircle, Clock } from 'lucide-react';
import { useLanguage } from '../../services/i18n';
import { AuthService } from '../../services/AuthService';
import { ArtisanProfile } from '../../types';

interface OtpAuthScreenProps {
  onBack: () => void;
  onVerifySuccess: (isNewUser: boolean, profile?: ArtisanProfile, phone?: string) => void;
  phone?: string;
}

export const OtpAuthScreen: React.FC<OtpAuthScreenProps> = ({
  onBack,
  onVerifySuccess,
  phone = '+91 98480 22338',
}) => {
  const { t } = useLanguage();
  const [otp, setOtp] = useState<string[]>(['4', '2', '8', '']);
  const [autoDetected, setAutoDetected] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Expiry (120s) and Resend Cooldown (45s) counters
  const [expirySeconds, setExpirySeconds] = useState(() => AuthService.getRemainingExpiry(phone));
  const [cooldownSeconds, setCooldownSeconds] = useState(() => AuthService.getRemainingCooldown(phone));

  useEffect(() => {
    const timer = setInterval(() => {
      setExpirySeconds((prev) => (prev > 0 ? prev - 1 : 0));
      setCooldownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Keypad input
  const handleDigitPress = (digit: string) => {
    setErrorMessage(null);
    const nextIndex = otp.findIndex((val) => val === '');
    if (nextIndex !== -1) {
      const newOtp = [...otp];
      newOtp[nextIndex] = digit;
      setOtp(newOtp);
    }
  };

  const handleBackspace = () => {
    setErrorMessage(null);
    const lastFilledIndex = [...otp].reverse().findIndex((val) => val !== '');
    if (lastFilledIndex !== -1) {
      const targetIndex = 3 - lastFilledIndex;
      const newOtp = [...otp];
      newOtp[targetIndex] = '';
      setOtp(newOtp);
      setAutoDetected(false);
    }
  };


  const handleResend = () => {
    if (cooldownSeconds > 0) return;
    setErrorMessage(null);
    const result = AuthService.sendOtp(phone);
    if (result.success) {
      setExpirySeconds(120);
      setCooldownSeconds(result.cooldownSeconds);
      setOtp(['', '', '', '']);
      setAutoDetected(false);
    } else {
      setErrorMessage(result.errorKey ? t(`auth.${result.errorKey}` as any) : 'Could not resend code.');
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 4) {
      setErrorMessage(t('auth.invalidOtpError'));
      return;
    }

    if (expirySeconds === 0) {
      setErrorMessage(t('auth.expiredOtpError'));
      return;
    }

    const res = AuthService.verifyOtp(phone, code);
    if (res.success) {
      onVerifySuccess(res.isNewUser, res.profile, phone);
    } else {
      setErrorMessage(res.errorKey ? t(`auth.${res.errorKey}` as any) : t('auth.invalidOtpError'));
    }
  };

  const isComplete = otp.every((val) => val !== '');

  return (
    <div className="flex-1 flex flex-col justify-between p-4.5 bg-[#101415] text-[#e0e3e5] select-none overflow-y-auto">
      <div className="space-y-4 pt-1">
        {/* Top Back Nav & Expiry Badge */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-[#191c1e] border border-[#1E293B] flex items-center justify-center text-[#e0e3e5] hover:bg-[#272a2c] transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div
            className={`flex items-center gap-1.5 text-[11px] font-mono font-bold px-2.5 py-1 rounded border ${
              expirySeconds > 30
                ? 'bg-[#191c1e] text-[#b4c5ff] border-[#2563eb]/40'
                : 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/40 animate-pulse'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>
              {expirySeconds > 0
                ? t('auth.expiresIn', { time: formatTime(expirySeconds) })
                : t('auth.expiredOtpError')}
            </span>
          </div>
        </div>

        {/* Title & Phone Info */}
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>{t('auth.enterOtpTitle')}</span>
          </h2>
          <p className="text-xs text-[#8d90a0] leading-relaxed font-mono">
            {t('auth.enterOtpSubtitle')}{' '}
            <span className="font-bold text-[#b4c5ff]">{phone}</span>
          </p>
        </div>

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="bg-[#EF4444]/10 border border-[#EF4444]/40 text-[#EF4444] px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* OTP Input Boxes */}
        <div className="py-2">
          <div className="flex items-center justify-center gap-3">
            {otp.map((digit, idx) => (
              <div
                key={idx}
                className={`w-14 h-16 rounded-xl border flex items-center justify-center text-2xl font-mono font-bold transition-all ${
                  digit
                    ? 'border-[#2563eb] bg-[#1d2022] text-white shadow-glow-blue ring-1 ring-[#2563eb]/50'
                    : 'border-[#1E293B] bg-[#191c1e] text-[#434655]'
                }`}
              >
                {digit}
              </div>
            ))}
          </div>

          {/* Auto-detected indicator */}
          {autoDetected && (
            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs font-mono font-semibold text-[#22C55E]">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('auth.otpAutoDetected')}</span>
            </div>
          )}
        </div>

        {/* Resend OTP button with cooldown */}
        <div className="text-center pt-0.5 font-mono">
          <button
            onClick={handleResend}
            disabled={cooldownSeconds > 0}
            className={`inline-flex items-center gap-1.5 text-xs font-bold transition px-3 py-1.5 rounded-lg border ${
              cooldownSeconds > 0
                ? 'text-[#434655] bg-[#191c1e] border-[#1E293B] cursor-not-allowed'
                : 'text-[#b4c5ff] bg-[#2563eb]/20 border-[#2563eb]/40 hover:bg-[#2563eb]/30 active:scale-95'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${cooldownSeconds > 0 ? '' : 'text-[#b4c5ff]'}`} />
            <span>
              {cooldownSeconds > 0
                ? t('auth.resendCooldown', { seconds: cooldownSeconds })
                : t('auth.resendOtpBtn')}
            </span>
          </button>
        </div>
      </div>

      {/* Numeric Keypad & Primary Button */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleVerify}
          disabled={!isComplete}
          className={`w-full py-3 px-4 rounded-xl font-mono font-bold text-sm shadow-glow-blue active:scale-[0.99] transition-all flex items-center justify-center gap-2 border ${
            isComplete
              ? 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white border-[#b4c5ff]/30'
              : 'bg-[#191c1e] text-[#434655] border-[#1E293B] cursor-not-allowed'
          }`}
        >
          {t('auth.verifyOtpBtn')}
        </button>

        {/* Custom Accessible Numeric Keypad */}
        <div className="bg-[#191c1e] rounded-2xl p-2.5 border border-[#1E293B] shadow-sm grid grid-cols-3 gap-2 font-mono">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleDigitPress(num)}
              className="h-11 rounded-lg bg-[#101415] hover:bg-[#272a2c] active:bg-[#2563eb]/20 text-lg font-bold text-white border border-[#1E293B] flex items-center justify-center transition"
            >
              {num}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleDigitPress('0')}
            className="h-11 rounded-lg bg-[#101415] hover:bg-[#272a2c] active:bg-[#2563eb]/20 text-lg font-bold text-white border border-[#1E293B] flex items-center justify-center transition"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="h-11 rounded-lg bg-[#101415] hover:bg-[#272a2c] active:bg-[#2563eb]/20 text-[#c3c6d7] border border-[#1E293B] flex items-center justify-center transition"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
