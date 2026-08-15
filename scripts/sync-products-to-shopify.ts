import dotenv from 'dotenv';
import { INITIAL_PRODUCTS } from '../src/data/initialCatalog';

dotenv.config();

const domain = process.env.SHOPIFY_STORE_DOMAIN || 'fcbl-jewellers.myshopify.com';
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '';
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2024-01';

async function main() {
  console.log(`====================================================`);
  console.log(`FCBL JEWELS -> SHOPIFY PRODUCT SYNCHRONIZER`);
  console.log(`Target Domain: ${domain}`);
  console.log(`Admin Token: ${adminToken ? adminToken.slice(0, 8) + '...' : 'NOT SET'}`);
  console.log(`Products to sync: ${INITIAL_PRODUCTS.length}`);
  console.log(`====================================================\n`);

  if (!adminToken) {
    console.error('ERROR: SHOPIFY_ADMIN_ACCESS_TOKEN is required in .env');
    process.exit(1);
  }

  // 1. Check connectivity
  console.log(`Checking connection to https://${domain}/admin/api/${apiVersion}/shop.json...`);
  try {
    const shopRes = await fetch(`https://${domain}/admin/api/${apiVersion}/shop.json`, {
      headers: {
        'X-Shopify-Access-Token': adminToken,
        'Content-Type': 'application/json'
      }
    });

    if (!shopRes.ok) {
      const errText = await shopRes.text();
      console.warn(`⚠️ Could not reach Shopify Admin API (${shopRes.status} ${shopRes.statusText}):\n${errText}`);
      console.log(`\n💡 Note: Please ensure your store domain in .env matches your actual myshopify domain.`);
      console.log(`You can find your exact store URL in Shopify Admin -> Settings -> Domains (e.g., your-store.myshopify.com)\n`);
      return;
    }

    const shopData = await shopRes.json();
    console.log(`✅ Successfully connected to Shopify Store: "${shopData.shop?.name}" (${shopData.shop?.myshopify_domain || domain})!\n`);

    // 2. Loop and create products
    let createdCount = 0;
    for (const prod of INITIAL_PRODUCTS) {
      console.log(`Syncing product: "${prod.title}" (${prod.categoryLabel})...`);

      const variants = prod.metalOptions.map((metal, idx) => ({
        option1: metal.label,
        price: (prod.price).toFixed(2),
        compare_at_price: (prod.compareAtPrice).toFixed(2),
        sku: `${prod.id}-${metal.id}`,
        inventory_management: 'shopify',
        inventory_quantity: prod.stockCount || 20
      }));

      const images = (prod.images || []).map((src) => ({ src }));

      const payload = {
        product: {
          title: prod.title,
          body_html: `<p><strong>${prod.subtitle}</strong></p><p>${prod.description}</p><ul><li><strong>Base Metal:</strong> ${prod.specifications.baseMetal}</li><li><strong>Plating:</strong> ${prod.specifications.plating}</li><li><strong>Stone Type:</strong> ${prod.specifications.stoneType}</li><li><strong>Weight:</strong> ${prod.specifications.weightGrams}</li><li><strong>Warranty:</strong> ${prod.specifications.warranty}</li></ul>`,
          vendor: 'Fateh Chand Jewels (FCBL 1904)',
          product_type: prod.categoryLabel,
          tags: [...prod.tags, prod.category, prod.isBestseller ? 'Bestseller' : ''].filter(Boolean).join(', '),
          options: [{ name: 'Metal Finish', values: prod.metalOptions.map(m => m.label) }],
          variants,
          images
        }
      };

      const createRes = await fetch(`https://${domain}/admin/api/${apiVersion}/products.json`, {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': adminToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (createRes.ok) {
        const createData = await createRes.json();
        console.log(`  ✨ Created on Shopify: ID ${createData.product?.id} (${prod.handle})`);
        createdCount++;
      } else {
        const errJson = await createRes.text();
        console.warn(`  ⚠️ Failed to create ${prod.title}:`, errJson);
      }
    }

    console.log(`\n🎉 Product Sync Complete! Successfully synced ${createdCount}/${INITIAL_PRODUCTS.length} products to Shopify!`);
  } catch (err: any) {
    console.error('Sync error:', err.message);
  }
}

main();
