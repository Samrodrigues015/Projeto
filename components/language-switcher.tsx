"use client";

import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("en")}
        className={`${
          language === "en"
            ? "bg-violet-500 hover:bg-violet-600"
            : "text-zinc-300 hover:text-violet-400"
        } px-3 py-1 h-8`}
      >
        EN
      </Button>
      <Button
        variant={language === "pt" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("pt")}
        className={`${
          language === "pt"
            ? "bg-violet-500 hover:bg-violet-600"
            : "text-zinc-300 hover:text-violet-400"
        } px-3 py-1 h-8`}
      >
        PT
      </Button>
    </div>
  );
}
