export type MetalFinish = '18k_gold' | 'rose_gold' | 'silver_925';

export interface ProductVariant {
  id: string;
  title: string;
  metal: MetalFinish;
  metalLabel: string;
  size?: string;
  price: number;
  compareAtPrice: number;
  sku: string;
  availableForSale: boolean;
  image?: string;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  userImage?: string;
}

export interface ShopifyProduct {
  id: string;
  shopifyId?: string;
  title: string;
  handle: string;
  subtitle: string;
  description: string;
  category: 'necklaces' | 'earrings' | 'rings' | 'bracelets' | 'mangalsutras' | 'mens' | 'bridal' | 'heritage-1904';
  categoryLabel: string;
  subCategory?: string;
  price: number;
  compareAtPrice: number;
  discountPercent: number;
  images: string[];
  hoverImage?: string;
  modelImage?: string;
  metalOptions: {
    id: MetalFinish;
    label: string;
    hexColor: string;
    imageIndex: number;
  }[];
  availableSizes?: string[]; // e.g. ['US 5 / IN 10', 'US 6 / IN 12', 'US 7 / IN 14', 'US 8 / IN 16'] or ['2.4', '2.6', '2.8']
  sizeType?: 'ring' | 'bangle' | 'chain_length';
  tags: string[];
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isCelebrityWorn?: boolean;
  celebrityName?: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount?: number;
  specifications: {
    baseMetal: string;
    plating: string;
    stoneType: string;
    coating: string;
    weightGrams?: string;
    hallmark: string;
    warranty: string;
  };
  reviews?: ProductReview[];
}

export interface CartItem {
  id: string; // unique composite key (product.id + metal + size)
  productId: string;
  shopifyVariantId?: string;
  title: string;
  handle: string;
  price: number;
  compareAtPrice: number;
  image: string;
  metal: MetalFinish;
  metalLabel: string;
  size?: string;
  quantity: number;
  engravingText?: string;
  giftBoxIncluded?: boolean;
}

export interface DiscountRule {
  code: string;
  description: string;
  type: 'percentage' | 'fixed' | 'buy_x_get_y';
  value: number; // e.g. 10 for 10%
  minOrderValue?: number;
}

export interface StoryHighlight {
  id: string;
  title: string;
  thumbnail: string;
  badge?: string;
  slides: {
    id: string;
    type: 'image' | 'video';
    mediaUrl: string;
    headline: string;
    subheadline: string;
    taggedProduct?: ShopifyProduct;
  }[];
}

export interface CelebrityLook {
  id: string;
  celebrityName: string;
  role: string;
  outfitOccasion: string;
  quote: string;
  image: string;
  videoThumb?: string;
  featuredProductId: string;
}

export type CurrencyCode = 'INR' | 'USD' | 'AED' | 'GBP' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  exchangeRate: number; // relative to INR
  name: string;
}
