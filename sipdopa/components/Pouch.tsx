"use client";

import { motion } from "framer-motion";
import type { Flavour } from "@/lib/flavours";

export default function Pouch({ flavour }: { flavour: Flavour }) {
  return (
    <div className="relative flex items-center justify-center">
      {/* steam */}
      <div className="pointer-events-none absolute -top-2 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:-top-4">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="steam block h-10 w-[3px] rounded-full bg-white/60 blur-[1px]"
            style={{ animationDelay: `${i * 0.9}s` }}
          />
        ))}
      </div>

      {/* glow */}
      <div
        className="absolute h-64 w-64 rounded-full blur-3xl transition-colors duration-700 sm:h-80 sm:w-80"
        style={{ background: flavour.accent, opacity: 0.22 }}
      />

      <motion.svg
        viewBox="0 0 220 300"
        className="floaty relative z-10 h-[300px] w-auto drop-shadow-2xl sm:h-[360px]"
        role="img"
        aria-label={`${flavour.name} matcha pouch`}
      >
        <defs>
          <linearGradient id="pouchGrad" x1="0" y1="0" x2="0.4" y2="1">
            <motion.stop
              offset="0%"
              animate={{ stopColor: flavour.pouchTop }}
              transition={{ duration: 0.6 }}
            />
            <motion.stop
              offset="100%"
              animate={{ stopColor: flavour.pouchBottom }}
              transition={{ duration: 0.6 }}
            />
          </linearGradient>
          <linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* crimped top */}
        <rect x="58" y="14" width="104" height="16" rx="3" fill="url(#pouchGrad)" opacity="0.9" />
        <g stroke="#1F2419" strokeOpacity="0.12" strokeWidth="2">
          {[66, 78, 90, 102, 114, 126, 138, 150].map((x) => (
            <line key={x} x1={x} y1="16" x2={x} y2="28" />
          ))}
        </g>

        {/* body */}
        <rect x="40" y="30" width="140" height="248" rx="20" fill="url(#pouchGrad)" />
        <rect x="40" y="30" width="140" height="248" rx="20" fill="url(#sheen)" />

        {/* matcha window */}
        <circle cx="110" cy="138" r="40" fill="#FAF7F0" opacity="0.92" />
        <motion.circle
          cx="110"
          cy="138"
          r="28"
          animate={{ fill: flavour.surface }}
          transition={{ duration: 0.6 }}
        />
        {/* whisk leaf glyph in window */}
        <path
          d="M110 122c8 3 12 9 11 18-8-1-12-7-11-18Z"
          fill="#FAF7F0"
          opacity="0.85"
        />
        <path
          d="M110 122c-8 3-12 9-11 18 8-1 12-7 11-18Z"
          fill="#1F2419"
          opacity="0.12"
        />

        {/* label text */}
        <text x="110" y="208" textAnchor="middle" fontFamily="Georgia, serif" fontSize="20" fill="#FAF7F0" letterSpacing="1">
          SIP DOPA
        </text>
        <motion.text
          key={flavour.id}
          x="110"
          y="230"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="11"
          fill="#FAF7F0"
          fillOpacity="0.85"
          letterSpacing="2"
          initial={{ opacity: 0, y: 236 }}
          animate={{ opacity: 0.85, y: 230 }}
          transition={{ duration: 0.4 }}
        >
          {flavour.name.toUpperCase()}
        </motion.text>
        <text x="110" y="252" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8" fill="#FAF7F0" fillOpacity="0.6" letterSpacing="1">
          CEREMONIAL · 40g
        </text>
      </motion.svg>
    </div>
  );
}
