import React, { useState } from 'react';
import { ShopifyProduct, MetalFinish } from '~/types';
import { useShop } from '~/context/ShopContext';
import { Heart, Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    formatPrice,
    addToCart,
    toggleWishlist,
    isWishlisted,
    setSelectedProduct,
  } = useShop();

  const [selectedMetal, setSelectedMetal] = useState<MetalFinish>('18k_gold');
  const [isHovered, setIsHovered] = useState(false);
  const [quickSize, setQuickSize] = useState<string | undefined>(
    product.availableSizes?.[0]
  );

  const activeMetalOpt = product.metalOptions.find((m) => m.id === selectedMetal) || product.metalOptions[0];
  const activeImage = product.images[activeMetalOpt?.imageIndex || 0] || product.images[0];
  const displayImage = isHovered && product.hoverImage ? product.hoverImage : activeImage;
  const wishlisted = isWishlisted(product.id);

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative bg-white rounded-xl border border-stone-200/80 hover:border-[#d4af37]/60 transition-all duration-300 hover:shadow-xl flex flex-col justify-between overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-stone-100 cursor-pointer"
           onClick={() => setSelectedProduct(product)}>
        
        {/* Product Image with smooth transition */}
        <img
          src={displayImage}
          alt={product.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.discountPercent > 0 && (
            <span className="bg-[#1c1917] text-[#d4af37] text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded shadow-sm tracking-tight">
              {product.discountPercent}% OFF
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#92702c] text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
              Bestseller
            </span>
          )}
          {product.category === 'heritage-1904' && (
            <span className="bg-[#800020] text-amber-100 text-[9px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
              1904 Vault
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 cursor-pointer ${
            wishlisted
              ? 'bg-rose-50 text-rose-600 shadow-md'
              : 'bg-white/80 hover:bg-white text-stone-700 hover:text-rose-600 shadow-sm'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        {/* Celebrity Endorsement Tag */}
        {product.isCelebrityWorn && product.celebrityName && (
          <div className="absolute bottom-2.5 left-2.5 z-10 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-medium text-stone-900 border border-stone-200/60 flex items-center gap-1 shadow-xs">
            <Sparkles className="w-2.5 h-2.5 text-[#92702c]" />
            <span>As Seen On {product.celebrityName}</span>
          </div>
        )}

        {/* Quick View Hover Action */}
        <div className="absolute inset-x-3 bottom-3 hidden lg:flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="w-full bg-[#1c1917]/90 hover:bg-[#1c1917] text-white text-xs font-semibold py-2.5 rounded-lg backdrop-blur-xs flex items-center justify-center gap-1.5 shadow-lg transition-transform transform active:scale-95 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1">
        
        <div>
          {/* Metal Finish Swatches */}
          <div className="flex items-center gap-2 mb-2">
            {product.metalOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedMetal(opt.id)}
                title={opt.label}
                className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                  selectedMetal === opt.id
                    ? 'ring-2 ring-[#92702c] ring-offset-1 scale-110'
                    : 'hover:scale-105 border border-stone-300'
                }`}
                style={{ backgroundColor: opt.hexColor }}
              />
            ))}
            <span className="text-[10px] text-stone-500 font-medium ml-1">
              {activeMetalOpt?.label}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-1">
            <div className="flex items-center text-[#d4af37]">
              <Star className="w-3.5 h-3.5 fill-[#d4af37]" />
            </div>
            <span className="text-xs font-bold text-stone-800">{product.rating}</span>
            <span className="text-[11px] text-stone-400">({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <h4
            onClick={() => setSelectedProduct(product)}
            className="font-serif text-sm sm:text-base font-semibold text-stone-900 line-clamp-2 hover:text-[#92702c] transition-colors cursor-pointer"
          >
            {product.title}
          </h4>

          {/* Subtitle */}
          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Cart Actions */}
        <div className="mt-3 pt-3 border-t border-stone-100">
          
          <div className="flex items-baseline gap-2 mb-2.5">
            <span className="font-bold text-base sm:text-lg text-stone-900">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-stone-400 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
            <span className="text-[11px] text-emerald-700 font-semibold ml-auto">
              Save {formatPrice(product.compareAtPrice - product.price)}
            </span>
          </div>

          {/* Size dropdown if rings or chains */}
          {product.availableSizes && product.availableSizes.length > 0 && (
            <div className="mb-2">
              <select
                value={quickSize}
                onChange={(e) => setQuickSize(e.target.value)}
                className="w-full text-[11px] py-1 px-2 border border-stone-200 rounded bg-stone-50 text-stone-800 focus:outline-hidden focus:border-[#92702c]"
              >
                {product.availableSizes.map((sz) => (
                  <option key={sz} value={sz}>
                    Size: {sz}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Add to Bag Button */}
          <button
            onClick={() => addToCart(product, selectedMetal, quickSize)}
            className="w-full bg-[#1c1917] hover:bg-[#92702c] text-white text-xs font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Royal Bag</span>
          </button>

        </div>

      </div>
    </div>
  );
};
