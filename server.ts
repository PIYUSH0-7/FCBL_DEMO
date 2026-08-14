import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_PRODUCTS } from './src/data/initialCatalog';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Shopify Credentials (dynamic for in-app configuration)
let SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
let SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '';
let SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY || '';
let SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET || '';
let SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN || 'fcbl-1razgs1d.myshopify.com';
let SHOPIFY_API_VERSION = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2024-01';

// Lazy initialize Gemini client
let genAI: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!genAI && process.env.GEMINI_API_KEY) {
    try {
      genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.warn('Failed to initialize GoogleGenAI client:', err);
    }
  }
  return genAI;
}

// 1. Shopify Status & Health Endpoint
app.get('/api/shopify/status', async (req, res) => {
  try {
    const hasStorefrontToken = Boolean(SHOPIFY_STOREFRONT_ACCESS_TOKEN);
    const hasAdminToken = Boolean(SHOPIFY_ADMIN_ACCESS_TOKEN);
    const domain = (req.query.domain as string) || SHOPIFY_STORE_DOMAIN;

    let storefrontLive = false;
    let shopName = 'FCBL';

    if (hasStorefrontToken && domain) {
      try {
        const query = `{
          shop {
            name
            description
            primaryDomain {
              url
              host
            }
          }
        }`;

        const sfRes = await fetch(`https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({ query }),
        });

        if (sfRes.ok) {
          const sfData = await sfRes.json();
          if (sfData.data?.shop?.name) {
            storefrontLive = true;
            shopName = sfData.data.shop.name;
          }
        }
      } catch (err) {
        console.warn('Shopify Storefront ping error:', err);
      }
    }

    res.json({
      success: true,
      store: {
        domain,
        shopName,
        apiVersion: SHOPIFY_API_VERSION,
        storefrontLive,
        adminLive: hasAdminToken,
        hasApiKey: Boolean(SHOPIFY_API_KEY),
        mode: storefrontLive ? 'live_shopify_hydrogen' : 'hydrogen_hybrid_ready',
        tokensMasked: {
          storefront: SHOPIFY_STOREFRONT_ACCESS_TOKEN ? `${SHOPIFY_STOREFRONT_ACCESS_TOKEN.slice(0, 6)}...${SHOPIFY_STOREFRONT_ACCESS_TOKEN.slice(-4)}` : 'Not set',
          admin: SHOPIFY_ADMIN_ACCESS_TOKEN ? `${SHOPIFY_ADMIN_ACCESS_TOKEN.slice(0, 8)}...${SHOPIFY_ADMIN_ACCESS_TOKEN.slice(-4)}` : 'Not set',
          apiKey: SHOPIFY_API_KEY ? `${SHOPIFY_API_KEY.slice(0, 6)}...` : 'Not set',
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Error checking Shopify status' });
  }
});

// Update Shopify Configuration (domain / tokens)
app.post('/api/shopify/update-config', (req, res) => {
  try {
    const { domain, storefrontToken, adminToken } = req.body;
    if (domain) SHOPIFY_STORE_DOMAIN = domain.trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
    if (storefrontToken) SHOPIFY_STOREFRONT_ACCESS_TOKEN = storefrontToken.trim();
    if (adminToken) SHOPIFY_ADMIN_ACCESS_TOKEN = adminToken.trim();

    // Persist to .env
    try {
      const envPath = path.join(process.cwd(), '.env');
      let envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
      if (domain) {
        if (envContent.includes('SHOPIFY_STORE_DOMAIN=')) {
          envContent = envContent.replace(/SHOPIFY_STORE_DOMAIN=.*/g, `SHOPIFY_STORE_DOMAIN="${SHOPIFY_STORE_DOMAIN}"`);
        } else {
          envContent += `\nSHOPIFY_STORE_DOMAIN="${SHOPIFY_STORE_DOMAIN}"`;
        }
      }
      if (storefrontToken) {
        if (envContent.includes('SHOPIFY_STOREFRONT_ACCESS_TOKEN=')) {
          envContent = envContent.replace(/SHOPIFY_STOREFRONT_ACCESS_TOKEN=.*/g, `SHOPIFY_STOREFRONT_ACCESS_TOKEN="${SHOPIFY_STOREFRONT_ACCESS_TOKEN}"`);
        } else {
          envContent += `\nSHOPIFY_STOREFRONT_ACCESS_TOKEN="${SHOPIFY_STOREFRONT_ACCESS_TOKEN}"`;
        }
      }
      if (adminToken) {
        if (envContent.includes('SHOPIFY_ADMIN_ACCESS_TOKEN=')) {
          envContent = envContent.replace(/SHOPIFY_ADMIN_ACCESS_TOKEN=.*/g, `SHOPIFY_ADMIN_ACCESS_TOKEN="${SHOPIFY_ADMIN_ACCESS_TOKEN}"`);
        } else {
          envContent += `\nSHOPIFY_ADMIN_ACCESS_TOKEN="${SHOPIFY_ADMIN_ACCESS_TOKEN}"`;
        }
      }
      fs.writeFileSync(envPath, envContent, 'utf8');
    } catch (writeErr) {
      console.warn('Could not write to .env:', writeErr);
    }

    res.json({
      success: true,
      message: 'Configuration updated successfully',
      domain: SHOPIFY_STORE_DOMAIN,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to update config' });
  }
});

// Push / Sync Catalog Products to Shopify Store Admin API
app.post('/api/shopify/sync-catalog', async (req, res) => {
  try {
    const domain = (req.body.domain || SHOPIFY_STORE_DOMAIN).trim().replace(/^https?:\/\//, '').replace(/\/$/, '');
    const token = (req.body.adminToken || SHOPIFY_ADMIN_ACCESS_TOKEN).trim();

    if (!token) {
      return res.status(400).json({ success: false, message: 'Admin API Access Token is required to push products to Shopify' });
    }

    const checkRes = await fetch(`https://${domain}/admin/api/${SHOPIFY_API_VERSION}/shop.json`, {
      headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' },
    });

    if (!checkRes.ok) {
      const errText = await checkRes.text();
      return res.status(400).json({
        success: false,
        message: `Could not connect to store at https://${domain}. Please verify your myshopify store domain. (Status ${checkRes.status}: ${errText})`
      });
    }

    const shopInfo = await checkRes.json();
    let created = 0;
    const errors: any[] = [];

    for (const prod of INITIAL_PRODUCTS) {
      try {
        const variants = prod.metalOptions.map((metal) => ({
          option1: metal.label,
          price: prod.price.toFixed(2),
          compare_at_price: prod.compareAtPrice.toFixed(2),
          sku: `${prod.id}-${metal.id}`,
          inventory_management: 'shopify',
          inventory_quantity: prod.stockCount || 25,
        }));

        const images = (prod.images || []).map((src) => ({ src }));

        const payload = {
          product: {
            title: prod.title,
            body_html: `<p><strong>${prod.subtitle}</strong></p><p>${prod.description}</p><ul><li><strong>Base Metal:</strong> ${prod.specifications.baseMetal}</li><li><strong>Plating:</strong> ${prod.specifications.plating}</li><li><strong>Stone:</strong> ${prod.specifications.stoneType}</li><li><strong>Weight:</strong> ${prod.specifications.weightGrams}</li><li><strong>Warranty:</strong> ${prod.specifications.warranty}</li></ul>`,
            vendor: 'Fateh Chand Jewels (FCBL 1904)',
            product_type: prod.categoryLabel,
            tags: [...prod.tags, prod.category, prod.isBestseller ? 'Bestseller' : ''].filter(Boolean).join(', '),
            options: [{ name: 'Metal Finish', values: prod.metalOptions.map((m) => m.label) }],
            variants,
            images,
          },
        };

        const createRes = await fetch(`https://${domain}/admin/api/${SHOPIFY_API_VERSION}/products.json`, {
          method: 'POST',
          headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (createRes.ok) {
          created++;
        } else {
          const errData = await createRes.text();
          errors.push({ product: prod.title, error: errData });
        }
      } catch (prodErr: any) {
        errors.push({ product: prod.title, error: prodErr.message });
      }
    }

    res.json({
      success: true,
      shop: shopInfo.shop?.name || domain,
      totalCatalog: INITIAL_PRODUCTS.length,
      syncedCount: created,
      errors: errors.length ? errors : undefined,
      message: `Successfully synced ${created} of ${INITIAL_PRODUCTS.length} luxury jewelry products to Shopify store "${shopInfo.shop?.name || domain}"!`
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Error syncing catalog' });
  }
});

// 2. Shopify Storefront GraphQL Proxy
app.post('/api/shopify/graphql', async (req, res) => {
  try {
    const { query, variables } = req.body;
    const domain = (req.headers['x-shopify-domain'] as string) || SHOPIFY_STORE_DOMAIN;

    if (!query) {
      return res.status(400).json({ error: 'GraphQL query is required' });
    }

    const response = await fetch(`https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    console.error('GraphQL Proxy error:', err);
    res.status(500).json({ error: err.message || 'Error executing Shopify GraphQL query' });
  }
});

// 2b. Fetch Live Storefront Products with Fallback
app.get('/api/shopify/products', async (req, res) => {
  try {
    const domain = SHOPIFY_STORE_DOMAIN;
    const query = `{
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            descriptionHtml
            totalInventory
            priceRange {
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
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  availableForSale
                  quantityAvailable
                }
              }
            }
          }
        }
      }
    }`;

    const sfRes = await fetch(`https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    if (sfRes.ok) {
      const sfData = await sfRes.json();
      const liveEdges = sfData.data?.products?.edges || [];
      if (liveEdges.length > 0) {
        return res.json({
          success: true,
          source: 'shopify_storefront_live',
          store: domain,
          products: liveEdges.map((edge: any) => edge.node),
        });
      }
    }

    res.json({
      success: true,
      source: 'initial_catalog_fallback',
      store: domain,
      products: INITIAL_PRODUCTS,
    });
  } catch (err: any) {
    res.json({
      success: true,
      source: 'initial_catalog_fallback',
      error: err.message,
      products: INITIAL_PRODUCTS,
    });
  }
});

// 3. Shopify Native Headless Cart & Checkout Generator (Storefront cartCreate)
app.post('/api/shopify/checkout', async (req, res) => {
  try {
    const { items, discountCode, note } = req.body;
    const domain = SHOPIFY_STORE_DOMAIN;

    // Filter valid lines
    const validLines = (items || [])
      .filter((item: any) => item.shopifyVariantId && item.shopifyVariantId.startsWith('gid://shopify/ProductVariant/'))
      .map((item: any) => ({
        merchandiseId: item.shopifyVariantId,
        quantity: item.quantity || 1,
        attributes: [
          item.metal ? { key: 'Metal Finish', value: String(item.metal) } : null,
          item.size ? { key: 'Ring / Bangle Size', value: String(item.size) } : null,
          item.engraving ? { key: 'Custom Engraving', value: String(item.engraving) } : null,
        ].filter(Boolean)
      }));

    if (validLines.length > 0) {
      try {
        const cartMutation = `mutation cartCreate($input: CartInput!) {
          cartCreate(input: $input) {
            cart {
              id
              checkoutUrl
              totalQuantity
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
            }
            userErrors {
              field
              message
            }
          }
        }`;

        const cartInput: any = { lines: validLines };
        if (discountCode) cartInput.discountCodes = [discountCode];
        if (note) cartInput.note = note;

        const cartRes = await fetch(`https://${domain}/api/${SHOPIFY_API_VERSION}/graphql.json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
          },
          body: JSON.stringify({
            query: cartMutation,
            variables: { input: cartInput },
          }),
        });

        if (cartRes.ok) {
          const cartData = await cartRes.json();
          const checkoutUrl = cartData.data?.cartCreate?.cart?.checkoutUrl;
          if (checkoutUrl) {
            return res.json({
              success: true,
              mode: 'storefront_native_checkout',
              checkoutUrl,
              cartId: cartData.data?.cartCreate?.cart?.id,
              domain,
            });
          }
        }
      } catch (cartErr) {
        console.warn('Native cartCreate fallback to permalink:', cartErr);
      }
    }

    // Permalink Fallback
    const cartLines = (items || []).map((item: any) => {
      const variantId = item.shopifyVariantId ? item.shopifyVariantId.replace('gid://shopify/ProductVariant/', '') : '49448552169731';
      return `${variantId}:${item.quantity || 1}`;
    }).join(',');

    let checkoutUrl = `https://${domain}/cart/${cartLines || 'empty'}`;
    const params = new URLSearchParams();
    if (discountCode) params.append('discount', discountCode);
    if (note) params.append('note', note);
    params.append('ref', 'fcbl_headless_storefront');

    if (params.toString()) {
      checkoutUrl += `?${params.toString()}`;
    }

    res.json({
      success: true,
      mode: 'shopify_permalink_checkout',
      checkoutUrl,
      orderSummary: {
        itemCount: items?.length || 0,
        appliedDiscount: discountCode || null,
        domain
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to create checkout URL' });
  }
});

// 4. Indian Pincode Delivery & COD Estimator
app.post('/api/shopify/verify-pincode', (req, res) => {
  const { pincode } = req.body;
  if (!pincode || String(pincode).trim().length !== 6) {
    return res.status(400).json({ valid: false, message: 'Please enter a valid 6-digit Indian PIN code' });
  }

  const cleanPin = String(pincode).trim();
  const firstDigit = cleanPin[0];
  
  let zone = 'North Zone';
  let estimatedDays = '2-3 Business Days';
  let city = 'Delhi NCR';

  if (firstDigit === '1' || firstDigit === '2') {
    zone = 'North Region (Delhi, Punjab, Haryana, UP, Rajasthan)';
    city = 'Delhi NCR & North Hub';
    estimatedDays = '1-2 Business Days (Fast Express)';
  } else if (firstDigit === '4') {
    zone = 'West Region (Mumbai, Pune, Gujarat, Maharashtra)';
    city = 'Mumbai / Pune Hub';
    estimatedDays = '2-3 Business Days';
  } else if (firstDigit === '5' || firstDigit === '6') {
    zone = 'South Region (Bangalore, Hyderabad, Chennai, Kerala)';
    city = 'Bangalore / South Hub';
    estimatedDays = '2-3 Business Days';
  } else if (firstDigit === '7' || firstDigit === '8') {
    zone = 'East & North-East Region (Kolkata, Bihar, Assam)';
    city = 'Kolkata Hub';
    estimatedDays = '3-4 Business Days';
  } else {
    zone = 'Central Region';
    city = 'Central Hub';
    estimatedDays = '2-4 Business Days';
  }

  res.json({
    valid: true,
    pincode: cleanPin,
    city,
    zone,
    estimatedDays,
    expressAvailable: true,
    cashOnDeliveryAvailable: true,
    freeDeliveryEligible: true,
    insuredCourier: 'BlueDart / Delhivery Priority Air with Tamper-Proof Box & OTP Handover'
  });
});

// 5. AI Jewelry Stylist (Gemini 2.5 Flash)
app.post('/api/gemini/stylist', async (req, res) => {
  try {
    const { occasion, outfitColor, metalPreference, budget, userPrompt } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        success: true,
        stylingAdvice: `For your ${occasion || 'special occasion'} in ${outfitColor || 'elegant tones'}, we recommend layering our iconic 18K Yellow Gold Vermeil Solitaire Necklace with the Empress Emerald-Cut Ring. The warm golden luster complements radiant ethnic and western silhouettes with 120-year royal heritage from Fateh Chand Bansi Lal Jewellers.`,
        recommendedProductHandles: [
          'royal-kundan-pearl-heritage-choker-set',
          'the-empress-emerald-cut-solitaire-ring',
          'the-iconic-classic-tennis-bracelet-18k-vermeil'
        ]
      });
    }

    const prompt = `You are the Royal Jewellery Stylist & Concierge for "Fateh Chand Jewels (FCBL)", established in 1904 (120 years of royal heritage) combined with modern Palmonas demi-fine luxury (18K Gold Vermeil, 925 Sterling Silver, Waterproof, Anti-tarnish).
    
    The customer asks for styling advice:
    - Occasion: ${occasion || 'Everyday / Festive'}
    - Outfit / Color: ${outfitColor || 'Neutral / Pastel / Ethnic'}
    - Metal Finish: ${metalPreference || '18K Yellow Gold'}
    - Budget: ${budget || 'Flexible'}
    - User message: ${userPrompt || 'Suggest a complete matching set'}

    Provide a warm, opulent, personalized 3-paragraph jewellery styling recommendation emphasizing royal craftsmanship, metal coordination, and how to layer necklaces, rings, or bracelets. Keep tone lavish, trustworthy, and refined.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({
      success: true,
      stylingAdvice: response.text || 'Our 18k Gold Vermeil and Heritage Polki pieces harmonize beautifully for your occasion.',
      recommendedProductHandles: [
        'royal-kundan-pearl-heritage-choker-set',
        'celestial-18k-solitaire-diamond-pendant',
        'the-iconic-classic-tennis-bracelet-18k-vermeil',
        'the-empress-emerald-cut-solitaire-ring'
      ]
    });
  } catch (err: any) {
    console.error('Gemini Stylist error:', err);
    res.json({
      success: true,
      stylingAdvice: 'Our Royal Jewellery Concierge suggests pairing the 18K Celestial Solitaire Pendant with the Classic Tennis Bracelet for an effortlessly luxurious statement.',
      recommendedProductHandles: ['celestial-18k-solitaire-diamond-pendant', 'the-iconic-classic-tennis-bracelet-18k-vermeil']
    });
  }
});

// 6. Vite middleware & Static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FCBL Headless Shopify Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
