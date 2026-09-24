"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { SITE_CONFIG } from "@/data/site";
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Phone,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  MapPin,
  CheckCircle2,
  Truck,
} from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    subtotal,
  } = useCart();

  // Customer Checkout Details
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [pincode, setPincode] = useState("522413");
  const [showQrModal, setShowQrModal] = useState(false);

  if (!isCartOpen) return null;

  // Build Itemized Text for SMS and WhatsApp
  const generateOrderText = () => {
    const lines = items.map(
      (item, idx) =>
        `${idx + 1}. ${item.name} (${item.quantity} x ₹${item.price} = ₹${
          item.quantity * item.price
        })`
    );

    const nameStr = customerName.trim() || "Not specified";
    const phoneStr = customerPhone.trim() || "Not specified";
    const addrStr = deliveryAddress.trim() || "Piduguralla Area";
    const pinStr = pincode.trim() || "522413";

    return `Hello AshraGardens, I would like to place an order:

${lines.join("\n")}

*Total Amount:* ₹${subtotal}
*Customer Name:* ${nameStr}
*Contact Phone:* ${phoneStr}
*Delivery Address:* ${addrStr}
*Pincode:* ${pinStr}

Please confirm delivery time and availability. Thank you!`;
  };

  const smsUrl = `sms:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}?body=${encodeURIComponent(
    generateOrderText()
  )}`;

  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    generateOrderText()
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-lg bg-[#faf8f5] text-[#14261f] h-full shadow-2xl z-10 flex flex-col overflow-hidden border-l border-stone-200">
        {/* Header */}
        <div className="p-6 bg-[#051c14] text-white flex items-center justify-between border-b border-emerald-900 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-800/80 rounded-xl text-amber-300">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#faf8f5]">
                Your Botanical Cart
              </h2>
              <p className="text-xs text-stone-300 font-light">
                {totalCount} {totalCount === 1 ? "item" : "items"} selected
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#062419]">
                Your cart is empty
              </h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
                Explore our healthy acclimatized plants, hand-glazed planters, and enriched organic soils.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[#062419] hover:bg-[#0c3827] text-white font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-200 pb-2">
                  <span className="font-bold uppercase tracking-wider">
                    Plant &amp; Supply Items
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-stone-400 hover:text-rose-600 font-medium"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white rounded-2xl border border-stone-200 shadow-sm flex items-center gap-3"
                    >
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#062419] truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-stone-500">
                          ₹{item.price} / {item.unit}
                        </p>
                        <div className="text-xs font-bold text-emerald-800 mt-0.5">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>

                      {/* Stepper */}
                      <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-2 py-1 text-stone-600 hover:bg-stone-200 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-1 text-xs font-mono font-bold text-[#062419]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-2 py-1 text-stone-600 hover:bg-stone-200 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details Form */}
              <div className="p-4 bg-white rounded-2xl border border-stone-200 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
                  <MapPin className="w-4 h-4" /> Delivery Address &amp; Contact
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Reddy"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-stone-600 font-semibold mb-1">
                      Delivery Address / Landmark
                    </label>
                    <input
                      type="text"
                      placeholder="House / Street / Area in Piduguralla or nearby"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-600 font-semibold mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-emerald-700 text-xs font-mono"
                    />
                  </div>

                  <div className="flex items-center text-[11px] text-stone-500 pt-5">
                    <Truck className="w-3.5 h-3.5 mr-1 text-emerald-700" />
                    Delivery within ~30 km
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-stone-200 space-y-4 shrink-0 shadow-lg">
            {/* Subtotal & Summary */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-stone-600">
                <span>Subtotal ({totalCount} items)</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex items-center justify-between text-stone-600">
                <span>Delivery (Local Hub)</span>
                <span className="font-semibold text-emerald-700">Calculated on confirmation</span>
              </div>
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-base font-extrabold text-[#062419]">
                <span>Total Due</span>
                <span className="text-xl text-[#062419] font-serif">₹{subtotal}</span>
              </div>
            </div>

            {/* Ordering CTA Buttons */}
            <div className="space-y-2">
              {/* Primary: SMS Order */}
              <a
                href={smsUrl}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#062419] hover:bg-[#0c3827] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-[1.01]"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Place Order via SMS (Primary)</span>
              </a>

              {/* Secondary: WhatsApp Order */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1e7e34] hover:bg-[#155724] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-[1.01]"
              >
                <MessageSquare className="w-4 h-4 text-emerald-200" />
                <span>Place Order via WhatsApp</span>
              </a>

              {/* Instant PhonePe QR Modal Button */}
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-emerald-800 text-emerald-900 bg-emerald-50/80 hover:bg-emerald-100/80 font-bold text-xs tracking-wider transition-colors"
              >
                <CreditCard className="w-4 h-4 text-emerald-800" />
                <span>Pay Online with PhonePe QR (₹{subtotal})</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PhonePe QR Modal inside Cart */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-[#051c14] text-white rounded-3xl max-w-sm w-full p-6 border border-emerald-800 shadow-2xl space-y-4 text-center">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                Direct PhonePe UPI Payment
              </span>
              <button
                onClick={() => setShowQrModal(false)}
                className="p-1 rounded-full text-stone-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative w-56 h-60 mx-auto rounded-xl overflow-hidden bg-black border border-white/20">
              <Image
                src={SITE_CONFIG.payment.qrImageUrl}
                alt="PhonePe QR Code"
                fill
                className="object-contain"
              />
            </div>

            <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl space-y-1">
              <p className="text-xs font-bold text-amber-300">
                ⚠️ {SITE_CONFIG.payment.verificationNotice}
              </p>
              <p className="text-[11px] text-stone-300">
                Beneficiary:{" "}
                <strong className="text-white uppercase font-mono">
                  {SITE_CONFIG.payment.beneficiaryName}
                </strong>
              </p>
            </div>

            <div className="text-xs text-stone-300 font-mono space-y-0.5">
              <div>UPI: {SITE_CONFIG.payment.upiId}</div>
              <div className="text-[11px] text-stone-400">{SITE_CONFIG.payment.bank}</div>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs uppercase"
            >
              Done / Return to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
