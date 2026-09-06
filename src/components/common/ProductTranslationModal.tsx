import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles, CheckCircle2, Languages } from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageCode } from '../../config/languages';
import { useLanguage } from '../../services/i18n';
import { TranslationService } from '../../services/TranslationService';
import { ProductItem, LocalizedContent } from '../../types';

interface ProductTranslationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductItem | null;
  onSaveTranslation?: (productId: string, targetLang: LanguageCode, content: LocalizedContent) => void;
}

export const ProductTranslationModal: React.FC<ProductTranslationModalProps> = ({
  isOpen,
  onClose,
  product,
  onSaveTranslation,
}) => {
  const { t } = useLanguage();
  const [targetLang, setTargetLang] = useState<LanguageCode>('en');
  const [translatedTitle, setTranslatedTitle] = useState('');
  const [translatedStory, setTranslatedStory] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    if (product && isOpen) {
      setIsApproved(false);
      // Generate initial translation
      const initial = TranslationService.translate(
        product.title,
        product.story || product.title,
        targetLang
      );
      setTranslatedTitle(initial.title);
      setTranslatedStory(initial.story || '');
    }
  }, [product, targetLang, isOpen]);

  if (!isOpen || !product) return null;

  const handleLanguageChange = (lang: LanguageCode) => {
    setTargetLang(lang);
    setIsApproved(false);
    const res = TranslationService.translate(
      product.title,
      product.story || product.title,
      lang
    );
    setTranslatedTitle(res.title);
    setTranslatedStory(res.story || '');
  };

  const handleApprove = () => {
    setIsApproved(true);
    if (onSaveTranslation) {
      onSaveTranslation(product.id, targetLang, {
        title: translatedTitle,
        description: translatedStory.slice(0, 100),
        story: translatedStory,
      });
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#101415]/80 backdrop-blur-md flex items-end justify-center p-3 animate-fadeIn">
      <div className="w-full max-h-[90vh] bg-[#191c1e] rounded-3xl p-5 border border-[#1E293B] shadow-2xl space-y-4 flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#1E293B]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#2563eb]/20 border border-[#2563eb]/30 flex items-center justify-center text-[#b4c5ff]">
              <Languages className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold text-[#e0e3e5]">
                {t('translation.modalTitle')}
              </h3>
              <p className="text-[10px] text-[#8d90a0]">
                Translate for buyers across India & worldwide
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-[#101415] hover:bg-[#1E293B] border border-[#1E293B] flex items-center justify-center text-[#8d90a0] hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Target Language Selection Pills */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-mono font-bold text-[#8d90a0] uppercase tracking-wider block">
            {t('translation.targetLanguage')}
          </label>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => handleLanguageChange(lang.id)}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition ${
                  targetLang === lang.id
                    ? 'bg-[#2563eb] text-white shadow-glow-blue border border-[#b4c5ff]/40'
                    : 'bg-[#101415] text-[#8d90a0] hover:text-[#e0e3e5] border border-[#1E293B]'
                }`}
              >
                <span>{lang.native}</span>
                <span className="text-[10px] opacity-75 ml-1 font-mono">({lang.name})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Canonical Original vs Translated Comparison */}
        <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
          {/* Original (Canonical) */}
          <div className="bg-[#101415] p-3.5 rounded-2xl border border-[#1E293B] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#8d90a0] uppercase tracking-wider">
                {t('translation.originalText')} (Original)
              </span>
              <span className="text-[10px] font-mono font-semibold text-[#b4c5ff] bg-[#2563eb]/20 border border-[#2563eb]/30 px-2 py-0.5 rounded-md">
                Canonical Protected
              </span>
            </div>
            <h4 className="text-xs font-bold text-[#e0e3e5]">{product.title}</h4>
            <p className="text-[11px] text-[#8d90a0] leading-relaxed font-normal">
              {product.story || product.title}
            </p>
          </div>

          {/* AI Translated Preview */}
          <div className="bg-[#101415] p-3.5 rounded-2xl border-2 border-[#2563eb]/40 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-[#b4c5ff] uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#2563eb]" />
                <span>{t('translation.translatedText')}</span>
              </div>
              <span className="text-[10px] font-mono text-[#8d90a0]">Editable</span>
            </div>

            {/* Translated Title input */}
            <input
              type="text"
              value={translatedTitle}
              onChange={(e) => setTranslatedTitle(e.target.value)}
              className="w-full text-xs font-mono font-bold text-[#e0e3e5] bg-[#191c1e] border border-[#1E293B] rounded-xl p-2.5 focus:outline-none focus:border-[#2563eb]"
              placeholder="Translated title"
            />

            {/* Translated Story input */}
            <textarea
              rows={3}
              value={translatedStory}
              onChange={(e) => setTranslatedStory(e.target.value)}
              className="w-full text-xs text-[#e0e3e5] bg-[#191c1e] border border-[#1E293B] rounded-xl p-2.5 focus:outline-none focus:border-[#2563eb] leading-relaxed"
              placeholder="Translated craft story"
            />
          </div>
        </div>

        {/* Approval State Notice */}
        {isApproved && (
          <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>{t('translation.approvedNotice')}</span>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleApprove}
            className="flex-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-3 rounded-2xl font-mono font-bold text-xs shadow-glow-blue active:scale-95 transition flex items-center justify-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>{t('translation.approveAction')}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 bg-[#101415] hover:bg-[#1E293B] border border-[#1E293B] text-[#e0e3e5] rounded-2xl font-mono font-semibold text-xs transition"
          >
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
};
