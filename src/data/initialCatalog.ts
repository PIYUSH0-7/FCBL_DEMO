import { ShopifyProduct, StoryHighlight, CelebrityLook, CurrencyConfig } from '../types';

export const CURRENCY_CONFIGS: Record<string, CurrencyConfig> = {
  INR: { code: 'INR', symbol: '₹', exchangeRate: 1, name: 'Indian Rupee (INR)' },
  USD: { code: 'USD', symbol: '$', exchangeRate: 0.012, name: 'US Dollar (USD)' },
  AED: { code: 'AED', symbol: 'د.إ', exchangeRate: 0.044, name: 'UAE Dirham (AED)' },
  GBP: { code: 'GBP', symbol: '£', exchangeRate: 0.0095, name: 'British Pound (GBP)' },
  EUR: { code: 'EUR', symbol: '€', exchangeRate: 0.011, name: 'Euro (EUR)' },
};

export const INITIAL_PRODUCTS: ShopifyProduct[] = [
  {
    id: 'fcbl-n-01',
    shopifyId: 'gid://shopify/Product/8492001',
    title: 'The Royal Kundan & Pearl Heritage Choker Set',
    handle: 'royal-kundan-pearl-heritage-choker-set',
    subtitle: 'From the 1904 Wedding Vault | Hand-strung Basra Pearls & Uncut Polki',
    description: 'An iconic masterwork from the house of Fateh Chand Bansi Lal Jewellers (Estd. 1904). Handcrafted with multi-layered pink tourmalines, seed basra pearls, and an intricate 18K gold vermeil central medallion studded with 5A cubic zirconia and uncut polki. Comes with matching jhumkis and certificate of authenticity.',
    category: 'necklaces',
    categoryLabel: 'Necklaces & Chokers',
    subCategory: 'Heritage Chokers',
    price: 4999,
    compareAtPrice: 7499,
    discountPercent: 33,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611591477281-497bf8876c12?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    hoverImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
    modelImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
    metalOptions: [
      { id: '18k_gold', label: '18K Yellow Gold Vermeil', hexColor: '#D4AF37', imageIndex: 0 },
      { id: 'rose_gold', label: '18K Rose Gold Finish', hexColor: '#E0A899', imageIndex: 1 },
      { id: 'silver_925', label: '925 Sterling Silver Rhodium', hexColor: '#E5E7EB', imageIndex: 2 }
    ],
    tags: ['Bestseller', 'Bridal', 'Heritage 1904', '18K Gold', 'Trending'],
    isBestseller: true,
    isNewArrival: false,
    isCelebrityWorn: true,
    celebrityName: 'Kriti Sanon',
    rating: 4.9,
    reviewsCount: 428,
    inStock: true,
    stockCount: 14,
    specifications: {
      baseMetal: 'Pure 925 Sterling Silver & Brass Core',
      plating: '18K Thick 5-Micron Gold Vermeil with E-Coat Anti-Tarnish',
      stoneType: '5A Brilliant-Cut Cubic Zirconia & Hydro Pink Tourmaline',
      coating: 'Hypoallergenic Skin-Safe Ceramic E-Shield',
      weightGrams: '38.5 grams',
      hallmark: 'FCJ-925 BIS Certified',
      warranty: 'Lifetime Complimentary Re-polishing & 1-Year Full Plating Warranty'
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Ananya Sharma',
        location: 'New Delhi',
        rating: 5,
        title: 'Felt like a royal bride!',
        comment: 'Fateh Chand Jewels has outdone themselves! The choker looks even more breathtaking in person than on Palmonas or FCBL. The pearl stringing is flawless.',
        date: '3 days ago',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Pooja Hegde M.',
        location: 'Mumbai',
        rating: 5,
        title: 'Premium packaging & instant shine',
        comment: 'Received within 48 hours in a rich emerald velvet box with certificate of authenticity. 10/10 recommend.',
        date: '1 week ago',
        verified: true
      }
    ]
  },
  {
    id: 'fcbl-n-02',
    shopifyId: 'gid://shopify/Product/8492002',
    title: 'Celestial 18K Solitaire Diamond Pendant Necklace',
    handle: 'celestial-18k-solitaire-diamond-pendant',
    subtitle: 'Everyday Demi-Fine Luxury | Waterproof & Sweatproof',
    description: 'Minimalist perfection for daily sophistication. Features a radiant 1.5-carat brilliant round-cut lab gem encased in an 18K yellow gold vermeil bezel, suspended along a delicate diamond-cut cable chain.',
    category: 'necklaces',
    categoryLabel: 'Necklaces & Chokers',
    subCategory: 'Pendants',
    price: 1899,
    compareAtPrice: 2899,
    discountPercent: 35,
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=80'
    ],
    hoverImage: 'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1000&q=80',
    metalOptions: [
      { id: '18k_gold', label: '18K Yellow Gold', hexColor: '#D4AF37', imageIndex: 0 },
      { id: 'rose_gold', label: '18K Rose Gold', hexColor: '#E0A899', imageIndex: 1 },
      { id: 'silver_925', label: 'Platinum Rhodium Silver', hexColor: '#E5E7EB', imageIndex: 2 }
    ],
    availableSizes: ['16" + 2" Extender', '18" + 2" Extender'],
    sizeType: 'chain_length',
    tags: ['Everyday Luxury', 'Under 1999', 'Waterproof', 'Bestseller'],
    isBestseller: true,
    isNewArrival: true,
    isCelebrityWorn: true,
    celebrityName: 'Alia Bhatt',
    rating: 4.8,
    reviewsCount: 312,
    inStock: true,
    stockCount: 28,
    specifications: {
      baseMetal: '925 Sterling Silver',
      plating: '18K 2.5-Micron Gold Vermeil',
      stoneType: 'Hearts & Arrows 5A Lab Zirconia',
      coating: 'IP-Vacuum Anti-Tarnish Seal',
      weightGrams: '4.2 grams',
      hallmark: 'FCJ-925',
      warranty: 'Lifetime Warranty against Tarnish'
    }
  },
  {
    id: 'fcbl-r-01',
    shopifyId: 'gid://shopify/Product/8492003',
    title: 'The Empress Emerald-Cut Solitaire Ring',
    handle: 'the-empress-emerald-cut-solitaire-ring',
    subtitle: 'Signature FCBL Solitaire Band | VVS Clarity Finish',
    description: 'An architectural tribute to timeless romance. Features an opulent 3.0 ct emerald-cut stone mounted on a sleek pave band bathed in rich 18K yellow gold vermeil.',
    category: 'rings',
    categoryLabel: 'Rings',
    subCategory: 'Solitaire Rings',
    price: 2299,
    compareAtPrice: 3499,
    discountPercent: 34,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80'
    ],
    hoverImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
    metalOptions: [
      { id: '18k_gold', label: '18K Yellow Gold', hexColor: '#D4AF37', imageIndex: 0 },
      { id: 'rose_gold', label: 'Rose Gold', hexColor: '#E0A899', imageIndex: 1 },
      { id: 'silver_925', label: 'Sterling Silver 925', hexColor: '#E5E7EB', imageIndex: 2 }
    ],
    availableSizes: ['US 5 / IN 10', 'US 6 / IN 12', 'US 7 / IN 14', 'US 8 / IN 16', 'US 9 / IN 18'],
    sizeType: 'ring',
    tags: ['Solitaire', 'Engagement', 'Palmonas Edit', 'Bestseller'],
    isBestseller: true,
    rating: 4.9,
    reviewsCount: 519,
    inStock: true,
    stockCount: 19,
    specifications: {
      baseMetal: 'Solid 925 Sterling Silver',
      plating: '18K Micron Gold with Protective Ceramic Layer',
      stoneType: 'Emerald Cut 5A Moissanite Grade CZ (3.0 Ct)',
      coating: 'Sweat-Resistant E-Coat',
      hallmark: 'FCBL 925',
      warranty: '1 Year Free Replating & Lifetime Stone Security'
    }
  },
  {
    id: 'fcbl-e-01',
    shopifyId: 'gid://shopify/Product/8492004',
    title: 'Cascade Polki Chandbali Earrings',
    handle: 'cascade-polki-chandbali-earrings',
    subtitle: 'From the House of Fateh Chand Bansi Lal | Wedding Edit',
    description: 'Intricately handcrafted chandbalis featuring uncut polki stones set in meenakari gold frames, adorned with natural hydro emeralds and cascading micro seed pearls.',
    category: 'earrings',
    categoryLabel: 'Earrings',
    subCategory: 'Chandbalis & Drops',
    price: 3699,
    compareAtPrice: 5999,
    discountPercent: 38,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611591477281-497bf8876c12?auto=format&fit=crop&w=1000&q=80'
    ],
    hoverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
    metalOptions: [
      { id: '18k_gold', label: '18K Antique Gold', hexColor: '#D4AF37', imageIndex: 0 },
      { id: 'rose_gold', label: 'Rose Gold Finish', hexColor: '#E0A899', imageIndex: 1 }
    ],
    tags: ['Wedding', 'Polki', 'Statement Earrings', 'Celebrity Style'],
    isBestseller: true,
    isCelebrityWorn: true,
    celebrityName: 'Kiara Advani',
    rating: 4.9,
    reviewsCount: 187,
    inStock: true,
    stockCount: 8,
    specifications: {
      baseMetal: 'High Grade 925 Silver Alloy',
      plating: '18K 5-Micron Antique Gold',
      stoneType: 'Uncut Glass Polki & Hydro Emeralds',
      coating: 'Anti-Tarnish Seal',
      hallmark: 'FCJ 1904 Certified',
      warranty: 'Lifetime Free Cleaning & Polish at FCBL Boutiques'
    }
  },
  {
    id: 'fcbl-b-01',
    shopifyId: 'gid://shopify/Product/8492005',
    title: 'The Iconic Classic Tennis Bracelet in 18K Vermeil',
    handle: 'the-iconic-classic-tennis-bracelet-18k-vermeil',
    subtitle: 'Palmonas Signature Look | 4-Prong Setting',
    description: 'The ultimate luxury essential. A continuous ribbon of 3mm round brilliant stones in individual four-prong settings with a double safety clasp. Hypoallergenic, waterproof, and crafted to last a lifetime.',
    category: 'bracelets',
    categoryLabel: 'Bracelets & Bangles',
    subCategory: 'Tennis Bracelets',
    price: 2799,
    compareAtPrice: 4299,
    discountPercent: 35,
    images: [
      'https://images.unsplash.com/photo-1611591477281-497bf8876c12?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=1000&q=80'
    ],
    hoverImage: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
    metalOptions: [
      { id: '18k_gold', label: '18K Yellow Gold', hexColor: '#D4AF37', imageIndex: 0 },
      { id: 'rose_gold', label: 'Rose Gold', hexColor: '#E0A899', imageIndex: 1 },
      { id: 'silver_925', label: '925 Rhodium Silver', hexColor: '#E5E7EB', imageIndex: 2 }
    ],
    availableSizes: ['6.5 Inches (Small)', '7.0 Inches (Medium)', '7.5 Inches (Large)'],
    sizeType: 'bangle',
    tags: ['Bestseller', 'Tennis Bracelet', 'Daily Wear', 'Gifting'],
    isBestseller: true,
    rating: 5.0,
    reviewsCount: 620,
    inStock: true,
    stockCount: 35,
    specifications: {
      baseMetal: 'Solid 925 Sterling Silver',
      plating: '18K Gold Vermeil (Thick 3.5 Microns)',
      stoneType: 'Full Eternity 5A CZ Diamonds',
      coating: 'Clear Armor Anti-Scratch & Anti-Tarnish',
      hallmark: 'FCJ 925',
      warranty: 'Lifetime Guarantee'
    }
  },
  {
    id: 'fcbl-m-01',
    shopifyId: 'gid://shopify/Product/8492006',
    title: 'The Solitaire Eternity Mangalsutra',
    handle: 'the-solitaire-eternity-mangalsutra',
    subtitle: 'Contemporary Sacred Symbolism | 18K Yellow Gold',
    description: 'Reimagining tradition for the modern woman. A delicate string of auspicious black onyx beads paired with a radiant 0.75-carat bezel-set diamond pendant.',
    category: 'mangalsutras',
    categoryLabel: 'Mangalsutras',
    subCategory: 'Modern Mangalsutras',
    price: 2499,
    compareAtPrice: 3899,
    discountPercent: 36,
    images: [
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80'
    ],
    hoverImage: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
    metalOptions: [
      { id: '18k_gold', label: '18K Yellow Gold', hexColor: '#D4AF37', imageIndex: 0 },
      { id: 'rose_gold', label: 'Rose Gold', hexColor: '#E0A899', imageIndex: 1 }
    ],
    availableSizes: ['16 Inches', '18 Inches'],
    sizeType: 'chain_length',
    tags: ['Mangalsutra', 'Sacred', 'Office Wear', 'New Drop'],
    isNewArrival: true,
    isBestseller: true,
    rating: 4.9,
    reviewsCount: 240,
    inStock: true,
    stockCount: 22,
    specifications: {
      baseMetal: '925 Sterling Silver',
      plating: '18K 18ct Yellow Gold Vermeil',
      stoneType: 'Natural Black Spinel Beads & VVS Diamond Simulant',
      coating: 'Daily-Wear Protective Nano-Shield',
      hallmark: 'FCBL Hallmark',
      warranty: 'Lifetime String & Re-plating Protection'
    }
  },
  {
    id: 'fcbl-men-01',
    shopifyId: 'gid://shopify/Product/8492007',
    title: 'The Sovereign Royal Onyx Signet Ring for Men',
    handle: 'the-sovereign-royal-onyx-signet-ring-men',
    subtitle: 'From FCBL Heritage Men’s Collection | Bold & Masculine',
    description: 'Command presence with this heavy solid 925 sterling silver signet ring, plated in 18K yellow gold and crowned with a hand-cut natural black onyx gemstone etched with subtle FCJ insignia.',
    category: 'mens',
    categoryLabel: 'Men’s Collection',
    subCategory: 'Rings',
    price: 2599,
    compareAtPrice: 3999,
    discountPercent: 35,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    hoverImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
    metalOptions: [
      { id: '18k_gold', label: '18K Gold Finish', hexColor: '#D4AF37', imageIndex: 0 },
      { id: 'silver_925', label: 'Oxidised 925 Silver', hexColor: '#9CA3AF', imageIndex: 1 }
    ],
    availableSizes: ['US 9 / IN 18', 'US 10 / IN 20', 'US 11 / IN 22', 'US 12 / IN 24'],
    sizeType: 'ring',
    tags: ['Men', 'Signet Ring', 'Onyx', 'Luxury Gifting'],
    isBestseller: true,
    rating: 4.8,
    reviewsCount: 154,
    inStock: true,
    stockCount: 16,
    specifications: {
      baseMetal: 'Solid 925 Sterling Silver Heavy Gauge',
      plating: '18K Gold / Antiqued Rhodium',
      stoneType: 'Natural Agate Black Onyx',
      coating: 'Scratch-Resistant Anti-Tarnish',
      hallmark: 'FCBL 925',
      warranty: 'Lifetime Material Guarantee'
    }
  },
  {
    id: 'fcbl-h-01',
    shopifyId: 'gid://shopify/Product/8492008',
    title: 'The Padmavati Royal Jadau Haar (1904 Vault)',
    handle: 'the-padmavati-royal-jadau-haar-1904-vault',
    subtitle: 'From the House of Fateh Chand Bansi Lal (Estd. 1904)',
    description: 'An archival royal heritage piece handcrafted by 4th generation master karigars of Fateh Chand Bansi Lal. Features multi-strand Zambian emerald beads, uncut syndicated polki medallions, and an heirloom 22K gold vermeil polish with red meenakari backing.',
    category: 'heritage-1904',
    categoryLabel: 'The 1904 Vault',
    subCategory: 'Bridal Royalty',
    price: 8999,
    compareAtPrice: 14999,
    discountPercent: 40,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80'
    ],
    hoverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
    metalOptions: [
      { id: '18k_gold', label: '22K Royal Gold Plated', hexColor: '#D4AF37', imageIndex: 0 },
      { id: 'rose_gold', label: 'Rose Gold Jadau', hexColor: '#E0A899', imageIndex: 1 }
    ],
    tags: ['1904 Heritage', 'Bridal Masterpiece', 'Heirloom', 'Exclusive'],
    isBestseller: true,
    isCelebrityWorn: true,
    celebrityName: 'Deepika Padukone',
    rating: 5.0,
    reviewsCount: 94,
    inStock: true,
    stockCount: 5,
    specifications: {
      baseMetal: 'Silver-Copper Alloy with 925 Core',
      plating: '22K 10-Micron Royal Heirloom Plating',
      stoneType: 'Uncut Syndicate Polki & Natural Green Tourmaline',
      coating: 'Master Meenakari Enamel & Anti-Oxidation Seal',
      hallmark: 'FCJ 1904 Royal Certificate',
      warranty: 'Lifetime FCBL Vault Support & Safe Custody Maintenance'
    }
  },
  {
    id: 'fcbl-e-02',
    shopifyId: 'gid://shopify/Product/8492009',
    title: 'Chunky Ribbed 18K Gold Huggie Hoops',
    handle: 'chunky-ribbed-18k-gold-huggie-hoops',
    subtitle: 'Palmonas Everyday Icon | Lightweight & Anti-Allergic',
    description: 'The viral ribbed croissant huggies that elevate every casual or boardroom look. Engineered hollow for ultra-light comfort with secure snap-bar closure.',
    category: 'earrings',
    categoryLabel: 'Earrings',
    subCategory: 'Hoops & Huggies',
    price: 1499,
    compareAtPrice: 2299,
    discountPercent: 35,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=80'
    ],
    hoverImage: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=80',
    metalOptions: [
      { id: '18k_gold', label: '18K Yellow Gold', hexColor: '#D4AF37', imageIndex: 0 },
      { id: 'rose_gold', label: '18K Rose Gold', hexColor: '#E0A899', imageIndex: 1 },
      { id: 'silver_925', label: 'Sterling Silver', hexColor: '#E5E7EB', imageIndex: 2 }
    ],
    tags: ['Under 1999', 'Huggies', 'Trending', 'Waterproof'],
    isBestseller: true,
    isNewArrival: true,
    rating: 4.8,
    reviewsCount: 380,
    inStock: true,
    stockCount: 42,
    specifications: {
      baseMetal: 'Hypoallergenic 925 Sterling Silver',
      plating: '18K Thick Gold Vermeil',
      stoneType: 'Plain Polish High Shine',
      coating: 'Anti-Tarnish E-Shield',
      hallmark: 'FCBL 925',
      warranty: 'Lifetime Tarnish-Free'
    }
  },
  {
    id: 'fcbl-b-02',
    shopifyId: 'gid://shopify/Product/8492010',
    title: 'The Clover Quad Mother of Pearl Charm Bracelet',
    handle: 'the-clover-quad-mother-of-pearl-charm-bracelet',
    subtitle: 'Symbol of Luck & Prosperity | Double-Sided Shell Motifs',
    description: 'Four iridescent genuine Mother of Pearl clovers framed by beaded 18K yellow gold contours, linked along a delicate adjustable chain.',
    category: 'bracelets',
    categoryLabel: 'Bracelets & Bangles',
    subCategory: 'Charm Bracelets',
    price: 2199,
    compareAtPrice: 3299,
    discountPercent: 33,
    images: [
      'https://images.unsplash.com/photo-1611591477281-497bf8876c12?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80'
    ],
    hoverImage: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
    metalOptions: [
      { id: '18k_gold', label: '18K Gold Vermeil', hexColor: '#D4AF37', imageIndex: 0 },
      { id: 'rose_gold', label: '18K Rose Gold', hexColor: '#E0A899', imageIndex: 1 },
      { id: 'silver_925', label: 'Sterling Silver', hexColor: '#E5E7EB', imageIndex: 2 }
    ],
    availableSizes: ['6.0" - 7.5" (Adjustable)'],
    sizeType: 'bangle',
    tags: ['Clover', 'Bestseller', 'Gifting', 'Demi-Fine'],
    isBestseller: true,
    rating: 4.9,
    reviewsCount: 467,
    inStock: true,
    stockCount: 25,
    specifications: {
      baseMetal: '925 Sterling Silver',
      plating: '18K Gold Vermeil',
      stoneType: 'Natural Mother of Pearl (Hand-Carved)',
      coating: 'Waterproof E-Coat',
      hallmark: 'FCJ-925',
      warranty: 'Lifetime Tarnish-Free Guarantee'
    }
  }
];

export const STORY_HIGHLIGHTS: StoryHighlight[] = [
  {
    id: 'story-1',
    title: '👑 1904 Vault',
    thumbnail: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80',
    badge: 'Heritage',
    slides: [
      {
        id: 's1-1',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
        headline: '120 Years of Royal Indian Jewellery',
        subheadline: 'Crafted since 1904 by the house of Fateh Chand Bansi Lal Jewellers.',
        taggedProduct: INITIAL_PRODUCTS[0]
      }
    ]
  },
  {
    id: 'story-2',
    title: '✨ Under ₹1999',
    thumbnail: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=300&q=80',
    badge: 'Hot Deal',
    slides: [
      {
        id: 's2-1',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
        headline: 'Affordable Everyday Luxury',
        subheadline: '18K Gold Vermeil necklaces, waterproof & sweatproof for daily wear.',
        taggedProduct: INITIAL_PRODUCTS[1]
      }
    ]
  },
  {
    id: 'story-3',
    title: '💍 Solitaire Edit',
    thumbnail: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=300&q=80',
    badge: 'Trending',
    slides: [
      {
        id: 's3-1',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
        headline: 'VVS Diamond Simulants & Rings',
        subheadline: 'Shine brighter than mined diamonds with lifetime warranty.',
        taggedProduct: INITIAL_PRODUCTS[2]
      }
    ]
  },
  {
    id: 'story-4',
    title: '🌟 Celebrity Look',
    thumbnail: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=300&q=80',
    badge: 'Stars Choice',
    slides: [
      {
        id: 's4-1',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
        headline: 'Spotted on Red Carpets',
        subheadline: 'Loved by leading Bollywood icons and fashion editors across India.',
        taggedProduct: INITIAL_PRODUCTS[3]
      }
    ]
  },
  {
    id: 'story-5',
    title: '🛡️ 1-Yr Warranty',
    thumbnail: 'https://images.unsplash.com/photo-1611591477281-497bf8876c12?auto=format&fit=crop&w=300&q=80',
    badge: 'Trust',
    slides: [
      {
        id: 's5-1',
        type: 'image',
        mediaUrl: 'https://images.unsplash.com/photo-1611591477281-497bf8876c12?auto=format&fit=crop&w=1000&q=80',
        headline: 'The FCBL Authenticity Promise',
        subheadline: 'Free replating, 30-day returns, and BIS hallmarked precious silver core.',
        taggedProduct: INITIAL_PRODUCTS[4]
      }
    ]
  }
];

export const CELEBRITY_LOOKS: CelebrityLook[] = [
  {
    id: 'celeb-1',
    celebrityName: 'Kriti Sanon',
    role: 'Bollywood Actor',
    outfitOccasion: 'Grand Wedding Reception',
    quote: 'FCBL’s heritage jewellery feels timeless. The craftsmanship of Fateh Chand Bansi Lal since 1904 is genuinely unmatched in India.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    featuredProductId: 'fcbl-n-01'
  },
  {
    id: 'celeb-2',
    celebrityName: 'Kiara Advani',
    role: 'Style Icon',
    outfitOccasion: 'Festive Sangeet Glam',
    quote: 'Demi-fine 18k vermeil that looks identical to solid gold heirloom pieces. I never take off my FCBL tennis bracelet and studs!',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    featuredProductId: 'fcbl-b-01'
  },
  {
    id: 'celeb-3',
    celebrityName: 'Alia Bhatt',
    role: 'Global Brand Ambassador',
    outfitOccasion: 'Editorial Cover Shoot',
    quote: 'Minimalist, waterproof and so elegant. The celestial pendant is my everyday companion.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    featuredProductId: 'fcbl-n-02'
  }
];

export const DISCOUNT_CODES = [
  { code: 'FCBL10', description: 'FLAT 10% OFF on your entire first luxury order', type: 'percentage' as const, value: 10 },
  { code: 'ROYAL1904', description: 'FLAT ₹500 OFF on orders above ₹2,999', type: 'fixed' as const, value: 500, minOrderValue: 2999 },
  { code: 'BUY2GET1', description: 'Special Festive Offer: 15% OFF on 2 or more jewellery pieces', type: 'percentage' as const, value: 15, minOrderValue: 3500 },
];
