"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="sobre" className="scroll-mt-16 bg-tint-about">
      <div className="container py-16 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-[.8fr_1fr] md:gap-16">
          <div className="relative aspect-[4/5] w-full max-w-[460px] overflow-hidden rounded-[22px] bg-soft">
            <Image
              src="/samara-sobre.webp"
              alt={t("about.photoAlt")}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="mb-5 font-display text-[clamp(1.8rem,3.4vw,2.5rem)] font-semibold leading-tight tracking-[-0.035em]">
              {t("about.title")}
            </h2>
            <p className="mb-4 max-w-[54ch]">{t("about.p1")}</p>
            <p className="max-w-[54ch]">{t("about.p2")}</p>

            <dl className="mt-7 grid gap-x-6 gap-y-4 border-t border-rule pt-5 text-[15px] sm:grid-cols-2">
              <div>
                <dt className="text-[13px] text-grey">{t("about.now")}</dt>
                <dd>{t("about.nowValue")}</dd>
              </div>
              <div>
                <dt className="text-[13px] text-grey">{t("about.where")}</dt>
                <dd>{t("about.whereValue")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
