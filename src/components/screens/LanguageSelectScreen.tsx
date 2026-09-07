import React, { useState } from 'react';
import { Mic, ChevronRight, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageCode } from '../../config/languages';
import { useLanguage } from '../../services/i18n';
import { VoiceModal } from '../common/VoiceModal';

interface LanguageSelectScreenProps {
  onContinue: (langId: string) => void;
}

export const LanguageSelectScreen: React.FC<LanguageSelectScreenProps> = ({ onContinue }) => {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<LanguageCode>(currentLanguage);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  const activeLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.id === selectedLang) || SUPPORTED_LANGUAGES[0];

  const handleSelect = (code: LanguageCode) => {
    setSelectedLang(code);
    setLanguage(code);
  };

  const handleProceed = () => {
    setLanguage(selectedLang);
    onContinue(selectedLang);
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-artisan-bg overflow-y-auto">
      {/* Header Section */}
      <div className="space-y-4 pt-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-artisan-text tracking-tight">
              Namaste & Welcome
            </span>
            <span className="text-xl">🙏</span>
          </div>
          <p className="text-xs text-artisan-muted leading-relaxed">
            Please choose your language. The entire app and voice assistant will adapt to your choice.
          </p>
        </div>

        {/* 8 Language Options Grid / List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[48vh] overflow-y-auto pr-0.5">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => handleSelect(lang.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 text-left ${
                  isSelected
                    ? 'border-terracotta bg-[#FFF8F5] shadow-craft ring-1 ring-terracotta/40'
                    : 'border-artisan-border bg-white hover:border-neutral-300'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="text-base font-bold text-artisan-text font-sans">
                    {lang.native}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-artisan-muted">{lang.name}</span>
                    <span className="text-[9px] text-terracotta bg-terracotta/10 px-1.5 py-0.5 rounded border border-terracotta/20 font-semibold">
                      {lang.badge}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-terracotta bg-terracotta text-white'
                        : 'border-neutral-300 bg-neutral-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Voice Assistant Mic Card */}
        <div
          onClick={() => setIsVoiceOpen(true)}
          className="bg-white rounded-2xl p-3.5 border border-artisan-border flex items-center gap-3 cursor-pointer hover:border-terracotta/40 hover:bg-[#FFFBF8] transition shadow-soft group"
        >
          <div className="w-10 h-10 rounded-full bg-mustard/15 flex items-center justify-center text-mustard group-hover:scale-105 transition">
            <Mic className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-artisan-text">
              Prefer speaking over typing?
            </h4>
            <p className="text-[11px] text-artisan-muted">
              Tap to speak in {activeLangObj.native} anytime.
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-terracotta transition" />
        </div>
      </div>

      {/* Bottom Sticky Action */}
      <div className="pt-4 pb-1">
        <button
          onClick={handleProceed}
          className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-3.5 px-4 rounded-2xl font-bold text-sm shadow-craft active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <span>{t('common.continue')} in {activeLangObj.name}</span>
          <span className="font-telugu text-sm">({activeLangObj.native})</span>
        </button>
      </div>

      <VoiceModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        language={activeLangObj.native + ' (' + activeLangObj.name + ')'}
        title="Kaarigar Assistant Setup"
      />
    </div>
  );
};
