import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  X,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { useLanguage } from '../../services/i18n';
import { VoiceService } from '../../services/VoiceService';
import { TTSService } from '../../services/TTSService';
import { IntentRouter, IntentContext } from '../../services/IntentRouter';
import { ProductItem, OrderItem, ArtisanProfile, TrustedCircleMember, ConfirmationAction } from '../../types';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  orders: OrderItem[];
  profile: ArtisanProfile;
  trustedMembers: TrustedCircleMember[];
  onNavigateTab?: (tab: any) => void;
  onNavigateScreen?: (screen: any) => void;
  onUpdatePrice?: (productId: string, newPrice: number) => void;
  onPackOrder?: (orderId: string) => void;
  onAlertTrustedHelper?: (memberId: string) => void;
  onOpenVerification?: () => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  products,
  orders,
  profile,
  trustedMembers,
  onNavigateTab,
  onNavigateScreen,
  onUpdatePrice,
  onPackOrder,
  onAlertTrustedHelper,
  onOpenVerification,
}) => {
  const { currentLanguage, languageConfig, t } = useLanguage();

  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [understoodIntent, setUnderstoodIntent] = useState<string | null>(null);
  const [assistantResponse, setAssistantResponse] = useState<string>('');
  const [pendingConfirmation, setPendingConfirmation] = useState<ConfirmationAction | null>(null);
  const [isMuted, setIsMuted] = useState(TTSService.getMuted());
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const modalRef = useRef<HTMLDivElement>(null);

  // Quick suggestions based on language
  const suggestionPrompts = {
    te: [
      'ఈ రోజు ఎన్ని ఆర్డర్లు వచ్చాయి?',
      'ఈ వారం నేను ఎంత సంపాదించాను?',
      'నా బెస్ట్ సెల్లింగ్ ప్రొడక్ట్ ఏది?',
      'నా ట్రస్టెడ్ సర్కిల్ చూపించు',
      'కుషన్ కవర్ ధర 900 కి మార్చు',
    ],
    hi: [
      'आज कितने ऑर्डर आए हैं?',
      'इस हफ्ते मैंने कितना कमाया?',
      'मेरा सबसे ज्यादा बिकने वाला सामान कौन सा है?',
      'कुशन कवर की कीमत 900 रुपये कर दो',
    ],
    en: [
      'How many orders do I have today?',
      'How much did I earn this week?',
      'Which product is selling the most?',
      'Who is in my Trusted Circle?',
      'Change price of cushion cover to 900',
    ],
    ta: ['இன்று எத்தனை ஆர்டர்கள்?', 'இந்த வாரம் எவ்வளவு சம்பாதித்தேன்?', 'அதிகம் விற்ற பொருள் எது?'],
    kn: ['ಇಂದು ಎಷ್ಟು ಆರ್ಡರ್‌ಗಳು ಬಂದಿವೆ?', 'ಈ ವಾರದ ಗಳಿಕೆ ಎಷ್ಟು?', 'ಹೆಚ್ಚು ಮಾರಾಟವಾದ ವಸ್ತು ಯಾವುದು?'],
    ml: ['ഇന്ന് എത്ര ഓർഡറുകൾ ലഭിച്ചു?', 'ഏറ്റവും കൂടുതൽ വിറ്റ ഉൽപ്പന്നം ഏത്?'],
    mr: ['आज किती ऑर्डर्स आल्या आहेत?', 'सर्वाधिक विक्री झालेले उत्पादन कोणते?'],
    bn: ['আজ কতগুলো অর্ডার এসেছে?', 'সবচেয়ে বেশি বিক্রীত পণ্য কোনটি?'],
  }[currentLanguage] || [
    'How many orders today?',
    'How much did I earn this week?',
  ];

  const handleProcessVoiceInput = (speechText: string) => {
    setIsProcessing(true);

    const ctx: IntentContext = {
      products,
      orders,
      profile,
      trustedMembers,
      onNavigateTab,
      onNavigateScreen,
      onUpdatePrice,
      onPackOrder,
      onAlertTrustedHelper,
      onOpenVerification,
    };

    const result = IntentRouter.parseAndExecute(speechText, currentLanguage, ctx);

    setTimeout(() => {
      setIsProcessing(false);
      setUnderstoodIntent(result.intent);
      setAssistantResponse(result.displayResponse);

      if (result.requiresConfirmation && result.confirmationAction) {
        setPendingConfirmation(result.confirmationAction);
      } else {
        setPendingConfirmation(null);
      }

      // Speak response
      if (!isMuted && result.spokenResponse) {
        setIsSpeaking(true);
        TTSService.speak(result.spokenResponse, currentLanguage, {
          onEnd: () => setIsSpeaking(false),
          onError: () => setIsSpeaking(false),
        });
      }
    }, 350);
  };

  const startVoiceListening = () => {
    setIsListening(true);
    setIsProcessing(false);
    setRecognizedText('');
    setStatusMessage('');

    VoiceService.listen(
      currentLanguage,
      (result) => {
        setRecognizedText(result.transcript);
        if (result.isFinal && result.transcript.trim()) {
          setIsListening(false);
          handleProcessVoiceInput(result.transcript);
        }
      },
      (err) => {
        setIsListening(false);
        console.warn('Voice error:', err);
      },
      () => {
        setIsListening(false);
      }
    );
  };

  // Auto-start listening on open
  useEffect(() => {
    if (isOpen) {
      setRecognizedText('');
      setUnderstoodIntent(null);
      setAssistantResponse('');
      setPendingConfirmation(null);
      setStatusMessage('');
      startVoiceListening();
    } else {
      VoiceService.stop();
      TTSService.stop();
      setIsListening(false);
      setIsSpeaking(false);
    }
    return () => {
      VoiceService.stop();
      TTSService.stop();
    };
  }, [isOpen]);

  const handleSuggestionClick = (promptText: string) => {
    VoiceService.stop();
    setIsListening(false);
    setRecognizedText(promptText);
    handleProcessVoiceInput(promptText);
  };

  const handleConfirmAction = () => {
    if (!pendingConfirmation) return;

    if (pendingConfirmation.type === 'UPDATE_PRODUCT_PRICE') {
      const { productId, newPrice } = pendingConfirmation.data;
      if (onUpdatePrice) onUpdatePrice(productId, newPrice);
      setStatusMessage(t('voice.actionSuccess'));
    } else if (pendingConfirmation.type === 'PACK_ORDER') {
      const { orderId } = pendingConfirmation.data;
      if (onPackOrder) onPackOrder(orderId);
      setStatusMessage(t('orders.packedSuccess'));
    } else if (pendingConfirmation.type === 'ALERT_TRUSTED_CIRCLE') {
      const { memberId } = pendingConfirmation.data;
      if (onAlertTrustedHelper) onAlertTrustedHelper(memberId);
      setStatusMessage(t('trustedCircle.helperNotified'));
    } else if (pendingConfirmation.type === 'OPEN_VERIFICATION') {
      onClose();
      if (onOpenVerification) onOpenVerification();
      if (onNavigateTab) onNavigateTab('profile');
      setStatusMessage('Opening Seller Verification...');
    }

    setPendingConfirmation(null);
    const successSpeech =
      currentLanguage === 'te'
        ? 'పని విజయవంతంగా పూర్తయింది!'
        : currentLanguage === 'hi'
        ? 'कार्य सफलतापूर्वक पूरा हो गया!'
        : 'Action confirmed and updated!';

    if (!isMuted) {
      TTSService.speak(successSpeech, currentLanguage);
    }
  };

  const handleCancelAction = () => {
    setPendingConfirmation(null);
    setStatusMessage(t('voice.actionCancelled'));
    if (!isMuted) {
      const cancelSpeech =
        currentLanguage === 'te' ? 'రద్దు చేయబడింది.' : 'Action cancelled.';
      TTSService.speak(cancelSpeech, currentLanguage);
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    TTSService.setMuted(next);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end justify-center p-3 animate-fadeIn">
      <div
        ref={modalRef}
        className="w-full max-h-[85vh] bg-artisan-bg rounded-3xl p-4.5 border border-artisan-border shadow-2xl space-y-3.5 flex flex-col overflow-y-auto"
      >
        {/* Header with Language badge & Mute control */}
        <div className="flex items-center justify-between pb-2 border-b border-artisan-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-terracotta/10 border border-terracotta/20 flex items-center justify-center text-terracotta">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-artisan-text">{t('voice.title')}</h3>
              <p className="text-[10px] text-terracotta font-semibold">
                {languageConfig.native} ({languageConfig.name})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleMute}
              className={`p-1.5 rounded-full border transition ${
                isMuted
                  ? 'bg-white text-artisan-muted border-artisan-border'
                  : 'bg-white text-terracotta border-terracotta/30 shadow-soft'
              }`}
              title={isMuted ? t('voice.unmute') : t('voice.mute')}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-terracotta" />}
            </button>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white hover:bg-neutral-100 border border-artisan-border flex items-center justify-center text-neutral-500 hover:text-artisan-text transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Central Push-to-Talk Mic Interaction Area */}
        <div className="flex flex-col items-center justify-center py-2 space-y-3">
          <button
            onClick={() => {
              if (isListening) {
                VoiceService.stop();
                setIsListening(false);
              } else {
                startVoiceListening();
              }
            }}
            className="relative focus:outline-none group active:scale-95 transition-transform"
          >
            <div
              className={`w-18 h-18 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 ${
                isListening
                  ? 'bg-terracotta scale-105 ring-4 ring-terracotta/30 shadow-craft'
                  : isProcessing
                  ? 'bg-amber-500 scale-100 ring-4 ring-amber-400/30 animate-pulse'
                  : 'bg-terracotta hover:bg-terracotta-hover shadow-craft'
              }`}
            >
              <Mic className="w-8 h-8" />
            </div>

            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full bg-terracotta/25 animate-ping" />
                <div className="absolute -inset-2.5 rounded-full border-2 border-terracotta/40 animate-pulse" />
              </>
            )}
          </button>

          {/* Sound Wave Bars */}
          <div className="flex items-center gap-1.5 h-6">
            {[35, 70, 95, 60, 100, 45, 80, 50, 75, 30].map((h, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-200 ${
                  isListening
                    ? 'bg-terracotta animate-pulse'
                    : isSpeaking
                    ? 'bg-forest animate-pulse'
                    : 'bg-neutral-300'
                }`}
                style={{
                  height: isListening || isSpeaking ? `${h}%` : '20%',
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </div>

          <p className="text-xs font-semibold text-artisan-muted text-center">
            {isListening
              ? t('voice.listening')
              : isProcessing
              ? t('voice.processing')
              : isSpeaking
              ? 'Speaking response...'
              : t('voice.tapMicToSpeak')}
          </p>
        </div>

        {/* Live Recognized Speech Box */}
        {recognizedText && (
          <div className="bg-white p-3 rounded-2xl border border-artisan-border shadow-soft space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-artisan-muted uppercase tracking-wider">
                Recognized Speech
              </span>
              {understoodIntent && (
                <span className="text-[9px] font-extrabold text-forest bg-forest-light border border-forest/30 px-2 py-0.5 rounded-full">
                  {understoodIntent}
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-artisan-text leading-relaxed">
              "{recognizedText}"
            </p>
          </div>
        )}

        {/* Assistant Response Box */}
        {assistantResponse && (
          <div className="bg-white p-3.5 rounded-2xl border border-terracotta/30 shadow-soft space-y-1.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-terracotta uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-terracotta" />
              <span>Kaarigar Response</span>
            </div>
            <p className="text-xs font-medium text-artisan-text leading-relaxed">
              {assistantResponse}
            </p>
          </div>
        )}

        {/* Action Confirmation Card (For Sensitive Actions like Price Change) */}
        {pendingConfirmation && (
          <div className="bg-white p-3.5 rounded-2xl border-2 border-amber-400 shadow-soft space-y-2.5 animate-fadeIn">
            <div className="flex items-start gap-2 text-amber-600">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-artisan-text">
                  {pendingConfirmation.title}
                </h4>
                <p className="text-[11px] text-artisan-muted mt-0.5">
                  {pendingConfirmation.description}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleConfirmAction}
                className="flex-1 bg-terracotta hover:bg-terracotta-hover text-white py-2 rounded-xl text-xs font-bold shadow-craft active:scale-95 transition"
              >
                {t('common.yes')}
              </button>
              <button
                onClick={handleCancelAction}
                className="px-3 py-2 bg-white hover:bg-neutral-100 text-artisan-text border border-artisan-border rounded-xl text-xs font-semibold transition"
              >
                {t('common.no')}
              </button>
            </div>
          </div>
        )}

        {/* Status Message Pill */}
        {statusMessage && (
          <div className="p-2 rounded-xl bg-forest-light border border-forest/30 text-forest text-center text-xs font-bold flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Quick Suggestion Chips */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[10px] font-bold text-artisan-muted uppercase tracking-wider block px-1">
            {t('voice.suggestionsTitle')}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {suggestionPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(prompt)}
                className="text-[11px] bg-white hover:bg-[#FFF8F5] hover:text-terracotta hover:border-terracotta/40 border border-artisan-border rounded-xl px-2.5 py-1 text-artisan-text font-medium transition text-left shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
