# TradeMatch

A lean, $0–$500 validation app for TradeMatch: connect students interested in
the skilled trades with schools that are actively looking for their next
class of electricians, plumbers, welders, HVAC techs, and carpenters.

This is intentionally **not** a custom two-sided marketplace with logins for
schools, payments, matching algorithms, etc. It's the minimum built to prove
one thing: *will a student give us their info, and will a school pay for
it?* Everything here replaces a piece of the manual $0–$500 plan with a
slightly less manual (but still cheap) version of the same idea:

| Manual plan | This app |
|---|---|
| Landing page | `/` — hero, value prop, trades overview |
| Free career quiz | `/quiz` — 5-question quiz that recommends a trade |
| Google Form / Typeform | `/apply` — application form, prefilled from the quiz |
| Spreadsheet CRM | `/admin` — password-protected lead tracker: status per student (New → Contacted → Sent to School → Enrolled), which school a lead was sent to, and a CSV export button for manual email updates to schools |

You are still the matching engine — the app just removes the copy/paste
between a form tool and a spreadsheet.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- SQLite (`better-sqlite3`) for storage — one file, zero hosting cost
- No third-party services, no monthly SaaS fees

## Getting started

```bash
npm install
cp .env.example .env.local   # set ADMIN_PASSWORD to something real
npm run dev
```

Visit:
- `http://localhost:3000` — landing page
- `http://localhost:3000/quiz` — career quiz
- `http://localhost:3000/apply` — application form
- `http://localhost:3000/admin` — lead tracker (sign in with `ADMIN_PASSWORD`)

Optional: seed a few sample leads so `/admin` isn't empty:

```bash
npm run seed
```

## Deploying on a small budget

The SQLite database is a single file on disk, so it needs a host with a
**persistent filesystem** — this is the one thing to get right:

- **Cheapest / simplest:** a small VPS or a Render/Railway/Fly.io instance
  with a persistent disk (all have usable free or ~$5–7/mo tiers). Set
  `DATABASE_PATH` to a path on the persistent volume.
- **Serverless (Vercel, Netlify functions):** works for the pages, but their
  filesystem is ephemeral, so leads submitted via `/api/leads` would not
  reliably persist. If you want serverless hosting, swap `lib/db.ts` for a
  free-tier hosted database (e.g. Supabase or Turso) — the rest of the app
  doesn't need to change, only the data layer.

Either way, this fits inside the "domain + basic website + small ad test"
budget described in the original plan — no developers required to keep it
running.

## What this doesn't do (on purpose)

No school login/dashboard, no payments, no matching algorithm, no branding
system. Once students are reliably applying and a school is willing to pay
for the leads, *that's* the signal to reinvest and build the next layer —
not before.
