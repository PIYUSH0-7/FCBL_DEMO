import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, CheckCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div
      id="toast-container"
      className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-[#1c1917] text-[#f5f1eb] p-3.5 sm:p-4 rounded-xl shadow-2xl border border-[#d4af37]/30 flex items-start gap-3 transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'cart' ? (
              <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37]">
                <ShoppingBag className="w-4 h-4" />
              </div>
            ) : toast.type === 'info' ? (
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                <Info className="w-4 h-4" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-xs sm:text-sm font-serif font-bold text-white tracking-wide">
              {toast.title}
            </h4>
            {toast.subtitle && (
              <p className="text-[11px] sm:text-xs text-stone-300 mt-0.5 truncate">
                {toast.subtitle}
              </p>
            )}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-stone-400 hover:text-white p-1 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
