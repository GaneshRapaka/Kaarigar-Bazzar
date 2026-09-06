import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Mic, Edit3, ArrowRight, Languages } from 'lucide-react';
import { VoiceModal } from '../common/VoiceModal';
import { useLanguage } from '../../services/i18n';
import { ProductTranslationModal } from '../common/ProductTranslationModal';
import { ProductItem } from '../../types';

interface ReviewListingScreenProps {
  onBack: () => void;
  onProceed: () => void;
}

export const ReviewListingScreen: React.FC<ReviewListingScreenProps> = ({
  onBack,
  onProceed,
}) => {
  const { languageConfig, t } = useLanguage();
  const [title, setTitle] = useState(
    'Hand Block-Printed Cotton Cushion Cover – Indigo Floral'
  );
  const [story, setStory] = useState(
    'Beautifully handcrafted cushion cover featuring traditional block-prints from Telangana. Handprinted using pure natural indigo dyes on premium organic cotton. Features classic floral bootis designed to bring an artisan spirit to your living room.'
  );
  const [isEditingStory, setIsEditingStory] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isTranslationOpen, setIsTranslationOpen] = useState(false);

  // Temporary draft product representation for translation modal
  const draftProduct: ProductItem = {
    id: 'draft-temp',
    title,
    story,
    category: 'Home Décor • Regional Textiles',
    price: 620,
    status: 'draft',
    image: '/assets/indigo_cushion.jpg',
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-[#101415] text-[#e0e3e5] overflow-y-auto select-none space-y-3">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-1">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl bg-[#191c1e] border border-[#1E293B] flex items-center justify-center text-white hover:bg-[#272a2c] transition shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center font-mono">
          <h2 className="text-sm font-bold text-white tracking-tight">
            {t('listing.title')}
          </h2>
          <span className="text-[10px] text-[#b4c5ff] bg-[#2563eb]/20 px-2 py-0.2 rounded border border-[#2563eb]/30">
            STEP 4 OF 6
          </span>
        </div>

        <div className="w-9" />
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
        {/* Product Image Preview Card */}
        <div className="bg-[#191c1e] rounded-xl p-2.5 border border-[#1E293B] shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#1E293B] shrink-0">
              <img
                src="/assets/indigo_cushion.jpg"
                alt="Craft"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1 font-mono">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#2563eb]/20 text-[#b4c5ff] border border-[#2563eb]/40 text-[10px] font-bold">
                <Sparkles className="w-2.5 h-2.5 text-[#b4c5ff]" />
                <span>{t('listing.aiAssisted')}</span>
              </div>
              <p className="text-xs font-bold text-white line-clamp-2">
                Indigo Floral Cushion Cover
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTranslationOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#2563eb]/20 hover:bg-[#2563eb] text-[#b4c5ff] hover:text-white transition text-xs font-mono font-bold shrink-0 border border-[#2563eb]/40"
            title="Translate listing for buyers"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>Translate</span>
          </button>
        </div>

        {/* Field 1: Product Title */}
        <div className="bg-[#191c1e] rounded-xl p-3.5 border border-[#1E293B] shadow-sm space-y-1.5 font-mono">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-[#8d90a0] uppercase tracking-wider">
              {t('listing.craftTitleLabel')}
            </label>
            <span className="text-[10px] text-[#b4c5ff] font-semibold">
              {languageConfig.native}
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-xs font-bold text-white border-b border-[#1E293B] focus:border-[#2563eb] focus:outline-none py-1 bg-transparent"
          />
        </div>

        {/* Field 2: Story of the Craft */}
        <div className="bg-[#191c1e] rounded-xl p-3.5 border border-[#1E293B] shadow-sm space-y-2">
          <div className="flex items-center justify-between font-mono">
            <label className="text-[11px] font-bold text-[#8d90a0] uppercase tracking-wider">
              {t('listing.craftStoryLabel')}
            </label>
            <button
              onClick={() => setIsEditingStory(!isEditingStory)}
              className="text-[11px] font-semibold text-[#b4c5ff] hover:underline flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" />
              <span>{isEditingStory ? t('common.done') : t('common.tapToEdit')}</span>
            </button>
          </div>

          {isEditingStory ? (
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={4}
              className="w-full text-xs text-white border border-[#2563eb]/50 rounded-lg p-2.5 focus:outline-none leading-relaxed bg-[#101415] font-mono"
            />
          ) : (
            <p className="text-xs text-[#c3c6d7] leading-relaxed font-normal">
              {story}
            </p>
          )}

          {/* Speak to edit in your language */}
          <button
            onClick={() => setIsVoiceOpen(true)}
            className="w-full bg-[#101415] hover:bg-[#1d2022] border border-[#1E293B] hover:border-[#2563eb]/50 rounded-lg py-2 px-3 flex items-center justify-center gap-2 text-[#b4c5ff] text-xs font-mono font-bold transition group"
          >
            <div className="w-5 h-5 rounded-md bg-[#2563eb] text-white flex items-center justify-center group-hover:scale-110 transition shadow-glow-blue">
              <Mic className="w-3 h-3" />
            </div>
            <span>{t('listing.speakToEdit')} ({languageConfig.native})</span>
          </button>
        </div>

        {/* Recommended Category */}
        <div className="bg-[#191c1e] rounded-xl p-3.5 border border-[#1E293B] shadow-sm flex items-center justify-between font-mono">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-[#8d90a0] uppercase tracking-wider block">
              {t('listing.recommendedCategory')}
            </span>
            <span className="text-xs font-bold text-white">
              Home Décor • Regional Textiles
            </span>
          </div>
          <span className="px-2.5 py-1 rounded bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 text-[10px] font-bold">
            94% {t('listing.matchBadge')}
          </span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-2 font-mono">
        <button
          onClick={onProceed}
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-glow-blue active:scale-[0.99] transition flex items-center justify-center gap-2 border border-[#b4c5ff]/30"
        >
          <span>{t('listing.nextButton')}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <VoiceModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        language={`${languageConfig.native} (${languageConfig.name})`}
        title="Edit Craft Story with Voice"
        onTranscript={(text) => {
          setStory(text);
        }}
      />

      <ProductTranslationModal
        isOpen={isTranslationOpen}
        onClose={() => setIsTranslationOpen(false)}
        product={draftProduct}
        onSaveTranslation={(_id, _targetLang, content) => {
          setTitle(content.title);
          if (content.story) setStory(content.story);
        }}
      />
    </div>
  );
};
