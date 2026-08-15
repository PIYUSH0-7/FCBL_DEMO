import React, { useState, useMemo } from 'react';
import { useShop } from '~/context/ShopContext';
import { Search, X, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';

const TRENDING_KEYWORDS = [
  'Solitaire Ring',
  'Polki Choker',
  'Tennis Bracelet',
  '18K Gold',
  'Mangalsutra',
  'Chandbali Earrings',
  'Men Signet',
  'Under ₹1999',
];

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    setSelectedProduct,
    addToCart,
    formatPrice,
  } = useShop();

  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return products.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        (p.celebrityName && p.celebrityName.toLowerCase().includes(q))
      );
    });
  }, [products, query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/75 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden mt-8 sm:mt-12 border border-stone-200">
        
        {/* Search Header Bar */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex items-center gap-3 bg-[#faf8f5]">
          <Search className="w-6 h-6 text-[#92702c] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jewellery, 18k gold vermeil, polki chokers, rings..."
            className="w-full text-base sm:text-lg bg-transparent border-none focus:outline-hidden text-stone-900 placeholder:text-stone-400 font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-700 p-1 text-xs cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-stone-500 hover:text-stone-900 rounded-full hover:bg-stone-200 transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Trending Keywords */}
        <div className="px-4 sm:px-6 py-3 bg-white border-b border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] uppercase tracking-wider text-[#92702c] font-bold shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Trending:
          </span>
          {TRENDING_KEYWORDS.map((kw) => (
            <button
              key={kw}
              onClick={() => setQuery(kw)}
              className="text-xs bg-stone-100 hover:bg-amber-50 hover:text-[#92702c] hover:border-[#d4af37]/60 text-stone-700 px-3 py-1 rounded-full border border-stone-200 shrink-0 transition-colors cursor-pointer"
            >
              {kw}
            </button>
          ))}
        </div>

        {/* Results Area */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <h4 className="text-xs uppercase tracking-widest text-stone-400 font-bold mb-3">
                Suggested Royal Bestsellers
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {products.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedProduct(item);
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-stone-200/80 hover:border-[#92702c] hover:bg-amber-50/40 transition-all cursor-pointer"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-14 h-14 rounded-lg object-cover bg-stone-100 shrink-0"
                    />
                    <div className="truncate flex-1">
                      <h5 className="text-xs font-semibold text-stone-900 truncate">
                        {item.title}
                      </h5>
                      <span className="text-xs font-bold text-stone-800">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-stone-400" />
                  </div>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12">
              <h4 className="font-serif text-base font-semibold text-stone-700">
                No matching jewellery found for "{query}"
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Try searching for 'Polki', 'Ring', 'Necklace', 'Bracelet' or browse our categories.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <span className="text-xs text-stone-500 font-medium block">
                Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-stone-200 hover:border-[#92702c] bg-white transition-all group"
                  >
                    <div
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsSearchOpen(false);
                      }}
                      className="flex items-center gap-3 overflow-hidden cursor-pointer flex-1"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0"
                      />
                      <div className="truncate">
                        <span className="text-[10px] uppercase font-bold text-[#92702c] tracking-wider block">
                          {product.categoryLabel}
                        </span>
                        <h5 className="text-xs font-semibold text-stone-900 truncate group-hover:text-[#92702c]">
                          {product.title}
                        </h5>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-stone-900">
                            {formatPrice(product.price)}
                          </span>
                          <span className="text-[10px] text-stone-400 line-through">
                            {formatPrice(product.compareAtPrice)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(product, '18k_gold')}
                      className="p-2 bg-[#1c1917] hover:bg-[#92702c] text-white rounded-lg transition-colors cursor-pointer shrink-0 ml-2"
                      title="Add to Bag"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
