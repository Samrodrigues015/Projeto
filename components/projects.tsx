"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo?: string;
}

export default function Projects() {
  const { t, language } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    setTimeout(() => {
      setProjects([
        {
          id: 1,
          name: language === "en" ? "Multitech Theme" : "Tema Multitech",
          description:
            language === "en"
              ? "A custom WordPress theme developed with PHP, HTML, CSS and JavaScript. Responsive, optimized for SEO and easy to customize."
              : "Um tema personalizado para WordPress, desenvolvido com PHP, HTML, CSS e JavaScript. Responsivo, otimizado para SEO e fácil de personalizar.",
          image: "/multitech.png?height=300&width=500",
          technologies: ["PHP", "JavaScript", "HTML", "CSS"],
          github: "https://github.com/Samrodrigues015/ProjetoMultimac.git",
          demo: "https://multitech-portifolio.netlify.app/",
        },
        {
          id: 2,
          name: language === "en" ? "DualTech Theme" : "Tema DualTech",
          description:
            language === "en"
              ? "A modern and responsive WordPress theme created for DualTech, using PHP, HTML, CSS and JavaScript. Built with a clean structure and focus on performance."
              : "Um tema moderno e responsivo para WordPress, criado para a DualTech com PHP, HTML, CSS e JavaScript. Construído com estrutura limpa e foco em performance.",
          image: "/dualtech.png?height=300&width=500",
          technologies: ["PHP", "JavaScript", "HTML", "CSS"],
          github: "https://github.com/Samrodrigues015/Dualinfor.git",
          demo: "https://dualtech.netlify.app/",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, [language]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white font-serif tracking-wide">
            {t("projects.title")}
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mb-6 rounded-full shadow-yellow-400 shadow-md"></div>
          <p className="text-zinc-300 max-w-2xl mx-auto font-light">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={item}
                className="bg-zinc-900/80 rounded-xl overflow-hidden border-2 border-yellow-700 shadow-lg hover:shadow-yellow-400/20 transition-shadow"
              >
                <div className="relative h-48 border-b-2 border-yellow-900">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-yellow-400 font-serif tracking-wide">
                    {project.name}
                  </h3>
                  <p className="text-zinc-200 mb-4 font-light">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="text-xs bg-black/60 text-yellow-300 px-2 py-1 rounded border border-yellow-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-yellow-300 hover:text-yellow-400 transition-colors font-medium"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      {t("projects.code")}
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-yellow-300 hover:text-yellow-400 transition-colors font-medium"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        {t("projects.demo")}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
