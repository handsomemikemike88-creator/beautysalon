/** CRM + menu constants — keep in sync with docs/BACKEND-SCHEMA.md */

export const STAGES = [
  "New Trial Lead",
  "Reminder Sent",
  "Confirmed",
  "Attended",
  "Package Consultation",
  "Package Sold",
  "Lost",
] as const;

export type Stage = (typeof STAGES)[number];

export const STAGE_ZH: Record<Stage, string> = {
  "New Trial Lead": "新體驗客戶",
  "Reminder Sent": "已發提醒",
  Confirmed: "已確認",
  Attended: "已出席",
  "Package Consultation": "套餐諮詢",
  "Package Sold": "已購套餐",
  Lost: "流失",
};

export const ATTENDANCE = ["booked", "attended", "no-show", "cancelled"] as const;
export type Attendance = (typeof ATTENDANCE)[number];

export const PAYMENT = ["unpaid", "paid", "waived", "demo", "refunded"] as const;
export type PaymentStatus = (typeof PAYMENT)[number];

export const REMINDER_STATUS = ["none", "drafted", "ready", "copied"] as const;
export type ReminderStatus = (typeof REMINDER_STATUS)[number];

export const REMINDER_KINDS = ["confirmation", "day-before", "same-day"] as const;
export type ReminderKind = (typeof REMINDER_KINDS)[number];

export const TIMES = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"] as const;

export type MenuSku = {
  sku: string;
  kind: "trial" | "single" | "package";
  nameZh: string;
  nameEn: string;
  priceHkd: number;
};

/** Canonical four SKUs only */
export const MENU: MenuSku[] = [
  {
    sku: "hydrafacial-trial",
    kind: "trial",
    nameZh: "Hydrafacial 免費體驗",
    nameEn: "Hydrafacial Free Trial",
    priceHkd: 0,
  },
  {
    sku: "hydrafacial-single",
    kind: "single",
    nameZh: "Hydrafacial 單次護理",
    nameEn: "Hydrafacial Single Session",
    priceHkd: 688,
  },
  {
    sku: "laser-trial",
    kind: "trial",
    nameZh: "激光脫毛體驗",
    nameEn: "Laser Hair Removal Trial",
    priceHkd: 288,
  },
  {
    sku: "package-10",
    kind: "package",
    nameZh: "10 次套票",
    nameEn: "10-Session Package",
    priceHkd: 8800,
  },
];

export const ALLOWED_PRICES = [0, 288, 688, 8800] as const;

/** Map legacy public ids → canonical sku */
export const SKU_ALIASES: Record<string, string> = {
  "ten-session": "package-10",
  "aqua-peel": "hydrafacial-trial",
  cleanse: "hydrafacial-trial",
  lift: "laser-trial",
};

export function resolveSku(input: string): MenuSku | undefined {
  const sku = SKU_ALIASES[input] ?? input;
  return MENU.find((m) => m.sku === sku);
}

export function isStage(s: string): s is Stage {
  return (STAGES as readonly string[]).includes(s);
}

export function fmtHkd(n: number): string {
  return "HK$" + Number(n).toLocaleString("en-US");
}

export function isTrialSku(sku: string): boolean {
  const m = resolveSku(sku);
  return m?.kind === "trial";
}
