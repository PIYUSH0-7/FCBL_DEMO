import React from 'react';
import { useShop } from '~/context/ShopContext';
import { STORY_HIGHLIGHTS } from '~/data/fcbl/initialCatalog';
import { StoryHighlight } from '~/types';

export const StoryCircles: React.FC = () => {
  const { setActiveStory } = useShop();

  return (
    <section id="story-circles" className="py-6 sm:py-8 bg-white border-b border-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#92702c] animate-ping" />
            <h3 className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-stone-800">
              Palmonas x FCBL Highlights
            </h3>
          </div>
          <span className="text-[11px] text-[#92702c] font-medium tracking-wide">
            Tap to Watch Stories
          </span>
        </div>

        {/* Story Circles Slider / Row */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2">
          {STORY_HIGHLIGHTS.map((story: StoryHighlight) => (
            <button
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="flex flex-col items-center group shrink-0 cursor-pointer focus:outline-hidden"
            >
              {/* Outer Golden Gradient Ring */}
              <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-[#92702c] via-[#e5c07b] to-[#d4af37] group-hover:scale-105 transition-transform duration-300 shadow-xs">
                {/* White Gap */}
                <div className="p-[2px] bg-white rounded-full">
                  {/* Thumbnail Avatar */}
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden relative">
                    <img
                      src={story.thumbnail}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Badge if available */}
                {story.badge && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#1c1917] text-[#d4af37] text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-[#d4af37]/40 shadow-xs uppercase tracking-tighter">
                    {story.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <span className="mt-2 text-xs font-medium text-stone-800 text-center tracking-tight group-hover:text-[#92702c] transition-colors">
                {story.title}
              </span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
