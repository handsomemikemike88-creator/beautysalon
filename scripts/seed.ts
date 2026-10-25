/**
 * Seed DEMO sample data + fixed demo accounts.
 * Usage: npm run seed
 */
import path from "path";
import fs from "fs";
import { createRequire } from "module";

// Ensure cwd-relative imports resolve @/ via tsx + tsconfig paths — use relative
process.chdir(path.join(__dirname, ".."));

async function main() {
  // Dynamic import after chdir
  const { getDb, persist, resetDbSingleton, run, one } = await import("../src/lib/db");
  const { hashPassword } = await import("../src/lib/password");
  const { createLeadWithBooking } = await import("../src/lib/leads");
  const { STAGES } = await import("../src/lib/crm");

  const dbFile = path.join(process.cwd(), "data", "salon.db");
  if (fs.existsSync(dbFile)) {
    fs.unlinkSync(dbFile);
    console.log("Removed existing data/salon.db");
  }
  resetDbSingleton();

  const db = await getDb();
  const now = new Date().toISOString();

  const staffHash = hashPassword("DemoStaff123!");
  const customerHash = hashPassword("DemoCustomer123!");

  run(
    db,
    `INSERT INTO staff (id, name, email, pw_hash, role, status, created_at)
     VALUES (?,?,?,?,?,?,?)`,
    ["S-DEMO", "示範員工", "staff@demo.local", staffHash, "admin", "active", now],
  );

  run(
    db,
    `INSERT INTO customers (id, name, email, phone, pw_hash, consent_at, created_at)
     VALUES (?,?,?,?,?,?,?)`,
    [
      "C-DEMO",
      "示範客戶",
      "customer@demo.local",
      "+852 5550 0100",
      customerHash,
      now,
      now,
    ],
  );
  persist();

  type Row = {
    name: string;
    sku: string;
    stage: (typeof STAGES)[number];
    dayOffset: number;
    time: string;
    attendance: "booked" | "attended" | "no-show" | "cancelled";
    payment: "unpaid" | "paid" | "waived" | "demo";
    note: string;
    linkCustomer?: boolean;
  };

  const rows: Row[] = [
    {
      name: "陳示範甲",
      sku: "hydrafacial-trial",
      stage: "Package Sold",
      dayOffset: -21,
      time: "10:00",
      attendance: "attended",
      payment: "paid",
      note: "【樣本】已購套票（非真實 Stripe）",
    },
    {
      name: "李示範乙",
      sku: "laser-trial",
      stage: "Package Sold",
      dayOffset: -18,
      time: "11:30",
      attendance: "attended",
      payment: "paid",
      note: "【樣本】已購套票",
    },
    {
      name: "黃示範丙",
      sku: "hydrafacial-trial",
      stage: "Package Consultation",
      dayOffset: -9,
      time: "13:00",
      attendance: "attended",
      payment: "unpaid",
      note: "【樣本】套餐諮詢中",
    },
    {
      name: "張示範丁",
      sku: "hydrafacial-single",
      stage: "Attended",
      dayOffset: -7,
      time: "14:30",
      attendance: "attended",
      payment: "paid",
      note: "【樣本】單次完成",
    },
    {
      name: "劉示範戊",
      sku: "laser-trial",
      stage: "Attended",
      dayOffset: -6,
      time: "16:00",
      attendance: "attended",
      payment: "unpaid",
      note: "【樣本】已出席",
    },
    {
      name: "周示範己",
      sku: "hydrafacial-trial",
      stage: "Lost",
      dayOffset: -8,
      time: "10:00",
      attendance: "no-show",
      payment: "unpaid",
      note: "【樣本】未出席",
    },
    {
      name: "吳示範庚",
      sku: "hydrafacial-trial",
      stage: "Lost",
      dayOffset: -5,
      time: "17:30",
      attendance: "no-show",
      payment: "unpaid",
      note: "【樣本】流失",
    },
    {
      name: "徐示範辛",
      sku: "hydrafacial-trial",
      stage: "Package Consultation",
      dayOffset: -4,
      time: "11:30",
      attendance: "attended",
      payment: "unpaid",
      note: "【樣本】諮詢",
    },
    {
      name: "林示範癸",
      sku: "hydrafacial-trial",
      stage: "Confirmed",
      dayOffset: 1,
      time: "10:00",
      attendance: "booked",
      payment: "unpaid",
      note: "【樣本】已確認",
      linkCustomer: true,
    },
    {
      name: "梁示範子",
      sku: "laser-trial",
      stage: "Reminder Sent",
      dayOffset: 0,
      time: "17:30",
      attendance: "booked",
      payment: "unpaid",
      note: "【樣本】已產提醒草稿",
    },
    {
      name: "鄭示範丑",
      sku: "hydrafacial-trial",
      stage: "New Trial Lead",
      dayOffset: 2,
      time: "14:30",
      attendance: "booked",
      payment: "demo",
      note: "【樣本】新體驗",
    },
    {
      name: "蔡示範寅",
      sku: "package-10",
      stage: "New Trial Lead",
      dayOffset: 3,
      time: "11:30",
      attendance: "booked",
      payment: "unpaid",
      note: "【樣本】套票諮詢預約",
    },
    {
      name: "馮示範卯",
      sku: "hydrafacial-single",
      stage: "Confirmed",
      dayOffset: 4,
      time: "16:00",
      attendance: "booked",
      payment: "unpaid",
      note: "【樣本】",
    },
    {
      name: "羅示範辰",
      sku: "laser-trial",
      stage: "New Trial Lead",
      dayOffset: 5,
      time: "13:00",
      attendance: "booked",
      payment: "unpaid",
      note: "【樣本】",
    },
    {
      name: "示範客戶",
      sku: "hydrafacial-trial",
      stage: "Confirmed",
      dayOffset: 2,
      time: "11:30",
      attendance: "booked",
      payment: "waived",
      note: "【樣本】綁定 customer@demo.local",
      linkCustomer: true,
    },
  ];

  function addDays(isoDate: string, days: number): string {
    const d = new Date(isoDate + "T12:00:00");
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }

  const today = new Date().toISOString().slice(0, 10);

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    let date = addDays(today, r.dayOffset);
    // skip Sunday
    if (new Date(date + "T12:00:00").getDay() === 0) {
      date = addDays(date, 1);
    }
    const created = await createLeadWithBooking({
      name: r.name,
      phone: `+852 5550 ${String(100 + i + 1).padStart(4, "0")}`,
      email: `sample${i + 1}@example.com`,
      serviceSku: r.sku,
      date,
      time: r.time,
      consentPics: true,
      marketingOptIn: false,
      source: "sample",
      isSample: true,
      stage: r.stage,
      attendance: r.attendance,
      paymentStatus: r.payment,
      note: r.note,
      customerId: r.linkCustomer ? "C-DEMO" : null,
    });
    // force stage after create (create already sets stage) — update reminder status for Reminder Sent
    if (r.stage === "Reminder Sent") {
      const { run: runSql, getDb: gdb, persist: p } = await import("../src/lib/db");
      const d = await gdb();
      runSql(
        d,
        `UPDATE leads SET reminder_status = 'ready', updated_at = ? WHERE id = ?`,
        [new Date().toISOString(), created.leadId],
      );
      p();
    }
  }

  const leadCount = one(await getDb(), `SELECT COUNT(*) AS n FROM leads`);
  console.log("\n=== DEMO SEED OK ===");
  console.log(`DB: ${dbFile}`);
  console.log(`Leads: ${leadCount?.n}`);
  console.log("Staff login:    staff@demo.local / DemoStaff123!   → /staff/login");
  console.log("Customer login: customer@demo.local / DemoCustomer123! → /account/login");
  console.log("CRM pipeline:   /staff/pipeline");
  console.log("Dashboard:      /staff");
  console.log("Calendar:       /staff/calendar");
  console.log("DEMO ONLY — sample data, reminders never auto-send.\n");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
