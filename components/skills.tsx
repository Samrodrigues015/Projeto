"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/contexts/language-context";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "tools";
}

export default function Skills() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills: Skill[] = [
    { name: "HTML/CSS", level: 90, category: "frontend" },
    { name: "JavaScript", level: 65, category: "frontend" },
    { name: "React", level: 30, category: "frontend" },
    { name: "WordPress", level: 75, category: "frontend" },
    { name: "PHP", level: 65, category: "backend" },
    { name: "Java", level: 45, category: "backend" },
    { name: "Node.js", level: 40, category: "backend" },
    { name: "MySQL", level: 20, category: "backend" },
    { name: "Git", level: 85, category: "tools" },
    { name: "Jira", level: 60, category: "tools" },
  ];

  const categories = [
    { id: "frontend", name: t("skills.frontend") },
    { id: "backend", name: t("skills.backend") },
    { id: "tools", name: t("skills.tools") },
  ];

  // Elegância: cards com gradiente sutil, barras com efeito glass e brilho discreto, fontes serifadas
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white font-serif">
            {t("skills.title")}
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6 rounded-full shadow-yellow-400 shadow-md"></div>
          <p className="text-zinc-300 max-w-2xl mx-auto font-light">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-gradient-to-br from-zinc-900 via-black to-zinc-800/80 rounded-2xl p-8 border border-yellow-900 shadow-2xl backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold mb-6 text-center text-yellow-400 font-serif tracking-wide uppercase letter-spacing-wider">
                {category.name}
              </h3>
              <motion.div
                variants={container}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="space-y-7"
              >
                {skills
                  .filter((skill) => skill.category === category.id)
                  .map((skill, index) => (
                    <motion.div key={index} variants={item}>
                      <div className="flex justify-between mb-1">
                        <span className="text-zinc-100 font-serif">
                          {skill.name}
                        </span>
                        <span className="text-yellow-300 font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-zinc-800/70 rounded-full h-4 relative overflow-hidden shadow-inner border border-yellow-900">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={
                            inView ? { width: `${skill.level}%` } : { width: 0 }
                          }
                          transition={{
                            duration: 1.2,
                            delay: 0.2 + index * 0.1,
                          }}
                          className="h-4 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-300 shadow-[0_0_8px_#FFD70080] relative"
                        >
                          {/* Brilho discreto no final da barra */}
                          <motion.span
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={
                              inView
                                ? {
                                    opacity: [0, 0.7, 0.4, 0.7, 0],
                                    scale: [0.7, 1.05, 0.95, 1.1, 0.7],
                                  }
                                : { opacity: 0, scale: 0.7 }
                            }
                            transition={{
                              repeat: Infinity,
                              duration: 2.2,
                              delay: 1 + index * 0.1,
                            }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-yellow-200 blur-[2px] shadow-[0_0_10px_#FFD700] pointer-events-none"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
