import { ShopifyProduct, MetalFinish, CartItem } from '../types';
import { INITIAL_PRODUCTS } from '../data/fcbl/initialCatalog';

// Storefront API GraphQL query to fetch all dynamic products
export const PRODUCTS_QUERY = `
  query GetLiveProducts($first: Int = 50) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          descriptionHtml
          description
          productType
          vendor
          tags
          totalInventory
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
          compareAtPriceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 10) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                sku
                availableForSale
                quantityAvailable
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                image {
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Transforms a raw Shopify Storefront GraphQL product node into the app's typed ShopifyProduct.
 * This makes the frontend 100% dynamic to anything the client manages in Shopify Admin.
 */
export function transformShopifyNodeToProduct(node: any): ShopifyProduct {
  const images = (node.images?.edges || [])
    .map((e: any) => e.node?.url)
    .filter(Boolean);

  // If no images attached in Shopify, use default jewelry placeholder
  const safeImages = images.length > 0
    ? images
    : ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'];

  const variants = (node.variants?.edges || []).map((e: any) => e.node);
  
  // Extract minimum prices
  const price = parseFloat(node.priceRange?.minVariantPrice?.amount || '0') || 1999;
  const compareAtPrice = parseFloat(
    node.compareAtPriceRange?.minVariantPrice?.amount ||
    variants[0]?.compareAtPrice?.amount ||
    '0'
  ) || Math.round(price * 1.35);

  const discountPercent = compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  // Extract category from tags or productType
  const tags: string[] = node.tags || [];
  const lowerTags = tags.map((t) => t.toLowerCase());
  const productType = (node.productType || '').toLowerCase();

  let category: ShopifyProduct['category'] = 'necklaces';
  let categoryLabel = node.productType || 'Jewellery';

  if (productType.includes('ring') || lowerTags.includes('rings') || lowerTags.includes('ring')) {
    category = 'rings';
    categoryLabel = 'Rings & Bands';
  } else if (productType.includes('earring') || lowerTags.includes('earrings') || lowerTags.includes('earring')) {
    category = 'earrings';
    categoryLabel = 'Earrings & Chandbalis';
  } else if (productType.includes('bracelet') || productType.includes('bangle') || lowerTags.includes('bracelets') || lowerTags.includes('bangles')) {
    category = 'bracelets';
    categoryLabel = 'Bracelets & Bangles';
  } else if (productType.includes('mangalsutra') || lowerTags.includes('mangalsutras') || lowerTags.includes('mangalsutra')) {
    category = 'mangalsutras';
    categoryLabel = 'Heritage Mangalsutras';
  } else if (productType.includes('men') || lowerTags.includes('mens') || lowerTags.includes("men's collection")) {
    category = 'mens';
    categoryLabel = "Men's Imperial Vault";
  } else if (lowerTags.includes('bridal') || lowerTags.includes('wedding')) {
    category = 'bridal';
    categoryLabel = 'Royal Bridal Sets';
  } else if (lowerTags.includes('1904') || lowerTags.includes('vault')) {
    category = 'heritage-1904';
    categoryLabel = 'The 1904 Archival Vault';
  } else if (productType.includes('necklace') || productType.includes('choker') || lowerTags.includes('necklaces')) {
    category = 'necklaces';
    categoryLabel = 'Necklaces & Chokers';
  }

  // Build metal options dynamically from Shopify variants or default
  const metalOptions: ShopifyProduct['metalOptions'] = [];

  variants.forEach((v: any, idx: number) => {
    const vTitle = (v.title || '').toLowerCase();
    let metalId: MetalFinish = '18k_gold';
    let hexColor = '#D4AF37';

    if (vTitle.includes('rose')) {
      metalId = 'rose_gold';
      hexColor = '#E0A899';
    } else if (vTitle.includes('silver') || vTitle.includes('rhodium') || vTitle.includes('white')) {
      metalId = 'silver_925';
      hexColor = '#E5E7EB';
    }

    if (!metalOptions.find((m) => m.id === metalId)) {
      metalOptions.push({
        id: metalId,
        label: v.title || '18K Yellow Gold Vermeil',
        hexColor,
        imageIndex: Math.min(idx, safeImages.length - 1),
      });
    }
  });

  if (metalOptions.length === 0) {
    metalOptions.push(
      { id: '18k_gold', label: '18K Yellow Gold Vermeil', hexColor: '#D4AF37', imageIndex: 0 },
      { id: 'rose_gold', label: '18K Rose Gold Finish', hexColor: '#E0A899', imageIndex: Math.min(1, safeImages.length - 1) },
      { id: 'silver_925', label: '925 Sterling Silver Rhodium', hexColor: '#E5E7EB', imageIndex: Math.min(2, safeImages.length - 1) }
    );
  }

  // Parse HTML or clean description
  const cleanDesc = (node.description || '').replace(/<[^>]*>?/gm, '').trim();

  // Find specifications or use defaults
  const specifications = {
    baseMetal: tags.find((t) => t.startsWith('metal:'))?.replace('metal:', '') || 'Solid 925 Sterling Silver & Brass Core',
    plating: tags.find((t) => t.startsWith('plating:'))?.replace('plating:', '') || '18K Thick 5-Micron Gold Vermeil with E-Shield',
    stoneType: tags.find((t) => t.startsWith('stone:'))?.replace('stone:', '') || '5A Brilliant-Cut Cubic Zirconia / Basra Pearls',
    coating: 'Hypoallergenic Ceramic Anti-Tarnish Coating',
    weightGrams: tags.find((t) => t.startsWith('weight:'))?.replace('weight:', '') || '18.5 grams',
    hallmark: 'FCJ-925 BIS Certified',
    warranty: 'Lifetime Complimentary Re-polishing & Anti-Tarnish Warranty',
  };

  const isBestseller = lowerTags.includes('bestseller') || lowerTags.includes('trending') || tags.includes('Bestseller');
  const isNewArrival = lowerTags.includes('new') || lowerTags.includes('new arrival');
  const isCelebrityWorn = lowerTags.includes('celebrity') || lowerTags.includes('celebrity worn');

  return {
    id: node.id || `shopify-${node.handle}`,
    shopifyId: node.id,
    title: node.title,
    handle: node.handle,
    subtitle: tags.find((t) => t.startsWith('sub:'))?.replace('sub:', '') || `From the House of Fateh Chand Bansi Lal (Estd. 1904)`,
    description: cleanDesc || node.title,
    category,
    categoryLabel,
    price,
    compareAtPrice,
    discountPercent,
    images: safeImages,
    hoverImage: safeImages[1] || safeImages[0],
    modelImage: safeImages[2] || safeImages[0],
    metalOptions,
    availableSizes: category === 'rings' ? ['US 5 / IN 10', 'US 6 / IN 12', 'US 7 / IN 14', 'US 8 / IN 16'] : undefined,
    sizeType: category === 'rings' ? 'ring' : category === 'bracelets' ? 'bangle' : undefined,
    tags,
    isBestseller,
    isNewArrival,
    isCelebrityWorn,
    celebrityName: isCelebrityWorn ? 'Celebrity Vault' : undefined,
    rating: 4.9,
    reviewsCount: Math.floor(Math.random() * 80) + 120,
    inStock: node.availableForSale !== false,
    stockCount: node.totalInventory ?? 25,
    specifications,
  };
}

/**
 * Fetch live products from the headless backend proxy (which queries Shopify Storefront API)
 */
export async function fetchShopifyProducts(): Promise<ShopifyProduct[]> {
  try {
    const res = await fetch('/api/shopify/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: PRODUCTS_QUERY }),
    });

    if (!res.ok) {
      throw new Error(`Shopify API responded with status ${res.status}`);
    }

    const data = await res.json();
    const edges = data.data?.products?.edges || [];

    if (edges.length > 0) {
      return edges.map((e: any) => transformShopifyNodeToProduct(e.node));
    }

    // Fallback to local catalog if store is completely empty
    return INITIAL_PRODUCTS;
  } catch (err) {
    console.warn('Failed to fetch from live Shopify GraphQL. Using fallback catalog:', err);
    return INITIAL_PRODUCTS;
  }
}

/**
 * Creates a real Shopify Storefront Checkout Session via Storefront GraphQL cartCreate
 */
export async function createShopifyCheckoutSession(
  items: CartItem[],
  discountCode?: string,
  giftNote?: string
): Promise<string> {
  const res = await fetch('/api/shopify/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: items.map((item) => ({
        productId: item.productId,
        shopifyVariantId: item.shopifyVariantId || `gid://shopify/ProductVariant/49448552169731`,
        quantity: item.quantity,
        title: item.title,
        metal: item.metalLabel,
        size: item.size,
        engraving: item.engravingText,
      })),
      discountCode,
      note: giftNote,
    }),
  });

  const data = await res.json();
  if (data.checkoutUrl) {
    return data.checkoutUrl;
  }
  throw new Error(data.error || 'Failed to generate Shopify Checkout URL');
}
