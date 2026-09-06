export type LanguageCode = 'en' | 'te' | 'hi' | 'ta' | 'kn' | 'ml' | 'mr' | 'bn';

export interface LanguageConfig {
  id: LanguageCode;
  name: string;
  native: string;
  script: string;
  badge: string;
  bcp47: string; // Speech recognition & synthesis code
  samplePrompt: string;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    id: 'te',
    name: 'Telugu',
    native: 'తెలుగు',
    script: 'Telugu',
    badge: 'Popular in Telangana',
    bcp47: 'te-IN',
    samplePrompt: 'ఈ రోజు ఎన్ని ఆర్డర్లు వచ్చాయి?',
  },
  {
    id: 'hi',
    name: 'Hindi',
    native: 'हिन्दी',
    script: 'Devanagari',
    badge: 'राष्ट्रभाषा',
    bcp47: 'hi-IN',
    samplePrompt: 'आज कितने ऑर्डर्स आए हैं?',
  },
  {
    id: 'en',
    name: 'English',
    native: 'English',
    script: 'Latin',
    badge: 'Standard',
    bcp47: 'en-IN',
    samplePrompt: 'How many orders do I have today?',
  },
  {
    id: 'ta',
    name: 'Tamil',
    native: 'தமிழ்',
    script: 'Tamil',
    badge: 'தென்னிந்தியா',
    bcp47: 'ta-IN',
    samplePrompt: 'இன்று எத்தனை ஆர்டர்கள் வந்துள்ளன?',
  },
  {
    id: 'kn',
    name: 'Kannada',
    native: 'ಕನ್ನಡ',
    script: 'Kannada',
    badge: 'ಕರ್ನಾಟಕ',
    bcp47: 'kn-IN',
    samplePrompt: 'ಇಂದು ಎಷ್ಟು ಆರ್ಡರ್‌ಗಳು ಬಂದಿವೆ?',
  },
  {
    id: 'ml',
    name: 'Malayalam',
    native: 'മലയാളം',
    script: 'Malayalam',
    badge: 'കേരളം',
    bcp47: 'ml-IN',
    samplePrompt: 'ഇന്ന് എത്ര ഓർഡറുകൾ ലഭിച്ചു?',
  },
  {
    id: 'mr',
    name: 'Marathi',
    native: 'मराठी',
    script: 'Devanagari',
    badge: 'महाराष्ट्र',
    bcp47: 'mr-IN',
    samplePrompt: 'आज किती ऑर्डर्स आल्या आहेत?',
  },
  {
    id: 'bn',
    name: 'Bengali',
    native: 'বাংলা',
    script: 'Bengali',
    badge: 'পশ্চিমবঙ্গ',
    bcp47: 'bn-IN',
    samplePrompt: 'আজ কতগুলো অর্ডার এসেছে?',
  },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'te';

export function getLanguageConfig(code: LanguageCode): LanguageConfig {
  return SUPPORTED_LANGUAGES.find((lang) => lang.id === code) || SUPPORTED_LANGUAGES[0];
}
