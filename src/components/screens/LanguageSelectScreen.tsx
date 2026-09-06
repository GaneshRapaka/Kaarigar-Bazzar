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
    <div className="flex-1 flex flex-col justify-between p-4.5 bg-[#101415] text-[#e0e3e5] overflow-y-auto">
      {/* Header Section */}
      <div className="space-y-4 pt-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-tight">
              Namaste & Welcome
            </span>
            <span className="text-xl">🙏</span>
          </div>
          <p className="text-xs text-[#8d90a0] leading-relaxed">
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
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200 text-left ${
                  isSelected
                    ? 'border-[#2563eb] bg-[#1d2022] shadow-glow-blue ring-1 ring-[#2563eb]/50'
                    : 'border-[#1E293B] bg-[#191c1e] hover:border-[#434655]'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="text-base font-bold text-white font-sans">
                    {lang.native}
                  </div>
                  <div className="flex items-center gap-1.5 font-mono">
                    <span className="text-xs text-[#8d90a0]">{lang.name}</span>
                    <span className="text-[9px] text-[#b4c5ff] bg-[#2563eb]/20 px-1.5 py-0.5 rounded border border-[#2563eb]/30">
                      {lang.badge}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-[#2563eb] bg-[#2563eb] text-white shadow-glow-blue'
                        : 'border-[#434655] bg-[#101415]'
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
          className="bg-[#191c1e] rounded-xl p-3 border border-[#1E293B] flex items-center gap-3 cursor-pointer hover:border-[#2563eb]/50 transition shadow-sm group"
        >
          <div className="w-9 h-9 rounded-lg bg-[#2563eb]/20 border border-[#2563eb]/40 flex items-center justify-center text-[#b4c5ff] group-hover:scale-105 transition">
            <Mic className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-white">
              Prefer speaking over typing?
            </h4>
            <p className="text-[11px] text-[#8d90a0] font-mono">
              Tap to speak in {activeLangObj.native} anytime.
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8d90a0] group-hover:text-[#b4c5ff] transition" />
        </div>
      </div>

      {/* Bottom Sticky Action */}
      <div className="pt-4 pb-1">
        <button
          onClick={handleProceed}
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 px-4 rounded-xl font-bold text-sm shadow-glow-blue active:scale-[0.99] transition-all flex items-center justify-center gap-2 border border-[#b4c5ff]/20"
        >
          <span>{t('common.continue')} in {activeLangObj.name}</span>
          <span className="text-sm font-semibold text-[#b4c5ff]">({activeLangObj.native})</span>
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
