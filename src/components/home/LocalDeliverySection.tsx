import React from "react";
import Link from "next/link";
import { Truck, MapPin, ArrowRight, Phone } from "lucide-react";
import { STATIC_SERVICE_AREAS } from "@/data/serviceAreas";

export default function LocalDeliverySection() {
  return (
    <section className="py-24 bg-[#faf8f5] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#062419] to-[#0b3827] text-[#faf8f5] rounded-3xl p-10 md:p-16 border border-emerald-800 shadow-xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-300 block">
                Local Coverage
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Serving Piduguralla &amp; Selected Nearby Areas
              </h2>
              <p className="text-sm sm:text-base text-emerald-100/80 font-normal leading-relaxed tracking-wide">
                Because living plants require careful, gentle handling and prompt delivery, AshraGardens operates our own local transport network covering households, farmhouses, and estates within a <strong>30 km diameter of Mayabazar, Piduguralla</strong>.
              </p>

              {/* Delivery Localities Preview */}
              <div className="pt-2 flex flex-wrap gap-2.5 text-xs">
                {STATIC_SERVICE_AREAS.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-stone-200"
                  >
                    {area.name} ({area.pincode})
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/service-areas"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#52b788] hover:bg-[#40916c] text-[#041c13] font-bold text-xs uppercase tracking-wider transition-all hover:scale-105"
                >
                  <span>Check Availability</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="tel:+919491366841"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs tracking-wide transition-all"
                >
                  <Phone className="w-4 h-4 text-emerald-300" />
                  <span>Call to Confirm Delivery</span>
                </a>
              </div>
            </div>

            {/* Right Badge / Distance Box */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="bg-white/5 border border-white/15 rounded-3xl p-8 max-w-sm text-center space-y-4 backdrop-blur-md">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-300">
                  <Truck className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-amber-200">
                  30 km Direct Radius
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed font-light">
                  Fresh potted plants, heavy ceramic planters, and 10 kg red soil bags transported safely to your gate.
                </p>
                <div className="pt-2 border-t border-white/10 text-[11px] text-emerald-300 font-medium">
                  Same-day dispatch for Piduguralla orders
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
