# Samara Rodrigues: portfolio

This is the code for my personal site. It has a short introduction, a few
projects written up as small case studies (the problem, what I did, the
result), my stack and my contact details. The site is in European Portuguese
by default, with an English version.

I'm a .NET developer in Porto. My day-to-day work is C# and ASP.NET, so this
project is also where I keep my front-end skills in use.

## Built with

- Next.js 15 (App Router), React 19 and TypeScript
- Tailwind CSS 3
- Geist, self-hosted through `next/font/local`
- A small WebGL fragment shader for the animated background in the hero,
  written by hand, without three.js or any other 3D library

## Running it locally

You need Node.js 18.18 or newer.

```bash
npm ci
npm run dev
```

The site runs at http://localhost:3000. To check the production build:

```bash
npm run build
npm start
```

## Where things are

Project content lives in `lib/projects.ts`. Each entry has the PT and EN
text for the case study, the tech list and the links. Screenshots go in
`public/projects/`, as WebP, around 1400px wide.

The rest of the copy, from the navigation to the contact section, is in
`contexts/language-context.tsx`. The chosen language is saved in
`localStorage`, and the `lang` attribute on `<html>` changes with it.

Each section of the page has its own component in `components/`. The order
they appear in is set in `app/page.tsx`. Colours are CSS variables in
`app/globals.css`, mapped to Tailwind classes in `tailwind.config.ts`.

## About the hero background

The pink satin effect is drawn by `components/satin-canvas.tsx`. To keep it
light, it:

- renders at half resolution and about 30 frames per second;
- only starts once the browser is idle, so it doesn't delay the first paint;
- stops drawing when it is off-screen or the tab is hidden.

Under the canvas there is a static image of the same effect
(`public/satin-poster.webp`, 2 KB). That image is what visitors see when
WebGL isn't available, when the browser renders WebGL in software, or when
the system is set to reduce motion.

## A note on two of the projects

Multimac and Dualinfor were built during my internship. For security
reasons I don't publish the companies' code. The demos and repositories
linked from those cards are my own versions of the work, and each card also
links to the company's live site.

## Licence

You're welcome to read the code and borrow ideas from it. The photos of me
and the project screenshots are not licensed for reuse. Geist is
distributed under the SIL Open Font License; see `app/fonts/OFL.txt`.
