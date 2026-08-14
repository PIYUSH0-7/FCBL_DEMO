import dotenv from 'dotenv';
dotenv.config();

const domain = process.env.SHOPIFY_STORE_DOMAIN || 'fcbl-1razgs1d.myshopify.com';
const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '';
const apiVersion = process.env.SHOPIFY_STOREFRONT_API_VERSION || '2024-01';

async function main() {
  console.log('Fetching store publications (sales channels)...');
  
  // 1. Get Publications
  const pubQuery = `{
    publications(first: 10) {
      nodes {
        id
        name
        autoPublish
      }
    }
    products(first: 50) {
      nodes {
        id
        title
      }
    }
  }`;

  const res = await fetch(`https://${domain}/admin/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: pubQuery })
  });

  const data = await res.json();
  const publications = data.data?.publications?.nodes || [];
  const products = data.data?.products?.nodes || [];

  console.log(`Found ${publications.length} publication channels:`, publications.map((p: any) => p.name).join(', '));
  console.log(`Found ${products.length} products to publish.`);

  for (const pub of publications) {
    console.log(`Publishing products to channel: "${pub.name}" (${pub.id})...`);
    for (const prod of products) {
      const publishMutation = `mutation publishablePublish($id: ID!, $input: [PublicationInput!]!) {
        publishablePublish(id: $id, input: $input) {
          publishable {
            availablePublicationsCount {
              count
            }
          }
          userErrors {
            field
            message
          }
        }
      }`;

      const pubRes = await fetch(`https://${domain}/admin/api/${apiVersion}/graphql.json`, {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: publishMutation,
          variables: {
            id: prod.id,
            input: [{ publicationId: pub.id }]
          }
        })
      });

      const pubData = await pubRes.json();
      if (pubData.data?.publishablePublish?.userErrors?.length > 0) {
        console.warn(`  ⚠️ ${prod.title}:`, pubData.data.publishablePublish.userErrors[0].message);
      } else {
        console.log(`  ✅ Published "${prod.title}" to ${pub.name}`);
      }
    }
  }

  console.log('\n🎉 All products published to all channels!');
}

main();
