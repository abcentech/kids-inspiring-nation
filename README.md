# KidsInspiring Nation — Website

**Vision:** Raising goDs (Geniuses with Divine Purpose) — Building Nations  
**NGO:** goDs Global KidsInspiring | IT No. 6980735  
**Site:** [kidsinspiringnation.org](https://kidsinspiringnation.org)

---

## About

This is the official website for KidsInspiring Nation, a Nigerian NGO raising children and teenagers through character, service, skills, and spiritual formation. The site includes:

- Main website with impact dashboard, programme pages, giving, and transparency
- goDs University funnel (Spirit + Skills dimensions)
- National Builders Challenge (NBC) registration
- Daily Streak tracker
- Psalm 119 Academy standalone page (`/public/psalm119`)
- Google Apps Script integrations for daily check-ins and syncs

---

## Tech Stack

- **React 18** + **Vite**
- **React Router v6** (client-side routing)
- **Framer Motion** (animations)
- **Recharts** (impact dashboard charts)
- **Lucide React** (icons)
- Deployed via GitHub Pages with a custom CNAME (`kidsinspiringnation.org`)

---

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # production build → dist/
npm run preview   # preview the build
```

---

## Project Structure

```
src/
  App.jsx               # Main site, dashboard, nav, hero
  GodsUniversity.jsx    # /gU — Spirit & Skills pathways
  NVC.jsx               # /NBC — Nation Builders Challenge landing
  NBCRegister.jsx       # /NBC/register — registration flow
  NationBuildersCorp.jsx
  About.jsx / Contact.jsx / FAQ.jsx / Giving.jsx
  Transparency.jsx / Privacy.jsx / Gallery.jsx
  Daily.jsx             # /daily — daily streak tracker
  KidsInspiringLanding.jsx
  InvestingInKidsLanding.jsx
  siteConfig.js         # brand colours (T), SITE constants, ROUTE_META
  analytics.js          # lightweight analytics init
  godsUniversity.css    # scoped styles for goDs University
  index.css             # global styles

public/
  psalm119/             # standalone Psalm 119 Academy page
  photos/               # programme photos
  slider/               # slider assets

apps-script/
  daily-checkin/        # Google Apps Script: daily check-in sync
  daily-prompts-sync/   # Google Apps Script: prompts sync
```

---

## Key Config

All brand tokens, site metadata, social links, and route-level SEO config live in [`src/siteConfig.js`](src/siteConfig.js).

---

## Contact

KidsinspiringNation@gmail.com | +234 812 267 3417  
WhatsApp: [wa.me/2348122673417](https://wa.me/2348122673417)
