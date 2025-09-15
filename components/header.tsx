"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const Header = () => {
  const { t, language, setLanguage } = useLanguage();

  const navItems = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.skills"), href: "#skills" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Novo botão elegante para troca de idioma
  const LanguageButton = ({ lang, label }: { lang: string; label: string }) => (
    <button
      onClick={() => setLanguage(lang)}
      className={`mx-1 px-4 py-2 rounded-full border-2 font-semibold text-sm transition-all duration-200
        ${
          language === lang
            ? "bg-yellow-500 text-black border-yellow-500 shadow-lg"
            : "bg-black border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black"
        }
      `}
      style={{
        fontFamily: "serif",
        letterSpacing: "1px",
      }}
      aria-current={language === lang ? "page" : undefined}
    >
      {label}
    </button>
  );

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-zinc-900/90 backdrop-blur-md py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="#home"
          className="text-2xl font-serif font-extrabold tracking-widest transition-colors"
          style={{
            letterSpacing: "3px",
            textShadow: "0 1px 8px #FFD70030",
          }}
        >
          <span className="text-yellow-400 font-black">Samara</span>
          <span className="text-white font-light ml-1">Rodrigues</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative px-4 py-2 text-zinc-200 font-medium transition-colors duration-200
                before:absolute before:inset-0 before:rounded-full before:scale-95 before:bg-gradient-to-r before:from-yellow-500/10 before:to-yellow-400/10 before:opacity-0 hover:before:opacity-100
                hover:text-yellow-400 focus:text-yellow-400"
              style={{ overflow: "hidden" }}
            >
              {item.name}
            </Link>
          ))}
          {/* Botões de idioma no estilo Hero */}
          <div className="flex items-center ml-4">
            <LanguageButton lang="pt" label="PT" />
            <LanguageButton lang="en" label="EN" />
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-zinc-300 hover:text-yellow-400 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zinc-900/95 shadow-lg border-t border-yellow-900">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-3 rounded-full text-zinc-200 font-medium transition-colors duration-200
                  before:absolute before:inset-0 before:rounded-full before:scale-95 before:bg-gradient-to-r before:from-yellow-500/10 before:to-yellow-400/10 before:opacity-0 hover:before:opacity-100
                  hover:text-yellow-400 focus:text-yellow-400"
                style={{ overflow: "hidden" }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Botões de idioma no estilo Hero */}
            <div className="flex items-center pt-2">
              <LanguageButton lang="pt" label="PT" />
              <LanguageButton lang="en" label="EN" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
