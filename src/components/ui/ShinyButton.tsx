"use client";

import { cn } from "@/lib/utils";
import type { ComponentPropsWithRef } from "react";

/**
 * ShinyButton — 21st.dev pattern
 * A button with a sweeping shine/glint effect on hover.
 */
interface ShinyButtonProps extends ComponentPropsWithRef<"a"> {
  children: React.ReactNode;
  className?: string;
}

export function ShinyButton({
  children,
  className,
  ...props
}: ShinyButtonProps) {
  return (
    <a
      {...props}
      className={cn(
        "shiny-button",
        "relative inline-flex items-center justify-center gap-2.5",
        "overflow-hidden rounded-full",
        "px-8 py-3.5",
        "bg-gradient-to-r from-blue-700 to-blue-500",
        "text-white font-semibold text-[15px] tracking-tight",
        "shadow-lg shadow-blue-700/25",
        "transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-blue-600/35 active:scale-[0.98]",
        className
      )}
    >
      {children}
    </a>
  );
}

/**
 * ShinyButtonOutline — ghost variant with shine
 */
export function ShinyButtonOutline({
  children,
  className,
  ...props
}: ShinyButtonProps) {
  return (
    <a
      {...props}
      className={cn(
        "shiny-button-outline",
        "relative inline-flex items-center justify-center gap-2",
        "overflow-hidden rounded-full",
        "px-8 py-3.5",
        "bg-white/[0.04] border border-blue-500/20",
        "text-slate-300 font-semibold text-[15px]",
        "transition-all duration-300",
        "hover:bg-white/[0.07] hover:border-blue-500/40 hover:text-white",
        "active:scale-[0.98]",
        className
      )}
    >
      {children}
    </a>
  );
}
