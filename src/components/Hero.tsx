"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedGridPattern } from "./ui/AnimatedGridPattern";
import { TextShimmer } from "./ui/TextShimmer";
import { ShinyButton, ShinyButtonOutline } from "./ui/ShinyButton";
import { Meteors } from "./ui/Meteors";

/* ── Ambient glow orbs ──────────────────────────────────────────── */
function GlowOrbs() {
  return (
    <>
      <div className="absolute top-[8%] left-[12%] w-[500px] h-[500px] bg-blue-700/[0.1] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[25%] right-[8%]  w-[380px] h-[380px] bg-blue-500/[0.07] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[8%] left-[40%] w-[320px] h-[320px] bg-sky-600/[0.06]  rounded-full blur-[90px]  pointer-events-none" />
    </>
  );
}

/* ── Stat card ──────────────────────────────────────────────────── */
function HeroStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="text-2xl sm:text-[28px] font-bold text-white tabular-nums leading-none">
        {value}
      </span>
      <span className="text-[11px] text-[#4E6E94] text-center leading-snug max-w-[72px] uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  );
}

/* ── Trust badge ────────────────────────────────────────────────── */
function TrustBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-700/30 text-blue-400 text-[13px] font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse-slow" />
      {text}
    </span>
  );
}

export default function Hero() {
  const { t, messages } = useLanguage();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11 } },
  };
  const item = {
    hidden:  { opacity: 0, y: 26 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated grid pattern background */}
      <AnimatedGridPattern
        numSquares={25}
        maxOpacity={0.18}
        duration={4}
        className="inset-x-0 inset-y-[-10%] h-[110%] skew-y-0"
      />

      {/* Glow orbs */}
      <GlowOrbs />

      {/* Meteors */}
      <Meteors number={10} />

      {/* Gradient top fade */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#030B18] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#030B18] to-transparent pointer-events-none" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center"
      >
        {/* Badge */}
        <motion.div variants={item} className="mb-8">
          <TrustBadge text={t("hero.badge")} />
        </motion.div>

        {/* Headline */}
        <motion.div variants={item}>
          <h1 className="text-5xl sm:text-6xl md:text-[72px] lg:text-[82px] font-extrabold leading-[1.04] tracking-[-0.03em] text-white mb-7">
            {t("hero.title_line1")}
            <br />
            <TextShimmer
              as="span"
              duration={3}
              className="text-5xl sm:text-6xl md:text-[72px] lg:text-[82px] font-extrabold leading-[1.04] tracking-[-0.03em]"
            >
              {t("hero.title_line2")}
            </TextShimmer>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={item}>
          <p className="text-[17px] text-[#4E6E94] max-w-2xl leading-relaxed mb-11 font-light">
            {t("hero.subtitle")}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <ShinyButton href="#portfolio" className="text-[15px]">
            {t("hero.cta_primary")}
            <ArrowRight size={16} />
          </ShinyButton>
          <ShinyButtonOutline href="#contact" className="text-[15px]">
            {t("hero.cta_secondary")}
          </ShinyButtonOutline>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="mt-16 pt-10 border-t border-white/[0.07] w-full flex flex-wrap items-center justify-center gap-8 sm:gap-14"
        >
          {messages.about.stats.map((s, i) => (
            <HeroStat key={i} value={s.value} label={s.label} />
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div variants={item} className="mt-12 flex flex-col items-center gap-2 text-[#1F3654]">
          <span className="text-[10px] tracking-[0.15em] uppercase font-medium">
            {t("hero.scroll_hint")}
          </span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}
