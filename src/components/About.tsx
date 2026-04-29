"use client";

import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "./ui/AnimatedSection";
import { NumberTicker } from "./ui/NumberTicker";
import { CheckCircle2, Cpu, Globe, Zap, ArrowRight } from "lucide-react";

const TOOL_ICONS = [
  { icon: Zap,   label: "n8n",    color: "text-blue-400",   bg: "bg-blue-700/15 border-blue-700/20" },
  { icon: Cpu,   label: "OpenAI", color: "text-sky-400",    bg: "bg-sky-700/15  border-sky-700/20"  },
  { icon: Globe, label: "Web",    color: "text-blue-300",   bg: "bg-blue-800/15 border-blue-800/20" },
] as const;

/* Parse "50+" → { num: 50, suffix: "+" }   "10b+" → show as-is */
function parseStat(raw: string): { num: number | null; suffix: string } {
  const m = raw.match(/^(\d+(?:\.\d+)?)(.*)/);
  if (!m) return { num: null, suffix: raw };
  return { num: parseFloat(m[1]), suffix: m[2] };
}

function StatCard({ value, label }: { value: string; label: string }) {
  const { num, suffix } = parseStat(value);

  return (
    <div className="flex flex-col p-5 rounded-2xl bg-[#071525] border border-white/[0.07] card-glow text-center">
      <span className="text-3xl sm:text-4xl font-extrabold gradient-text leading-none mb-2">
        {num !== null ? (
          <NumberTicker value={num} delay={0.2} />
        ) : null}
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

const TECH_TAGS = ["n8n", "Next.js", "OpenAI", "TypeScript", "TailwindCSS"];

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
                  <StatCard value={s.value} label={s.label} />
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.38}>
              <div className="rounded-2xl bg-[#071525] border border-white/[0.07] overflow-hidden card-glow">
                <div className="h-20 bg-gradient-to-r from-blue-900/50 via-blue-700/30 to-sky-700/20" />
                <div className="px-6 pb-6 -mt-8">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-700 to-blue-500 border-2 border-[#030B18] flex items-center justify-center mb-3 text-lg font-bold text-white shadow-lg shadow-blue-700/25">
                    EK
                  </div>
                  <h3 className="text-white font-semibold text-base mb-0.5">Emir Kaya</h3>
                  <p className="text-blue-400 text-xs font-medium mb-4 uppercase tracking-wider">
                    {lang === "tr" ? "AI & Web Gelistirme Uzmani" : "AI & Web Development Specialist"}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {TECH_TAGS.map((tag) => (
                      <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full bg-blue-900/20 text-blue-400 font-medium border border-blue-800/30">
                        {tag}
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
