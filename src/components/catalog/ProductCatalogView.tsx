"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { STATIC_PRODUCTS, Product, ProductAvailability } from "@/data/products";
import { getProductWhatsAppUrl } from "@/lib/whatsapp";
import { getProductSmsUrl } from "@/lib/sms";
import { Search, Filter, MessageSquare, Phone, ArrowLeft, ArrowUpDown } from "lucide-react";

interface ProductCatalogViewProps {
  initialCategory?: string;
  pageTitle?: string;
}

export default function ProductCatalogView({
  initialCategory = "all",
  pageTitle = "Nursery Plants & Garden Catalog",
}: ProductCatalogViewProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high">("featured");

  const categories = [
    "all",
    "Plants",
    "Flowering Plants",
    "Fruit Plants",
    "Pots & Planters",
    "Soil & Fertilizers",
    "Gardening Tools",
    "Garden Accessories",
    "Seeds",
  ];

  const filteredProducts = useMemo(() => {
    return STATIC_PRODUCTS.filter((product) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory =
        selectedCategory === "all" ||
        (selectedCategory === "Plants" &&
          (product.category === "Plants" ||
            product.category === "Flowering Plants" ||
            product.category === "Fruit Plants")) ||
        product.category === selectedCategory;

      // Availability filter
      const matchesAvailability =
        selectedAvailability === "all" || product.availability === selectedAvailability;

      return matchesSearch && matchesCategory && matchesAvailability;
    }).sort((a, b) => {
      if (sortBy === "price-low") {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortBy === "price-high") {
        return (b.price || 0) - (a.price || 0);
      }
      return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
    });
  }, [searchTerm, selectedCategory, selectedAvailability, sortBy]);

  return (
    <div className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="mb-12 space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 hover:text-emerald-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062419]">
          {pageTitle}
        </h1>
        <p className="text-sm sm:text-base text-stone-600 max-w-2xl font-light leading-relaxed">
          Browse our collection of acclimatized saplings, pots, potting soils, and nursery accessories.
          Available for pickup or local delivery in Piduguralla and selected nearby areas (~30 km).
        </p>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm space-y-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search plants, pots, red soil, rose..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>

          {/* Availability Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="all">All Availability Status</option>
              <option value="AVAILABLE">Currently Available</option>
              <option value="CONTACT_FOR_AVAILABILITY">Contact for Availability</option>
            </select>
          </div>

          {/* Sort By Price */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-700"
            >
              <option value="featured">Sort by: Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-stone-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${
                selectedCategory === cat
                  ? "bg-[#062419] text-white shadow-sm"
                  : "bg-stone-100 hover:bg-stone-200 text-stone-700"
              }`}
            >
              {cat === "all" ? "All Categories" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center border border-stone-200/90 space-y-4">
          <p className="text-base text-stone-600 font-medium">
            No products match your current search or filter criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedAvailability("all");
            }}
            className="px-6 py-2.5 rounded-full bg-emerald-800 text-white text-xs font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => {
            const whatsappUrl = getProductWhatsAppUrl(product.name, product.slug);
            const smsUrl = getProductSmsUrl(product.name);

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo */}
                  <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      {product.availability === "AVAILABLE" ? (
                        <span className="bg-emerald-800/90 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md">
                          Available
                        </span>
                      ) : (
                        <span className="bg-amber-600/90 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md">
                          Contact for Stock
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-2.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-800">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#062419] line-clamp-1 group-hover:text-emerald-800 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-stone-600 font-normal leading-relaxed line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="font-serif text-2xl font-bold text-[#062419]">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-stone-500">{product.unit}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 pt-0 space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full py-2.5 rounded-xl border border-stone-300 hover:border-emerald-700 text-stone-800 text-center text-xs font-semibold transition-all"
                    >
                      View Details
                    </Link>

                    <a
                      href={smsUrl}
                      className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-center text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-300" />
                      <span>SMS Order</span>
                    </a>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-center text-xs font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#1e7e34]" />
                    <span>WhatsApp Order</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
