"use client";

import { useLanguage } from "@/contexts/language-context";

/*
  Substitui as antigas barras de percentagem. Em vez de um número inventado
  ("React 30%"), cada grupo diz onde uso aquelas ferramentas — é isso que um
  recrutador quer saber.
*/
const groups = [
  {
    title: "stack.daily",
    note: "stack.dailyNote",
    items: ["C#", "ASP.NET WebForms", "SQL Server", "JavaScript", "jQuery", "Git"],
  },
  {
    title: "stack.web",
    note: "stack.webNote",
    items: ["WordPress", "PHP", "HTML e CSS", "Python", "Flask", "MongoDB"],
  },
  {
    title: "stack.learning",
    note: "stack.learningNote",
    items: [".NET 10", "xUnit", "Injeção de dependências", "Ollama", "Next.js"],
  },
];

export default function Skills() {
  const { t, language } = useLanguage();
  const label = (s: string) =>
    language === "en" && s === "Injeção de dependências"
      ? "Dependency injection"
      : language === "en" && s === "HTML e CSS"
        ? "HTML & CSS"
        : s;

  return (
    <section id="stack" className="container scroll-mt-20 border-t border-rule py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-[.8fr_1fr] md:gap-16">
        <div>
          <h2 className="mb-2.5 font-display text-[clamp(1.8rem,3.4vw,2.5rem)] font-semibold leading-tight tracking-[-0.035em]">
            {t("stack.title")}
          </h2>
          <p className="max-w-[40ch] text-grey">{t("stack.subtitle")}</p>
        </div>

        <div className="divide-y divide-rule">
          {groups.map((g) => (
            <div key={g.title} className="grid gap-3 py-5 first:pt-0 sm:grid-cols-[180px_1fr] sm:gap-6">
              <div>
                <h3 className="font-semibold">{t(g.title)}</h3>
                <p className="text-[14px] text-grey">{t(g.note)}</p>
              </div>
              <ul className="flex flex-wrap content-start gap-1.5">
                {g.items.map((item) => (
                  <li key={item} className="rounded-md border border-rule bg-soft px-2.5 py-1 text-[14px]">
                    {label(item)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
