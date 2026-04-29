"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/**
 * Meteors — 21st.dev / magic-ui pattern
 * Falling diagonal lines that animate across the screen.
 */
interface MeteorsProps {
  number?: number;
  className?: string;
}

export function Meteors({ number = 12, className }: MeteorsProps) {
  const [meteorStyles, setMeteorStyles] = useState<
    { top: string; left: string; delay: string; duration: string }[]
  >([]);

  useEffect(() => {
    setMeteorStyles(
      Array.from({ length: number }, () => ({
        top:      `${Math.floor(Math.random() * 100)}%`,
        left:     `${Math.floor(Math.random() * 100)}%`,
        delay:    `${(Math.random() * 3).toFixed(2)}s`,
        duration: `${(Math.random() * 6 + 4).toFixed(2)}s`,
      }))
    );
  }, [number]);

  return (
    <div aria-hidden="true" className={cn("overflow-hidden absolute inset-0 pointer-events-none", className)}>
      {meteorStyles.map((style, i) => (
        <span
          key={i}
          className="absolute top-1/2 left-1/2 h-[1px] w-[80px] rotate-[215deg] animate-meteor rounded-full bg-gradient-to-r from-blue-500 to-transparent shadow-[0_0_0_1px_#2563EB20] opacity-0"
          style={{
            top:             style.top,
            left:            style.left,
            animationDelay:  style.delay,
            animationDuration: style.duration,
          }}
        />
      ))}
    </div>
  );
}
