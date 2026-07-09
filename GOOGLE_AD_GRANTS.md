# Google Ad Grants — Compliance & Setup Checklist

_Last updated: 2026-07-04_

Google Ad Grants gives eligible nonprofits **$10,000/month** in free Google Search
ads. This doc tracks what's already handled on the site and the few items that
need action in external dashboards (Google for Nonprofits, GA4, Google Ads).

---

## 1. Eligibility (do this first)

- **Nigeria is supported** by Google for Nonprofits. ✅
- **Validation via Goodstack (formerly TechSoup/Percent):** Google now validates
  Nigerian nonprofits through **Goodstack**. You'll need the CAC registration —
  **`IT No. 6980735`** (Association with Incorporated Trustees — an eligible
  structure). Validation typically takes ~3–5 business days.
- **Do NOT pre-create a paid Google Ads account.** Create the Ads account only
  through the Google for Nonprofits → Ad Grants activation flow, or you'll end up
  with a billing-enabled account that Ad Grants can't attach to.
- Government entities, hospitals, and schools are ineligible — a youth-development
  NGO is fine.

**Steps:** google.com/nonprofits → enrol org → verify with Goodstack (CAC number)
→ activate "Google Ad Grants" → follow the guided Ads account creation.

---

## 2. Website policy (Google reviews the site) — STATUS

| Requirement | Status |
|---|---|
| Own the domain (`kidsinspiringnation.org`) | ✅ |
| **HTTPS** across the site | ✅ (GitHub Pages TLS) |
| Clear description of mission / what the org does | ✅ (homepage hero + About) |
| No commercial/deceptive content; nonprofit purpose clear | ✅ |
| Functional, no broken links, loads reasonably fast | ✅ — heavy images removed (see §5) |
| A privacy policy | ✅ `/privacy` |
| Contact information | ✅ `/contact` |
| Sitemap + robots for crawlability | ✅ `public/sitemap.xml` (34 URLs), `robots.txt` |
| No single-page site that's only a donate button | ✅ (rich multi-page site) |

The website side is in good shape. The one thing to keep an eye on: Ad Grants
requires a **mission-focused landing experience** — every ad should point to a
page that clearly serves the mission (the NBC pages, `/give`, `/about`, course
pages all qualify).

---

## 3. Conversion tracking — **REQUIRED, needs GA4/GTM setup** ⚠️

Ad Grants accounts **must** have at least one meaningful conversion tracked, and
must **maintain a 5% click-through rate (CTR)** each month or risk suspension.
Conversion tracking is how you prove the traffic is meaningful.

The site **already fires analytics events** via `trackEvent()` (see
`src/analytics.js`, pushing to `dataLayer` for GTM container `GTM-T8336ZQF`).
Nothing more is needed in code — these just need to be **registered as
conversions** in GA4 and imported into Google Ads.

**Events already firing (ready to mark as conversions):**

High-value (recommend marking these as GA4 **key events / conversions**):
- `capture_submit` — email captured (newsletter/exit-intent)
- `donate_click` — clicked to donate
- `nbc_funder_inquiry` — funder inquiry submitted
- `nbc_club_request` — school club request submitted
- `nbc_builder_id_generated` — became a Nation Builder
- `streak_cta` — daily devotion engagement

Supporting (optional secondary conversions):
- `nbc_builder_id_share`, `nbc_certificate_download`, `nbc_lesson_complete`,
  `nbc_module_complete`, `share_click`, `share_copy`, `nbc_referral_landed`

**Setup steps (external — you do these once):**
1. In **GA4**: Admin → Events. Confirm the events above appear (visit the site,
   trigger a couple, wait ~24h or use DebugView). Then Admin → **Key events** →
   mark `capture_submit`, `donate_click`, `nbc_funder_inquiry`,
   `nbc_club_request`, `nbc_builder_id_generated` as key events.
2. Link GA4 to the Google Ads account (GA4 Admin → Product links → Google Ads).
3. In **Google Ads**: Tools → Conversions → Import → Google Analytics 4 → import
   those key events as conversions.
4. Confirm at least one conversion is set as **"Primary."**

> Note: GTM container `GTM-T8336ZQF` is hardcoded in `index.html`. Make sure it
> has a **GA4 Configuration tag** firing on all pages and a **GA4 Event tag**
> that forwards `dataLayer` events (trigger: Custom Event matching the names
> above). If GA4 isn't yet wired inside GTM, that's the one missing link.

---

## 4. Account-structure rules (in Google Ads, at setup)

Ad Grants enforces these — build the account to match or it gets flagged:
- **≥ 2 ad groups per campaign**, each with **≥ 2 ads**.
- **≥ 2 sitelink extensions** (e.g. "Become a Nation Builder", "Fund a Club",
  "Free Course", "Daily Devotion").
- **No single-word keywords** and **no overly generic keywords** (e.g. "kids",
  "charity"). Use specific phrases: "nation builders program nigeria",
  "youth character development lagos", "donate to nigerian children's charity".
- **Keyword quality score ≥ 2** (pause/remove anything lower).
- **Maintain 5% CTR** monthly (two consecutive months below → temporary
  deactivation; reactivation is possible).
- Use **Maximize Conversions** Smart Bidding (Ad Grants allows bids above the
  old $2 cap only with a conversion-based Smart Bidding strategy — another reason
  §3 must be done).
- Geo-target **Nigeria** (+ diaspora regions if you want USD donors, e.g. US/UK).

**Suggested campaigns:**
- _Join the Movement_ → landing `/NBC` (ad groups: "become a nation builder",
  "youth leadership nigeria").
- _Fund Nation Building_ → landing `/nbc/fund` (ad groups: "donate nigerian
  charity", "sponsor a school club").
- _Free Course_ → landing `/nbc/course`.

---

## 5. Performance fixes already applied (site side)

- Removed **`NBC_Main.jpeg` (6.7 MB → 409 KB)** and deleted an orphaned
  **`KIN_programs.jpeg` (3.5 MB)** that nothing referenced — ~9.6 MB no longer
  shipped to visitors. Faster loads help both Ad Grants quality and mobile users
  on metered Nigerian data.
- Latest-video embeds now load from a same-origin `/videos.json` snapshot
  refreshed server-side every 6 hours (no more flaky third-party proxy).

---

## Quick action list for you

1. [ ] Enrol in Google for Nonprofits; validate with Goodstack using CAC `IT No. 6980735`.
2. [ ] Activate Ad Grants (don't pre-make a paid Ads account).
3. [ ] Confirm GTM `GTM-T8336ZQF` has GA4 config + event tags firing (§3).
4. [ ] Mark the 5–6 key events as GA4 key events; import into Google Ads.
5. [ ] Build campaigns to the structure in §4; set Maximize Conversions bidding.
6. [ ] Watch CTR monthly (keep ≥ 5%).
