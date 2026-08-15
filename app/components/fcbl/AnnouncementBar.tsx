import React, { useState, useEffect } from 'react';
import { useShop } from '~/context/ShopContext';
import { CURRENCY_CONFIGS } from '~/data/fcbl/initialCatalog';
import { CurrencyCode } from '~/types';
import { ShieldCheck, Sparkles, MapPin, Truck, ChevronDown, Key } from 'lucide-react';

const MESSAGES = [
  { text: '✨ FREE EXPRESS AIR DELIVERY ON ORDERS ABOVE ₹999', icon: Truck },
  { text: '👑 FROM THE HOUSE OF FATEH CHAND BANSI LAL JEWELLERS (ESTD. 1904)', icon: Sparkles },
  { text: '💎 BUY 2 GET 10% OFF | USE CODE: FCBL10 AT CHECKOUT', icon: Sparkles },
  { text: '🛡️ LIFETIME TARNISH-FREE WARRANTY & 100% BIS CERTIFIED', icon: ShieldCheck },
];

export const AnnouncementBar: React.FC = () => {
  const { currency, setCurrency, setIsStoreLocatorOpen, setIsShopifyConfigOpen } = useShop();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const activeMsg = MESSAGES[currentIdx];
  const Icon = activeMsg.icon;

  return (
    <div id="announcement-bar" className="bg-[#1c1917] text-[#f5f1eb] text-xs py-2 px-3 sm:px-6 border-b border-[#38332e] relative z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-4 text-[#d4af37] text-[11px] tracking-wider uppercase">
          <button
            onClick={() => setIsStoreLocatorOpen(true)}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <MapPin className="w-3 h-3 text-[#d4af37]" />
            <span>Store Locator (Flagships)</span>
          </button>
          <span className="text-stone-600">|</span>
          <button
            onClick={() => setIsShopifyConfigOpen(true)}
            className="flex items-center gap-1 text-[#f5f1eb] hover:text-[#d4af37] transition-colors cursor-pointer"
            title="Shopify Hydrogen Integration & Token Status"
          >
            <Key className="w-3 h-3 text-[#d4af37]" />
            <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700/60 px-1.5 py-0.5 rounded font-mono">
              Shopify Hydrogen Active
            </span>
          </button>
        </div>

        {/* Center Rotating Message */}
        <div className="flex-1 flex justify-center items-center text-center px-2 overflow-hidden">
          <div className="flex items-center justify-center gap-2 font-medium tracking-wide text-xs sm:text-[12.5px] transition-all duration-500 ease-out transform">
            <Icon className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
            <span className="truncate max-w-[280px] sm:max-w-none">{activeMsg.text}</span>
          </div>
        </div>

        {/* Right Tools: Currency & Admin API */}
        <div className="flex items-center gap-3">
          {/* Currency Selector */}
          <div className="relative">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="flex items-center gap-1.5 bg-[#292524] hover:bg-[#38332e] text-[#f5f1eb] px-2.5 py-1 rounded text-[11px] font-medium transition-colors border border-stone-700"
            >
              <span>{CURRENCY_CONFIGS[currency]?.symbol} {currency}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {isCurrencyDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-44 bg-[#1c1917] border border-stone-700 shadow-2xl rounded-md py-1 z-50">
                {(Object.keys(CURRENCY_CONFIGS) as CurrencyCode[]).map((code) => {
                  const item = CURRENCY_CONFIGS[code];
                  return (
                    <button
                      key={code}
                      onClick={() => {
                        setCurrency(code);
                        setIsCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#292524] transition-colors ${
                        currency === code ? 'text-[#d4af37] font-semibold bg-[#292524]/60' : 'text-stone-300'
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="font-mono text-stone-400">{item.symbol}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
