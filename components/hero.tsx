"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
import Header from "./header";
import { useLanguage } from "@/contexts/language-context";

export default function Hero() {
  const { t, language } = useLanguage();
  const [typedText, setTypedText] = useState("");
  const fullText = t("hero.role");

  useEffect(() => {
    let currentIndex = 0;
    setTypedText("");

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [fullText, language]);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center"
    >
      <Header />
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-zinc-900/60 to-zinc-900"></div>
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-900/60 to-zinc-900"></div>
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {t("hero.title")} <span className="text-violet-400">Samara!</span>
          </h1>
          <h2 className="text-xl md:text-2xl mb-8 text-zinc-300">
            <span className="border-r-2 border-violet-400 pr-1">
              {typedText}
            </span>
          </h2>

          <div className="flex justify-center space-x-4 mb-12">
            <a
              href="https://github.com/Samrodrigues015"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-full transition-colors"
            >
              <Github className="w-5 h-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/samara-rodrigues015/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-800 hover:bg-zinc-700 p-3 rounded-full transition-colors"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>

          <a href="#about" className="inline-block animate-bounce">
            <ArrowDown className="w-6 h-6 text-violet-400" />
            <span className="sr-only">Scroll down</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
