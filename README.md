# aayza-ascent.github.io

Personal portfolio for **Aayza Ahmed** — Glasgow-based software engineer building full-stack TypeScript, AI-assisted workflow automation, and modular dashboards.

🌐 **Live**: [aayza-ascent.github.io](https://aayza-ascent.github.io)

## Stack

- **Next.js 14** (App Router, server components for static composition; client components for interactivity)
- **TypeScript** in strict mode
- **styled-jsx** for component-scoped styles, paired with a CSS custom-property design system in `app/globals.css`
- **Static export** (`output: 'export'`) deployed to **GitHub Pages** via GitHub Actions
- No CSS framework, no UI library — every component is hand-rolled for full control over the prototype's visual fidelity

## Architecture

```
app/
  layout.tsx         root layout, metadata, font loading
  page.tsx           server-component composition of every section
  globals.css        design tokens (--peri, --space-*, --radius-*) + shared primitives
components/
  TopNav.tsx         fixed nav + useScrollReveal / useActiveSection hooks
  Hero.tsx           landing section
  hero/Blobs.tsx     parallax cursor-following gradient blobs
  Work.tsx           expandable timeline of roles
  LiveSites.tsx      cards for live production sites
  Projects.tsx       deck of project cards (3D flip)
  projects/          ProjectIcon, ProjectsFilter, ProjectCard
  TechStack.tsx      vinyl-record tech stack visualisation
  tech/              VinylStage, TrackInfo
  Hobbies.tsx        flip-card hobby grid + fact generator
  Photos.tsx         polaroid photo wall + lightbox
  ApiWidget.tsx      live API call (joke endpoint, with offline fallback)
  Guestbook.tsx      pixel-art guestbook persisted to localStorage
  NowPlaying.tsx     fixed audio-player strip
  now-playing/       CoverArt, Controls, data
  ShortcutHelp.tsx   keyboard-shortcut overlay
lib/
  data.ts            typed CV/content (canonical source of truth)
public/
  cv.pdf             downloadable CV
  photos/            photo wall assets
  .nojekyll          disables Jekyll on GitHub Pages
```

Section order in `app/page.tsx` is authoritative — `TopNav` href IDs (`home`, `work`, `live`, `projects`, `stack`, `hobbies`, `photos`, `api`, `guestbook`) match the rendered sections in order.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run typecheck    # tsc --noEmit
npm run lint         # next/core-web-vitals
npm run build        # static export → ./out
```

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`, which runs `npm run build` and publishes the `./out` directory to GitHub Pages. No manual deploy step required.

Because the repo is named `aayza-ascent.github.io` (a user/org Pages repo served at root), no `basePath` or `assetPrefix` is set. If migrating to a project repo, both will need adding to `next.config.mjs`.

## Editing content

All copy, project entries, hobbies, photos, and tech stack live in `lib/data.ts` as fully typed exports (`WORK`, `PROJECTS`, `LIVE_SITES`, `TECH`, `HOBBIES`, `FACTS`, `PHOTOS`). Edit there; sections re-render automatically.

## Keyboard shortcuts

Press `?` anywhere on the site to see the full list. Letter keys (`h`, `w`, `p`, `s`, `f`, `i`, `a`, `g`) jump to the corresponding section.

## License

MIT
