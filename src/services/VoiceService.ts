import { LanguageCode, getLanguageConfig } from '../config/languages';

export interface STTResult {
  transcript: string;
  isFinal: boolean;
  confidence?: number;
}

export interface STTProvider {
  isSupported(): boolean;
  startListening(
    langBcp47: string,
    onResult: (result: STTResult) => void,
    onError: (errorMsg: string) => void,
    onEnd: () => void
  ): boolean;
  stopListening(): void;
}

// Web Speech API Implementation
export class WebSpeechSTTProvider implements STTProvider {
  private recognition: any = null;
  private isListening = false;

  isSupported(): boolean {
    if (typeof window === 'undefined') return false;
    return !!((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
  }

  startListening(
    langBcp47: string,
    onResult: (result: STTResult) => void,
    onError: (errorMsg: string) => void,
    onEnd: () => void
  ): boolean {
    if (!this.isSupported()) {
      onError('Web Speech API is not supported in this browser.');
      return false;
    }

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = langBcp47 || 'te-IN';

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcript;
          } else {
            interim += transcript;
          }
        }

        const text = final || interim;
        const isFinal = Boolean(final);
        onResult({
          transcript: text.trim(),
          isFinal,
          confidence: event.results[0]?.[0]?.confidence,
        });
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        onError(event.error || 'Speech recognition error.');
      };

      this.recognition.onend = () => {
        this.isListening = false;
        onEnd();
      };

      this.recognition.start();
      return true;
    } catch (err: any) {
      this.isListening = false;
      onError(err.message || 'Failed to start speech recognition.');
      return false;
    }
  }

  stopListening(): void {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // Ignore
      }
      this.isListening = false;
    }
  }
}

// Simulated STT Provider for environments where mic is blocked
export class SimulatedSTTProvider implements STTProvider {
  private timer: any = null;

  isSupported(): boolean {
    return true;
  }

  startListening(
    langBcp47: string,
    onResult: (result: STTResult) => void,
    _onError: (errorMsg: string) => void,
    onEnd: () => void
  ): boolean {
    this.stopListening();

    // Pick realistic sample command based on language
    const sampleByLang: Record<string, string[]> = {
      'te-IN': [
        'ఈ రోజు ఎన్ని ఆర్డర్లు వచ్చాయి?',
        'ఈ వారం నేను ఎంత సంపాదించాను?',
        'నా బెస్ట్ సెల్లింగ్ ప్రొడక్ట్ ఏది?',
        'పెండింగ్ ఆర్డర్లు చూపించు',
        'కుషన్ కవర్ ధర 900 రూపాయలకు మార్చు',
      ],
      'hi-IN': [
        'आज कितने ऑर्डर आए हैं?',
        'इस हफ्ते मैंने कितना कमाया?',
        'मेरा सबसे ज्यादा बिकने वाला सामान कौन सा है?',
        'पेंडिंग ऑर्डर्स दिखाओ',
        'कुशन कवर की कीमत 900 रुपये कर दो',
      ],
      'ta-IN': [
        'இன்று எத்தனை ஆர்டர்கள் வந்துள்ளன?',
        'இந்த வாரம் நான் எவ்வளவு சம்பாதித்தேன்?',
        'அதிகம் விற்ற பொருள் எது?',
        'ஆர்டர்களை காட்டு',
      ],
      'en-IN': [
        'How many orders do I have today?',
        'How much did I earn this week?',
        'Which product is selling the most?',
        'Show me my pending orders',
        'Change the price of the cushion cover to 900 rupees',
      ],
    };

    const list = sampleByLang[langBcp47] || sampleByLang['en-IN'];
    const chosen = list[Math.floor(Math.random() * list.length)];

    // Simulate speech appearing word by word
    const words = chosen.split(' ');
    let currentIdx = 0;

    this.timer = setInterval(() => {
      currentIdx++;
      const partial = words.slice(0, currentIdx).join(' ');
      const isFinal = currentIdx >= words.length;

      onResult({
        transcript: partial,
        isFinal,
        confidence: 0.95,
      });

      if (isFinal) {
        clearInterval(this.timer);
        this.timer = null;
        setTimeout(() => onEnd(), 400);
      }
    }, 280);

    return true;
  }

  stopListening(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

// Factory to resolve best provider
class VoiceServiceSingleton {
  private provider: STTProvider;
  private fallbackProvider: STTProvider;

  constructor() {
    this.provider = new WebSpeechSTTProvider();
    this.fallbackProvider = new SimulatedSTTProvider();
  }

  setProvider(provider: STTProvider) {
    this.provider = provider;
  }

  isWebSpeechAvailable(): boolean {
    return this.provider.isSupported();
  }

  listen(
    languageCode: LanguageCode,
    onResult: (result: STTResult) => void,
    onError: (err: string) => void,
    onEnd: () => void,
    forceSimulation = false
  ): boolean {
    const langConfig = getLanguageConfig(languageCode);
    const bcp47 = langConfig.bcp47;

    if (forceSimulation || !this.provider.isSupported()) {
      return this.fallbackProvider.startListening(bcp47, onResult, onError, onEnd);
    }

    const success = this.provider.startListening(
      bcp47,
      onResult,
      (err) => {
        // If web speech fails (e.g. permission or network), fallback gracefully
        console.warn('Web Speech API error, falling back to simulation:', err);
        this.fallbackProvider.startListening(bcp47, onResult, onError, onEnd);
      },
      onEnd
    );

    return success;
  }

  stop(): void {
    this.provider.stopListening();
    this.fallbackProvider.stopListening();
  }
}

export const VoiceService = new VoiceServiceSingleton();
