import React, { useState } from 'react';
import { useShop } from '~/context/ShopContext';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Gift,
  Tag,
  Check
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateQuantity,
    removeFromCart,
    cartTotal,
    cartOriginalTotal,
    cartDiscountSavings,
    formatPrice,
    amountNeededForFreeShipping,
    freeShippingThreshold,
    appliedDiscount,
    applyDiscountCode,
    removeDiscountCode,
    proceedToCheckout,
    isCheckingOut,
    products,
    addToCart,
    setIsCheckoutOpen,
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);

  if (!isCartOpen) return null;

  const rawSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingProgress = Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (codeToApply?: string) => {
    const code = (codeToApply || couponInput).trim();
    if (!code) return;
    const res = applyDiscountCode(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Upsell suggestion item (e.g. Ring or Studs)
  const upsellItem = products.find((p) => !cart.some((c) => c.productId === p.id)) || products[1];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#1c1917] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 border border-[#d4af37] rotate-45 flex items-center justify-center bg-black">
              <span className="-rotate-45 font-serif text-[10px] font-bold text-[#d4af37]">fcj</span>
            </div>
            <div>
              <h3 className="font-serif text-base font-bold tracking-wider uppercase">
                Your Royal Bag
              </h3>
              <p className="text-[10px] text-stone-400">
                {cart.length} {cart.length === 1 ? 'Piece' : 'Pieces'} Selected
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#faf8f5] p-3.5 border-b border-stone-200">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1.5">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#92702c]" />
              {amountNeededForFreeShipping === 0 ? (
                <span className="text-emerald-700 font-bold">🎉 You unlocked FREE Express Air Shipping!</span>
              ) : (
                <span>
                  Add <strong className="text-[#92702c]">{formatPrice(amountNeededForFreeShipping)}</strong> for <strong>FREE Air Shipping</strong>
                </span>
              )}
            </div>
            <span className="text-[11px] text-stone-500">{freeShippingProgress}%</span>
          </div>

          <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#92702c] transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-800">Your bag is empty</h4>
              <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                Explore our 18K gold vermeil & royal polki heritage jewellery from Fateh Chand Jewels.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-5 inline-flex items-center gap-2 bg-[#1c1917] hover:bg-[#92702c] text-white text-xs font-bold px-6 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                <span>Discover Collections</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-xl bg-stone-50/80 border border-stone-200/80 relative"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-lg object-cover bg-white border border-stone-200 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-xs sm:text-sm font-semibold text-stone-900 line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        <span className="text-[10px] bg-amber-100/80 text-stone-800 px-2 py-0.5 rounded font-medium">
                          {item.metalLabel}
                        </span>
                        {item.size && (
                          <span className="text-[10px] bg-stone-200 text-stone-800 px-2 py-0.5 rounded font-medium">
                            {item.size}
                          </span>
                        )}
                        {item.giftBoxIncluded && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium flex items-center gap-0.5">
                            <Gift className="w-2.5 h-2.5" /> Velvet Box
                          </span>
                        )}
                      </div>

                      {item.engravingText && (
                        <p className="text-[10px] text-[#92702c] font-serif italic mt-0.5">
                          Engraving: "{item.engravingText}"
                        </p>
                      )}
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-200/60">
                      <div className="flex items-center border border-stone-300 rounded bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-500 hover:text-stone-900 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-bold text-stone-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        {item.compareAtPrice > item.price && (
                          <span className="block text-[10px] text-stone-400 line-through">
                            {formatPrice(item.compareAtPrice * item.quantity)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Upsell Widget */}
              {upsellItem && (
                <div className="p-3 bg-gradient-to-r from-amber-50 to-stone-50 rounded-xl border border-amber-200 flex items-center justify-between gap-3">
                  <img
                    src={upsellItem.images[0]}
                    alt={upsellItem.title}
                    className="w-12 h-12 rounded-lg object-cover bg-white shrink-0 border border-amber-200"
                  />
                  <div className="truncate flex-1">
                    <span className="text-[10px] uppercase font-bold text-[#92702c] tracking-wider block">
                      Pair With (Complete Look)
                    </span>
                    <h5 className="text-xs font-semibold text-stone-900 truncate">
                      {upsellItem.title}
                    </h5>
                    <span className="text-xs font-bold text-stone-900">
                      {formatPrice(upsellItem.price)}
                    </span>
                  </div>
                  <button
                    onClick={() => addToCart(upsellItem, '18k_gold')}
                    className="text-xs font-bold bg-[#1c1917] hover:bg-[#92702c] text-white px-3 py-1.5 rounded-lg shrink-0 transition-colors cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Drawer Footer / Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-stone-200 shadow-lg space-y-3">
            
            {/* Coupon Code Section */}
            <div>
              {appliedDiscount ? (
                <div className="flex items-center justify-between p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{appliedDiscount.code}</strong> Applied!</span>
                  </div>
                  <button
                    onClick={removeDiscountCode}
                    className="text-rose-600 font-bold hover:underline cursor-pointer text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value);
                          setCouponError('');
                        }}
                        placeholder="Discount Code (e.g. FCBL10)"
                        className="w-full text-xs pl-8 pr-2 py-2 rounded-lg border border-stone-300 uppercase focus:outline-hidden focus:border-[#92702c]"
                      />
                    </div>
                    <button
                      onClick={() => handleApplyCoupon()}
                      className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>
                  )}
                  {/* Quick Coupon Suggestions */}
                  <div className="flex gap-1.5 mt-2">
                    <button
                      onClick={() => handleApplyCoupon('FCBL10')}
                      className="text-[10px] bg-amber-50 text-[#92702c] border border-amber-200 px-2 py-0.5 rounded font-mono font-bold hover:bg-amber-100 cursor-pointer"
                    >
                      FCBL10 (-10%)
                    </button>
                    <button
                      onClick={() => handleApplyCoupon('ROYAL1904')}
                      className="text-[10px] bg-amber-50 text-[#92702c] border border-amber-200 px-2 py-0.5 rounded font-mono font-bold hover:bg-amber-100 cursor-pointer"
                    >
                      ROYAL1904 (-₹500)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1.5 text-xs pt-2 border-t border-stone-100">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal (MRP)</span>
                <span>{formatPrice(cartOriginalTotal)}</span>
              </div>

              {cartDiscountSavings > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Total Savings</span>
                  <span>-{formatPrice(cartDiscountSavings)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-500">
                <span>Express Insured Shipping</span>
                <span>{amountNeededForFreeShipping === 0 ? <strong className="text-emerald-700">FREE</strong> : formatPrice(149)}</span>
              </div>

              <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-stone-200">
                <span>Total Amount</span>
                <span className="text-base text-stone-900">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Shopify Secure Checkout Button */}
            <button
              onClick={handleCheckoutClick}
              disabled={isCheckingOut}
              className="w-full bg-[#1c1917] hover:bg-[#92702c] text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl transition-all duration-300 cursor-pointer"
            >
              <span>{isCheckingOut ? 'Securing Shopify Order...' : 'Proceed to Shopify Checkout'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust Footer */}
            <div className="flex items-center justify-center gap-4 text-[10px] text-stone-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                256-Bit SSL Encrypted
              </span>
              <span>•</span>
              <span>BlueDart Priority Air</span>
              <span>•</span>
              <span>Cash on Delivery</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
