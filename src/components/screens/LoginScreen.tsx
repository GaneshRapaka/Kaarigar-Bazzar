import React, { useState } from 'react';
import {
  ArrowLeft,
  MessageSquare,
  Mic,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../../services/i18n';
import { VoiceService } from '../../services/VoiceService';

interface LoginScreenProps {
  onBack: () => void;
  onSendOtp: (phoneNumber: string) => void;
  onDirectLogin?: (role: 'artisan' | 'helper') => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onBack,
  onSendOtp,
  onDirectLogin,
}) => {
  const { currentLanguage, languageConfig, t } = useLanguage();

  const [phone, setPhone] = useState('98480 22338');
  const [isListening, setIsListening] = useState(false);
  const selectedRole: 'artisan' | 'helper' = 'artisan';

  const cleanPhone = phone.replace(/\D/g, '');
  const isValid = cleanPhone.length === 10;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    // Format nicely as 5 digits + space + 5 digits
    if (val.length > 5) {
      setPhone(`${val.slice(0, 5)} ${val.slice(5)}`);
    } else {
      setPhone(val);
    }
  };

  const handleVoicePhone = () => {
    setIsListening(true);
    VoiceService.listen(
      currentLanguage,
      (result) => {
        const digits = result.transcript.replace(/\D/g, '').slice(0, 10);
        if (digits) {
          if (digits.length > 5) {
            setPhone(`${digits.slice(0, 5)} ${digits.slice(5)}`);
          } else {
            setPhone(digits);
          }
        }
        if (result.isFinal) {
          setIsListening(false);
        }
      },
      () => setIsListening(false),
      () => setIsListening(false)
    );
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isValid) {
      onSendOtp(`+91 ${phone}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-artisan-bg overflow-y-auto select-none space-y-4">
      <div className="space-y-4 pt-1">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-2xl bg-white border border-artisan-border flex items-center justify-center text-artisan-text hover:bg-neutral-50 transition shadow-soft"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-bold text-terracotta bg-terracotta/10 px-2.5 py-1 rounded-full border border-terracotta/20">
            {languageConfig.native}
          </span>
        </div>

        {/* Brand Banner */}
        <div className="space-y-1.5 pt-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-terracotta/10 text-terracotta text-[10px] font-bold">
            <span>🙏</span>
            <span>Kaarigar Bazaar • Telangana</span>
          </div>
          <h1 className="text-2xl font-extrabold text-artisan-text tracking-tight">
            {t('login.title')}
          </h1>
          <p className="text-xs text-artisan-muted leading-relaxed">
            {t('login.subtitle')}
          </p>
        </div>

        {/* Phone Input Box */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-artisan-muted uppercase tracking-wider block">
              {t('login.phoneLabel')}
            </label>

            <div className="bg-white rounded-2xl border border-artisan-border focus-within:border-terracotta focus-within:ring-2 focus-within:ring-terracotta/20 p-3 shadow-soft flex items-center gap-2 transition-colors">
              {/* Flag & Country Code */}
              <div className="flex items-center gap-1.5 pr-2.5 border-r border-artisan-border text-xs font-bold text-artisan-text">
                <span className="text-base">🇮🇳</span>
                <span>+91</span>
              </div>

              {/* Number Input */}
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="98480 22338"
                className="flex-1 text-base font-bold text-artisan-text focus:outline-none bg-transparent tracking-wide placeholder:text-artisan-muted/40"
                maxLength={11}
              />

              {/* Voice Speak Button */}
              <button
                type="button"
                onClick={handleVoicePhone}
                className={`p-2 rounded-xl transition ${
                  isListening
                    ? 'bg-terracotta text-white animate-pulse'
                    : 'bg-artisan-bg hover:bg-neutral-200 text-artisan-muted'
                }`}
                title={t('login.speakPhone')}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
            {isListening && (
              <p className="text-[11px] text-terracotta font-semibold animate-pulse pl-1">
                Listening for 10-digit number...
              </p>
            )}
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm shadow-craft transition-all flex items-center justify-center gap-2 ${
              isValid
                ? 'bg-terracotta hover:bg-terracotta-hover text-white active:scale-[0.99]'
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
            }`}
          >
            <span>{t('login.sendOtpBtn')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative py-1 flex items-center justify-center">
          <div className="w-full border-t border-artisan-border" />
          <span className="bg-artisan-bg px-3 text-[11px] font-bold text-artisan-muted uppercase tracking-wider absolute">
            {t('common.or')}
          </span>
        </div>

        {/* One-Tap WhatsApp Sign In Button */}
        <button
          onClick={() => onDirectLogin ? onDirectLogin(selectedRole) : onSendOtp(`+91 ${phone}`)}
          className="w-full bg-white hover:bg-neutral-50 text-[#25D366] border border-[#25D366]/40 py-3.5 px-4 rounded-2xl font-bold text-xs shadow-soft active:scale-[0.99] transition flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>{t('login.whatsappLoginBtn')}</span>
        </button>
      </div>

      {/* Footer Trust & Protection Badge */}
      <div className="pt-2 pb-1 text-center space-y-1">
        <div className="flex items-center justify-center gap-1.5 text-forest text-[11px] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>Verified Government Handicrafts Portal</span>
        </div>
        <p className="text-[10px] text-artisan-muted">
          {t('login.termsNotice')}
        </p>
      </div>
    </div>
  );
};
