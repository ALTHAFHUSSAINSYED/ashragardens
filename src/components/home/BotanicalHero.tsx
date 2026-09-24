"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { ArrowRight, MessageSquare, ShieldCheck, MapPin, Sparkles } from "lucide-react";

export default function BotanicalHero() {
  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#062419] via-[#0b3827] to-[#041910] text-[#faf8f5] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/60">
      {/* Ambient Volumetric Lighting Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Stately Headline, Purpose & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Elegant Pill Badge with generous tracking */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-emerald-400/30 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Piduguralla Plant Nursery &amp; Supplies</span>
            </div>

            {/* Main Headline with generous leading and non-cramped font */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.18] text-[#fbf8f2]">
              Bring Nature{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-amber-200 to-emerald-400">
                Closer to Home
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-emerald-100/80 font-normal leading-relaxed tracking-wide max-w-2xl mx-auto lg:mx-0">
              Welcome to <strong>AshraGardens</strong>, your local botanical destination in Mayabazar, Piduguralla.
              We specialize in acclimatized flowering &amp; fruit saplings, hand-glazed pots, durable plant stands,
              nutrient-rich organic soils, and complete on-site residential landscaping services.
            </p>

            {/* Three Distinct Primary CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/plants"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#52b788] hover:bg-[#40916c] text-[#041c13] font-bold text-sm tracking-wide shadow-lg shadow-emerald-950/40 transition-all hover:scale-105"
              >
                <span>Explore Plants</span>
                <ArrowRight className="w-4 h-4 text-[#041c13]" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-[#fbf8f2] font-semibold text-sm tracking-wide backdrop-blur-md transition-all hover:scale-105"
              >
                <span>Gardening Services</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#1e7e34] hover:bg-[#155724] text-white font-bold text-sm tracking-wide shadow-md transition-all hover:scale-105"
              >
                <MessageSquare className="w-4 h-4 text-emerald-200" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Local Trust Points with clean spacing */}
            <div className="pt-6 border-t border-emerald-800/40 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-stone-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mayabazar, Piduguralla Hub</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Acclimatized Nursery Stock</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Doorstep Delivery (~30 km)</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Photorealistic Showcase Card */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-emerald-700/50 group transform-gpu transition-all duration-500 hover:rotate-1">
              {/* Photorealistic Nursery Hero Image */}
              <Image
                src="/images/products/kashmiri-rose.jpg"
                alt="Fresh blooming plants at AshraGardens nursery Piduguralla"
                fill
                priority
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#04140e] via-[#04140e]/20 to-transparent" />

              {/* Top Floating Badge */}
              <div className="absolute top-5 left-5 bg-[#051c14]/90 backdrop-blur-md border border-emerald-600/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-200 tracking-wide flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Fresh Nursery Stock Available</span>
              </div>

              {/* Bottom Caption Card */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#04140e]/90 backdrop-blur-md border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg font-bold text-amber-200">
                    Kashmiri Grafted Rose
                  </h4>
                  <span className="text-xs font-bold text-white bg-emerald-700/80 px-2.5 py-0.5 rounded-full">
                    ₹150 / pot
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Perennial fragrant cluster blooms acclimatized for garden beds and balcony pots across Andhra Pradesh.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
