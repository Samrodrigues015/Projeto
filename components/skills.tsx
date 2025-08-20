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
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {t("skills.title")}
          </h2>
          <div className="w-20 h-1 bg-violet-400 mx-auto mb-6"></div>
          <p className="text-zinc-300 max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="bg-zinc-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-6 text-center text-violet-400">
                {category.name}
              </h3>
              <motion.div
                variants={container}
                initial="hidden"
                animate={inView ? "show" : "hidden"}
                className="space-y-4"
              >
                {skills
                  .filter((skill) => skill.category === category.id)
                  .map((skill, index) => (
                    <motion.div key={index} variants={item}>
                      <div className="flex justify-between mb-1">
                        <span className="text-zinc-300">{skill.name}</span>
                        <span className="text-zinc-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={
                            inView ? { width: `${skill.level}%` } : { width: 0 }
                          }
                          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                          className="bg-violet-400 h-2 rounded-full"
                        ></motion.div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
