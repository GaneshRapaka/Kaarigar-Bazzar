import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Mic, Edit3, Check, ArrowRight } from 'lucide-react';
import { VoiceModal } from '../common/VoiceModal';

interface ReviewListingScreenProps {
  onBack: () => void;
  onProceed: () => void;
}

export const ReviewListingScreen: React.FC<ReviewListingScreenProps> = ({
  onBack,
  onProceed,
}) => {
  const [title, setTitle] = useState(
    'Hand Block-Printed Cotton Cushion Cover – Indigo Floral'
  );
  const [story, setStory] = useState(
    'Beautifully handcrafted cushion cover featuring traditional block-prints from Telangana. Handprinted using pure natural indigo dyes on premium organic cotton. Features classic floral bootis designed to bring an artisan spirit to your living room.'
  );
  const [isEditingStory, setIsEditingStory] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-artisan-bg overflow-y-auto select-none space-y-3">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-1">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white border border-artisan-border flex items-center justify-center text-artisan-text hover:bg-neutral-100 transition"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <h2 className="text-sm font-bold text-artisan-text tracking-tight">Review Your Listing</h2>
          <span className="text-[11px] text-artisan-muted font-medium">4 of 6</span>
        </div>

        <div className="w-9" />
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pr-0.5">
        {/* Product Image Preview Card */}
        <div className="bg-white rounded-2xl p-2.5 border border-artisan-border shadow-soft flex items-center gap-3">
          <div className="w-16 h-16 rounded-xl overflow-hidden border border-artisan-border shrink-0">
            <img
              src="/assets/indigo_cushion.jpg"
              alt="Craft"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold">
              <Sparkles className="w-2.5 h-2.5" />
              <span>AI Assisted</span>
            </div>
            <p className="text-xs font-bold text-artisan-text line-clamp-2">
              Indigo Floral Cushion Cover
            </p>
          </div>
        </div>

        {/* Field 1: Product Title */}
        <div className="bg-white rounded-2xl p-3.5 border border-artisan-border shadow-soft space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-artisan-muted uppercase tracking-wider">
              Product Title (English & Telugu)
            </label>
            <span className="text-[10px] text-terracotta font-semibold font-telugu">
              ఇంగ్లీష్ & తెలుగు
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-xs font-bold text-artisan-text border-b border-transparent focus:border-terracotta focus:outline-none py-1 bg-transparent"
          />
        </div>

        {/* Field 2: Story of the Craft */}
        <div className="bg-white rounded-2xl p-3.5 border border-artisan-border shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-bold text-artisan-muted uppercase tracking-wider">
              Story of the Craft
            </label>
            <button
              onClick={() => setIsEditingStory(!isEditingStory)}
              className="text-[11px] font-semibold text-terracotta hover:underline flex items-center gap-1"
            >
              <Edit3 className="w-3 h-3" />
              <span>{isEditingStory ? 'Done' : 'Tap to Edit'}</span>
            </button>
          </div>

          {isEditingStory ? (
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={4}
              className="w-full text-xs text-artisan-text border border-terracotta/40 rounded-xl p-2.5 focus:outline-none leading-relaxed bg-[#FFFDFB]"
            />
          ) : (
            <p className="text-xs text-artisan-text leading-relaxed font-normal">
              {story}
            </p>
          )}

          {/* Speak to edit in your language */}
          <button
            onClick={() => setIsVoiceOpen(true)}
            className="w-full bg-[#FFF8F5] hover:bg-[#FEEFEA] border border-terracotta/20 rounded-xl py-2 px-3 flex items-center justify-center gap-2 text-terracotta text-xs font-bold transition group"
          >
            <div className="w-5 h-5 rounded-full bg-terracotta text-white flex items-center justify-center group-hover:scale-110 transition">
              <Mic className="w-3 h-3" />
            </div>
            <span>Speak to edit in your language</span>
          </button>
        </div>

        {/* Recommended Category */}
        <div className="bg-white rounded-2xl p-3.5 border border-artisan-border shadow-soft flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-artisan-muted uppercase tracking-wider block">
              Recommended Category
            </span>
            <span className="text-xs font-bold text-artisan-text">
              Home Décor • Regional Textiles
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-forest-light text-forest text-[10px] font-extrabold">
            94% Match
          </span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-2">
        <button
          onClick={onProceed}
          className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-3.5 px-4 rounded-2xl font-bold text-xs shadow-craft active:scale-[0.99] transition flex items-center justify-center gap-2"
        >
          <span>Next: Price Suggestion</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <VoiceModal
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
        language="తెలుగు (Telugu)"
        title="Edit Craft Story with Voice"
        onTranscript={(text) => {
          setStory(text);
        }}
      />
    </div>
  );
};
