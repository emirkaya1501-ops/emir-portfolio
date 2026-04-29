"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Github, Twitter, Linkedin } from "lucide-react";

const SOCIAL = [
  { icon: Github,   href: "https://github.com",   label: "GitHub" },
  { icon: Twitter,  href: "https://twitter.com",  label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
];

const NAV = [
  { key: "nav.services",  href: "#services"  },
  { key: "nav.portfolio", href: "#portfolio" },
  { key: "nav.about",     href: "#about"     },
  { key: "nav.contact",   href: "#contact"   },
] as const;

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.05] py-14 px-5 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-blue-500 flex items-center justify-center shadow-lg shadow-blue-700/25 flex-shrink-0">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="text-white">
                  <path d="M7 1L13 4V10L7 13L1 10V4L7 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                </svg>
              </span>
              <span className="font-bold text-[17px] tracking-tight text-white">
                emir<span className="text-blue-400">.</span>dev
              </span>
            </a>
            <p className="text-[#4E6E94] text-sm leading-relaxed max-w-[200px]">{t("footer.tagline")}</p>
            <div className="flex items-center gap-2">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-[#4E6E94] hover:text-blue-400 hover:border-blue-700/30 hover:bg-blue-900/15 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-[#4E6E94] mb-4">{t("footer.links_label")}</p>
            <ul className="space-y-2.5">
              {NAV.map(({ key, href }) => (
                <li key={href}>
                  <a href={href} className="text-[#4E6E94] hover:text-blue-400 text-sm transition-colors duration-200">
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-[#4E6E94] mb-4">{t("contact.tag")}</p>
            <a href="mailto:emir@example.com" className="text-[#4E6E94] hover:text-blue-400 text-sm transition-colors block mb-2">
              emir@example.com
            </a>
            <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors mt-3">
              {t("nav.cta")} →
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#1F3654] text-xs">© {year} Emir Kaya. {t("footer.rights")}</p>
          <p className="text-[#1F3654] text-xs">{t("footer.built_with")}</p>
        </div>
      </div>
    </footer>
  );
}
