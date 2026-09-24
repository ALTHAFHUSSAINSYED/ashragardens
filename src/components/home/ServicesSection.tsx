"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { STATIC_SERVICES } from "@/data/services";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServicesSection() {
  const displayServices = STATIC_SERVICES.slice(0, 6);

  return (
    <section id="services" className="py-24 bg-[#faf8f5] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-800 block">
              Horticultural Expertise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#062419]">
              Gardening &amp; Landscaping Services
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md font-normal leading-relaxed tracking-wide">
            Transform your balconies, rooftops, and residential compounds with our experienced Piduguralla gardening specialists.
          </p>
        </div>

        {/* 6 Services Grid with real imagery and proper card breathing room */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                {/* Service Photography */}
                <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Details */}
                <div className="p-7 space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-[#062419] group-hover:text-emerald-800 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed tracking-wide">
                    {service.shortDescription}
                  </p>

                  {/* Key Highlights */}
                  <div className="pt-2 space-y-2 border-t border-stone-100 text-xs text-stone-700">
                    {service.benefits.slice(0, 2).map((b, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span className="line-clamp-1">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link with proper padding */}
              <div className="p-7 pt-0">
                <Link
                  href={`/services/${service.slug}`}
                  className="w-full py-3 rounded-2xl bg-stone-50 hover:bg-emerald-700 hover:text-white border border-stone-200 text-stone-800 text-center text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Service Details</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
