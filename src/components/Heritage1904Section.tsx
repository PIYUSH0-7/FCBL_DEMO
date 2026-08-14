import React from 'react';
import { useShop } from '../context/ShopContext';
import { Award, Shield, Sparkles, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export const Heritage1904Section: React.FC = () => {
  const { setActiveCategory } = useShop();

  const PILLARS = [
    {
      year: '1904',
      title: 'The Royal Foundation',
      desc: 'Founded by Lala Fateh Chand in the historic artisan quarters, patronized by royalty for uncut Polki, Jadau, and 22K temple jewellery.',
      icon: Award,
    },
    {
      year: '120 Years',
      title: 'Generational Karigari',
      desc: 'Master craft preserved over four generations, combining timeless Indian heritage with modern demi-fine 18k gold vermeil durability.',
      icon: Clock,
    },
    {
      year: 'BIS 925',
      title: 'Certified Purity',
      desc: 'Every silver and gold vermeil piece is hallmarked with BIS purity certification and stamped with the iconic FCJ 1904 hallmark.',
      icon: Shield,
    },
    {
      year: 'Lifetime',
      title: 'Replating & Care',
      desc: 'Free complimentary polish, ultrasonic cleaning, and tarnish replating service across all FCBL Flagship Salons and online.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="heritage-1904" className="py-14 sm:py-20 bg-gradient-to-b from-[#faf8f5] to-[#f4eee4] border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heritage Banner Card */}
        <div className="bg-[#1c1917] text-white rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden mb-12 border border-[#d4af37]/40">
          
          {/* Subtle Background Monogram */}
          <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none font-serif text-[180px] sm:text-[240px] font-bold text-[#d4af37]">
            FCJ
          </div>

          <div className="relative z-10 max-w-3xl">
            {/* Crest */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 border border-[#d4af37] rotate-45 flex items-center justify-center bg-stone-950 text-[#d4af37]">
                <span className="-rotate-45 font-serif text-xs font-bold">fcj</span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold block">
                  ESTD. 1904 • 120 YEARS OF TRUST
                </span>
                <span className="text-[11px] text-stone-400">
                  From The House of Fateh Chand Bansi Lal Jewellers
                </span>
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Honoring India’s Rich Jewellery Heritage Through Modern Demi-Fine Elegance.
            </h2>

            <p className="text-xs sm:text-base text-stone-300 font-light mt-4 leading-relaxed">
              For over a century, Fateh Chand Bansi Lal Jewellers has adorned brides, royalty, and connoisseurs.
              Today, through our partnership with modern demi-fine craftsmanship, we bring you waterproof,
              anti-tarnish 18K gold vermeil and archival polki chokers crafted to last generations.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setActiveCategory('heritage-1904');
                  document.getElementById('collection-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#b08d4b] text-stone-950 font-bold px-6 py-3 rounded-full text-xs sm:text-sm tracking-wider uppercase transition-all cursor-pointer shadow-lg"
              >
                <span>Explore The 1904 Vault</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Craftsmanship */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#92702c]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-serif font-bold text-[#92702c] tracking-widest uppercase">
                      {pillar.year}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-[#92702c] font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>FCBL Guarantee</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
