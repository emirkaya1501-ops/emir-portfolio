"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * NumberTicker — 21st.dev / magic-ui pattern
 * Animates a number from 0 → value using Framer Motion spring physics.
 * Triggers once when the element scrolls into view.
 */
interface NumberTickerProps {
  value: number;
  /** Animation start direction. Default "up" */
  direction?: "up" | "down";
  /** Delay before animation starts (seconds). Default 0 */
  delay?: number;
  /** Decimal places to display. Default 0 */
  decimalPlaces?: number;
  /** Suffix appended after number (e.g. "+", "%", "k+"). Default "" */
  suffix?: string;
  className?: string;
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  suffix = "",
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  const motionVal = useMotionValue(direction === "down" ? value : 0);
  const spring = useSpring(motionVal, { damping: 60, stiffness: 100 });
  const [display, setDisplay] = useState(
    direction === "down" ? value : 0
  );

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      motionVal.set(direction === "down" ? 0 : value);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [isInView, value, direction, delay, motionVal]);

  useEffect(
    () =>
      spring.on("change", (v) =>
        setDisplay(parseFloat(v.toFixed(decimalPlaces)))
      ),
    [spring, decimalPlaces]
  );

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(display)}
      {suffix}
    </span>
  );
}
