# AM Systems Website — Session Context

**Last updated:** 2026-04-22 (MacBook migration session)

## What This Is
The AM Systems 5-page marketing site. Static HTML, self-contained (no build step). Dark neon-cyber aesthetic with a "cozy shell" warm ambient layer. Hero now uses a WebGL2 **galactic starfield shader** instead of the original 2D network canvas.

## File Location (updated for Mac)
`/Users/arvin/Claude/AM Systems/AM Systems Website/`

**⚠️ Git worktree note:** There is ALSO a worktree checkout at
`/Users/arvin/Claude/AM Systems/AM Systems Website/.claude/worktrees/crazy-gates-15a10b/`
on branch `claude/crazy-gates-15a10b`. The local preview server serves the worktree. Any edit to `index.html` **must be synced to both** (`cp` worktree → main, or vice versa) or one of the two preview URLs will show stale code. Both are currently MD5-identical.

## Files
- `index.html` — Homepage (hero w/ WebGL starfield, How It Works, trust strip, stats, 3 system cards, ideal clients, mini FAQ, CTA)
- `services.html` — Tabs: Lead Engine / Sales Engine / Business OS
- `pricing.html` — Tier cards + comparison table
- `portfolio.html` — Featured Store Ops case (real) + 2 placeholders
- `faq.html` — 4-step process, 11-step engagement, timeline, FAQ accordion, contact section
- `am-systems-tour.gif` — Store Ops walkthrough (featured in portfolio)
- `ams-logo.png` — Transparent AM monogram (nav/footer/favicon)
- `chatbot.js` — Self-contained chatbot (also inlined into every HTML)
- `AM Systems — Store Operations Blueprint.pdf` — Business OS product doc
- `.claude/launch.json` — Preview config: `python3 -m http.server 5501`, name = `ams-site`

## Brand System (CANONICAL — unchanged)
- **Primary green:** `#39FF14` neon — NOT `#4ade80`, NOT emerald, NOT muted.
- **Background:** `--dark: #050505`
- **Surfaces:** `--surface: #090909`, `--surface2: #0d0d0d`
- **Border:** `--border: #1a1a1a`
- **Text:** `--text: #a8a8a8`, `--muted: #444`, `--white: #ededed`
- **Warm accents:** `--warm: #ffd98a`, `--warm-amber: rgba(255,180,110,0.045)`, `--cream-wash: rgba(255,229,176,0.05)`
- **Spring easing:** `--spring: cubic-bezier(.2,.7,.2,1.1)`
- **Typography:** Inter 300–900 from Google Fonts
- **Gradient text:** `.grad-text` = `linear-gradient(135deg,#39FF14,#00e676,#b2ff59,#ffffff)`

## Three Service Tiers (unchanged)
### 1. Lead Engine — ₱30,000 – ₱60,000 (~$515–$1,030 USD)
GoHighLevel. Landing pages, lead capture, CRM, email automation.
### 2. Sales Engine — ₱80,000 – ₱150,000 (~$1,375–$2,580 USD)
GoHighLevel + n8n. Funnels, sequences, pipelines, dashboards.
### 3. Business OS — ₱150,000 – ₱400,000+ (~$2,580–$6,880 USD)
MAD Store Ops (Next.js). One-time build, client owns it.

---

## 🆕 HERO CURRENT STATE (2026-04-22)

### Layout — SINGLE-COLUMN (restructured from 55/45 grid)
```
<section class="hero" id="hero-section">
  <canvas class="hero-starfield">  <!-- WebGL2, mounted by JS -->
  <div class="warm-wash">          <!-- CSS warm ambient -->
  <div class="particles-container">
  <div class="hero-inner">         <!-- centered, max-width 900px -->
    <h1>Systems That Turn [em]Attention Into Revenue.[/em]</h1>
    <p class="hero-sub">Fixed-price. Scoped to outcomes. Built by the people who deliver.</p>
    <div class="hero-btns">CTA + View Pricing</div>
  </div>
  <a class="hero-scroll-hint" href="#how-it-works">HOW IT WORKS ↓</a>
</section>
```

### New section below hero — `#how-it-works`
Contains the `sys-visual` card that used to live in `.hero-right` (Lead Engine → Sales Engine → Business OS → Scalable Revenue System). Has its own AOS fade-up reveal + GSAP scroll-triggered entry animation.

### Hero WebGL2 Shader — Galactic Starfield
**Raw WebGL2 (no Three.js).** Single fullscreen-quad fragment shader. See `initHeroStarfield()` inline in `index.html`.

**Visual layers (rendered per pixel, per frame):**
1. Indigo/violet nebula wash — 2 fbm samples at different scales. Fills the hero with soft cloud atmosphere.
2. Distant galaxy blob — elongated elliptical glow offset to upper-right, tilted 23°, dominant blue-violet.
3. Three star layers — small/dense, medium, rare-bright. Pinpoint stars with per-star sine-wave twinkle.
4. Three shooting-star meteors — staggered 6-second cycles, 1.8s visible each. Head + tapered trail, diagonal down-left.
5. Central lens flare — soft radial + horizontal streak behind the headline.

**Palette:** ONLY cool blues/indigos/violets/whites. **No green in the shader** — brand green is preserved for headline gradient and CTA buttons, which now pop hard against the cool backdrop.

**Guards:**
- Bails if `window.innerWidth < 900` (desktop-only)
- Bails if WebGL2 context can't be acquired (graceful fallback to CSS `.hero::before` + `.warm-wash`)
- **Does NOT bail on `prefers-reduced-motion: reduce`** (intentional; shader is slow ambient drift, no seizure risk). CSS-driven motion (grain, warm-particle, typewriter) still respects reduced-motion via media queries.
- `console.log('[hero-shader] ...')` diagnostics throughout for debugging

**Text readability vignette:** `.hero::before` is now a radial dark overlay (rgba(3,4,10,0.58) at center, fading out). Ensures headline stays legible when meteors or bright stars pass behind it.

## Other Visual Effects (unchanged)
- **Cursor glow** — 20px green radial
- **Cursor trail** — 12 gradient dots
- **Full-page particles** — 60 fixed particles (`.page-particles`)
- **Section particles** — `.particles-container` with `data-count`
- **Warm particles** — 22% of green count, amber-tinted
- **Network canvas** — index.html CTA/contact section ONLY (hero retired). Pages 2–5 still use network canvas in their heroes.
- **Typewriter** — hero subtitle, disabled <900px
- **Grain overlay** — inline SVG noise, 3.5% opacity

## External Libs (CDN, deferred)
- AOS `2.3.4` — all 5 pages
- lottie-web `5.12.2` — index only
- GSAP + ScrollTrigger `3.12.5` — index only
- **Three.js REMOVED** — hero shader now uses raw WebGL2

---

## 🎯 Design Principles (learned from the user this session)

1. **Brand green must POP, not compete.** If the ambient background is also green, the neon loses its punch. Keep shader cool/neutral so CTAs stand out.
2. **Calm + professional, not rave.** Intensity should serve atmosphere, not dominate. When in doubt, dim first, brighten only if too empty.
3. **Galactic > cloud-storm.** Matthias Hurrle's FBM cloud loop (as-is) reads as weather, not space. User rejected that look. Real space = pinpoint stars + distant galaxy + meteors + faint nebula, NOT dense colorful clouds.
4. **Text is always the hero.** Background can have motion but must never wash out the headline. Vignette or dimming layer required.
5. **Reference image direction:** user shared a ChatGPT-generated space image as target — deep-black dominant, pinpoint stars, subtle lens flare, faint nebula. That's the north star.

---

## 🧭 Pending Tasks (confirmed order A → B → C → D)

User confirmed all four; hero color/shader iteration happens first (DONE, current state is galactic indigo starfield).

### A — Before/After comparison section (homepage)
Replaces or expands the existing `.trust-strip` section. Two-column visual:
- **LEFT — "Before AM Systems":** chaos — scattered tool logos (Gmail/Sheets/WhatsApp/Calendly/Notion/Zapier) with dashed red arrows, pain labels. Pain bullets: leads slip, no follow-up, 5 dashboards, 2hr/day admin.
- **MIDDLE:** glowing `VS` chip divider, green arrow traces from left to right on scroll-in.
- **RIGHT — "After AM Systems":** one clean `sys-visual` style card showing Lead Captured → Nurtured → Closed with pulsing dot. Outcome bullets.
- Motion: cards slide in from opposite sides, meet in middle; bullets stagger-fade.
- Needs NO new data from user; I'll use Lucide icons + my own copy.

### B — Site-wide polish (all 5 pages)
- Letter-by-letter headline reveal on every `<h1>` (AOS has support; currently unused).
- Magnetic buttons — cursor within N px of `.btn-primary` pulls it ~6px toward the mouse.
- Scroll progress bar — the `#progress` element already exists in the HTML but is not wired to scroll events.

### C — Placeholder testimonial section (homepage) — **REMOVED 2026-04-22, defer until real quotes exist**
Originally built + shipped as 3 placeholder cards between "Ideal Clients" and "Mini FAQ". User removed them on review: prefers to ship social proof only when real client quotes are available.

**When to re-add:** after wrapping up real engagements (target: next week or once first client delivery is done).

**What to re-add:** The component is ready to drop back in — see git history for `<!-- TESTIMONIALS (placeholder-ready, swap-in later) -->` block in `index.html`. CSS (`.testimonial-grid`, `.testimonial-card`, `.tc-quote`, `.tc-author`, `.tc-avatar`, `.tc-info`, `.tc-name`, `.tc-role`, `.tc-metric`, `.tc-disclaimer`) is still in `index.html` `<style>`. Only the HTML section was removed. Placement: between "WHO IT'S FOR" section (`.forwho-grid` close) and the `<!-- MINI FAQ -->` divider.

**Content to supply when re-adding:** real quotes + name + role + company + outcome metric chip for 3 founders.

### D — PHP/USD toggle + annual savings calc (pricing.html)
- Toggle switches pricing display between PHP and USD (currently both shown inline).
- Savings calc: "Annual retainer equivalent: $X. One-time build with us: $Y. **Year-1 savings: $Z.**"

---

## 🐛 Shader Evolution History — DO NOT revisit rejected approaches

Future Claude: read this before iterating on the hero shader.

| # | Approach | Outcome |
|---|---|---|
| 1 | Original 2D network canvas (85 nodes on hero) | Retired |
| 2 | Three.js Points (scattered green dots) | Felt like twinkling, not warp |
| 3 | Three.js LineSegments (green streaks) | 1px browser line-width limit → too thin |
| 4 | Three.js Instanced quad billboards (green streaks) | Better, still too sparse visually |
| 5 | Matthias Hurrle FBM clouds + 11-iter radial flares, green recolor | **REJECTED** — too dense, "rave lighting" |
| 6 | Same as 5, dimmed 30% | **REJECTED** — still too much green on site overall |
| 7 | Same as 5, recolored to deep-space indigo | **REJECTED** — user said "still feels like cloud-storm, not space" |
| 8 | Minimal starfield (pinpoint stars + faint wisps + lens flare) | **REJECTED** — "too empty, where are the galaxies and meteors?" |
| 9 | **CURRENT** — Galactic starfield with nebula wash + galaxy blob + 3 meteors + lens flare, deep indigo palette | Current version |

**Rules for future shader iteration:**
- ❌ Do NOT reintroduce dense FBM cloud fields (Hurrle-style) — user dislikes "cloud-storm"
- ❌ Do NOT use green/brand colors in the shader — creates green-on-green monotony
- ❌ Do NOT go minimal/empty — user wants visible content (galaxies, meteors)
- ✅ Keep: pinpoint stars, distant galaxy blob, 3 meteors, subtle nebula wash, lens flare
- ✅ Palette: deep indigo/violet with cool-white highlights

---

## 🚨 Gotchas / Operational Notes

### `prefers-reduced-motion` was blocking the shader
User's Mac had System Settings → Accessibility → Display → "Reduce motion" enabled, which made Chrome report `prefers-reduced-motion: reduce`. The original shader init bailed on that media query → shader never mounted → user saw only the fallback CSS particles. User turned the setting off; shader works now. As a safeguard, the shader init **no longer respects `prefers-reduced-motion`** (see rationale in the shader comment block). CSS-driven animations (grain, warm-particle, typewriter) still respect it via media queries.

### Worktree vs main duplicate
Two full working copies of the repo exist side by side:
- `/Users/arvin/Claude/AM Systems/AM Systems Website/` — main branch
- `/Users/arvin/Claude/AM Systems/AM Systems Website/.claude/worktrees/crazy-gates-15a10b/` — `claude/crazy-gates-15a10b` branch (preview server serves this)

The Edit tool is path-sensitive and may write to only one. After any edit, `cp` to sync, then verify with `md5`. Currently MD5-identical as of 2026-04-22.

### Pre-existing uncommitted PNG deltas on main
`Website Images/02-services-thumb-1200x627.png`, `04-pricing-thumb-1200x627.png`, `05-faq-thumb-1200x627.png` show as modified on main. These are pre-existing (not from this session) — **do not touch or commit them without user confirmation.**

### Preview sandbox emulates `prefers-reduced-motion: reduce`
The Claude Preview MCP sandbox Chrome always has this flag set, so the production shader code bails in the sandbox even though the code is correct. To visually verify the shader renders, force-mount it via `preview_eval` with an inline copy of the shader logic. Real user browsers (with Reduce motion off) render the production shader fine.

---

## Architecture Rules (unchanged)
- Every page fully self-contained (inline CSS/JS/SVG). No external CSS except Google Fonts + CDN libs.
- Chatbot is inlined in every HTML file. All `</script` inside chatbot JS must be escaped to `<\/script` or HTML parser breaks.
- SVG icon sprite inlined via `<symbol id="ic-gear">` etc., referenced via `<use href="#ic-xxx"/>`.
- Particle containers use `data-count` for green count; warm particles spawn at 22% of that.

## Rules (user-enforced)
- **NEVER** label anything "POS" or "Point of Sale" (PH BIR regulation) — use "Checkout" / "Store Operations".
- **NEVER** mix AM Systems with AMTS (AM Trading Society).
- Storage: everything lives in `/Users/arvin/Claude/` on this Mac (was `D:\Claude\` on previous Lenovo).
- User prefers direct execution, no confirmation loops.
- Keep `#39FF14` neon primary — never replace, never mute.

---

**To resume work in a new session:** Read this file first, then `HANDOFF.md` in the project root. The hero shader is the current focus-point of iteration. Open tasks are A → B → C → D above.
