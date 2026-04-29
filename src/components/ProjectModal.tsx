"use client";

import { useEffect, useCallback } from "react";
import { useLanguage, Messages } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle, Lightbulb, TrendingUp, Tag, BarChart2, ExternalLink } from "lucide-react";
import { ProjectThumbnail } from "./ui/ProjectThumbnail";

type Project = Messages["portfolio"]["projects"][number];

interface Props {
  project: Project | null;
  onClose: () => void;
}

function Block({
  icon, label, content, color,
}: {
  icon: React.ReactNode;
  label: string;
  content: string;
  color: string;
}) {
  return (
    <div className={`rounded-xl p-5 border ${color} bg-white/[0.015]`}>
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#4E6E94]">{label}</span>
      </div>
      <p className="text-[#B8CFEA] text-[14px] leading-[1.82] font-light">{content}</p>
    </div>
  );
}

export default function ProjectModal({ project, onClose }: Props) {
  const { t } = useLanguage();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!project) return;
    window.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("modal-open");
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [project, handleKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-start justify-center overflow-y-auto py-6 px-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 28, scale: 0.97 }}
            transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#071525] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden my-auto"
          >
            {/* Top gradient stripe */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-blue-700 via-blue-500 to-sky-400 z-10" />

            {/* ── Project thumbnail (visual) ──────────────────────── */}
            <div className="relative h-[180px] w-full overflow-hidden bg-[#040D1A]">
              <ProjectThumbnail
                type={(project as any).thumb ?? project.id}
                projectId={project.id}
                className="w-full h-full"
              />
              {/* Dark gradient overlay at bottom for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071525]/90 via-transparent to-transparent" />
              {/* Category + close button row */}
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
                <span className="inline-block text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-0.5 rounded-full bg-[#030B18]/85 text-blue-400 border border-blue-700/30 backdrop-blur-sm">
                  {project.category}
                </span>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-xl bg-[#030B18]/85 hover:bg-white/[0.15] border border-white/[0.1] flex items-center justify-center text-[#4E6E94] hover:text-white transition-all backdrop-blur-sm"
                  aria-label={t("portfolio.close")}
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* ── Header (title + tags) ───────────────────────────── */}
            <div className="px-7 pt-5 pb-4 border-b border-white/[0.06]">
              <h2 className="text-2xl sm:text-[24px] font-bold text-white leading-tight tracking-tight mb-3">
                {project.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full bg-blue-900/20 text-blue-400 font-medium border border-blue-800/25 uppercase tracking-wider">
                    <Tag size={8} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Body ────────────────────────────────────────────── */}
            <div className="px-7 py-6 space-y-4">
              {/* Short desc */}
              <p className="text-[#4E6E94] text-[14px] leading-relaxed font-light border-l-2 border-blue-700/40 pl-4 italic">
                {project.short_desc}
              </p>

              <Block
                icon={<AlertCircle size={14} className="text-rose-400" />}
                label={t("portfolio.problem_label")}
                content={project.problem}
                color="border-rose-500/12"
              />
              <Block
                icon={<Lightbulb size={14} className="text-amber-400" />}
                label={t("portfolio.solution_label")}
                content={project.solution}
                color="border-amber-500/12"
              />
              <Block
                icon={<TrendingUp size={14} className="text-emerald-400" />}
                label={t("portfolio.result_label")}
                content={project.result}
                color="border-emerald-500/12"
              />

              {/* Metrics */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <BarChart2 size={13} className="text-blue-400" />
                  <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#4E6E94]">
                    {t("portfolio.metrics_label")}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {project.metrics.map((m) => (
                    <div key={m} className="px-4 py-3 rounded-xl bg-blue-900/15 border border-blue-700/20 text-blue-300 text-[13px] font-semibold text-center leading-snug">
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Footer CTA ───────────────────────────────────────── */}
            <div className="px-7 pb-7 flex flex-col gap-3">
              {(project as any).live_url && (
                <a
                  href={(project as any).live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] text-white font-semibold text-[15px] transition-all duration-200"
                >
                  <ExternalLink size={15} />
                  Canlı Siteyi Gör
                </a>
              )}
              <a
                href="#contact"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-semibold text-[15px] transition-all duration-200 shadow-lg shadow-blue-700/20"
              >
                {t("nav.cta")} →
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
