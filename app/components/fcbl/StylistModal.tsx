import React, { useState } from 'react';
import { useShop } from '~/context/ShopContext';
import { Sparkles, X, ShoppingBag, ArrowRight, Loader2, Award } from 'lucide-react';

export const StylistModal: React.FC = () => {
  const {
    isStylistOpen,
    setIsStylistOpen,
    products,
    setSelectedProduct,
    addToCart,
    formatPrice,
  } = useShop();

  const [occasion, setOccasion] = useState('Wedding / Reception');
  const [outfitColor, setOutfitColor] = useState('Emerald Green & Gold');
  const [metalPref, setMetalPref] = useState('18K Yellow Gold Vermeil');
  const [budget, setBudget] = useState('₹2,000 - ₹5,000');
  const [customQuery, setCustomQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const [recommendedHandles, setRecommendedHandles] = useState<string[]>([]);

  if (!isStylistOpen) return null;

  const handleGetStyling = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/gemini/stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          occasion,
          outfitColor,
          metalPreference: metalPref,
          budget,
          userPrompt: customQuery,
        }),
      });

      const data = await response.json();
      setAdvice(data.stylingAdvice);
      setRecommendedHandles(data.recommendedProductHandles || ['royal-kundan-pearl-heritage-choker-set', 'the-empress-emerald-cut-solitaire-ring']);
    } catch {
      setAdvice(
        `For your ${occasion} in ${outfitColor}, our 4th-generation Fateh Chand Jewels stylists recommend layering the 18K Solitaire Necklace with our Empress Emerald-Cut Ring. The warm yellow gold finish complements radiant Indian and contemporary silhouettes with timeless elegance.`
      );
      setRecommendedHandles(['royal-kundan-pearl-heritage-choker-set', 'the-empress-emerald-cut-solitaire-ring']);
    } finally {
      setIsLoading(false);
    }
  };

  const matchedProducts = products.filter((p) =>
    recommendedHandles.includes(p.handle) || recommendedHandles.includes(p.id)
  );
  const displayItems = matchedProducts.length > 0 ? matchedProducts : products.slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-stone-200">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-[#1c1917] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide">
                AI Royal Jewellery Stylist & Concierge
              </h3>
              <p className="text-[11px] text-stone-400">
                Personalized bespoke recommendations from the House of Fateh Chand Jewels (1904)
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsStylistOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {!advice ? (
            <form onSubmit={handleGetStyling} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Occasion */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Occasion / Event:
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:outline-hidden focus:border-[#92702c]"
                  >
                    <option value="Wedding / Reception">Wedding / Grand Reception</option>
                    <option value="Sangeet & Cocktail Night">Sangeet & Cocktail Night</option>
                    <option value="Everyday Work & Boardroom">Everyday Work & Boardroom</option>
                    <option value="Romantic Date Night">Romantic Date Night & Anniversary</option>
                    <option value="Festive Diwali / Puja">Festive Diwali / Festive Puja</option>
                  </select>
                </div>

                {/* Outfit Palette */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Outfit Style / Color:
                  </label>
                  <input
                    type="text"
                    value={outfitColor}
                    onChange={(e) => setOutfitColor(e.target.value)}
                    placeholder="e.g. Pastel Pink Lehanga, Black Dress"
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#92702c]"
                  />
                </div>

                {/* Metal Preference */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Preferred Metal Tone:
                  </label>
                  <select
                    value={metalPref}
                    onChange={(e) => setMetalPref(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:outline-hidden focus:border-[#92702c]"
                  >
                    <option value="18K Yellow Gold Vermeil">18K Yellow Gold Vermeil (Warm & Royal)</option>
                    <option value="18K Rose Gold">18K Rose Gold (Romantic & Subtle)</option>
                    <option value="925 Rhodium Silver">925 Platinum Rhodium Silver (Cool & Modern)</option>
                    <option value="Antique 22K Jadau Polki">Antique 22K Jadau Polki (Archival 1904)</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Target Budget:
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-stone-300 bg-stone-50 focus:outline-hidden focus:border-[#92702c]"
                  >
                    <option value="Under ₹1,999">Under ₹1,999 (Demi-Fine Drops)</option>
                    <option value="₹2,000 - ₹5,000">₹2,000 - ₹5,000 (Solitaire & Chokers)</option>
                    <option value="₹5,000 - ₹15,000">₹5,000+ (1904 Royal Heritage Vault)</option>
                  </select>
                </div>

              </div>

              {/* Extra notes */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Specific styling desires / Neckline details:
                </label>
                <textarea
                  rows={2}
                  value={customQuery}
                  onChange={(e) => setCustomQuery(e.target.value)}
                  placeholder="e.g. I have a sweetheart neckline, prefer minimalist earrings and a layered bracelet."
                  className="w-full text-xs p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#92702c]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1c1917] hover:bg-[#92702c] disabled:opacity-60 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Consulting Royal Stylist AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <span>Generate Bespoke Styling Advice</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              
              {/* Advice Box */}
              <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center gap-2 text-xs font-bold text-[#92702c] uppercase tracking-wider mb-2">
                  <Award className="w-4 h-4" />
                  <span>Curated Styling Recipe by Fateh Chand Jewels</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line font-light">
                  {advice}
                </p>
              </div>

              {/* Recommended Items */}
              <div>
                <h4 className="text-xs uppercase tracking-widest text-[#92702c] font-bold mb-3">
                  Recommended Royal Matching Pieces
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {displayItems.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.title}
                        className="w-14 h-14 rounded-lg object-cover bg-white shrink-0 border border-stone-200"
                      />
                      <div className="truncate flex-1">
                        <h5 className="text-xs font-semibold text-stone-900 truncate">
                          {prod.title}
                        </h5>
                        <span className="text-xs font-bold text-stone-800">
                          {formatPrice(prod.price)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            addToCart(prod, '18k_gold');
                            setIsStylistOpen(false);
                          }}
                          className="p-2 bg-[#1c1917] hover:bg-[#92702c] text-white rounded-lg transition-colors cursor-pointer"
                          title="Add to Bag"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProduct(prod);
                            setIsStylistOpen(false);
                          }}
                          className="p-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-lg transition-colors cursor-pointer text-xs"
                          title="View Piece"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setAdvice(null)}
                  className="text-xs font-semibold text-[#92702c] hover:underline cursor-pointer"
                >
                  ← Request another styling consultation
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
