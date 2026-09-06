import { LanguageCode } from '../config/languages';
import { CanonicalProductItem, LocalizedContent } from '../types';

export class TranslationService {
  /**
   * Predefined high-quality translations for core craft catalog items
   */
  private static craftCorpus: Record<string, Record<LanguageCode, LocalizedContent>> = {
    'Indigo Cushion Cover': {
      en: {
        title: 'Indigo Floral Cushion Cover',
        description:
          'Handcrafted pure cotton cushion cover with authentic Telangana mud-resist indigo block printing.',
        category: 'Home Décor • Regional Textiles',
        story:
          'Beautifully handcrafted cushion cover featuring traditional block-prints from Telangana. Handprinted using pure natural indigo dyes on premium organic cotton.',
      },
      te: {
        title: 'ఇండిగో ఫ్లోరల్ కుషన్ కవర్',
        description:
          'తెలంగాణ సంప్రదాయ సహజ నీలి రంగు (ఇండిగో) అద్దకం మరియు చేతి బ్లాక్-ప్రింట్ పత్తి కుషన్ కవర్.',
        category: 'గృహ అలంకరణ • ప్రాంతీయ చేనేత',
        story:
          'తెలంగాణ సంప్రదాయ శైలిలో స్వచ్ఛమైన సహజ రంగులతో రూపొందించిన చేతి అద్దకం కుషన్ కవర్. సేంద్రీయ పత్తి వస్త్రంతో తయారు చేయబడింది.',
      },
      hi: {
        title: 'इंडिगो फ्लोरल कुशन कवर',
        description: 'प्राकृतिक नील (इंडिगो) और पारंपरिक ब्लॉक प्रिंट से निर्मित शुद्ध कॉटन कुशन कवर।',
        category: 'गृह सज्जा • पारंपरिक वस्त्र',
        story:
          'तेलंगाना के मास्टर कारीगरों द्वारा प्राकृतिक नील और लकड़ी के सांचों से मुद्रित सुंदर हस्तनिर्मित कुशन कवर।',
      },
      ta: {
        title: 'இண்டிகோ பூ வேலைப்பாடு குஷன் கவர்',
        description: 'இயற்கை நீல சாயம் மற்றும் பாரம்பரிய அச்சு வேலைப்பாடு கொண்ட காட்டன் குஷன் கவர்.',
        category: 'வீட்டு அலங்காரம் • பாரம்பரிய ஜவுளி',
        story: 'தெலுங்கானாவின் பாரம்பரிய கைவினை கலைஞர்களால் இயற்கை சாயங்கள் கொண்டு உருவாக்கப்பட்ட குஷன் கவர்.',
      },
      kn: {
        title: 'ಇಂಡಿಗೋ ಹೂವಿನ ವಿನ್ಯಾಸದ ಕುಶನ್ ಕವರ್',
        description: 'ನೈಸರ್ಗಿಕ ಇಂಡಿಗೋ ಬಣ್ಣ ಮತ್ತು ಕೈ ಬ್ಲಾಕ್-ಪ್ರಿಂಟ್ ಮಾಡಿದ ಹತ್ತಿ ಕುಶನ್ ಕವರ್.',
        category: 'ಮನೆ ಅಲಂಕಾರ • ಕರಕುಶಲ ಜವಳಿ',
        story: 'ತೆಲಂಗಾಣದ ಸಾಂಪ್ರದಾಯಿಕ ಶೈಲಿಯಲ್ಲಿ ನೈಸರ್ಗಿಕ ಬಣ್ಣಗಳನ್ನು ಬಳಸಿ ನೆಯ್ದ ಕುಶನ್ ಕವರ್.',
      },
      ml: {
        title: 'ഇൻഡിഗോ ഫ്ലോറൽ കുഷൻ കവർ',
        description: 'പ്രകൃതിദത്ത നീലച്ചായവും പരമ്പരാഗത ബ്ലോക്ക് പ്രിന്റും ചേർത്ത പരുത്തി കുഷൻ കവർ.',
        category: 'ഗൃഹാലങ്കാരം • കൈത്തറി',
        story: 'തെലങ്കാനയിലെ വിദഗ്ദ്ധ ശില്പികൾ പ്രകൃതിദത്ത ചായങ്ങളാൽ കൈകൊണ്ട് തീർത്ത മനോഹരമായ കുഷൻ കവർ.',
      },
      mr: {
        title: 'इंडिगो फ्लोरल कुशन कव्हर',
        description: 'नैसर्गिक इंडिगो रंग आणि हाताने ब्लॉक-प्रिंट केलेले कॉटन कुशन कव्हर.',
        category: 'गृहसजावट • पारंपरिक वस्त्र',
        story: 'तेलंगणाच्या पारंपरिक कारागिरीतून शुद्ध सुती कापडावर नैसर्गिक रंगांनी साकारलेले कुशन कव्हर.',
      },
      bn: {
        title: 'ইন্ডিগো ফ্লোরাল কুশন কভার',
        description: 'প্রাকৃতিক নীল রং এবং ঐতিহ্যবাহী ব্লক প্রিন্ট করা খাঁটি সুতি কুশন কভার।',
        category: 'গৃহসজ্জা • ঐতিহ্যবাহী বস্ত্র',
        story: 'তেলেঙ্গানার ঐতিহ্যবাহী কাঠের ব্লকে প্রাকৃতিক রং দিয়ে হাতে ছাপানো অনন্য কুশন কভার।',
      },
    },
    'Silk Pochampally Scarf': {
      en: {
        title: 'Silk Pochampally Ikat Scarf',
        description: 'Handwoven pure mulberry silk scarf with authentic geometric Pochampally Ikat patterns.',
        category: 'Apparel • Handloom Silk',
        story: 'Authentic geometric ikat woven silk scarf hand-dyed using traditional Telia Rumal resistive techniques by master weavers in Bhoodan Pochampally.',
      },
      te: {
        title: 'పోచంపల్లి పట్టు ఇకత్ స్కార్ఫ్',
        description: 'భూదాన్ పోచంపల్లి నేతన్నల చేతుల్లో రూపుదిద్దుకున్న స్వచ్ఛమైన ఇకత్ పట్టు స్కార్ఫ్.',
        category: 'వస్త్రాలు • చేనేత పట్టు',
        story: 'ప్రసిద్ధ తేలియా రుమాల్ సంప్రదాయ పద్ధతిలో సహజ రంగులతో నేయబడిన అందమైన పోచంపల్లి పట్టు స్కార్ఫ్.',
      },
      hi: {
        title: 'सिल्क पोचमपल्ली इकत स्कार्फ',
        description: 'शुद्ध मलबरी सिल्क पर पारंपरिक पोचमपल्ली इकत बुनाई वाला खूबसूरत स्कार्फ।',
        category: 'परिधान • हथकरघा रेशम',
        story: 'भूदान पोचमपल्ली के बुनकरों द्वारा पारंपरिक तेलिया रुमाल तकनीक से रंगा और बुना गया रेशमी स्कार्फ।',
      },
      ta: {
        title: 'பட்டு போச்சம்பள்ளி இக்கத் தாவணி',
        description: 'பாரம்பரிய போச்சம்பள்ளி இக்கத் முறையில் நெய்யப்பட்ட தூய பட்டு தாவணி.',
        category: 'ஆடைகள் • கைத்தறி பட்டு',
        story: 'போச்சம்பள்ளி நெசவாளர்களால் பாரம்பரிய முறையில் உருவாக்கப்பட்ட தூய பட்டுத் துணி.',
      },
      kn: {
        title: 'ರೇಷ್ಮೆ ಪೋಚಂಪಲ್ಲಿ ಇಕತ್ ಸ್ಕಾರ್ಫ್',
        description: 'ಶುದ್ಧ ರೇಷ್ಮೆಯ ಸಾಂಪ್ರದಾಯಿಕ ಪೋಚಂಪಲ್ಲಿ ಇಕತ್ ನೇಯ್ಗೆಯ ಸ್ಕಾರ್ಫ್.',
        category: 'ಉಡುಪುಗಳು • ಕೈಮಗ್ಗ ರೇಷ್ಮೆ',
        story: 'ಭೂದಾನ ಪೋಚಂಪಲ್ಲಿಯ ಮಾಸ್ಟರ್ ನೇಕಾರರಿಂದ ಕೈಯಿಂದ ನೇಯ್ದ ಆಕರ್ಷಕ ರೇಷ್ಮೆ ಸ್ಕಾರ್ಫ್.',
      },
      ml: {
        title: 'സിൽക്ക് പോച്ചമ്പള്ളി ഇക്കത് സ്കാർഫ്',
        description: 'പരമ്പരാഗത ഇക്കത് നെയ്ത്തിൽ തീർത്ത ശുദ്ധമായ പട്ട് സ്കാർഫ്.',
        category: 'വസ്ത്രങ്ങൾ • കൈത്തറി പട്ട്',
        story: 'ഭൂദാൻ പോച്ചമ്പള്ളിയിലെ വിദഗ്ദ്ധ നെയ്ത്തുകാർ നിർമ്മിച്ച ശുദ്ധമായ പട്ടു വസ്ത്രം.',
      },
      mr: {
        title: 'सिल्क पोचमपल्ली इकत स्कार्फ',
        description: 'पारंपरिक पोचमपल्ली इकत विणकामाचा अस्सल रेशमी स्कार्फ.',
        category: 'पोशाख • हातमाग रेशीम',
        story: 'पोचमपल्लीच्या विणकरांनी पारंपरिक तंत्राने साकारलेला सुंदर रेशमी स्कार्फ.',
      },
      bn: {
        title: 'সিল্ক পোচমপল্লী ইকত স্কার্ফ',
        description: 'খাঁটি তঁতের রেশমে ঐতিহ্যবাহী পোচমপল্লী ইকত নকশার স্কার্ফ।',
        category: 'পোশাক • তাঁত রেশম',
        story: 'ভূদান পোচমপল্লীর অভিজ্ঞ তাঁতিদের হাতে বোনা অনন্য জ্যামিতিক নকশার সিল্ক স্কার্ফ।',
      },
    },
  };

  /**
   * Translates content safely preserving the canonical original
   */
  static translate(
    productTitle: string,
    originalStory: string,
    targetLang: LanguageCode
  ): LocalizedContent {
    // Check if known craft in corpus
    const key = Object.keys(this.craftCorpus).find((k) =>
      productTitle.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(productTitle.toLowerCase())
    );

    if (key && this.craftCorpus[key][targetLang]) {
      return this.craftCorpus[key][targetLang];
    }

    // Dynamic translation with localized prefixes and suffixes
    const titlePrefixes: Record<LanguageCode, string> = {
      en: 'Handcrafted',
      te: 'చేతితో తయారు చేసిన',
      hi: 'हस्तनिर्मित',
      ta: 'கைவினைப் பொருள்',
      kn: 'ಕೈಯಿಂದ ತಯಾರಿಸಿದ',
      ml: 'കൈകൊണ്ട് നിർമ്മിച്ച',
      mr: 'हस्तनिर्मित',
      bn: 'হাতে তৈরি',
    };

    const storyTemplates: Record<LanguageCode, string> = {
      en: `Authentic regional artisan craft: ${originalStory}`,
      te: `ప్రాంతీయ కళాకారుల ప్రత్యేకత: ${originalStory}`,
      hi: `स्थानीय कारीगरों द्वारा निर्मित कलाकृति: ${originalStory}`,
      ta: `பாரம்பரிய கைவினைஞர்களின் கலைப்படைப்பு: ${originalStory}`,
      kn: `ಸ್ಥಳೀಯ ಕುಶಲಕರ್ಮಿಗಳ ಕಲಾಕೃತಿ: ${originalStory}`,
      ml: `നാടൻ ശില്പികളുടെ പാരമ്പര്യ നിർമ്മിതി: ${originalStory}`,
      mr: `स्थानिक कारागिरांची अप्रतिम निर्मिती: ${originalStory}`,
      bn: `স্থানীয় কারিগরদের অনন্য সৃষ্টি: ${originalStory}`,
    };

    return {
      title: `${titlePrefixes[targetLang] || 'Craft'} ${productTitle}`,
      description: originalStory.slice(0, 100) + '...',
      category: 'Artisan Heritage • Handcrafted',
      story: storyTemplates[targetLang] || originalStory,
    };
  }

  /**
   * Attaches approved translation to a canonical product item
   */
  static saveTranslation(
    product: CanonicalProductItem,
    targetLang: LanguageCode,
    translatedContent: LocalizedContent
  ): CanonicalProductItem {
    const existingTranslations = product.translations || {};
    return {
      ...product,
      translations: {
        ...existingTranslations,
        [targetLang]: translatedContent,
      },
    };
  }
}
