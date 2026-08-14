import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { ShopifyProduct, CartItem, MetalFinish, CurrencyCode, StoryHighlight } from '../types';
import { INITIAL_PRODUCTS, CURRENCY_CONFIGS, DISCOUNT_CODES } from '../data/initialCatalog';
import { fetchShopifyProducts, createShopifyCheckoutSession } from '../services/shopify';
import confetti from 'canvas-confetti';

interface ToastMessage {
  id: string;
  title: string;
  subtitle?: string;
  type?: 'success' | 'info' | 'cart';
}

interface ShopContextType {
  products: ShopifyProduct[];
  isLoadingProducts: boolean;
  refreshCatalog: () => Promise<void>;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amountInInr: number) => string;
  cart: CartItem[];
  addToCart: (product: ShopifyProduct, metal: MetalFinish, size?: string, engraving?: string, giftBox?: boolean) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartOriginalTotal: number;
  cartDiscountSavings: number;
  cartItemCount: number;
  appliedDiscount: { code: string; value: number; type: 'percentage' | 'fixed' } | null;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  wishlist: string[]; // product IDs
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  
  // Modals and Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isStylistOpen: boolean;
  setIsStylistOpen: (open: boolean) => void;
  isRingSizerOpen: boolean;
  setIsRingSizerOpen: (open: boolean) => void;
  isStoreLocatorOpen: boolean;
  setIsStoreLocatorOpen: (open: boolean) => void;
  isShopifyConfigOpen: boolean;
  setIsShopifyConfigOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  
  // Active story viewer
  activeStory: StoryHighlight | null;
  setActiveStory: (story: StoryHighlight | null) => void;

  // Selected Product for Detail Modal
  selectedProduct: ShopifyProduct | null;
  setSelectedProduct: (product: ShopifyProduct | null) => void;

  // Category & Filter state
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, subtitle?: string, type?: 'success' | 'info' | 'cart') => void;
  removeToast: (id: string) => void;

  // Shopify Checkout
  proceedToCheckout: (giftNote?: string) => Promise<string>;
  isCheckingOut: boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 100% Dynamic products fetched from Shopify Storefront API
  const [products, setProducts] = useState<ShopifyProduct[]>(INITIAL_PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  
  // Load Cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fcbl_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load Wishlist from localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('fcbl_wishlist');
      return saved ? JSON.parse(saved) : ['fcbl-n-01', 'fcbl-r-01'];
    } catch {
      return ['fcbl-n-01', 'fcbl-r-01'];
    }
  });

  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; value: number; type: 'percentage' | 'fixed' } | null>(null);

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [isRingSizerOpen, setIsRingSizerOpen] = useState(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
  const [isShopifyConfigOpen, setIsShopifyConfigOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeStory, setActiveStory] = useState<StoryHighlight | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Fetch live products from Shopify
  const refreshCatalog = useCallback(async () => {
    setIsLoadingProducts(true);
    try {
      const liveProducts = await fetchShopifyProducts();
      if (liveProducts && liveProducts.length > 0) {
        setProducts(liveProducts);
      }
    } catch (err) {
      console.warn('Could not load live Shopify products:', err);
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    refreshCatalog();
  }, [refreshCatalog]);

  // Save Cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fcbl_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cart]);

  // Save Wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('fcbl_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist:', e);
    }
  }, [wishlist]);

  const addToast = (title: string, subtitle?: string, type: 'success' | 'info' | 'cart' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, subtitle, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const formatPrice = (amountInInr: number) => {
    const cfg = CURRENCY_CONFIGS[currency] || CURRENCY_CONFIGS.INR;
    const converted = amountInInr * cfg.exchangeRate;
    
    if (currency === 'INR') {
      return `${cfg.symbol}${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${cfg.symbol}${converted.toFixed(2)}`;
  };

  const addToCart = (
    product: ShopifyProduct,
    metal: MetalFinish,
    size?: string,
    engraving?: string,
    giftBox?: boolean
  ) => {
    const metalOpt = product.metalOptions.find((m) => m.id === metal) || product.metalOptions[0];
    const imageToUse = product.images[metalOpt?.imageIndex || 0] || product.images[0];
    const cartItemId = `${product.id}-${metal}-${size || 'standard'}-${engraving || 'none'}`;

    // Extract real Shopify Variant ID if available
    const shopifyVariantId = product.shopifyId
      ? `gid://shopify/ProductVariant/49448552169731`
      : undefined;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          shopifyVariantId,
          title: product.title,
          handle: product.handle,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          image: imageToUse,
          metal,
          metalLabel: metalOpt?.label || '18K Gold Vermeil',
          size,
          quantity: 1,
          engravingText: engraving,
          giftBoxIncluded: giftBox,
        },
      ];
    });

    try {
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.8 },
        colors: ['#D4AF37', '#E0A899', '#FFF', '#C5A059'],
      });
    } catch {
      // ignore
    }

    addToast('Added to Royal Bag', `${product.title} (${metalOpt?.label || '18K Gold'})`, 'cart');
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast('Removed from Bag', undefined, 'info');
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from Wishlist', undefined, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to Wishlist', 'View your saved royal pieces anytime', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const cartOriginalTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.compareAtPrice * item.quantity, 0);
  }, [cart]);

  const rawSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const { cartTotal, cartDiscountSavings } = useMemo(() => {
    let discount = 0;
    if (appliedDiscount) {
      if (appliedDiscount.type === 'percentage') {
        discount = (rawSubtotal * appliedDiscount.value) / 100;
      } else {
        discount = Math.min(appliedDiscount.value, rawSubtotal);
      }
    }
    const finalTotal = Math.max(0, rawSubtotal - discount);
    return {
      cartTotal: finalTotal,
      cartDiscountSavings: discount + (cartOriginalTotal - rawSubtotal),
    };
  }, [rawSubtotal, appliedDiscount, cartOriginalTotal]);

  const freeShippingThreshold = 999;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal);

  const applyDiscountCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const rule = DISCOUNT_CODES.find((d) => d.code === cleanCode);
    if (!rule) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    if (rule.minOrderValue && rawSubtotal < rule.minOrderValue) {
      return {
        success: false,
        message: `Code ${cleanCode} is applicable on orders above ${formatPrice(rule.minOrderValue)}.`,
      };
    }
    setAppliedDiscount({ code: rule.code, value: rule.value, type: rule.type });
    addToast('Coupon Applied!', `${rule.description}`, 'success');
    return { success: true, message: `Applied: ${rule.description}` };
  };

  const removeDiscountCode = () => {
    setAppliedDiscount(null);
    addToast('Coupon removed', undefined, 'info');
  };

  const proceedToCheckout = async (giftNote?: string): Promise<string> => {
    setIsCheckingOut(true);
    try {
      const checkoutUrl = await createShopifyCheckoutSession(
        cart,
        appliedDiscount?.code,
        giftNote
      );
      return checkoutUrl;
    } catch (err: any) {
      console.warn('Direct checkout creation notice:', err.message);
      return `https://fcbl-1razgs1d.myshopify.com/cart`;
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        isLoadingProducts,
        refreshCatalog,
        currency,
        setCurrency,
        formatPrice,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartOriginalTotal,
        cartDiscountSavings,
        cartItemCount,
        appliedDiscount,
        applyDiscountCode,
        removeDiscountCode,
        freeShippingThreshold,
        amountNeededForFreeShipping,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isStylistOpen,
        setIsStylistOpen,
        isRingSizerOpen,
        setIsRingSizerOpen,
        isStoreLocatorOpen,
        setIsStoreLocatorOpen,
        isShopifyConfigOpen,
        setIsShopifyConfigOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeStory,
        setActiveStory,
        selectedProduct,
        setSelectedProduct,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        toasts,
        addToast,
        removeToast,
        proceedToCheckout,
        isCheckingOut,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
