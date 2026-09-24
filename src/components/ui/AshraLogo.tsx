import React from "react";

interface AshraLogoProps {
  className?: string;
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}

export default function AshraLogo({
  className = "",
  variant = "dark",
  size = "md",
}: AshraLogoProps) {
  const isLight = variant === "light";

  const sizeClasses = {
    sm: "h-9",
    md: "h-11",
    lg: "h-14",
  };

  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Botanical Crest Icon */}
      <div
        className={`relative ${
          size === "sm" ? "w-9 h-9" : size === "md" ? "w-11 h-11" : "w-14 h-14"
        } rounded-2xl flex items-center justify-center transition-all duration-300 ${
          isLight
            ? "bg-gradient-to-br from-emerald-500/20 via-emerald-600/30 to-emerald-950/80 border border-emerald-400/30 shadow-inner"
            : "bg-gradient-to-br from-[#1b4332] via-[#0d2f23] to-[#04140e] border border-[#2d6a4f]/50 shadow-md"
        }`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5"
        >
          {/* Stem & Leaves Silhouette */}
          <path
            d="M24 40V18M24 18C24 12 18 8 12 8C12 16 18 20 24 22M24 26C24 20 30 16 36 16C36 24 30 28 24 30"
            stroke={isLight ? "#fef08a" : "#d4af37"}
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Subtle Dewdrop */}
          <circle cx="24" cy="10" r="2.5" fill={isLight ? "#86efac" : "#52b788"} />
        </svg>
      </div>

      {/* Typography Wordmark with Generous Letter-Spacing & Proper Line-Height */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-serif tracking-[0.14em] font-extrabold uppercase leading-none ${
              size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl"
            } ${isLight ? "text-white" : "text-[#062419]"}`}
          >
            Ashra
          </span>
          <span
            className={`font-sans tracking-[0.16em] font-light uppercase leading-none ${
              size === "sm" ? "text-lg" : size === "md" ? "text-xl" : "text-2xl"
            } ${isLight ? "text-emerald-300" : "text-emerald-700"}`}
          >
            Gardens
          </span>
        </div>
        <span
          className={`text-[9px] uppercase tracking-[0.24em] font-medium mt-1 ${
            isLight ? "text-emerald-200/70" : "text-stone-500"
          }`}
        >
          Nursery • Supplies • Services
        </span>
      </div>
    </div>
  );
}
