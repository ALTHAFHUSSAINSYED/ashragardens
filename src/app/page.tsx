import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BotanicalHero from "@/components/home/BotanicalHero";
import CategorySection from "@/components/home/CategorySection";
import FeaturedPlantsSection from "@/components/home/FeaturedPlantsSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyAshraSection from "@/components/home/WhyAshraSection";
import LocalDeliverySection from "@/components/home/LocalDeliverySection";
import WhatsAppCtaSection from "@/components/home/WhatsAppCtaSection";

export const metadata = {
  title: "AshraGardens | Plants, Pots, Garden Supplies & Services in Piduguralla",
  description:
    "AshraGardens is your local botanical nursery in Mayabazar, Piduguralla offering healthy plants, ceramic pots, plant stands, red soils, and landscaping services within a 30 km radius.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      {/* 1. Header Navigation */}
      <Header />

      {/* 2. Visual Hero Section */}
      <BotanicalHero />

      {/* 3. Categories Overview */}
      <CategorySection />

      {/* 4. Featured Plants & Products */}
      <FeaturedPlantsSection />

      {/* 5. Gardening & Landscaping Services */}
      <ServicesSection />

      {/* 6. Why Choose AshraGardens (Concise, authentic local benefits) */}
      <WhyAshraSection />

      {/* 7. Local Delivery & Service Areas */}
      <LocalDeliverySection />

      {/* 8. WhatsApp / Direct Consultation CTA */}
      <WhatsAppCtaSection />

      {/* 9. Business Profile Footer */}
      <Footer />
    </div>
  );
}
