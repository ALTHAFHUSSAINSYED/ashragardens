import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/data/site";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { getSmsUrl } from "@/lib/sms";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  ShieldCheck,
  CreditCard,
  ArrowLeft,
  Truck,
} from "lucide-react";

export const metadata = {
  title: "Contact Us & Payment Details | AshraGardens Piduguralla",
  description:
    "Contact AshraGardens in Mayabazar, Piduguralla. Phone, WhatsApp, email, business hours, and official PhonePe UPI payment QR details.",
};

export default function ContactPage() {
  const whatsappUrl = getGeneralWhatsAppUrl();
  const generalSmsUrl = getSmsUrl("Hello AshraGardens, I have a question regarding plant availability and delivery.");

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
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
          <div className="space-y-4 max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-800 block">
              Get In Touch
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#062419]">
              Contact AshraGardens
            </h1>
            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed">
              We welcome phone inquiries, SMS orders, WhatsApp chats, and nursery visits at Mayabazar, Piduguralla.
            </p>
          </div>

          {/* Two-Column Grid: Contact Details (7 cols) + Payment QR Profile (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Details (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-sm space-y-8">
                <h2 className="font-serif text-2xl font-bold text-[#062419]">
                  Nursery Contact Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-stone-700">
                  {/* Phone */}
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                      <Phone className="w-4 h-4" /> Primary Helpline
                    </div>
                    <a
                      href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                      className="text-base font-bold text-[#062419] hover:text-emerald-800 block"
                    >
                      {SITE_CONFIG.contact.displayPhone}
                    </a>
                    <span className="text-xs text-stone-500 block font-light">
                      Available for calls &amp; SMS orders
                    </span>
                  </div>

                  {/* WhatsApp */}
                  <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-2">
                    <div className="flex items-center gap-2 text-[#1e7e34] font-bold text-xs uppercase tracking-wider">
                      <MessageSquare className="w-4 h-4" /> WhatsApp Chat
                    </div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-[#1e7e34] hover:underline block"
                    >
                      +91 9491366841
                    </a>
                    <span className="text-xs text-stone-500 block font-light">
                      Photo consultations &amp; inquiries
                    </span>
                  </div>

                  {/* Address */}
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100 space-y-2 sm:col-span-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                      <MapPin className="w-4 h-4" /> Physical Nursery Location
                    </div>
                    <p className="text-sm font-semibold text-[#062419]">
                      {SITE_CONFIG.contact.address.formatted}
                    </p>
                    <span className="text-xs text-stone-500 block font-light">
                      Serving local customers across Palnadu District, AP
                    </span>
                  </div>

                  {/* Working Hours */}
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                      <Clock className="w-4 h-4" /> Working Hours
                    </div>
                    <p className="text-sm font-semibold text-[#062419]">
                      {SITE_CONFIG.contact.businessHours}
                    </p>
                    <span className="text-xs text-stone-500 block font-light">
                      Open all 7 days of the week
                    </span>
                  </div>

                  {/* Email */}
                  <div className="p-5 rounded-2xl bg-stone-50 border border-stone-100 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                      <Mail className="w-4 h-4" /> Email Address
                    </div>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="text-sm font-semibold text-[#062419] hover:underline block"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                    <span className="text-xs text-stone-500 block font-light">
                      General &amp; commercial queries
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-4">
                  <a
                    href={generalSmsUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#062419] hover:bg-[#0c3827] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                  >
                    <Phone className="w-4 h-4 text-amber-300" />
                    <span>Send SMS Inquiry</span>
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1e7e34] hover:bg-[#155724] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-200" />
                    <span>Open WhatsApp Chat</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Official PhonePe Payment Profile & QR (5 cols) */}
            <div id="payment-qr" className="lg:col-span-5 space-y-6">
              <div className="bg-[#051c14] text-white rounded-3xl p-8 border border-emerald-800 shadow-xl space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-[10px] font-bold uppercase tracking-wider border border-emerald-600/40">
                    <CreditCard className="w-3.5 h-3.5 text-amber-300" />
                    Official Payment Gateway
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-amber-200">
                    Direct PhonePe / UPI Payment
                  </h3>
                  <p className="text-xs text-stone-300 font-light leading-relaxed">
                    Scan using PhonePe, Google Pay, Paytm, or any BHIM UPI mobile application to make direct payment for plant and supply orders.
                  </p>
                </div>

                {/* Cropped PhonePe QR Code Image Showing Name & Details */}
                <div className="bg-black/60 p-4 rounded-2xl border border-white/10 flex flex-col items-center justify-center space-y-3">
                  <div className="relative w-full max-w-[280px] aspect-[945/1030] rounded-xl overflow-hidden shadow-2xl bg-stone-900 border border-emerald-700/60">
                    <Image
                      src={SITE_CONFIG.payment.qrImageUrl}
                      alt="AshraGardens PhonePe QR Code Mahaboob Khan Pathan"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>

                  {/* Required Explicit Caption */}
                  <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl text-center space-y-1">
                    <p className="text-xs font-bold text-amber-300">
                      ⚠️ {SITE_CONFIG.payment.verificationNotice}
                    </p>
                    <p className="text-[11px] text-stone-300">
                      Beneficiary Account Name:{" "}
                      <strong className="text-white uppercase font-mono">
                        {SITE_CONFIG.payment.beneficiaryName}
                      </strong>
                    </p>
                  </div>
                </div>

                {/* Structured Banking Profile */}
                <div className="space-y-2 text-xs text-stone-300 pt-2 border-t border-white/10 font-mono">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Account Holder:</span>
                    <span className="text-white font-bold">{SITE_CONFIG.payment.displayBeneficiary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">UPI ID:</span>
                    <span className="text-amber-300 font-bold">{SITE_CONFIG.payment.upiId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Linked Bank:</span>
                    <span className="text-white">{SITE_CONFIG.payment.bank}</span>
                  </div>
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
