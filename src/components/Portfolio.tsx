"use client";

import { useState } from "react";
import { useLanguage, Messages } from "@/context/LanguageContext";
import AnimatedSection from "./ui/AnimatedSection";
import { BorderBeam } from "./ui/BorderBeam";
import { ProjectThumbnail } from "./ui/ProjectThumbnail";
import ProjectModal from "./ProjectModal";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";

type Project = Messages["portfolio"]["projects"][number];

/* ── Project card ───────────────────────────────────────────────── */
function ProjectCard({
  project,
  onOpen,
  viewLabel,
}: {
  project: Project;
  onOpen: (p: Project) => void;
  viewLabel: string;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        whileHover={{ y: -6, transition: { duration: 0.22 } }}
        className="group relative flex flex-col h-full rounded-2xl bg-[#071525] border border-white/[0.07] card-glow overflow-hidden cursor-pointer"
        onClick={() => onOpen(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
        aria-label={`View case study: ${project.title}`}
      >
        {/* Animated border beam */}
        <BorderBeam size={150} duration={9} colorFrom="#2563EB" colorTo="#38BDF8" borderWidth={1.2} />

        {/* ── Thumbnail illustration ─────────────────────────────── */}
        <div className="relative w-full h-[170px] flex-shrink-0 overflow-hidden bg-[#040D1A]">
          <ProjectThumbnail
            type={(project as any).thumb ?? project.id}
            projectId={project.id}
            className="w-full h-full"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-blue-950/0 group-hover:bg-blue-950/20 transition-all duration-300 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/10 border border-white/0 group-hover:border-white/20 flex items-center justify-center text-white/0 group-hover:text-white transition-all duration-300">
              <ArrowUpRight size={18} />
            </div>
          </div>
          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full bg-[#030B18]/80 text-blue-400 border border-blue-700/30 backdrop-blur-sm">
              {project.category}
            </span>
          </div>
        </div>

        {/* Body — relative so it renders above the absolute BorderBeam */}
        <div className="relative flex flex-col flex-grow p-5">
          <h3 className="text-white font-bold text-[17px] leading-snug tracking-tight mb-2.5 group-hover:text-blue-100 transition-colors">
            {project.title}
          </h3>
          <p className="text-[#4E6E94] text-[13px] leading-relaxed mb-4 font-light flex-grow">
            {project.short_desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full bg-blue-900/20 text-blue-400 border border-blue-800/25 font-medium uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          {/* Key metric */}
          <div className="flex items-center gap-2 pt-3.5 border-t border-white/[0.05]">
            <TrendingUp size={12} className="text-blue-400 flex-shrink-0" />
            <span className="text-blue-400 text-[11px] font-semibold">{project.metrics[0]}</span>
          </div>
        </div>

        {/* CTA row */}
        <div className="relative px-5 pb-4">
          <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
            {viewLabel}
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
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
    <section id="portfolio" className="relative py-28 sm:py-36 px-5 sm:px-8 section-divider">
      <div className="absolute right-0 bottom-0 w-[500px] h-[400px] bg-blue-700/[0.05] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <AnimatedSection>
            <span className="inline-block text-[10px] font-bold tracking-[0.14em] uppercase text-blue-400 border border-blue-700/30 bg-blue-900/20 rounded-full px-3 py-1 mb-5">
              {t("portfolio.tag")}
            </span>
          </AnimatedSection>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <AnimatedSection delay={0.08}>
              <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">{t("portfolio.title")}</h2>
            </AnimatedSection>
            <AnimatedSection delay={0.14} className="max-w-sm">
              <p className="text-[#4E6E94] text-[15px] leading-relaxed">{t("portfolio.subtitle")}</p>
            </AnimatedSection>
          </div>

          {/* Filter buttons */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((key) => {
                const label = key === "all" ? cats.all : key === "automation" ? cats.automation : cats.web;
                return (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 border ${
                      filter === key
                        ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white border-transparent shadow-lg shadow-blue-700/20"
                        : "bg-white/[0.04] text-[#4E6E94] border-white/[0.07] hover:bg-white/[0.07] hover:text-white"
                    }`}
                  >
                    {label}
                    {key !== "all" && (
                      <span className="ml-2 text-[10px] opacity-60">
                        ({messages.portfolio.projects.filter((p) => p.category === key).length})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </AnimatedSection>
        </div>

        {/* Project grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard
                key={p.id}
                project={p}
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
