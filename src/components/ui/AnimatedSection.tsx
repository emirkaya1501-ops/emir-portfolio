"use client";

import { motion, MotionProps, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface Props extends MotionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

export default function AnimatedSection({
  children,
  delay = 0,
  className,
  direction = "up",
  distance = 24,
  ...rest
}: Props) {
  const reduced = useReducedMotion();

  const offset =
    reduced || direction === "none" ? {} :
    direction === "up"    ? { y: distance }  :
    direction === "down"  ? { y: -distance } :
    direction === "left"  ? { x: distance }  :
                            { x: -distance };

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
