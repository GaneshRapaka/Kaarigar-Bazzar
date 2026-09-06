import { ProductItem, OrderItem, ArtisanProfile, AnalyticsPeriodData, CraftShareItem } from '../types';

export const INITIAL_PROFILE: ArtisanProfile = {
  id: 'artisan-lakshmi-01',
  name: 'Lakshmi',
  initial: 'L',
  avatar: '/assets/artisan_lakshmi.jpg',
  title: 'Block-print artisan',
  location: 'Telangana',
  language: 'తెలుగు (Telugu)',
  teluguLanguage: 'భాష',
  phone: '+91 98480 22338',
  voiceFeedbackEnabled: true,
  craftSpecialization: 'Hand Block-Printing, Natural Indigo Dyes',
  kycStatus: 'VERIFIED',
};

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    title: 'Indigo Cushion Cover',
    teluguTitle: 'ఇండిగో కుషన్ కవర్',
    category: 'Home Décor • Regional Textiles',
    price: 620,
    costPrice: 340,
    profit: 280,
    status: 'live',
    image: '/assets/indigo_cushion.jpg',
    matchPercentage: 94,
    story:
      'Beautifully handcrafted cushion cover featuring traditional block-prints from Telangana. Handprinted using pure natural indigo dyes on premium organic cotton. Features classic floral bootis designed to bring an artisan spirit to your living room.',
  },
  {
    id: 'prod-2',
    title: 'Silk Pochampally Scarf',
    teluguTitle: 'పోచంపల్లి పట్టు స్కార్ఫ్',
    category: 'Apparel • Handloom Silk',
    price: 1450,
    costPrice: 850,
    profit: 600,
    status: 'live',
    image: '/assets/pochampally_scarf.jpg',
    matchPercentage: 98,
    story:
      'Authentic geometric ikat woven silk scarf hand-dyed using traditional Telia Rumal resistive techniques by master weavers in Bhoodan Pochampally.',
  },
  {
    id: 'prod-3',
    title: 'Block Print Runner',
    teluguTitle: 'బ్లాక్ ప్రింట్ టేబుల్ రన్నర్',
    category: 'Home Décor • Handprinted Khadi',
    price: 890,
    costPrice: 480,
    profit: 410,
    status: 'live',
    image: '/assets/block_print_runner.jpg',
    matchPercentage: 91,
    story:
      'Artisanal table runner featuring repeating floral vine patterns stamped with carved teakwood blocks in natural madder and turmeric pigments.',
  },
  {
    id: 'prod-4',
    title: 'Kalamkari Saree',
    teluguTitle: 'కలంకారీ పట్టు చీర',
    category: 'Apparel • Heritage Sarees',
    price: 4200,
    costPrice: 2600,
    profit: 1600,
    status: 'paused',
    image: '/assets/kalamkari_saree.jpg',
    matchPercentage: 96,
    story:
      'Exquisite hand-painted pen Kalamkari silk saree depicting mythological tree of life motifs with organic vegetable dyes on mulberry silk.',
  },
];

export const INITIAL_ORDERS: OrderItem[] = [
  {
    id: 'ord-101',
    city: 'Mumbai',
    status: 'Awaiting Packing',
    statusGroup: 'new',
    amount: 620,
    customerName: 'Aarav Sharma',
    itemTitle: 'Indigo Cushion Cover',
    timeAgo: '2 hours ago',
  },
  {
    id: 'ord-102',
    city: 'Delhi',
    status: 'Awaiting Packing',
    statusGroup: 'new',
    amount: 1240,
    customerName: 'Pooja Verma',
    itemTitle: 'Indigo Cushion Cover (Set of 2)',
    timeAgo: '4 hours ago',
  },
  {
    id: 'ord-103',
    city: 'Hyderabad',
    status: 'Delivered',
    statusGroup: 'delivered',
    amount: 1450,
    customerName: 'Venkatesh Rao',
    itemTitle: 'Silk Pochampally Scarf',
    timeAgo: 'Yesterday',
  },
  {
    id: 'ord-104',
    city: 'Chennai',
    status: 'Delivered',
    statusGroup: 'delivered',
    amount: 4200,
    customerName: 'Meenakshi Sundaram',
    itemTitle: 'Kalamkari Saree',
    timeAgo: '3 days ago',
  },
  {
    id: 'ord-105',
    city: 'Bengaluru',
    status: 'Packed',
    statusGroup: 'packed',
    amount: 890,
    customerName: 'Karthik N.',
    itemTitle: 'Block Print Runner',
    timeAgo: '5 hours ago',
  },
  {
    id: 'ord-106',
    city: 'Pune',
    status: 'Shipped',
    statusGroup: 'shipped',
    amount: 1450,
    customerName: 'Ananya Deshmukh',
    itemTitle: 'Silk Pochampally Scarf',
    timeAgo: '1 day ago',
  },
];

export const LANGUAGES = [
  { id: 'te', name: 'Telugu', native: 'తెలుగు', badge: 'Popular in Telangana' },
  { id: 'en', name: 'English', native: 'English', badge: 'Standard' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी', badge: 'राष्ट्रभाषा' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்', badge: 'தென்னிந்தியா' },
];

export const MOCK_ANALYTICS: Record<'week' | 'month' | 'year', AnalyticsPeriodData> = {
  week: {
    summary: {
      totalEarnings: 4280,
      totalOrders: 7,
      totalViews: 426,
      growthPercent: 18.4,
      peakDay: 'Sunday',
      peakValue: '₹1,450',
      avgDaily: '₹611',
      voiceInsightEn: 'Lakshmi, this week you earned ₹4,280 across 7 orders! Sunday was your best day with ₹1,450 from Pochampally scarves.',
      voiceInsightTe: 'లక్ష్మీ గారూ, ఈ వారం మీరు 7 ఆర్డర్ల ద్వారా ₹4,280 సంపాదించారు! ఆదివారం అత్యధికంగా ₹1,450 ఆర్డర్లు నమోదయ్యాయి.',
    },
    points: [
      { label: 'Mon', fullDate: 'Mon, 28 Aug', earnings: 350, orders: 1, views: 38, topProduct: 'Indigo Cushion' },
      { label: 'Tue', fullDate: 'Tue, 29 Aug', earnings: 620, orders: 1, views: 52, topProduct: 'Indigo Cushion' },
      { label: 'Wed', fullDate: 'Wed, 30 Aug', earnings: 0, orders: 0, views: 29, topProduct: 'No orders' },
      { label: 'Thu', fullDate: 'Thu, 31 Aug', earnings: 890, orders: 1, views: 64, topProduct: 'Block Print Runner' },
      { label: 'Fri', fullDate: 'Fri, 1 Sep', earnings: 0, orders: 0, views: 45, topProduct: 'No orders' },
      { label: 'Sat', fullDate: 'Sat, 2 Sep', earnings: 970, orders: 2, views: 88, topProduct: 'Indigo Cushion' },
      { label: 'Sun', fullDate: 'Sun, 3 Sep', earnings: 1450, orders: 2, views: 110, topProduct: 'Silk Pochampally Scarf' },
    ],
  },
  month: {
    summary: {
      totalEarnings: 12350,
      totalOrders: 18,
      totalViews: 1291,
      growthPercent: 24.6,
      peakDay: 'Week 4',
      peakValue: '₹4,280',
      avgDaily: '₹3,088 / wk',
      voiceInsightEn: 'Your monthly sales reached ₹12,350! Week 4 was your strongest with ₹4,280 earned as festive demand picked up.',
      voiceInsightTe: 'ఈ నెలలో మీ మొత్తం అమ్మకాలు ₹12,350 చేరాయి! 4వ వారంలో పండుగ గిరాకీ వల్ల అత్యధికంగా ₹4,280 వ్యాపారం జరిగింది.',
    },
    points: [
      { label: 'W1', fullDate: '1st - 7th Aug', earnings: 2450, orders: 3, views: 260, topProduct: 'Indigo Cushion' },
      { label: 'W2', fullDate: '8th - 14th Aug', earnings: 2800, orders: 4, views: 310, topProduct: 'Block Print Runner' },
      { label: 'W3', fullDate: '15th - 21st Aug', earnings: 2820, orders: 4, views: 295, topProduct: 'Indigo Cushion' },
      { label: 'W4', fullDate: '22nd - 31st Aug', earnings: 4280, orders: 7, views: 426, topProduct: 'Silk Pochampally Scarf' },
    ],
  },
  year: {
    summary: {
      totalEarnings: 24680,
      totalOrders: 36,
      totalViews: 2520,
      growthPercent: 38.2,
      peakDay: 'September',
      peakValue: '₹7,850',
      avgDaily: '₹4,113 / mo',
      voiceInsightEn: 'Over the last 6 months, your craft earned ₹24,680 across 36 direct orders! Sales grew 38% since April.',
      voiceInsightTe: 'గత 6 నెలల్లో మీ హస్తకళల ద్వారా ₹24,680 సంపాదించారు! ఏప్రిల్ నుండి మీ అమ్మకాలు 38% పుంజుకున్నాయి.',
    },
    points: [
      { label: 'Apr', fullDate: 'April 2026', earnings: 2100, orders: 3, views: 240, topProduct: 'Indigo Cushion' },
      { label: 'May', fullDate: 'May 2026', earnings: 2850, orders: 4, views: 310, topProduct: 'Block Print Runner' },
      { label: 'Jun', fullDate: 'June 2026', earnings: 3400, orders: 5, views: 380, topProduct: 'Silk Pochampally Scarf' },
      { label: 'Jul', fullDate: 'July 2026', earnings: 3980, orders: 6, views: 420, topProduct: 'Indigo Cushion' },
      { label: 'Aug', fullDate: 'August 2026', earnings: 4500, orders: 7, views: 490, topProduct: 'Silk Pochampally Scarf' },
      { label: 'Sep', fullDate: 'September 2026', earnings: 7850, orders: 11, views: 680, topProduct: 'Kalamkari Saree' },
    ],
  },
};

export const MOCK_CRAFT_SHARES: CraftShareItem[] = [
  {
    name: 'Indigo Cushion Cover',
    teluguName: 'ఇండిగో కుషన్ కవర్',
    percentage: 58,
    revenue: 14310,
    orders: 23,
    color: '#C85A32', // Terracotta
  },
  {
    name: 'Silk Pochampally Scarf',
    teluguName: 'పోచంపల్లి పట్టు స్కార్ఫ్',
    percentage: 29,
    revenue: 7160,
    orders: 5,
    color: '#D9822B', // Mustard
  },
  {
    name: 'Block Print Runner',
    teluguName: 'బ్లాక్ ప్రింట్ టేబుల్ రన్నర్',
    percentage: 13,
    revenue: 3210,
    orders: 4,
    color: '#2E7D32', // Forest
  },
];
