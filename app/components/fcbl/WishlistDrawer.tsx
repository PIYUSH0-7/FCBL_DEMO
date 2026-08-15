import React from 'react';
import { useShop } from '~/context/ShopContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    formatPrice,
    setSelectedProduct,
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedItems = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#1c1917] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            <h3 className="font-serif text-base font-bold tracking-wider uppercase">
              Saved Royal Pieces ({wishlist.length})
            </h3>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlistedItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-800">
                No saved jewellery yet
              </h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Tap the heart icon on any piece you love to save it to your royal wishlist.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="mt-5 inline-flex items-center gap-2 bg-[#1c1917] hover:bg-[#92702c] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                <span>Explore Jewels</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            wishlistedItems.map((product) => (
              <div
                key={product.id}
                className="flex gap-3.5 p-3 rounded-xl bg-stone-50 border border-stone-200 relative group"
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsWishlistOpen(false);
                  }}
                  className="w-20 h-20 rounded-lg object-cover bg-white border border-stone-200 shrink-0 cursor-pointer"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsWishlistOpen(false);
                        }}
                        className="font-serif text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1 hover:text-[#92702c] cursor-pointer"
                      >
                        {product.title}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[11px] text-stone-500 block mt-0.5">
                      {product.subtitle}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                    <span className="text-xs sm:text-sm font-bold text-stone-900">
                      {formatPrice(product.price)}
                    </span>

                    <button
                      onClick={() => {
                        addToCart(product, '18k_gold');
                        toggleWishlist(product.id);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#1c1917] hover:bg-[#92702c] text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistedItems.length > 0 && (
          <div className="p-4 bg-white border-t border-stone-200">
            <button
              onClick={() => {
                wishlistedItems.forEach((p) => addToCart(p, '18k_gold'));
                setIsWishlistOpen(false);
              }}
              className="w-full bg-[#92702c] hover:bg-[#b08d4b] text-white font-bold py-3 px-4 rounded-xl text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span>Move All ({wishlistedItems.length}) to Bag</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
