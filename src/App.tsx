import React, { useState } from 'react';
import { ScreenId, NavTab, ProductItem, OrderItem } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_PROFILE } from './data/mockData';
import { MobileFrame } from './components/layout/MobileFrame';
import { BottomNav } from './components/layout/BottomNav';
import { ScreenSwitcher } from './components/common/ScreenSwitcher';

// 14 Screens
import { LanguageSelectScreen } from './components/screens/LanguageSelectScreen';
import { OtpAuthScreen } from './components/screens/OtpAuthScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { TakePhotoScreen } from './components/screens/TakePhotoScreen';
import { ReviewPhotoScreen } from './components/screens/ReviewPhotoScreen';
import { AnalyzingCraftScreen } from './components/screens/AnalyzingCraftScreen';
import { ReviewListingScreen } from './components/screens/ReviewListingScreen';
import { SmartPricingScreen } from './components/screens/SmartPricingScreen';
import { FinalVerifyScreen } from './components/screens/FinalVerifyScreen';
import { ProductLiveScreen } from './components/screens/ProductLiveScreen';
import { MyShopScreen } from './components/screens/MyShopScreen';
import { OrdersScreen } from './components/screens/OrdersScreen';
import { EarningsScreen } from './components/screens/EarningsScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [showDeviceFrame, setShowDeviceFrame] = useState(true);

  // App domain state
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [draftPrice, setDraftPrice] = useState(620);

  // Bottom Nav is shown on persistent app tabs
  const isTabScreen = ['home', 'my_shop', 'orders', 'earnings', 'profile'].includes(currentScreen);

  // Handlers for interactive flow
  const handleLanguageContinue = (_lang: string) => {
    setCurrentScreen('otp_auth');
  };

  const handleOtpVerify = () => {
    setCurrentScreen('home');
    setCurrentTab('home');
  };

  const handleStartSell = () => {
    setCurrentScreen('take_photo');
  };

  const handlePhotoCaptured = () => {
    setCurrentScreen('review_photo');
  };

  const handlePhotoLooksGood = () => {
    setCurrentScreen('analyzing_craft');
  };

  const handleAnalysisComplete = () => {
    setCurrentScreen('review_listing');
  };

  const handleListingProceed = () => {
    setCurrentScreen('smart_pricing');
  };

  const handlePricingProceed = (finalPrice: number) => {
    setDraftPrice(finalPrice);
    setCurrentScreen('final_verify');
  };

  const handleFinalPublish = () => {
    // Add product to live items
    const newProduct: ProductItem = {
      id: `prod-${Date.now()}`,
      title: 'Indigo Floral Cushion Cover',
      teluguTitle: 'ఇండిగో కుషన్ కవర్',
      category: 'Home Décor • Regional Textiles',
      price: draftPrice,
      costPrice: 340,
      profit: draftPrice - 340,
      status: 'live',
      image: '/assets/indigo_cushion.jpg',
      matchPercentage: 94,
      story:
        'Beautifully handcrafted cushion cover featuring traditional block-prints from Telangana. Handprinted using pure natural indigo dyes on premium organic cotton.',
    };

    setProducts((prev) => [newProduct, ...prev]);
    setCurrentScreen('product_live');
  };

  const handleGoToShop = () => {
    setCurrentScreen('my_shop');
    setCurrentTab('shop');
  };

  const handlePackOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: 'Packed', statusGroup: 'packed' }
          : o
      )
    );
  };

  const handleReset = () => {
    setCurrentScreen('language_select');
    setCurrentTab('home');
  };

  return (
    <div className="min-h-screen bg-[#141312] flex flex-col font-sans">
      {/* Top Screen Switcher Toolbar */}
      <ScreenSwitcher
        currentScreen={currentScreen}
        onSelectScreen={(screen) => {
          setCurrentScreen(screen);
          if (screen === 'home') setCurrentTab('home');
          if (screen === 'my_shop') setCurrentTab('shop');
          if (screen === 'orders') setCurrentTab('orders');
          if (screen === 'earnings') setCurrentTab('earnings');
          if (screen === 'profile') setCurrentTab('profile');
        }}
        showDeviceFrame={showDeviceFrame}
        onToggleDeviceFrame={() => setShowDeviceFrame(!showDeviceFrame)}
        onReset={handleReset}
      />

      {/* Main Container with Mobile Frame */}
      <main className="flex-1 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
        <MobileFrame currentTime="9:41" showDeviceFrame={showDeviceFrame}>
          {/* Screen 1: Language Select */}
          {currentScreen === 'language_select' && (
            <LanguageSelectScreen onContinue={handleLanguageContinue} />
          )}

          {/* Screen 2: OTP Auth */}
          {currentScreen === 'otp_auth' && (
            <OtpAuthScreen
              phone={profile.phone}
              onBack={() => setCurrentScreen('language_select')}
              onVerify={handleOtpVerify}
            />
          )}

          {/* Screen 3: Home Dashboard */}
          {currentScreen === 'home' && (
            <HomeScreen
              profile={profile}
              onStartSell={handleStartSell}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                if (tab === 'orders') setCurrentScreen('orders');
                if (tab === 'earnings') setCurrentScreen('earnings');
                if (tab === 'profile') setCurrentScreen('profile');
                if (tab === 'shop') setCurrentScreen('my_shop');
              }}
            />
          )}

          {/* Screen 4: Step 1/6 Take Photo */}
          {currentScreen === 'take_photo' && (
            <TakePhotoScreen
              onBack={() => setCurrentScreen('home')}
              onCapture={handlePhotoCaptured}
            />
          )}

          {/* Screen 5: Step 2/6 Review Photo */}
          {currentScreen === 'review_photo' && (
            <ReviewPhotoScreen
              onBack={() => setCurrentScreen('take_photo')}
              onRetake={() => setCurrentScreen('take_photo')}
              onProceed={handlePhotoLooksGood}
            />
          )}

          {/* Screen 6: Step 3/6 Analyzing Craft */}
          {currentScreen === 'analyzing_craft' && (
            <AnalyzingCraftScreen
              onBack={() => setCurrentScreen('review_photo')}
              onComplete={handleAnalysisComplete}
            />
          )}

          {/* Screen 7: Step 4/6 Review Listing */}
          {currentScreen === 'review_listing' && (
            <ReviewListingScreen
              onBack={() => setCurrentScreen('review_photo')}
              onProceed={handleListingProceed}
            />
          )}

          {/* Screen 8: Step 5/6 Smart Pricing */}
          {currentScreen === 'smart_pricing' && (
            <SmartPricingScreen
              initialPrice={draftPrice}
              costPrice={340}
              onBack={() => setCurrentScreen('review_listing')}
              onProceed={handlePricingProceed}
            />
          )}

          {/* Screen 9: Step 6/6 Final Verify */}
          {currentScreen === 'final_verify' && (
            <FinalVerifyScreen
              price={draftPrice}
              onBack={() => setCurrentScreen('smart_pricing')}
              onPublish={handleFinalPublish}
            />
          )}

          {/* Screen 10: Product Live Celebration */}
          {currentScreen === 'product_live' && (
            <ProductLiveScreen
              productName="Indigo Cushion Cover"
              onGoToShop={handleGoToShop}
            />
          )}

          {/* Screen 11: My Shop */}
          {currentScreen === 'my_shop' && (
            <MyShopScreen
              products={products}
              onAddNew={handleStartSell}
            />
          )}

          {/* Screen 12: Orders */}
          {currentScreen === 'orders' && (
            <OrdersScreen
              orders={orders}
              onPackOrder={handlePackOrder}
            />
          )}

          {/* Screen 13: Earnings */}
          {currentScreen === 'earnings' && (
            <EarningsScreen />
          )}

          {/* Screen 14: Profile */}
          {currentScreen === 'profile' && (
            <ProfileScreen
              profile={profile}
              onViewStorefront={() => setCurrentScreen('my_shop')}
              onChangeLanguage={() => setCurrentScreen('language_select')}
            />
          )}

          {/* Persistent Bottom Nav (on main tabs) */}
          {isTabScreen && (
            <BottomNav
              currentTab={currentTab}
              onSelectTab={(tab) => setCurrentTab(tab)}
              onNavigate={(screen) => setCurrentScreen(screen)}
            />
          )}
        </MobileFrame>
      </main>
    </div>
  );
}

export default App;
