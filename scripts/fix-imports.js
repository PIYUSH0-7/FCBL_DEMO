import fs from 'fs';
import path from 'path';

const dir = path.resolve('app/components/fcbl');
const files = fs.readdirSync(dir);

for (const file of files) {
  if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue;
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  content = content.replace(/from ['"]\.\.\/types['"]/g, "from '~/types'");
  content = content.replace(/from ['"]\.\.\/context\/ShopContext['"]/g, "from '~/context/ShopContext'");
  content = content.replace(/from ['"]\.\.\/services\/geminiService['"]/g, "from '~/services/geminiService'");
  content = content.replace(/from ['"]\.\.\/services\/shopify['"]/g, "from '~/services/shopify'");
  content = content.replace(/from ['"]\.\.\/data\/initialCatalog['"]/g, "from '~/data/fcbl/initialCatalog'");

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Fixed imports for:', file);
}
