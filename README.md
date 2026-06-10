# Link-in-Bio Site (Phase 2)

A fast, phone-first link-in-bio page where **every click is tracked**, plus a
private `/stats` dashboard showing what converts. Built with Next.js,
deploys free on Vercel, stores clicks in Supabase (free tier).

## How it works (30-second version)

Every button points at your own site first — `yoursite.com/go/shop` — which
**logs the click** (which link, when, from where) and instantly forwards the
visitor to the real destination. Outgoing links get UTM tags automatically,
so affiliate dashboards credit your bio as the traffic source.

```
visitor taps button → /go/shop → click saved to database → real shop opens
```

## Run it locally

```powershell
cd linkinbio
npm install      # first time only - downloads the building blocks
npm run dev      # starts the site at http://localhost:3000
```

- Your page: <http://localhost:3000>
- Your stats: <http://localhost:3000/stats>

Without Supabase configured, clicks save to a local file (`data/clicks.json`)
so everything is testable immediately. The stats page reminds you when
you're in this mode.

## Files you'll edit

| File | What |
|---|---|
| `lib/siteConfig.ts` | **Your name, tagline, and all your links.** Start here — replace every `CHANGE ME`. |
| `lib/shopConfig.ts` | **The products on your /shop page.** Swap in Amazon affiliate links when approved. |
| `public/logo.svg` | Placeholder logo — replace with your own |
| `app/globals.css` | Colors and styling (the `:root` block at the top) |

## The shop (`/shop`)

The featured button leads to your own storefront page: curated high-demand
products (World Cup gear + proven soccer-TikTok sellers) that link out to
Amazon. Every product goes through `/go/<slug>`, so **stats show which
products your audience clicks** — market research before you ever hold
inventory.

**To start earning:** join Amazon Associates (free, affiliate.amazon.com,
requires an active website/social account — apply once your accounts have
some posts). When approved, replace each product `url` in `lib/shopConfig.ts`
with your tagged link. Commissions are 3–4% on sports gear. Later, the same
page can hold your own merch (Fourthwall/Printful) — just add products
pointing at your store.

## Going live, step by step

### 1. Supabase — your click database (~5 min, free, no card)

1. Create an account at <https://supabase.com> → **New project** (any name;
   choose a strong database password and save it somewhere)
2. In the left sidebar: **SQL Editor → New query** → paste the contents of
   `supabase/schema.sql` → **Run**
3. **Settings → API** — copy two things:
   - **Project URL** → this is your `SUPABASE_URL`
   - **service_role key** → this is your `SUPABASE_SERVICE_ROLE_KEY`
     (treat it like a bank password — it has full database access)
4. To test locally: copy `.env.local.example` to `.env.local`, paste both
   values in, restart `npm run dev`. Clicks now flow into Supabase.

### 2. Vercel — free hosting (~10 min)

Vercel (the company behind Next.js) hosts this type of site free. The
smoothest path uses GitHub, which also gives you backups and auto-deploys:

1. Create accounts at <https://github.com> and <https://vercel.com> (sign in
   to Vercel **with** GitHub — one less password)
2. Put the `linkinbio` folder in a GitHub repository and push it
   *(ask Claude — this is two commands)*
3. In Vercel: **Add New → Project** → import your repository → before
   clicking Deploy, open **Environment Variables** and add all three:
   `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `STATS_PASSWORD`
4. **Deploy.** ~1 minute later you have a live URL like
   `yourproject.vercel.app`. Every future `git push` redeploys automatically.

### 3. Custom domain (optional, ~$10/year)

A custom domain (like `yourbrand.link`) looks more professional in a bio
and means you can move hosts later without breaking old posts.

1. Buy the domain — Cloudflare, Namecheap, or Porkbun are all fine
2. Vercel → your project → **Settings → Domains** → type your domain → Add
3. Vercel shows you 1–2 DNS records (DNS = the internet's phonebook —
   these records point your name at Vercel's servers). Add them in your
   domain seller's dashboard. Vercel checks automatically; usually live
   within minutes, occasionally a few hours.
4. HTTPS (the padlock) is automatic and free.

### 4. Put it in your bios

Use the homepage URL in TikTok/Instagram/X. Check
`yourdomain.com/stats` (username `admin` + your `STATS_PASSWORD`)
whenever you want to see what's converting.

## Reading your stats like a business

- **7-day vs 30-day**: a link strong in the 30-day column but dead in the
  7-day column is going stale — change its position, title, or emoji.
- **Socials vs money links**: lots of social clicks but few shop clicks
  means your page sells you, not your products — move the shop button up
  or make its title more specific ("World Cup kit drop" beats "My Shop").
- **Test titles**: change one button's wording, wait a week, compare.
  That's A/B testing, and you now have the data for it.

## Troubleshooting

- **Stats show zero after going live** — did you add the two Supabase
  variables in Vercel? Check the Vercel deployment "Functions" logs for
  "Supabase insert failed".
- **/stats says locked (503)** — set `STATS_PASSWORD` in Vercel and redeploy.
- **Changed links don't appear** — edit `lib/siteConfig.ts`, then
  `git push` (Vercel redeploys automatically).
