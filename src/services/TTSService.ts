import { LanguageCode, getLanguageConfig } from '../config/languages';

export interface TTSOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

const MUTE_STORAGE_KEY = 'kaarigar_voice_muted';

class TTSServiceSingleton {
  private synth: SpeechSynthesis | null = null;
  private isMuted = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
    try {
      this.isMuted = localStorage.getItem(MUTE_STORAGE_KEY) === 'true';
    } catch {
      this.isMuted = false;
    }
  }

  getMuted(): boolean {
    return this.isMuted;
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem(MUTE_STORAGE_KEY, String(muted));
    } catch {
      // Ignore
    }
    if (muted) {
      this.stop();
    }
  }

  isSupported(): boolean {
    return !!this.synth;
  }

  speak(text: string, languageCode: LanguageCode, options?: TTSOptions): boolean {
    if (this.isMuted) {
      if (options?.onEnd) options.onEnd();
      return false;
    }

    if (!this.synth) {
      // Simulated playback completion
      if (options?.onStart) options.onStart();
      setTimeout(() => {
        if (options?.onEnd) options.onEnd();
      }, 1500);
      return false;
    }

    try {
      this.synth.cancel(); // Cancel any ongoing speech

      const config = getLanguageConfig(languageCode);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = config.bcp47;
      utterance.rate = 0.95; // Slightly slower, clear cadence for regional artisans
      utterance.pitch = 1.0;

      // Match best voice if available
      const voices = this.synth.getVoices();
      const matchingVoice = voices.find(
        (v) => v.lang.startsWith(config.id) || v.lang === config.bcp47
      );
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onstart = () => {
        if (options?.onStart) options.onStart();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        if (options?.onEnd) options.onEnd();
      };

      utterance.onerror = (e) => {
        this.currentUtterance = null;
        if (options?.onError) options.onError(e);
      };

      this.currentUtterance = utterance;
      this.synth.speak(utterance);
      return true;
    } catch (err) {
      console.warn('Speech synthesis failed:', err);
      if (options?.onError) options.onError(err);
      return false;
    }
  }

  stop(): void {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch {
        // Ignore
      }
    }
    this.currentUtterance = null;
  }
}

export const TTSService = new TTSServiceSingleton();
