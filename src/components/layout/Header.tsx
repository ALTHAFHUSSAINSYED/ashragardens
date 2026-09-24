"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AshraLogo from "@/components/ui/AshraLogo";
import { SITE_CONFIG } from "@/data/site";
import { getGeneralWhatsAppUrl } from "@/lib/whatsapp";
import {
  MessageSquare,
  Phone,
  Menu,
  X,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const whatsappUrl = getGeneralWhatsAppUrl();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* 1. Top Business Announcement & Local Hub Bar */}
      <div className="bg-[#051c14] text-stone-300 text-xs py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-800/80 text-emerald-200 border border-emerald-600/40">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Nursery Hub
            </span>
            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-stone-200 font-light">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {SITE_CONFIG.contact.address.formatted}
            </span>
          </div>

          <div className="flex items-center gap-5 text-[11px] sm:text-xs">
            <span className="hidden md:flex items-center gap-1.5 text-stone-300 font-light">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              Open Daily: 7 AM – 7:30 PM
            </span>
            <a
              href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-1.5 font-medium text-amber-300 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.contact.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar with Generous Breathing Room */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-22">
          {/* AshraGardens Logo Wordmark */}
          <Link href="/" className="group py-2">
            <AshraLogo variant="dark" size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold tracking-wide text-stone-700">
            {SITE_CONFIG.navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-2 relative hover:text-emerald-800 ${
                    isActive ? "text-emerald-900 font-bold" : ""
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-700 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Prominent Action CTA: WhatsApp Us & Direct SMS Helpline */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
              className="px-4 py-2.5 rounded-full border border-stone-300 hover:border-emerald-700 text-stone-700 text-xs font-semibold tracking-wide transition-all"
            >
              Call Helpline
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e7e34] hover:bg-[#155724] text-white text-xs font-bold tracking-wide shadow-md transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 text-emerald-200" />
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-800"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#062419] text-[#faf8f5] border-b border-emerald-800/50 px-6 py-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-3 text-sm font-medium">
            {SITE_CONFIG.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-lg hover:bg-white/10 text-stone-200 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#1e7e34] hover:bg-[#155724] rounded-xl text-center text-xs font-bold text-white flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us (+91 9491366841)</span>
            </a>
            <a
              href={`tel:${SITE_CONFIG.contact.phone.replace(/\s+/g, "")}`}
              className="w-full py-2.5 bg-white/10 border border-white/20 rounded-xl text-center text-xs font-semibold text-stone-200"
            >
              Direct Call: {SITE_CONFIG.contact.displayPhone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
