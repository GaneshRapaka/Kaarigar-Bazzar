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

// 1. src/components/home/HeroBanner.tsx
writeFile('src/components/home/HeroBanner.tsx', `import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const HeroBanner: React.FC = () => {
  const { openModal } = useShop();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDFB] via-[#FAF7F2] to-[#F5EDE1] border-b border-artisan-border/60 py-10 sm:py-16">
      {/* Decorative Traditional Motif Background */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-terracotta/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-mustard/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Story & Call to Action */}
          <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta/10 text-terracotta border border-terracotta/20 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-terracotta animate-spin" style={{ animationDuration: '6s' }} />
              <span>Telangana Heritage Craft Showcase • SIH 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-artisan-text leading-[1.15] tracking-tight">
              Where Every Thread Has a <span className="text-terracotta">Soul</span>, and Every Maker Has a <span className="text-indigo-dye">Name</span>.
            </h1>

            <p className="text-xs sm:text-base text-artisan-muted leading-relaxed max-w-2xl mx-auto lg:mx-0 font-medium">
              Bypass industrial middlemen. Buy directly from verified rural Indian weavers and woodblock printers. Enjoy pure organic dyes, certified GI heritage handlooms, and radical price transparency.
            </p>

            {/* Quick Action Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
              <span className="px-3 py-1 rounded-xl bg-white border border-artisan-border font-bold text-artisan-text shadow-2xs">
                🏷️ 91% Direct Artisan Payout
              </span>
              <span className="px-3 py-1 rounded-xl bg-white border border-artisan-border font-bold text-artisan-text shadow-2xs">
                🏛️ GI-Tagged Pochampally Silk
              </span>
              <span className="px-3 py-1 rounded-xl bg-white border border-artisan-border font-bold text-artisan-text shadow-2xs">
                🌿 Natural Fermented Indigo
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#catalog"
                className="w-full sm:w-auto bg-terracotta hover:bg-terracotta-hover text-white px-7 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm shadow-craft active:scale-95 transition flex items-center justify-center gap-2"
              >
                <span>Shop Authentic Creations</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => openModal('artisan_storefront')}
                className="w-full sm:w-auto bg-white hover:bg-[#FAF7F2] text-artisan-text border-2 border-artisan-border px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm shadow-soft transition flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4 text-terracotta" />
                <span>Meet Master Artisan Lakshmi</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Main Visual Card */}
              <div className="bg-white rounded-3xl p-3 border-2 border-artisan-border shadow-elevated overflow-hidden group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                  <img
                    src="/assets/indigo_cushion.jpg"
                    alt="Authentic Indigo Cushion"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-terracotta border border-terracotta/20 flex items-center gap-1 shadow-sm">
                    <ShieldCheck className="w-3 h-3" />
                    <span>GI Heritage Telangana</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md p-2.5 rounded-xl text-white flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold leading-tight">Indigo Floral Cushion Cover</p>
                      <p className="text-[10px] text-neutral-300">Carved Teakwood Block Print</p>
                    </div>
                    <span className="text-sm font-extrabold text-amber-300">₹620</span>
                  </div>
                </div>

                {/* Micro Artisan Credential */}
                <div className="mt-3 p-2 bg-[#FAF7F2] rounded-xl flex items-center justify-between gap-3 border border-artisan-border/70">
                  <div className="flex items-center gap-2.5">
                    <img
                      src="/assets/artisan_lakshmi.jpg"
                      alt="Artisan Lakshmi"
                      className="w-8 h-8 rounded-full object-cover border border-terracotta/40"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-artisan-text">Lakshmi Devi</h4>
                      <p className="text-[10px] text-artisan-muted">Pochampally • 3rd Gen Master</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-forest bg-forest/10 px-2 py-0.5 rounded-md">
                    ₹564 (91%) to Artisan
                  </span>
                </div>
              </div>

              {/* Floating Floating Pill */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md border border-artisan-border p-3 rounded-2xl shadow-soft hidden sm:flex items-center gap-3 animate-pulse">
                <div className="w-9 h-9 rounded-full bg-forest-light text-forest flex items-center justify-center font-bold text-sm">
                  100%
                </div>
                <div>
                  <p className="text-xs font-bold text-artisan-text">Zero Synthetic Dyes</p>
                  <p className="text-[10px] text-artisan-muted">Pure plant fermentation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
`);

// 2. src/components/home/CraftCategories.tsx
writeFile('src/components/home/CraftCategories.tsx', `import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CRAFT_CATEGORIES } from '../../data/catalog';
import { Sparkles, Home, Shirt, Crown, Layers } from 'lucide-react';

export const CraftCategories: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useShop();

  const getIcon = (id: string) => {
    switch (id) {
      case 'Home Décor': return <Home className="w-4 h-4" />;
      case 'Apparel': return <Shirt className="w-4 h-4" />;
      case 'Heritage Sarees': return <Crown className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="py-6 border-b border-artisan-border/60 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between pb-3">
          <div>
            <h3 className="text-xs font-bold text-artisan-muted uppercase tracking-wider">
              Browse by Heritage Category
            </h3>
          </div>
          <span className="text-[11px] text-terracotta font-semibold">
            All Handcrafted &amp; Verified
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CRAFT_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={\`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all shadow-2xs \${
                  isActive
                    ? 'bg-terracotta text-white shadow-craft scale-102'
                    : 'bg-[#FAF7F2] text-artisan-text border border-artisan-border hover:border-terracotta/40 hover:bg-white'
                }\`}
              >
                <span className={isActive ? 'text-white' : 'text-terracotta'}>
                  {getIcon(cat.id)}
                </span>
                <span>{cat.name}</span>
                <span className={\`text-[10px] px-1.5 py-0.2 rounded-full \${
                  isActive ? 'bg-white/20 text-white' : 'bg-neutral-200 text-artisan-muted'
                }\`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
`);

// 3. src/components/home/ArtisanSpotlight.tsx
writeFile('src/components/home/ArtisanSpotlight.tsx', `import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ARTISANS } from '../../data/catalog';
import { Award, MapPin, Sparkles, Volume2, ArrowRight } from 'lucide-react';

export const ArtisanSpotlight: React.FC = () => {
  const { openModal } = useShop();
  const artisan = ARTISANS['art-lakshmi'];

  return (
    <section className="py-10 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border-2 border-terracotta/20 shadow-soft overflow-hidden p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Avatar & Artisan Credential */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-3">
              <div className="relative">
                <img
                  src={artisan.avatar}
                  alt={artisan.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-terracotta/30 shadow-md"
                />
                <div className="absolute bottom-0 right-2 bg-terracotta text-white p-2 rounded-full shadow-craft">
                  <Award className="w-5 h-5" />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-artisan-text">{artisan.name}</h3>
                <p className="text-xs text-terracotta font-bold">{artisan.title}</p>
                <div className="flex items-center justify-center gap-1 text-artisan-muted text-xs font-medium mt-1">
                  <MapPin className="w-3.5 h-3.5 text-artisan-muted" />
                  <span>{artisan.location}</span>
                </div>
              </div>

              <div className="inline-block text-[11px] font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                {artisan.badge}
              </div>
            </div>

            {/* Story & Philosophy */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-terracotta uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Master Artisan of the Month</span>
              </div>

              <blockquote className="text-base sm:text-lg font-medium text-artisan-text italic leading-relaxed font-serif border-l-4 border-terracotta pl-4">
                "{artisan.story}"
              </blockquote>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-artisan-border">
                  <span className="text-[10px] uppercase font-bold text-artisan-muted block">Craft Heritage</span>
                  <span className="text-xs font-bold text-artisan-text">{artisan.heritageGeneration}</span>
                </div>
                <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-artisan-border">
                  <span className="text-[10px] uppercase font-bold text-artisan-muted block">Direct Orders</span>
                  <span className="text-xs font-bold text-artisan-text">{artisan.totalOrdersFulfilled}+ Homes</span>
                </div>
                <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-artisan-border col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold text-artisan-muted block">Customer Rating</span>
                  <span className="text-xs font-bold text-forest">★ {artisan.rating} / 5.0</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => openModal('artisan_storefront', undefined, artisan)}
                  className="bg-terracotta hover:bg-terracotta-hover text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-craft transition flex items-center gap-2"
                >
                  <span>Visit Lakshmi Devi's Studio</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
`);

// 4. src/components/home/FilterBar.tsx
writeFile('src/components/home/FilterBar.tsx', `import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Filter, X, SlidersHorizontal } from 'lucide-react';

export const FilterBar: React.FC = () => {
  const { 
    selectedCraft, 
    setSelectedCraft, 
    priceFilter, 
    setPriceFilter, 
    searchQuery, 
    setSearchQuery,
    products 
  } = useShop();

  const craftTypes = ['all', 'Hand Block-Print', 'Pochampally Ikat', 'Pen Kalamkari'];

  const hasActiveFilters = selectedCraft !== 'all' || priceFilter < 5000 || searchQuery !== '';

  return (
    <div className="bg-white border-b border-artisan-border/70 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4">
        {/* Craft filter pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <span className="text-xs font-bold text-artisan-muted mr-1 hidden sm:inline">Craft:</span>
          {craftTypes.map((craft) => (
            <button
              key={craft}
              onClick={() => setSelectedCraft(craft)}
              className={\`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition \${
                selectedCraft === craft
                  ? 'bg-terracotta text-white shadow-2xs font-bold'
                  : 'bg-[#FAF7F2] text-artisan-muted hover:text-artisan-text border border-artisan-border'
              }\`}
            >
              {craft === 'all' ? 'All Techniques' : craft}
            </button>
          ))}
        </div>

        {/* Price Slider */}
        <div className="flex items-center gap-3 text-xs">
          <span className="font-semibold text-artisan-muted whitespace-nowrap">
            Max Price: <strong className="text-artisan-text">₹{priceFilter}</strong>
          </span>
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={priceFilter}
            onChange={(e) => setPriceFilter(Number(e.target.value))}
            className="w-24 sm:w-36 accent-terracotta cursor-pointer"
          />

          {hasActiveFilters && (
            <button
              onClick={() => {
                setSelectedCraft('all');
                setPriceFilter(5000);
                setSearchQuery('');
              }}
              className="flex items-center gap-1 text-[11px] text-terracotta font-bold hover:underline ml-2"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
`);

// 5. src/components/product/CraftStoryAudio.tsx
writeFile('src/components/product/CraftStoryAudio.tsx', `import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';

interface CraftStoryAudioProps {
  artisanName: string;
  craftTitle: string;
}

export const CraftStoryAudio: React.FC<CraftStoryAudioProps> = ({ artisanName, craftTitle }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 2;
        });
      }, 200);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-gradient-to-r from-[#FFFDFB] to-[#FAF7F2] p-3.5 rounded-2xl border border-terracotta/30 shadow-2xs space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-terracotta/15 flex items-center justify-center text-terracotta">
            <Volume2 className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-artisan-text">Listen to the Artisan's Voice Note</h4>
            <p className="text-[10px] text-artisan-muted">{artisanName} explains this craft in Telugu &amp; English</p>
          </div>
        </div>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-full bg-terracotta text-white flex items-center justify-center shadow-craft hover:bg-terracotta-hover transition active:scale-95"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
      </div>

      {/* Sound Waves Animation */}
      <div className="flex items-center gap-1 h-5 px-1 bg-white/70 rounded-lg border border-artisan-border/50">
        {[20, 60, 90, 40, 100, 75, 30, 85, 50, 95, 40, 70, 30, 80, 50].map((h, i) => (
          <div
            key={i}
            className={\`w-1 rounded-full transition-all duration-300 \${
              isPlaying ? 'bg-terracotta animate-pulse' : 'bg-neutral-300'
            }\`}
            style={{
              height: isPlaying ? \`\${h}%\` : '25%',
              animationDelay: \`\${i * 0.08}s\`
            }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between text-[10px] text-artisan-muted font-medium">
        <span>{isPlaying ? 'Speaking: "We carve each wooden block from seasoned teak..."' : 'Tap play to hear the weaving process'}</span>
        <span>0:24</span>
      </div>
    </div>
  );
};
`);

// 6. src/components/product/ProductCard.tsx
writeFile('src/components/product/ProductCard.tsx', `import React from 'react';
import { ProductItem } from '../../types';
import { useShop } from '../../context/ShopContext';
import { Star, ShieldCheck, Heart, Eye, ShoppingBag, Layers } from 'lucide-react';

interface ProductCardProps {
  product: ProductItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    openModal, 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    compareList, 
    toggleCompare,
    language 
  } = useShop();

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.some((p) => p.id === product.id);

  const displayTitle = language === 'te' 
    ? product.teluguTitle 
    : language === 'hi' 
    ? product.hindiTitle 
    : product.title;

  return (
    <div className="bg-white rounded-3xl border border-artisan-border hover:border-terracotta/40 shadow-soft hover:shadow-elevated transition-all duration-300 flex flex-col justify-between overflow-hidden group">
      {/* Top Image & Badges */}
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden cursor-pointer" onClick={() => openModal('product_detail', product)}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Authenticity Tag */}
        {product.isGiTagged && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-terracotta border border-terracotta/20 flex items-center gap-1 shadow-xs">
            <ShieldCheck className="w-3 h-3" />
            <span>GI Certified</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-artisan-text hover:text-terracotta transition shadow-xs"
        >
          <Heart className={\`w-4 h-4 \${isWishlisted ? 'fill-terracotta text-terracotta' : ''}\`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openModal('product_detail', product);
            }}
            className="flex-1 bg-black/75 hover:bg-black text-white text-[11px] font-bold py-2 rounded-xl backdrop-blur-md flex items-center justify-center gap-1.5 shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Story &amp; Details</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5">
          {/* Artisan Credit */}
          <div 
            onClick={() => openModal('artisan_storefront')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          >
            <img
              src={product.artisanAvatar}
              alt={product.artisanName}
              className="w-5 h-5 rounded-full object-cover border border-terracotta/40"
            />
            <span className="text-[11px] font-semibold text-artisan-muted hover:text-terracotta">
              By {product.artisanName} ({product.district})
            </span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => openModal('product_detail', product)}
            className="text-sm font-extrabold text-artisan-text leading-snug line-clamp-1 hover:text-terracotta cursor-pointer transition"
          >
            {displayTitle}
          </h3>

          {/* Craft Tag & Rating */}
          <div className="flex items-center justify-between text-xs pt-0.5">
            <span className="text-[10px] font-bold text-artisan-muted bg-[#FAF7F2] px-2 py-0.5 rounded-md border border-artisan-border/60">
              {product.craftType}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-artisan-text">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-artisan-subtle font-normal">({product.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Price & Direct Artisan Payout */}
        <div className="pt-2 border-t border-artisan-border/60 space-y-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-artisan-text">₹{product.price}</span>
              <span className="text-xs text-artisan-subtle line-through">₹{product.originalPrice}</span>
            </div>
            <span className="text-[10px] font-extrabold text-forest bg-forest/10 px-2 py-0.5 rounded-full border border-forest/20">
              ₹{Math.round((product.price * product.artisanSharePercent) / 100)} to Artisan
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => addToCart(product)}
              className="flex-1 bg-terracotta hover:bg-terracotta-hover text-white py-2.5 px-3 rounded-xl font-bold text-xs shadow-craft active:scale-95 transition flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={() => toggleCompare(product)}
              className={\`p-2.5 rounded-xl border transition \${
                isCompared
                  ? 'bg-amber-100 border-amber-400 text-amber-900'
                  : 'bg-[#FAF7F2] border-artisan-border text-artisan-muted hover:text-artisan-text'
              }\`}
              title="Compare with another craft"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
`);

console.log('Part 2 components generated.');
