# HANDOFF — Next Claude Session

**Last updated:** 2026-04-22 (services redesign shipped, awaiting surgical site-wide color application)

## Read FIRST
1. MEMORY.md in `/Users/arvin/.claude/projects/-Users-arvin-Claude-AM-Systems-AM-Systems-Website/memory/` — auto-loaded. Especially:
   - `project_services_color_system.md` — the tri-color accent tokens
   - `feedback_push_discipline.md` — NEVER push without a per-batch go-word
   - `project_deploy_target.md` — live URL is `acm-systems.netlify.app` (Netlify, NOT GitHub Pages, NOT `systems.netlify.app`)
2. This file

## Current state
Live at https://acm-systems.netlify.app. `main` is at commit `abeb484`. All session work is merged to main and deployed.

## What shipped in this session (2026-04-22)
Chronologically: `6cb2d4b` → `ff69ba6` → `07936de` → `2924541` → `83d47bb` → `0161715` → `a581d37` → `cd9b378` → `abeb484`. Highlights:

- **Hero WebGL2 starfield on mobile** (`07936de`) — removed the `window.innerWidth < 900` bail and the two CSS `display:none` gates that hid the canvas on mobile/reduced-motion. DPR now capped at 1.0 on mobile for perf.
- **Spotlight card bug fix** (`6cb2d4b`) — per-card local coords + `:hover` gating replaced the `:root`/`background-attachment:fixed` pattern that was making every card glow at once.
- **Cursor glow polish** (`2924541`, `83d47bb`, `a581d37`) — shrunk core, `mix-blend-mode: screen`, hides entirely over any element with direct text content (walks up ancestor chain for div-as-heading patterns like `.trust-block-title`).
- **FAQ cleanup** (`83d47bb`) — "Common Questions" → "Frequently Asked Questions"; the `.faq-nav-bar` dead pill strip removed entirely (HTML + CSS + mobile override + scroll tracker JS).
- **CTA routing** (`0161715`) — every "Book a Strategy Call" / "Get Started" now points to `calendly.com/arvinmondano/30min`; `wa.me` stays only on chat-intent CTAs (nav "Book a Call", floating bubble, WhatsApp contact card).
- **Services page redesign** (`cd9b378` + `abeb484`) — dropped the 3-tab toggle, stacked sections vertically with per-service accent colors (violet / amber / cyan), ambient aura glow, icon float, IntersectionObserver scroll reveal, staggered bullet reveal, alternating layout on Sales.

## PENDING — surgical color-coding for the rest of the site
Arvin approved applying the services.html accent system to the rest of the site **surgically** — only to elements that visually represent one specific service. Brand green `#39FF14` stays on logo, nav, page headlines, hero shader accents, footer, and global "Book a Call" CTA.

**Color tokens to apply** (copy-paste from `project_services_color_system.md`):

```
Lead Engine  → #a78bfa violet  (rgba 167,139,250)
Sales Engine → #ffb066 amber   (rgba 255,176,102)
Business OS  → #5fa8ff cyan    (rgba 95,168,255)
```

**Per-page targets:**

- `index.html` — 3 "Three Systems" grid cards (each `.sys-card` gets a service accent); For-Whom chip colors that tag which service solves each persona's problem
- `pricing.html` — tier cards (Starter / Growth / Full Build) within each service's active tab adopt that service's accent; service toggle pill chips can either stay green or pick up the active service's color (TBD with Arvin)
- `portfolio.html` — service-tag chips on each case study card
- `faq.html` — any system-specific answer callouts
- `services.html` — already done

**Pattern reuse:** CSS custom props on a container (`--accent, --accent-dim, --accent-border, --accent-glow, --accent-text`), overridden per service id/class. See `services.html` #lead / #sales / #bos blocks for the exact token values.

## Recurring rules to respect
- **Never push without a per-batch go-word.** One "push now" does not authorize the next push. See `feedback_push_discipline.md`.
- **Brand green `#39FF14` is the site primary.** Not `#4ADE80`, not `#22a44e`.
- **Mobile is Netlify-deployed too.** `display:none` CSS rules for hero/animations on mobile were the wrong answer — lower DPR / simpler fallback is the right one.
- **Preview sandbox emulates `prefers-reduced-motion: reduce`** — shader and reveal animations may test as "invisible" in eval but render fine in real browsers.

## Next session starting point
Wait for Arvin's cue. If he says "continue the surgical colors," start with `index.html` (3 sys-cards is the biggest visible change) and show him the diff before committing. Follow the feedback_push_discipline memory — commit locally, describe what's ready, wait for go-word before pushing.
