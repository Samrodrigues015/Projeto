"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link
              href="#home"
              className="text-2xl font-serif font-extrabold tracking-widest text-white hover:text-yellow-400 transition-colors"
              style={{
                letterSpacing: "3px",
                textShadow: "0 1px 8px #FFD70030",
              }}
            >
              <span className="text-yellow-400 font-black">Samara</span>
              <span className="text-white font-light ml-1">Rodrigues</span>
            </Link>
            <p className="text-zinc-400 mt-2">{t("hero.role")}</p>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://github.com/Samrodrigues015"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors duration-200 p-3 rounded-full shadow-lg text-yellow-400 flex items-center"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/samara-rodrigues015/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black transition-colors duration-200 p-3 rounded-full shadow-lg text-yellow-400 flex items-center"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-6 pt-6 text-center text-zinc-400 text-sm">
          <p>
            &copy; {currentYear} Samara Rodrigues. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
