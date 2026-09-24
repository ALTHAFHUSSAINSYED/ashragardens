import React from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { STATIC_SERVICES } from "@/data/services";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Gardening & Landscaping Services | AshraGardens Piduguralla",
  description:
    "Professional garden setup, balcony transformations, terrace gardens, tree pruning, drip irrigation, and lawn landscaping in Piduguralla and Palnadu district.",
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 hover:text-emerald-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062419]">
              Gardening &amp; Landscaping Services
            </h1>
            <p className="text-sm sm:text-base text-stone-600 max-w-2xl font-light leading-relaxed">
              We provide complete on-site botanical services across Piduguralla and selected nearby areas (~30 km).
              From apartment balcony transformations to expansive farmhouse landscaping.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STATIC_SERVICES.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-stone-100">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>

                  <div className="p-7 space-y-4">
                    <h3 className="font-serif text-2xl font-bold text-[#062419] group-hover:text-emerald-800 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                      {service.shortDescription}
                    </p>

                    <div className="pt-2 space-y-2 border-t border-stone-100 text-xs text-stone-700">
                      {service.benefits.slice(0, 3).map((b, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                          <span className="line-clamp-1">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-7 pt-0">
                  <Link
                    href={`/services/${service.slug}`}
                    className="w-full py-3 rounded-2xl bg-stone-50 hover:bg-emerald-700 hover:text-white border border-stone-200 text-stone-800 text-center text-xs font-bold tracking-wide transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Service Inclusions</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
