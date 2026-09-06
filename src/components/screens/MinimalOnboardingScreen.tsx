import React, { useState } from 'react';
import { Sparkles, Mic, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../services/i18n';
import { VoiceService } from '../../services/VoiceService';
import { ArtisanProfile } from '../../types';
import { AuthService } from '../../services/AuthService';

interface MinimalOnboardingScreenProps {
  phone: string;
  onComplete: (profile: ArtisanProfile) => void;
}

export const MinimalOnboardingScreen: React.FC<MinimalOnboardingScreenProps> = ({
  phone,
  onComplete,
}) => {
  const { t, currentLanguage, languageConfig } = useLanguage();
  const [name, setName] = useState('Lakshmi Devi');
  const [isListeningName, setIsListeningName] = useState(false);
  const [selectedCraft, setSelectedCraft] = useState<string>('Handloom Ikat / Pochampally');

  const craftOptions = [
    t('auth.onboardingCraftOption1'),
    t('auth.onboardingCraftOption2'),
    t('auth.onboardingCraftOption3'),
    t('auth.onboardingCraftOption4'),
    t('auth.onboardingCraftOption5'),
  ];

  const handleVoiceName = () => {
    setIsListeningName(true);
    VoiceService.listen(
      currentLanguage,
      (res) => {
        if (res.transcript) setName(res.transcript);
        if (res.isFinal) setIsListeningName(false);
      },
      () => setIsListeningName(false),
      () => setIsListeningName(false)
    );
  };

  const handleProceed = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanName = name.trim() || 'Master Artisan';
    const initial = cleanName.charAt(0).toUpperCase();

    const newProfile: ArtisanProfile = {
      id: `artisan-${Date.now().toString().slice(-6)}`,
      name: cleanName,
      initial,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      title: `${selectedCraft} Artisan`,
      location: 'Telangana',
      language: `${languageConfig.native} (${languageConfig.name})`,
      teluguLanguage: 'భాష',
      phone,
      voiceFeedbackEnabled: true,
      craftSpecialization: selectedCraft,
      isNewUser: false,
      kycStatus: 'NOT_VERIFIED', // Intentionally NOT_VERIFIED per architecture
    };

    const registered = AuthService.registerNewUser(newProfile);
    onComplete(registered);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4.5 bg-[#101415] text-[#e0e3e5] overflow-y-auto select-none space-y-4">
      <div className="space-y-4 pt-1">
        {/* Welcome Header */}
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2563eb]/20 text-[#b4c5ff] border border-[#2563eb]/40 text-[10px] font-mono font-bold">
            <Sparkles className="w-3 h-3 text-[#b4c5ff]" />
            <span>{t('auth.onboardingTitle')}</span>
          </div>

          <h1 className="text-xl font-bold text-white tracking-tight">
            {t('auth.onboardingSubtitle')}
          </h1>
        </div>

        {/* Clear No-Aadhaar Assurance Card */}
        <div className="bg-[#191c1e] border border-[#2563eb]/30 rounded-xl p-3 flex items-start gap-2.5 shadow-sm">
          <ShieldCheck className="w-4 h-4 text-[#b4c5ff] shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="text-[11px] font-bold text-white leading-tight font-mono">
              {t('auth.noAadhaarNotice')}
            </p>
            <p className="text-[10px] text-[#8d90a0] leading-relaxed font-mono">
              Use phone login now. Complete optional seller verification whenever you request bank withdrawals.
            </p>
          </div>
        </div>

        <form onSubmit={handleProceed} className="space-y-4">
          {/* Field 1: Artisan Name / Shop Name */}
          <div className="bg-[#191c1e] rounded-xl p-3.5 border border-[#1E293B] shadow-sm space-y-2">
            <label className="block text-[11px] font-mono font-bold text-[#8d90a0] uppercase tracking-wider">
              {t('auth.onboardingNameLabel')}
            </label>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('auth.onboardingNamePlaceholder')}
                className="flex-1 text-sm font-bold text-white bg-[#101415] px-3 py-2.5 rounded-lg border border-[#1E293B] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
              />

              <button
                type="button"
                onClick={handleVoiceName}
                className={`p-2.5 rounded-lg border transition shrink-0 ${
                  isListeningName
                    ? 'bg-[#2563eb] text-white border-[#b4c5ff] animate-pulse shadow-glow-blue'
                    : 'bg-[#101415] text-[#b4c5ff] border-[#1E293B] hover:bg-[#272a2c]'
                }`}
                title={t('common.tapToSpeak')}
              >
                <Mic className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Field 2: Craft Specialization */}
          <div className="bg-[#191c1e] rounded-xl p-3.5 border border-[#1E293B] shadow-sm space-y-2">
            <div>
              <label className="block text-[11px] font-mono font-bold text-[#8d90a0] uppercase tracking-wider">
                {t('auth.onboardingCraftLabel')}
              </label>
              <span className="text-[10px] text-[#8d90a0] font-mono">
                {t('auth.onboardingCraftHint')}
              </span>
            </div>

            <div className="space-y-1.5 pt-1 font-mono">
              {craftOptions.map((craft) => {
                const isSelected = selectedCraft === craft;
                return (
                  <button
                    key={craft}
                    type="button"
                    onClick={() => setSelectedCraft(craft)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-between transition border ${
                      isSelected
                        ? 'bg-[#2563eb]/20 border-[#2563eb] text-[#b4c5ff] font-bold shadow-glow-blue'
                        : 'bg-[#101415] border-[#1E293B] text-[#c3c6d7] hover:bg-[#1d2022]'
                    }`}
                  >
                    <span>{craft}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#b4c5ff]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </form>
      </div>

      {/* Primary Proceed Button */}
      <div className="pt-2 font-mono">
        <button
          onClick={() => handleProceed()}
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-glow-blue active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-[#b4c5ff]/30"
        >
          <span>{t('auth.onboardingProceedBtn')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
