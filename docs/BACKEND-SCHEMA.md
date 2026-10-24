# Backend schema — HK Beauty Salon (local DEMO)

**Source of truth:** `/workspace/hk-beauty-salon`  
**Scope:** local only — not deployed; separate from mikeng-ai.com.  
**Data:** sample / DEMO only. Reminder channels never auto-send.

## 1. CRM stages (exact strings, in order)

| Order | Stage (exact) |
|------:|---------------|
| 1 | `New Trial Lead` |
| 2 | `Reminder Sent` |
| 3 | `Confirmed` |
| 4 | `Attended` |
| 5 | `Package Consultation` |
| 6 | `Package Sold` |
| 7 | `Lost` |

Staff may move a lead to any stage. History of stage changes is retained.

## 2. Lead / booking fields

Stored on `leads` (pipeline row) + linked `bookings` (calendar row). One lead typically has one primary booking for MVP.

| Field | Storage | Notes |
|-------|---------|-------|
| Service SKU | `leads.service_sku` / `bookings.service_sku` | One of the four canonical SKUs |
| Standard menu price (HKD) | `leads.price_hkd` / `bookings.price_hkd` | Integer: 0, 288, 688, or 8800 only |
| Booking datetime | `bookings.date` (YYYY-MM-DD) + `bookings.time` (HH:MM) | Also denormalised display helpers OK |
| Attendance status | `bookings.attendance` | `booked` \| `attended` \| `no-show` \| `cancelled` |
| Staff notes | `lead_notes` table | Append-only; UI can also show latest |
| Payment status | `leads.payment_status` | `unpaid` \| `paid` \| `waived` \| `demo` \| `refunded` |
| Reminder status | `leads.reminder_status` + `reminders.state` | Lead-level rollup: `none` \| `drafted` \| `ready` \| `copied` (never `sent` live). Per-reminder `state`: `pending` \| `drafted` \| `copied` |

Also on lead: name, phone, email, source, stage, PICS consent, marketing opt-in (default false), `is_sample`, optional `customer_id`.

## 3. Auth

| Kind | Table | Roles | Session |
|------|-------|-------|---------|
| Staff | `staff` | `admin` \| `staff` | HttpOnly cookie `salon_staff_session`; token stored hashed in `sessions` |
| Customer | `customers` | (member) | HttpOnly cookie `salon_customer_session`; same `sessions` table with `kind` |

- Password: Node `crypto.scrypt` (salt + hash).
- Staff register: invite code (`STAFF_INVITE_CODE`) for DEMO open register, or seed creates demo staff.
- Light in-memory rate limit on login POSTs.
- Areas: `/staff/*` (staff), `/account/*` (customer).

## 4. Reminder drafts

Table `reminders`: kinds `confirmation` \| `day-before` \| `same-day`.

- Columns: `draft_whatsapp`, `draft_email_subject`, `draft_email_body`.
- Generated on booking create / staff “產生草稿” action.
- **Never** call Meta WhatsApp, SendGrid, or SMTP. UI only: view + copy buttons; marking `copied` is local status only.

## 5. Dashboard metrics

Computed from sample + real local rows (demo DB):

| Metric | Definition |
|--------|------------|
| Trial bookings | Count of bookings whose `service_sku` is a trial (`hydrafacial-trial` or `laser-trial`) and attendance ≠ `cancelled` |
| Attendance rate | `attended` trial bookings ÷ trial bookings with attendance in (`attended`,`no-show`,`booked` completed set): specifically `attended / (attended + no-show)` among trial bookings that have terminal attendance; if none, show 0% |
| Package consultations | Count of leads with `stage = 'Package Consultation'` |
| Package sales | Count of leads with `stage = 'Package Sold'` |

## 6. Canonical SKUs + prices

| SKU | Name | Price (HKD) |
|-----|------|------------:|
| `hydrafacial-trial` | Hydrafacial Free Trial | 0 |
| `hydrafacial-single` | Hydrafacial Single Session | 688 |
| `laser-trial` | Laser Hair Removal Trial | 288 |
| `package-10` | 10-Session Package | 8800 |

Legacy public redirects: `aqua-peel` / `cleanse` → `hydrafacial-trial`; `lift` → `laser-trial`. Old id `ten-session` aliases to `package-10` in code.

## Routes (implementation)

| Area | Path |
|------|------|
| Staff login | `/staff/login` |
| Staff register | `/staff/register` |
| Staff dashboard | `/staff` |
| CRM pipeline | `/staff/pipeline` |
| Calendar | `/staff/calendar` |
| Leads | `/staff/leads` |
| Reminders | `/staff/reminders` |
| Customer login | `/account/login` |
| Customer register | `/account/register` |
| Customer bookings | `/account` |

## Demo credentials (DEMO ONLY — not production)

See README / `npm run seed` output:

- Staff: `staff@demo.local` / `DemoStaff123!`
- Customer: `customer@demo.local` / `DemoCustomer123!`
