"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";
import { ShoppingBag, Phone, MessageSquare, Check } from "lucide-react";

interface ProductDetailActionsProps {
  product: Product;
  smsUrl: string;
  whatsappUrl: string;
}

export default function ProductDetailActions({
  product,
  smsUrl,
  whatsappUrl,
}: ProductDetailActionsProps) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Quantity Stepper & Add to Cart */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex items-center border border-stone-300 rounded-2xl bg-white shadow-sm overflow-hidden h-12 w-full sm:w-36 justify-between px-2">
          <button
            type="button"
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-10 h-full flex items-center justify-center text-stone-600 hover:bg-stone-100 text-base font-bold transition-colors"
          >
            -
          </button>
          <span className="font-mono font-bold text-sm text-[#062419]">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty(qty + 1)}
            className="w-10 h-full flex items-center justify-center text-stone-600 hover:bg-stone-100 text-base font-bold transition-colors"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`flex-1 h-12 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 ${
            added
              ? "bg-emerald-700 text-white"
              : "bg-[#062419] hover:bg-[#0c3827] text-white hover:scale-[1.01]"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 text-emerald-200" />
              <span>Added to Cart ({qty})!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span>Add to Garden Cart</span>
            </>
          )}
        </button>
      </div>

      {/* Primary SMS Order Button */}
      <a
        href={smsUrl}
        className="w-full py-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
      >
        <Phone className="w-4 h-4 text-emerald-800" />
        <span>Order via Direct SMS</span>
      </a>

      {/* Secondary WhatsApp Order Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
      >
        <MessageSquare className="w-4 h-4 text-[#1e7e34]" />
        <span>Order on WhatsApp</span>
      </a>

      <p className="text-center text-[11px] text-stone-500 font-light">
        Delivery across Piduguralla and ~30 km radius. Direct PhonePe UPI payment accepted.
      </p>
    </div>
  );
}
