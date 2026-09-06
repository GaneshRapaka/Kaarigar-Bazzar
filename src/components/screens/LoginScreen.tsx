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
    <div className="flex-1 flex flex-col justify-between p-4.5 bg-[#101415] text-[#e0e3e5] overflow-y-auto select-none space-y-4">
      <div className="space-y-4 pt-1">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl bg-[#191c1e] border border-[#1E293B] flex items-center justify-center text-[#e0e3e5] hover:bg-[#272a2c] transition shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-bold text-[#b4c5ff] bg-[#2563eb]/20 px-2.5 py-0.5 rounded border border-[#2563eb]/30">
            {languageConfig.native}
          </span>
        </div>

        {/* Brand Banner */}
        <div className="space-y-1.5 pt-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2563eb]/10 text-[#b4c5ff] border border-[#2563eb]/30 text-[10px] font-mono font-bold">
            <span>🙏</span>
            <span>Kaarigar Bazaar • Telangana</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            {t('login.title')}
          </h1>
          <p className="text-xs text-[#8d90a0] leading-relaxed font-mono">
            {t('login.subtitle')}
          </p>
        </div>

        {/* Phone Input Box */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono font-bold text-[#8d90a0] uppercase tracking-wider block">
              {t('login.phoneLabel')}
            </label>

            <div className="bg-[#191c1e] rounded-xl border border-[#1E293B] focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/30 p-2.5 shadow-sm flex items-center gap-2 transition-colors">
              {/* Flag & Country Code */}
              <div className="flex items-center gap-1.5 pr-2.5 border-r border-[#1E293B] text-xs font-mono font-bold text-[#b4c5ff]">
                <span className="text-base">🇮🇳</span>
                <span>+91</span>
              </div>

              {/* Number Input */}
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="98480 22338"
                className="flex-1 text-base font-mono font-bold text-white focus:outline-none bg-transparent tracking-wide placeholder:text-[#434655]"
                maxLength={11}
              />

              {/* Voice Speak Button */}
              <button
                type="button"
                onClick={handleVoicePhone}
                className={`p-2 rounded-lg transition ${
                  isListening
                    ? 'bg-[#2563eb] text-white animate-pulse shadow-glow-blue'
                    : 'bg-[#101415] hover:bg-[#272a2c] text-[#8d90a0] border border-[#1E293B]'
                }`}
                title={t('login.speakPhone')}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
            {isListening && (
              <p className="text-[11px] text-[#b4c5ff] font-mono font-semibold animate-pulse pl-1">
                Listening for 10-digit number...
              </p>
            )}
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-3 px-4 rounded-xl font-mono font-bold text-sm shadow-glow-blue transition-all flex items-center justify-center gap-2 border ${
              isValid
                ? 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white active:scale-[0.99] border-[#b4c5ff]/30'
                : 'bg-[#191c1e] text-[#434655] border-[#1E293B] cursor-not-allowed'
            }`}
          >
            <span>{t('login.sendOtpBtn')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative py-1 flex items-center justify-center">
          <div className="w-full border-t border-[#1E293B]" />
          <span className="bg-[#101415] px-3 text-[11px] font-mono font-bold text-[#8d90a0] uppercase tracking-wider absolute">
            {t('common.or')}
          </span>
        </div>

        {/* One-Tap WhatsApp Sign In Button */}
        <button
          onClick={() => onDirectLogin ? onDirectLogin(selectedRole) : onSendOtp(`+91 ${phone}`)}
          className="w-full bg-[#191c1e] hover:bg-[#1f2429] text-[#22C55E] border border-[#22C55E]/40 py-3 px-4 rounded-xl font-mono font-bold text-xs shadow-sm active:scale-[0.99] transition flex items-center justify-center gap-2"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span>{t('login.whatsappLoginBtn')}</span>
        </button>
      </div>

      {/* Footer Trust & Protection Badge */}
      <div className="pt-2 pb-1 text-center space-y-1">
        <div className="flex items-center justify-center gap-1.5 text-[#22C55E] text-[11px] font-mono font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>Verified Government Handicrafts Portal</span>
        </div>
        <p className="text-[10px] text-[#8d90a0] font-mono">
          {t('login.termsNotice')}
        </p>
      </div>
    </div>
  );
};
