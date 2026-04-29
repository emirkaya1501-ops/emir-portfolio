"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { key: "nav.services",  href: "#services"  },
  { key: "nav.portfolio", href: "#portfolio" },
  { key: "nav.about",     href: "#about"     },
  { key: "nav.contact",   href: "#contact"   },
] as const;

export default function Navbar() {
  const { t, lang, setLang, isReady } = useLanguage();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#030B18]/92 backdrop-blur-2xl border-b border-white/[0.05] shadow-2xl shadow-black/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group" aria-label="Emir Kaya – home">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-700/30 flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white">
                <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                <path d="M7 1V13M1 4L13 10M13 4L1 10" stroke="currentColor" strokeWidth="0.7" opacity="0.6"/>
              </svg>
            </span>
            <span className="font-bold text-[17px] tracking-tight text-white">
              emir<span className="text-blue-400">.</span>dev
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={href}
                href={href}
                className="text-[#4E6E94] hover:text-white text-sm font-medium transition-colors duration-200 relative group"
              >
                {t(key)}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            {isReady && (
              <div className="flex items-center bg-white/[0.05] rounded-full p-[3px] border border-white/[0.07]">
                {(["tr", "en"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-200 ${
                      lang === l
                        ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-sm shadow-blue-700/30"
                        : "text-[#4E6E94] hover:text-white"
                    }`}
                    aria-pressed={lang === l}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            )}

            {/* Desktop CTA */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 px-5 py-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white text-sm font-semibold rounded-full transition-all duration-200 shadow-lg shadow-blue-700/25 hover:shadow-blue-600/40 hover:scale-[1.03] active:scale-[0.98]"
            >
              {t("nav.cta")}
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-lg text-[#4E6E94] hover:text-white hover:bg-white/[0.07] transition-all"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-[#030B18]/97 backdrop-blur-2xl border-b border-white/[0.05]"
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {NAV_LINKS.map(({ key, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055, duration: 0.25 }}
                  className="py-3.5 px-4 text-[#4E6E94] hover:text-white text-base font-medium rounded-xl hover:bg-white/[0.05] transition-all border-b border-white/[0.04] last:border-0"
                >
                  {t(key)}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: NAV_LINKS.length * 0.055 + 0.08 }}
                className="mt-3 py-3 px-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-xl text-center shadow-lg shadow-blue-700/20"
              >
                {t("nav.cta")}
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
