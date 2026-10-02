"use client";

import { useLanguage } from "@/contexts/language-context";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="container flex flex-wrap justify-between gap-2 border-t border-rule py-8 text-[14px] text-grey">
      <p suppressHydrationWarning>© {new Date().getFullYear()} Samara Rodrigues</p>
      <p>{t("footer.note")}</p>
    </footer>
  );
}
