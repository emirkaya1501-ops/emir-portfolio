"use client";

import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "./ui/AnimatedSection";
import { NumberTicker } from "./ui/NumberTicker";
import { CheckCircle2, Cpu, Globe, Zap, ArrowRight } from "lucide-react";

const TOOL_ICONS = [
  { icon: Zap,   label: "n8n",    color: "text-orange-400",  bg: "bg-orange-900/20 border-orange-600/25" },
  { icon: Cpu,   label: "OpenAI", color: "text-emerald-400", bg: "bg-emerald-900/20 border-emerald-600/25" },
  { icon: Globe, label: "Web",    color: "text-violet-400",  bg: "bg-violet-900/20 border-violet-600/25" },
] as const;

/* Parse "50+" → { num: 50, suffix: "+" }   "10b+" → show as-is */
function parseStat(raw: string): { num: number | null; suffix: string } {
  const m = raw.match(/^(\d+(?:\.\d+)?)(.*)/);
  if (!m) return { num: null, suffix: raw };
  return { num: parseFloat(m[1]), suffix: m[2] };
}

const STAT_COLORS = [
  { text: "text-blue-400",    bg: "bg-blue-900/15",    border: "border-blue-700/20",    glow: "shadow-blue-900/20" },
  { text: "text-violet-400",  bg: "bg-violet-900/15",  border: "border-violet-700/20",  glow: "shadow-violet-900/20" },
  { text: "text-emerald-400", bg: "bg-emerald-900/15", border: "border-emerald-700/20", glow: "shadow-emerald-900/20" },
  { text: "text-orange-400",  bg: "bg-orange-900/15",  border: "border-orange-700/20",  glow: "shadow-orange-900/20" },
];

function StatCard({ value, label, idx }: { value: string; label: string; idx: number }) {
  const { num, suffix } = parseStat(value);
  const c = STAT_COLORS[idx % STAT_COLORS.length];

  return (
    <div className={`flex flex-col p-5 rounded-2xl ${c.bg} border ${c.border} text-center shadow-lg ${c.glow}`}>
      <span className={`text-3xl sm:text-4xl font-extrabold leading-none mb-2 ${c.text}`}>
        {num !== null ? <NumberTicker value={num} delay={0.2} /> : null}
        {suffix}
      </span>
      <span className="text-xs text-[#4E6E94] leading-snug uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 size={15} className="text-blue-500 mt-[2px] flex-shrink-0" />
      <span className="text-[#4E6E94] text-sm leading-relaxed">{text}</span>
    </li>
  );
}

const CHECKS_EN = [
  "Clear, jargon-free communication at every step",
  "On-time delivery — always with a working demo",
  "Systems designed to scale as your business grows",
  "Ongoing support after handoff, not just a one-time build",
];
const CHECKS_TR = [
  "Her adimda acik, jargonsuz iletisim",
  "Zamaninda teslim — her zaman calisan bir demo ile",
  "Isletmeniz buyudukce olceklenecek sistemler",
  "Teslimden sonra surekli destek",
];

const TECH_TAGS = [
  { label: "n8n",         color: "bg-orange-900/20 text-orange-400 border-orange-700/30" },
  { label: "Next.js",     color: "bg-slate-800/40 text-slate-300 border-slate-600/30" },
  { label: "OpenAI",      color: "bg-emerald-900/20 text-emerald-400 border-emerald-700/30" },
  { label: "TypeScript",  color: "bg-blue-900/20 text-blue-400 border-blue-700/30" },
  { label: "TailwindCSS", color: "bg-cyan-900/20 text-cyan-400 border-cyan-700/30" },
];

export default function About() {
  const { t, messages, lang } = useLanguage();
  const checks = lang === "tr" ? CHECKS_TR : CHECKS_EN;

  return (
    <section id="about" className="relative py-28 sm:py-36 px-5 sm:px-8 section-divider">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-blue-700/[0.06] rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection className="mb-16">
          <span className="inline-block text-[10px] font-bold tracking-[0.14em] uppercase text-blue-400 border border-blue-700/30 bg-blue-900/20 rounded-full px-3 py-1 mb-5">
            {t("about.tag")}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight max-w-lg">
            {t("about.title")}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — bio */}
          <div className="space-y-8">
            <AnimatedSection delay={0.05}>
              <div className="flex items-center gap-3 flex-wrap">
                {TOOL_ICONS.map(({ icon: Icon, label, color, bg }) => (
                  <div key={label} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${bg} border`}>
                    <Icon size={13} className={color} />
                    <span className={`text-xs font-semibold ${color}`}>{label}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <p className="text-[#B8CFEA] text-base leading-relaxed font-light">{t("about.bio_1")}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <p className="text-[#4E6E94] text-sm leading-relaxed font-light">{t("about.bio_2")}</p>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <ul className="space-y-3">{checks.map((c) => <CheckItem key={c} text={c} />)}</ul>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <a href="#contact" className="group inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                {lang === "tr" ? "Birlikte calisalim" : "Let's work together"}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </AnimatedSection>
          </div>

          {/* Right — stats + profile card */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {messages.about.stats.map((s, i) => (
                <AnimatedSection key={i} delay={0.1 + i * 0.07}>
                  <StatCard value={s.value} label={s.label} idx={i} />
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.38}>
              <div className="rounded-2xl bg-[#071525] border border-white/[0.07] overflow-hidden card-glow">
                <div className="h-20 bg-gradient-to-r from-blue-900/60 via-violet-800/40 to-fuchsia-900/30" />
                <div className="px-6 pb-6 -mt-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 border-2 border-[#030B18] flex items-center justify-center mb-3 text-lg font-bold text-white shadow-lg shadow-violet-700/30">
                    EK
                  </div>
                  <h3 className="text-white font-semibold text-base mb-0.5">Emir Kaya</h3>
                  <p className="text-blue-400 text-xs font-medium mb-4 uppercase tracking-wider">
                    {lang === "tr" ? "AI & Web Gelistirme Uzmani" : "AI & Web Development Specialist"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TECH_TAGS.map((tag) => (
                      <span key={tag.label} className={`text-[10px] px-2.5 py-1 rounded-full font-medium border ${tag.color}`}>
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
