export type ScreenId =
  | 'language_select'       // 1. Namaste & Welcome
  | 'otp_auth'              // 2. Sign In / లాగిన్
  | 'home'                  // 3. Namaste, Lakshmi
  | 'take_photo'            // 4. Step 1 of 6: Take a Product Photo
  | 'review_photo'          // 5. Step 2 of 6: Review Photo
  | 'analyzing_craft'       // 6. Step 3 of 6: Analyzing Craft
  | 'review_listing'        // 7. Step 4 of 6: Review Your Listing
  | 'smart_pricing'         // 8. Step 5 of 6: Smart Pricing Suggestion
  | 'final_verify'          // 9. Step 6 of 6: Final Confirmation
  | 'product_live'          // 10. Your product is live!
  | 'my_shop'               // 11. My Shop
  | 'orders'                // 12. Your Orders
  | 'earnings'              // 13. Lifetime Earnings
  | 'profile';              // 14. Profile / Preferences

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

export interface ArtisanProfile {
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
}
