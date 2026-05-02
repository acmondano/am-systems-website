# HANDOFF — Next Claude Session

**Last updated:** 2026-05-02 night (Phase 7 GHL UI prep + smoke test ALL DONE — only the code-side widget swap is left 🟢)

> 🟢 **PHASE 7 GHL PREP IS COMPLETE (2026-05-02 night).** Pre-Phase-7 GHL UI tasks 1, 2, 3 are all DONE and the pre-push smoke test passed 4/4 (contact + Bottleneck custom field populated + opp at New Lead + reminder queued). Booking surface is now the GHL Discovery Call calendar at `https://api.leadconnectorhq.com/widget/bookings/discovery-call-ams` (slug `discovery-call-ams`). **Calendly is retired.** Smoke test data already cleaned from GHL. Workflow ID `9ipSydW4m2pZig3R` is the direct-booker opportunity creator; bottleneck custom field ID is `AmXXFbYYaS5bzB0fJq3D`.
>
> Earlier-this-day v1.1 milestone (preserved for context): SDR Agent inbound bot bundle is COMPLETE — three fixes (Option (a) NO CONTACT CAPTURE prompt rule, booking-link toggle, widget pre-chat form via Sites → Chat Widgets → Chat Window → Live Chat Assigned → Enable Contact Form toggle). E2E verified via contact `I0ts6w0GMUNIF1sOXnIq` (Observe Shoe). Tags + opp + booking + identity all on ONE record per lead. Lessons banked as #18, #19, #20 in n8n project's `reference_ghl_workflow_architecture.md`.
>
> **What to do this session:** read `SDR_AGENT_INTEGRATION.md` for the step-by-step Phase 7 execution plan. Extract `chatbot.js` → Products folder → swap GHL widget snippet across 5 HTML files → delete `chatbot.js` here → local verify → stage + show diff → wait for Arvin's per-batch go-word → push → live verify on `acm-systems.netlify.app`. Per `feedback_push_discipline.md`, NEVER push without an explicit per-batch authorization.
>
> **CRM cleanup status:** smoke test contacts/opps/appointments already deleted by Arvin (2026-05-02 night). Earlier 17-test-contact bulk cleanup may still be partially pending — verify in GHL UI before Phase 7 live verification if you care about a totally clean pipeline view.

## Read FIRST
1. MEMORY.md in `/Users/arvin/.claude/projects/-Users-arvin-Claude-AM-Systems-AM-Systems-Website/memory/` — auto-loaded. Especially:
   - `project_services_color_system.md` — the tri-color accent tokens
   - `project_service_icon_exclusivity.md` — gear/$/cpu reserved for Lead/Sales/BOS only
   - `project_faq_default_tab.md` — faq.html defaults to FAQ content, not Process
   - `feedback_push_discipline.md` — NEVER push without a per-batch go-word
   - `project_deploy_target.md` — live URL is `acm-systems.netlify.app` (Netlify)
2. This file

## Current state
Live at https://acm-systems.netlify.app. All session work is merged to main and deployed.

## What shipped in this session (2026-04-22 — surgical color + icon exclusivity batch)

### Surgical per-service accents applied
Tri-color palette applied ONLY to elements that visually represent a specific service. Brand green `#39FF14` stays on logo, nav, headlines, global CTAs.

Palette: Lead Engine=violet `#a78bfa` · Sales Engine=amber `#ffb066` · Business OS=cyan `#5fa8ff`

- **index.html**
  - 3 `.sys-card` ("Three Systems" grid) → each card + icon + hover border accent-colored per service
  - `.forwho-range` chips → service names wrapped in colored spans (multi-service rows like "Lead Engine + Sales Engine" use two colors); arrow/plus stay muted
  - `.sv-emoji` icon tiles in HOW IT WORKS → ICON TILES ONLY accent-colored. Names, taglines, and `.sv-badge` pills (Traffic → Leads, Leads → Clients, Operations) stayed brand green per Arvin's explicit callback ("let this stay as green")
  - `.trust-block` outcome trio (Capture Every Lead / Convert More Clients / Scale Without Chaos) → icons swapped to uniform gear/$/cpu + per-service accent color
- **pricing.html**
  - Old pill `.tab-nav` replaced with 3 compact `.svc-tile` pill buttons (border-radius 100px, ~40px tall, matching currency-toggle size). Active state: solid accent pill with filled black-on-accent icon (mirrors the PHP/USD green pill behaviour). Placed directly below the PHP/USD currency toggle
  - Per-pane accent tokens scope Lead/Sales/BOS — flow through offer-icon-wrap, `.tier.pop` border + gradient + badge, `.tier-features li::before` check marks, `.tier-who` left border, `.tier.pop .tier-cta` bg, hover states
  - Tab switcher now syncs `aria-selected` on click (accessibility)
  - `switchTab()` guarded against undefined `event` for programmatic calls
- **portfolio.html** — 3 `.case-system-tag` chips colored per service (BOS featured=cyan, Lead=violet, Sales=amber)
- **faq.html** — 3 `.tl-card` timeline cards accent-colored (`.tl-system` label + `.tl-duration` number + hover border). Inline `<strong class="svc-*">` service mentions in answer bodies colored per service (had to bump specificity past `.faq-answer-inner strong{color:white}`)
- **services.html** — removed the inline `style="color:var(--green)"` overrides on the 3 `.service-icon-wrap` elements so SVG icons inherit `var(--accent)` from their parent

### Icon exclusivity enforced
`ic-gear` / `ic-dollar` / `ic-brain` are now reserved ONLY for Lead/Sales/BOS callouts across the entire site. Swapped non-service uses:
- faq.html "System Design" process step: `ic-brain` → `ic-clipboard`
- faq.html "Build & Automate" process step: `ic-gear` → `ic-wrench`
- faq.html "Fee structure" info-card: `ic-dollar` → `ic-chart`
- pricing.html "CRM Upgrade" addon: `ic-brain` → `ic-user`
- index.html trust-three outcome blocks: fixed icon-to-service mapping (was target/dollar/gear mismatched → now gear/dollar/cpu matching Lead/Sales/BOS)

### FAQ page default tab flipped
`faq.html` now lands on Frequently Asked Questions by default (was Our Process). `faq.html#process` still reaches the process timeline; `faq.html#faq` and `faq.html#q1..q9` continue to work. Fixed latent bug in `switchTab(tab, el)` that called `event.preventDefault()` on an undefined global when invoked from hash routing — now uses `ev = ev || (typeof event !== 'undefined' ? event : null)` and guards the preventDefault call.

## PENDING — hero CTA simplification question
Arvin asked whether to remove "Book a Free Strategy Call" + "View Pricing" from the index hero since they duplicate nav links. Gave this recommendation (awaiting decision):

- **Keep the primary** (`Book a Free Strategy Call`) — hero CTA is the single most valuable action on the site; nav CTAs are passive navigation, not above-the-fold conversion triggers.
- **Swap the secondary** (`View Pricing`) → `See How It Works →` that smooth-scrolls to `#how-it-works`. Pricing is a late-funnel CTA already accessible via nav; early visitors who aren't ready to book benefit more from a self-education path down-page.
- Alternative secondaries if Arvin prefers proof-first: `See What We Built →` (→ portfolio.html) or `How It Works →` (→ services.html).

Next session: wait for Arvin's cue on which secondary swap (or to leave hero as-is).

## Recurring rules to respect
- **Never push without a per-batch go-word.** One "push now" does not authorize the next push. See `feedback_push_discipline.md`.
- **Brand green `#39FF14` is the site primary.** Not `#4ADE80`, not `#22a44e`.
- **Per-service accents are surgical, not global.** Only elements visually representing a specific service get accent-coloured. Brand green stays on logo/nav/headlines/global CTAs.
- **Service icons are exclusive.** gear/$/cpu only ever represent Lead/Sales/BOS. For other purposes use clipboard/wrench/chart/user/target/etc.
- **FAQ default tab is FAQ.** Not Process. `faq.html#process` for the process timeline.
- **Mobile is Netlify-deployed too.** `display:none` CSS rules for hero/animations on mobile were the wrong answer — lower DPR / simpler fallback is the right one.
- **Preview sandbox emulates `prefers-reduced-motion: reduce`** — shader and reveal animations may test as "invisible" in eval but render fine in real browsers.

## Netlify preview cache gotcha
When verifying behaviour changes live on the preview server, append `?v=<timestamp>` to the URL to bypass stale JS/CSS cache. Without cache-busting, hash-routing changes and JS function replacements won't execute the new code on the first reload.
