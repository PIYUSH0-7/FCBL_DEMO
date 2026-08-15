import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { MegaMenu } from './MegaMenu';
import {
  Search,
  Heart,
  ShoppingBag,
  Sparkles,
  Menu,
  X,
  Compass,
  CircleDot
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    activeCategory,
    setActiveCategory,
    cartItemCount,
    cartTotal,
    formatPrice,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsStylistOpen,
    setIsRingSizerOpen,
    setIsStoreLocatorOpen,
    setIsShopifyConfigOpen
  } = useShop();

  const [activeMegaCategory, setActiveMegaCategory] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NAV_ITEMS = [
    { id: 'all', label: 'All Jewellery', hasMega: false },
    { id: 'necklaces', label: 'Necklaces & Chokers', hasMega: true },
    { id: 'earrings', label: 'Earrings', hasMega: true },
    { id: 'rings', label: 'Rings & Bands', hasMega: true },
    { id: 'bracelets', label: 'Bracelets & Cuffs', hasMega: true },
    { id: 'mangalsutras', label: 'Mangalsutras', hasMega: false },
    { id: 'mens', label: "Men's Collection", hasMega: false },
    { id: 'heritage-1904', label: '1904 Royal Vault', hasMega: true, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#ffffff]/95 backdrop-blur-md border-b border-stone-200/80 transition-all duration-300">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* Mobile Menu Button & Left Utility */}
          <div className="flex items-center gap-3 lg:w-1/4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-stone-800 hover:text-[#92702c] transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* AI Jewellery Stylist Button (Desktop) */}
            <button
              onClick={() => setIsStylistOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#1c1917] bg-[#f5f1eb] hover:bg-[#ebdcc0] px-3.5 py-1.5 rounded-full border border-[#d4af37]/40 transition-all shadow-xs cursor-pointer group"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#92702c] group-hover:rotate-12 transition-transform" />
              <span>AI Jewelry Stylist</span>
            </button>

            {/* Virtual Ring Sizer Button (Desktop) */}
            <button
              onClick={() => setIsRingSizerOpen(true)}
              className="hidden xl:inline-flex items-center gap-1 text-xs text-stone-600 hover:text-[#92702c] transition-colors cursor-pointer"
            >
              <CircleDot className="w-3 h-3 text-[#92702c]" />
              <span>Ring Sizer</span>
            </button>
          </div>

          {/* Center Brand Identity: Fateh Chand Jewels (FCBL - Estd 1904) */}
          <div className="flex-1 flex flex-col items-center justify-center text-center cursor-pointer select-none py-1"
               onClick={() => { setActiveCategory('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            
            <div className="flex items-center gap-2">
              {/* Crest Logo (FCJ Monogram) */}
              <div className="w-8 h-8 sm:w-9 sm:h-9 border border-[#92702c] rounded-md rotate-45 flex items-center justify-center bg-stone-950 text-[#f5f1eb] shadow-sm transform hover:scale-105 transition-transform">
                <span className="-rotate-45 font-serif text-[11px] sm:text-xs font-bold tracking-tight text-[#d4af37]">
                  fcj
                </span>
              </div>
            </div>

            <h1 className="font-serif text-lg sm:text-2xl lg:text-2xl font-bold tracking-[0.18em] text-[#1c1917] uppercase mt-1">
              Fateh Chand Jewels
            </h1>

            <div className="flex items-center gap-2 text-[9px] sm:text-[10px] tracking-[0.25em] text-[#92702c] uppercase font-medium">
              <span>ESTD</span>
              <span className="w-1 h-1 rounded-full bg-[#92702c]"></span>
              <span>1904</span>
            </div>

            <p className="hidden sm:block text-[8.5px] tracking-[0.15em] text-stone-500 uppercase mt-0.5 font-light">
              From The House of Fateh Chand Bansi Lal Jewellers
            </p>
          </div>

          {/* Right Action Icons: Search, Wishlist, Bag, Shopify Info */}
          <div className="flex items-center justify-end gap-2 sm:gap-4 lg:w-1/4">
            
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-stone-800 hover:text-[#92702c] transition-colors rounded-full hover:bg-stone-100 cursor-pointer"
              aria-label="Search jewellery"
              title="Search collection"
            >
              <Search className="w-5 h-5 sm:w-5 sm:h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-stone-800 hover:text-[#92702c] transition-colors relative rounded-full hover:bg-stone-100 cursor-pointer"
              aria-label="View wishlist"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#92702c] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-[#1c1917] hover:bg-[#92702c] text-white px-3 sm:px-4 py-2 rounded-full transition-all duration-200 shadow-sm cursor-pointer group"
              aria-label="View shopping bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#d4af37] text-[#1c1917] text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-xs font-semibold tracking-wider">
                {cartTotal > 0 ? formatPrice(cartTotal) : 'Bag'}
              </span>
            </button>

          </div>

        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden lg:flex items-center justify-center border-t border-stone-200/60 py-3 relative">
          <ul className="flex items-center space-x-6 xl:space-x-8 text-[13px] font-medium tracking-wide">
            {NAV_ITEMS.map((item) => {
              const isActive = activeCategory === item.id;
              return (
                <li
                  key={item.id}
                  className="relative group py-1"
                  onMouseEnter={() => {
                    if (item.hasMega) setActiveMegaCategory(item.id);
                    else setActiveMegaCategory(null);
                  }}
                >
                  <button
                    onClick={() => {
                      setActiveCategory(item.id);
                      setActiveMegaCategory(null);
                    }}
                    className={`cursor-pointer transition-all duration-200 flex items-center gap-1.5 uppercase text-xs tracking-wider pb-1 ${
                      isActive
                        ? 'text-[#92702c] font-bold border-b-2 border-[#92702c]'
                        : item.highlight
                        ? 'text-[#92702c] font-semibold hover:text-[#1c1917]'
                        : 'text-stone-700 hover:text-[#92702c]'
                    }`}
                  >
                    {item.highlight && <Sparkles className="w-3 h-3 text-[#d4af37]" />}
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Interactive Mega Menu */}
      {activeMegaCategory && (
        <MegaMenu
          categoryKey={activeMegaCategory}
          isOpen={Boolean(activeMegaCategory)}
          onClose={() => setActiveMegaCategory(null)}
        />
      )}

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 border border-[#d4af37] rotate-45 flex items-center justify-center bg-stone-950">
                  <span className="-rotate-45 text-[9px] font-serif font-bold text-[#d4af37]">fcj</span>
                </div>
                <span className="font-serif text-sm tracking-wider font-bold">FATEH CHAND JEWELS</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 text-stone-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="p-4 bg-stone-50 border-b border-stone-200 space-y-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsStylistOpen(true);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-amber-100/60 border border-amber-300/50 text-xs font-semibold text-stone-900"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#92702c]" />
                  <span>AI Jewellery Stylist & Concierge</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsRingSizerOpen(true);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-lg bg-white border border-stone-200 text-xs font-medium text-stone-800"
              >
                <div className="flex items-center gap-2">
                  <CircleDot className="w-4 h-4 text-[#92702c]" />
                  <span>Virtual Ring Sizer Guide</span>
                </div>
              </button>
            </div>

            {/* Category Links */}
            <div className="p-4 flex-1">
              <h4 className="text-[11px] uppercase tracking-widest text-[#92702c] font-semibold mb-3">
                Collections
              </h4>
              <ul className="space-y-3 text-sm">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveCategory(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left py-1.5 flex items-center justify-between ${
                        activeCategory === item.id ? 'text-[#92702c] font-bold' : 'text-stone-700'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.highlight && (
                        <span className="text-[10px] bg-amber-100 text-[#92702c] px-2 py-0.5 rounded-full font-bold">
                          1904 Vault
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-stone-200 space-y-3">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsStoreLocatorOpen(true);
                  }}
                  className="w-full text-left text-xs font-medium text-stone-600 flex items-center gap-2"
                >
                  <Compass className="w-4 h-4 text-[#92702c]" />
                  <span>Flagship Showroom Locations</span>
                </button>

                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsShopifyConfigOpen(true);
                  }}
                  className="w-full text-left text-xs font-medium text-stone-600 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Shopify Storefront API Status</span>
                </button>
              </div>
            </div>

            {/* Footer inside mobile menu */}
            <div className="p-4 bg-stone-100 text-[11px] text-stone-500 text-center border-t border-stone-200">
              Estd. 1904 • 120 Years of Trust
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
