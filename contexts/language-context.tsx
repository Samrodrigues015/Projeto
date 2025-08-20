"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

type Language = "en" | "pt";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",

    // Hero
    "hero.title": "Hi, I'm",
    "hero.role": "Full Stack Developer",

    // About
    "about.title": "About Me",
    "about.role": "Full Stack Developer",
    "about.description1":
      "I'm a passionate Full Stack Developer with expertise in building modern web applications. With a strong foundation in both frontend and backend technologies, I create seamless, user-friendly experiences that solve real-world problems.",
    "about.description2":
      "My journey in software development has equipped me with a diverse skill set and the ability to adapt to new technologies quickly. I'm committed to writing clean, maintainable code and constantly improving my craft.",
    "about.name": "Name:",
    "about.email": "Email:",
    "about.location": "Location:",
    "about.phone": "Phone:", // Changed from "about.availability"

    // Projects
    "projects.title": "My Projects",
    "projects.subtitle":
      "Here are some of my recent projects. Each one represents a unique challenge and learning experience.",
    "projects.code": "Code",
    "projects.demo": "Demo",

    // Skills
    "skills.title": "My Skills",
    "skills.subtitle":
      "Here's a breakdown of my technical skills and proficiency levels.",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Tools & DevOps",

    // Contact
    "contact.title": "Get In Touch",
    "contact.subtitle":
      "Have a project in mind or want to collaborate? Feel free to reach out!",
    "contact.info": "Contact Information",
    "contact.location": "Location",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.message": "Send Me a Message",
    "contact.yourName": "Your Name",
    "contact.yourEmail": "Your Email",
    "contact.subject": "Subject",
    "contact.yourMessage": "Your Message",
    "contact.sending": "Sending...",
    "contact.send": "Send Message",
    "contact.success":
      "Thank you for your message! I'll get back to you as soon as possible.",

    // Footer
    "footer.rights": "All rights reserved.",
  },
  pt: {
    // Header
    "nav.home": "Início",
    "nav.about": "Sobre",
    "nav.projects": "Projetos",
    "nav.skills": "Habilidades",
    "nav.contact": "Contato",

    // Hero
    "hero.title": "Olá, eu sou",
    "hero.role": "Desenvolvedora Full Stack",

    // About
    "about.title": "Sobre Mim",
    "about.role": "Desenvolvedora Full Stack",
    "about.description1":
      "Sou uma Desenvolvedoraa Full Stack apaixonada com experiência na construção de aplicações web modernas. Com uma base sólida em tecnologias frontend e backend, crio experiências intuitivas e amigáveis que resolvem problemas reais.",
    "about.description2":
      "Minha jornada no desenvolvimento de software me equipou com um conjunto diversificado de habilidades e a capacidade de me adaptar rapidamente a novas tecnologias. Estou comprometido em escrever código limpo e manutenível, e em melhorar constantemente minhas habilidades.",
    "about.name": "Nome:",
    "about.email": "Email:",
    "about.location": "Localização:",
    "about.phone": "Telefone:", // Changed from "about.availability"

    // Projects
    "projects.title": "Meus Projetos",
    "projects.subtitle":
      "Aqui estão alguns dos meus projetos recentes. Cada um representa um desafio único e uma experiência de aprendizado.",
    "projects.code": "Código",
    "projects.demo": "Demo",

    // Skills
    "skills.title": "Minhas Habilidades",
    "skills.subtitle":
      "Aqui está um resumo das minhas habilidades técnicas e níveis de proficiência.",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Ferramentas & DevOps",

    // Contact
    "contact.title": "Entre em Contato",
    "contact.subtitle":
      "Tem um projeto em mente ou quer colaborar? Sinta-se à vontade para entrar em contato!",
    "contact.info": "Informações de Contato",
    "contact.location": "Localização",
    "contact.email": "Email",
    "contact.phone": "Telefone",
    "contact.message": "Envie-me uma Mensagem",
    "contact.yourName": "Seu Nome",
    "contact.yourEmail": "Seu Email",
    "contact.subject": "Assunto",
    "contact.yourMessage": "Sua Mensagem",
    "contact.sending": "Enviando...",
    "contact.send": "Enviar Mensagem",
    "contact.success":
      "Obrigado pela sua mensagem! Entrarei em contato o mais breve possível.",

    // Footer
    "footer.rights": "Todos os direitos reservados.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  // Initialize language from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  // Translation function
  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
