"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { EMAIL } from "./hero";

const PHONE = "+351 913 963 455";

/*
  O formulário anterior simulava o envio e não entregava nenhuma mensagem.
  Em vez de um formulário falso, os contactos ficam visíveis, com um botão
  para copiar (útil para quem não tem cliente de email configurado).
*/
export default function Contact() {
  const { t } = useLanguage();

  const rows = [
    { label: t("contact.email"), value: EMAIL, href: `mailto:${EMAIL}`, copy: true },
    { label: t("contact.phone"), value: PHONE, href: `tel:${PHONE.replace(/\s/g, "")}`, copy: true },
    { label: "LinkedIn", value: "samara-rodrigues015", href: "https://www.linkedin.com/in/samara-rodrigues015/" },
    { label: "GitHub", value: "Samrodrigues015", href: "https://github.com/Samrodrigues015" },
  ];

  return (
    <section id="contacto" className="container scroll-mt-20 border-t border-rule py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-[.8fr_1fr] md:gap-16">
        <div>
          <h2 className="mb-2.5 font-display text-[clamp(1.8rem,3.4vw,2.5rem)] font-semibold leading-tight tracking-[-0.035em]">
            {t("contact.title")}
          </h2>
          <p className="max-w-[40ch] text-grey">{t("contact.subtitle")}</p>
        </div>

        <dl className="divide-y divide-rule border-y border-rule">
          {rows.map((r) => (
            <div key={r.label} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-4">
              <dt className="w-24 text-[14px] text-grey">{r.label}</dt>
              <dd className="flex min-w-0 flex-1 items-center justify-between gap-4">
                <a
                  href={r.href}
                  {...(r.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="min-w-0 break-words underline decoration-pink-300 decoration-[1.5px] underline-offset-4 transition-colors hover:decoration-pink-500"
                >
                  {r.value}
                </a>
                {r.copy && <CopyButton value={r.value} />}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function CopyButton({ value }: { value: string }) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* sem permissão de clipboard: o texto continua visível para copiar à mão */
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="flex-none rounded-md border border-rule px-2.5 py-1 text-[13px] text-grey transition-colors hover:border-pink-300 hover:text-ink"
    >
      <span aria-live="polite">{copied ? t("contact.copied") : t("contact.copy")}</span>
    </button>
  );
}
