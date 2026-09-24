import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/data/site";
import { Sprout, MapPin, Truck, Phone, MessageSquare, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "About AshraGardens | Local Plant Nursery in Piduguralla",
  description:
    "Learn about AshraGardens, our local plant nursery and garden supply center located in Mayabazar, Piduguralla, Palnadu District, AP.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 hover:text-emerald-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          {/* Page Heading */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-800 block">
              About Our Nursery
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062419]">
              About AshraGardens
            </h1>
            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
              A local destination dedicated to plants, gardening products, and on-site garden services in Mayabazar, Piduguralla.
            </p>
          </div>

          {/* Story & What We Offer */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/90 shadow-sm space-y-8 text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-bold text-[#062419]">
                Who We Are
              </h2>
              <p>
                <strong>AshraGardens</strong> is a local plant nursery and gardening center operated by <strong>Mahaboob Khan Pathan</strong>, situated at Mayabazar, Piduguralla, in Palnadu District, Andhra Pradesh.
              </p>
              <p>
                Our aim is simple: to make healthy, climate-suited plants and quality gardening supplies easily accessible to homes, institutions, and farmhouses in Piduguralla and our surrounding ~30 km radius.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h2 className="font-serif text-2xl font-bold text-[#062419]">
                What We Offer
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Sprout className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Living Plants &amp; Saplings:</strong> Acclimatized flowering varieties (Kashmiri roses, jasmine, hibiscus), grafted fruit trees (Banganapalli mango, guava, lemon), and vegetable saplings.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Sprout className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Pots, Planters &amp; Stands:</strong> Hand-glazed ceramic pots, terracotta clay containers, UV-treated plastic planters, and rust-resistant wrought iron plant stands.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Sprout className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Soils &amp; Fertilizers:</strong> Screened red nursery soils, 100% pure organic earthworm vermicompost, washed coco peat bricks, and balanced plant growth nutrients.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Sprout className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    <strong>Gardening Services:</strong> Practical on-site terrace garden setups, balcony greening, tree pruning, drip irrigation installations, and landscape consultations.
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h2 className="font-serif text-2xl font-bold text-[#062419]">
                Local Focus &amp; Direct Delivery
              </h2>
              <p>
                Living plants cannot sit in parcel hubs or long-distance courier trucks without withering. That is why our deliveries are handled locally from our nursery in Mayabazar, Piduguralla, reaching customer doorsteps within our 30 km radius.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
