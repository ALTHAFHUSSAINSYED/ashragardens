"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { STATIC_PRODUCTS } from "@/data/products";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";
import { getProductSmsUrl } from "@/lib/sms";
import { MessageSquare, ArrowRight, CheckCircle2, Phone } from "lucide-react";

export default function FeaturedPlantsSection() {
  const featured = STATIC_PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-24 bg-[#f4efe6] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with generous padding */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-800 block">
              Nursery Highlights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#062419]">
              Featured Plants &amp; Garden Supplies
            </h2>
          </div>
          <Link
            href="/plants"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950 transition-colors group"
          >
            <span>View Full Nursery Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Clean, Beautiful Photographic Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => {
            const whatsappUrl = getProductWhatsAppUrl(product.name, product.slug);
            const smsUrl = getProductSmsUrl(product.name);

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  {/* Product Photography */}
                  <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Availability Tag */}
                    <div className="absolute top-4 left-4">
                      {product.availability === "AVAILABLE" && (
                        <span className="bg-emerald-800/90 text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md">
                          Available
                        </span>
                      )}
                      {product.availability === "CONTACT_FOR_AVAILABILITY" && (
                        <span className="bg-amber-600/90 text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md">
                          Contact for Stock
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content with generous spacing */}
                  <div className="p-6 space-y-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#062419] leading-snug line-clamp-1 group-hover:text-emerald-800 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-600 font-normal leading-relaxed line-clamp-2">
                      {product.shortDescription}
                    </p>

                    {/* Price and Unit */}
                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-[#062419]">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-stone-500 font-medium tracking-wide">
                        {product.unit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions: View Details + Primary SMS & Secondary WhatsApp */}
                <div className="p-6 pt-0 space-y-2.5">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full py-2.5 rounded-xl border border-stone-300 hover:border-emerald-700 text-stone-700 text-center text-xs font-semibold tracking-wide transition-all"
                    >
                      View Details
                    </Link>

                    {/* Primary SMS Order */}
                    <a
                      href={smsUrl}
                      className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-center text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      title="Order via SMS"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-300" />
                      <span>SMS Order</span>
                    </a>
                  </div>

                  {/* Secondary WhatsApp Order */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-center text-xs font-semibold tracking-wide transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#1e7e34]" />
                    <span>WhatsApp Order</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
