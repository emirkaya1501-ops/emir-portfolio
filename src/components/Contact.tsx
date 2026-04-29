"use client";

import { useState, FormEvent } from "react";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedSection from "./ui/AnimatedSection";
import { BorderBeam } from "./ui/BorderBeam";
import { ShinyButton } from "./ui/ShinyButton";
import { Mail, MessageSquare, Linkedin, CheckCircle2, Loader2, Circle } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Mail:          <Mail          size={16} />,
  MessageSquare: <MessageSquare size={16} />,
  Linkedin:      <Linkedin      size={16} />,
};

const INPUT =
  "w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white placeholder-[#2D4A6A] text-sm font-light focus:outline-none focus:border-blue-600/50 focus:bg-white/[0.06] transition-all duration-200";

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const { t, messages } = useLanguage();
  const form = messages.contact.form;
  const [formState, setFormState] = useState<FormState>("idle");
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!values.name || !values.email || !values.message) return;
    setFormState("sending");
    await new Promise((r) => setTimeout(r, 1400));
    setFormState("success");
  };

  return (
    <section id="contact" className="relative py-28 sm:py-36 px-5 sm:px-8 section-divider">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-600/30 to-transparent" />
      {/* Glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[280px] bg-blue-700/[0.08] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <AnimatedSection>
            <span className="inline-block text-[10px] font-bold tracking-[0.14em] uppercase text-blue-400 border border-blue-700/30 bg-blue-900/20 rounded-full px-3 py-1 mb-5">
              {t("contact.tag")}
            </span>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
              {t("contact.title")}
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.14}>
            <p className="text-[#4E6E94] text-[15px] max-w-md leading-relaxed">{t("contact.subtitle")}</p>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
          {/* Form */}
          <AnimatedSection delay={0.1}>
            <div className="relative rounded-2xl bg-[#071525] border border-white/[0.07] p-7 sm:p-9 overflow-hidden">
              <BorderBeam size={200} duration={10} colorFrom="#2563EB" colorTo="#38BDF8" borderWidth={1.5} />

              {/* relative wrapper so form renders above the absolute BorderBeam */}
              <div className="relative">
              {formState === "success" ? (
                <div className="flex flex-col items-center justify-center text-center gap-4 py-12">
                  <CheckCircle2 size={48} className="text-emerald-400" />
                  <h3 className="text-white font-bold text-2xl">{form.success_title}</h3>
                  <p className="text-[#4E6E94] max-w-xs leading-relaxed">{form.success_body}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-bold text-[#4E6E94] uppercase tracking-[0.1em] mb-2">
                        {form.name_label}
                      </label>
                      <input
                        type="text" name="name" value={values.name} onChange={handleChange}
                        placeholder={form.name_placeholder} required className={INPUT}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#4E6E94] uppercase tracking-[0.1em] mb-2">
                        {form.email_label}
                      </label>
                      <input
                        type="email" name="email" value={values.email} onChange={handleChange}
                        placeholder={form.email_placeholder} required className={INPUT}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-[#4E6E94] uppercase tracking-[0.1em] mb-2">
                      {form.message_label}
                    </label>
                    <textarea
                      name="message" value={values.message} onChange={handleChange}
                      placeholder={form.message_placeholder} required rows={6}
                      className={`${INPUT} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 text-white font-semibold rounded-xl text-[15px] transition-all duration-300 shadow-xl shadow-blue-700/20 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {formState === "sending" ? (
                      <><Loader2 size={16} className="animate-spin" />{form.sending}</>
                    ) : form.submit}
                  </button>
                  {formState === "error" && (
                    <p className="text-rose-400 text-sm text-center">{form.error}</p>
                  )}
                </form>
              )}
              </div>
            </div>
          </AnimatedSection>

          {/* Right panel */}
          <div className="space-y-6">
            {/* Availability */}
            <AnimatedSection delay={0.15}>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-900/[0.12] border border-emerald-700/20">
                <div className="relative">
                  <Circle size={9} className="text-emerald-400 fill-emerald-400" />
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-40" />
                </div>
                <span className="text-emerald-400 text-sm font-medium">{t("contact.availability")}</span>
              </div>
            </AnimatedSection>

            {/* Direct contact */}
            <AnimatedSection delay={0.2}>
              <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-[#4E6E94] mb-3">
                {t("contact.direct_label")}
              </p>
              <div className="space-y-3">
                {messages.contact.items.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-xl bg-[#071525] border border-white/[0.07] hover:border-blue-700/30 hover:bg-blue-900/10 transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-xl bg-blue-900/20 border border-blue-800/25 flex items-center justify-center text-blue-400 flex-shrink-0 group-hover:bg-blue-800/30 transition-all">
                      {ICON_MAP[item.icon] ?? <Mail size={16} />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] font-bold tracking-[0.1em] uppercase text-[#4E6E94] mb-0.5">{item.label}</div>
                      <div className="text-[#B8CFEA] text-sm font-medium truncate">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </AnimatedSection>

            {/* Testimonial quote */}
            <AnimatedSection delay={0.28}>
              <blockquote className="p-5 rounded-xl bg-[#071525] border border-white/[0.06] border-l-[2px] border-l-blue-600/50">
                <p className="text-[#4E6E94] text-sm leading-relaxed italic font-light">
                  &ldquo;Emir automated our entire onboarding process in under a week. The time savings have been incredible.&rdquo;
                </p>
                <footer className="mt-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center text-white text-xs font-bold">S</div>
                  <div>
                    <div className="text-white text-xs font-semibold">Sarah L.</div>
                    <div className="text-[#4E6E94] text-[10px]">Operations Director</div>
                  </div>
                </footer>
              </blockquote>
            </AnimatedSection>

            <AnimatedSection delay={0.34}>
              <ShinyButton href="mailto:emir@example.com" className="w-full justify-center">
                <Mail size={15} />
                emir@example.com
              </ShinyButton>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
