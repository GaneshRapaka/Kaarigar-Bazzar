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
  console.log(`Created: ${relPath}`);
}

// 1. src/components/layout/Navbar.tsx
writeFile('src/components/layout/Navbar.tsx', `import React, { useState } from 'react';
import { 
  Search, 
  Mic, 
  ShoppingBag, 
  Heart, 
  SlidersHorizontal, 
  Globe, 
  Sparkles, 
  Package,
  Layers,
  Menu,
  X
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const Navbar: React.FC = () => {
  const { 
    cart, 
    wishlist, 
    compareList, 
    orders,
    openModal, 
    language, 
    setLanguage, 
    searchQuery, 
    setSearchQuery 
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-artisan-border/70 shadow-xs">
      {/* Top Banner */}
      <div className="bg-[#1F3A52] text-white text-[11px] py-1.5 px-4 font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>🌿 100% Direct from Artisan Co-operatives | 90%+ Direct Maker Compensation</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-white/80">
            <span>Free Shipping across India &gt; ₹999</span>
            <span className="text-white/40">•</span>
            <button 
              onClick={() => orders.length > 0 ? openModal('order_tracking', undefined, undefined, orders[0]) : alert('No orders yet!')}
              className="hover:text-amber-300 transition flex items-center gap-1"
            >
              <Package className="w-3 h-3" />
              <span>Track Orders ({orders.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-2xl bg-terracotta flex items-center justify-center text-white font-extrabold text-xl shadow-craft">
            క
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg sm:text-xl font-black text-artisan-text tracking-tight">
                Kaarigar <span className="text-terracotta">Bazaar</span>
              </span>
              <span className="text-[9px] bg-terracotta/10 text-terracotta px-1.5 py-0.5 rounded font-bold border border-terracotta/20">
                BUYER
              </span>
            </div>
            <p className="text-[10px] text-artisan-muted font-medium -mt-0.5">
              Telangana & Indian Heritage Crafts
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-artisan-muted absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Pochampally silk, indigo cushion, kalamkari..."
              className="w-full pl-10 pr-11 py-2.5 rounded-full bg-[#FAF7F2] border border-artisan-border focus:border-terracotta focus:bg-white text-xs text-artisan-text placeholder:text-artisan-subtle transition outline-none shadow-inner"
            />
            <button
              onClick={() => openModal('voice_search')}
              title="Voice Search in Telugu / Hindi / English"
              className="absolute right-2 p-1.5 rounded-full bg-terracotta/10 text-terracotta hover:bg-terracotta hover:text-white transition group"
            >
              <Mic className="w-3.5 h-3.5 group-hover:scale-110 transition" />
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Button */}
          <button 
            onClick={() => openModal('voice_search')}
            className="md:hidden p-2 rounded-xl bg-[#FAF7F2] border border-artisan-border text-terracotta"
            title="Voice Search"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Language Selector */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#FAF7F2] border border-artisan-border text-xs font-bold text-artisan-text hover:border-terracotta/40 transition">
              <Globe className="w-3.5 h-3.5 text-terracotta" />
              <span className="text-[11px] uppercase">
                {language === 'te' ? 'తెలుగు' : language === 'hi' ? 'हिन्दी' : 'EN'}
              </span>
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white border border-artisan-border rounded-xl shadow-elevated py-1 w-28 hidden group-hover:block z-50 animate-fadeIn">
              <button
                onClick={() => setLanguage('en')}
                className={\`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-terracotta/10 hover:text-terracotta transition \${language === 'en' ? 'text-terracotta font-bold' : 'text-artisan-text'}\`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={\`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-terracotta/10 hover:text-terracotta font-telugu transition \${language === 'te' ? 'text-terracotta font-bold' : 'text-artisan-text'}\`}
              >
                తెలుగు (Telugu)
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={\`w-full text-left px-3 py-1.5 text-xs font-semibold hover:bg-terracotta/10 hover:text-terracotta transition \${language === 'hi' ? 'text-terracotta font-bold' : 'text-artisan-text'}\`}
              >
                हिन्दी (Hindi)
              </button>
            </div>
          </div>

          {/* Compare Button */}
          {compareList.length > 0 && (
            <button
              onClick={() => openModal('compare')}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold hover:bg-amber-100 transition animate-bounce"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Compare</span>
              <span className="w-4 h-4 rounded-full bg-amber-700 text-white text-[10px] flex items-center justify-center font-bold">
                {compareList.length}
              </span>
            </button>
          )}

          {/* Orders Tracking Pill */}
          {orders.length > 0 && (
            <button
              onClick={() => openModal('order_tracking', undefined, undefined, orders[0])}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-artisan-border text-xs font-bold text-artisan-text hover:border-forest/50 transition"
              title="Track Your Artisan Orders"
            >
              <Package className="w-3.5 h-3.5 text-forest" />
              <span>Track ({orders.length})</span>
            </button>
          )}

          {/* Cart Bag Button */}
          <button
            onClick={() => openModal('cart')}
            className="flex items-center gap-2 bg-terracotta hover:bg-terracotta-hover text-white px-3.5 py-2 rounded-2xl font-bold text-xs shadow-craft active:scale-95 transition"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="w-5 h-5 rounded-full bg-white text-terracotta text-[10px] font-black flex items-center justify-center shadow-xs">
              {totalCartItems}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
`);

// 2. src/components/layout/Footer.tsx
writeFile('src/components/layout/Footer.tsx', `import React from 'react';
import { ShieldCheck, HeartHandshake, Leaf, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#181615] text-neutral-300 pt-12 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-neutral-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-terracotta/20 text-terracotta flex items-center justify-center shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct to Maker</h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                90%+ payout reaches master artisans directly with no middlemen exploitation.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-dye/40 text-blue-300 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">GI Authenticity</h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Govt-recognized Geographical Indication protection for Pochampally, Kalamkari & more.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Eco-Natural</h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Fermented indigo, turmeric, organic cotton, and zero petroleum microplastics.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-950 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Verified Heritage</h4>
              <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                Every order is tracked from the artisan's loom directly to your doorstep.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-terracotta text-white font-bold text-xs flex items-center justify-center">
              క
            </div>
            <span className="text-white font-bold">Kaarigar Bazaar</span>
            <span>— SIH 2026 AI-Powered Artisan Commerce Initiative</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Telangana Handloom Directorate</span>
            <span>GI Craft Registry</span>
            <span>Fair Trade Alliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
`);

console.log('Navbar and Footer written.');
