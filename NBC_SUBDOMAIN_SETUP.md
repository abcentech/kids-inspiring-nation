# nbc.kidsinspiringnation.org — Subdomain Setup

The Nation Builders Corp experience lives inside the main site at **`/NBC`** (plus
`/nbc/course` and `/nbc/fund`). This repo is a single Vite SPA deployed to **GitHub
Pages**, and GitHub Pages serves only **one** custom domain per repo (`public/CNAME`
→ `kidsinspiringnation.org`). So the branded subdomain is set up in **Cloudflare**,
not in this repo — no code change is required.

## Recommended: Cloudflare redirect (works today)

1. **Move DNS to Cloudflare** (if not already): add `kidsinspiringnation.org` to a
   Cloudflare account and update the nameservers at your registrar.
2. **Add the subdomain DNS record** (Cloudflare → DNS):
   - Type: `CNAME`
   - Name: `nbc`
   - Target: `kidsinspiringnation.org`
   - Proxy status: **Proxied** (orange cloud)
3. **Add a Redirect Rule** (Cloudflare → Rules → Redirect Rules):
   - When incoming requests match: **Hostname equals `nbc.kidsinspiringnation.org`**
   - Then: **Static redirect** → `https://kidsinspiringnation.org/NBC`
   - Status code: `301`, Preserve query string: on
4. Visit `https://nbc.kidsinspiringnation.org` → it lands on the NBC page.

> Why a redirect: GitHub Pages enforces its own canonical custom domain, so a request
> that reaches the GH Pages origin under a different host is bounced back to the apex.
> A Cloudflare redirect is the reliable, zero-maintenance outcome.

## Optional upgrade: true vanity subdomain (address bar stays `nbc.…`)

If you want the address bar to keep showing `nbc.kidsinspiringnation.org`, add a
**Cloudflare Worker** that fetches from the GH Pages origin and rewrites the NBC page,
or move hosting to a platform with host-based rewrites (Cloudflare Pages / Netlify /
Vercel) and add a rewrite `nbc.kidsinspiringnation.org/* → /NBC`. This is more moving
parts; the redirect above is recommended unless the vanity URL is a hard requirement.

## Notes
- SPA deep links already work: `npm run build` copies `dist/index.html` → `dist/404.html`.
- No `.env` or `public/CNAME` change is needed for the redirect approach.
