import React from "react";
import Link from "next/link";
import Image from "next/image";
import AshraLogo from "@/components/ui/AshraLogo";
import { SITE_CONFIG } from "@/data/site";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { Phone, Mail, MapPin, MessageSquare, ShieldCheck } from "lucide-react";

export default function Footer() {
  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <footer className="bg-[#03130d] text-stone-300 border-t border-emerald-950 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <AshraLogo variant="light" size="md" />
            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed tracking-wide">
              AshraGardens is your local nursery and botanical service center in Mayabazar, Piduguralla. We offer locally acclimatized plants, designer pots, organic soils, tools, and professional landscaping services across Palnadu District.
            </p>
            <div className="pt-2 text-xs text-amber-300 font-medium flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Doorstep Delivery within 30 km Radius</span>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-300">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-medium">
              <li>
                <Link href="/" className="hover:text-emerald-300 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/plants" className="hover:text-emerald-300 transition-colors">
                  Living Plants
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-emerald-300 transition-colors">
                  Pots &amp; Accessories
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-300 transition-colors">
                  Gardening Services
                </Link>
              </li>
              <li>
                <Link href="/service-areas" className="hover:text-emerald-300 transition-colors">
                  Service Areas
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-300">
              Nursery Hub &amp; Contact
            </h4>
            <div className="space-y-3 text-xs text-stone-400 font-light leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contact.address.formatted}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
                  className="hover:text-white font-medium text-stone-200"
                >
                  {SITE_CONFIG.contact.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-white">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#25d366] hover:underline font-semibold"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp (+91 9491366841)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Verified Banker / QR Payment Profile (3 cols) */}
          <div className="lg:col-span-3 space-y-4 bg-white/5 p-5 rounded-2xl border border-white/10">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-300">
              Verified Payment Profile
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <p className="text-[11px] text-amber-200/90 font-medium">
                {SITE_CONFIG.payment.verificationNotice}
              </p>
              <div className="pt-1 space-y-1 text-[11px]">
                <p>
                  <span className="text-stone-400">Banker / Name:</span>{" "}
                  <strong className="text-white uppercase font-mono tracking-wide">
                    {SITE_CONFIG.payment.beneficiaryName}
                  </strong>
                </p>
                <p>
                  <span className="text-stone-400">UPI ID:</span>{" "}
                  <span className="text-amber-300 font-mono font-bold">
                    {SITE_CONFIG.payment.upiId}
                  </span>
                </p>
                <p>
                  <span className="text-stone-400">Bank:</span>{" "}
                  <span className="text-stone-200">{SITE_CONFIG.payment.bank}</span>
                </p>
              </div>

              {/* Link to view QR */}
              <div className="pt-2">
                <Link
                  href="/contact#payment-qr"
                  className="text-[11px] text-emerald-300 hover:text-white underline block"
                >
                  View PhonePe UPI QR Code →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with proper alignment */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-light">
          <p>© {new Date().getFullYear()} AshraGardens. All rights reserved. Piduguralla, Andhra Pradesh.</p>
          <div className="flex items-center gap-6">
            <Link href="/service-areas" className="hover:text-stone-400">
              30 km Delivery Coverage
            </Link>
            <Link href="/contact" className="hover:text-stone-400">
              Payment &amp; Bank Details
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
