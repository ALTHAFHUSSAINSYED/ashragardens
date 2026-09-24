import React from "react";
import { Sprout, ShieldCheck, MapPin, Sparkles, PhoneCall } from "lucide-react";

export default function WhyAshraSection() {
  const points = [
    {
      icon: Sprout,
      title: "Healthy Acclimatized Plants",
      description:
        "Every sapling is hardened and nurtured in our local Piduguralla nursery conditions, ensuring they adapt quickly to your home garden without transplant shock.",
    },
    {
      icon: ShieldCheck,
      title: "Quality Gardening Products",
      description:
        "We supply tested high-mineral red soils, screened organic earthworm vermicompost, durable terracotta and ceramic pots, and heavy metal plant stands.",
    },
    {
      icon: MapPin,
      title: "Local Palnadu Service",
      description:
        "Physical nursery hub conveniently located at Mayabazar, Piduguralla, serving households, offices, and farmhouses within a 30 km radius.",
    },
    {
      icon: Sparkles,
      title: "Gardening Expertise",
      description:
        "Direct advice from seasoned local plant growers on sunlight requirements, watering cycles, pruning schedules, and organic pest control.",
    },
    {
      icon: PhoneCall,
      title: "Direct Customer Support",
      description:
        "Transparent communication via direct phone (+91 9491366841), instant SMS notifications, and responsive WhatsApp concierge.",
    },
  ];

  return (
    <section className="py-24 bg-[#f4efe6] text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-800 block">
            Our Core Commitment
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-tight text-[#062419]">
            Why Choose AshraGardens
          </h2>
          <p className="text-sm text-stone-600 font-normal leading-relaxed tracking-wide">
            Grounded local values, authentic plant care, and reliable supplies for garden enthusiasts across Piduguralla.
          </p>
        </div>

        {/* 5 Points Grid with generous spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-sm space-y-4 hover:border-emerald-700/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-800">
                  <Icon className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#062419]">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed tracking-wide">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
