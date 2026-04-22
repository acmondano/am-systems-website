# HANDOFF — Next Claude Session

**Created:** 2026-04-22
**Session clearing reason:** chat context too long; user is starting fresh.

## Read these files FIRST, in order
1. `SESSION_CONTEXT.md` (same folder) — full state of the site + shader evolution history
2. This file (open tasks + user preferences distilled)

## Current site state — one-paragraph summary
5-page static HTML marketing site. Homepage hero was restructured this session: single-column centered layout (was 55/45 grid), WebGL2 galactic starfield shader replacing the old 2D network canvas, scroll-hint at the bottom, and a new `#how-it-works` section below the hero holding the 3-system flow card that used to live in `.hero-right`. Three.js dependency removed (raw WebGL2 now). Brand still `#39FF14` neon green on `#050505` black. Pages 2–5 untouched except that the site path changed from Windows `D:\Claude\...` to Mac `/Users/arvin/Claude/...`.

## What user wants next — confirmed A → B → C → D, execute in this order

### A. Before/After comparison section (homepage)
Two-column visual under the hero. Left = chaos of scattered tools (Gmail, Sheets, WhatsApp, etc.) with red pain labels. Middle = VS chip. Right = unified `sys-visual`-style card. Motion: cards slide in from sides and meet. See SESSION_CONTEXT.md `Pending Tasks` section for full spec.

### B. Site-wide polish (all 5 pages)
- Letter-by-letter headline reveal on every `<h1>`
- Magnetic `.btn-primary` buttons
- Wire the existing `#progress` bar to scroll events

### C. Placeholder testimonial section (homepage)
3 swap-in-ready cards with disclaimer. User will supply real quotes later.

### D. PHP/USD toggle + annual savings calc (pricing.html)

## What user explicitly REJECTED this session — do not revisit
- Dense FBM cloud shaders (Hurrle's original approach) — reads as "weather," not space
- Green-colored shader nebula — too much green on whole site creates monotony
- Empty/minimal shader — user wants visible galaxies + meteors
- Orange/amber palette (that was the reference's default, not the target)

## Preferences learned this session
- **Brand green = headline + CTAs ONLY.** Backgrounds stay cool/neutral so green pops.
- **Calm and professional over dramatic.** When in doubt, dim first.
- **Text readability is non-negotiable** — always include a vignette or dimming layer behind the headline.
- Execute directly, don't confirm loops; user will course-correct if needed.

## Critical operational gotchas
1. **Worktree + main are duplicated.** Edits must be `cp`-synced or one of them shows stale code. Current MD5-sync state: ✅ identical as of handoff.
   - Main: `/Users/arvin/Claude/AM Systems/AM Systems Website/index.html`
   - Worktree: `/Users/arvin/Claude/AM Systems/AM Systems Website/.claude/worktrees/crazy-gates-15a10b/index.html`
2. **Preview sandbox emulates `prefers-reduced-motion: reduce`** — production shader code bails there. Force-mount via `preview_eval` with inline shader copy to visually verify. User's real Chrome is fine (macOS Reduce Motion is OFF on their machine).
3. **Pre-existing PNG deltas on main** (`Website Images/02-services-thumb-...`, `04-pricing-thumb-...`, `05-faq-thumb-...`) — NOT from this session. Do not commit them without user confirmation.
4. **Preview server:** `cd "/Users/arvin/Claude/AM Systems/AM Systems Website/.claude/worktrees/crazy-gates-15a10b" && python3 -m http.server 5501` — already defined in `.claude/launch.json` as `ams-site`. Use the Claude Preview MCP tool `preview_start` with name `ams-site`.
5. User's branding: `#39FF14` primary — do NOT regress to `#4ade80` (the old memory file was stale; now fixed).

## No commits this session
The user did not request `git commit` this session. All changes are in working-tree state in both main and worktree. Decide with the user whether to commit before/during/after the next task.

## Files that changed this session vs the `478588c` initial commit
- `index.html` (~270 insertions / 35 deletions — hero restructure + WebGL2 shader + how-it-works section)
- `.claude/launch.json` (new — preview config)
- `SESSION_CONTEXT.md` (full rewrite for Mac paths + current state)
- `HANDOFF.md` (this file — new)

## Resuming
1. Load the preview: `preview_start` with name `ams-site` (or `cd worktree && python3 -m http.server 5501`)
2. Open http://localhost:5501/ in a real browser (the MCP sandbox has reduced-motion which bails the shader)
3. Start task A. Before writing code, ask user if they want Before/After to REPLACE the current `.trust-strip` section or SIT ALONGSIDE it.
