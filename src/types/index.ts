export type ScreenId =
  | 'language_select'       // 1. Namaste & Welcome
  | 'login'                 // 2. Artisan Sign In / మొబైల్ లాగిన్
  | 'otp_auth'              // 3. OTP Verification / కోడ్ ధృవీకరణ
  | 'minimal_onboarding'    // 4. Quick Artisan Setup (Name, Language, Craft)
  | 'home'                  // 5. Namaste, Lakshmi
  | 'take_photo'            // 6. Step 1 of 6: Take a Product Photo
  | 'review_photo'          // 7. Step 2 of 6: Review Photo
  | 'analyzing_craft'       // 8. Step 3 of 6: Analyzing Craft
  | 'review_listing'        // 9. Step 4 of 6: Review Your Listing
  | 'smart_pricing'         // 10. Step 5 of 6: Smart Pricing Suggestion
  | 'final_verify'          // 11. Step 6 of 6: Final Confirmation
  | 'product_live'          // 12. Your product is live!
  | 'my_shop'               // 13. My Shop
  | 'orders'                // 14. Your Orders
  | 'earnings'              // 15. Lifetime Earnings
  | 'profile';              // 16. Profile / Preferences

export type NavTab = 'home' | 'orders' | 'earnings' | 'profile' | 'shop';

export interface ProductItem {
  id: string;
  title: string;
  teluguTitle?: string;
  category: string;
  price: number;
  costPrice?: number;
  profit?: number;
  status: 'live' | 'draft' | 'paused';
  image: string;
  matchPercentage?: number;
  story?: string;
}

export interface OrderItem {
  id: string;
  city: string;
  status: 'Awaiting Packing' | 'Delivered' | 'Packed' | 'Shipped';
  statusGroup: 'new' | 'packed' | 'shipped' | 'delivered';
  amount: number;
  customerName?: string;
  itemTitle: string;
  timeAgo: string;
}

// Seller Verification & Identity Status
export type SellerKycStatus =
  | 'NOT_VERIFIED'
  | 'VERIFICATION_REQUIRED'
  | 'PENDING'
  | 'VERIFIED'
  | 'FAILED'
  | 'EXPIRED';

export interface SellerVerificationRecord {
  id: string;
  sellerId: string;
  status: SellerKycStatus;
  provider: 'digilocker' | 'e_sign' | 'sandbox';
  verificationReference?: string;
  maskedIdentifier?: string; // e.g. "Govt ID ending in 4210", never full sensitive number
  verifiedAt?: string;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
}

export type SellerCapability =
  | 'BASIC_APP_ACCESS'
  | 'ADD_PRODUCTS'
  | 'EXPLORE_AI'
  | 'VIEW_DASHBOARD'
  | 'WITHDRAW_PAYOUTS'
  | 'VERIFIED_SELLER_BADGE'
  | 'HIGH_VALUE_DISPATCH';

export interface ArtisanProfile {
  id?: string;
  name: string;
  avatar: string;
  initial: string;
  title: string;
  location: string;
  language: string;
  teluguLanguage: string;
  phone: string;
  voiceFeedbackEnabled: boolean;
  craftSpecialization: string;
  isNewUser?: boolean;
  kycStatus?: SellerKycStatus;
  verificationRecord?: SellerVerificationRecord;
}

export interface AnalyticsDataPoint {
  label: string;
  fullDate: string;
  earnings: number;
  orders: number;
  views: number;
  topProduct?: string;
}

export interface AnalyticsPeriodData {
  summary: {
    totalEarnings: number;
    totalOrders: number;
    totalViews: number;
    growthPercent: number;
    peakDay: string;
    peakValue: string;
    avgDaily: string;
    voiceInsightEn: string;
    voiceInsightTe: string;
  };
  points: AnalyticsDataPoint[];
}

export interface CraftShareItem {
  name: string;
  teluguName: string;
  percentage: number;
  revenue: number;
  orders: number;
  color: string;
}

// Multilingual & Translation Types
export interface LocalizedContent {
  title: string;
  description: string;
  category?: string;
  story?: string;
}

export interface CanonicalProductItem extends ProductItem {
  canonicalLanguage?: string;
  translations?: Record<string, LocalizedContent>;
}

// Trusted Circle Types
export interface TrustedCircleMember {
  id: string;
  name: string;
  relation: string;
  phone: string;
  avatar: string;
  permissions: {
    canPackOrders: boolean;
    canViewInventory: boolean;
    canViewEarnings: boolean;
    canWithdrawFunds: boolean; // strictly false for security
  };
  lastActive: string;
}

// Voice Assistant & Intent Types
export type VoiceIntentType =
  | 'GET_TODAY_ORDERS'
  | 'GET_PENDING_ORDERS'
  | 'GET_ORDERS_LIST'
  | 'GET_EARNINGS_WEEK'
  | 'GET_EARNINGS_TOTAL'
  | 'GET_INVENTORY'
  | 'GET_BEST_SELLER'
  | 'PACK_ORDER'
  | 'UPDATE_PRODUCT_PRICE'
  | 'CREATE_PRODUCT_DRAFT'
  | 'NAVIGATE_TAB'
  | 'GET_SHOP_ANALYTICS'
  | 'GET_TRUSTED_CIRCLE'
  | 'ALERT_TRUSTED_CIRCLE'
  | 'TRANSLATE_PRODUCT_CONTENT'
  | 'GET_VERIFICATION_STATUS'
  | 'START_SELLER_VERIFICATION'
  | 'COMPLEX_ADVICE_QUERY'
  | 'UNKNOWN';

export interface ConfirmationAction {
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
}

export interface VoiceParsedIntent {
  intent: VoiceIntentType;
  confidence: number;
  entities: {
    productName?: string;
    productId?: string;
    newPrice?: number;
    orderId?: string;
    targetTab?: NavTab;
    targetLanguage?: string;
  };
  requiresConfirmation: boolean;
  confirmationAction?: ConfirmationAction;
  directAnswer?: string;
}

export interface ConversationTurn {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  intent?: VoiceIntentType;
  actionTaken?: string;
  needsConfirmation?: boolean;
  confirmationAction?: ConfirmationAction;
}
