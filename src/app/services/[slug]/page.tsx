import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { STATIC_SERVICES } from "@/data/services";
import { getServiceWhatsAppUrl } from "@/lib/whatsapp";
import { getServiceSmsUrl } from "@/lib/sms";
import {
  ArrowLeft,
  MessageSquare,
  Phone,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return STATIC_SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = STATIC_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Service Not Found | AshraGardens" };

  return {
    title: `${service.name} | AshraGardens Piduguralla`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = STATIC_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const whatsappUrl = getServiceWhatsAppUrl(service.name);
  const smsUrl = getServiceSmsUrl(service.name);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Breadcrumb */}
          <div>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 hover:text-emerald-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to All Services
            </Link>
          </div>

          {/* Hero Header */}
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-800 block">
              Professional Botanical Service
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062419]">
              {service.name}
            </h1>
            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-3xl">
              {service.shortDescription}
            </p>
          </div>

          {/* Large Visual Photography */}
          <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl border border-stone-200">
            <Image
              src={service.image}
              alt={service.name}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-2 text-xs font-medium text-emerald-200 bg-[#04140e]/90 px-4 py-2 rounded-full backdrop-blur-md">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Served in Piduguralla, Palnadu District &amp; ~30 km perimeter</span>
            </div>
          </div>

          {/* Detailed Content & Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Description & Inclusions (8 cols) */}
            <div className="md:col-span-7 space-y-8">
              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-bold text-[#062419]">
                  Service Overview
                </h3>
                <p className="text-sm text-stone-700 leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>

              {/* What is Included / Benefits */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#062419]">
                  Key Service Benefits &amp; Features
                </h3>
                <div className="space-y-3">
                  {service.benefits.map((b, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suitable For */}
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-bold text-[#062419]">
                  Ideal &amp; Suitable For
                </h3>
                <div className="flex flex-wrap gap-2 text-xs text-stone-700">
                  {service.suitableFor.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Standard Service Process Card (5 cols) */}
            <div className="md:col-span-5 space-y-6">
              <div className="bg-[#f4efe6] rounded-3xl p-7 border border-stone-200 space-y-6">
                <h3 className="font-serif text-xl font-bold text-[#062419] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-800" />
                  <span>How Our Service Works</span>
                </h3>

                <ol className="space-y-4 text-xs text-stone-800">
                  {service.process.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed mt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>

                {/* Direct Action Inquiries */}
                <div className="pt-4 border-t border-stone-300 space-y-3">
                  <a
                    href={smsUrl}
                    className="w-full py-3.5 rounded-full bg-[#062419] hover:bg-[#0c3827] text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-amber-300" />
                    <span>Request via SMS (+91 9491366841)</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-full bg-[#1e7e34] hover:bg-[#155724] text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-200" />
                    <span>Request on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
