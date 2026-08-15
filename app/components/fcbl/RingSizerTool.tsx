import React, { useState } from 'react';
import { useShop } from '~/context/ShopContext';
import { X, CircleDot, Ruler, CheckCircle, HelpCircle } from 'lucide-react';

const RING_SIZES = [
  { indian: '6', us: '3.5', diameterMm: 14.5, circumMm: 45.5 },
  { indian: '8', us: '4.5', diameterMm: 15.3, circumMm: 48.0 },
  { indian: '10', us: '5.5', diameterMm: 16.0, circumMm: 50.2 },
  { indian: '12', us: '6.0', diameterMm: 16.5, circumMm: 51.8 },
  { indian: '14', us: '7.0', diameterMm: 17.3, circumMm: 54.3 },
  { indian: '16', us: '8.0', diameterMm: 18.1, circumMm: 56.8 },
  { indian: '18', us: '8.5', diameterMm: 18.9, circumMm: 59.3 },
  { indian: '20', us: '9.5', diameterMm: 19.8, circumMm: 62.1 },
  { indian: '22', us: '10.5', diameterMm: 20.6, circumMm: 64.6 },
  { indian: '24', us: '11.5', diameterMm: 21.4, circumMm: 67.2 },
];

export const RingSizerTool: React.FC = () => {
  const { isRingSizerOpen, setIsRingSizerOpen } = useShop();

  const [activeTab, setActiveTab] = useState<'visual' | 'circumference'>('visual');
  const [sliderMm, setSliderMm] = useState<number>(17.3); // default size 14
  const [userCircumference, setUserCircumference] = useState<string>('54');

  if (!isRingSizerOpen) return null;

  // Find matching size for visual slider
  const closestSize = RING_SIZES.reduce((prev, curr) =>
    Math.abs(curr.diameterMm - sliderMm) < Math.abs(prev.diameterMm - sliderMm) ? curr : prev
  );

  // Find matching size for circumference input
  const circumNum = parseFloat(userCircumference) || 54;
  const closestCircumSize = RING_SIZES.reduce((prev, curr) =>
    Math.abs(curr.circumMm - circumNum) < Math.abs(prev.circumMm - circumNum) ? curr : prev
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-stone-200">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-[#1c1917] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CircleDot className="w-5 h-5 text-[#d4af37]" />
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide">
                Virtual Ring Sizer Guide
              </h3>
              <p className="text-[11px] text-stone-400">
                Find your exact Indian & US ring size with FCBL calibration
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsRingSizerOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b border-stone-200 bg-stone-50">
          <button
            onClick={() => setActiveTab('visual')}
            className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'visual'
                ? 'border-[#92702c] text-[#92702c] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <CircleDot className="w-4 h-4" />
            <span>Place Existing Ring On Screen</span>
          </button>

          <button
            onClick={() => setActiveTab('circumference')}
            className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'circumference'
                ? 'border-[#92702c] text-[#92702c] bg-white'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Ruler className="w-4 h-4" />
            <span>Finger Circumference (mm)</span>
          </button>
        </div>

        {/* Tool Body */}
        <div className="p-6">
          {activeTab === 'visual' ? (
            <div className="space-y-6 text-center">
              <p className="text-xs text-stone-600 max-w-md mx-auto">
                Place a ring that fits you comfortably over the golden circle on your screen. Adjust the slider until the golden circle aligns with the <strong>inside diameter</strong> of your ring.
              </p>

              {/* Dynamic Scaling Circle */}
              <div className="h-44 flex items-center justify-center bg-stone-50 rounded-xl border border-stone-200">
                <div
                  className="rounded-full border-4 border-[#d4af37] bg-amber-100/40 flex items-center justify-center shadow-inner transition-all duration-75"
                  style={{
                    width: `${sliderMm * 6.5}px`,
                    height: `${sliderMm * 6.5}px`,
                  }}
                >
                  <span className="text-xs font-bold text-stone-900 font-mono">
                    {sliderMm.toFixed(1)} mm
                  </span>
                </div>
              </div>

              {/* Slider */}
              <div className="max-w-xs mx-auto">
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Adjust Inside Diameter: {sliderMm.toFixed(1)} mm
                </label>
                <input
                  type="range"
                  min={14.0}
                  max={22.0}
                  step={0.1}
                  value={sliderMm}
                  onChange={(e) => setSliderMm(parseFloat(e.target.value))}
                  className="w-full accent-[#92702c] cursor-pointer"
                />
              </div>

              {/* Result Card */}
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 max-w-sm mx-auto">
                <span className="text-[10px] uppercase tracking-widest text-[#92702c] font-bold block">
                  Your Recommended Ring Size:
                </span>
                <div className="flex items-center justify-center gap-4 mt-1">
                  <div>
                    <span className="text-xs text-stone-500 block">Indian Size</span>
                    <strong className="text-xl font-serif text-stone-900">{closestSize.indian}</strong>
                  </div>
                  <span className="text-stone-300">|</span>
                  <div>
                    <span className="text-xs text-stone-500 block">US Size</span>
                    <strong className="text-xl font-serif text-stone-900">US {closestSize.us}</strong>
                  </div>
                </div>
                <p className="text-[11px] text-stone-500 mt-2">
                  Inner Circumference: ~{closestSize.circumMm} mm
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-2">
                <p className="font-semibold text-stone-900 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#92702c]" />
                  <span>How to measure with a strip of paper:</span>
                </p>
                <ol className="list-decimal list-inside space-y-1 text-stone-600 pl-1">
                  <li>Wrap a narrow strip of paper or thread snug around your finger knuckle.</li>
                  <li>Mark the spot where the paper overlaps with a pen.</li>
                  <li>Measure the length with a physical ruler in millimeters (mm) and enter below:</li>
                </ol>
              </div>

              <div className="max-w-xs mx-auto text-center">
                <label className="block text-xs font-semibold text-stone-800 mb-1">
                  Enter Finger Circumference in mm:
                </label>
                <input
                  type="number"
                  min={40}
                  max={75}
                  value={userCircumference}
                  onChange={(e) => setUserCircumference(e.target.value)}
                  className="w-full text-center text-lg font-bold p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#92702c]"
                />
              </div>

              {/* Calculated Result */}
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 max-w-sm mx-auto text-center">
                <span className="text-[10px] uppercase tracking-widest text-[#92702c] font-bold block">
                  Best Match:
                </span>
                <div className="flex items-center justify-center gap-4 mt-1">
                  <div>
                    <span className="text-xs text-stone-500 block">Indian Size</span>
                    <strong className="text-xl font-serif text-stone-900">{closestCircumSize.indian}</strong>
                  </div>
                  <span className="text-stone-300">|</span>
                  <div>
                    <span className="text-xs text-stone-500 block">US Size</span>
                    <strong className="text-xl font-serif text-stone-900">US {closestCircumSize.us}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Size Chart Table */}
          <div className="mt-6 pt-4 border-t border-stone-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
              International Conversion Reference
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-[11px] border border-stone-200">
                <thead className="bg-stone-100 font-semibold text-stone-700">
                  <tr>
                    <th className="p-1.5 border-r border-stone-200">India (IN)</th>
                    <th className="p-1.5 border-r border-stone-200">US / Canada</th>
                    <th className="p-1.5 border-r border-stone-200">Diameter (mm)</th>
                    <th className="p-1.5">Circumference (mm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-600">
                  {RING_SIZES.slice(2, 7).map((s) => (
                    <tr key={s.indian} className="hover:bg-amber-50/50">
                      <td className="p-1.5 font-bold text-stone-900 border-r border-stone-100">{s.indian}</td>
                      <td className="p-1.5 border-r border-stone-100">{s.us}</td>
                      <td className="p-1.5 border-r border-stone-100">{s.diameterMm} mm</td>
                      <td className="p-1.5">{s.circumMm} mm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 text-center">
            <button
              onClick={() => setIsRingSizerOpen(false)}
              className="bg-[#1c1917] hover:bg-[#92702c] text-white font-semibold text-xs py-2.5 px-6 rounded-full transition-colors cursor-pointer"
            >
              Done / Return to Shopping
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
