import React, { useState } from 'react';
import { Mic, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { LANGUAGES } from '../../data/mockData';
import { VoiceModal } from '../common/VoiceModal';

interface LanguageSelectScreenProps {
  onContinue: (langId: string) => void;
}

export const LanguageSelectScreen: React.FC<LanguageSelectScreenProps> = ({ onContinue }) => {
  const [selectedLang, setSelectedLang] = useState('te');
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  const activeLangObj = LANGUAGES.find((l) => l.id === selectedLang) || LANGUAGES[0];

  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-artisan-bg overflow-y-auto">
      {/* Header Section */}
      <div className="space-y-6 pt-2">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-artisan-text tracking-tight">
              Namaste & Welcome
            </span>
            <span className="text-xl">🙏</span>
          </div>
          <p className="text-xs text-artisan-muted leading-relaxed">
            Please choose your language to start setting up your shop.
          </p>
        </div>

        {/* Language Options List */}
        <div className="space-y-2.5">
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 text-left ${
                  isSelected
                    ? 'border-terracotta bg-[#FFF8F5] shadow-craft'
                    : 'border-artisan-border bg-white hover:border-neutral-300'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="text-base font-bold text-artisan-text">
                    {lang.native}
                  </div>
                  <div className="text-xs text-artisan-muted">{lang.name}</div>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-terracotta bg-terracotta text-white'
                        : 'border-neutral-300 bg-neutral-50'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </button>
            );
          })}

          {/* More Languages link */}
          <button className="w-full py-2.5 px-3 text-center text-xs font-semibold text-terracotta hover:underline">
            + More Languages / और भाषाएं
          </button>
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
              Prefer to speak instead of type?
            </h4>
            <p className="text-[11px] text-artisan-muted">
              Tap the mic anytime.
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-terracotta transition" />
        </div>
      </div>

      {/* Bottom Sticky Action */}
      <div className="pt-6 pb-2">
        <button
          onClick={() => onContinue(selectedLang)}
          className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-3.5 px-4 rounded-2xl font-bold text-sm shadow-craft active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <span>Continue in {activeLangObj.name}</span>
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
