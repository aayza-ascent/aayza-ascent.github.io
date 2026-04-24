# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo purpose

This is Aayza Ahmed's personal portfolio site, served at `aayza-ascent.github.io`. It is a **Next.js 14 + TypeScript + React** app statically exported and deployed to **GitHub Pages**. The original design lives in `Aayza Portfolio Web Design/` (an HTML + `window.*`-JSX prototype) and should be treated as read-only design reference — the live site lives in `app/`, `components/`, and `lib/`.

## Commands

```bash
npm install          # first-time setup
npm run dev          # local dev server at http://localhost:3000
npm run build        # production static build → ./out (suitable for GitHub Pages)
npm run start        # preview the production build (rare; static export is the target)
npm run lint         # eslint (next/core-web-vitals)
npm run typecheck    # tsc --noEmit
```

`next build` runs `output: 'export'` (see `next.config.mjs`), so the deployable artifact is `./out/`. CI publishes that via `.github/workflows/deploy.yml` on every push to `main`.

## Architecture

- **`app/layout.tsx`** — root layout. Imports `globals.css` and pulls in the Google Fonts (`Inter`, `Instrument Serif`, `JetBrains Mono`, `Caveat`) via `<link>` so the prototype's bare `font-family: 'Instrument Serif'` declarations resolve without remapping.
- **`app/page.tsx`** — server component that composes every section in order. Renders `TopNav → Hero → Work → LiveSites → Projects → TechStack → Hobbies → Photos → ApiWidget → Guestbook` then the fixed `NowPlaying` strip and `ShortcutHelp` overlay. Section order is authoritative and matches the `TopNav` href ids (`home, work, live, projects, stack, hobbies, photos, api, guestbook`).
- **`app/globals.css`** — the design system. Holds every shared primitive from the prototype: CSS custom properties on `:root` (`--cream`, `--surface`, `--ink`, `--peri`, `--blush`, `--accent`, `--mint`, `--lemon`, `--cyan`, `--shadow-soft`, `--shadow-inset`, `--glass`, `--radius`, `--gap`, `--motion`), the `body::before` grain and `body::after` vignette, reusable classes (`.neu`, `.glass`, `.btn`/`.btn-primary`/`.btn-ghost`, `.chip`, `.eyebrow`, `.section-title`, `.reveal`, `.mono`, `.serif`, `.row`, `.no-scrollbar`), the fixed `nav.top` rules, and the `kb-flash` keyboard-jump animation.
- **`components/*.tsx`** — one client component per section (all marked `'use client'`). Each component keeps its own section-scoped CSS inside a `styled-jsx` `<style jsx>` block. Use `:global(...)` selectors when styling a child that's rendered inside a global class (see `Projects.tsx` for examples).
- **`components/TopNav.tsx`** — also exports two hooks: `useScrollReveal` (adds `.reveal` + `.in` to `<section>`s as they enter view) and `useActiveSection` (drives the nav pill's active state via an IntersectionObserver). `TopNav` calls `useScrollReveal` itself, so the scroll-reveal behavior is guaranteed for every section without per-component setup.
- **`lib/data.ts`** — fully typed replacement for the prototype's `window.WORK/PROJECTS/TECH/HOBBIES/FACTS/PHOTOS/LIVE_SITES` globals. Treat this as the canonical CV/content; editing copy means editing this file.
- **`public/cv.pdf`** — the downloadable CV, linked from `ApiWidget`'s contact card.
- **`public/.nojekyll`** — empty file that tells GitHub Pages not to run Jekyll processing on the exported site.

### Key conventions

- **Client vs server**: `app/page.tsx` is a server component; every file in `components/` is a client component because they all depend on state, effects, or DOM APIs (IntersectionObserver, cursor tracking, localStorage, keyboard listeners).
- **Styling**: global primitives live in `globals.css`; section-specific styles stay in each component's `<style jsx>` block. Don't add a CSS module system or Tailwind — the current styled-jsx approach mirrors the prototype 1:1 and keeps the port reviewable.
- **No MUI**: the prototype used `@mui/material`'s `Chip` via a UMD script. The port replaces it with a hand-rolled `.dc-chip` span in `Projects.tsx`. Don't reintroduce MUI unless a component genuinely needs it — it adds ~100kB to the bundle.
- **Motion**: CSS uses `var(--motion, 1)` to scale animation amplitude. There's no UI to change it yet, but you can wire a switcher by setting `data-motion` on `<html>`.
- **GitHub Pages specifics**: the repo name `aayza-ascent.github.io` is a user/org Pages repo served at root, so **no `basePath` or `assetPrefix`** is set. If this ever moves to a project repo, both will need to be added to `next.config.mjs`.

## Design source (read-only)

`Aayza Portfolio Web Design/` contains the original HTML+JSX prototype (`portfolio.html` + `src/*.jsx` + `tweaks-panel.jsx`). Keep it for visual reference — it is the source of truth for styling tweaks and new sections — but don't try to wire it into the build. `tweaks-panel.jsx` and the `__activate_edit_mode` message protocol are design-tool-only and are intentionally not ported.
