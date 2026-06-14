"use client";

import { useEffect, useState } from "react";

type Heart = { id: number; left: number; drift: number; delay: number; emoji: string };

const EMOJIS = ["💛", "❤️", "✨", "🔥", "👏"];

export default function Reactions() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let n = 0;
    const id = setInterval(() => {
      const heart: Heart = {
        id: n++,
        left: 6 + Math.random() * 26,
        drift: Math.round((Math.random() - 0.5) * 60),
        delay: 0,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      };
      setHearts((h) => [...h.slice(-7), heart]);
    }, 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute bottom-24 left-0 z-20 h-56 w-32">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 text-2xl"
          style={{
            left: `${h.left}px`,
            // @ts-expect-error custom prop for keyframe drift
            "--drift": `${h.drift}px`,
            animation: "floatUp 3s ease-out forwards",
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}
