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
    <div className="flex-1 flex flex-col justify-between p-5 bg-artisan-bg text-artisan-text select-none overflow-y-auto">
      <div className="space-y-4 pt-1">
        {/* Top Back Nav & Expiry Badge */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-2xl bg-white border border-artisan-border flex items-center justify-center text-artisan-text hover:bg-neutral-50 transition shadow-soft"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div
            className={`flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${
              expirySeconds > 30
                ? 'bg-white text-artisan-muted border-artisan-border'
                : 'bg-red-50 text-red-600 border-red-200 animate-pulse'
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
          <h2 className="text-xl font-extrabold text-artisan-text tracking-tight flex items-center gap-2">
            <span>{t('auth.enterOtpTitle')}</span>
          </h2>
          <p className="text-xs text-artisan-muted leading-relaxed">
            {t('auth.enterOtpSubtitle')}{' '}
            <span className="font-bold text-artisan-text">{phone}</span>
          </p>
        </div>

        {/* Error Alert if any */}
        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-xl text-xs flex items-center gap-2 animate-fadeIn">
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

          {/* Auto-detected indicator */}
          {autoDetected && (
            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs font-semibold text-forest">
              <CheckCircle2 className="w-4 h-4" />
              <span>{t('auth.otpAutoDetected')}</span>
            </div>
          )}
        </div>

        {/* Resend OTP button with cooldown */}
        <div className="text-center pt-0.5">
          <button
            onClick={handleResend}
            disabled={cooldownSeconds > 0}
            className={`inline-flex items-center gap-1.5 text-xs font-bold transition px-3 py-1.5 rounded-full border ${
              cooldownSeconds > 0
                ? 'text-neutral-400 bg-neutral-100 border-neutral-200 cursor-not-allowed'
                : 'text-terracotta bg-terracotta/10 border-terracotta/20 hover:bg-terracotta/20 active:scale-95'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${cooldownSeconds > 0 ? '' : 'text-terracotta'}`} />
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
          className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm shadow-craft active:scale-[0.99] transition-all flex items-center justify-center gap-2 ${
            isComplete
              ? 'bg-terracotta hover:bg-terracotta-hover text-white'
              : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          }`}
        >
          {t('auth.verifyOtpBtn')}
        </button>

        {/* Custom Accessible Numeric Keypad */}
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
