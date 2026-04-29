"use client";

import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

/**
 * BorderBeam — 21st.dev / magic-ui pattern
 * A conic-gradient beam that rotates around the card border using
 * CSS @property (Chrome 85+, Firefox 128+, Safari 16.4+).
 */
interface BorderBeamProps {
  /** Width (px) of the visible beam segment. Default 160 */
  size?: number;
  /** Full rotation duration in seconds. Default 6 */
  duration?: number;
  /** Gradient start color. Default: corporate blue */
  colorFrom?: string;
  /** Gradient end color. Default: sky */
  colorTo?: string;
  /** Border thickness in px. Default 1.5 */
  borderWidth?: number;
  /** Stagger delay in seconds. Default 0 */
  delay?: number;
  className?: string;
}

export function BorderBeam({
  size = 160,
  duration = 6,
  colorFrom = "#2563EB",
  colorTo = "#38BDF8",
  borderWidth = 1.5,
  delay = 0,
  className,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      style={
        {
          "--beam-size":    `${size}px`,
          "--beam-dur":     `${duration}s`,
          "--beam-from":    colorFrom,
          "--beam-to":      colorTo,
          "--beam-width":   `${borderWidth}px`,
          "--beam-delay":   `-${delay}s`,
        } as CSSProperties
      }
      className={cn("border-beam", className)}
    />
  );
}
