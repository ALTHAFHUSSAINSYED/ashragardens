import React from "react";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { SITE_CONFIG } from "@/data/site";
import { MessageSquare, Phone, HelpCircle } from "lucide-react";

export default function WhatsAppCtaSection() {
  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <section className="py-24 bg-[#051c14] text-white border-b border-emerald-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-300">
          <HelpCircle className="w-7 h-7" />
        </div>

        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-300 block">
            Direct Horticultural Advice
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#fbf8f2]">
            Need help choosing the right plants?
          </h2>
          <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-xl mx-auto">
            Whether you want low-maintenance balcony foliage, fragrant flowering shrubs, or fruit tree grafts, our Piduguralla nursery team is here to guide you.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#1e7e34] hover:bg-[#155724] text-white font-bold text-sm tracking-wide shadow-xl transition-all hover:scale-105"
          >
            <MessageSquare className="w-5 h-5 text-emerald-200" />
            <span>Chat With AshraGardens</span>
          </a>

          <a
            href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-stone-200 font-semibold text-sm tracking-wide transition-all"
          >
            <Phone className="w-4 h-4 text-amber-300" />
            <span>Call: {SITE_CONFIG.contact.displayPhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
