"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Language = "pt" | "en";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Textos da interface. Os projetos têm os seus próprios textos em lib/projects.ts.
const translations: Record<Language, Record<string, string>> = {
  pt: {
    "nav.projects": "Projetos",
    "nav.about": "Sobre",
    "nav.contact": "Contacto",
    "nav.language": "Idioma",

    "hero.title": "Desenvolvo aplicações web com C# e .NET, do servidor à interface.",
    "hero.lede.before": "Sou programadora na MicLearning, onde integro a equipa do",
    "hero.lede.after":
      ", uma plataforma de bilhética. Nos projetos pessoais, aprofundo arquitetura de software e testes automatizados.",
    "hero.cta": "Ver projetos",
    "hero.email": "Enviar email",
    "hero.pause": "Pausar animação",
    "hero.play": "Retomar animação",
    "skip": "Saltar para o conteúdo",

    "projects.title": "Projetos selecionados",
    "projects.subtitle":
      "Em cada projeto explico o problema, o que fiz e o resultado.",
    "projects.problem": "Problema",
    "projects.work": "O que fiz",
    "projects.result": "Resultado",
    "projects.open": "Ler o caso",
    "projects.close": "Fechar o caso",
    "projects.code": "Código",
    "projects.demo": "Ver demo",
    "projects.original": "Site original",

    "about.title": "Sobre mim",
    "about.p1":
      "Comecei pelo front-end, com WordPress, PHP e JavaScript, e fui aprofundando o lado do servidor. Hoje trabalho sobretudo em C# e ASP.NET, com SQL Server, em sistemas de venda de bilhetes que têm de responder bem em dias de muita procura.",
    "about.p2":
      "Antes, fiz um estágio de nove meses na Multimac, onde coordenei uma equipa de estagiários em projetos internos. Gosto de compreender um sistema antes de o alterar e de deixar o código mais claro do que o encontrei.",
    "about.where": "Onde estou",
    "about.whereValue": "Vila Nova de Gaia, Porto",
    "about.now": "Onde trabalho",
    "about.nowValue": "MicLearning, equipa do xopvision",
    "about.photoAlt": "Samara Rodrigues, sentada, de casaco verde-claro",
    "hero.photoAlt": "Samara Rodrigues, com o queixo apoiado na mão",

    "stack.title": "Com que trabalho",
    "stack.subtitle": "As ferramentas que uso, e onde as uso.",
    "stack.daily": "No dia a dia",
    "stack.dailyNote": "No trabalho, em sistemas de bilhética e backoffice",
    "stack.web": "Web e clientes",
    "stack.webNote": "Em projetos freelance e no estágio",
    "stack.learning": "Em aprendizagem",
    "stack.learningNote": "No PersonalAssistant e noutros projetos pessoais",

    "contact.title": "Contacto",
    "contact.subtitle":
      "Estou disponível para conversar sobre oportunidades em .NET e desenvolvimento web.",
    "contact.email": "Email",
    "contact.phone": "Telefone",
    "contact.copy": "Copiar",
    "contact.copied": "Copiado",

    "footer.note": "Desenhado e desenvolvido por mim, em Next.js.",

    // Chaves antigas, ainda usadas pelas secções por migrar.
    "nav.home": "Início",
    "nav.skills": "Habilidades",
    "hero.role": "Desenvolvedora Front-end",
    "about.role": "Desenvolvedora Web Front-end",
    "about.description1": "Sou Desenvolvedora Web Front-end Júnior com experiência em projetos reais, desde sites responsivos até aplicações completas. Tenho uma base sólida em JavaScript, Node.js, PHP e Java, além de domínio em metodologias ágeis como Scrum e Kanban.",
    "about.description2": "Atualmente, atuo como freelancer no desenvolvimento de sites personalizados e em projetos focados em front-end e UI/UX, utilizando WordPress, HTML, CSS, PHP e JavaScript. Durante os 9 meses de estágio na Multimac Hito Innovation, liderei uma equipe de estagiários em iniciativas internas, participando de todo o ciclo de desenvolvimento.",
    "about.description3": "Sou apaixonada por tecnologia e por criar soluções que unam design, performance e experiência do usuário. Busco sempre aprender novas ferramentas, colaborar em equipe e transformar ideias em produtos digitais que gerem impacto real.",
    "about.name": "Nome:",
    "about.email": "Email:",
    "about.location": "Localização:",
    "about.phone": "Telefone:",
    "skills.title": "Minhas Habilidades",
    "skills.subtitle": "Aqui está um resumo das minhas habilidades técnicas e níveis de proficiência.",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Ferramentas & DevOps",
    "contact.info": "Informações de contacto",
    "contact.location": "Localização",
    "contact.message": "Envie-me uma Mensagem",
    "contact.yourName": "Seu Nome",
    "contact.yourEmail": "Seu Email",
    "contact.subject": "Assunto",
    "contact.yourMessage": "Sua Mensagem",
    "contact.sending": "Enviando...",
    "contact.send": "Enviar Mensagem",
    "contact.success": "Obrigado pela sua mensagem! Entrarei em contacto o mais breve possível.",
    "footer.rights": "Todos os direitos reservados.",
  },
  en: {
    "nav.projects": "Projects",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.language": "Language",

    "hero.title": "I build web applications with C# and .NET, from the server to the interface.",
    "hero.lede.before": "I'm a developer at MicLearning, where I'm part of the",
    "hero.lede.after":
      " team, a ticketing platform. In my own projects, I go deeper into software architecture and automated testing.",
    "hero.cta": "See projects",
    "hero.email": "Send an email",
    "hero.pause": "Pause animation",
    "hero.play": "Play animation",
    "skip": "Skip to content",

    "projects.title": "Selected projects",
    "projects.subtitle":
      "For each project I explain the problem, what I did and the result.",
    "projects.problem": "Problem",
    "projects.work": "What I did",
    "projects.result": "Result",
    "projects.open": "Read the case",
    "projects.close": "Close the case",
    "projects.code": "Code",
    "projects.demo": "View demo",
    "projects.original": "Original site",

    "about.title": "About me",
    "about.p1":
      "I started on the front end, with WordPress, PHP and JavaScript, and gradually moved deeper into the server side. Today I work mostly in C# and ASP.NET, with SQL Server, on ticket-sales systems that need to hold up on high-demand days.",
    "about.p2":
      "Before that, I did a nine-month internship at Multimac, where I coordinated a team of interns on internal projects. I like to understand a system before changing it, and to leave the code clearer than I found it.",
    "about.where": "Based in",
    "about.whereValue": "Vila Nova de Gaia, Porto",
    "about.now": "Working at",
    "about.nowValue": "MicLearning, xopvision team",
    "about.photoAlt": "Samara Rodrigues, seated, wearing a light green blazer",
    "hero.photoAlt": "Samara Rodrigues, resting her chin on her hand",

    "stack.title": "What I work with",
    "stack.subtitle": "The tools I use, and where I use them.",
    "stack.daily": "Day to day",
    "stack.dailyNote": "At work, on ticketing and back-office systems",
    "stack.web": "Web and clients",
    "stack.webNote": "In freelance projects and during my internship",
    "stack.learning": "Currently learning",
    "stack.learningNote": "In PersonalAssistant and other personal projects",

    "contact.title": "Contact",
    "contact.subtitle":
      "I'm open to conversations about .NET and web development roles.",
    "contact.email": "Email",
    "contact.phone": "Phone",
    "contact.copy": "Copy",
    "contact.copied": "Copied",

    "footer.note": "Designed and built by me, with Next.js.",

    // Chaves antigas, ainda usadas pelas secções por migrar.
    "nav.home": "Home",
    "nav.skills": "Skills",
    "hero.role": "Front-end Developer",
    "about.role": "Front-end Developer",
    "about.description1": "I'm a passionate Front-end Developer with expertise in building modern web applications. With a strong foundation in both frontend and backend technologies, I create seamless, user-friendly experiences that solve real-world problems.",
    "about.description2": "My journey in software development has equipped me with a diverse skill set and the ability to adapt to new technologies quickly. I'm committed to writing clean, maintainable code and constantly improving my craft.",
    "about.name": "Name:",
    "about.email": "Email:",
    "about.location": "Location:",
    "about.phone": "Phone:",
    "skills.title": "My Skills",
    "skills.subtitle": "Here's a breakdown of my technical skills and proficiency levels.",
    "skills.frontend": "Frontend",
    "skills.backend": "Backend",
    "skills.tools": "Tools & DevOps",
    "contact.info": "Contact Information",
    "contact.location": "Location",
    "contact.message": "Send Me a Message",
    "contact.yourName": "Your Name",
    "contact.yourEmail": "Your Email",
    "contact.subject": "Subject",
    "contact.yourMessage": "Your Message",
    "contact.sending": "Sending...",
    "contact.send": "Send Message",
    "contact.success": "Thank you for your message! I'll get back to you as soon as possible.",
    "footer.rights": "All rights reserved.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // PT-PT é o idioma principal; EN é a alternativa.
  const [language, setLanguageState] = useState<Language>("pt");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("language");
      if (saved === "pt" || saved === "en") setLanguageState(saved);
    } catch {
      /* sem acesso ao localStorage: fica em PT */
    }
  }, []);

  // Mantém o atributo lang do <html> certo, para leitores de ecrã e SEO.
  useEffect(() => {
    document.documentElement.lang = language === "pt" ? "pt-PT" : "en";
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("language", lang);
    } catch {
      /* ignora */
    }
  }, []);

  const t = useCallback(
    (key: string) => translations[language][key] ?? key,
    [language]
  );

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
