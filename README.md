# HK Beauty Salon — local MVP + DEMO backend

**Local only.** Not deployed. Separate from mikeng-ai.com.

## Demo menu (four SKUs only)

| SKU | Name | Price |
|-----|------|-------|
| hydrafacial-trial | Hydrafacial Free Trial | HK$0 |
| hydrafacial-single | Hydrafacial Single Session | HK$688 |
| laser-trial | Laser Hair Removal Trial | HK$288 |
| package-10 | 10-Session Package | HK$8,800 |

Contact: WhatsApp **9447 4720** · nkcmike115@gmail.com

Schema alignment: `docs/BACKEND-SCHEMA.md`

## Setup

```bash
npm install
cp .env.example .env.local   # if needed
npm run seed                 # creates data/salon.db + demo accounts
npm run dev                  # http://localhost:3000
```

SQLite via **sql.js** (WASM) — no native `better-sqlite3` build required. DB file: `data/salon.db` (gitignored).

## DEMO credentials (NOT for production)

| Role | Email | Password | URL |
|------|-------|----------|-----|
| Staff | `staff@demo.local` | `DemoStaff123!` | `/staff/login` |
| Customer | `customer@demo.local` | `DemoCustomer123!` | `/account/login` |

Staff invite code for open register: `DEMO-STAFF-2026`

## Staff / CRM URLs

- Dashboard: `/staff`
- CRM pipeline: `/staff/pipeline`
- Calendar: `/staff/calendar`
- Leads DB: `/staff/leads`
- Reminder drafts (copy only, never auto-send): `/staff/reminders`

## Customer

- Login `/account/login` · Register `/account/register` · Bookings `/account`
- Public `/book` writes a lead + booking + reminder drafts into the local DB

## Notes

- All seeded leads use fictional HK names / `+852 5550 xxxx` / `@example.com`
- Reminder WhatsApp/email bodies are **drafts only** — copy buttons; no Meta/SendGrid send
- Stripe: TEST placeholders only
