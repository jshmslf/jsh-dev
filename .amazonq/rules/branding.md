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

All colors are CSS custom properties set on `:root` and `.dark`.
**Never hardcode hex values in component styles.** Always use tokens.

```css
/* Structure */
--background    page background
--card          card surfaces
--muted         inset / nested surfaces (tags, pills, subtle fills)
--border        all borders

/* Text */
--foreground        primary readable text
--muted-foreground  secondary / muted

/* Accent — user-controlled at runtime */
--primary       solid accent color (set via ThemeCard, not persisted)
```

### Accent Color System

- Default: `#1DB954` (Spotify green)
- User picks from 9 presets in `ThemeCard`: Spotify, Sage, Blush, Sky, Peach, Lilac, Mint, Butter, Rose
- Presets defined in `src/hooks/useAccent.ts` → `ACCENT_PRESETS`
- Applied via `document.documentElement.style.setProperty("--primary", color)` — **not** persisted in localStorage
- **All** interactive accent usage must read from `var(--primary)` — never hardcode a color

### Border Radius System

Two separate tokens control radius — both set at runtime via `ThemeCard`:

```css
--card-radius: 14px   → used by .card class (Cards, containers)
--ui-radius:   8px    → used by buttons, pills, tags, small elements
```

- `applyRadius(value)` in `ThemeCard` sets both tokens
- When preset is `Full (999px)`, `--card-radius` is **capped at `24px`** to prevent pill-shaped cards
- `--ui-radius` goes full `999px` on Full
- Radius presets: None (0px) · SM (6px) · MD (14px) · LG (20px) · Full (999px)
- **Never hardcode `borderRadius`** in components — always use `var(--card-radius)` or `var(--ui-radius)`

### Theming

- Default theme: **dark** — `dark` class on `<html>` set server-side in `layout.tsx`
- Toggled by `useTheme` hook — adds/removes `dark` class on `<html>`
- Anti-flash inline script in `layout.tsx` reads `localStorage` before first paint, defaults to dark
- Theme is **persisted** in `localStorage` as `"theme": "dark" | "light"`
- **Never** use Tailwind dark mode classes (`dark:`) — use CSS variables only

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
│   ├── globals.css           ← all CSS tokens, .card, .profile-btn, .content-wrapper
│   ├── layout.tsx            ← anti-flash script, dark class default, metadata
│   └── page.tsx              ← homepage layout (server component)
├── components/
│   └── homepage/
│       ├── Profile.tsx       ← hero section (server component)
│       ├── ThemeToggle.tsx   ← dark/light toggle button (client component)
│       ├── ContentGrid.tsx   ← 60/40 grid layout
│       ├── Card.tsx          ← base card wrapper (title, content, optional view all)
│       ├── TechStackCard.tsx ← tech stack grouped pills
│       └── ThemeCard.tsx     ← accent + radius controls (client component)
├── hooks/
│   ├── useTheme.ts           ← dark class toggle, localStorage persist
│   └── useAccent.ts          ← ACCENT_PRESETS, applyAccent via CSS setProperty
└── lib/
    ├── config.ts             ← ALL portfolio content (single source of truth)
    └── utils.ts              ← cn() helper
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
- ❌ Do not hardcode colors — use `var(--foreground)`, `var(--muted-foreground)`, `var(--primary)`, etc.
- ❌ Do not hardcode `borderRadius` — use `var(--card-radius)` for cards, `var(--ui-radius)` for UI elements.
- ❌ Do not use Tailwind dark mode (`dark:` prefix) — CSS vars handle theming.
- ❌ Do not add content directly in component JSX — update `config.ts`.
- ❌ Do not use `localStorage` directly in components — use `useTheme` / `useAccent` hooks.
- ❌ Do not persist accent color in localStorage — it is session-only, set via CSS custom property.
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