"use client";

import { useState } from "react";
import { useLanguage, Messages } from "@/context/LanguageContext";
import AnimatedSection from "./ui/AnimatedSection";
import { BorderBeam } from "./ui/BorderBeam";
import { ProjectThumbnail } from "./ui/ProjectThumbnail";
import ProjectModal from "./ProjectModal";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, TrendingUp, ExternalLink, Zap, Globe, LayoutGrid } from "lucide-react";

type Project = Messages["portfolio"]["projects"][number];

/* ── Category colour system ─────────────────────────────────────── */
const CAT_STYLES = {
  automation: {
    badge:    "bg-blue-900/40 text-blue-300 border-blue-500/40",
    tag:      "bg-blue-900/25 text-blue-300 border-blue-700/30",
    metric:   "text-blue-300",
    cardGlow: "hover:shadow-[0_0_40px_0_rgba(37,99,235,0.25),0_0_0_1px_rgba(37,99,235,0.45)]",
    beamFrom: "#2563EB",
    beamTo:   "#38BDF8",
    ctaColor: "text-blue-400 group-hover:text-blue-200",
    icon:     <Zap size={9} />,
    filterActive: "bg-gradient-to-r from-blue-700 to-cyan-500 text-white border-transparent shadow-lg shadow-blue-700/25",
    metricBg: "bg-blue-900/20 border-blue-700/25",
  },
  web: {
    badge:    "bg-violet-900/40 text-violet-300 border-violet-500/40",
    tag:      "bg-violet-900/25 text-violet-300 border-violet-700/30",
    metric:   "text-violet-300",
    cardGlow: "hover:shadow-[0_0_40px_0_rgba(139,92,246,0.25),0_0_0_1px_rgba(139,92,246,0.45)]",
    beamFrom: "#7C3AED",
    beamTo:   "#C084FC",
    ctaColor: "text-violet-400 group-hover:text-violet-200",
    icon:     <Globe size={9} />,
    filterActive: "bg-gradient-to-r from-violet-700 to-purple-500 text-white border-transparent shadow-lg shadow-violet-700/25",
    metricBg: "bg-violet-900/20 border-violet-700/25",
  },
} as const;

type CatKey = keyof typeof CAT_STYLES;

function getCat(category: string) {
  return CAT_STYLES[category as CatKey] ?? CAT_STYLES.web;
}

/* ── Project card ───────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  onOpen,
  viewLabel,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
  viewLabel: string;
}) {
  const cat    = getCat(project.category);
  const liveUrl = (project as any).live_url as string | undefined;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.93, y: 10 }}
      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
    >
      <motion.div
        whileHover={{ y: -10, scale: 1.018, transition: { duration: 0.22 } }}
        className={`group relative flex flex-col h-full rounded-2xl bg-[#071525] border border-white/[0.07] overflow-hidden cursor-pointer transition-shadow duration-300 ${cat.cardGlow}`}
        onClick={() => onOpen(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
        aria-label={`View case study: ${project.title}`}
      >
        {/* Animated border beam — category coloured */}
        <BorderBeam
          size={180}
          duration={7}
          colorFrom={cat.beamFrom}
          colorTo={cat.beamTo}
          borderWidth={1.5}
        />

        {/* ── Thumbnail ─────────────────────────────────────────── */}
        <div className="relative w-full h-[175px] flex-shrink-0 overflow-hidden bg-[#040D1A]">
          <ProjectThumbnail
            type={(project as any).thumb ?? project.id}
            projectId={project.id}
            className="w-full h-full"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center">
            <div className="w-11 h-11 rounded-full bg-white/0 group-hover:bg-white/12 border border-white/0 group-hover:border-white/25 flex items-center justify-center text-white/0 group-hover:text-white transition-all duration-300">
              <ArrowUpRight size={20} />
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 text-[9px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full border backdrop-blur-sm ${cat.badge}`}>
              {cat.icon}
              {project.category}
            </span>
          </div>

          {/* Live link badge */}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-900/80 border border-emerald-500/50 text-emerald-300 text-[9px] font-bold backdrop-blur-sm hover:bg-emerald-700/80 transition-colors"
            >
              <ExternalLink size={8} />
              Canlı
            </a>
          )}
        </div>

        {/* ── Body ──────────────────────────────────────────────── */}
        <div className="relative flex flex-col flex-grow p-5">
          <h3 className="text-white font-bold text-[16.5px] leading-snug tracking-tight mb-2.5 group-hover:text-blue-50 transition-colors">
            {project.title}
          </h3>
          <p className="text-[#4E6E94] text-[13px] leading-relaxed mb-4 font-light flex-grow">
            {project.short_desc}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[9px] px-2 py-0.5 rounded-full border font-medium uppercase tracking-wider ${cat.tag}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Key metric */}
          <div className={`flex items-center gap-2 pt-3.5 border-t border-white/[0.05]`}>
            <TrendingUp size={12} className={`flex-shrink-0 ${cat.metric}`} />
            <span className={`text-[11px] font-semibold ${cat.metric}`}>{project.metrics[0]}</span>
          </div>
        </div>

        {/* ── CTA footer ────────────────────────────────────────── */}
        <div className="relative px-5 pb-4 flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors ${cat.ctaColor}`}>
            {viewLabel}
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <ExternalLink size={10} />
              Siteyi Aç
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Portfolio section ──────────────────────────────────────────── */
export default function Portfolio() {
  const { t, messages } = useLanguage();
  const [filter, setFilter]     = useState<string>("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const cats    = messages.portfolio.categories;
  const FILTERS = ["all", "automation", "web"] as const;

  const filtered =
    filter === "all"
      ? messages.portfolio.projects
      : messages.portfolio.projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="relative py-28 sm:py-36 px-5 sm:px-8 section-divider overflow-hidden">

      {/* ── Floating glow orbs ──────────────────────────────────── */}
      <div className="absolute right-[-5%] bottom-[5%] w-[600px] h-[500px] bg-violet-700/[0.07] rounded-full blur-[140px] pointer-events-none animate-float" />
      <div className="absolute left-[-5%] top-[25%]  w-[400px] h-[400px] bg-blue-700/[0.07]  rounded-full blur-[110px] pointer-events-none animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute right-[25%] top-[5%]  w-[300px] h-[300px] bg-purple-500/[0.05] rounded-full blur-[90px]  pointer-events-none animate-float" style={{ animationDelay: "1.5s" }} />

      <div className="max-w-7xl mx-auto">

        {/* ── Section header ──────────────────────────────────────── */}
        <div className="mb-12">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] uppercase text-violet-400 border border-violet-700/30 bg-violet-900/20 rounded-full px-3 py-1 mb-5">
              <LayoutGrid size={10} />
              {t("portfolio.tag")}
            </span>
          </AnimatedSection>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <AnimatedSection delay={0.08}>
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                {t("portfolio.title")}
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.14} className="max-w-sm">
              <p className="text-[#4E6E94] text-[15px] leading-relaxed">
                {t("portfolio.subtitle")}
              </p>
            </AnimatedSection>
          </div>

          {/* ── Filter buttons ───────────────────────────────────── */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((key) => {
                const label    = key === "all" ? cats.all : key === "automation" ? cats.automation : cats.web;
                const isActive = filter === key;
                const activeClass =
                  key === "automation" ? CAT_STYLES.automation.filterActive
                  : key === "web"      ? CAT_STYLES.web.filterActive
                  : "bg-gradient-to-r from-slate-600 to-slate-500 text-white border-transparent shadow-lg shadow-slate-700/20";

                return (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setFilter(key)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                      isActive
                        ? activeClass
                        : "bg-white/[0.04] text-[#4E6E94] border-white/[0.07] hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    {label}
                    {key !== "all" && (
                      <span className="ml-2 text-[10px] opacity-60">
                        ({messages.portfolio.projects.filter((p) => p.category === key).length})
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </AnimatedSection>
        </div>

        {/* ── Project grid ────────────────────────────────────────── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                onOpen={setSelected}
                viewLabel={t("portfolio.view_details")}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
