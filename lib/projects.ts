import type { Language } from "@/contexts/language-context";

type Localized = Record<Language, string>;

export type Project = {
  id: string;
  name: string;
  /** Onde foi feito: estágio, freelance, projeto pessoal */
  context: Localized;
  /** Uma frase para o cartão fechado */
  summary: Localized;
  problem: Localized;
  work: Localized;
  result: Localized;
  tech: string[];
  image?: { src: string; alt: Localized };
  /** Cartão largo (com imagem) ou estreito (só texto) na grelha */
  size: "wide" | "narrow";
  links: { code?: string; demo?: string; original?: string };
};

export const projects: Project[] = [
  {
    id: "multimac",
    name: "Multimac",
    context: { pt: "Estágio · 2025", en: "Internship · 2025" },
    summary: {
      pt: "Tema WordPress à medida para o site institucional da empresa.",
      en: "Custom WordPress theme for the company website.",
    },
    problem: {
      pt: "A Multimac precisava de um site institucional em WordPress que apresentasse as suas soluções com clareza e fosse simples de manter.",
      en: "Multimac needed a WordPress company website that presented its solutions clearly and was simple to maintain.",
    },
    work: {
      pt: "Desenvolvi um tema à medida em PHP, HTML, CSS e JavaScript, responsivo e preparado para SEO, com secções que se configuram a partir do painel do WordPress.",
      en: "I built a custom theme in PHP, HTML, CSS and JavaScript, responsive and SEO-ready, with sections that can be configured from the WordPress dashboard.",
    },
    result: {
      pt: "O projeto deu origem ao site da empresa, hoje em multimac.pt. Por razões de segurança, apresento aqui a minha versão do projeto e não o código da empresa.",
      en: "The project became the company website, now at multimac.pt. For security reasons, I show my own version of the project here rather than the company's code.",
    },
    tech: ["PHP", "WordPress", "JavaScript", "CSS"],
    image: {
      src: "/projects/multimac.webp",
      alt: {
        pt: "Página inicial da versão de demonstração do tema Multimac",
        en: "Home page of the Multimac theme demo",
      },
    },
    size: "wide",
    links: {
      demo: "https://multitech-portifolio.netlify.app/",
      code: "https://github.com/Samrodrigues015/ProjetoMultimac",
      original: "https://multimac.pt/",
    },
  },
  {
    id: "personal-assistant",
    name: "PersonalAssistant",
    context: { pt: "Projeto pessoal · 2026", en: "Personal project · 2026" },
    summary: {
      pt: "Assistente de voz para Windows, em C# e .NET, com IA local.",
      en: "A voice assistant for Windows, in C# and .NET, with local AI.",
    },
    problem: {
      pt: "Queria aprender arquitetura de software com profundidade, e para isso precisava de um projeto maior do que um exercício isolado.",
      en: "I wanted to learn software architecture in depth, and that needed a project bigger than an isolated exercise.",
    },
    work: {
      pt: "Estou a construir um assistente semelhante à Alexa, em C# e .NET 10, que conversa através de um modelo de linguagem a correr localmente com Ollama e executa ações no computador. Organizei o código com injeção de dependências, interfaces e princípios SOLID.",
      en: "I'm building an Alexa-like assistant in C# and .NET 10 that talks through a language model running locally with Ollama and performs actions on the computer. I structured the code with dependency injection, interfaces and SOLID principles.",
    },
    result: {
      pt: "A primeira versão está funcional, com 18 testes xUnit a passar. A fase seguinte acrescenta voz, com Whisper para o reconhecimento e o motor de síntese nativo do Windows.",
      en: "The first version works, with 18 passing xUnit tests. The next phase adds voice, using Whisper for recognition and the native Windows speech engine.",
    },
    tech: [".NET 10", "C#", "Ollama", "xUnit", "Whisper"],
    size: "narrow",
    links: {},
  },
  {
    id: "dualinfor",
    name: "Dualinfor",
    context: { pt: "Estágio · 2025", en: "Internship · 2025" },
    summary: {
      pt: "Tema WordPress moderno, com estrutura limpa e foco em desempenho.",
      en: "A modern WordPress theme with a clean structure and a focus on performance.",
    },
    problem: {
      pt: "A Dualinfor precisava de renovar a sua presença online com um site atual, rápido e adaptado a qualquer ecrã.",
      en: "Dualinfor needed to refresh its online presence with a current, fast website that works on any screen.",
    },
    work: {
      pt: "Criei um tema WordPress responsivo em PHP, HTML, CSS e JavaScript, com uma estrutura de ficheiros limpa e atenção ao desempenho em cada página.",
      en: "I created a responsive WordPress theme in PHP, HTML, CSS and JavaScript, with a clean file structure and attention to performance on every page.",
    },
    result: {
      pt: "O projeto deu origem ao site da empresa, hoje em dualinfor.pt. Por razões de segurança, apresento aqui a minha versão do projeto e não o código da empresa.",
      en: "The project became the company website, now at dualinfor.pt. For security reasons, I show my own version of the project here rather than the company's code.",
    },
    tech: ["PHP", "WordPress", "JavaScript", "CSS"],
    image: {
      src: "/projects/dualinfor.webp",
      alt: {
        pt: "Página inicial da versão de demonstração do tema Dualinfor",
        en: "Home page of the Dualinfor theme demo",
      },
    },
    size: "wide",
    links: {
      demo: "https://dualtech.netlify.app/",
      code: "https://github.com/Samrodrigues015/Dualinfor",
      original: "https://dualinfor.pt/",
    },
  },
  {
    id: "anny-lima",
    name: "Anny Lima Nail Design",
    context: { pt: "Freelance", en: "Freelance" },
    summary: {
      pt: "Site profissional com área reservada às alunas dos cursos.",
      en: "A professional website with a private area for course students.",
    },
    problem: {
      pt: "A nail designer e formadora Anny Lima precisava de um site profissional e de um espaço reservado onde as alunas encontrassem os materiais dos cursos.",
      en: "Nail designer and educator Anny Lima needed a professional website and a private space where her students could find course materials.",
    },
    work: {
      pt: "Construí o site em WordPress com o tema Blocksy e funcionalidades em PHP à medida, incluindo uma área exclusiva com materiais, tutoriais e dicas de nail art.",
      en: "I built the site in WordPress with the Blocksy theme and custom PHP features, including a members-only area with materials, tutorials and nail art tips.",
    },
    result: {
      pt: "O site está online e reúne num só lugar a apresentação do trabalho da Anny e o apoio às alunas.",
      en: "The site is live and brings together Anny's portfolio and student support in one place.",
    },
    tech: ["WordPress", "Blocksy", "PHP", "CSS"],
    image: {
      src: "/projects/anny-lima.webp",
      alt: {
        pt: "Página inicial do site Anny Lima Nail Design",
        en: "Home page of the Anny Lima Nail Design website",
      },
    },
    size: "wide",
    links: { demo: "https://annylima.ovh/" },
  },
  // TODO: oraculo-samara — a acrescentar quando houver a descrição do projeto.
];
