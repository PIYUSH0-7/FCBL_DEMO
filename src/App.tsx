import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { StoryCircles } from './components/StoryCircles';
import { CategoryBubbles } from './components/CategoryBubbles';
import { ProductGrid } from './components/ProductGrid';
import { CelebrityLookbook } from './components/CelebrityLookbook';
import { Heritage1904Section } from './components/Heritage1904Section';
import { Footer } from './components/Footer';

// Modals & Drawers
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { StoryModal } from './components/StoryModal';
import { StylistModal } from './components/StylistModal';
import { RingSizerTool } from './components/RingSizerTool';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { ShopifyConfigModal } from './components/ShopifyConfigModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ToastContainer } from './components/ToastContainer';

export function AppContent() {
  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] flex flex-col selection:bg-[#c5a059] selection:text-white">
      {/* 1. Rotating Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Header with Mega Menu */}
      <Header />

      {/* 3. Main Storefront Flow */}
      <main className="flex-1">
        {/* Hero Banner Slider */}
        <HeroSlider />

        {/* Instagram/Palmonas Highlight Story Circles */}
        <StoryCircles />

        {/* Category Bubbles */}
        <CategoryBubbles />

        {/* Filterable, Sortable Product Grid */}
        <ProductGrid />

        {/* Celebrity Lookbook & Red Carpet Spotlight */}
        <CelebrityLookbook />

        {/* 120-Year Heritage Vault (1904) Pillars */}
        <Heritage1904Section />
      </main>

      {/* 4. Luxury Footer */}
      <Footer />

      {/* 5. Modals & Overlays */}
      <ProductModal />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <StoryModal />
      <StylistModal />
      <RingSizerTool />
      <StoreLocatorModal />
      <ShopifyConfigModal />
      <CheckoutModal />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}
