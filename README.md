# Portfolio Multilíngue

Um portfolio moderno, interativo e responsivo construído com Next.js e Tailwind CSS, com suporte para múltiplos idiomas (inglês e português).

![Preview do Portfolio](https://via.placeholder.com/800x400?text=Portfolio+Preview)

## 📋 Características

- **Design Moderno e Minimalista**: Interface elegante com fundo escuro e detalhes em verde esmeralda
- **Totalmente Responsivo**: Adaptado para todos os tamanhos de tela
- **Multilíngue**: Suporte completo para inglês e português
- **Animações Interativas**: Efeitos de animação suaves usando Framer Motion
- **Seções Completas**: Hero, Sobre, Projetos, Habilidades e contacto
- **Componentes Reutilizáveis**: Construído com componentes modulares
- **Formulário de contacto**: Formulário funcional com validação
- **Modo Escuro**: Design otimizado para modo escuro

## 🚀 Tecnologias Utilizadas

- [Next.js 14](https://nextjs.org/) - Framework React
- [React 18](https://reactjs.org/) - Biblioteca JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [TypeScript](https://www.typescriptlang.org/) - Superset JavaScript
- [Framer Motion](https://www.framer.com/motion/) - Biblioteca de animações
- [Lucide React](https://lucide.dev/) - Ícones
- [shadcn/ui](https://ui.shadcn.com/) - Componentes de UI

## 🔧 Pré-requisitos

- Node.js 18.17.0 ou superior
- npm ou yarn

## 💻 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Samrodrigues015/Projeto.git
cd projeto
```

2. Instale as dependências:

```bash
npm install
# ou
yarn install
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

4. Abra [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```bash
portfolio-multilingue/
├── app/                    # Diretório principal do Next.js App Router
│   ├── layout.tsx          # Layout principal da aplicação
│   ├── page.tsx            # Página inicial
│   └── globals.css         # Estilos globais
├── components/             # Componentes reutilizáveis
│   ├── header.tsx          # Cabeçalho com navegação
│   ├── hero.tsx            # Seção hero
│   ├── about.tsx           # Seção sobre
│   ├── projects.tsx        # Seção de projetos
│   ├── skills.tsx          # Seção de habilidades
│   ├── contact.tsx         # Seção de contacto
│   ├── footer.tsx          # Rodapé
│   ├── language-switcher.tsx # Seletor de idioma
│   └── ui/                 # Componentes de UI do shadcn
├── contexts/               # Contextos React
│   └── language-context.tsx # Contexto de idioma
├── public/                 # Arquivos estáticos
└── tailwind.config.ts      # Configuração do Tailwind CSS
```

## ✨ Funcionalidades

### Sistema de Internacionalização

O projeto utiliza Context API do React para gerenciar o estado do idioma:

- `LanguageContext`: Gerencia o estado do idioma selecionado
- `useLanguage`: Hook personalizado para acessar traduções
- Armazenamento no localStorage para persistir a preferência de idioma

### Componentes Interativos

- **Animações**: Efeitos de entrada, digitação e transições suaves
- **Navegação**: Menu responsivo com links de navegação suave
- **Formulário**: Validação de formulário e feedback visual
- **Barras de Habilidades**: Barras de progresso animadas

## 🔍 Personalização

### Alterando Informações Pessoais

Edite os componentes em `components/` para atualizar suas informações pessoais:

- `hero.tsx`: Nome, título e links sociais
- `about.tsx`: Descrição, foto e detalhes de contacto
- `projects.tsx`: Seus projetos e links
- `skills.tsx`: Suas habilidades e níveis
- `contact.tsx`: Informações de contacto

### Adicionando Novos Idiomas

1. Adicione um novo idioma no objeto `translations` em `contexts/language-context.tsx`:

```bash
const translations = {
  en: { ... },
  pt: { ... },
  es: { // Exemplo para adicionar espanhol
    "nav.home": "Inicio",
    // Adicione todas as traduções necessárias
  }
}
```

2. Atualize o tipo `Language` para incluir o novo idioma:

```bash
type Language = "en" | "pt" | "es";
```

3. Adicione o novo botão no componente `LanguageSwitcher`.

### Alterando Cores e Estilos

- As cores principais podem ser alteradas no arquivo `tailwind.config.ts`
- Os estilos globais estão em `app/globals.css`

## 👤 Autor

Samara Rodrigues

Feito com ❤️ e React
