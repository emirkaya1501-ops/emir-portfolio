"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * AnimatedGridPattern — 21st.dev / magic-ui pattern
 * SVG grid with randomly animating highlight squares.
 */
interface AnimatedGridPatternProps {
  width?: number;
  height?: number;
  /** Number of animated squares. Default 30 */
  numSquares?: number;
  /** Max opacity at peak. Default 0.3 */
  maxOpacity?: number;
  /** Animation duration per square (s). Default 3 */
  duration?: number;
  /** Delay between repeats (s). Default 1 */
  repeatDelay?: number;
  className?: string;
}

export function AnimatedGridPattern({
  width = 48,
  height = 48,
  numSquares = 30,
  maxOpacity = 0.25,
  duration = 3,
  repeatDelay = 1,
  className,
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [squares, setSquares] = useState<[number, number][]>([]);

  const cols = Math.ceil(dimensions.w / width) + 1;
  const rows = Math.ceil(dimensions.h / height) + 1;

  const getPos = (): [number, number] => [
    Math.floor(Math.random() * cols),
    Math.floor(Math.random() * rows),
  ];

  const generateSquares = (count: number) =>
    Array.from({ length: count }, () => getPos());

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const { width: w, height: h } = entries[0].contentRect;
      setDimensions({ w, h });
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (dimensions.w === 0) return;
    setSquares(generateSquares(numSquares));
  }, [dimensions, numSquares]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-[#2563EB]/[0.08] stroke-[#2563EB]/[0.06]",
        className
      )}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />

      {squares.map(([col, row], i) => (
        <motion.rect
          key={`${col}-${row}-${i}`}
          width={width - 1}
          height={height - 1}
          x={col * width + 1}
          y={row * height + 1}
          rx={2}
          initial={{ opacity: 0 }}
          animate={{ opacity: maxOpacity }}
          exit={{ opacity: 0 }}
          transition={{
            duration,
            repeat: Infinity,
            delay: i * 0.08,
            repeatType: "reverse",
            repeatDelay,
            ease: "easeInOut",
          }}
          onAnimationComplete={() => {
            setSquares((prev) => {
              const next = [...prev];
              next[i] = getPos();
              return next;
            });
          }}
        />
      ))}
    </svg>
  );
}
