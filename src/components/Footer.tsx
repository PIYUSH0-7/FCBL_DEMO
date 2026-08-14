import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Award,
  Mail,
  Phone,
  MapPin,
  Heart,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setActiveCategory,
    setIsStylistOpen,
    setIsRingSizerOpen,
    setIsStoreLocatorOpen,
    setIsShopifyConfigOpen,
    addToast
  } = useShop();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address', undefined, 'info');
      return;
    }
    setSubscribed(true);
    addToast('Welcome to the Royal Circle!', 'Use code FCBL10 for 10% off your first heirloom order', 'success');
  };

  return (
    <footer id="main-footer" className="bg-[#141210] text-[#f5f1eb] border-t border-[#292524] pt-14 pb-8">
      {/* 4 Feature Badges in Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#292524]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-stone-100 uppercase tracking-wide">
                Free Express Delivery
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5">
                All India Priority Air Delivery (2-3 Days)
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-stone-100 uppercase tracking-wide">
                Lifetime Tarnish Warranty
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5">
                18K Thick Vermeil & BIS Hallmarked
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-stone-100 uppercase tracking-wide">
                30-Day Hassle-Free Returns
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Instant doorstep pickup & refund
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-stone-100 uppercase tracking-wide">
                120 Years of Royal Trust
              </h4>
              <p className="text-[11px] text-stone-400 mt-0.5">
                Estd 1904 by Lala Fateh Chand
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          
          {/* Col 1: Brand & Heritage */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 border border-[#d4af37] rounded rotate-45 flex items-center justify-center bg-stone-950 text-[#d4af37]">
                <span className="-rotate-45 font-serif text-xs font-bold">fcj</span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold tracking-widest text-white uppercase">
                  Fateh Chand Jewels
                </h3>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#d4af37] block">
                  Estd 1904 • From The House of FCBL
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Crafting royal Indian heirloom jewellery and modern demi-fine gold vermeil for over 120 years. Certified 18K thick plating over 925 sterling silver, water-resistant, anti-tarnish, and skin-safe for everyday luxury.
            </p>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-stone-200 uppercase tracking-wider block mb-2">
                Join the Royal Circle (Get 10% Off)
              </span>
              {subscribed ? (
                <div className="p-2.5 bg-emerald-950/60 border border-emerald-700/60 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <span>Welcome! Check your inbox for code <strong>FCBL10</strong>.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-hidden focus:border-[#d4af37]"
                  />
                  <button
                    type="submit"
                    className="bg-[#d4af37] hover:bg-[#b08d4b] text-stone-950 text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer shrink-0 uppercase tracking-wider"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-3.5">
              Fine Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              {[
                { id: 'necklaces', label: 'Necklaces & Chokers' },
                { id: 'earrings', label: 'Earrings & Chandbalis' },
                { id: 'rings', label: 'Solitaire Rings & Bands' },
                { id: 'bracelets', label: 'Tennis Bracelets & Cuffs' },
                { id: 'mangalsutras', label: 'Modern Mangalsutras' },
                { id: 'heritage-1904', label: '1904 Royal Vault' },
                { id: 'mens', label: "Men's Demi-Fine" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveCategory(item.id);
                      document.getElementById('collection-grid')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#d4af37] transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services & Tools */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-3.5">
              Client Services
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => setIsStylistOpen(true)}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
                  <span>AI Jewellery Stylist</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsRingSizerOpen(true)}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Virtual Ring Sizing Tool
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsStoreLocatorOpen(true)}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  Boutique Flagship Locations
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsShopifyConfigOpen(true)}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Shopify Storefront API</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </button>
              </li>
              <li>
                <span className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Lifetime Polish & Replating
                </span>
              </li>
              <li>
                <span className="hover:text-[#d4af37] transition-colors cursor-pointer">
                  Corporate & Wedding Gifting
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Flagship & Support */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-3.5">
              Heritage Flagship
            </h4>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                <span>Fateh Chand Bansi Lal Jewellers, Main Market, Heritage Quarter, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>+91 11 2327 1904 / +91 98110 01904</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>concierge@fcbl.co</span>
              </div>
              <div className="pt-2 text-[11px] text-[#d4af37] font-semibold">
                Available 10:00 AM – 8:00 PM IST (Mon–Sun)
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright, Shopify Integration, Payment Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#292524] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span>© 1904–2026 Fateh Chand Bansi Lal Jewellers (FCBL). All Rights Reserved.</span>
        </div>

        {/* Payment and Trust Badges */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-stone-400">
          <span className="bg-stone-900 border border-stone-800 px-2 py-0.5 rounded">UPI</span>
          <span className="bg-stone-900 border border-stone-800 px-2 py-0.5 rounded">VISA</span>
          <span className="bg-stone-900 border border-stone-800 px-2 py-0.5 rounded">MasterCard</span>
          <span className="bg-stone-900 border border-stone-800 px-2 py-0.5 rounded">RuPay</span>
          <span className="bg-stone-900 border border-stone-800 px-2 py-0.5 rounded">COD</span>
        </div>
      </div>
    </footer>
  );
};
