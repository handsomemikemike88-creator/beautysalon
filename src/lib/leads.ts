import {
  ATTENDANCE,
  isStage,
  PAYMENT,
  REMINDER_KINDS,
  resolveSku,
  type Attendance,
  type PaymentStatus,
  type ReminderKind,
  type Stage,
} from "./crm";
import { all, getDb, nextId, one, persist, run, type DbRow } from "./db";
import { buildReminderDraft } from "./reminders";

export type CreateBookingInput = {
  name: string;
  phone: string;
  email?: string;
  serviceSku: string;
  date: string;
  time: string;
  consentPics: boolean;
  marketingOptIn?: boolean;
  source?: string;
  customerId?: string | null;
  isSample?: boolean;
  stage?: Stage;
  attendance?: Attendance;
  paymentStatus?: PaymentStatus;
  note?: string;
};

export async function createLeadWithBooking(input: CreateBookingInput) {
  const svc = resolveSku(input.serviceSku);
  if (!svc) throw new Error("INVALID_SKU");
  if (!input.consentPics) throw new Error("PICS_REQUIRED");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date)) throw new Error("INVALID_DATE");
  if (!/^\d{2}:\d{2}$/.test(input.time)) throw new Error("INVALID_TIME");

  const db = await getDb();
  const now = new Date().toISOString();
  const leadId = nextId("L");
  const bookingId = nextId("BK");
  const stage: Stage = input.stage ?? "New Trial Lead";
  const attendance: Attendance = input.attendance ?? "booked";
  const payment: PaymentStatus = input.paymentStatus ?? "unpaid";

  run(
    db,
    `INSERT INTO leads (
      id, name, phone, email, source, service_sku, price_hkd, stage,
      payment_status, reminder_status, consent_pics, consent_at,
      marketing_opt_in, customer_id, is_sample, created_at, updated_at
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      leadId,
      input.name.trim(),
      input.phone.trim(),
      input.email?.trim() || null,
      input.source ?? "website",
      svc.sku,
      svc.priceHkd,
      stage,
      payment,
      "none",
      1,
      now,
      input.marketingOptIn ? 1 : 0,
      input.customerId ?? null,
      input.isSample ? 1 : 0,
      now,
      now,
    ],
  );

  run(
    db,
    `INSERT INTO lead_history (lead_id, from_stage, to_stage, at, by_name, why)
     VALUES (?,?,?,?,?,?)`,
    [leadId, null, stage, now, "系統", input.isSample ? "樣本資料" : "網上預約"],
  );

  run(
    db,
    `INSERT INTO bookings (
      id, lead_id, customer_id, service_sku, price_hkd, date, time, attendance, created_at
    ) VALUES (?,?,?,?,?,?,?,?,?)`,
    [
      bookingId,
      leadId,
      input.customerId ?? null,
      svc.sku,
      svc.priceHkd,
      input.date,
      input.time,
      attendance,
      now,
    ],
  );

  for (const kind of REMINDER_KINDS) {
    createReminderRow(db, {
      bookingId,
      leadId,
      kind,
      name: input.name.trim(),
      phone: input.phone.trim(),
      serviceSku: svc.sku,
      date: input.date,
      time: input.time,
      now,
    });
  }

  run(
    db,
    `UPDATE leads SET reminder_status = 'drafted', updated_at = ? WHERE id = ?`,
    [now, leadId],
  );

  if (input.note) {
    run(
      db,
      `INSERT INTO lead_notes (lead_id, at, by_name, text) VALUES (?,?,?,?)`,
      [leadId, now, "系統", input.note],
    );
  }

  persist();
  return { leadId, bookingId, sku: svc.sku, priceHkd: svc.priceHkd };
}

function createReminderRow(
  db: Awaited<ReturnType<typeof getDb>>,
  opts: {
    bookingId: string;
    leadId: string;
    kind: ReminderKind;
    name: string;
    phone: string;
    serviceSku: string;
    date: string;
    time: string;
    now: string;
  },
) {
  const draft = buildReminderDraft({
    kind: opts.kind,
    name: opts.name,
    phone: opts.phone,
    serviceSku: opts.serviceSku,
    date: opts.date,
    time: opts.time,
  });
  const id = nextId("R");
  const scheduled = `${opts.date}T${opts.time}:00`;
  run(
    db,
    `INSERT INTO reminders (
      id, booking_id, lead_id, kind, state, scheduled_for,
      draft_whatsapp, draft_email_subject, draft_email_body, updated_at
    ) VALUES (?,?,?,?,?,?,?,?,?,?)`,
    [
      id,
      opts.bookingId,
      opts.leadId,
      opts.kind,
      "drafted",
      scheduled,
      draft.draft_whatsapp,
      draft.draft_email_subject,
      draft.draft_email_body,
      opts.now,
    ],
  );
}

export async function listLeads(): Promise<DbRow[]> {
  const db = await getDb();
  return all(
    db,
    `SELECT l.*, b.id AS booking_id, b.date AS booking_date, b.time AS booking_time,
            b.attendance AS attendance
     FROM leads l
     LEFT JOIN bookings b ON b.lead_id = l.id
     ORDER BY l.created_at DESC`,
  );
}

export async function getLead(id: string): Promise<DbRow | null> {
  const db = await getDb();
  return one(
    db,
    `SELECT l.*, b.id AS booking_id, b.date AS booking_date, b.time AS booking_time,
            b.attendance AS attendance
     FROM leads l
     LEFT JOIN bookings b ON b.lead_id = l.id
     WHERE l.id = ?`,
    [id],
  );
}

export async function updateLeadStage(
  id: string,
  stage: string,
  byName: string,
  why = "",
) {
  if (!isStage(stage)) throw new Error("INVALID_STAGE");
  const db = await getDb();
  const lead = one(db, `SELECT stage FROM leads WHERE id = ?`, [id]);
  if (!lead) throw new Error("NOT_FOUND");
  const now = new Date().toISOString();
  const from = String(lead.stage);
  run(db, `UPDATE leads SET stage = ?, updated_at = ? WHERE id = ?`, [
    stage,
    now,
    id,
  ]);
  run(
    db,
    `INSERT INTO lead_history (lead_id, from_stage, to_stage, at, by_name, why)
     VALUES (?,?,?,?,?,?)`,
    [id, from, stage, now, byName, why],
  );
  if (stage === "Attended") {
    run(
      db,
      `UPDATE bookings SET attendance = 'attended' WHERE lead_id = ? AND attendance = 'booked'`,
      [id],
    );
  }
  if (stage === "Lost") {
    /* leave attendance as-is unless still booked → no-show optional */
  }
  persist();
}

export async function updateLeadFields(
  id: string,
  patch: {
    payment_status?: string;
    reminder_status?: string;
    attendance?: string;
    staff_note?: string;
    by_name?: string;
  },
) {
  const db = await getDb();
  const lead = one(db, `SELECT id FROM leads WHERE id = ?`, [id]);
  if (!lead) throw new Error("NOT_FOUND");
  const now = new Date().toISOString();
  if (patch.payment_status) {
    if (!(PAYMENT as readonly string[]).includes(patch.payment_status)) {
      throw new Error("INVALID_PAYMENT");
    }
    run(db, `UPDATE leads SET payment_status = ?, updated_at = ? WHERE id = ?`, [
      patch.payment_status,
      now,
      id,
    ]);
  }
  if (patch.reminder_status) {
    run(db, `UPDATE leads SET reminder_status = ?, updated_at = ? WHERE id = ?`, [
      patch.reminder_status,
      now,
      id,
    ]);
  }
  if (patch.attendance) {
    if (!(ATTENDANCE as readonly string[]).includes(patch.attendance)) {
      throw new Error("INVALID_ATTENDANCE");
    }
    run(db, `UPDATE bookings SET attendance = ? WHERE lead_id = ?`, [
      patch.attendance,
      id,
    ]);
  }
  if (patch.staff_note?.trim()) {
    run(
      db,
      `INSERT INTO lead_notes (lead_id, at, by_name, text) VALUES (?,?,?,?)`,
      [id, now, patch.by_name || "員工", patch.staff_note.trim()],
    );
  }
  persist();
}

export async function listNotes(leadId: string) {
  const db = await getDb();
  return all(
    db,
    `SELECT * FROM lead_notes WHERE lead_id = ? ORDER BY at DESC`,
    [leadId],
  );
}

export async function dashboardStats() {
  const db = await getDb();
  const trialSkus = ["hydrafacial-trial", "laser-trial"];
  const placeholders = trialSkus.map(() => "?").join(",");
  const trialBookings = one(
    db,
    `SELECT COUNT(*) AS n FROM bookings
     WHERE service_sku IN (${placeholders}) AND attendance != 'cancelled'`,
    trialSkus,
  );
  const attended = one(
    db,
    `SELECT COUNT(*) AS n FROM bookings
     WHERE service_sku IN (${placeholders}) AND attendance = 'attended'`,
    trialSkus,
  );
  const noShow = one(
    db,
    `SELECT COUNT(*) AS n FROM bookings
     WHERE service_sku IN (${placeholders}) AND attendance = 'no-show'`,
    trialSkus,
  );
  const a = Number(attended?.n ?? 0);
  const ns = Number(noShow?.n ?? 0);
  const denom = a + ns;
  const consultations = one(
    db,
    `SELECT COUNT(*) AS n FROM leads WHERE stage = 'Package Consultation'`,
  );
  const sales = one(
    db,
    `SELECT COUNT(*) AS n FROM leads WHERE stage = 'Package Sold'`,
  );
  return {
    trialBookings: Number(trialBookings?.n ?? 0),
    attendanceRate: denom === 0 ? 0 : Math.round((a / denom) * 1000) / 10,
    attended: a,
    noShow: ns,
    packageConsultations: Number(consultations?.n ?? 0),
    packageSales: Number(sales?.n ?? 0),
  };
}

export async function calendarBookings(from: string, to: string) {
  const db = await getDb();
  return all(
    db,
    `SELECT b.*, l.name, l.phone, l.stage, l.payment_status, l.reminder_status
     FROM bookings b
     JOIN leads l ON l.id = b.lead_id
     WHERE b.date >= ? AND b.date <= ?
     ORDER BY b.date, b.time`,
    [from, to],
  );
}

export async function listReminders() {
  const db = await getDb();
  return all(
    db,
    `SELECT r.*, l.name, l.phone, b.date, b.time, b.service_sku
     FROM reminders r
     JOIN leads l ON l.id = r.lead_id
     JOIN bookings b ON b.id = r.booking_id
     ORDER BY r.scheduled_for DESC`,
  );
}

export async function markReminderCopied(id: string) {
  const db = await getDb();
  const now = new Date().toISOString();
  const row = one(db, `SELECT lead_id FROM reminders WHERE id = ?`, [id]);
  if (!row) throw new Error("NOT_FOUND");
  run(db, `UPDATE reminders SET state = 'copied', updated_at = ? WHERE id = ?`, [
    now,
    id,
  ]);
  run(db, `UPDATE leads SET reminder_status = 'copied', updated_at = ? WHERE id = ?`, [
    now,
    row.lead_id,
  ]);
  persist();
}
