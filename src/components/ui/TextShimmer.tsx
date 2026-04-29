"use client";

import { cn } from "@/lib/utils";
import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * TextShimmer — 21st.dev pattern
 * A gradient highlight that sweeps across text on a loop.
 */
interface TextShimmerProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Sweep duration in seconds. Default 2.5 */
  duration?: number;
  /** Spread multiplier — higher = wider shimmer window. Default 2 */
  spread?: number;
}

export function TextShimmer({
  children,
  as: Tag = "span",
  className,
  duration = 2.5,
  spread = 2,
}: TextShimmerProps) {
  return (
    <Tag
      style={
        {
          "--shimmer-dur":    `${duration}s`,
          "--shimmer-spread": spread,
        } as CSSProperties
      }
      className={cn("text-shimmer", className)}
    >
      {children}
    </Tag>
  );
}
