import React from 'react';
import { useShop } from '../context/ShopContext';

const CATEGORIES = [
  {
    id: 'all',
    label: 'All Jewels',
    count: '30+ Designs',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80',
    highlight: false,
  },
  {
    id: 'necklaces',
    label: 'Necklaces',
    count: 'Chokers & Pendants',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=400&q=80',
    highlight: false,
  },
  {
    id: 'earrings',
    label: 'Earrings',
    count: 'Chandbalis & Studs',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=400&q=80',
    highlight: false,
  },
  {
    id: 'rings',
    label: 'Rings & Bands',
    count: 'Solitaires & Bands',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=400&q=80',
    highlight: false,
  },
  {
    id: 'bracelets',
    label: 'Bracelets',
    count: 'Tennis & Bangles',
    image: 'https://images.unsplash.com/photo-1611591477281-497bf8876c12?auto=format&fit=crop&w=400&q=80',
    highlight: false,
  },
  {
    id: 'mangalsutras',
    label: 'Mangalsutras',
    count: 'Modern Sacred',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=400&q=80',
    highlight: false,
  },
  {
    id: 'heritage-1904',
    label: '1904 Vault',
    count: 'Royal Polki & Jadau',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80',
    highlight: true,
  },
  {
    id: 'mens',
    label: "Men's Jewels",
    count: 'Signets & Chains',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=400&q=80',
    highlight: false,
  },
];

export const CategoryBubbles: React.FC = () => {
  const { activeCategory, setActiveCategory } = useShop();

  return (
    <section id="category-browser" className="py-8 sm:py-12 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#92702c] font-semibold">
            Curated Categories
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Shop By Jewellery Category
          </h3>
          <div className="w-12 h-0.5 bg-[#d4af37] mx-auto mt-2.5 rounded-full" />
        </div>

        {/* Circular / Card Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  document.getElementById('collection-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div
                  className={`w-18 h-18 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 transition-all duration-300 relative ${
                    isSelected
                      ? 'ring-2 ring-[#92702c] shadow-md scale-105 bg-amber-50'
                      : 'hover:ring-2 hover:ring-[#d4af37]/60 bg-white shadow-xs'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                  />
                  {cat.highlight && (
                    <span className="absolute inset-x-0 bottom-0 bg-[#92702c] text-white text-[8px] font-bold py-0.5 text-center uppercase tracking-tighter">
                      1904 Vault
                    </span>
                  )}
                </div>

                <h4
                  className={`mt-2.5 text-xs sm:text-sm font-semibold tracking-tight transition-colors text-center ${
                    isSelected ? 'text-[#92702c] font-bold' : 'text-stone-800 group-hover:text-[#92702c]'
                  }`}
                >
                  {cat.label}
                </h4>

                <span className="text-[10px] text-stone-500 hidden sm:block">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
