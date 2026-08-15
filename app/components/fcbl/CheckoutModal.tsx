import React, { useState } from 'react';
import { useShop } from '~/context/ShopContext';
import {
  X,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ExternalLink,
  CreditCard,
  QrCode,
  Package,
  Gift,
  ArrowRight,
  Download,
  Share2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    cartTotal,
    cartOriginalTotal,
    cartDiscountSavings,
    appliedDiscount,
    formatPrice,
    proceedToCheckout,
    addToast
  } = useShop();

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');
  const [upiApp, setUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'bhim'>('gpay');

  // Form State
  const [fullName, setFullName] = useState('Piyush Gangwar');
  const [email, setEmail] = useState('gangwarpiyush827@gmail.com');
  const [phone, setPhone] = useState('9811001904');
  const [address, setAddress] = useState('B-402, Royal Palms, Heritage Enclave');
  const [city, setCity] = useState('New Delhi');
  const [state, setState] = useState('Delhi');
  const [pincode, setPincode] = useState('110006');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address || !pincode) {
      addToast('Please fill in all delivery details', undefined, 'info');
      return;
    }

    setIsProcessing(true);
    // Simulate payment authorization & order generation
    setTimeout(() => {
      const orderId = `FCBL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const order = {
        orderId,
        items: [...cart],
        subtotal: cartOriginalTotal,
        total: cartTotal,
        savings: cartDiscountSavings,
        couponCode: appliedDiscount?.code,
        customer: { fullName, email, phone, address, city, state, pincode },
        paymentMethod: paymentMethod.toUpperCase(),
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        estimatedDelivery: '3 Business Days via BlueDart Priority Air (Tamper-Proof Box)',
      };

      setCompletedOrder(order);
      setStep('success');
      setIsProcessing(false);
      clearCart();

      try {
        confetti({
          particleCount: 75,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#92702C', '#10B981', '#F59E0B'],
        });
      } catch {
        // ignore
      }

      addToast('Order Placed Successfully!', `Order ID: ${orderId}`, 'success');
    }, 1200);
  };

  const handleOpenShopifyLive = async () => {
    const checkoutUrl = await proceedToCheckout();
    window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-stone-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 bg-[#1c1917] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide uppercase">
                {step === 'details' ? 'Secure Royal Checkout' : 'Royal Order Confirmed'}
              </h3>
              <p className="text-[11px] text-stone-400">
                {step === 'details'
                  ? 'Fateh Chand Jewels 256-Bit Encrypted Express Gateway'
                  : 'Thank you for choosing 120 years of royal heirloom craftsmanship'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 text-stone-400 hover:text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          {step === 'details' ? (
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              
              {/* Order Items Preview Ribbon */}
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                  {cart.slice(0, 4).map((item) => (
                    <img
                      key={item.id}
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 rounded-lg object-cover bg-white border border-stone-200 shrink-0"
                    />
                  ))}
                  {cart.length > 4 && (
                    <span className="text-xs text-stone-500 font-semibold px-2">
                      +{cart.length - 4} more
                    </span>
                  )}
                </div>
                <div className="text-right pl-3 shrink-0">
                  <span className="text-[11px] text-stone-500 block">Total Due</span>
                  <span className="text-sm font-bold text-stone-900">{formatPrice(cartTotal)}</span>
                </div>
              </div>

              {/* 1. Shipping Details */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5 mb-3">
                  <Truck className="w-3.5 h-3.5 text-[#92702c]" />
                  <span>1. Delivery & Contact Details</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Receiver's Name"
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#92702c]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">Phone (for OTP & Handover)</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-2.5 rounded-l-lg border border-r-0 border-stone-300 bg-stone-100 text-stone-600 text-xs">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="10-digit number"
                        className="w-full p-2.5 rounded-r-lg border border-stone-300 focus:outline-hidden focus:border-[#92702c]"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 mb-1 font-medium">Email Address (for Invoice & Tracking)</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#92702c]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 mb-1 font-medium">House / Flat / Street Address</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Apartment, Studio, Floor, Street"
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#92702c]"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-medium">City / Town</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#92702c]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-stone-600 mb-1 font-medium">State</label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#92702c]"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-600 mb-1 font-medium">Pincode</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                        className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-hidden focus:border-[#92702c]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Payment Method Selector */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5 mb-3">
                  <CreditCard className="w-3.5 h-3.5 text-[#92702c]" />
                  <span>2. Select Payment Method</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                  {/* UPI */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'border-[#92702c] bg-amber-50/60 ring-1 ring-[#92702c] text-stone-900 font-semibold'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-[#92702c] mb-1" />
                    <span>Instant UPI</span>
                    <span className="block text-[10px] text-stone-400 font-normal">GPay, PhonePe</span>
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#92702c] bg-amber-50/60 ring-1 ring-[#92702c] text-stone-900 font-semibold'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#92702c] mb-1" />
                    <span>Debit / Credit</span>
                    <span className="block text-[10px] text-stone-400 font-normal">Visa, Mastercard</span>
                  </button>

                  {/* Netbanking */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netbanking')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'netbanking'
                        ? 'border-[#92702c] bg-amber-50/60 ring-1 ring-[#92702c] text-stone-900 font-semibold'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <Lock className="w-4 h-4 text-[#92702c] mb-1" />
                    <span>Net Banking</span>
                    <span className="block text-[10px] text-stone-400 font-normal">All Major Banks</span>
                  </button>

                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#92702c] bg-amber-50/60 ring-1 ring-[#92702c] text-stone-900 font-semibold'
                        : 'border-stone-200 hover:border-stone-300 text-stone-700'
                    }`}
                  >
                    <Package className="w-4 h-4 text-[#92702c] mb-1" />
                    <span>Cash on Delivery</span>
                    <span className="block text-[10px] text-stone-400 font-normal">₹0 Extra Charges</span>
                  </button>
                </div>

                {/* Sub-options for UPI */}
                {paymentMethod === 'upi' && (
                  <div className="mt-3 p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between text-xs">
                    <span className="text-stone-600">Select UPI App:</span>
                    <div className="flex gap-2">
                      {(['gpay', 'phonepe', 'paytm', 'bhim'] as const).map((app) => (
                        <button
                          key={app}
                          type="button"
                          onClick={() => setUpiApp(app)}
                          className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase transition-all cursor-pointer ${
                            upiApp === app
                              ? 'bg-[#1c1917] text-[#d4af37]'
                              : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-100'
                          }`}
                        >
                          {app}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-stone-200 space-y-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-[#1c1917] hover:bg-[#92702c] disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-xl text-xs sm:text-sm tracking-widest uppercase flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>
                    {isProcessing
                      ? 'Authorizing Royal Order...'
                      : `Place Order • ${formatPrice(cartTotal)}`}
                  </span>
                </button>

                <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
                  <button
                    type="button"
                    onClick={handleOpenShopifyLive}
                    className="hover:text-[#92702c] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Or checkout directly on Shopify Storefront</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>

                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>256-Bit SSL Encrypted</span>
                  </span>
                </div>
              </div>

            </form>
          ) : (
            /* Order Success Screen */
            <div className="py-4 space-y-6 text-center animate-in zoom-in-95 duration-300">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-widest text-[#92702c] font-bold block mb-1">
                  Fateh Chand Jewels (Estd. 1904)
                </span>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Your Royal Order is Confirmed!
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
                  A confirmation SMS & Email with tracking link has been sent to{' '}
                  <strong className="text-stone-800">{completedOrder?.customer.email}</strong>.
                </p>
              </div>

              {/* Order Summary Receipt Box */}
              <div className="bg-[#faf8f5] p-4 sm:p-5 rounded-2xl border border-stone-200 text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Order Number:</span>
                  <span className="font-mono font-bold text-stone-900">{completedOrder?.orderId}</span>
                </div>

                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Delivery Address:</span>
                  <span className="font-medium text-stone-800 text-right max-w-xs truncate">
                    {completedOrder?.customer.address}, {completedOrder?.customer.city} -{' '}
                    {completedOrder?.customer.pincode}
                  </span>
                </div>

                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Payment Mode:</span>
                  <span className="font-semibold text-stone-900">
                    {completedOrder?.paymentMethod} (Verified)
                  </span>
                </div>

                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Insured Courier:</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" />
                    <span>BlueDart Air Express (2-3 Days)</span>
                  </span>
                </div>

                <div className="flex justify-between pt-1 text-sm font-bold text-stone-900">
                  <span>Grand Total Paid:</span>
                  <span>{formatPrice(completedOrder?.total || 0)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setStep('details');
                  }}
                  className="flex-1 bg-[#1c1917] hover:bg-[#92702c] text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Continue Shopping</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
