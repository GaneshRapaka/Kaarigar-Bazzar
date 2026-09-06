import fs from 'fs';
import path from 'path';

const targetDir = 'C:\\Users\\BroGa\\OneDrive\\Desktop\\Kaarigar-Buyer';

function writeFile(relPath, content) {
  const fullPath = path.join(targetDir, relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`Updated/Created: ${relPath}`);
}

// 1. Update src/types/index.ts with BuyerNavTab
writeFile('src/types/index.ts', `export interface ProductItem {
  id: string;
  title: string;
  teluguTitle: string;
  hindiTitle: string;
  category: string;
  craftType: string;
  state: string;
  district: string;
  price: number;
  originalPrice: number;
  costPrice: number;
  profit: number;
  artisanId: string;
  artisanName: string;
  artisanLocation: string;
  artisanAvatar: string;
  artisanStoryExcerpt: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  isGiTagged: boolean;
  materials: string[];
  craftHours: number;
  artisanSharePercent: number;
  story: string;
  techniqueDetails: string;
  careInstructions: string;
  inStock: boolean;
}

export interface Artisan {
  id: string;
  name: string;
  initial: string;
  title: string;
  location: string;
  state: string;
  district: string;
  avatar: string;
  badge: string;
  heritageGeneration: string;
  story: string;
  craftSpecialization: string;
  cooperative: string;
  totalCreations: number;
  totalOrdersFulfilled: number;
  rating: number;
  establishedYear: number;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  date: string;
  verified: boolean;
  comment: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  totalAmount: number;
  artisanShareAmount: number;
  status: 'placed' | 'crafting' | 'shipped' | 'delivered';
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pinCode: string;
  };
  paymentMethod: string;
  trackingStep: number;
}

export type BuyerNavTab = 'home' | 'explore' | 'cart' | 'orders' | 'artisans';

export type ModalType = 
  | 'none' 
  | 'cart' 
  | 'checkout' 
  | 'product_detail' 
  | 'artisan_storefront' 
  | 'compare' 
  | 'order_tracking' 
  | 'voice_search';
`);

// 2. src/components/layout/MobileFrame.tsx
writeFile('src/components/layout/MobileFrame.tsx', `import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
  currentTime?: string;
  showDeviceFrame?: boolean;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  currentTime = '9:41',
  showDeviceFrame = true,
}) => {
  if (!showDeviceFrame) {
    return (
      <div className="w-full max-w-md mx-auto min-h-screen bg-artisan-bg flex flex-col shadow-2xl relative overflow-hidden">
        {/* Mobile Status Bar */}
        <div className="bg-[#FAF7F2]/95 backdrop-blur-md px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold text-[#2B2521] border-b border-black/[0.04] z-40 sticky top-0 select-none">
          <span className="font-bold">{currentTime}</span>
          <div className="flex items-center gap-1.5 text-xs">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 fill-current" />
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto my-2 sm:my-3 transition-all duration-300">
      {/* Phone Outer Bezel */}
      <div className="w-[390px] h-[844px] max-h-[94vh] bg-[#1C1A18] rounded-[52px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.12),inset_0_0_4px_rgba(255,255,255,0.2)] flex flex-col relative select-none">
        {/* Side Buttons */}
        <div className="absolute -left-[13px] top-[115px] w-[3px] h-[26px] bg-[#383431] rounded-l-sm" />
        <div className="absolute -left-[13px] top-[155px] w-[3px] h-[48px] bg-[#383431] rounded-l-sm" />
        <div className="absolute -left-[13px] top-[215px] w-[3px] h-[48px] bg-[#383431] rounded-l-sm" />
        <div className="absolute -right-[13px] top-[165px] w-[3px] h-[64px] bg-[#383431] rounded-r-sm" />

        {/* Display Area */}
        <div className="w-full h-full bg-artisan-bg rounded-[42px] overflow-hidden flex flex-col relative border border-[#2E2B27]">
          {/* Status Bar + Dynamic Island */}
          <div className="bg-[#FAF7F2] shrink-0 px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold text-[#2B2521] z-40 relative select-none border-b border-artisan-border/40">
            <span className="font-bold tracking-tight text-[13px] pl-1">{currentTime}</span>
            {/* Dynamic Island */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2.5 w-[96px] h-[24px] bg-black rounded-full flex items-center justify-center px-2 shadow-inner">
              <div className="w-2 h-2 rounded-full bg-[#1F3A52] ml-auto mr-1" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-auto" />
            </div>
            {/* Icons */}
            <div className="flex items-center gap-1.5 text-xs text-[#2B2521] pr-1">
              <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
              <div className="flex items-center">
                <div className="w-5 h-2.5 border border-[#2B2521] rounded-[3px] p-0.5 flex items-center">
                  <div className="w-full h-full bg-[#2B2521] rounded-[1px]" />
                </div>
                <div className="w-0.5 h-1 bg-[#2B2521] rounded-r-[1px]" />
              </div>
            </div>
          </div>

          {/* Screen Content */}
          <div className="flex-1 flex flex-col overflow-hidden relative bg-artisan-bg">
            {children}
          </div>

          {/* Home Indicator */}
          <div className="shrink-0 bg-white py-1.5 flex justify-center items-center z-40 border-t border-artisan-border/30">
            <div className="w-32 h-1 bg-neutral-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
`);

// 3. src/components/layout/BottomNav.tsx
writeFile('src/components/layout/BottomNav.tsx', `import React from 'react';
import { Home, Compass, ShoppingBag, Package, UserCheck } from 'lucide-react';
import { BuyerNavTab } from '../../types';
import { useShop } from '../../context/ShopContext';

interface BottomNavProps {
  currentTab: BuyerNavTab;
  onSelectTab: (tab: BuyerNavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  const { cart, orders } = useShop();
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { tab: 'home' as BuyerNavTab, label: 'Discover', icon: Home, badge: 0 },
    { tab: 'explore' as BuyerNavTab, label: 'Explore', icon: Compass, badge: 0 },
    { tab: 'cart' as BuyerNavTab, label: 'Bag', icon: ShoppingBag, badge: totalCartItems },
    { tab: 'orders' as BuyerNavTab, label: 'Orders', icon: Package, badge: orders.length },
    { tab: 'artisans' as BuyerNavTab, label: 'Makers', icon: UserCheck, badge: 0 },
  ];

  return (
    <nav className="shrink-0 bg-white border-t border-[#EAE3D6] px-2 py-1.5 flex items-center justify-around z-30 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] select-none">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentTab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => onSelectTab(item.tab)}
            className={\`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 relative \${
              isActive
                ? 'text-terracotta font-extrabold scale-105'
                : 'text-[#8A8175] hover:text-artisan-text'
            }\`}
          >
            <div className={\`p-1 rounded-xl transition-colors relative \${isActive ? 'bg-terracotta/10' : ''}\`}>
              <Icon className={\`w-5 h-5 \${isActive ? 'stroke-[2.4]' : 'stroke-[1.8]'}\`} />
              {item.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-terracotta text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
`);

// 4. src/components/layout/MobileHeader.tsx
writeFile('src/components/layout/MobileHeader.tsx', `import React from 'react';
import { Globe, Mic, Layers, Sparkles } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const MobileHeader: React.FC = () => {
  const { language, setLanguage, openModal, compareList } = useShop();

  return (
    <div className="shrink-0 bg-white border-b border-artisan-border/70 px-4 py-2.5 flex items-center justify-between select-none">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-terracotta flex items-center justify-center text-white font-extrabold text-base shadow-craft">
          క
        </div>
        <div>
          <div className="flex items-center gap-1">
            <span className="text-sm font-black text-artisan-text tracking-tight">
              Kaarigar <span className="text-terracotta">Bazaar</span>
            </span>
            <span className="text-[8px] bg-terracotta/10 text-terracotta px-1 py-0.2 rounded font-extrabold">
              BUYER
            </span>
          </div>
          <p className="text-[9px] text-artisan-muted font-medium -mt-0.5">
            Direct from Telangana Artisans
          </p>
        </div>
      </div>

      {/* Right Quick Controls */}
      <div className="flex items-center gap-2">
        {/* Compare Pill if any items selected */}
        {compareList.length > 0 && (
          <button
            onClick={() => openModal('compare')}
            className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300"
          >
            <Layers className="w-3 h-3" />
            <span>{compareList.length}</span>
          </button>
        )}

        {/* Voice Search Button */}
        <button
          onClick={() => openModal('voice_search')}
          className="w-7 h-7 rounded-lg bg-[#FAF7F2] border border-artisan-border text-terracotta flex items-center justify-center hover:bg-terracotta hover:text-white transition"
          title="Voice Search in Telugu/English"
        >
          <Mic className="w-3.5 h-3.5" />
        </button>

        {/* Language Switcher */}
        <div className="relative group">
          <button className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#FAF7F2] border border-artisan-border text-[10px] font-bold text-artisan-text">
            <Globe className="w-3 h-3 text-terracotta" />
            <span className="uppercase font-bold">
              {language === 'te' ? 'తెలుగు' : language === 'hi' ? 'हिन्दी' : 'EN'}
            </span>
          </button>
          <div className="absolute right-0 top-full mt-1 bg-white border border-artisan-border rounded-xl shadow-elevated py-1 w-24 hidden group-hover:block z-50">
            <button
              onClick={() => setLanguage('en')}
              className="w-full text-left px-2.5 py-1 text-[11px] font-bold hover:bg-terracotta/10 hover:text-terracotta"
            >
              English
            </button>
            <button
              onClick={() => setLanguage('te')}
              className="w-full text-left px-2.5 py-1 text-[11px] font-bold font-telugu hover:bg-terracotta/10 hover:text-terracotta"
            >
              తెలుగు
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className="w-full text-left px-2.5 py-1 text-[11px] font-bold hover:bg-terracotta/10 hover:text-terracotta"
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
`);

// 5. src/components/common/ScreenToolbar.tsx
writeFile('src/components/common/ScreenToolbar.tsx', `import React from 'react';
import { Smartphone, RotateCcw } from 'lucide-react';
import { BuyerNavTab } from '../../types';

interface ScreenToolbarProps {
  currentTab: BuyerNavTab;
  onSelectTab: (tab: BuyerNavTab) => void;
  showDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
}

export const ScreenToolbar: React.FC<ScreenToolbarProps> = ({
  currentTab,
  onSelectTab,
  showDeviceFrame,
  onToggleDeviceFrame,
}) => {
  const tabs: { id: BuyerNavTab; label: string }[] = [
    { id: 'home', label: '1. Discover' },
    { id: 'explore', label: '2. Explore & Search' },
    { id: 'cart', label: '3. Bag & Checkout' },
    { id: 'orders', label: '4. Live Tracking' },
    { id: 'artisans', label: '5. Artisan Studios' },
  ];

  return (
    <header className="w-full bg-[#181615] border-b border-neutral-800 text-neutral-200 px-4 py-2 z-50 select-none shadow-md">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-terracotta flex items-center justify-center text-white font-black text-xs">
            క
          </div>
          <div>
            <span className="font-extrabold text-white text-xs">Kaarigar Bazaar</span>
            <span className="text-[11px] text-neutral-400"> | Buyer Mobile App</span>
          </div>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
          {tabs.map((t) => {
            const isActive = currentTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => onSelectTab(t.id)}
                className={\`text-[11px] px-2.5 py-1 rounded-lg font-bold whitespace-nowrap transition-all \${
                  isActive
                    ? 'bg-terracotta text-white shadow-craft'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300'
                }\`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Frame Toggle */}
        <button
          onClick={onToggleDeviceFrame}
          className={\`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition flex items-center gap-1 \${
            showDeviceFrame
              ? 'bg-neutral-800 text-white border-neutral-700'
              : 'bg-terracotta/20 text-terracotta border-terracotta/40'
          }\`}
        >
          <Smartphone className="w-3 h-3" />
          <span>{showDeviceFrame ? 'Frame: ON' : 'Frame: OFF'}</span>
        </button>
      </div>
    </header>
  );
};
`);

// 6. src/components/screens/BuyerHomeScreen.tsx
writeFile('src/components/screens/BuyerHomeScreen.tsx', `import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Star } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CRAFT_CATEGORIES, ARTISANS } from '../../data/catalog';
import { ProductCard } from '../product/ProductCard';

export const BuyerHomeScreen: React.FC<{ onNavigateTab: (tab: any) => void }> = ({ onNavigateTab }) => {
  const { products, selectedCategory, setSelectedCategory, openModal } = useShop();
  const featuredArtisan = ARTISANS['art-lakshmi'];

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4 bg-artisan-bg select-none">
      {/* Editorial Hero Card */}
      <div className="bg-gradient-to-br from-[#FFFDFB] via-[#FAF7F2] to-[#F5ECE0] rounded-3xl p-4 border border-artisan-border shadow-soft relative overflow-hidden space-y-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-terracotta/10 text-terracotta text-[10px] font-bold">
            <Sparkles className="w-3 h-3" />
            <span>Direct Handcrafts • Zero Middlemen</span>
          </div>
          <h2 className="text-lg font-black text-artisan-text leading-snug">
            Where Every Thread Has a <span className="text-terracotta">Soul</span>.
          </h2>
          <p className="text-[11px] text-artisan-muted leading-relaxed">
            Support rural weavers &amp; woodblock masters in Telangana. 91% direct payout to makers.
          </p>
        </div>

        {/* Quick Hero Banner Product Preview */}
        <div 
          onClick={() => openModal('product_detail', products[0])}
          className="bg-white p-2.5 rounded-2xl border border-artisan-border flex items-center justify-between gap-3 shadow-xs cursor-pointer hover:border-terracotta/40 transition"
        >
          <img
            src="/assets/indigo_cushion.jpg"
            alt="Craft Highlight"
            className="w-14 h-14 rounded-xl object-cover border border-artisan-border shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-[9px] font-bold text-terracotta">
              <ShieldCheck className="w-3 h-3" />
              <span>GI Heritage Pochampally</span>
            </div>
            <h4 className="text-xs font-black text-artisan-text truncate">Indigo Floral Cushion Cover</h4>
            <span className="text-xs font-black text-artisan-text">₹620</span>
          </div>
          <button className="bg-terracotta text-white p-2 rounded-xl text-xs font-bold shadow-craft shrink-0">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-artisan-text uppercase tracking-wider">
            Heritage Categories
          </h3>
          <button
            onClick={() => onNavigateTab('explore')}
            className="text-[11px] font-bold text-terracotta hover:underline"
          >
            See All
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CRAFT_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={\`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-2xs \${
                  isActive
                    ? 'bg-terracotta text-white shadow-craft'
                    : 'bg-white text-artisan-text border border-artisan-border hover:border-terracotta/40'
                }\`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Meet Master Artisan Lakshmi Spotlight Card */}
      <div className="bg-white rounded-3xl p-3.5 border border-terracotta/30 shadow-soft space-y-2.5">
        <div className="flex items-center gap-3">
          <img
            src={featuredArtisan.avatar}
            alt={featuredArtisan.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-terracotta/40 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="inline-block text-[9px] font-bold px-2 py-0.2 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
              Verified Master Artisan
            </div>
            <h4 className="text-xs font-black text-artisan-text truncate mt-0.5">
              {featuredArtisan.name}
            </h4>
            <p className="text-[10px] text-artisan-muted truncate">{featuredArtisan.location}</p>
          </div>
          <button
            onClick={() => openModal('artisan_storefront', undefined, featuredArtisan)}
            className="bg-[#FAF7F2] text-terracotta border border-terracotta/30 px-2.5 py-1.5 rounded-xl text-[10px] font-bold hover:bg-terracotta hover:text-white transition shrink-0"
          >
            Studio
          </button>
        </div>

        <p className="text-[11px] text-artisan-text italic leading-relaxed bg-[#FAF7F2] p-2.5 rounded-xl border border-artisan-border/70">
          "{featuredArtisan.story.slice(0, 115)}..."
        </p>
      </div>

      {/* Trending Creations Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-artisan-text uppercase tracking-wider">
            Trending Creations
          </h3>
          <span className="text-[10px] text-artisan-muted font-semibold">100% Handcrafted</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
};
`);

// 7. src/components/screens/BuyerExploreScreen.tsx
writeFile('src/components/screens/BuyerExploreScreen.tsx', `import React from 'react';
import { Search, Mic, X, SlidersHorizontal } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../product/ProductCard';

export const BuyerExploreScreen: React.FC = () => {
  const { 
    products, 
    searchQuery, 
    setSearchQuery, 
    selectedCraft, 
    setSelectedCraft, 
    priceFilter, 
    setPriceFilter,
    openModal 
  } = useShop();

  const craftTypes = ['all', 'Hand Block-Print', 'Pochampally Ikat', 'Pen Kalamkari'];

  const filteredProducts = products.filter((p) => {
    if (selectedCraft !== 'all' && p.craftType !== selectedCraft) return false;
    if (p.price > priceFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        p.title.toLowerCase().includes(q) ||
        p.teluguTitle.toLowerCase().includes(q) ||
        p.craftType.toLowerCase().includes(q) ||
        p.artisanName.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-3 bg-artisan-bg select-none">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-artisan-muted absolute left-3.5 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Pochampally, indigo, silk..."
          className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white border border-artisan-border text-xs text-artisan-text placeholder:text-artisan-subtle outline-none focus:border-terracotta shadow-xs"
        />
        <button
          onClick={() => openModal('voice_search')}
          className="absolute right-2.5 p-1 rounded-lg text-terracotta hover:bg-terracotta/10 transition"
          title="Voice Search"
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>

      {/* Craft Technique Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {craftTypes.map((craft) => (
          <button
            key={craft}
            onClick={() => setSelectedCraft(craft)}
            className={\`px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap transition \${
              selectedCraft === craft
                ? 'bg-terracotta text-white shadow-2xs'
                : 'bg-white text-artisan-muted border border-artisan-border'
            }\`}
          >
            {craft === 'all' ? 'All Techniques' : craft}
          </button>
        ))}
      </div>

      {/* Price Filter Slider */}
      <div className="bg-white p-3 rounded-2xl border border-artisan-border flex items-center justify-between gap-3 text-xs">
        <span className="font-bold text-artisan-muted text-[11px] whitespace-nowrap">
          Max: <strong className="text-artisan-text">₹{priceFilter}</strong>
        </span>
        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={priceFilter}
          onChange={(e) => setPriceFilter(Number(e.target.value))}
          className="flex-1 accent-terracotta cursor-pointer"
        />
      </div>

      {/* Product Results */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-bold text-artisan-muted uppercase tracking-wider">
            {filteredProducts.length} Creations Available
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-artisan-border space-y-1">
            <p className="text-xs font-bold text-artisan-text">No crafts match filters</p>
            <p className="text-[10px] text-artisan-muted">Try resetting search or price</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
`);

// 8. src/components/screens/BuyerCartScreen.tsx
writeFile('src/components/screens/BuyerCartScreen.tsx', `import React from 'react';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const BuyerCartScreen: React.FC<{ onNavigateTab: (tab: any) => void }> = ({ onNavigateTab }) => {
  const { cart, updateCartQuantity, removeFromCart, getCartTotal, openModal } = useShop();
  const { subtotal, artisanShare, shipping, total } = getCartTotal();

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-artisan-bg select-none overflow-y-auto space-y-3">
      <div className="space-y-3 flex-1 overflow-y-auto">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-extrabold text-artisan-text">Your Shopping Bag</h2>
          <span className="text-xs font-bold text-terracotta bg-terracotta/10 px-2 py-0.5 rounded-full">
            {cart.reduce((s, i) => s + i.quantity, 0)} Items
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-artisan-border space-y-3 my-auto">
            <div className="w-14 h-14 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto">
              <ShoppingBag className="w-7 h-7" />
            </div>
            <h3 className="text-sm font-bold text-artisan-text">Your bag is empty</h3>
            <p className="text-xs text-artisan-muted max-w-xs mx-auto">
              Support master weavers by discovering authentic handmade creations.
            </p>
            <button
              onClick={() => onNavigateTab('home')}
              className="bg-terracotta text-white px-5 py-2 rounded-xl text-xs font-bold shadow-craft"
            >
              Explore Crafts
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-white p-3 rounded-2xl border border-artisan-border flex gap-3 items-center justify-between shadow-xs"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 rounded-xl object-cover border shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-0.5">
                  <h4 className="text-xs font-bold text-artisan-text truncate">
                    {item.product.title}
                  </h4>
                  <p className="text-[10px] text-artisan-muted">
                    By {item.product.artisanName}
                  </p>
                  <div className="text-xs font-black text-artisan-text">
                    ₹{item.product.price}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-neutral-400 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center border border-artisan-border rounded-xl bg-[#FAF7F2] p-0.5">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="w-5 h-5 flex items-center justify-center text-xs font-bold rounded bg-white"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="w-5 h-5 flex items-center justify-center text-xs font-bold rounded bg-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Sticky Price Summary & Checkout Bar */}
      {cart.length > 0 && (
        <div className="bg-white p-3.5 rounded-3xl border border-artisan-border shadow-soft space-y-2.5">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-artisan-muted">
              <span>Items Total</span>
              <span className="font-bold text-artisan-text">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-forest font-semibold">
              <span>Direct to Artisan Makers</span>
              <span>₹{artisanShare}</span>
            </div>
            <div className="flex justify-between text-artisan-muted">
              <span>Artisan Delivery</span>
              <span className="font-bold">{shipping === 0 ? 'FREE' : \`₹\${shipping}\`}</span>
            </div>
            <div className="pt-1 border-t border-artisan-border flex justify-between text-sm font-black text-artisan-text">
              <span>Total Payable</span>
              <span className="text-terracotta">₹{total}</span>
            </div>
          </div>

          <button
            onClick={() => openModal('checkout')}
            className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-3 rounded-2xl font-extrabold text-xs shadow-craft active:scale-95 transition flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
`);

// 9. src/components/screens/BuyerOrdersScreen.tsx
writeFile('src/components/screens/BuyerOrdersScreen.tsx', `import React, { useState } from 'react';
import { Package, CheckCircle2, Clock, MessageSquare, Send } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const BuyerOrdersScreen: React.FC = () => {
  const { orders } = useShop();
  const [noteSent, setNoteSent] = useState(false);
  const [noteText, setNoteText] = useState('');

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4 bg-artisan-bg select-none">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base font-extrabold text-artisan-text">Your Artisan Orders</h2>
        <span className="text-xs text-artisan-muted font-bold">{orders.length} Orders</span>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 text-center border border-artisan-border space-y-2 my-auto">
          <Package className="w-10 h-10 text-terracotta mx-auto opacity-70" />
          <p className="text-xs font-bold text-artisan-text">No active orders yet</p>
          <p className="text-[10px] text-artisan-muted">Place an order to see live artisan packing updates.</p>
        </div>
      ) : (
        orders.map((ord) => (
          <div key={ord.id} className="bg-white rounded-3xl p-4 border border-artisan-border shadow-soft space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-artisan-border">
              <div>
                <span className="text-xs font-black text-artisan-text block">Order #{ord.id}</span>
                <span className="text-[10px] text-artisan-muted">{ord.date} • {ord.paymentMethod}</span>
              </div>
              <span className="text-[10px] font-bold text-forest bg-forest/10 px-2.5 py-0.5 rounded-full border border-forest/20">
                Handcrafting in Progress
              </span>
            </div>

            {/* Items */}
            <div className="space-y-2">
              {ord.items.map((it, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={it.product.image} alt={it.product.title} className="w-10 h-10 rounded-xl object-cover border" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-artisan-text truncate">{it.product.title}</h4>
                    <span className="text-[10px] text-artisan-muted">Qty: {it.quantity} • ₹{it.product.price * it.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Live Progress Timeline */}
            <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-artisan-border space-y-2">
              <span className="text-[10px] font-bold text-artisan-muted uppercase">Artisan Progress</span>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2 text-forest font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Order Confirmed &amp; Payment Cleared</span>
                </div>
                <div className="flex items-center gap-2 text-terracotta font-bold">
                  <Clock className="w-3.5 h-3.5 animate-spin" />
                  <span>Artisan Lakshmi in Telangana hand-packing order</span>
                </div>
              </div>
            </div>

            {/* Send Note */}
            <div className="bg-[#FFFDFB] p-3 rounded-2xl border border-terracotta/20 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-terracotta">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Send Note to Lakshmi Devi</span>
              </div>

              {noteSent ? (
                <p className="text-[10px] font-bold text-forest">✓ Appreciation delivered to artisan's phone!</p>
              ) : (
                <div className="flex gap-1.5 pt-1">
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="e.g. Excited to receive this!"
                    className="flex-1 p-1.5 rounded-xl border border-artisan-border text-xs outline-none bg-white"
                  />
                  <button
                    onClick={() => {
                      if (noteText.trim()) setNoteSent(true);
                    }}
                    className="bg-terracotta text-white px-3 py-1.5 rounded-xl text-xs font-bold"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
`);

// 10. src/components/screens/BuyerArtisansScreen.tsx
writeFile('src/components/screens/BuyerArtisansScreen.tsx', `import React from 'react';
import { Award, MapPin, Star, Sparkles, ExternalLink } from 'lucide-react';
import { ARTISANS } from '../../data/catalog';
import { useShop } from '../../context/ShopContext';

export const BuyerArtisansScreen: React.FC = () => {
  const { openModal } = useShop();

  return (
    <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-3 bg-artisan-bg select-none">
      <div className="space-y-1 px-1">
        <h2 className="text-base font-extrabold text-artisan-text">Master Artisan Studios</h2>
        <p className="text-xs text-artisan-muted">Meet the faces behind the handmade heritage</p>
      </div>

      <div className="space-y-3">
        {Object.values(ARTISANS).map((artisan) => (
          <div
            key={artisan.id}
            onClick={() => openModal('artisan_storefront', undefined, artisan)}
            className="bg-white rounded-3xl p-4 border border-artisan-border shadow-soft space-y-3 cursor-pointer hover:border-terracotta/40 transition group"
          >
            <div className="flex items-center gap-3">
              <img
                src={artisan.avatar}
                alt={artisan.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-terracotta/40 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="inline-block text-[9px] font-bold px-2 py-0.2 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                  {artisan.badge}
                </span>
                <h3 className="text-sm font-black text-artisan-text group-hover:text-terracotta transition truncate mt-0.5">
                  {artisan.name}
                </h3>
                <div className="flex items-center gap-1 text-[11px] text-artisan-muted">
                  <MapPin className="w-3 h-3" />
                  <span>{artisan.location}</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-artisan-text leading-relaxed">
              {artisan.story.slice(0, 140)}...
            </p>

            <div className="bg-[#FAF7F2] p-2.5 rounded-2xl border border-artisan-border flex items-center justify-between text-xs">
              <span className="font-bold text-forest">★ {artisan.rating} / 5.0</span>
              <span className="font-semibold text-artisan-muted">{artisan.totalOrdersFulfilled}+ Orders Fulfilled</span>
              <span className="font-bold text-terracotta flex items-center gap-1">
                <span>View Studio</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
`);

// 11. src/App.tsx
writeFile('src/App.tsx', `import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { BuyerNavTab } from './types';

// Layout & Frame
import { MobileFrame } from './components/layout/MobileFrame';
import { BottomNav } from './components/layout/BottomNav';
import { MobileHeader } from './components/layout/MobileHeader';
import { ScreenToolbar } from './components/common/ScreenToolbar';

// Mobile Screens
import { BuyerHomeScreen } from './components/screens/BuyerHomeScreen';
import { BuyerExploreScreen } from './components/screens/BuyerExploreScreen';
import { BuyerCartScreen } from './components/screens/BuyerCartScreen';
import { BuyerOrdersScreen } from './components/screens/BuyerOrdersScreen';
import { BuyerArtisansScreen } from './components/screens/BuyerArtisansScreen';

// Modals & Bottom Sheets
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderTrackingModal } from './components/orders/OrderTrackingModal';
import { ArtisanStorefrontModal } from './components/artisan/ArtisanStorefrontModal';
import { ProductCompareDrawer } from './components/product/ProductCompareDrawer';
import { VoiceSearchModal } from './components/common/VoiceSearchModal';

const BuyerAppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<BuyerNavTab>('home');
  const [showDeviceFrame, setShowDeviceFrame] = useState(true);

  return (
    <div className="min-h-screen bg-[#141312] flex flex-col font-sans">
      {/* Top Screen Toolbar */}
      <ScreenToolbar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        showDeviceFrame={showDeviceFrame}
        onToggleDeviceFrame={() => setShowDeviceFrame(!showDeviceFrame)}
      />

      {/* Main Container with Mobile Frame */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <MobileFrame currentTime="9:41" showDeviceFrame={showDeviceFrame}>
          {/* Mobile Header Bar */}
          <MobileHeader />

          {/* Active Screen View */}
          {currentTab === 'home' && <BuyerHomeScreen onNavigateTab={setCurrentTab} />}
          {currentTab === 'explore' && <BuyerExploreScreen />}
          {currentTab === 'cart' && <BuyerCartScreen onNavigateTab={setCurrentTab} />}
          {currentTab === 'orders' && <BuyerOrdersScreen />}
          {currentTab === 'artisans' && <BuyerArtisansScreen />}

          {/* Bottom Navigation */}
          <BottomNav
            currentTab={currentTab}
            onSelectTab={(tab) => setCurrentTab(tab)}
          />
        </MobileFrame>
      </main>

      {/* Global Interactive Overlays */}
      <ProductDetailModal />
      <CheckoutModal />
      <OrderTrackingModal />
      <ArtisanStorefrontModal />
      <ProductCompareDrawer />
      <VoiceSearchModal />
    </div>
  );
};

export function App() {
  return (
    <ShopProvider>
      <BuyerAppContent />
    </ShopProvider>
  );
}

export default App;
`);

console.log('Successfully transformed Kaarigar-Buyer into full mobile application layout!');
