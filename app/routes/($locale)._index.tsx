import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useState} from 'react';
import {AnnouncementBar} from '~/components/fcbl/AnnouncementBar';
import {Header} from '~/components/fcbl/Header';
import {HeroSlider} from '~/components/fcbl/HeroSlider';
import {StoryCircles} from '~/components/fcbl/StoryCircles';
import {CategoryBubbles} from '~/components/fcbl/CategoryBubbles';
import {ProductGrid} from '~/components/fcbl/ProductGrid';
import {CelebrityLookbook} from '~/components/fcbl/CelebrityLookbook';
import {Heritage1904Section} from '~/components/fcbl/Heritage1904Section';
import {Footer} from '~/components/fcbl/Footer';

// Drawers & Modals
import {CartDrawer} from '~/components/fcbl/CartDrawer';
import {WishlistDrawer} from '~/components/fcbl/WishlistDrawer';
import {SearchModal} from '~/components/fcbl/SearchModal';
import {StoryModal} from '~/components/fcbl/StoryModal';
import {StylistModal} from '~/components/fcbl/StylistModal';
import {RingSizerTool} from '~/components/fcbl/RingSizerTool';
import {StoreLocatorModal} from '~/components/fcbl/StoreLocatorModal';
import {ShopifyConfigModal} from '~/components/fcbl/ShopifyConfigModal';
import {CheckoutModal} from '~/components/fcbl/CheckoutModal';
import {ProductModal} from '~/components/fcbl/ProductModal';
import {ToastContainer} from '~/components/fcbl/ToastContainer';
import {ShopifyProduct} from '~/types';

export const meta = () => {
  return [
    {title: 'Fateh Chand Jewels (FCBL 1904) | Heritage Luxury Jewellery'},
    {
      name: 'description',
      content:
        'Crafting Royal Heritage Since 1904. Discover Polki, Solitaires, Temple Gold, and Diamond High Jewellery by Fateh Chand Jewels.',
    },
  ];
};

export async function loader(args: LoaderFunctionArgs) {
  return defer({
    shop: {
      name: 'Fateh Chand Jewels (FCBL 1904)',
      domain: 'fcbl-1razgs1d.myshopify.com',
    },
  });
}

export default function Homepage() {
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#D4AF37]/20 selection:text-[#8C6D23]">
      {/* Top Luxury Announcement Bar */}
      <AnnouncementBar />

      {/* Main Luxury Header Navigation & Mega Menu */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Banner Carousel */}
        <HeroSlider />

        {/* Instagram/Luxury Story Highlights */}
        <StoryCircles />

        {/* Category Fast Filter Circles */}
        <CategoryBubbles />

        {/* Live Shopify Dynamic Product Catalog */}
        <section id="products-catalog" className="py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
          <ProductGrid onSelectProduct={setSelectedProduct} />
        </section>

        {/* Royal Heritage 1904 Vault Spotlight */}
        <Heritage1904Section />

        {/* Celebrity Red Carpet & Editorial Lookbook */}
        <CelebrityLookbook onSelectProduct={setSelectedProduct} />
      </main>

      {/* Royal Footer */}
      <Footer />

      {/* Drawers & Interactive Overlays */}
      <CartDrawer />
      <WishlistDrawer onSelectProduct={setSelectedProduct} />
      <SearchModal onSelectProduct={setSelectedProduct} />
      <StoryModal />
      <StylistModal />
      <RingSizerTool />
      <StoreLocatorModal />
      <ShopifyConfigModal />
      <CheckoutModal />
      <ToastContainer />

      {/* Quick View Product Details Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
