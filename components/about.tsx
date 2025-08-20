"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

export default function About() {
  const { t } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {t("about.title")}
          </h2>
          <div className="w-20 h-1 bg-violet-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[500px] rounded-lg overflow-hidden"
          >
            <Image
              src="/foto2.jpg"
              alt="Samara Rodrigues"
              fill
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-violet-400">
              {t("about.role")}
            </h3>
            <p className="text-zinc-300 mb-6">{t("about.description1")}</p>
            <p className="text-zinc-300 mb-6">{t("about.description2")}</p>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 text-zinc-300">
              <div>
                <p>
                  <strong className="text-violet-400">{t("about.name")}</strong>{" "}
                  Samara Rodrigues
                </p>
                <p>
                  <strong className="text-violet-400">
                    {t("about.email")}
                  </strong>{" "}
                  samararodrigues2000@icloud.com
                </p>
              </div>
              <div>
                <p>
                  <strong className="text-violet-400">
                    {t("about.location")}
                  </strong>{" "}
                  Porto - Portugal
                </p>
                <p>
                  <strong className="text-violet-400">
                    {t("about.phone")}
                  </strong>{" "}
                  +351 913 963 455
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
