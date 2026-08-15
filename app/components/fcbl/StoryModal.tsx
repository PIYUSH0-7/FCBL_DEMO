import React, { useState, useEffect } from 'react';
import { useShop } from '~/context/ShopContext';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Sparkles } from 'lucide-react';

export const StoryModal: React.FC = () => {
  const { activeStory, setActiveStory, setSelectedProduct, addToCart, formatPrice } = useShop();
  const [slideIdx, setSlideIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setSlideIdx(0);
    setProgress(0);
  }, [activeStory]);

  useEffect(() => {
    if (!activeStory) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (slideIdx < activeStory.slides.length - 1) {
            setSlideIdx((s) => s + 1);
            return 0;
          } else {
            setActiveStory(null);
            return 0;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStory, slideIdx, setActiveStory]);

  if (!activeStory) return null;

  const currentSlide = activeStory.slides[slideIdx] || activeStory.slides[0];
  const taggedProduct = currentSlide.taggedProduct;

  const handleNext = () => {
    if (slideIdx < activeStory.slides.length - 1) {
      setSlideIdx((prev) => prev + 1);
      setProgress(0);
    } else {
      setActiveStory(null);
    }
  };

  const handlePrev = () => {
    if (slideIdx > 0) {
      setSlideIdx((prev) => prev - 1);
      setProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={() => setActiveStory(null)}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-30 cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Story Card Container */}
      <div className="relative w-full max-w-sm sm:max-w-md h-[80vh] sm:h-[85vh] bg-stone-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between border border-stone-800">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={currentSlide.mediaUrl}
            alt={currentSlide.headline}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
        </div>

        {/* Top Progress Bars */}
        <div className="relative z-20 p-4 space-y-2">
          <div className="flex gap-1.5 w-full">
            {activeStory.slides.map((_, i) => (
              <div key={i} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-100"
                  style={{
                    width: i < slideIdx ? '100%' : i === slideIdx ? `${progress}%` : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-white text-xs pt-1">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full overflow-hidden border border-[#d4af37]">
                <img src={activeStory.thumbnail} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="font-semibold tracking-wide">{activeStory.title}</span>
            </div>
            <span className="text-[10px] text-stone-300">Fateh Chand Jewels</span>
          </div>
        </div>

        {/* Left & Right Tap Hotspots */}
        <button
          onClick={handlePrev}
          className="absolute inset-y-20 left-0 w-1/3 z-10 opacity-0 hover:opacity-100 flex items-center justify-start pl-2 text-white transition-opacity cursor-pointer"
        >
          <ChevronLeft className="w-8 h-8 drop-shadow" />
        </button>

        <button
          onClick={handleNext}
          className="absolute inset-y-20 right-0 w-1/3 z-10 opacity-0 hover:opacity-100 flex items-center justify-end pr-2 text-white transition-opacity cursor-pointer"
        >
          <ChevronRight className="w-8 h-8 drop-shadow" />
        </button>

        {/* Bottom Headline & Tagged Product Banner */}
        <div className="relative z-20 p-4 sm:p-6 space-y-4">
          <div>
            <div className="inline-flex items-center gap-1 text-[11px] text-[#d4af37] font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3" />
              <span>FCBL 1904 Spotlight</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
              {currentSlide.headline}
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 mt-1 font-light">
              {currentSlide.subheadline}
            </p>
          </div>

          {/* Tagged Product Card */}
          {taggedProduct && (
            <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/40 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center gap-3 overflow-hidden">
                <img
                  src={taggedProduct.images[0]}
                  alt={taggedProduct.title}
                  className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-200"
                />
                <div className="truncate">
                  <h4 className="text-xs font-semibold text-stone-900 truncate">
                    {taggedProduct.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-stone-900">
                      {formatPrice(taggedProduct.price)}
                    </span>
                    <span className="text-[10px] text-stone-400 line-through">
                      {formatPrice(taggedProduct.compareAtPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    addToCart(taggedProduct, '18k_gold');
                    setActiveStory(null);
                  }}
                  className="p-2 bg-[#1c1917] hover:bg-[#92702c] text-white rounded-lg transition-colors cursor-pointer"
                  title="Add to Bag"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(taggedProduct);
                    setActiveStory(null);
                  }}
                  className="text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 px-2.5 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  View
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
