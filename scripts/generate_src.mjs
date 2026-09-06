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

// 1. src/index.css
writeFile('src/index.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans bg-[#FAF7F2] text-[#2B2521] min-h-screen m-0 p-0 overflow-x-hidden;
  }
}

.bg-artisan-pattern {
  background-color: #FAF7F2;
  background-image: radial-gradient(#E8DEC9 0.75px, transparent 0.75px);
  background-size: 16px 16px;
}

.bg-warm-gradient {
  background: linear-gradient(180deg, #FAF7F2 0%, #F5ECE0 100%);
}

.text-telugu {
  font-family: 'Noto Sans Telugu', 'Plus Jakarta Sans', sans-serif;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #FAF7F2;
}
::-webkit-scrollbar-thumb {
  background: rgba(200, 90, 50, 0.3);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(200, 90, 50, 0.6);
}
`);

// 2. src/types/index.ts
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

// 3. src/data/catalog.ts
writeFile('src/data/catalog.ts', `import { ProductItem, Artisan, Review } from '../types';

export const ARTISANS: Record<string, Artisan> = {
  'art-lakshmi': {
    id: 'art-lakshmi',
    name: 'Lakshmi Devi',
    initial: 'L',
    title: 'Heritage Block-Print & Natural Dye Master',
    location: 'Pochampally, Telangana',
    state: 'Telangana',
    district: 'Yadadri Bhuvanagiri',
    avatar: '/assets/artisan_lakshmi.jpg',
    badge: 'Verified Telangana Master Artisan',
    heritageGeneration: '3rd Generation Artisan Family',
    story: 'Lakshmi learned the meticulous craft of woodblock carving and natural indigo vat fermentation from her grandmother in rural Telangana. She leads a collective of 14 women artisans, preserving centuries-old resistive mud-resist and herbal printing methods without any chemical additives.',
    craftSpecialization: 'Natural Indigo Hand Block-Printing & Organic Cotton Weaves',
    cooperative: 'Telangana Gramin Hastakala Sahakari Samiti',
    totalCreations: 12,
    totalOrdersFulfilled: 348,
    rating: 4.94,
    establishedYear: 2004,
  },
  'art-ramesh': {
    id: 'art-ramesh',
    name: 'Ramesh Weavers Collective',
    initial: 'R',
    title: 'Master Ikat & Telia Rumal Handloom Weaver',
    location: 'Bhoodan Pochampally, Telangana',
    state: 'Telangana',
    district: 'Yadadri Bhuvanagiri',
    avatar: '/assets/artisan_lakshmi.jpg',
    badge: 'UNESCO Award of Excellence Artisan',
    heritageGeneration: '4th Generation Handloom Master',
    story: 'Specializing in double-ikat geometry where warp and weft threads are individually tie-dyed before weaving on pit-looms. Each Telia Rumal requires precision counting of threads.',
    craftSpecialization: 'GI-Tagged Pochampally Ikat Silk & Telia Rumal',
    cooperative: 'Pochampally Handloom Weavers Society',
    totalCreations: 8,
    totalOrdersFulfilled: 512,
    rating: 4.97,
    establishedYear: 1996,
  }
};

export const PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    title: 'Indigo Floral Cushion Cover',
    teluguTitle: 'సహజ ఇండిగో పూల కుషన్ కవర్',
    hindiTitle: 'प्राकृतिक नील फ्लोरल कुशन कवर',
    category: 'Home Décor',
    craftType: 'Hand Block-Print',
    state: 'Telangana',
    district: 'Yadadri Bhuvanagiri',
    price: 620,
    originalPrice: 850,
    costPrice: 340,
    profit: 280,
    artisanId: 'art-lakshmi',
    artisanName: 'Lakshmi Devi',
    artisanLocation: 'Pochampally, Telangana',
    artisanAvatar: '/assets/artisan_lakshmi.jpg',
    artisanStoryExcerpt: 'Handprinted using pure natural indigo dyes on premium organic cotton with hand-carved teakwood stamps.',
    image: '/assets/indigo_cushion.jpg',
    gallery: ['/assets/indigo_cushion.jpg', '/assets/block_print_runner.jpg'],
    rating: 4.9,
    reviewsCount: 42,
    isGiTagged: true,
    materials: ['100% Organic Desi Cotton', 'Fermented Indigo Plant Extract', 'Hardwood Block Print'],
    craftHours: 8.5,
    artisanSharePercent: 91,
    story: 'This cushion cover is crafted using a labor-intensive mud-resist technique practiced in Telangana. The fabric is steeped in earthen indigo fermentation vats over two weeks, producing deep, rich botanical blues that breathe natural warmth into any modern living space.',
    techniqueDetails: 'Teakwood stamps dipped in clay & gum paste, sun-dried, dipped 4 times in fermented natural indigo vats.',
    careInstructions: 'Gentle hand wash with cold water and mild natural detergent. Dry in indirect shade to preserve natural vegetable hues.',
    inStock: true
  },
  {
    id: 'prod-2',
    title: 'Silk Pochampally Scarf',
    teluguTitle: 'పోచంపల్లి పట్టు స్కార్ఫ్',
    hindiTitle: 'पोचमपल्ली रेशम दुपट्टा / स्कार्फ',
    category: 'Apparel',
    craftType: 'Pochampally Ikat',
    state: 'Telangana',
    district: 'Bhoodan Pochampally',
    price: 1450,
    originalPrice: 1950,
    costPrice: 850,
    profit: 600,
    artisanId: 'art-lakshmi',
    artisanName: 'Lakshmi Devi',
    artisanLocation: 'Pochampally, Telangana',
    artisanAvatar: '/assets/artisan_lakshmi.jpg',
    artisanStoryExcerpt: 'Authentic geometric ikat woven mulberry silk hand-dyed using traditional Telia resistive techniques.',
    image: '/assets/pochampally_scarf.jpg',
    gallery: ['/assets/pochampally_scarf.jpg'],
    rating: 4.95,
    reviewsCount: 68,
    isGiTagged: true,
    materials: ['Pure Mulberry Silk', 'Natural Botanical Dyes', 'Handloom Pit-Woven'],
    craftHours: 18.0,
    artisanSharePercent: 89,
    story: 'Pochampally Ikat holds a historic Geographical Indication (GI) tag. The intricate diamond motifs are achieved through warp-and-weft tie-dyeing, a mathematical artistry mastered over centuries in Bhoodan Pochampally.',
    techniqueDetails: 'Double Ikat tie-dye resist on silk warp threads followed by traditional wooden pit-loom weaving.',
    careInstructions: 'Dry clean recommended for the first two washes; subsequently gentle cold hand wash.',
    inStock: true
  },
  {
    id: 'prod-3',
    title: 'Block Print Table Runner',
    teluguTitle: 'చేతితో ముద్రించిన టేబుల్ రన్నర్',
    hindiTitle: 'हस्तनिर्मित ब्लॉक प्रिंट टेबल रनर',
    category: 'Home Décor',
    craftType: 'Hand Block-Print',
    state: 'Telangana',
    district: 'Pochampally',
    price: 890,
    originalPrice: 1200,
    costPrice: 480,
    profit: 410,
    artisanId: 'art-lakshmi',
    artisanName: 'Lakshmi Devi',
    artisanLocation: 'Pochampally, Telangana',
    artisanAvatar: '/assets/artisan_lakshmi.jpg',
    artisanStoryExcerpt: 'Artisanal table runner featuring repeating floral vine patterns stamped with carved teakwood blocks in natural madder.',
    image: '/assets/block_print_runner.jpg',
    gallery: ['/assets/block_print_runner.jpg', '/assets/indigo_cushion.jpg'],
    rating: 4.88,
    reviewsCount: 31,
    isGiTagged: true,
    materials: ['Handspun Khadi Cotton', 'Madder Root Pigments', 'Pomegranate Peel Yellow'],
    craftHours: 11.0,
    artisanSharePercent: 92,
    story: 'A dining centerpiece that tells an age-old story. Each floral vine motif represents the sacred flora of the Deccan plateau, hand-stamped onto thick rustic khadi.',
    techniqueDetails: 'Carved teak block stamping using natural madder red and turmeric-myrobalan yellow pigments.',
    careInstructions: 'Machine wash on gentle cycle with cold water or hand wash with eco-friendly soap.',
    inStock: true
  },
  {
    id: 'prod-4',
    title: 'Kalamkari Heritage Saree',
    teluguTitle: 'కలంకారీ సాంప్రదాయ పట్టు చీర',
    hindiTitle: 'कलमकारी हेरिटेज सिल्क साड़ी',
    category: 'Heritage Sarees',
    craftType: 'Pen Kalamkari',
    state: 'Telangana & AP',
    district: 'Deccan Region',
    price: 4200,
    originalPrice: 5800,
    costPrice: 2600,
    profit: 1600,
    artisanId: 'art-lakshmi',
    artisanName: 'Lakshmi Devi',
    artisanLocation: 'Pochampally, Telangana',
    artisanAvatar: '/assets/artisan_lakshmi.jpg',
    artisanStoryExcerpt: 'Exquisite hand-painted pen Kalamkari silk saree depicting tree of life motifs with organic vegetable dyes.',
    image: '/assets/kalamkari_saree.jpg',
    gallery: ['/assets/kalamkari_saree.jpg'],
    rating: 4.98,
    reviewsCount: 19,
    isGiTagged: true,
    materials: ['Pure Chanderi Silk', 'Bamboo Pen (Kalam)', 'Organic Milk & Myrobalan Pre-treatment'],
    craftHours: 36.0,
    artisanSharePercent: 88,
    story: 'Pen Kalamkari is a vanishing art of freehand painting using a pointed bamboo reed soaked in fermented iron rust and jaggery solution. This saree took 36 hours of patient, unbroken hand-painting by master artisans.',
    techniqueDetails: 'Cloth treated in buffalo milk and harda, hand-drawn with bamboo pens, washed in flowing river water.',
    careInstructions: 'Strictly dry clean only to preserve fine bamboo line-work and vegetable extracts.',
    inStock: true
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Aarav Sharma',
    city: 'Mumbai',
    rating: 5,
    date: '2 days ago',
    verified: true,
    comment: 'The texture of the organic cotton and the deep indigo tone is breathtaking. You can instantly tell it is authentic hand block-print and not a screen print imitation. Knowing 90% goes to Lakshmi made this purchase truly special.'
  },
  {
    id: 'rev-2',
    author: 'Pooja Verma',
    city: 'New Delhi',
    rating: 5,
    date: '1 week ago',
    verified: true,
    comment: 'The Pochampally scarf arrived with a handwritten artisan note from Telangana! The geometric alignment on pure silk is pure master-level weaving. Beautiful packaging as well.'
  },
  {
    id: 'rev-3',
    author: 'Dr. Venkatesh Rao',
    city: 'Hyderabad',
    rating: 5,
    date: '2 weeks ago',
    verified: true,
    comment: 'I bought the Kalamkari Saree for my mother. She was moved to tears by the craftsmanship. Proud to support our local weavers through this platform.'
  }
];

export const CRAFT_CATEGORIES = [
  { id: 'all', name: 'All Crafts', icon: 'Sparkles', count: 12 },
  { id: 'Home Décor', name: 'Home & Living', icon: 'Home', count: 5 },
  { id: 'Apparel', name: 'Handloom Apparel', icon: 'Shirt', count: 4 },
  { id: 'Heritage Sarees', name: 'Heritage Sarees', icon: 'Crown', count: 3 }
];
`);

// 4. src/context/ShopContext.tsx
writeFile('src/context/ShopContext.tsx', `import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductItem, Artisan, CartItem, Order, ModalType, Review } from '../types';
import { PRODUCTS, ARTISANS, REVIEWS } from '../data/catalog';
import confetti from 'canvas-confetti';

interface ShopContextType {
  products: ProductItem[];
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  compareList: ProductItem[];
  activeModal: ModalType;
  selectedProduct: ProductItem | null;
  selectedArtisan: Artisan | null;
  activeOrder: Order | null;
  language: 'en' | 'te' | 'hi';
  searchQuery: string;
  selectedCategory: string;
  selectedCraft: string;
  priceFilter: number;
  
  // Actions
  setLanguage: (lang: 'en' | 'te' | 'hi') => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedCraft: (craft: string) => void;
  setPriceFilter: (maxPrice: number) => void;
  openModal: (modal: ModalType, product?: ProductItem, artisan?: Artisan, order?: Order) => void;
  closeModal: () => void;
  addToCart: (product: ProductItem, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  toggleCompare: (product: ProductItem) => void;
  clearCompare: () => void;
  placeOrder: (shipping: Order['shippingAddress'], paymentMethod: string) => Order;
  getCartTotal: () => { subtotal: number; artisanShare: number; shipping: number; total: number };
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<ProductItem[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 } // Pre-load 1 indigo cushion for immediate interactive joy
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-2']);
  const [compareList, setCompareList] = useState<ProductItem[]>([]);
  const [activeModal, setActiveModal] = useState<ModalType>('none');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(PRODUCTS[0]);
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(ARTISANS['art-lakshmi']);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'KB-84920',
      date: 'Today, 2:15 PM',
      items: [{ product: PRODUCTS[1], quantity: 1 }],
      totalAmount: 1450,
      artisanShareAmount: 1290,
      status: 'crafting',
      shippingAddress: {
        fullName: 'Rahul Sen',
        phone: '+91 98201 44552',
        street: 'Flat 402, Green Meadows',
        city: 'Hyderabad',
        state: 'Telangana',
        pinCode: '500081'
      },
      paymentMethod: 'UPI (GPay)',
      trackingStep: 2
    }
  ]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [language, setLanguage] = useState<'en' | 'te' | 'hi'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCraft, setSelectedCraft] = useState('all');
  const [priceFilter, setPriceFilter] = useState(5000);

  const openModal = (modal: ModalType, product?: ProductItem, artisan?: Artisan, order?: Order) => {
    if (product) setSelectedProduct(product);
    if (artisan) setSelectedArtisan(artisan);
    if (order) setActiveOrder(order);
    setActiveModal(modal);
  };

  const closeModal = () => {
    setActiveModal('none');
  };

  const addToCart = (product: ProductItem, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleCompare = (product: ProductItem) => {
    setCompareList((prev) => {
      if (prev.some((p) => p.id === product.id)) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 products at a time.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const getCartTotal = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const artisanShare = cart.reduce(
      (sum, item) =>
        sum +
        Math.round(
          (item.product.price * item.product.artisanSharePercent) / 100
        ) *
          item.quantity,
      0
    );
    const shipping = subtotal > 999 || subtotal === 0 ? 0 : 70;
    const total = subtotal + shipping;
    return { subtotal, artisanShare, shipping, total };
  };

  const placeOrder = (
    shipping: Order['shippingAddress'],
    paymentMethod: string
  ): Order => {
    const { total, artisanShare } = getCartTotal();
    const newOrder: Order = {
      id: 'KB-' + Math.floor(10000 + Math.random() * 90000),
      date: 'Just now',
      items: [...cart],
      totalAmount: total,
      artisanShareAmount: artisanShare,
      status: 'placed',
      shippingAddress: shipping,
      paymentMethod,
      trackingStep: 1
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C85A32', '#D9822B', '#1F3A52', '#2E7D32']
      });
    } catch (e) {
      console.log('Confetti triggered');
    }

    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        orders,
        compareList,
        activeModal,
        selectedProduct,
        selectedArtisan,
        activeOrder,
        language,
        searchQuery,
        selectedCategory,
        selectedCraft,
        priceFilter,
        setLanguage,
        setSearchQuery,
        setSelectedCategory,
        setSelectedCraft,
        setPriceFilter,
        openModal,
        closeModal,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        toggleCompare,
        clearCompare,
        placeOrder,
        getCartTotal
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
`);

console.log('Catalog and ShopContext generated successfully.');
