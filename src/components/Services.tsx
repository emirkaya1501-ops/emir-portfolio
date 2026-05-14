"use client";

import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "./ui/AnimatedSection";
import { BorderBeam } from "./ui/BorderBeam";
import { Zap, Globe, Cpu, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, React.ReactNode> = {
  Zap:  <Zap  size={24} className="text-white" />,
  Globe:<Globe size={24} className="text-white" />,
  Cpu:  <Cpu  size={24} className="text-white" />,
};

/* Each service gets its own distinct colour identity */
const GRAD: Record<string, {
  icon:    string;
  glow:    string;
  beam:    { from: string; to: string };
  badge:   string;
  check:   string;
  cardBg:  string;
  topLine: string;
  number:  string;
}> = {
  automation: {
    icon:    "from-blue-600 to-cyan-400",
    glow:    "rgba(37,99,235,0.18)",
    beam:    { from: "#2563EB", to: "#22D3EE" },
    badge:   "bg-blue-900/30 border-blue-600/30 text-blue-300",
    check:   "text-cyan-400",
    cardBg:  "bg-[#060F1E]",
    topLine: "from-blue-600 via-cyan-400 to-blue-600",
    number:  "text-cyan-400",
  },
  web: {
    icon:    "from-violet-600 to-fuchsia-500",
    glow:    "rgba(139,92,246,0.18)",
    beam:    { from: "#7C3AED", to: "#E879F9" },
    badge:   "bg-violet-900/30 border-violet-600/30 text-violet-300",
    check:   "text-fuchsia-400",
    cardBg:  "bg-[#0A0718]",
    topLine: "from-violet-600 via-fuchsia-400 to-violet-600",
    number:  "text-violet-400",
  },
  systems: {
    icon:    "from-emerald-600 to-teal-400",
    glow:    "rgba(16,185,129,0.18)",
    beam:    { from: "#059669", to: "#2DD4BF" },
    badge:   "bg-emerald-900/30 border-emerald-600/30 text-emerald-300",
    check:   "text-teal-400",
    cardBg:  "bg-[#06150F]",
    topLine: "from-emerald-600 via-teal-400 to-emerald-600",
    number:  "text-emerald-400",
  },
};

interface ServiceCardProps {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: readonly string[];
  delay?: number;
}

function ServiceCard({ id, icon, title, description, features, delay = 0 }: ServiceCardProps) {
  const g = GRAD[id] ?? GRAD.automation;

  return (
    <AnimatedSection delay={delay}>
      <motion.div
        whileHover={{ y: -8, scale: 1.012, transition: { duration: 0.22 } }}
        className={`group relative h-full flex flex-col p-7 rounded-2xl ${g.cardBg} border border-white/[0.06] overflow-hidden`}
        style={{ boxShadow: `0 0 0 0 ${g.glow}`, transition: "box-shadow 0.3s" }}
        whileHover={{ y: -8, scale: 1.012, boxShadow: `0 0 40px 0 ${g.glow}, 0 0 0 1px ${g.glow}`, transition: { duration: 0.22 } } as any}
      >
        {/* Animated border beam — unique colour per card */}
        <BorderBeam colorFrom={g.beam.from} colorTo={g.beam.to} duration={7} size={200} borderWidth={1.5} />

        {/* Top gradient bar — always visible, brightens on hover */}
        <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${g.topLine} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Large ambient glow behind icon */}
        <div className={`absolute top-[-60px] left-[-40px] w-[220px] h-[220px] bg-gradient-to-br ${g.icon} opacity-[0.06] group-hover:opacity-[0.12] rounded-full blur-[60px] transition-opacity duration-500 pointer-events-none`} />

        <div className="relative flex flex-col flex-1">
          {/* Icon bubble */}
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${g.icon} flex items-center justify-center mb-6 flex-shrink-0 shadow-xl`}>
            {ICON_MAP[icon] ?? <Zap size={24} className="text-white" />}
          </div>

          {/* Category badge */}
          <span className={`inline-block self-start text-[9px] font-bold uppercase tracking-[0.12em] px-2.5 py-0.5 rounded-full border mb-3 ${g.badge}`}>
            {id}
          </span>

          <h3 className="text-white font-bold text-xl mb-3 tracking-tight leading-snug">{title}</h3>

          <p className="text-[#4E6E94] text-sm leading-relaxed mb-7 font-light flex-grow">{description}</p>

          <ul className="space-y-3 mt-auto border-t border-white/[0.05] pt-5">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <CheckCircle2 size={13} className={`flex-shrink-0 ${g.check}`} />
                <span className="text-[#6B8CAE] text-[13px]">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </AnimatedSection>
  );
}

export default function Services() {
  const { t, messages } = useLanguage();

  return (
    <section id="services" className="relative py-28 sm:py-36 px-5 sm:px-8 section-divider overflow-hidden">
      {/* Multi-colour ambient glows */}
      <div className="absolute left-[-5%] top-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-blue-700/[0.07] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-[10%] top-[20%] w-[300px] h-[300px] bg-violet-700/[0.07] rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute right-[5%] bottom-[15%] w-[250px] h-[250px] bg-emerald-700/[0.05] rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-block text-[10px] font-bold tracking-[0.14em] uppercase text-blue-400 border border-blue-700/30 bg-blue-900/20 rounded-full px-3 py-1">
                {t("services.tag")}
              </span>
            </div>
          </AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <AnimatedSection delay={0.08}>
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                {t("services.title")}
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.14} className="max-w-sm">
              <p className="text-[#4E6E94] text-[15px] leading-relaxed">{t("services.subtitle")}</p>
            </AnimatedSection>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {messages.services.items.map((item, i) => (
            <ServiceCard
              key={item.id}
              id={item.id}
              icon={item.icon}
              title={item.title}
              description={item.description}
              features={item.features}
              delay={0.09 * i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
