"use client";

import { useId, useState, type PointerEvent, type ReactNode } from "react";
import Image from "next/image";
import { projects, type Project } from "@/lib/projects";
import { useLanguage } from "@/contexts/language-context";

/*
  Grelha de 5 colunas: cartões "wide" ocupam 3, "narrow" ocupam 2, e um
  cartão que fique sozinho na última linha ocupa a largura toda. Assim a
  grelha alterna larguras em vez de repetir cartões iguais.
*/
function spanFor(p: Project, i: number, all: Project[]) {
  const isLastAlone = i === all.length - 1 && i % 2 === 0;
  if (isLastAlone) return "md:col-span-5";
  return p.size === "wide" ? "md:col-span-3" : "md:col-span-2";
}

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projetos" className="scroll-mt-16 bg-tint-projects">
      <div className="container py-16 md:py-24">
        <h2 className="mb-2.5 font-display text-[clamp(1.8rem,3.4vw,2.5rem)] font-semibold leading-tight tracking-[-0.035em]">
          {t("projects.title")}
        </h2>
        <p className="mb-9 max-w-[56ch] text-grey">{t("projects.subtitle")}</p>

        <div className="grid gap-4 md:grid-cols-5">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              className={spanFor(p, i, projects)}
              fullWidth={spanFor(p, i, projects) === "md:col-span-5"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project: p,
  className,
  fullWidth,
}: {
  project: Project;
  className: string;
  fullWidth: boolean;
}) {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const caseId = useId();

  // Posição do cursor para o brilho rosa (CSS custom properties, sem re-render).
  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      onPointerMove={onMove}
      className={`group relative isolate flex flex-col overflow-hidden rounded-2xl border border-rule bg-paper p-5 transition duration-300 hover:-translate-y-0.5 hover:border-pink-300 sm:p-6 ${className}
        before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100
        before:bg-[radial-gradient(280px_circle_at_var(--mx,50%)_var(--my,50%),hsl(var(--pink-50)),transparent_70%)]`}
    >
      <div className={fullWidth && p.image ? "grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-start" : "flex flex-1 flex-col"}>
        {p.image && (
          <div className="relative mb-5 aspect-[16/9] overflow-hidden rounded-[10px] border border-rule bg-soft">
            <Image
              src={p.image.src}
              alt={p.image.alt[language]}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover object-top"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col">
          <p className="mb-1.5 text-[13px] text-grey">{p.context[language]}</p>
          <h3 translate="no" className="mb-2 font-display text-[1.4rem] font-semibold leading-tight tracking-[-0.025em]">
            {p.name}
          </h3>
          {/* Sem imagem, o resumo ganha tamanho e ocupa o espaço com conteúdo */}
          <p
            className={
              p.image
                ? "text-grey"
                : "max-w-[30ch] font-display text-[clamp(1.2rem,1.9vw,1.45rem)] font-medium leading-snug tracking-[-0.01em]"
            }
          >
            {p.summary[language]}
          </p>
          {!p.image && <p className="mt-4 max-w-[46ch] text-grey">{p.problem[language]}</p>}

          <div className="mt-auto" />
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tecnologias">
            {p.tech.map((tech) => (
              <li key={tech} className="rounded-md border border-rule bg-soft px-2 py-0.5 text-[13px]">
                {tech}
              </li>
            ))}
          </ul>

          {/* Caso completo: abre com uma transição de altura (grid-rows 0fr → 1fr) */}
          <div
            id={caseId}
            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
              open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden" inert={!open}>
              <dl className="mt-5 grid gap-4 border-t border-rule pt-5 text-[15.5px]">
                {(
                  [
                    ["projects.problem", p.problem],
                    ["projects.work", p.work],
                    ["projects.result", p.result],
                  ] as const
                ).map(([label, text]) => (
                  <div key={label}>
                    <dt className="mb-1 text-[13px] font-semibold">{t(label)}</dt>
                    <dd className="text-grey">{text[language]}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-[15px]">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={caseId}
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-pink-700"
            >
              {open ? t("projects.close") : t("projects.open")}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                aria-hidden="true"
                className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}
              >
                <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
            {p.links.demo && <ExtLink href={p.links.demo}>{t("projects.demo")}</ExtLink>}
            {p.links.original && <ExtLink href={p.links.original}>{t("projects.original")}</ExtLink>}
            {p.links.code && <ExtLink href={p.links.code}>{t("projects.code")}</ExtLink>}
          </div>
        </div>
      </div>
    </article>
  );
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-pink-700 underline decoration-pink-300 decoration-[1.5px] underline-offset-4 transition-colors hover:decoration-pink-500"
    >
      {children}
    </a>
  );
}
