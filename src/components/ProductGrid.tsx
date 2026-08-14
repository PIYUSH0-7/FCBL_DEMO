import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, Sparkles } from 'lucide-react';

export const ProductGrid: React.FC = () => {
  const { products, activeCategory, setActiveCategory } = useShop();

  const [sortBy, setSortBy] = useState<'bestsellers' | 'price-asc' | 'price-desc' | 'rating'>('bestsellers');
  const [selectedMetalFilter, setSelectedMetalFilter] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(10000);

  const CATEGORY_TABS = [
    { id: 'all', label: 'All Pieces' },
    { id: 'bestsellers', label: '🔥 Bestsellers' },
    { id: 'heritage-1904', label: '👑 1904 Royal Vault' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'rings', label: 'Rings' },
    { id: 'bracelets', label: 'Bracelets' },
    { id: 'mangalsutras', label: 'Mangalsutras' },
    { id: 'mens', label: "Men's" },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (activeCategory === 'bestsellers') {
          if (!product.isBestseller) return false;
        } else if (activeCategory !== 'all') {
          if (product.category !== activeCategory) return false;
        }

        // Metal filter
        if (selectedMetalFilter !== 'all') {
          const hasMetal = product.metalOptions.some((m) => m.id === selectedMetalFilter);
          if (!hasMetal) return false;
        }

        // Price filter
        if (product.price > priceMax) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // default bestsellers
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      });
  }, [products, activeCategory, selectedMetalFilter, priceMax, sortBy]);

  return (
    <section id="collection-grid" className="py-10 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#92702c] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The FCBL Signature Collection</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 capitalize">
              {activeCategory === 'all'
                ? 'All Jewellery & Demi-Fine Drops'
                : activeCategory === 'heritage-1904'
                ? 'The 1904 Royal Heritage Vault'
                : activeCategory === 'bestsellers'
                ? 'Most Loved Bestsellers'
                : `${activeCategory} Collection`}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              18K Thick Gold Vermeil, 925 Sterling Silver & Precious Uncut Polki. Certified Hallmarked.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="text-right shrink-0">
            <span className="text-xs font-semibold text-stone-600 bg-stone-100 px-3 py-1.5 rounded-full">
              Showing {filteredProducts.length} Heirloom Designs
            </span>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-6">
          {CATEGORY_TABS.map((tab) => {
            const isTabActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isTabActive
                    ? 'bg-[#1c1917] text-white shadow-md'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter & Sort Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-[#faf8f5] p-3.5 rounded-xl border border-stone-200/80 mb-8">
          
          {/* Metal Filter Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-600 flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#92702c]" />
              <span>Metal Finish:</span>
            </span>
            <div className="flex gap-1.5">
              {[
                { id: 'all', label: 'All' },
                { id: '18k_gold', label: '18K Gold' },
                { id: 'rose_gold', label: 'Rose Gold' },
                { id: 'silver_925', label: '925 Silver' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMetalFilter(m.id)}
                  className={`text-[11px] px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    selectedMetalFilter === m.id
                      ? 'bg-[#92702c] text-white font-semibold'
                      : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-600 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#92702c]" />
              <span>Sort By:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-white border border-stone-300 rounded-lg px-3 py-1.5 text-stone-800 focus:outline-hidden focus:border-[#92702c]"
            >
              <option value="bestsellers">Featured & Bestselling</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated (Customer Reviews)</option>
            </select>
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
            <h4 className="font-serif text-lg text-stone-700 font-semibold">
              No jewellery pieces match your exact filter.
            </h4>
            <p className="text-xs text-stone-500 mt-1">
              Try resetting your metal finish or category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedMetalFilter('all');
                setPriceMax(10000);
              }}
              className="mt-4 inline-flex text-xs font-semibold text-white bg-[#1c1917] px-4 py-2 rounded-full cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
