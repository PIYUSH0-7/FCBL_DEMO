import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight, Shield, Award } from 'lucide-react';

const SLIDES = [
  {
    id: 'slide-1',
    badge: 'ESTD. 1904 • PREFERRED WEDDING JEWELLER',
    title: 'Fateh Chand Jewels',
    subtitle: 'From The House of Fateh Chand Bansi Lal Jewellers',
    tagline: '120 Years of Royal Craftsmanship & Uncut Polki Elegance',
    ctaText: 'Explore Collections',
    categoryTarget: 'heritage-1904',
    secondaryCta: 'Shop 18K Gold',
    secondaryTarget: 'necklaces',
    bgImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=85',
    pill: 'Royal Wedding Edit 2026',
  },
  {
    id: 'slide-2',
    badge: 'DEMI-FINE LUXURY • PALMONAS CRAFT',
    title: 'Everyday 18K Gold Vermeil',
    subtitle: 'Waterproof • Sweatproof • Skin-Safe',
    tagline: 'Luxury you never have to take off. 5-Micron gold over pure 925 sterling silver.',
    ctaText: 'Shop Bestsellers',
    categoryTarget: 'all',
    secondaryCta: 'Rings & Bands',
    secondaryTarget: 'rings',
    bgImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=85',
    pill: 'Starting at ₹1,499',
  },
  {
    id: 'slide-3',
    badge: 'VVS CLARITY • HEARTS & ARROWS',
    title: 'The Solitaire Dream',
    subtitle: 'Lab-Grown & Moissanite Diamond Sparkles',
    tagline: 'Certified brilliant cuts with lifetime sparkle assurance and luxury velvet gift packaging.',
    ctaText: 'Discover Solitaires',
    categoryTarget: 'rings',
    secondaryCta: 'Tennis Bracelets',
    secondaryTarget: 'bracelets',
    bgImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1920&q=85',
    pill: 'Flat 10% Off: FCBL10',
  }
];

export const HeroSlider: React.FC = () => {
  const { setActiveCategory } = useShop();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section id="hero-slider" className="relative w-full overflow-hidden bg-stone-950 text-white min-h-[520px] sm:min-h-[600px] lg:min-h-[640px] flex items-center">
      {/* Background Slides with Crossfade */}
      {SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={s.bgImage}
            alt={s.title}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
          />
          {/* Rich Royal Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-2xl">
          
          {/* Badge & Pill */}
          <div className="inline-flex items-center gap-2 bg-[#d4af37]/20 border border-[#d4af37]/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase text-[#f5ecd5] mb-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{slide.badge}</span>
          </div>

          {/* Title */}
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#fdfcfb] leading-[1.1] mb-2 drop-shadow-md">
            {slide.title}
          </h2>

          {/* Subtitle / House of FCBL */}
          <p className="text-sm sm:text-base text-[#d4af37] font-medium tracking-wide uppercase mb-3">
            {slide.subtitle}
          </p>

          {/* Tagline */}
          <p className="text-sm sm:text-lg text-stone-300 font-light leading-relaxed mb-8 max-w-xl">
            {slide.tagline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            <button
              onClick={() => {
                setActiveCategory(slide.categoryTarget);
                document.getElementById('collection-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2.5 bg-[#d4af37] hover:bg-[#b08d4b] text-stone-950 font-bold px-6 sm:px-8 py-3.5 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-[#d4af37]/20 text-xs sm:text-sm tracking-wider uppercase cursor-pointer"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setActiveCategory(slide.secondaryTarget);
                document.getElementById('collection-grid')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-5 sm:px-6 py-3.5 rounded-full border border-white/30 backdrop-blur-xs transition-all text-xs sm:text-sm tracking-wider uppercase cursor-pointer"
            >
              <span>{slide.secondaryCta}</span>
            </button>
          </div>

          {/* Trust Guarantees Bar Under CTA */}
          <div className="mt-10 pt-6 border-t border-white/15 flex flex-wrap items-center gap-4 sm:gap-8 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#d4af37]" />
              <span>120-Yr Heritage Craft</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#d4af37]" />
              <span>Lifetime Tarnish Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>18K 5-Micron Vermeil</span>
            </div>
          </div>

        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="absolute z-20 bottom-6 right-6 sm:right-12 flex items-center gap-2">
        <button
          onClick={() => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length)}
          className="p-2 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/20 transition-colors cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5 px-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === current ? 'w-6 bg-[#d4af37]' : 'w-2 bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrent((prev) => (prev + 1) % SLIDES.length)}
          className="p-2 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/20 transition-colors cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
