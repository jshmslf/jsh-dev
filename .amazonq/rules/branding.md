# Portfolio — Branding & AI Rules

> This file is the single source of truth for design decisions, coding conventions,
> and AI assistant rules for this project. Reference it before making any changes.

---

## Identity

| Key      | Value                                        |
| -------- | -------------------------------------------- |
| Name     | Joshua F. Verceles                           |
| Role     | Full-stack Developer                         |
| Tagline  | Angular for work. Next.js for passion.       |
| Stack    | Next.js (personal) · Angular (work) · Python |
| Location | Pangasinan, Philippines (UTC+8)             |

---

## Design System

### Typography

```
--font-sans: "Geist", sans-serif       → body, UI text
--font-mono: "Geist Mono", monospace   → labels, tags, code, metadata
```

**Rules:**
- Use `Geist` for all readable prose and headings.
- Use `Geist Mono` for card labels, tags, badges, timestamps, and code.
- Never substitute with Inter, Roboto, Arial, or system fonts.
- Import via Google Fonts: `https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900`

### Color Tokens

All colors are CSS custom properties set on `:root` and `[data-theme="light"]`.
**Never hardcode hex values in component styles.** Always use tokens.

```css
/* Structure */
--bg        background page
--bg2       card surfaces
--bg3       inset / nested surfaces (e.g., stack items, project cards inner)
--border    all borders

/* Text */
--text      primary readable text
--text2     secondary / muted
--text3     hints, placeholders, disabled

/* Accent — user-controlled */
--accent        solid accent color (persisted in localStorage)
--accent-10     10% opacity variant (hover states, subtle fills)
--accent-20     20% opacity variant (selection, rings)
```

### Accent Color System

- Default: `#1DB954`
- User can pick from 9 presets or use the custom color input.
- **All** interactive accent usage (borders, fills, dots, numbers) must read from `var(--accent)` — never hardcode a color for an accented element.

### Theming

- Default theme: **dark**
- Toggled with `data-theme="light"` on `<html>`.
- Persisted to `localStorage` under key `portfolio-theme`.
- Anti-flash script in `layout.tsx` reads both values before first paint.
- **Never** use Tailwind dark mode classes (`dark:`) — use CSS variables only.

### Spacing & Layout

- Bento grid: `repeat(4, 1fr)` columns, `gap: 12px`
- Max width: `900px`, centered with `margin: 0 auto`
- Card padding: `20px`
- Card border-radius: `var(--card-radius)` = `14px`
- Page padding: `24px 16px 48px`

### Card Borders

- Default: `1px solid var(--border)`
- Hover: `border-color: var(--accent)` — always use CSS transition `0.2s ease`

---

## File Structure

```
src/
├── app/
│   ├── globals.css       ← all CSS tokens, Tailwind import, font import
│   ├── layout.tsx        ← anti-flash script, metadata
│   └── page.tsx          ← bento grid layout (server component)
├── components/
│   ├── Topbar.tsx        ← theme toggle button (client component)
│   └── cards/
│       ├── Card.tsx          ← base card wrapper
│       ├── HeroCard.tsx      ← intro / hero
│       ├── AccentCard.tsx    ← color picker (client component)
│       └── index.tsx         ← LocationCard, StatsCard, StackCard,
│                                ExperienceCard, ProjectsCard, SocialsCard
├── hooks/
│   ├── useTheme.ts       ← theme state + toggle
│   └── useAccent.ts      ← accent state + ACCENT_PRESETS
└── lib/
    ├── config.ts         ← ALL portfolio content (single source of truth)
    └── utils.ts          ← cn() helper
```

---

## Content Rules

- **All content lives in `src/lib/config.ts`.** Do not hardcode strings in components.
- To update name, bio, projects, stack, socials — edit `config.ts` only.
- Component files should import from `@/lib/config` and render from the config object.

---

## Coding Conventions

### General

- **TypeScript strict mode** is enabled. No `any` types.
- Use `"use client"` only when the component uses hooks, event handlers, or browser APIs.
  Keep server components as the default.
- Prefer named exports over default exports for components.
- `cn()` utility in `lib/utils.ts` for conditional class names.

### Styling

- All styles via **inline `style` props** using CSS variables — no Tailwind utility classes
  inside component JSX (Tailwind is used in `globals.css` only via `@import "tailwindcss"`).
- No `styled-components`, no `emotion`, no CSS Modules.
- Animations live in `<style>` blocks inside `page.tsx` or `globals.css` — not inline.

### Components

- Every new card = a new file or export in `src/components/cards/`.
- Card components receive data from `config.ts`, never from props passed down the tree.
- Client-only cards (hooks needed) go in their own file with `"use client"` at top.

### Naming

```
Components    PascalCase     HeroCard.tsx
Hooks         camelCase      useTheme.ts
Config keys   camelCase      SITE.yearsOfExp
CSS vars      kebab-case     --font-mono
```

---

## What NOT to Do

- ❌ Do not use `Inter`, `Roboto`, or system fonts anywhere.
- ❌ Do not hardcode colors like `color: "#888"` — use `var(--text2)`.
- ❌ Do not hardcode accent color — always use `var(--accent)`.
- ❌ Do not use Tailwind dark mode (`dark:` prefix) — CSS vars handle theming.
- ❌ Do not add content directly in component JSX — update `config.ts`.
- ❌ Do not use `localStorage` directly in components — use `useTheme` / `useAccent` hooks.
- ❌ Do not add `position: fixed` elements inside cards (breaks layout flow).
- ❌ Do not create separate CSS files per component — inline styles + globals only.

---

## Adding New Cards

1. Create `src/components/cards/NewCard.tsx`
2. Add any new content fields to `src/lib/config.ts`
3. Export from `src/components/cards/index.tsx` (or its own file if `"use client"`)
4. Import and place in the grid in `src/app/page.tsx`
5. Assign grid column span with `style={{ gridColumn: "span N" }}`

---

## Deployment Notes

- Target: **Vercel** (zero-config for Next.js)
- No environment variables required for base portfolio.
- All fonts load from Google Fonts CDN — no self-hosting needed.