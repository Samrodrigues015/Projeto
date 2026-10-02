# Samara Rodrigues — portfolio

My personal site: who I am, the projects I've worked on and how to reach me.
Content is in European Portuguese, with an English version.

## Stack

- [Next.js](https://nextjs.org/) (App Router) and React
- TypeScript
- Tailwind CSS
- A small WebGL shader for the hero background, with no 3D library

## Running locally

Requires Node.js 18.18 or later.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

For a production build:

```bash
npm run build
npm start
```

## Structure

```
app/
  layout.tsx          fonts, metadata, language provider
  page.tsx            page sections, in order
  globals.css         colour tokens and base styles
  fonts/              Geist (self-hosted, OFL)
components/
  header.tsx          sticky header, skip link, PT/EN toggle
  hero.tsx            photo, headline and the satin background
  satin-canvas.tsx    WebGL shader for the background
  projects.tsx        project cards that expand into a short case study
  about.tsx
  skills.tsx          tools grouped by where I use them
  contact.tsx
  footer.tsx
contexts/
  language-context.tsx   UI strings in PT and EN
lib/
  projects.ts         project content (problem, what I did, result)
public/               images, served as WebP
```

## Editing content

- **Projects:** add or edit an entry in `lib/projects.ts`. Each project has
  PT and EN text for the problem, what I did and the result. Screenshots go
  in `public/projects/`.
- **Other text:** `contexts/language-context.tsx`.

## Notes

- The hero background renders at half resolution and about 30 fps, pauses
  when off-screen and has a pause button. Without WebGL, with software
  rendering or with "reduce motion" turned on, a still image is shown instead.
- The Multimac and Dualinfor projects show my own version of the work. For
  security reasons the companies' code is not included; the live sites are
  linked from each project.
