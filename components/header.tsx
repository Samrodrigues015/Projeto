"use client";

import { useEffect, useState } from "react";
import { useLanguage, type Language } from "@/contexts/language-context";

export default function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  // Só mostra a linha de separação depois de começar o scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#projetos", label: t("nav.projects") },
    { href: "#sobre", label: t("nav.about") },
    { href: "#contacto", label: t("nav.contact") },
  ];

  return (
    <>
    <a
      href="#conteudo"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
    >
      {t("skip")}
    </a>
    <header
      className={`sticky top-0 z-40 bg-paper/90 backdrop-blur-sm transition-[border-color] duration-300 border-b ${
        scrolled ? "border-rule" : "border-transparent"
      }`}
    >
      <div className="container flex items-center justify-between gap-4 py-4">
        <a
          href="#topo"
          className="font-display text-lg font-semibold tracking-tight"
        >
          Samara Rodrigues
        </a>

        <nav aria-label="Principal" className="flex items-center gap-4 sm:gap-7">
          <ul className="hidden items-center gap-7 text-[15px] sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-grey transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            role="group"
            aria-label={t("nav.language")}
            className="flex rounded-full border border-rule p-0.5 text-[13px]"
          >
            {(["pt", "en"] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                aria-pressed={language === lang}
                className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
                  language === lang
                    ? "bg-ink text-paper"
                    : "text-grey hover:text-ink"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
    </>
  );
}
