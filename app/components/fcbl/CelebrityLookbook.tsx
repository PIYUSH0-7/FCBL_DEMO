import React from 'react';
import { useShop } from '~/context/ShopContext';
import { CELEBRITY_LOOKS } from '~/data/fcbl/initialCatalog';
import { Sparkles, ShoppingBag, Quote, ArrowRight } from 'lucide-react';

export const CelebrityLookbook: React.FC = () => {
  const { products, setSelectedProduct, addToCart, formatPrice } = useShop();

  return (
    <section id="celebrity-lookbook" className="py-12 sm:py-18 bg-[#1c1917] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 bg-[#d4af37]/20 border border-[#d4af37]/40 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-[#d4af37] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Palmonas x FCBL Spotlight</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-stone-100">
            As Seen On Red Carpets & Celebrities
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-2 max-w-lg mx-auto">
            Discover why India’s leading style icons and Bollywood actors choose Fateh Chand Jewels for their most memorable moments.
          </p>
        </div>

        {/* Celebrity Look Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CELEBRITY_LOOKS.map((look) => {
            const featuredProd = products.find((p) => p.id === look.featuredProductId) || products[0];
            return (
              <div
                key={look.id}
                className="bg-stone-900/90 rounded-2xl overflow-hidden border border-stone-800 flex flex-col justify-between hover:border-[#d4af37]/60 transition-all duration-300 group shadow-xl"
              >
                {/* Celebrity Editorial Photo */}
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-950">
                  <img
                    src={look.image}
                    alt={look.celebrityName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] font-semibold text-[#d4af37]">
                    {look.outfitOccasion}
                  </div>

                  {/* Celebrity Name Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                      {look.celebrityName}
                    </h3>
                    <span className="text-xs text-[#d4af37] font-medium uppercase tracking-wider block">
                      {look.role}
                    </span>
                  </div>
                </div>

                {/* Quote & Tagged Product Card */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="relative pl-6">
                    <Quote className="w-4 h-4 text-[#d4af37] absolute left-0 top-0 opacity-60" />
                    <p className="text-xs sm:text-sm text-stone-300 italic leading-relaxed">
                      "{look.quote}"
                    </p>
                  </div>

                  {/* Tagged Product Box */}
                  <div className="bg-stone-950 p-3 rounded-xl border border-stone-800 flex items-center justify-between gap-3">
                    <img
                      src={featuredProd.images[0]}
                      alt={featuredProd.title}
                      className="w-12 h-12 rounded-lg object-cover bg-stone-900 border border-stone-800 shrink-0"
                    />
                    <div className="truncate flex-1">
                      <span className="text-[9px] uppercase tracking-wider text-[#d4af37] font-bold block">
                        Featured Piece
                      </span>
                      <h4 className="text-xs font-semibold text-stone-200 truncate">
                        {featuredProd.title}
                      </h4>
                      <span className="text-xs font-bold text-white">
                        {formatPrice(featuredProd.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => addToCart(featuredProd, '18k_gold')}
                        className="p-2 bg-[#d4af37] hover:bg-[#b08d4b] text-stone-950 rounded-lg transition-colors cursor-pointer"
                        title="Add to Bag"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setSelectedProduct(featuredProd)}
                        className="p-2 bg-stone-800 hover:bg-stone-700 text-stone-300 rounded-lg transition-colors cursor-pointer text-xs"
                        title="View Details"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
