import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { STATIC_SERVICE_AREAS, SERVICE_AREAS_NOTICE } from "@/data/serviceAreas";
import { SITE_CONFIG } from "@/data/site";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { MapPin, Truck, CheckCircle2, Phone, MessageSquare, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Delivery & Service Areas | AshraGardens Piduguralla",
  description:
    "Review local delivery coverage and gardening service locations within ~30 km of Mayabazar, Piduguralla in Palnadu District.",
};

export default function ServiceAreasPage() {
  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800 hover:text-emerald-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-800 block">
              Local Delivery Coverage
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062419]">
              Service Areas &amp; Local Radius
            </h1>
            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-3xl">
              {SERVICE_AREAS_NOTICE}
            </p>
          </div>

          {/* Notice Card */}
          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs sm:text-sm text-stone-700 leading-relaxed">
              <h4 className="font-bold text-emerald-950">
                Gentle Local Nursery Transport
              </h4>
              <p>
                To protect tender living saplings and heavy glazed pots, we manage our own local transport network operating directly from our nursery at Mayabazar, Piduguralla.
              </p>
            </div>
          </div>

          {/* Areas Table / Card Grid */}
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-[#062419]">
              Regular Delivery Zones &amp; Localities
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {STATIC_SERVICE_AREAS.map((area, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 border border-stone-200/90 shadow-sm space-y-4 hover:border-emerald-700/50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-700" />
                      <h3 className="font-serif text-xl font-bold text-[#062419]">
                        {area.name}
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-stone-100 text-stone-700">
                      PIN: {area.pincode}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 font-normal leading-relaxed">
                    {area.deliveryNote}
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-stone-700">
                    <span className="flex items-center gap-1.5 text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Plant Delivery
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" /> On-site Services
                    </span>
                    <span className="text-stone-400">~{area.distanceFromHubKm} km from hub</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Outside Delivery Area CTA */}
          <div className="p-8 sm:p-10 bg-white rounded-3xl border border-stone-200 shadow-sm text-center space-y-4 max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-[#062419]">
              Is your location not listed above?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
              We frequently accommodate custom deliveries for farmhouses, function grounds, and bulk orders across the wider Palnadu region. Contact us directly to confirm arrangements.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#1e7e34] hover:bg-[#155724] text-white text-xs font-bold tracking-wide flex items-center gap-2 shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                className="px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold tracking-wide flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>Call {SITE_CONFIG.contact.displayPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
