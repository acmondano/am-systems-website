# AM Systems Website — Session Context

## What This Is
The AM Systems 5-page marketing site. Static HTML, self-contained (no build step). Dark neon-cyber aesthetic with a **"cozy shell"** warm ambient layer added 2026-04-18.

## File Location
`D:\Claude\AM Systems\AM Systems Website\`

## Files
- `index.html` — Homepage (hero, trust strip, stats, 3 system cards, ideal clients, mini FAQ, CTA)
- `services.html` — Tabs: Lead Engine / Sales Engine / Business OS
- `pricing.html` — Tier cards (Starter/Growth/Full Build for Lead+Sales; Foundation/Full System/Enterprise for BOS) + comparison table
- `portfolio.html` — Featured Store Ops case (real) + 2 placeholders
- `faq.html` — 4-step process, 11-step engagement, timeline, FAQ accordion, contact section
- `am-systems-tour.gif` — Store Ops walkthrough (featured in portfolio)
- `ams-logo.png` — Transparent AM monogram (nav/footer/favicon)
- `chatbot.js` — Self-contained chatbot (also inlined into every HTML)
- `AM Systems — Store Operations Blueprint.pdf` — Business OS product doc
- `.claude/launch.json` — Preview config (python -m http.server on :5501)

## Brand System (CANONICAL)
- **Primary green:** `#39FF14` neon — NOT `#4ade80`, NOT emerald, NOT muted. User strongly prefers neon
- **Background:** `--dark: #050505`
- **Surfaces:** `--surface: #090909`, `--surface2: #0d0d0d`
- **Border:** `--border: #1a1a1a`
- **Text:** `--text: #a8a8a8`, `--muted: #444`, `--white: #ededed`
- **Warm accents (cozy shell):** `--warm: #ffd98a`, `--warm-amber: rgba(255,180,110,0.045)`, `--cream-wash: rgba(255,229,176,0.05)`
- **Spring easing:** `--spring: cubic-bezier(.2,.7,.2,1.1)`
- **Typography:** Inter 300–900 from Google Fonts
- **Gradient text:** `.grad-text` = `linear-gradient(135deg,#39FF14,#00e676,#b2ff59,#ffffff)`

## Three Service Tiers
### 1. Lead Engine — ₱30,000 – ₱60,000 (~$515–$1,030 USD)
Turn traffic into qualified leads. **Delivered with GoHighLevel.**
Landing pages, lead capture, CRM, email automation, analytics.

### 2. Sales Engine — ₱80,000 – ₱150,000 (~$1,375–$2,580 USD)
Turn leads into paying clients. **Delivered with GoHighLevel + n8n.**
Funnels, email/SMS sequences, booking, pipelines, dashboards.

### 3. Business OS — ₱150,000 – ₱400,000+ (~$2,580–$6,880 USD)
Store Operations & Inventory System. **Delivered with MAD Store Ops (Next.js).**
One-time build, client owns it forever, no monthly SaaS fee.

## Visual Effects (all pages unless noted)
- **Cursor glow** — 20px circle with radial green gradient, no lerp
- **Cursor trail** — 12 gradient-colored dots with 1.2s fadeout
- **Full-page particles** — 60 fixed particles drift viewport-wide (`.page-particles`)
- **Section particles** — hero/CTA/trust `.particles-container` with `data-count`
- **Warm particles** — ~22% of green count, amber-tinted, box-shadow glow (added 2026-04-18)
- **Network canvas** (index only) — hero 85 nodes, CTA 45 nodes
- **Typewriter** — hero subtitle, disabled <900px
- **Hero radial glow** — deep green spotlight via `.hero::before`
- **Warm wash** — radial cream + amber behind each hero/CTA (added 2026-04-18)
- **Grain overlay** — inline SVG noise, 3.5% opacity, `mix-blend:overlay` (added 2026-04-18)
- **Softer hover glows** — cards/buttons cast dual green+warm shadow with springy easing (added 2026-04-18)
- **Focus rings** — amber outline on keyboard focus, real a11y fix (added 2026-04-18)

## External Libs (CDN, added 2026-04-18)
All loaded `defer`, graceful-degrade if CDN fails:
- **AOS** (`aos@2.3.4`) on all 5 pages — ready for `data-aos` attrs
- **lottie-web** (`lottie-web@5.12.2`) on index only — drives 2-ring pulse in CTA section
- **GSAP + ScrollTrigger** (`gsap@3.12.5`) on index only — 6% parallax on hero `.sys-visual` at >1100px

Total weight added: ~100 KB gz on index, ~3 KB gz on other pages.

## Reveal System
- Legacy: vanilla `.fade-up`, `.stagger-child`, `.visible` via IntersectionObserver — KEPT working
- AOS is loaded but NOT applied to existing reveal nodes (would double-animate). Use `data-aos` on new elements only.

## Current Page State

### index.html
- Hero: "Systems That Turn / *Attention Into Revenue.*"
- Trust strip: 3 blocks
- Stats: 4 animated counters (via existing `cntObs`)
- Three system cards: icon + name + tagline (no prices/buttons on cards)
- Single CTA row: "How It Works →" + "See Full Pricing Breakdown →"
- Ideal Clients (4 cards), Mini FAQ (4 items), CTA section with Lottie pulse
- REMOVED (earlier sessions): "What Changes", "Why AM Systems", "Delivery Guarantee"

### services.html
- 3 tabs. Each: left column (icon/name/tagline/price/CTAs) + right (Problem + Outcome stacked)
- Tool stack in taglines: "Powered by GoHighLevel" / "GoHighLevel + n8n" / "MAD Store Ops"
- REMOVED earlier: "What You Get" boxes, Store Ops 8 modules box

### pricing.html
- 3 tabs (Lead/Sales/BOS), tier cards, Delivery Guarantee, Add-ons grid, comparison table

### portfolio.html
- Featured: real MAD Store Ops case (4-branch retail, uses tour GIF)
- Case 1: Lead Engine placeholder
- Case 2: Sales Engine placeholder
- REMOVED earlier: Case 3 (BOS placeholder), Coming Soon banner, Video Proof banner

### faq.html
- 4-step process timeline, 11-step engagement sequence, timeline cards matching pricing, FAQ accordion, contact section (WA/Email/Call)
- REMOVED earlier: Communication Flow section

## Architecture Rules
- Every page is fully self-contained (inline CSS/JS/SVG). No external CSS except Google Fonts + CDN libs.
- **Chatbot is inlined** in every HTML file. All `</script` inside the chatbot JS must be escaped to `<\/script` or the HTML parser breaks.
- **SVG icon sprite** inlined via `<symbol id="ic-gear">` etc., referenced via `<use href="#ic-xxx"/>`
- Particle containers use `data-count` for green count; warm particles spawn at 22% of that.

## Verified Runtime (2026-04-18)
- Desktop 1440×900: all 5 pages clean
- Mobile 375×812: all 5 pages clean, no horizontal scroll (body has `overflow-x:hidden`)
- Lottie shrinks to 110px on mobile via media query
- GSAP parallax disabled under 1100px viewport
- Grain + warm-wash + Lottie all disabled under `prefers-reduced-motion:reduce`
- Zero console errors on all pages

## Rules (user-enforced)
- **NEVER** label anything "POS" or "Point of Sale" (PH BIR regulation) — use "Checkout" / "Store Operations"
- **NEVER** mix AM Systems with AMTS (AM Trading Society)
- Storage: everything lives in `D:\Claude\` — not C:
- User prefers direct execution, no confirmation loops
- Keep `#39FF14` neon primary — never replace it, never mute it

## Known Pending Items
- Real portfolio cases (waiting on completed projects)
- Chatbot externalization for hosted deployment (file:// needs inlined, GitHub Pages wouldn't)
- Footer on mobile: "Book a Call" link truncates on ~375px — pre-existing layout issue, not urgent

## Plan File
Current session's plan saved at: `C:\Users\USER\.claude\plans\am-systems-website-cozy-shell.md`

---

**To resume work in a new session:** Read this file. The website is in a polished, mobile-verified deployable state with a warm ambient layer over the neon-cyber base. Any further work should be additive.
