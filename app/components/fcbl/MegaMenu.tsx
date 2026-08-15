import React from 'react';
import { useShop } from '~/context/ShopContext';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MegaMenuProps {
  categoryKey: string;
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ categoryKey, isOpen, onClose }) => {
  const { setActiveCategory, products, setSelectedProduct } = useShop();

  if (!isOpen) return null;

  const featuredItem = products.find((p) => p.category === categoryKey || p.isBestseller) || products[0];

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-[#ffffff] border-b border-stone-200 shadow-2xl py-8 px-6 z-40 animate-in fade-in slide-in-from-top-1 duration-200"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Column 1: Subcategories */}
        <div className="col-span-3 border-r border-stone-100 pr-6">
          <h4 className="text-xs uppercase tracking-widest text-[#92702c] font-semibold mb-4">
            Shop By Style
          </h4>
          <ul className="space-y-2.5 text-sm text-stone-700">
            {categoryKey === 'necklaces' && (
              <>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('necklaces');
                      onClose();
                    }}
                    className="hover:text-[#92702c] hover:translate-x-1 transition-all flex items-center gap-1.5"
                  >
                    <span>Royal Kundan & Polki Chokers</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('necklaces');
                      onClose();
                    }}
                    className="hover:text-[#92702c] hover:translate-x-1 transition-all"
                  >
                    Solitaire & Diamond Pendants
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('necklaces');
                      onClose();
                    }}
                    className="hover:text-[#92702c] hover:translate-x-1 transition-all"
                  >
                    18K Layered Chains & Tennis Collars
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('mangalsutras');
                      onClose();
                    }}
                    className="hover:text-[#92702c] hover:translate-x-1 transition-all"
                  >
                    Modern Sacred Mangalsutras
                  </button>
                </li>
              </>
            )}

            {categoryKey === 'earrings' && (
              <>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('earrings');
                      onClose();
                    }}
                    className="hover:text-[#92702c] hover:translate-x-1 transition-all"
                  >
                    Cascade Chandbalis & Drops
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('earrings');
                      onClose();
                    }}
                    className="hover:text-[#92702c] hover:translate-x-1 transition-all"
                  >
                    Solitaire Moissanite Studs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('earrings');
                      onClose();
                    }}
                    className="hover:text-[#92702c] hover:translate-x-1 transition-all"
                  >
                    18K Croissant & Ribbed Huggies
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('earrings');
                      onClose();
                    }}
                    className="hover:text-[#92702c] hover:translate-x-1 transition-all"
                  >
                    Heritage Jhumkas in 22K Finish
                  </button>
                </li>
              </>
            )}

            {categoryKey === 'rings' && (
              <>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('rings');
                      onClose();
                    }}
                    className="hover:text-[#92702c] hover:translate-x-1 transition-all"
                  >
                    Solitaire Engagement Rings
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('rings');
                      onClose();
                    }}
                    className="hover:text-[#92702c] hover:translate-x-1 transition-all"
                  >
                    Eternity & Baguette Diamond Bands
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('rings');
                      onClose();
                    }}
                    className="hover:text-[#92702c] hover:translate-x-1 transition-all"
                  >
                    Antique Royal Polki Rings
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('rings');
                      onClose();
                    }}
                    className="hover:text-[#92702c] hover:translate-x-1 transition-all"
                  >
                    Stackable 18K Gold Bands
                  </button>
                </li>
              </>
            )}

            {categoryKey !== 'necklaces' && categoryKey !== 'earrings' && categoryKey !== 'rings' && (
              <>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory(categoryKey);
                      onClose();
                    }}
                    className="hover:text-[#92702c] hover:translate-x-1 transition-all"
                  >
                    View All In This Category
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('heritage-1904');
                      onClose();
                    }}
                    className="hover:text-[#92702c] hover:translate-x-1 transition-all"
                  >
                    The 1904 Royal Vault Collection
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      onClose();
                    }}
                    className="hover:text-[#92702c] hover:translate-x-1 transition-all"
                  >
                    Palmonas Bestseller Edit
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Column 2: Metal & Materials */}
        <div className="col-span-3 border-r border-stone-100 pr-6">
          <h4 className="text-xs uppercase tracking-widest text-[#92702c] font-semibold mb-4">
            Curated Metals
          </h4>
          <div className="space-y-3">
            <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/50">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-900">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
                <span>18K Gold Vermeil</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5">
                Thick 5-micron layer of gold over pure 925 sterling silver.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-rose-50/60 border border-rose-200/50">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-900">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E0A899]"></span>
                <span>18K Rose Gold</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5">
                Infused with warm copper notes for romantic allure.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-stone-50 border border-stone-200/60">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-900">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span>925 Sterling Silver</span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5">
                Rhodium dipped for brilliant platinum sheen & zero tarnishing.
              </p>
            </div>
          </div>
        </div>

        {/* Column 3: Featured Banner / Product Spotlight */}
        <div className="col-span-6 flex gap-4 bg-gradient-to-r from-[#fcfbf9] to-[#f7f3eb] p-4 rounded-xl border border-stone-200/80">
          <div className="w-40 h-40 overflow-hidden rounded-lg relative shrink-0 shadow-sm">
            <img
              src={featuredItem.images[0]}
              alt={featuredItem.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-2 left-2 bg-[#1c1917] text-[#d4af37] text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow">
              Bestseller
            </span>
          </div>

          <div className="flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#92702c] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Palmonas x FCBL Spotlight</span>
              </div>
              <h5 className="font-serif text-base font-medium text-stone-900 mt-1 line-clamp-2">
                {featuredItem.title}
              </h5>
              <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                {featuredItem.subtitle}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-200/60">
              <div>
                <span className="text-xs text-stone-400 line-through mr-1.5">
                  ₹{featuredItem.compareAtPrice.toLocaleString('en-IN')}
                </span>
                <span className="font-semibold text-sm text-stone-900">
                  ₹{featuredItem.price.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                onClick={() => {
                  setSelectedProduct(featuredItem);
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#1c1917] hover:bg-[#92702c] px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
              >
                <span>Quick View</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
