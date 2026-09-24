"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface CategoryCard {
  id: string;
  name: string;
  href: string;
  description: string;
  image: string;
  highlight: string;
}

export const HOMEPAGE_CATEGORIES: CategoryCard[] = [
  {
    id: "cat-plants",
    name: "Living Plants",
    href: "/plants",
    description: "Flowering shrubs, fragrant roses, grafted fruit trees, and indoor air-purifiers.",
    image: "/images/products/kashmiri-rose.jpg",
    highlight: "100+ Varieties",
  },
  {
    id: "cat-pots",
    name: "Pots & Planters",
    href: "/products",
    description: "Glazed ceramic planters, durable terracotta clay pots, and tiered metal stands.",
    image: "/images/products/ceramic-planter.jpg",
    highlight: "Terracotta & Ceramic",
  },
  {
    id: "cat-soils",
    name: "Soil & Fertilizers",
    href: "/products",
    description: "High-mineral red nursery soil, pure earthworm vermicompost, and organic manures.",
    image: "/images/products/organic-soil.jpg",
    highlight: "100% Organic Earth",
  },
  {
    id: "cat-services",
    name: "Gardening Services",
    href: "/services",
    description: "Complete terrace garden setups, balcony greens, tree pruning, and landscaping.",
    image: "/images/services/balcony-terrace-garden.jpg",
    highlight: "On-Site Piduguralla",
  },
  {
    id: "cat-tools",
    name: "Gardening Tools",
    href: "/products",
    description: "Japanese steel pruning shears, compression sprayers, trowels, and watering cans.",
    image: "/images/products/organic-soil.jpg",
    highlight: "Durable Equipment",
  },
  {
    id: "cat-seeds",
    name: "Seeds & Accessories",
    href: "/products",
    description: "High-germination vegetable seeds, flower bulbs, garden decor, and drip kits.",
    image: "/images/products/ceramic-planter.jpg",
    highlight: "High Germination",
  },
];

export default function CategorySection() {
  return (
    <section className="py-24 bg-[#faf8f5] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with generous, uniform spacing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700 block">
              Curated Nursery Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#062419]">
              Explore by Gardening Category
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md font-normal leading-relaxed tracking-wide">
            Everything you need to build, nurture, and maintain a flourishing botanical sanctuary at home.
          </p>
        </div>

        {/* 6 Responsive, High-Quality Photographic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {HOMEPAGE_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Category Photography Header */}
              <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-emerald-800 shadow-sm uppercase tracking-wider">
                  {cat.highlight}
                </span>
              </div>

              {/* Category Details with proper breathing room */}
              <div className="p-7 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-bold text-[#062419] group-hover:text-emerald-700 transition-colors">
                      {cat.name}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-emerald-700 flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-stone-600 group-hover:text-white transition-colors" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed tracking-wide">
                    {cat.description}
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-700 tracking-wide pt-2 block group-hover:underline">
                  Browse Collection →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
