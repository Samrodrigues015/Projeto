"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
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
    }, 90);

    return () => clearInterval(typingInterval);
  }, [fullText, language]);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center bg-black"
    >
      <Header />
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black"></div>
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/10 via-black/80 to-black"></div>
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-white tracking-tight drop-shadow-lg font-serif">
            {t("hero.title")}{" "}
            <span
              className="font-black"
              style={{
                color: "#fff",
                textShadow: "none",
                letterSpacing: "2px",
              }}
            >
              Samara!
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl mb-10 text-zinc-100 font-light italic font-serif">
            <span className="border-r-4 border-yellow-400 pr-2 animate-pulse text-yellow-300">
              {typedText}
            </span>
          </h2>

          <div className="flex justify-center space-x-8 mb-16">
            <motion.a
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 10px #FFD70080",
              }}
              href="https://github.com/Samrodrigues015"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-tr from-zinc-900 via-black to-zinc-800 border-2 border-yellow-500 hover:border-yellow-400 transition-all duration-200 px-7 py-4 rounded-full shadow-lg flex items-center gap-2 text-yellow-300 font-semibold text-lg tracking-wide hover:bg-yellow-500/10"
              style={{
                backdropFilter: "blur(2px)",
              }}
            >
              <Github className="w-6 h-6 group-hover:text-yellow-400 transition-colors duration-200" />
              <span className="hidden sm:inline">GitHub</span>
            </motion.a>
            <motion.a
              whileHover={{
                scale: 1.06,
                boxShadow: "0 0 10px #FFD70080",
              }}
              href="https://www.linkedin.com/in/samara-rodrigues015/"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-tr from-zinc-900 via-black to-zinc-800 border-2 border-yellow-500 hover:border-yellow-400 transition-all duration-200 px-7 py-4 rounded-full shadow-lg flex items-center gap-2 text-yellow-300 font-semibold text-lg tracking-wide hover:bg-yellow-500/10"
              style={{
                backdropFilter: "blur(2px)",
              }}
            >
              <Linkedin className="w-6 h-6 group-hover:text-yellow-400 transition-colors duration-200" />
              <span className="hidden sm:inline">LinkedIn</span>
            </motion.a>
          </div>

          <motion.a
            href="#about"
            className="inline-block"
            animate={{ y: [0, 18, 0] }}
            transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
          >
            <ArrowDown
              className="w-10 h-10 text-yellow-400"
              style={{
                filter: "drop-shadow(0 0 8px #FFD700)",
              }}
            />
            <span className="sr-only">Scroll down</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
