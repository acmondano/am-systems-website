# HANDOFF — Next Claude Session

**Last updated:** 2026-04-22 (post-ship)
**Previous handoff reason:** chat context too long; user cleared. This file was rewritten after the ship.

## Current state (one paragraph)
All prior in-progress work is shipped. Commit `6cb2d4b` on branch `claude/crazy-gates-15a10b` was fast-forwarded onto `origin/main` at `acmondano/am-systems-website` (+1170 / -145 across 7 files). If the repo is wired to GitHub Pages off `main`, the live site is now updated. No uncommitted work remains in the worktree.

## What shipped in `6cb2d4b`
- **Hero:** WebGL2 galactic starfield shader (replaces legacy 2D network canvas); three.js dependency removed; single-column centered layout with scroll hint; `#how-it-works` section holds the 3-system flow card that used to live in `.hero-right`.
- **Spotlight cards** (3 SYS cards + 4 For-Whom cards on `index.html`): fixed the "all cards glow at once" bug. Root cause — old impl used `:root --sc-x/--sc-y` + `background-attachment:fixed`, but `.stagger-child`'s `transform` on each card creates a local containing block, which forces `background-attachment:fixed` to behave element-local. Every card ended up painting its own copy of the viewport gradient. New impl uses per-card local pixel coords, `:hover`-gated opacity on `::before`/`::after`, and a hover-only base-layer gradient. Brightness was dialed down twice at user request (~52% total reduction). Mobile (`@media pointer:coarse`) disables the effect entirely.
- **Cross-page polish:** faq, portfolio, pricing, services + index content updates (Before/After section, letter-reveal headlines, magnetic CTAs, testimonials scaffold, PHP/USD toggle — see diff for details).
- **Housekeeping:** `SESSION_CONTEXT.md` rewritten, `HANDOFF.md` created (now superseded by this version).

## Architectural notes worth remembering
1. **Spotlight card pattern is now per-card local.** Any new `.spotlight-card` instance just needs the class — the tracker in the bottom `<script>` attaches `pointerenter`/`pointermove`/`pointerleave` per card automatically. Don't reintroduce `:root` variables or `background-attachment:fixed`.
2. **Never use `background-attachment:fixed` on elements with transformed ancestors** (GSAP, `.stagger-child`, or any scroll-reveal class that applies `transform`). The browser silently treats it as element-local, breaking the "viewport-wide" assumption. Use per-element local coords instead.
3. **Worktree vs. main duplication is resolved** — main was fast-forwarded so both are now at `6cb2d4b`. If Arvin reopens the main checkout later, it needs `git pull` to sync.

## Preferences reinforced this session
- Brand green (`#39FF14`) for accents only; neutral/dark surfaces elsewhere.
- When a hover effect looks "too bright," halve the alpha/opacity first before touching size or color.
- Execute and ship; don't ask for confirmation loops. Arvin course-corrects if needed.

## Next-session starting point
- Repo is clean. Run `preview_start` with name `ams-site` if you need the dev server.
- No pending tasks carry over. Wait for Arvin's next brief.
