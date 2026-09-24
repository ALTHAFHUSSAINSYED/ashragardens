"use client";

import React, { useEffect, useState } from "react";
import AshraLogo from "@/components/ui/AshraLogo";
import { Sparkles } from "lucide-react";

interface WateringGrowthLoaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export default function WateringGrowthLoader({
  onComplete,
  minDurationMs = 3400,
}: WateringGrowthLoaderProps) {
  const [stage, setStage] = useState<"pour" | "grow" | "bloom" | "reveal">("pour");
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 3D Animation Timelines
    const t1 = setTimeout(() => setStage("grow"), 1000);
    const t2 = setTimeout(() => setStage("bloom"), 2100);
    const t3 = setTimeout(() => setStage("reveal"), 3100);
    const t4 = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, minDurationMs);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 3;
      });
    }, minDurationMs / 35);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearInterval(interval);
    };
  }, [minDurationMs, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#04140e] text-[#faf8f5] transition-all duration-700 ${
        stage === "reveal" ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
      style={{
        perspective: "1200px",
        backgroundImage:
          "radial-gradient(ellipse at 50% 35%, #0b3325 0%, #061d15 50%, #030d09 100%)",
      }}
    >

      {/* 3D Isometric Botanical Stage */}
      <div className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center transform-gpu">
        {/* Soft Volumetric Glow */}
        <div className="absolute w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
        <div className="absolute -bottom-6 w-56 h-12 bg-black/60 rounded-full blur-xl pointer-events-none" />

        <svg
          viewBox="0 0 400 400"
          className="w-full h-full relative z-10 overflow-visible"
        >
          <defs>
            {/* 3D Planter Shading */}
            <linearGradient id="terracotta3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d97757" />
              <stop offset="40%" stopColor="#b44b26" />
              <stop offset="85%" stopColor="#7a2e14" />
              <stop offset="100%" stopColor="#4e1b0b" />
            </linearGradient>

            <linearGradient id="goldCan3D" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#d4af37" />
              <stop offset="80%" stopColor="#997017" />
              <stop offset="100%" stopColor="#543c08" />
            </linearGradient>

            <linearGradient id="stem3D" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#1b4332" />
              <stop offset="60%" stopColor="#2d6a4f" />
              <stop offset="100%" stopColor="#74c69d" />
            </linearGradient>

            <linearGradient id="leaf3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#95d5b2" />
              <stop offset="45%" stopColor="#40916c" />
              <stop offset="90%" stopColor="#1b4332" />
            </linearGradient>

            <linearGradient id="bloomPetal3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="30%" stopColor="#f4a261" />
              <stop offset="80%" stopColor="#e76f51" />
              <stop offset="100%" stopColor="#b5381a" />
            </linearGradient>

            <filter id="shadow3D" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000" floodOpacity="0.5" />
            </filter>
          </defs>

          {/* 1. 3D Terracotta Pot & Soil */}
          <g filter="url(#shadow3D)">
            {/* Pot Body */}
            <polygon
              points="140,290 260,290 244,355 156,355"
              fill="url(#terracotta3D)"
              stroke="#541e0d"
              strokeWidth="1.5"
            />
            {/* Pot Lip / Rim with 3D Depth */}
            <ellipse cx="200" cy="288" rx="66" ry="12" fill="url(#terracotta3D)" stroke="#541e0d" strokeWidth="1.5" />
            {/* Rich Earth Soil Bed */}
            <ellipse cx="200" cy="289" rx="58" ry="9" fill="#241611" />
            <ellipse cx="200" cy="289" rx="52" ry="7" fill="#3a2219" />
          </g>

          {/* 2. 3D Watering Can Animation */}
          {stage === "pour" && (
            <g
              style={{
                transformOrigin: "270px 140px",
                animation: "leafSway 2.5s ease-in-out infinite",
              }}
            >
              {/* Can Vessel */}
              <path
                d="M 270 120 C 255 120 242 135 242 155 L 248 200 C 248 212 260 222 278 222 L 318 222 C 330 222 342 212 342 200 L 342 155 C 342 135 330 120 315 120 Z"
                fill="url(#goldCan3D)"
                stroke="#684a0d"
                strokeWidth="1.5"
              />
              {/* Ergonomic Arch Handle */}
              <path
                d="M 338 135 C 370 145 370 210 338 210"
                fill="none"
                stroke="url(#goldCan3D)"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Long Tapered Spout */}
              <path
                d="M 245 170 L 195 190"
                fill="none"
                stroke="url(#goldCan3D)"
                strokeWidth="7"
                strokeLinecap="round"
              />
              {/* Spout Rosette */}
              <circle cx="192" cy="192" r="7" fill="#fef08a" />

              {/* Water Cascades */}
              <g>
                <line
                  x1="190"
                  y1="195"
                  x2="182"
                  y2="285"
                  stroke="#7dd3fc"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                  className="animate-pulse"
                />
                <line
                  x1="194"
                  y1="197"
                  x2="200"
                  y2="285"
                  stroke="#38bdf8"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                />
                <line
                  x1="197"
                  y1="195"
                  x2="216"
                  y2="284"
                  stroke="#bae6fd"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                />

                {/* Bouncing Droplets */}
                <circle cx="186" cy="235" r="3" fill="#7dd3fc" />
                <circle cx="204" cy="255" r="3.5" fill="#38bdf8" />
                <circle cx="194" cy="275" r="2.8" fill="#e0f2fe" />
              </g>
            </g>
          )}

          {/* 3. The 3D Plant Growth (Stem & Foliage) */}
          {(stage === "grow" || stage === "bloom" || stage === "reveal") && (
            <g>
              {/* Main Stem Rising */}
              <path
                d="M 200 289 C 200 230, 194 195, 200 145"
                fill="none"
                stroke="url(#stem3D)"
                strokeWidth="5"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 160,
                  strokeDashoffset: stage === "grow" ? 15 : 0,
                  transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />

              {/* Broad Lower Leaf (Left) */}
              <g
                style={{
                  transformOrigin: "198px 240px",
                  animation: "leafPop 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                }}
              >
                <path
                  d="M 198 240 C 155 235 142 205 150 190 C 176 190 192 218 198 240 Z"
                  fill="url(#leaf3D)"
                  stroke="#103322"
                  strokeWidth="1"
                  filter="url(#shadow3D)"
                />
                <path d="M 198 240 Q 172 215 152 195" fill="none" stroke="#d8f3dc" strokeWidth="1.2" opacity="0.75" />
              </g>

              {/* Broad Lower Leaf (Right) */}
              <g
                style={{
                  transformOrigin: "201px 215px",
                  animation: "leafPop 1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s forwards",
                }}
              >
                <path
                  d="M 201 215 C 244 210 258 180 250 165 C 224 165 208 193 201 215 Z"
                  fill="url(#leaf3D)"
                  stroke="#103322"
                  strokeWidth="1"
                  filter="url(#shadow3D)"
                />
                <path d="M 201 215 Q 227 190 248 170" fill="none" stroke="#d8f3dc" strokeWidth="1.2" opacity="0.75" />
              </g>

              {/* Upper Tender Leaf */}
              {(stage === "bloom" || stage === "reveal") && (
                <g
                  style={{
                    transformOrigin: "199px 175px",
                    animation: "leafPop 0.8s ease-out forwards",
                  }}
                >
                  <path
                    d="M 199 175 C 168 160 162 140 170 128 C 185 132 194 155 199 175 Z"
                    fill="url(#leaf3D)"
                    stroke="#103322"
                    strokeWidth="1"
                  />
                </g>
              )}
            </g>
          )}

          {/* 4. Flower Blooming in 3D Depth */}
          {(stage === "bloom" || stage === "reveal") && (
            <g
              style={{
                transformOrigin: "200px 140px",
                animation: "flowerBloom 1.2s cubic-bezier(0.17, 0.67, 0.35, 1.2) forwards",
              }}
              filter="url(#shadow3D)"
            >
              {/* Outer Layer Petals */}
              <circle cx="200" cy="120" r="17" fill="url(#bloomPetal3D)" opacity="0.95" />
              <circle cx="218" cy="132" r="17" fill="url(#bloomPetal3D)" opacity="0.95" />
              <circle cx="212" cy="154" r="17" fill="url(#bloomPetal3D)" opacity="0.95" />
              <circle cx="188" cy="154" r="17" fill="url(#bloomPetal3D)" opacity="0.95" />
              <circle cx="182" cy="132" r="17" fill="url(#bloomPetal3D)" opacity="0.95" />

              {/* Inner Petal Cluster */}
              <circle cx="200" cy="138" r="12" fill="#fde047" stroke="#eab308" strokeWidth="1.5" />
              <circle cx="200" cy="138" r="7" fill="#ca8a04" />

              {/* Sparkles / Pollen Burst */}
              <g className="animate-pulse">
                <circle cx="168" cy="100" r="2.5" fill="#fef08a" />
                <circle cx="232" cy="108" r="3" fill="#fef08a" />
                <circle cx="200" cy="88" r="2" fill="#ffffff" />
                <circle cx="240" cy="148" r="2" fill="#fef08a" />
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Brand Presentation & Message with Clean Spacing */}
      <div className="mt-8 text-center z-10 max-w-sm px-6 space-y-3">
        <AshraLogo variant="light" size="lg" className="justify-center" />

        <p className="text-xs uppercase tracking-[0.25em] text-emerald-300/80 font-medium">
          {stage === "pour" && "Hydrating organic nursery beds..."}
          {stage === "grow" && "Cultivating acclimatized saplings..."}
          {stage === "bloom" && "Blooming nature for your home..."}
          {stage === "reveal" && "Welcome to AshraGardens • Piduguralla"}
        </p>

        {/* Minimalist Progress Meter */}
        <div className="w-48 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-amber-300 to-emerald-400 transition-all duration-150 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
