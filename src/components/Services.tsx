"use client";

import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "./ui/AnimatedSection";
import { BorderBeam } from "./ui/BorderBeam";
import { Zap, Globe, Cpu, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const ICON_MAP: Record<string, React.ReactNode> = {
  Zap:  <Zap  size={22} className="text-white" />,
  Globe:<Globe size={22} className="text-white" />,
  Cpu:  <Cpu  size={22} className="text-white" />,
};

/* Gradient maps — corporate blue family */
const GRAD: Record<string, { icon: string; beam: { from: string; to: string } }> = {
  automation: { icon: "from-blue-700 to-blue-500",  beam: { from: "#1D4ED8", to: "#38BDF8" } },
  web:        { icon: "from-blue-600 to-sky-500",   beam: { from: "#2563EB", to: "#0EA5E9" } },
  systems:    { icon: "from-sky-700  to-blue-600",  beam: { from: "#0369A1", to: "#2563EB" } },
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
        whileHover={{ y: -6, transition: { duration: 0.22 } }}
        className="group relative h-full flex flex-col p-7 rounded-2xl bg-[#071525] border border-white/[0.07] card-glow overflow-hidden"
      >
        {/* Animated border beam */}
        <BorderBeam
          colorFrom={g.beam.from}
          colorTo={g.beam.to}
          duration={8}
          size={180}
          borderWidth={1.5}
        />

        {/* Top gradient line on hover */}
        <div
          className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${g.icon} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
        />

        {/* Content wrapper — relative so it renders above the absolute BorderBeam */}
        <div className="relative flex flex-col flex-1">
          {/* Icon */}
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${g.icon} flex items-center justify-center mb-5 flex-shrink-0 shadow-lg`}
          >
            {ICON_MAP[icon] ?? <Zap size={22} className="text-white" />}
          </div>

          <h3 className="text-white font-bold text-xl mb-3 tracking-tight">{title}</h3>

          <p className="text-[#4E6E94] text-sm leading-relaxed mb-6 font-light flex-grow">
            {description}
          </p>

          <ul className="space-y-2.5 mt-auto">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-2.5">
                <CheckCircle2 size={13} className="text-blue-500 flex-shrink-0" />
                <span className="text-[#4E6E94] text-sm">{f}</span>
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
    <section id="services" className="relative py-28 sm:py-36 px-5 sm:px-8 section-divider">
      {/* Glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-blue-700/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <AnimatedSection>
            <span className="inline-block text-[10px] font-bold tracking-[0.14em] uppercase text-blue-400 border border-blue-700/30 bg-blue-900/20 rounded-full px-3 py-1 mb-5">
              {t("services.tag")}
            </span>
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
              delay={0.08 * i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
