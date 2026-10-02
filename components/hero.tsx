"use client";

import Image from "next/image";
import SatinCanvas from "./satin-canvas";
import { useLanguage } from "@/contexts/language-context";

export const EMAIL = "samararodrigues2000@icloud.com";

/*
  O cetim rosa é o fundo do topo inteiro; a foto e o texto ficam por cima.
  A imagem estática (satin-poster.webp) fica sempre por baixo do canvas, por
  isso o topo tem o mesmo aspeto sem WebGL ou com "reduzir movimento".
*/
export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="topo"
      aria-labelledby="hero-title"
      className="relative mx-2 overflow-hidden rounded-[28px] bg-pink-100 bg-[url('/satin-poster.webp')] bg-cover bg-center sm:mx-4"
    >
      <SatinCanvas pauseLabel={t("hero.pause")} playLabel={t("hero.play")} />

      <div className="container relative z-10 grid items-center gap-8 py-10 md:grid-cols-[.8fr_1.2fr] md:gap-16 md:py-24">
        <div className="relative aspect-[4/5] w-full max-w-[240px] overflow-hidden rounded-[18px] shadow-[0_30px_60px_-30px_rgba(120,30,70,.55),0_0_0_6px_rgba(255,255,255,.55)] md:max-w-[420px]">
          <Image
            src="/samara.webp"
            alt={t("hero.photoAlt")}
            fill
            priority
            sizes="(min-width: 768px) 35vw, 240px"
            className="object-cover"
          />
        </div>

        <div>
          <h1
            id="hero-title"
            className="mb-5 text-balance font-display text-[clamp(2.4rem,5vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.035em]"
          >
            {t("hero.title")}
          </h1>

          <p className="mb-8 max-w-[46ch] text-[clamp(1.05rem,1.6vw,1.2rem)] text-ink/75">
            {t("hero.lede.before")}{" "}
            <span translate="no" className="font-medium text-ink">
              xopvision
            </span>
            {t("hero.lede.after")}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#projetos"
              className="inline-flex items-center rounded-[10px] bg-ink px-5 py-3 font-medium text-paper transition hover:-translate-y-px hover:bg-ink/90"
            >
              {t("hero.cta")}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="border-b-[1.5px] border-ink/30 pb-0.5 transition-colors hover:border-ink"
            >
              {t("hero.email")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
