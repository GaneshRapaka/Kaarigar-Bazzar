import React, { useState, useEffect } from 'react';
import { Mic, X, Volume2, CheckCircle2 } from 'lucide-react';

interface VoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onTranscript?: (text: string) => void;
  language?: string;
}

export const VoiceModal: React.FC<VoiceModalProps> = ({
  isOpen,
  onClose,
  title = 'Kaarigar Voice Assistant',
  onTranscript,
  language = 'తెలుగు (Telugu)',
}) => {
  const [isListening, setIsListening] = useState(true);
  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    if (isOpen) {
      setIsListening(true);
      setRecognizedText('');
      const timer1 = setTimeout(() => {
        setRecognizedText('సహజ నీలి రంగు అద్దకం మరియు పూల డిజైన్ తో తయారు చేసిన కుషన్ కవర్...');
      }, 1400);

      const timer2 = setTimeout(() => {
        setRecognizedText('Handcrafted pure indigo block-printed floral cushion cover from Pochampally & Telangana artisans.');
        setIsListening(false);
      }, 3000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center p-3 animate-fadeIn">
      <div className="w-full bg-[#FAF7F2] rounded-3xl p-5 border border-terracotta/20 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-artisan-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-terracotta/15 flex items-center justify-center text-terracotta">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-artisan-text">{title}</h3>
              <p className="text-[11px] text-terracotta font-medium">{language}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-neutral-200/70 hover:bg-neutral-300 flex items-center justify-center text-neutral-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audio Wave Visualizer */}
        <div className="flex flex-col items-center justify-center py-4 space-y-3">
          <div className="relative">
            <div className={`w-16 h-16 rounded-full bg-terracotta flex items-center justify-center text-white shadow-lg ${isListening ? 'scale-105' : ''}`}>
              <Mic className="w-7 h-7" />
            </div>
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full bg-terracotta/30 animate-ping" />
                <div className="absolute -inset-2 rounded-full border border-terracotta/40 animate-pulse" />
              </>
            )}
          </div>

          {/* Sound Wave Bars */}
          <div className="flex items-center gap-1.5 h-8">
            {[40, 75, 90, 60, 100, 45, 80, 50, 70, 30].map((h, i) => (
              <div
                key={i}
                className={`w-1 bg-terracotta rounded-full transition-all duration-300 ${
                  isListening ? 'animate-pulse' : 'opacity-40'
                }`}
                style={{
                  height: isListening ? `${h}%` : '20%',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>

          <p className="text-xs font-medium text-artisan-muted text-center">
            {isListening ? 'మాట్లాడండి... మీ మాటలను వింటున్నాము (Listening in Telugu)...' : 'Speech recognized successfully!'}
          </p>
        </div>

        {/* Live Transcription Box */}
        {recognizedText && (
          <div className="bg-white p-3 rounded-2xl border border-artisan-border space-y-1.5">
            <div className="flex items-center gap-1.5 text-forest text-[11px] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Transcribed Voice Note</span>
            </div>
            <p className="text-xs text-artisan-text leading-relaxed font-telugu italic">
              "{recognizedText}"
            </p>
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <button
            onClick={() => {
              if (onTranscript && recognizedText) {
                onTranscript(recognizedText);
              }
              onClose();
            }}
            className="flex-1 bg-terracotta hover:bg-terracotta-hover text-white py-2.5 rounded-xl font-medium text-xs shadow-craft transition flex items-center justify-center gap-1.5"
          >
            Use Spoken Text
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 bg-neutral-200/70 hover:bg-neutral-200 text-artisan-text rounded-xl font-medium text-xs transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
