"use client";

import React, { useEffect, useState } from "react";

interface FloatingParticle {
  id: number;
  type: "leaf" | "petal" | "mote";
  left: number; // percentage (0 - 100)
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  rotate: number; // degrees
}

export default function ContinuousBotanicalFloating() {
  const [particles, setParticles] = useState<FloatingParticle[]>([]);

  useEffect(() => {
    // Generate deterministic pleasing particles
    const items: FloatingParticle[] = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      type: i % 3 === 0 ? "leaf" : i % 3 === 1 ? "petal" : "mote",
      left: (i * 6.25 + (i % 5) * 3) % 96,
      size: i % 3 === 0 ? 18 + (i % 8) : i % 3 === 1 ? 12 + (i % 6) : 6 + (i % 4),
      duration: 12 + (i % 8) * 2,
      delay: (i % 6) * 1.5,
      rotate: (i * 45) % 360,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: "-40px",
            animation: `breezeDrift ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            opacity: 0.65,
          }}
        >
          {p.type === "leaf" && (
            <svg
              width={p.size}
              height={p.size * 1.3}
              viewBox="0 0 24 32"
              fill="none"
              style={{ transform: `rotate(${p.rotate}deg)` }}
            >
              <path
                d="M 12 0 C 4 8 2 20 12 32 C 22 20 20 8 12 0 Z"
                fill="#2d6a4f"
                fillOpacity="0.45"
              />
              <path
                d="M 12 0 L 12 32"
                stroke="#52b788"
                strokeWidth="1"
                strokeOpacity="0.6"
              />
            </svg>
          )}

          {p.type === "petal" && (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 20 20"
              fill="none"
              style={{ transform: `rotate(${p.rotate}deg)` }}
            >
              <path
                d="M 10 0 C 15 5 18 10 10 20 C 2 10 5 5 10 0 Z"
                fill="#f4a261"
                fillOpacity="0.35"
              />
            </svg>
          )}

          {p.type === "mote" && (
            <div
              className="rounded-full bg-[#fde047]/40 blur-[1px]"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
