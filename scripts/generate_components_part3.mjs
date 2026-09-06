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

// 1. src/components/product/ProductDetailModal.tsx
writeFile('src/components/product/ProductDetailModal.tsx', `import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  X, 
  ShieldCheck, 
  Star, 
  Heart, 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  Leaf, 
  Info,
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CraftStoryAudio } from './CraftStoryAudio';
import { REVIEWS } from '../../data/catalog';

export const ProductDetailModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    selectedProduct, 
    addToCart, 
    openModal,
    wishlist,
    toggleWishlist,
    language 
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'story' | 'materials' | 'transparency' | 'reviews'>('story');

  if (activeModal !== 'product_detail' || !selectedProduct) return null;

  const isWishlisted = wishlist.includes(selectedProduct.id);
  const displayTitle = language === 'te' 
    ? selectedProduct.teluguTitle 
    : language === 'hi' 
    ? selectedProduct.hindiTitle 
    : selectedProduct.title;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl border border-artisan-border shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        {/* Modal Top Bar */}
        <div className="p-4 border-b border-artisan-border flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-terracotta bg-terracotta/10 px-2.5 py-0.5 rounded-full border border-terracotta/20">
              {selectedProduct.craftType}
            </span>
            <span className="text-xs text-artisan-muted">•</span>
            <span className="text-xs text-artisan-muted font-medium">{selectedProduct.state}</span>
          </div>

          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 flex items-center justify-center text-artisan-text border border-artisan-border transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content Scrollable Area */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Image Column */}
            <div className="md:col-span-6 space-y-3">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-artisan-border relative bg-neutral-100">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
                {selectedProduct.isGiTagged && (
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-terracotta border border-terracotta/20 flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>GI Registered Heritage Product</span>
                  </div>
                )}
              </div>

              {/* Spoken Craft Story Audio */}
              <CraftStoryAudio
                artisanName={selectedProduct.artisanName}
                craftTitle={selectedProduct.title}
              />

              {/* Artisan Profile Card Link */}
              <div 
                onClick={() => openModal('artisan_storefront')}
                className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-artisan-border flex items-center justify-between cursor-pointer hover:border-terracotta/40 transition group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={selectedProduct.artisanAvatar}
                    alt={selectedProduct.artisanName}
                    className="w-11 h-11 rounded-full object-cover border-2 border-terracotta/30"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-artisan-text group-hover:text-terracotta transition">
                      Crafted by {selectedProduct.artisanName}
                    </h4>
                    <p className="text-[11px] text-artisan-muted">{selectedProduct.artisanLocation}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-terracotta">
                  <span>Visit Studio</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            </div>

            {/* Right Details Column */}
            <div className="md:col-span-6 space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-artisan-text leading-tight">
                  {displayTitle}
                </h2>
                {language !== 'en' && (
                  <p className="text-xs text-artisan-muted mt-0.5 font-medium">{selectedProduct.title}</p>
                )}

                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 text-xs font-bold text-artisan-text">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{selectedProduct.rating}</span>
                    <span className="text-artisan-subtle font-normal">({selectedProduct.reviewsCount} customer reviews)</span>
                  </div>
                  <span className="text-neutral-300">•</span>
                  <span className="text-xs font-bold text-forest flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>In Stock (Made to Order)</span>
                  </span>
                </div>
              </div>

              {/* Price & Artisan Fair-Share */}
              <div className="bg-[#FFFDFB] p-4 rounded-2xl border border-terracotta/30 shadow-xs space-y-2">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-artisan-text">₹{selectedProduct.price}</span>
                    <span className="text-sm text-artisan-subtle line-through">₹{selectedProduct.originalPrice}</span>
                    <span className="text-xs font-bold text-terracotta">
                      {Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% off
                    </span>
                  </div>

                  <span className="text-xs font-bold text-forest bg-forest/10 px-2.5 py-1 rounded-full border border-forest/20">
                    ₹{Math.round((selectedProduct.price * selectedProduct.artisanSharePercent) / 100)} to Maker
                  </span>
                </div>

                <p className="text-[11px] text-artisan-muted leading-relaxed">
                  ✓ Includes direct fair wages, organic material sourcing, and zero platform exploitation fee.
                </p>
              </div>

              {/* Quantity Selector & Add to Bag */}
              <div className="flex items-center gap-3 pt-1">
                <div className="flex items-center border border-artisan-border rounded-2xl bg-[#FAF7F2] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-xl bg-white text-artisan-text font-bold hover:bg-neutral-100 flex items-center justify-center transition"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-black text-artisan-text">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-xl bg-white text-artisan-text font-bold hover:bg-neutral-100 flex items-center justify-center transition"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(selectedProduct, quantity);
                    openModal('cart');
                  }}
                  className="flex-1 bg-terracotta hover:bg-terracotta-hover text-white py-3 px-5 rounded-2xl font-extrabold text-xs sm:text-sm shadow-craft active:scale-95 transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag (₹{selectedProduct.price * quantity})</span>
                </button>

                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className="p-3 rounded-2xl border border-artisan-border hover:border-terracotta/40 text-artisan-text transition"
                >
                  <Heart className={\`w-4 h-4 \${isWishlisted ? 'fill-terracotta text-terracotta' : ''}\`} />
                </button>
              </div>

              {/* Tab Navigation */}
              <div className="pt-3 border-t border-artisan-border">
                <div className="flex gap-2 border-b border-artisan-border pb-1">
                  {(['story', 'materials', 'transparency', 'reviews'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={\`text-xs font-bold px-3 py-1.5 rounded-xl capitalize transition \${
                        activeTab === tab
                          ? 'bg-terracotta text-white shadow-2xs'
                          : 'text-artisan-muted hover:text-artisan-text bg-[#FAF7F2]'
                      }\`}
                    >
                      {tab === 'story' ? 'Craft Story' : tab === 'materials' ? 'Technique & Care' : tab === 'transparency' ? 'Cost Breakup' : 'Reviews'}
                    </button>
                  ))}
                </div>

                {/* Tab 1: Story */}
                {activeTab === 'story' && (
                  <div className="pt-3 space-y-2 text-xs text-artisan-text leading-relaxed">
                    <p>{selectedProduct.story}</p>
                    <div className="bg-[#FAF7F2] p-3 rounded-xl border border-artisan-border space-y-1 mt-2">
                      <span className="text-[10px] font-bold text-terracotta uppercase">Time Investment</span>
                      <p className="text-xs font-bold text-artisan-text">
                        ⏱️ Handcrafted over {selectedProduct.craftHours} hours of patient artisanal labor.
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab 2: Materials & Technique */}
                {activeTab === 'materials' && (
                  <div className="pt-3 space-y-2 text-xs text-artisan-text">
                    <div className="space-y-1">
                      <span className="text-[11px] font-bold text-artisan-muted uppercase">Materials Used:</span>
                      <ul className="list-disc list-inside space-y-0.5 text-xs text-artisan-text">
                        {selectedProduct.materials.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-artisan-muted uppercase">Weaving / Print Technique:</span>
                      <p className="text-xs text-artisan-text mt-0.5">{selectedProduct.techniqueDetails}</p>
                    </div>
                    <div className="pt-2">
                      <span className="text-[11px] font-bold text-artisan-muted uppercase">Washing &amp; Care:</span>
                      <p className="text-xs text-artisan-text mt-0.5">{selectedProduct.careInstructions}</p>
                    </div>
                  </div>
                )}

                {/* Tab 3: Radical Price Transparency */}
                {activeTab === 'transparency' && (
                  <div className="pt-3 space-y-2 text-xs">
                    <p className="text-[11px] text-artisan-muted">
                      Unlike conventional e-commerce where artisans get &lt; 15%, Kaarigar Bazaar discloses the complete economic flow:
                    </p>
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between p-2 rounded-lg bg-[#FAF7F2]">
                        <span>Organic Raw Materials &amp; Dyes</span>
                        <span className="font-bold">₹{Math.round(selectedProduct.costPrice * 0.55)}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded-lg bg-[#FAF7F2]">
                        <span>Direct Artisan Wage &amp; Time</span>
                        <span className="font-bold text-forest">₹{Math.round(selectedProduct.profit + selectedProduct.costPrice * 0.45)}</span>
                      </div>
                      <div className="flex justify-between p-2 rounded-lg bg-[#FAF7F2]">
                        <span>Cooperative Fund &amp; Logistics</span>
                        <span className="font-bold">₹{selectedProduct.price - (selectedProduct.costPrice + selectedProduct.profit)}</span>
                      </div>
                      <div className="flex justify-between p-2.5 rounded-xl bg-terracotta/10 border border-terracotta/30 text-terracotta font-extrabold">
                        <span>Final Transparent Retail Price</span>
                        <span>₹{selectedProduct.price}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 4: Reviews */}
                {activeTab === 'reviews' && (
                  <div className="pt-3 space-y-3">
                    {REVIEWS.map((rev) => (
                      <div key={rev.id} className="p-3 bg-[#FAF7F2] rounded-2xl border border-artisan-border space-y-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-artisan-text">{rev.author}</span>
                            <span className="text-[10px] text-forest font-bold bg-forest/10 px-1.5 py-0.2 rounded">Verified Buyer</span>
                          </div>
                          <span className="text-[10px] text-artisan-muted">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-artisan-text leading-relaxed mt-1">"{rev.comment}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
`);

// 2. src/components/cart/CartDrawer.tsx
writeFile('src/components/cart/CartDrawer.tsx', `import React from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    getCartTotal,
    openModal 
  } = useShop();

  if (activeModal !== 'cart') return null;

  const { subtotal, artisanShare, shipping, total } = getCartTotal();

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-artisan-border flex items-center justify-between bg-[#FAF7F2]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-terracotta" />
            <h3 className="text-sm font-extrabold text-artisan-text">Your Artisan Bag</h3>
            <span className="text-xs bg-terracotta/10 text-terracotta px-2 py-0.5 rounded-full font-bold">
              {cart.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 flex items-center justify-center text-artisan-text border border-artisan-border transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-artisan-text">Your bag is empty</h4>
              <p className="text-xs text-artisan-muted max-w-xs mx-auto">
                Explore handloom scarves, indigo cushions, and handcrafted heritage treasures.
              </p>
              <button
                onClick={closeModal}
                className="mt-2 bg-terracotta text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Start Exploring
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-[#FAF7F2] p-3 rounded-2xl border border-artisan-border/80 flex gap-3 items-center justify-between"
              >
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-16 h-16 rounded-xl object-cover border border-artisan-border shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-bold text-artisan-text truncate">
                    {item.product.title}
                  </h4>
                  <p className="text-[10px] text-artisan-muted truncate">
                    By {item.product.artisanName} ({item.product.state})
                  </p>
                  <div className="text-xs font-black text-artisan-text">
                    ₹{item.product.price}
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-neutral-400 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center border border-artisan-border rounded-xl bg-white p-0.5">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-neutral-100 rounded"
                    >
                      -
                    </button>
                    <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-neutral-100 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-artisan-border bg-[#FAF7F2] space-y-3">
            <div className="bg-white p-3 rounded-2xl border border-terracotta/20 space-y-1.5 text-xs">
              <div className="flex justify-between text-artisan-muted">
                <span>Items Subtotal</span>
                <span className="font-bold text-artisan-text">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-forest font-semibold">
                <span>Direct to Artisan Makers</span>
                <span>₹{artisanShare}</span>
              </div>
              <div className="flex justify-between text-artisan-muted">
                <span>Direct Artisan Shipping</span>
                <span className="font-bold">{shipping === 0 ? 'FREE' : \`₹\${shipping}\`}</span>
              </div>
              <div className="pt-1.5 border-t border-artisan-border flex justify-between text-sm font-black text-artisan-text">
                <span>Total Amount</span>
                <span className="text-terracotta">₹{total}</span>
              </div>
            </div>

            <button
              onClick={() => openModal('checkout')}
              className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-3.5 rounded-2xl font-extrabold text-xs shadow-craft active:scale-95 transition flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
`);

// 3. src/components/checkout/CheckoutModal.tsx
writeFile('src/components/checkout/CheckoutModal.tsx', `import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, CheckCircle2, ShieldCheck, QrCode, CreditCard, Banknote, ArrowRight } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { activeModal, closeModal, getCartTotal, placeOrder, openModal } = useShop();

  const [fullName, setFullName] = useState('Aarav Sharma');
  const [phone, setPhone] = useState('+91 98490 11223');
  const [street, setStreet] = useState('Plot 24, Road No 12, Banjara Hills');
  const [city, setCity] = useState('Hyderabad');
  const [state, setState] = useState('Telangana');
  const [pinCode, setPinCode] = useState('500034');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  if (activeModal !== 'checkout') return null;

  const { total, artisanShare } = getCartTotal();

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const order = placeOrder(
      { fullName, phone, street, city, state, pinCode },
      paymentMethod === 'upi' ? 'UPI (GPay/PhonePe)' : paymentMethod === 'card' ? 'Debit/Credit Card' : 'Cash on Delivery'
    );
    // Open order tracking modal with newly placed order
    openModal('order_tracking', undefined, undefined, order);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl border border-artisan-border shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        <div className="p-4 border-b border-artisan-border flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <h3 className="text-sm font-extrabold text-artisan-text">Direct Artisan Checkout</h3>
            <p className="text-[11px] text-artisan-muted">Safe, encrypted &amp; fair-trade certified</p>
          </div>

          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 flex items-center justify-center text-artisan-text border border-artisan-border transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleConfirmOrder} className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Shipping Address */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-artisan-text uppercase tracking-wider">1. Delivery Address</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                required
                className="col-span-2 p-2.5 rounded-xl border border-artisan-border bg-[#FAF7F2] outline-none focus:border-terracotta"
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
                required
                className="p-2.5 rounded-xl border border-artisan-border bg-[#FAF7F2] outline-none focus:border-terracotta"
              />
              <input
                type="text"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="PIN Code"
                required
                className="p-2.5 rounded-xl border border-artisan-border bg-[#FAF7F2] outline-none focus:border-terracotta"
              />
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Street Address / Flat"
                required
                className="col-span-2 p-2.5 rounded-xl border border-artisan-border bg-[#FAF7F2] outline-none focus:border-terracotta"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                required
                className="p-2.5 rounded-xl border border-artisan-border bg-[#FAF7F2] outline-none focus:border-terracotta"
              />
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
                required
                className="p-2.5 rounded-xl border border-artisan-border bg-[#FAF7F2] outline-none focus:border-terracotta"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2 pt-2 border-t border-artisan-border">
            <h4 className="text-xs font-bold text-artisan-text uppercase tracking-wider">2. Payment Method</h4>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={\`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition \${
                  paymentMethod === 'upi'
                    ? 'border-terracotta bg-terracotta/10 text-terracotta'
                    : 'border-artisan-border bg-[#FAF7F2] text-artisan-muted'
                }\`}
              >
                <QrCode className="w-5 h-5" />
                <span>UPI (GPay)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={\`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition \${
                  paymentMethod === 'card'
                    ? 'border-terracotta bg-terracotta/10 text-terracotta'
                    : 'border-artisan-border bg-[#FAF7F2] text-artisan-muted'
                }\`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Debit/Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={\`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition \${
                  paymentMethod === 'cod'
                    ? 'border-terracotta bg-terracotta/10 text-terracotta'
                    : 'border-artisan-border bg-[#FAF7F2] text-artisan-muted'
                }\`}
              >
                <Banknote className="w-5 h-5" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {paymentMethod === 'upi' && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
                <QrCode className="w-4 h-4 text-amber-800 shrink-0" />
                <span>Zero gateway fee. Instant notification sent to the artisan's WhatsApp.</span>
              </div>
            )}
          </div>

          {/* Fair Trade Pledge */}
          <div className="p-3 rounded-2xl bg-forest-light border border-forest/20 text-forest text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Artisan Share</span>
            </div>
            <span className="font-extrabold">₹{artisanShare} directly to maker</span>
          </div>

          <button
            type="submit"
            className="w-full bg-terracotta hover:bg-terracotta-hover text-white py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm shadow-craft active:scale-95 transition flex items-center justify-center gap-2"
          >
            <span>Pay &amp; Place Order (₹{total})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
`);

// 4. src/components/orders/OrderTrackingModal.tsx
writeFile('src/components/orders/OrderTrackingModal.tsx', `import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { X, CheckCircle2, Clock, Truck, Home, Sparkles, MessageSquare, Send } from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const { activeModal, closeModal, activeOrder } = useShop();
  const [noteText, setNoteText] = useState('');
  const [noteSent, setNoteSent] = useState(false);

  if (activeModal !== 'order_tracking' || !activeOrder) return null;

  const steps = [
    { title: 'Order Confirmed', subtitle: 'Payment verified & craft order issued', done: true },
    { title: 'Handcrafted & Packed', subtitle: 'Artisan Lakshmi in Telangana is hand-packing your items', done: activeOrder.trackingStep >= 2 },
    { title: 'Shipped via Courier', subtitle: 'Dispatched directly from Pochampally depot', done: activeOrder.trackingStep >= 3 },
    { title: 'Delivered', subtitle: 'Arrives at your doorstep', done: activeOrder.trackingStep >= 4 }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl border border-artisan-border shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        {/* Header */}
        <div className="p-4 border-b border-artisan-border flex items-center justify-between bg-[#FAF7F2]">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-artisan-text">Order #{activeOrder.id}</h3>
              <span className="text-[10px] bg-forest/10 text-forest font-bold px-2 py-0.5 rounded-full border border-forest/20">
                Active Tracking
              </span>
            </div>
            <p className="text-[11px] text-artisan-muted">{activeOrder.date} • ₹{activeOrder.totalAmount}</p>
          </div>

          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 flex items-center justify-center text-artisan-text border border-artisan-border transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Tracking Progress Timeline */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-artisan-text uppercase tracking-wider">Artisan Fulfillment Status</h4>
            <div className="relative pl-6 space-y-5 border-l-2 border-artisan-border ml-2">
              {steps.map((step, idx) => (
                <div key={idx} className="relative">
                  <div className={\`absolute -left-[31px] top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center \${
                    step.done
                      ? 'bg-forest border-forest text-white'
                      : 'bg-white border-neutral-300 text-transparent'
                  }\`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <h5 className={\`text-xs font-bold \${step.done ? 'text-artisan-text' : 'text-neutral-400'}\`}>
                    {step.title}
                  </h5>
                  <p className="text-[11px] text-artisan-muted">{step.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Items Summary */}
          <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-artisan-border space-y-2">
            <h5 className="text-[11px] font-bold text-artisan-muted uppercase">Items in this Package</h5>
            {activeOrder.items.map((it, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <span className="font-semibold text-artisan-text">
                  {it.quantity}x {it.product.title}
                </span>
                <span className="font-bold">₹{it.product.price * it.quantity}</span>
              </div>
            ))}
          </div>

          {/* Send Appreciation Note to the Artisan */}
          <div className="bg-[#FFFDFB] p-4 rounded-2xl border border-terracotta/30 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-terracotta">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Send an Appreciation Note to the Artisan</span>
            </div>
            <p className="text-[11px] text-artisan-muted">
              Your note will be translated into Telugu and delivered to the artisan's phone.
            </p>

            {noteSent ? (
              <div className="p-2.5 rounded-xl bg-forest/10 border border-forest/20 text-forest text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Note delivered to Lakshmi Devi! Thank you for encouraging rural crafts.</span>
              </div>
            ) : (
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="e.g. Loved the indigo motifs! Keep the craft alive!"
                  className="flex-1 p-2 rounded-xl border border-artisan-border bg-white text-xs outline-none focus:border-terracotta"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (noteText.trim()) setNoteSent(true);
                  }}
                  className="bg-terracotta text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-terracotta-hover transition flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Send</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
`);

// 5. src/components/artisan/ArtisanStorefrontModal.tsx
writeFile('src/components/artisan/ArtisanStorefrontModal.tsx', `import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ARTISANS } from '../../data/catalog';
import { X, Award, MapPin, Sparkles, CheckCircle2, Star } from 'lucide-react';
import { ProductCard } from '../product/ProductCard';

export const ArtisanStorefrontModal: React.FC = () => {
  const { activeModal, closeModal, products } = useShop();
  const artisan = ARTISANS['art-lakshmi'];

  if (activeModal !== 'artisan_storefront') return null;

  const artisanProducts = products.filter((p) => p.artisanId === artisan.id);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl border border-artisan-border shadow-2xl overflow-hidden max-h-[92vh] flex flex-col my-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#C85A32] to-[#B54C26] p-6 text-white">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <img
              src={artisan.avatar}
              alt={artisan.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-white/40 shadow-md"
            />
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold">
                <Award className="w-3 h-3" />
                <span>{artisan.badge}</span>
              </div>
              <h2 className="text-2xl font-black">{artisan.name}</h2>
              <p className="text-xs text-white/90 font-medium">{artisan.title}</p>
              <p className="text-[11px] text-white/70 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3 h-3" />
                <span>{artisan.location} • Est. {artisan.establishedYear}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Studio Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-artisan-border space-y-2">
            <h4 className="text-xs font-bold text-terracotta uppercase tracking-wider">About the Craft Studio</h4>
            <p className="text-xs text-artisan-text leading-relaxed">{artisan.story}</p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs font-bold text-artisan-muted">
              <span>Co-op: {artisan.cooperative}</span>
              <span>•</span>
              <span className="text-forest">★ {artisan.rating} / 5.0 Rating</span>
              <span>•</span>
              <span>{artisan.totalOrdersFulfilled}+ Direct Orders Handcrafted</span>
            </div>
          </div>

          {/* Artisan's Creations Grid */}
          <div className="space-y-3">
            <h3 className="text-sm font-extrabold text-artisan-text">
              Creations from Lakshmi Devi's Loom ({artisanProducts.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {artisanProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
`);

// 6. src/components/product/ProductCompareDrawer.tsx
writeFile('src/components/product/ProductCompareDrawer.tsx', `import React from 'react';
import { useShop } from '../../context/ShopContext';
import { X, Trash2, ShoppingBag } from 'lucide-react';

export const ProductCompareDrawer: React.FC = () => {
  const { activeModal, closeModal, compareList, toggleCompare, addToCart } = useShop();

  if (activeModal !== 'compare' || compareList.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-3xl rounded-3xl border border-artisan-border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col my-auto">
        <div className="p-4 border-b border-artisan-border flex items-center justify-between bg-[#FAF7F2]">
          <h3 className="text-sm font-extrabold text-artisan-text">Compare Artisan Crafts Side-by-Side</h3>
          <button
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 flex items-center justify-center text-artisan-text border border-artisan-border transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-artisan-border">
                <th className="p-2 text-artisan-muted font-bold">Attribute</th>
                {compareList.map((p) => (
                  <th key={p.id} className="p-2 font-black text-artisan-text min-w-[160px]">
                    <div className="space-y-1">
                      <img src={p.image} alt={p.title} className="w-16 h-16 rounded-xl object-cover border" />
                      <div>{p.title}</div>
                      <div className="text-terracotta">₹{p.price}</div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-artisan-border/70">
              <tr>
                <td className="p-2 font-bold text-artisan-muted">Technique</td>
                {compareList.map((p) => <td key={p.id} className="p-2 font-medium">{p.craftType}</td>)}
              </tr>
              <tr>
                <td className="p-2 font-bold text-artisan-muted">Origin</td>
                {compareList.map((p) => <td key={p.id} className="p-2 font-medium">{p.district}, {p.state}</td>)}
              </tr>
              <tr>
                <td className="p-2 font-bold text-artisan-muted">Materials</td>
                {compareList.map((p) => <td key={p.id} className="p-2 font-medium">{p.materials.join(', ')}</td>)}
              </tr>
              <tr>
                <td className="p-2 font-bold text-artisan-muted">Hours Invested</td>
                {compareList.map((p) => <td key={p.id} className="p-2 font-bold text-forest">{p.craftHours} hrs</td>)}
              </tr>
              <tr>
                <td className="p-2 font-bold text-artisan-muted">Artisan Share</td>
                {compareList.map((p) => <td key={p.id} className="p-2 font-bold text-terracotta">{p.artisanSharePercent}%</td>)}
              </tr>
              <tr>
                <td className="p-2 font-bold text-artisan-muted">Action</td>
                {compareList.map((p) => (
                  <td key={p.id} className="p-2">
                    <button
                      onClick={() => {
                        addToCart(p);
                        closeModal();
                      }}
                      className="bg-terracotta text-white px-3 py-1.5 rounded-xl font-bold text-[11px] hover:bg-terracotta-hover transition"
                    >
                      Add to Bag
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
`);

// 7. src/components/common/VoiceSearchModal.tsx
writeFile('src/components/common/VoiceSearchModal.tsx', `import React, { useState, useEffect } from 'react';
import { useShop } from '../../context/ShopContext';
import { Mic, X, CheckCircle2, Sparkles, Volume2 } from 'lucide-react';

export const VoiceSearchModal: React.FC = () => {
  const { activeModal, closeModal, setSearchQuery } = useShop();
  const [isListening, setIsListening] = useState(true);
  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    if (activeModal === 'voice_search') {
      setIsListening(true);
      setRecognizedText('');
      const t1 = setTimeout(() => {
        setRecognizedText('సహజ ఇండిగో కుషన్ కవర్ (Natural Indigo Cushion)');
      }, 1500);
      const t2 = setTimeout(() => {
        setIsListening(false);
      }, 3000);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [activeModal]);

  if (activeModal !== 'voice_search') return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 animate-fadeIn">
      <div className="bg-[#FAF7F2] w-full max-w-sm rounded-3xl border border-artisan-border shadow-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-terracotta" />
            <h3 className="text-xs font-bold text-artisan-text">Multilingual Voice Search</h3>
          </div>
          <button
            onClick={closeModal}
            className="w-7 h-7 rounded-full bg-white hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audio Wave Visualizer */}
        <div className="flex flex-col items-center justify-center py-4 space-y-3">
          <div className="relative">
            <div className={\`w-16 h-16 rounded-full bg-terracotta flex items-center justify-center text-white shadow-craft \${
              isListening ? 'scale-105' : ''
            }\`}>
              <Mic className="w-7 h-7" />
            </div>
            {isListening && (
              <div className="absolute inset-0 rounded-full bg-terracotta/30 animate-ping" />
            )}
          </div>

          <p className="text-xs font-semibold text-artisan-muted text-center">
            {isListening ? 'Listening in Telugu, Hindi or English...' : 'Speech captured!'}
          </p>
        </div>

        {recognizedText && (
          <div className="bg-white p-3 rounded-2xl border border-artisan-border space-y-1">
            <span className="text-[10px] font-bold text-forest uppercase">Recognized Query</span>
            <p className="text-xs font-bold text-artisan-text font-telugu">"{recognizedText}"</p>
          </div>
        )}

        <div className="flex gap-2 pt-1">
          <button
            onClick={() => {
              setSearchQuery('Indigo Cushion');
              closeModal();
            }}
            className="flex-1 bg-terracotta hover:bg-terracotta-hover text-white py-2.5 rounded-xl font-bold text-xs shadow-craft transition"
          >
            Apply Search
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2.5 bg-neutral-200 text-artisan-text rounded-xl font-medium text-xs transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
`);

// 8. src/App.tsx
writeFile('src/App.tsx', `import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroBanner } from './components/home/HeroBanner';
import { CraftCategories } from './components/home/CraftCategories';
import { ArtisanSpotlight } from './components/home/ArtisanSpotlight';
import { FilterBar } from './components/home/FilterBar';
import { ProductCard } from './components/product/ProductCard';

// Modals and Drawers
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { OrderTrackingModal } from './components/orders/OrderTrackingModal';
import { ArtisanStorefrontModal } from './components/artisan/ArtisanStorefrontModal';
import { ProductCompareDrawer } from './components/product/ProductCompareDrawer';
import { VoiceSearchModal } from './components/common/VoiceSearchModal';

const CatalogSection: React.FC = () => {
  const { products, selectedCategory, selectedCraft, priceFilter, searchQuery } = useShop();

  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
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
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-artisan-text">
            Handcrafted Treasures
          </h2>
          <p className="text-xs text-artisan-muted">
            Showing {filteredProducts.length} authentic artisan-made creations
          </p>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-artisan-border space-y-2">
          <p className="text-sm font-bold text-artisan-text">No crafts match your active filters</p>
          <p className="text-xs text-artisan-muted">Try resetting your price slider or craft technique filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </section>
  );
};

export function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <HeroBanner />
          <CraftCategories />
          <FilterBar />
          <CatalogSection />
          <ArtisanSpotlight />
        </main>
        <Footer />

        {/* Global Modals & Drawers */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
        <OrderTrackingModal />
        <ArtisanStorefrontModal />
        <ProductCompareDrawer />
        <VoiceSearchModal />
      </div>
    </ShopProvider>
  );
}

export default App;
`);

// 9. src/main.tsx
writeFile('src/main.tsx', `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`);

console.log('Part 3 components, App, and main written successfully.');
