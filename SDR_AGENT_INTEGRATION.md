# SDR Agent Integration — Phase 7 PREP COMPLETE, Code Push Cleared 🟢

**Last updated:** 2026-05-02 night (Phase 7 GHL UI prep DONE + smoke test 4/4 passed)

> 🟢 **2026-05-02 evening update:** Pre-Phase-7 GHL UI tasks 1, 2, 3 are ALL DONE. Smoke test PASSED (4/4 criteria via direct calendar URL `api.leadconnectorhq.com/widget/bookings/discovery-call-ams` → contact + bottleneck custom field + opp at New Lead + reminder queued). The chatbot.js → SDR widget swap on the 5 HTML files is the only remaining Phase 7 work. **Calendar = GHL Discovery Call (slug `discovery-call-ams`) — Calendly is retired.**

This file is the authoritative Phase 7 execution plan for replacing `chatbot.js` with the GHL SDR Agent chat widget across the AM Systems website. Source-of-truth specs and build logs still live at `/Users/arvin/Claude/n8n/Projects:workflows/sdr-agent/`.

---

## 🟢 STATUS — v1.1 COMPLETE, Phase 7 GO

**SDR Agent v1.1 is COMPLETE as of 2026-05-02.** Three-fix bundle landed and verified end-to-end:

1. ✅ **Option (a) NO CONTACT CAPTURE prompt rule** — bot stops asking for name/email/phone during conversation. Resolves race condition (lesson #18 — bot Trigger a Workflow blocks failed to fire when bot completed contact-info capture mid-conversation).
2. ✅ **Booking-link toggle** — Bot Goals → Appointment Booking action → Step 2 Advanced Options → ☑ "Don't book appointment (only send the booking link)". Calendar widget enforces email+name+phone at booking time.
3. ✅ **Widget pre-chat form** — Sites → Chat Widgets → AM Systems SDR Agent → Chat Window tab → **Live Chat Assigned → Enable Contact Form** toggle = ON. Captures Name + Email + consent BEFORE bot conversation starts. Resolves dedup gap (lesson #19 — booking form matched by email split bot tags from booking across two contacts).

**E2E verification (2026-05-02 ~07:25–07:28 Manila) — contact `I0ts6w0GMUNIF1sOXnIq` "Observe Shoe":**

| Check | Result |
|---|---|
| Pre-chat form gates conversation | ✅ Form fires in fresh incognito (Name/Email/consent required) |
| Identity captured BEFORE bot | ✅ Real name/email/phone on contact (not guest visitor) |
| B1 fires on identified contact | ✅ tag `tier-fit-lead-engine` |
| B4 fires on identified contact | ✅ tag `timeline-urgent` |
| T11 move-opp-to-qualified Create branch | ✅ Opp `hqf1jVwU91zHvDSXgyLG` at Qualified, status open |
| Bot sends booking LINK | ✅ `api.leadconnectorhq.com/widget/booking/...` |
| Calendar form pre-fills email + name + phone | ✅ |
| Booking confirmed | ✅ Tue May 5 2026, 1:00 PM Manila |
| ONE contact per lead (no orphan guest visitor) | ✅ |

---

## ⚠️ Pre-Phase-7 GHL UI tasks (manual — Arvin does these BEFORE the code push)

These 3 tasks land in GHL before Phase 7 ships. They're config-side (no code changes here), but they prevent funnel gaps once the swap goes live. **Do all 3 before pushing Phase 7.**

### Task 1 (HIGH) — Wire opp creation for direct bookers (~10 min) ✅ DONE 2026-05-02

**Status:** Workflow `9ipSydW4m2pZig3R` published. Smoke test verified opp `AN7QsXoslpVBpNvtImJW` lands at New Lead stage `930e6907-fd05-4eff-baaa-05ff5364e1b2`. Find-Opp dedup logic confirmed working — workflow fires twice on a single booking (ContactCreate + AppointmentBooked) but produces ONE opp.

**Why:** GHL Calendars don't have a native "auto-create opportunity" toggle (verified 2026-05-02 — the calendar settings Quick tip explicitly says "For advanced automation, use Workflows with Appointment Booked trigger"). Without this, a visitor who skips the chat widget and books directly creates a contact + appointment but **NO opportunity in pipeline**. Sales sees a booked Discovery Call with no record in pipeline view.

**How:**
1. GHL → Automation → Workflows → open `SDR Agent Event Bridge — AppointmentBooked` (workflow ID `198c2974-7953-4cb9-a7c8-9beed96bcc13`)
2. Edit. Add this action chain in parallel with the existing Custom Webhook action:
   - **Find Opportunity** — Pipeline = AM Systems Sales, mode = "Most recently created opportunity"
   - From Find Opp's **"Opportunity Not Found"** branch → **Create Opportunity**:
     - Pipeline = AM Systems Sales
     - Pipeline Stage = New Lead
     - Opportunity Name = `{{contact.name}}`
     - Status = Open
   - From Find Opp's **"Opportunity Found"** branch → End (no-op — the bot's flow already created an opp at Qualified, don't dup)
3. Publish.
4. Verify: book a test appointment via the direct calendar URL `https://api.leadconnectorhq.com/widget/bookings/discovery-call-ams` (skip widget chat) → confirm new opp at New Lead lands in pipeline (use `mcp__ghl-mcp__opportunities_search-opportunity` filtered by pipeline + stage = New Lead UUID `930e6907-fd05-4eff-baaa-05ff5364e1b2`).

### Task 2 (MEDIUM) — Add 1 dropdown qualification question to Discovery Call form (~5 min) ✅ DONE 2026-05-02

**Status:** Custom contact field `AmXXFbYYaS5bzB0fJq3D` (label "Bottleneck") created with options Getting leads / Converting leads / Operations / fulfillment / Something else. Wired into the Discovery Call calendar's form. Smoke test populated value "Getting leads" on contact `gyXeLdyF0Wcp1NwKcsYt` (since deleted as test data). Field is queryable via `mcp__ghl-mcp__contacts_get-contact` → `customFields[].id == AmXXFbYYaS5bzB0fJq3D`.

**Why:** Direct bookers skip the bot's qualification questions. Adding 1 dropdown gives sales a hint about the prospect's bottleneck before the call — and the answer lands as a contact custom field, queryable via ghl-mcp.

**How:**
1. GHL → Calendars → Discovery Call → Form & confirmation → Custom fields
2. Add a custom dropdown field:
   - Label: `What's your biggest bottleneck right now?`
   - Options: `Getting leads` / `Converting leads` / `Operations / fulfillment` / `Something else`
   - Required: yes
3. Save.
4. Verify: submit a test booking → check the contact's detail page in GHL → confirm the custom field is populated with the answer.

### Task 3 (MEDIUM) — Enable Reminder + Cancellation notifications (~3 min) ✅ DONE 2026-05-02

**Status:** Reminder Email enabled @ 1h + 24h before. Cancellation + Reschedule Email enabled. Appointment booked (Confirmed) Email also enabled so prospects get a booking confirmation. Smoke test verified Reminder is Email-enabled — auto-queues on booking. **Deferred to v1.2:** Cancellation/Reschedule LINK expiration timer (the 120-minute cutoff) — that setting lives in the Booking Widget tab, separate from Notifications. Not a smoke test blocker.

**Why:** Currently disabled per 2026-05-02 audit. Reminder drives show-up rate. Cancellation confirmation reduces "did my cancel actually go through?" support questions.

**How:**
1. GHL → Calendars → Discovery Call → Notifications & policies
2. **Reminder:** click pencil → enable Email channel → set both 24 hours before + 1 hour before
3. **Cancellation:** click pencil → enable Email channel → enable for both Attendee and Owner (arvinmondano)
4. (Optional) **Reschedule:** same as Cancellation
5. **Cancellation/reschedule link expiration** (Notifications & policies tab → Cancellation and reschedule policy section): set both to `120` Minutes (prevents last-minute cancels)

### Pre-push smoke test (5 min — gates the Phase 7 push) ✅ PASSED 2026-05-02

**Receipts:** booking via direct calendar URL `https://api.leadconnectorhq.com/widget/bookings/discovery-call-ams` for May 4 2026 10:00 AM Asia/Manila → contact `gyXeLdyF0Wcp1NwKcsYt` created with `customFields[0].value = "Getting leads"` → opp `AN7QsXoslpVBpNvtImJW` at New Lead → calendar event `FpSAvKHPe10NT9TPapNU` confirmed → Reminder notifications queued automatically. n8n executions `57` + `58` (workflow `9ipSydW4m2pZig3R`) both succeeded; dedup logic verified. Test data has been cleaned out of GHL.

After Tasks 1-3 are saved, do a smoke test BEFORE the code-side Phase 7 push:

1. Open `https://api.leadconnectorhq.com/widget/bookings/discovery-call-ams` in fresh incognito (NOT the site, just the direct calendar URL — simulates the chat-skip path)
2. Fill the form including the new dropdown question with a fresh test email like `amsystemsph+phase7-prep@gmail.com`
3. Submit
4. Verify all 4:
   - ✅ Contact created with the bottleneck custom field populated
   - ✅ Appointment scheduled
   - ✅ Opp created at **New Lead** stage in AM Systems Sales pipeline (NOT Qualified — that's the bot's path)
   - ✅ Reminder email queued (check via the appointment's detail view in GHL)

If all 4 pass → you're cleared to push Phase 7. If any fail → fix the failing GHL config before code push.

---

## STEP-BY-STEP PHASE 7 EXECUTION PLAN

### Pre-flight — git safety per `/Users/arvin/Claude/CLAUDE.md`

```bash
cd "/Users/arvin/Claude/AM Systems/AM Systems Website"
git status                  # confirm "Your branch is up to date with 'origin/main'"
git log --oneline -5
```

If behind origin: `git stash --include-untracked && git pull --ff-only && git stash pop`. **Do NOT edit until clean + up-to-date.**

**Note:** 2 uncommitted files exist (HANDOFF.md modified + SDR_AGENT_INTEGRATION.md untracked) from the n8n cross-pollination flow. They WILL be committed as part of the Phase 7 batch — don't discard them.

### Step 1 — Extract `chatbot.js` to Products folder (preserves entry-tier offering)

```bash
mkdir -p "/Users/arvin/Claude/AM Systems/Products/Entry-Tier Chatbot"
cp chatbot.js "/Users/arvin/Claude/AM Systems/Products/Entry-Tier Chatbot/chatbot.js"
```

Per the two-tier strategy (in `feedback_chatbot_service_positioning.md`): Entry-Tier Chatbot at ₱15K-₱50K is sold separately to clients; SDR Agent is bundled with Sales Engine and lives on AM Systems site. Extracting preserves it as a deployable client offering.

If `chatbot.js` references its own CSS or config files, copy those too.

### Step 2 — Read the source widget snippet

`/Users/arvin/Claude/n8n/Projects:workflows/sdr-agent/webhook-snippet.html` is the GHL widget loader. Widget ID `69f14a984215935be30d98c3` is already populated.

### Step 3 — Find all `chatbot.js` references

```bash
grep -rn "chatbot\.js" --include="*.html" .
```

Expected hits in: `index.html`, `services.html`, `pricing.html`, `portfolio.html`, `faq.html`.

### Step 4 — Replace in each HTML file

For each file with a `chatbot.js` reference:
- Locate the `<script src="chatbot.js">` (or equivalent inclusion line)
- Replace with the contents of `webhook-snippet.html`
- Remove any DOM nodes / inline CSS that the original `chatbot.js` injected and the GHL widget makes redundant

Watch for chatbot-specific CSS leftovers — they'll be dead code after this swap.

### Step 5 — Delete `chatbot.js` from this folder

```bash
rm chatbot.js
```

It now lives in the Products folder. This folder no longer needs it.

### Step 6 — Local verification BEFORE pushing

Open `index.html` in a local browser (or `python3 -m http.server` for relative-URL safety) and verify:
- Chat bubble appears in bottom-right (#10B981 brand green per Phase 2 setup)
- Click bubble → pre-chat form fires (Name + Email + consent)
- Fill form with a test email → bot opener fires
- Browser console: no errors related to widget loader

### Step 7 — Stage + commit + WAIT FOR ARVIN'S GO-WORD before pushing

```bash
git add chatbot.js index.html services.html pricing.html portfolio.html faq.html HANDOFF.md SDR_AGENT_INTEGRATION.md
git status
git diff --cached
```

**STOP. Show Arvin the staged changes. Per `feedback_push_discipline.md`, NEVER push without an explicit per-batch go-word.** Prior session's authorization does NOT carry over.

After Arvin's "push" / "go" / "ship":

```bash
git commit -m "$(cat <<'EOF'
feat: Phase 7 — replace chatbot.js with SDR Agent widget

Swaps the entry-tier chatbot for the GHL SDR Agent chat widget across
all 5 site pages. Entry-tier chatbot extracted to /Products/ as
productizable offering. SDR Agent v1.1 bundle (race + dedup fixes)
verified e2e on 2026-05-02 before this swap.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
git push origin main
```

Netlify auto-deploys on push to main.

### Step 8 — Live verification on `acm-systems.netlify.app`

Wait ~1-2 min for Netlify deploy. Then in fresh incognito:

1. Open `https://acm-systems.netlify.app`
2. Click chat bubble → expect pre-chat form (Name + Email + consent gate)
3. Submit form: any name + `amsystemsph+phase7-live@gmail.com`
4. Run Lead Engine + urgent qualification:
   - Q1: `I want to get more leads`
   - Q2: `Established service business, around 3 leads/month right now, hoping for 10+/month`
   - Q3: `This month`
5. Bot classifies Lead Engine + urgent → sends booking link → calendar form pre-fills email → submit → "Your Meeting has been Scheduled"

Then verify via `ghl-mcp` (available in this folder per `reference_ghl_mcp_install.md`):

```
mcp__ghl-mcp__contacts_get-contacts query="phase7-live"
mcp__ghl-mcp__opportunities_search-opportunity query_contact_id=<id>
```

Expect:
- Contact has tags `tier-fit-lead-engine` + `timeline-urgent`, identity captured pre-bot
- New opp at Qualified
- Appointment scheduled

**If verification passes:** Phase 7 DONE. Phase 8 (Calendly retirement) and Phase 5b (nurture workflows) and Phase 10 (templatization) all unblocked.

**If verification fails:** Don't fix-forward without re-verification. Revert with `git revert HEAD` (with explicit Arvin approval), debug locally, retry the batch.

---

## 🧹 GHL Cleanup Task (Arvin's manual UI work — not a Phase 7 blocker but cleaner)

Bulk-delete these 17 test contacts in GHL UI to start Phase 7 verification with a clean CRM state:

**12 build-artifact contacts (created during SDR Agent build sessions):**
```
W0LOGvrEkUN34CbI4g4W
m1s1kYC3qZU2jdBK7fal
eB9r5PIrerwZOPkOjEkd
eCn39XwlmOXx3Yk6cjcf
Ns0bQkSFKNNsUtAIUfo4
QJ56OQ0MsaACj11ypzHp
NBXpftm17QoXt7zU8e1i
6CTy5lm9Y19u1yt4qLwS
ViOlZILXZRW3vShpGjbi
7Qe0V5hgIG7KLuAEcCwR
I0ts6w0GMUNIF1sOXnIq
Hv5EWk8syAzf36DlV1E7
```

**5 GHL `(Example)` demo seed contacts (came with the workspace, polluted with test tags):**
```
eA1LZMlZvIr1kIcgbnNz   (Example) Casey Morgan
T2FVnDTyfHTwjW9wiHnv   (Example) Alex Carter
lSyCbOsFEVK5I6oGYYFi   (Example) Jordan Smith
JWBPVWRB23EsPxcAhTgB   (Example) Taylor Reynolds
WlbqsI94ffO9Z55PgVh0   (Example) Riley Bennett
```

**How:** GHL UI → Contacts → multi-select all 17 → bulk Delete. Cascade-deletes their opportunities, conversations, and appointments.

**MCP constraint banked:** `mcp__ghl-mcp__contacts_remove-tags` returns 422 (tag array marshalling validation bug). Manual UI is the only path. Don't waste time scripting it.

After deletion, GHL is empty — Phase 7 live verification creates the first real contact, easy to spot.

---

## v1.1 Architectural Lessons (read these before any future client SDR Agent deployment)

These are GHL platform constraints discovered during v1.1. They apply to ANY GHL Conversation AI bot deployment, not just AM Systems' SDR Agent. Full details in `/Users/arvin/.claude/projects/-Users-arvin-Claude-n8n/memory/reference_ghl_workflow_architecture.md`.

| # | Lesson | Fix |
|---|---|---|
| 18 | Race condition: bot Trigger a Workflow blocks fail when bot captures contact info mid-conversation | NO CONTACT CAPTURE prompt rule (Option (a)) |
| 19 | Contact dedup gap: booking form email-match splits tags from booking across two contacts | Widget pre-chat form |
| 20 | Pre-chat form gated by Live Chat Assigned → Enable Contact Form toggle (NOT Title & Intro → Contact Form Options, which is decorative in bot mode) | Toggle the right thing |

---

## SDR Agent infrastructure pointers (read-only references)

- **Bot URL:** `https://app.gohighlevel.com/v2/location/QsQDDWilhgo59wbt3voU/ai-agents/conversation-ai/agent/P8IOegGa0rE6O5UGmJaV`
- **Pipeline:** AM Systems Sales (`Ap3ndt8xms1SnCQhFTnW`) — 6 stages: New Lead → Qualified → Booked → Showed → Closed Won → Closed Lost
- **Discovery Call calendar:** slug `discovery-call-ams`, ID `DWFy4K8bLYjDmvsUCW7f`
- **Widget ID:** `69f14a984215935be30d98c3` (in `webhook-snippet.html` from n8n project folder)
- **n8n side-car workflow:** `9ipSydW4m2pZig3R` on `https://n8n.srv1616991.hstgr.cloud`
- **n8n project memory namespace:** `/Users/arvin/.claude/projects/-Users-arvin-Claude-n8n/memory/`
- **n8n project folder:** `/Users/arvin/Claude/n8n/Projects:workflows/sdr-agent/`
- **GHL MCP:** confirmed installed for both n8n CWD and main `/Users/arvin/Claude` CWD per `reference_ghl_mcp_install.md` (same PIT)

---

## Quick status snapshot

| Phase | Status |
|---|---|
| 0 — Pre-flight | ✅ DONE |
| 1 — Airtable schema | ✅ LIVE |
| 2 — GHL Conversation Agent | ✅ DONE |
| 3 — GHL Webhook Bridge | ✅ CLOSED |
| 4 — n8n side-car | ✅ LIVE + TESTED |
| 5a — Utility workflows + bot config | ✅ COMPLETE 2026-05-01 |
| 5b — Nurture workflows | ⏳ deferred (separate cycle, write nurture copy informed by real bot conversation data) |
| 6 — Pipeline colors | ✅ DONE |
| **v1.1 fix bundle (race + dedup)** | ✅ **COMPLETE 2026-05-02** |
| **7 — Website integration** | 🟢 **READY TO EXECUTE — this folder, this session** |
| 8 — Calendly retirement | ⏳ pending (post-Phase-7) |
| 9 — Testing & rollout | ⏳ pending (post-Phase-7) |
| 10 — Templatization for client deployments | ⏳ pending (post-Phase-7) |

---

## Update history

- **2026-05-02 evening** — Phase 7 unblocked. v1.1 COMPLETE. Three-fix bundle verified e2e via contact Observe Shoe. This file rewritten for execution.
- 2026-05-02 morning — TLDR + dedup gap added. Phase 7 still gated.
- 2026-05-01 — Phase 5a complete + Stage 2 race condition lesson banked. Phase 7 deferred pending v1.1.
- 2026-04-29 — Initial cross-pollination from n8n session. Phase 5a in progress.
