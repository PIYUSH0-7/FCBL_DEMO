import React from 'react';
import { useShop } from '~/context/ShopContext';
import { X, MapPin, Phone, Clock, Navigation, Award, Calendar } from 'lucide-react';

const BOUTIQUES = [
  {
    id: 'chandni-chowk',
    name: 'FCBL Heritage Flagship (Estd. 1904)',
    address: 'Lala Fateh Chand Bhavan, Dariba Kalan, Chandni Chowk, Old Delhi 110006',
    phone: '+91 11 2327 1904 / +91 98110 54321',
    timings: '11:00 AM – 8:00 PM (Closed on Sundays)',
    image: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80',
    type: 'Royal Vault & Bridal Lounge',
  },
  {
    id: 'south-delhi',
    name: 'FCBL Demi-Fine & Bridal Salon (GK-1)',
    address: 'M-Block Market, Greater Kailash 1, New Delhi 110048',
    phone: '+91 11 4160 1904',
    timings: '11:00 AM – 8:30 PM (Open 7 Days)',
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=600&q=80',
    type: 'Modern Experience Center',
  },
  {
    id: 'mumbai-bandra',
    name: 'Palmonas x FCBL Experience Store (Bandra West)',
    address: 'Waterfield Road, Bandra West, Mumbai 400050',
    phone: '+91 22 2640 1904',
    timings: '11:00 AM – 9:00 PM (Open 7 Days)',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=600&q=80',
    type: 'Demi-Fine & Red Carpet Studio',
  },
  {
    id: 'pune-kp',
    name: 'FCBL Salon (Koregaon Park)',
    address: 'Lane 6, Koregaon Park, Pune 411001',
    phone: '+91 20 6620 1904',
    timings: '11:00 AM – 8:30 PM (Open 7 Days)',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80',
    type: 'Boutique & Sizing Bar',
  },
];

export const StoreLocatorModal: React.FC = () => {
  const { isStoreLocatorOpen, setIsStoreLocatorOpen } = useShop();

  if (!isStoreLocatorOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-stone-200">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-[#1c1917] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide">
                FCBL Flagship Salons & Experience Stores
              </h3>
              <p className="text-[11px] text-stone-400">
                Visit our master karigars, touch 18K vermeil, and experience bridal appointments
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsStoreLocatorOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Boutiques List */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[75vh] overflow-y-auto">
          {BOUTIQUES.map((b) => (
            <div
              key={b.id}
              className="bg-stone-50 rounded-2xl overflow-hidden border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <div className="relative h-40 overflow-hidden bg-stone-200">
                <img src={b.image} alt={b.name} className="w-full h-full object-cover" />
                <span className="absolute top-2.5 left-2.5 bg-[#1c1917] text-[#d4af37] text-[10px] font-bold px-2.5 py-0.5 rounded shadow uppercase tracking-wider">
                  {b.type}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="font-serif text-base font-bold text-stone-900">
                    {b.name}
                  </h4>
                  
                  <p className="text-xs text-stone-600 flex items-start gap-1.5 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-[#92702c] shrink-0 mt-0.5" />
                    <span>{b.address}</span>
                  </p>

                  <p className="text-xs text-stone-600 flex items-center gap-1.5 mt-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#92702c] shrink-0" />
                    <span>{b.phone}</span>
                  </p>

                  <p className="text-xs text-stone-600 flex items-center gap-1.5 mt-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#92702c] shrink-0" />
                    <span>{b.timings}</span>
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200 flex items-center gap-2">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(b.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-[#1c1917] hover:bg-[#92702c] text-white text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-center"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>

                  <a
                    href={`tel:${b.phone.split('/')[0].trim()}`}
                    className="bg-amber-100 hover:bg-amber-200 text-stone-900 text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#92702c]" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
