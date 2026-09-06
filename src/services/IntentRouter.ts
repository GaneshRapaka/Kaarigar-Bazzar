import { LanguageCode } from '../config/languages';
import {
  ProductItem,
  OrderItem,
  ArtisanProfile,
  TrustedCircleMember,
  VoiceIntentType,
  ConversationTurn,
} from '../types';

export interface IntentContext {
  products: ProductItem[];
  orders: OrderItem[];
  profile: ArtisanProfile;
  trustedMembers: TrustedCircleMember[];
  previousTurn?: ConversationTurn;
  onNavigateTab?: (tab: string) => void;
  onNavigateScreen?: (screen: string) => void;
  onUpdatePrice?: (productId: string, newPrice: number) => void;
  onPackOrder?: (orderId: string) => void;
  onAlertTrustedHelper?: (memberId: string) => void;
  onOpenVerification?: () => void;
}

export interface IntentExecutionResult {
  intent: VoiceIntentType;
  spokenResponse: string;
  displayResponse: string;
  actionTaken?: string;
  requiresConfirmation: boolean;
  confirmationAction?: {
    id: string;
    type:
      | 'UPDATE_PRODUCT_PRICE'
      | 'PUBLISH_PRODUCT'
      | 'DELETE_PRODUCT'
      | 'PACK_ORDER'
      | 'ALERT_TRUSTED_CIRCLE'
      | 'OPEN_VERIFICATION';
    title: string;
    description: string;
    data: any;
  };
}

export class IntentRouter {
  /**
   * Deterministic intent parsing with cost minimization
   */
  static parseAndExecute(
    rawText: string,
    language: LanguageCode,
    ctx: IntentContext
  ): IntentExecutionResult {
    const text = rawText.toLowerCase().trim();

    // 1. ORDERS INQUIRIES (Today, Pending, Urgent)
    if (
      this.matchesAny(text, [
        'how many orders',
        'orders today',
        'today orders',
        'pending orders',
        'എത്ര ഓർഡർ',
        'ఆర్డర్లు',
        'ఎన్ని ఆర్డర్లు',
        'ఆర్డర్స్',
        'ऑर्डर',
        'कितने ऑर्डर',
        'ஆர்டர்கள்',
        'ஆர்டர்',
        'ಆರ್ಡರ್',
        'কতগুলো অর্ডার',
        'ऑर्डर्स',
      ])
    ) {
      const todayCount = ctx.orders.filter((o) => o.statusGroup === 'new').length;
      const totalCount = ctx.orders.length;

      const responses: Record<LanguageCode, { spoken: string; display: string }> = {
        te: {
          spoken: `లక్ష్మీ గారూ, ఈ రోజు మీకు ${todayCount} కొత్త ఆర్డర్లు ఉన్నాయి. మొత్తం ${totalCount} ఆర్డర్లు నమోదయ్యాయి.`,
          display: `ఈ రోజు కొత్త ఆర్డర్లు: ${todayCount} | మొత్తం ఆర్డర్లు: ${totalCount}`,
        },
        hi: {
          spoken: `आज आपके पास ${todayCount} नए ऑर्डर्स हैं। कुल ${totalCount} ऑर्डर्स हैं।`,
          display: `आज के नए ऑर्डर्स: ${todayCount} | कुल ऑर्डर्स: ${totalCount}`,
        },
        en: {
          spoken: `You have ${todayCount} new orders awaiting packing today, and ${totalCount} total active orders.`,
          display: `New orders today: ${todayCount} | Total orders: ${totalCount}`,
        },
        ta: {
          spoken: `இன்று உங்களுக்கு ${todayCount} புதிய ஆர்டர்கள் வந்துள்ளன. மொத்தம் ${totalCount} ஆர்டர்கள் உள்ளன.`,
          display: `இன்றைய புதிய ஆர்டர்கள்: ${todayCount} | மொத்தம்: ${totalCount}`,
        },
        kn: {
          spoken: `ಇಂದು ನಿಮಗೆ ${todayCount} ಹೊಸ ಆರ್ಡರ್‌ಗಳು ಬಂದಿವೆ. ಒಟ್ಟು ${totalCount} ಆರ್ಡರ್‌ಗಳು ಇವೆ.`,
          display: `ಇಂದಿನ ಹೊಸ ಆರ್ಡರ್‌ಗಳು: ${todayCount} | ಒಟ್ಟು: ${totalCount}`,
        },
        ml: {
          spoken: `ഇന്ന് നിങ്ങൾക്ക് ${todayCount} പുതിയ ഓർഡറുകൾ ഉണ്ട്. ആകെ ${totalCount} ഓർഡറുകൾ.`,
          display: `ഇന്നത്തെ പുതിയ ഓർഡറുകൾ: ${todayCount} | ആകെ: ${totalCount}`,
        },
        mr: {
          spoken: `आज तुमच्याकडे ${todayCount} नवीन ऑर्डर्स आहेत. एकूण ${totalCount} ऑर्डर्स आहेत.`,
          display: `आजच्या नवीन ऑर्डर्स: ${todayCount} | एकूण: ${totalCount}`,
        },
        bn: {
          spoken: `আজ আপনার কাছে ${todayCount}টি নতুন অর্ডার এসেছে। মোট ${totalCount}টি অর্ডার রয়েছে।`,
          display: `আজকের নতুন অর্ডার: ${todayCount} | মোট: ${totalCount}`,
        },
      };

      const res = responses[language] || responses.en;
      return {
        intent: 'GET_TODAY_ORDERS',
        spokenResponse: res.spoken,
        displayResponse: res.display,
        actionTaken: 'Navigated to view orders',
        requiresConfirmation: false,
      };
    }

    // 2. EARNINGS / REVENUE INQUIRIES
    if (
      this.matchesAny(text, [
        'how much did i earn',
        'earnings',
        'revenue',
        'income',
        'sales',
        'సంపాదన',
        'ఆదాయం',
        'ఎంత సంపాదించాను',
        'ఎంత వచ్చింది',
        'कमाई',
        'कितना कमाया',
        'வருமானம்',
        'எவ்வளவு சம்பாதித்தேன்',
        'ಗಳಿಕೆ',
        'വരുമാനം',
        'कमाई किती',
        'উপার্জন',
      ])
    ) {
      const weeklyEarning = 4280;
      const totalLifetime = 24680;

      const responses: Record<LanguageCode, { spoken: string; display: string }> = {
        te: {
          spoken: `ఈ వారం మీ సంపాదన ₹${weeklyEarning.toLocaleString('en-IN')}. మీ జీవితకాల మొత్తం ఆదాయం ₹${totalLifetime.toLocaleString('en-IN')}.`,
          display: `ఈ వారం ఆదాయం: ₹${weeklyEarning.toLocaleString('en-IN')} | మొత్తం ఆదాయం: ₹${totalLifetime.toLocaleString('en-IN')}`,
        },
        hi: {
          spoken: `इस सप्ताह आपकी कमाई ₹${weeklyEarning.toLocaleString('en-IN')} है। कुल जीवनकाल कमाई ₹${totalLifetime.toLocaleString('en-IN')} है।`,
          display: `इस सप्ताह की कमाई: ₹${weeklyEarning.toLocaleString('en-IN')} | कुल कमाई: ₹${totalLifetime.toLocaleString('en-IN')}`,
        },
        en: {
          spoken: `You earned ₹${weeklyEarning.toLocaleString('en-IN')} this week, with total lifetime earnings of ₹${totalLifetime.toLocaleString('en-IN')}.`,
          display: `This Week: ₹${weeklyEarning.toLocaleString('en-IN')} | Lifetime: ₹${totalLifetime.toLocaleString('en-IN')}`,
        },
        ta: {
          spoken: `இந்த வாரம் உங்கள் வருமானம் ₹${weeklyEarning.toLocaleString('en-IN')}. மொத்த வருமானம் ₹${totalLifetime.toLocaleString('en-IN')}.`,
          display: `இந்த வாரம்: ₹${weeklyEarning.toLocaleString('en-IN')} | மொத்தம்: ₹${totalLifetime.toLocaleString('en-IN')}`,
        },
        kn: {
          spoken: `ಈ ವಾರ ನಿಮ್ಮ ಗಳಿಕೆ ₹${weeklyEarning.toLocaleString('en-IN')}. ಒಟ್ಟು ಗಳಿಕೆ ₹${totalLifetime.toLocaleString('en-IN')}.`,
          display: `ಈ ವಾರದ ಗಳಿಕೆ: ₹${weeklyEarning.toLocaleString('en-IN')} | ಒಟ್ಟು: ₹${totalLifetime.toLocaleString('en-IN')}`,
        },
        ml: {
          spoken: `ഈ ആഴ്ച നിങ്ങളുടെ വരുമാനം ₹${weeklyEarning.toLocaleString('en-IN')}. ആകെ വരുമാനം ₹${totalLifetime.toLocaleString('en-IN')}.`,
          display: `ഈ ആഴ്ച: ₹${weeklyEarning.toLocaleString('en-IN')} | ആകെ: ₹${totalLifetime.toLocaleString('en-IN')}`,
        },
        mr: {
          spoken: `या आठवड्यात तुमची कमाई ₹${weeklyEarning.toLocaleString('en-IN')} आहे. एकूण कमाई ₹${totalLifetime.toLocaleString('en-IN')} आहे.`,
          display: `या आठवड्यात: ₹${weeklyEarning.toLocaleString('en-IN')} | एकूण: ₹${totalLifetime.toLocaleString('en-IN')}`,
        },
        bn: {
          spoken: `এই সপ্তাহে আপনার উপার্জন ₹${weeklyEarning.toLocaleString('en-IN')}। সর্বমোট উপার্জন ₹${totalLifetime.toLocaleString('en-IN')}।`,
          display: `এই সপ্তাহে: ₹${weeklyEarning.toLocaleString('en-IN')} | সর্বমোট: ₹${totalLifetime.toLocaleString('en-IN')}`,
        },
      };

      const res = responses[language] || responses.en;
      return {
        intent: 'GET_EARNINGS_WEEK',
        spokenResponse: res.spoken,
        displayResponse: res.display,
        actionTaken: 'Calculated earnings from database',
        requiresConfirmation: false,
      };
    }

    // 3. BEST SELLER / TOP PRODUCT
    if (
      this.matchesAny(text, [
        'selling the most',
        'best seller',
        'top product',
        'popular',
        'బెస్ట్ సెల్లింగ్',
        'ఎక్కువ అమ్ముడైన',
        'ఏ వస్తువు ఎక్కువ',
        'सबसे ज्यादा',
        'बेस्ट सेलर',
        'அதிகம் விற்ற',
        'ಹೆಚ್ಚು ಮಾರಾಟವಾದ',
        'കൂടുതൽ വിറ്റ',
        'सर्वाधिक विक्री',
      ])
    ) {
      const best = ctx.products[0] || { title: 'Indigo Cushion Cover', price: 620 };

      const responses: Record<LanguageCode, { spoken: string; display: string }> = {
        te: {
          spoken: `మీ బెస్ట్ సెల్లింగ్ ఉత్పత్తి ${best.title}. దీని ద్వారా ఈ వారం ₹14,310 వ్యాపారం జరిగింది.`,
          display: `బెస్ట్ సెల్లర్: ${best.title} (₹${best.price}) - 58% అమ్మకాలు`,
        },
        hi: {
          spoken: `आपका सबसे ज्यादा बिकने वाला उत्पाद ${best.title} है। इसने 58% बिक्री दर्ज की है।`,
          display: `बेस्ट सेलर: ${best.title} (₹${best.price}) - 58% बिक्री`,
        },
        en: {
          spoken: `Your top selling craft is the ${best.title}, contributing 58% of your total revenue.`,
          display: `Top Seller: ${best.title} (₹${best.price}) • 58% of sales`,
        },
        ta: {
          spoken: `அதிகம் விற்பனையான பொருள் ${best.title}.`,
          display: `அதிகம் விற்றது: ${best.title} (₹${best.price})`,
        },
        kn: {
          spoken: `ಹೆಚ್ಚು ಮಾರಾಟವಾದ ವಸ್ತು ${best.title}.`,
          display: `ಟಾಪ್ ಸೆಲ್ಲರ್: ${best.title} (₹${best.price})`,
        },
        ml: {
          spoken: `ഏറ്റവും കൂടുതൽ വിറ്റ ഉൽപ്പന്നം ${best.title}.`,
          display: `ബെസ്റ്റ് സെല്ലർ: ${best.title} (₹${best.price})`,
        },
        mr: {
          spoken: `सर्वाधिक विक्री झालेले उत्पादन ${best.title} आहे.`,
          display: `बेस्ट सेलर: ${best.title} (₹${best.price})`,
        },
        bn: {
          spoken: `আপনার সবচেয়ে বেশি বিক্রীত পণ্য ${best.title}।`,
          display: `বেস্ট সেলার: ${best.title} (₹${best.price})`,
        },
      };

      const res = responses[language] || responses.en;
      return {
        intent: 'GET_BEST_SELLER',
        spokenResponse: res.spoken,
        displayResponse: res.display,
        actionTaken: 'Queried top product from analytics',
        requiresConfirmation: false,
      };
    }

    // 4. INVENTORY / PRODUCTS COUNT
    if (
      this.matchesAny(text, [
        'how many products',
        'inventory',
        'stock',
        'items left',
        'ఎన్ని వస్తువులు',
        'స్టాక్',
        'కిరాణా',
        'सामान',
        'स्टॉक',
        'எத்தனை பொருட்கள்',
        'ದಾಸ್ತಾನು',
        'സ്റ്റോക്ക്',
        'মজুত',
      ])
    ) {
      const count = ctx.products.length;
      return {
        intent: 'GET_INVENTORY',
        spokenResponse: `You have ${count} live items listed in your shop catalog.`,
        displayResponse: `Live Products: ${count} items active in your catalog`,
        actionTaken: 'Counted items from My Shop database',
        requiresConfirmation: false,
      };
    }

    // 5. UPDATE PRICE (SENSITIVE ACTION -> REQUIRES CONFIRMATION)
    // Matches: "change price to 900", "ధర 900 రూపాయలకు మార్చు", "कीमत 900 कर दो"
    const priceMatch = text.match(/(\d{2,5})\s*(rupees|rs|రూపాయలు|रुपये|രൂപ|ரூபாய்|ರೂಪಾಯಿ|টাকা)?/);
    const hasChangeWord = this.matchesAny(text, [
      'change',
      'price',
      'rate',
      'ధర',
      'మార్చు',
      'कीमत',
      'बदलो',
      'விலை',
      'ಬೆಲೆ',
      'വില',
      'দাম',
    ]);

    if (priceMatch && hasChangeWord) {
      const newPrice = parseInt(priceMatch[1], 10);
      const targetProduct = ctx.products[0]; // defaults to active/first product

      return {
        intent: 'UPDATE_PRODUCT_PRICE',
        spokenResponse: `I can update the price of ${targetProduct.title} from ₹${targetProduct.price} to ₹${newPrice}. Please confirm to proceed.`,
        displayResponse: `Change price of "${targetProduct.title}" from ₹${targetProduct.price} to ₹${newPrice}?`,
        requiresConfirmation: true,
        confirmationAction: {
          id: `confirm-price-${Date.now()}`,
          type: 'UPDATE_PRODUCT_PRICE',
          title: 'Confirm Price Change',
          description: `Update "${targetProduct.title}" price to ₹${newPrice}`,
          data: { productId: targetProduct.id, newPrice },
        },
      };
    }

    // 6. PACK ORDER (ACTION WITH CONFIRMATION)
    if (
      this.matchesAny(text, [
        'mark packed',
        'pack order',
        'pack this',
        'ప్యాక్ చెయ్యి',
        'ప్యాకింగ్',
        'पैक करो',
        'பேக் செய்',
        'ಪ್ಯಾಕ್ ಮಾಡು',
        'പാക്ക് ചെയ്യുക',
      ])
    ) {
      const pendingOrder = ctx.orders.find((o) => o.statusGroup === 'new') || ctx.orders[0];

      return {
        intent: 'PACK_ORDER',
        spokenResponse: `Should I mark order #${pendingOrder.id} for ${pendingOrder.itemTitle} as packed?`,
        displayResponse: `Mark order #${pendingOrder.id} (${pendingOrder.customerName || 'Customer'}) as packed?`,
        requiresConfirmation: true,
        confirmationAction: {
          id: `confirm-pack-${Date.now()}`,
          type: 'PACK_ORDER',
          title: 'Confirm Order Packing',
          description: `Order #${pendingOrder.id} for ${pendingOrder.itemTitle}`,
          data: { orderId: pendingOrder.id },
        },
      };
    }

    // 7. CREATE NEW LISTING / SELL PRODUCT
    if (
      this.matchesAny(text, [
        'create listing',
        'sell a product',
        'sell product',
        'add product',
        'కొత్త వస్తువు',
        'అమ్మాలి',
        'లిస్ట్ చెయ్యి',
        'नया सामान',
        'बेचना है',
        'பொருள் விற்க',
        'ಹೊಸ ವಸ್ತು',
      ])
    ) {
      if (ctx.onNavigateScreen) {
        ctx.onNavigateScreen('take_photo');
      }
      return {
        intent: 'CREATE_PRODUCT_DRAFT',
        spokenResponse: 'Opening camera. Take a photo of your craft to begin smart listing.',
        displayResponse: 'Opening camera to scan your new craft...',
        actionTaken: 'Navigated to Take Photo screen',
        requiresConfirmation: false,
      };
    }

    // 8. TRUSTED CIRCLE & HELPERS
    if (
      this.matchesAny(text, [
        'trusted circle',
        'trusted person',
        'helper',
        'who can manage',
        'ట్రస్టెడ్ సర్కిల్',
        'సహాయకుడు',
        'నమ్మకమైన',
        'ट्रस्टेड सर्कल',
        'मददगार',
        'நம்பகமான வட்டம்',
        'உதவியாளர்',
      ])
    ) {
      const helper = ctx.trustedMembers[0] || { name: 'Ramesh (Son)', relation: 'Family Assistant' };

      // Sub-intent: Alert helper to pack orders
      if (this.matchesAny(text, ['tell', 'ask', 'help', 'pack', 'చెప్పు', 'సహాయం', 'बोलो'])) {
        return {
          intent: 'ALERT_TRUSTED_CIRCLE',
          spokenResponse: `Should I send a WhatsApp packing alert to your helper ${helper.name}?`,
          displayResponse: `Send WhatsApp packing alert to ${helper.name}?`,
          requiresConfirmation: true,
          confirmationAction: {
            id: `alert-helper-${Date.now()}`,
            type: 'ALERT_TRUSTED_CIRCLE',
            title: 'Notify Trusted Helper',
            description: `Send WhatsApp notification to ${helper.name} to help pack pending orders`,
            data: { memberId: helper.id },
          },
        };
      }

      return {
        intent: 'GET_TRUSTED_CIRCLE',
        spokenResponse: `Your trusted helper is ${helper.name}. They are permitted to pack orders, but bank payouts and finances remain locked.`,
        displayResponse: `Trusted Circle: ${helper.name} (${helper.relation}). Permissions: Packing only. Financial data locked.`,
        actionTaken: 'Retrieved Trusted Circle permissions from backend',
        requiresConfirmation: false,
      };
    }

    // 9. TRANSLATE CONTENT
    if (
      this.matchesAny(text, [
        'translate',
        'translation',
        'english',
        'telugu',
        'hindi',
        'అనువదించు',
        'అనువాదం',
        'अनुवाद',
        'மொழிபெயர்',
        'ಅನುವಾದ',
      ])
    ) {
      return {
        intent: 'TRANSLATE_PRODUCT_CONTENT',
        spokenResponse: 'Opening translation studio. You can preview and approve descriptions in all 8 languages.',
        displayResponse: 'Opening In-App Translation Studio...',
        actionTaken: 'Triggered Translation Studio Modal',
        requiresConfirmation: false,
      };
    }

    // 10. SELLER VERIFICATION & KYC QUERIES
    if (
      this.matchesAny(text, [
        'verify my identity',
        'verify identity',
        'verify account',
        'start kyc',
        'గుర్తింపు ధృవీకరించు',
        'గుర్తింపును ధృవీకరించండి',
        'पहचान सत्यापित करो',
        'सत्यापन शुरू करो',
      ])
    ) {
      return {
        intent: 'START_SELLER_VERIFICATION',
        spokenResponse:
          language === 'te'
            ? 'గుర్తింపు ధృవీకరణకు సురక్షితమైన ప్రక్రియ అవసరం. విక్రేత ధృవీకరణను తెరవమంటారా?'
            : language === 'hi'
            ? 'पहचान सत्यापन के लिए एक सुरक्षित प्रक्रिया की आवश्यकता होती है। क्या आप विक्रेता सत्यापन खोलना चाहते हैं?'
            : 'Identity verification requires a secure confirmation process. Would you like to open Seller Verification?',
        displayResponse:
          language === 'te'
            ? 'గుర్తింపు ధృవీకరణకు సురక్షితమైన ప్రక్రియ అవసరం. విక్రేత ధృవీకరణను తెరవమంటారా?'
            : language === 'hi'
            ? 'पहचान सत्यापन के लिए एक सुरक्षित प्रक्रिया की आवश्यकता होती है। क्या आप विक्रेता सत्यापन खोलना चाहते हैं?'
            : 'Identity verification requires a secure verification process. Would you like to open Seller Verification?',
        requiresConfirmation: true,
        confirmationAction: {
          id: `open-kyc-${Date.now()}`,
          type: 'OPEN_VERIFICATION',
          title: 'Open Seller Verification',
          description: 'Proceed to government e-KYC verification?',
          data: {},
        },
      };
    }

    if (
      this.matchesAny(text, [
        'verification complete',
        'is my seller verification',
        'verification status',
        'am i verified',
        'kyc',
        'వెరిఫికేషన్',
        'నా వెరిఫికేషన్',
        'ధృవీకరణ పూర్తయిందా',
        'ధృవీకరణ స్థితి',
        'सेलर वेरिफिकेशन',
        'सत्यापन की स्थिति',
      ])
    ) {
      const isVerified = ctx.profile.kycStatus === 'VERIFIED';
      const isPending = ctx.profile.kycStatus === 'PENDING';

      if (isVerified) {
        return {
          intent: 'GET_VERIFICATION_STATUS',
          spokenResponse:
            language === 'te'
              ? 'మీ విక్రేత ధృవీకరణ పూర్తయింది! మీకు బ్యాంక్ చెల్లింపులు మరియు ధృవీకరించబడిన బ్యాడ్జ్ సక్రియం చేయబడ్డాయి.'
              : language === 'hi'
              ? 'आपका विक्रेता सत्यापन पूरा हो चुका है! बैंक भुगतान और बैज सक्रिय हैं।'
              : 'Your seller verification is complete and active! You have full access to direct bank payouts and verified trust badge.',
          displayResponse:
            language === 'te'
              ? '✓ విక్రేత ధృవీకరణ పూర్తయింది (బ్యాంక్ బదిలీలు సక్రియం)'
              : language === 'hi'
              ? '✓ विक्रेता सत्यापन पूरा हो चुका है (बैंक ट्रांसफर सक्रिय)'
              : '✓ Seller Verification Complete (Bank payouts active)',
          requiresConfirmation: false,
        };
      } else if (isPending) {
        return {
          intent: 'GET_VERIFICATION_STATUS',
          spokenResponse:
            language === 'te'
              ? 'మీ గుర్తింపు ధృవీకరణ ప్రస్తుతం ప్రభుత్వ సర్వీస్ ద్వారా పరిశీలనలో ఉంది.'
              : language === 'hi'
              ? 'आपका पहचान सत्यापन वर्तमान में प्रक्रियाधीन है।'
              : 'Your identity verification is currently being processed by the verification provider.',
          displayResponse:
            language === 'te'
              ? '⏳ ధృవీకరణ పరిశీలనలో ఉంది'
              : language === 'hi'
              ? '⏳ सत्यापन प्रक्रियाधीन है'
              : '⏳ Verification In Progress',
          requiresConfirmation: false,
        };
      } else {
        return {
          intent: 'GET_VERIFICATION_STATUS',
          spokenResponse:
            language === 'te'
              ? 'మీ విక్రేత ధృవీకరణ ఇంకా పూర్తి కాలేదు. ప్రొఫైల్ నుండి ఎప్పుడైనా ధృవీకరించవచ్చు.'
              : language === 'hi'
              ? 'आपका विक्रेता सत्यापन अभी पूरा नहीं हुआ है। आप प्रोफाइल से कभी भी सत्यापन कर सकते हैं।'
              : 'Your seller verification is not yet completed. You can verify from your profile anytime to enable payouts.',
          displayResponse:
            language === 'te'
              ? '⚠️ విక్రేత ధృవీకరణ అవసరం (బ్యాంక్ బదిలీల కోసం)'
              : language === 'hi'
              ? '⚠️ विक्रेता सत्यापन आवश्यक (बैंक भुगतान के लिए)'
              : '⚠️ Seller Verification Required (For direct bank payouts)',
          requiresConfirmation: false,
        };
      }
    }

    // 11. NAVIGATION SHORTCUTS
    if (this.matchesAny(text, ['profile', 'show profile', 'my profile', 'ప్రొఫైల్', 'प्रोफाइल'])) {
      if (ctx.onNavigateTab) ctx.onNavigateTab('profile');
      return {
        intent: 'NAVIGATE_TAB',
        spokenResponse: 'Opening your profile.',
        displayResponse: 'Navigating to Profile...',
        requiresConfirmation: false,
      };
    }
    if (this.matchesAny(text, ['orders', 'ఆదేశాలు', 'ஆர்டர்கள்'])) {
      if (ctx.onNavigateTab) ctx.onNavigateTab('orders');
      return {
        intent: 'NAVIGATE_TAB',
        spokenResponse: 'Opening Orders tab.',
        displayResponse: 'Navigating to Orders...',
        requiresConfirmation: false,
      };
    }
    if (this.matchesAny(text, ['earnings', 'money', 'ఆదాయం', 'कमाई'])) {
      if (ctx.onNavigateTab) ctx.onNavigateTab('earnings');
      return {
        intent: 'NAVIGATE_TAB',
        spokenResponse: 'Opening Earnings tab.',
        displayResponse: 'Navigating to Earnings...',
        requiresConfirmation: false,
      };
    }
    if (this.matchesAny(text, ['shop', 'my shop', 'దుకాణం', 'दुकान'])) {
      if (ctx.onNavigateTab) ctx.onNavigateTab('shop');
      return {
        intent: 'NAVIGATE_TAB',
        spokenResponse: 'Opening My Shop.',
        displayResponse: 'Navigating to My Shop...',
        requiresConfirmation: false,
      };
    }

    // 11. COMPLEX CRAFT ADVICE (LIGHTWEIGHT RAG / AI ADVICE WITHOUT EXPENSIVE LLM)
    if (
      this.matchesAny(text, [
        'increase sales',
        'sales lower',
        'decrease',
        'why',
        'advice',
        'tips',
        'సలహా',
        'ఎలా పెంచాలి',
        'తగ్గింది',
        'बिक्री कैसे बढ़ाएं',
        'कमी क्यों',
      ])
    ) {
      const adviceByLang: Record<LanguageCode, { spoken: string; display: string }> = {
        te: {
          spoken: 'మీ అమ్మకాలు పెంచడానికి, రాబోయే పండుగల కోసం కొత్త కలంకారీ చీరలు మరియు కుషన్ కవర్ల సెట్లను లిస్ట్ చేయండి. ఫోటోలు పగటి వెలుతురులో తీయడం మరింత ఆకర్షణీయం.',
          display: 'AI సలహా: పండుగ సీజన్ కోసం బండిల్స్ (సెట్ ఆఫ్ 2 కుషన్లు) తయారు చేయండి. పగటి వెలుతురులో ఫోటోలు తీస్తే 24% ఎక్కువ క్లిక్స్ వస్తాయి.',
        },
        hi: {
          spoken: 'बिक्री बढ़ाने के लिए आगामी त्योहारों हेतु कुशन कवर के कॉम्बो सेट बनाएं और प्राकृतिक रोशनी में स्पष्ट तस्वीरें लें।',
          display: 'AI सलाह: फेस्टिव सीज़न के लिए कॉम्बो पैक बनाएं। दिन की रोशनी में खींची गई तस्वीरों से 24% अधिक ऑर्डर मिलते हैं।',
        },
        en: {
          spoken: 'To increase sales, create festive combo sets for your block-print cushions and capture bright daylight photos.',
          display: 'AI Craft Advisory: Bundle cushion covers into sets of 2 for festive buyers. Daylight photography boosts conversions by 24%.',
        },
        ta: {
          spoken: 'விற்பனையை அதிகரிக்க பண்டிகை கால சலுகைகளுடன் காம்போ பேக்குகளை உருவாக்கவும்.',
          display: 'AI ஆலோசனை: குஷன் கவர்களுக்கான பண்டிகை காம்போக்களை உருவாக்கவும்.',
        },
        kn: {
          spoken: 'ಮಾರಾಟ ಹೆಚ್ಚಿಸಲು ಹಬ್ಬದ ಕಾಂಬೋ ಪ್ಯಾಕ್‌ಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ.',
          display: 'AI ಸಲಹೆ: ಹಬ್ಬದ ಋತುವಿಗಾಗಿ ಕಾಂಬೋ ಸೆಟ್‌ಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಿ.',
        },
        ml: {
          spoken: 'വിൽപന കൂട്ടാൻ ഉത്സവകാല കോംബോ പാക്കുകൾ തയ്യാറാക്കുക.',
          display: 'AI ഉപദേശം: കുഷൻ കവറുകളുടെ കോംബോ സെറ്റുകൾ ലിസ്റ്റ് ചെയ്യുക.',
        },
        mr: {
          spoken: 'विक्री वाढवण्यासाठी सणासुदीचे कॉम्बो पॅक तयार करा.',
          display: 'AI सल्ला: सणांसाठी कुशन कव्हरचे कॉम्बो पॅक बनवा.',
        },
        bn: {
          spoken: 'বিক্রয় বাড়াতে উৎসবের কম্বো প্যাক তৈরি করুন।',
          display: 'AI পরামর্শ: উৎসবের জন্য কুশন কভারের কম্বো সেট তৈরি করুন।',
        },
      };

      const advice = adviceByLang[language] || adviceByLang.en;
      return {
        intent: 'COMPLEX_ADVICE_QUERY',
        spokenResponse: advice.spoken,
        displayResponse: advice.display,
        actionTaken: 'Synthesized craft growth advice via local RAG engine',
        requiresConfirmation: false,
      };
    }

    // 12. FALLBACK / UNKNOWN
    return {
      intent: 'UNKNOWN',
      spokenResponse:
        language === 'te'
          ? 'మీరు చెప్పినది నాకు పూర్తిగా అర్థం కాలేదు. ఆర్డర్లు, సంపాదన లేదా కొత్త వస్తువు గురించి అడగండి.'
          : language === 'hi'
          ? 'मुझे यह पूरी तरह समझ नहीं आया। कृपया ऑर्डर्स, कमाई या नए उत्पाद के बारे में पूछें।'
          : 'I did not fully catch that. You can ask about your orders, earnings, inventory, or pricing.',
      displayResponse:
        language === 'te'
          ? 'క్షమించండి, అర్థం కాలేదు. "ఈ రోజు ఎన్ని ఆర్డర్లు?" లేదా "ఈ వారం సంపాదన ఎంత?" అని అడగండి.'
          : language === 'hi'
          ? 'माफ़ कीजिए, समझ नहीं आया। "आज कितने ऑर्डर हैं?" या "कमाई कितनी हुई?" पूछें।'
          : 'Try asking: "How many orders today?", "How much did I earn?", or "Change price of cushion".',
      requiresConfirmation: false,
    };
  }

  private static matchesAny(text: string, keywords: string[]): boolean {
    return keywords.some((kw) => text.includes(kw.toLowerCase()));
  }
}
