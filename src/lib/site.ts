export const MERCHANT_PENDING = "待商戶提供";

/** Placeholders only — do not invent a real store name, address or hours. */
export const STORE_NAME = "[店名]";
export const STORE_AREA = "[地區]";
export const PHONE_DISPLAY = "9447 4720";
export const PHONE_E164 = "85294474720";
export const WHATSAPP_URL_BASE = `https://wa.me/${PHONE_E164}`;
export const ADDRESS = "[地址]";
export const HOURS = "[營業時間]";
export const LEGAL_ENTITY = "[商戶名稱]";
export const CONTACT_EMAIL = "nkcmike115@gmail.com";

export function whatsappUrl(prefill: string) {
  return `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(prefill)}`;
}

/** Used by /book and /terms (Vincent-owned booking copy). Left unchanged in this PR. */
export const RESCHEDULE_RULE =
  "請於預約時間前至少 24 小時透過 WhatsApp 或本站聯絡方式申請改期／取消。少於 24 小時改期／取消或爽約之訂金處理：[待商戶]。";

/** Used by /book and /terms (Vincent-owned booking copy). Left unchanged in this PR. */
export const DEPOSIT_EXPLAIN =
  "預約時可能需支付訂金以保留時段；免費體驗（Hydrafacial Free Trial HK$0）之訂金規則為 [待商戶規則]，或可為 HK$0。其餘項目訂金金額：[待商戶]。訂金可於當日消費抵扣。支付方式稍後接 Stripe TEST 或 FPS。";

/** Agreed content-page rules (homepage, service pages, prices). */
export const PACKAGE_TERMS = "詳見店內條款";
export const NO_PACKAGE_REQUIRED = "唔買套票都得";
export const NO_HIDDEN_FEES = "冇隱藏收費，只按以下標準價目表收費。";

export const FREE_TRIAL_DEPOSIT_RULE =
  "Hydrafacial 免費體驗 HK$0，唔收訂金。如未提前 24 小時取消，就當用咗個優惠。預約前 24 小時同 2 小時會準備兩次提醒。";

export const PAID_TRIAL_PAYMENT_RULE =
  "激光脫毛體驗 HK$288 喺店內收款。網上訂金是否收取、金額若干，待商戶決定；本站暫不設網上收款。";

export const RESCHEDULE_CONTENT_RULE =
  "請於預約時間前至少 24 小時透過 WhatsApp 或本站聯絡方式申請改期／取消。";

export const LATE_ARRIVAL_RULE = "遲到可能影響可做時長，具體安排待商戶提供。";

/** Canonical Mikey demo menu — ONLY these four priced SKUs. */
export type ServiceKind = "trial" | "single" | "package";

export type ServiceSku = {
  sku: string;
  kind: ServiceKind;
  nameZh: string;
  nameEn: string;
  tagline: string;
  /** Display price string without HK$ prefix, e.g. "0" | "688" | "8,800" */
  price: string;
  priceNum: number;
  duration: string;
  include: string[];
  exclude: string[];
  eligibility: string;
  note?: string;
  href: string;
};

export const SERVICES: ServiceSku[] = [
  {
    sku: "hydrafacial-trial",
    kind: "trial",
    nameZh: "Hydrafacial 免費體驗",
    nameEn: "Hydrafacial Free Trial",
    tagline: "新客可先試清潔保濕護理，明碼 HK$0，唔硬銷。",
    price: "0",
    priceNum: 0,
    duration: "約 [時長] 分鐘（待商戶提供）",
    include: ["Hydrafacial 體驗步驟（以店內說明為準）", "到店護理說明"],
    exclude: ["套票／額外加購（另按標準價目）", "非菜單公開項目"],
    eligibility: "限新客／每人一次（細節待商戶提供）。可只做單次，唔買套票都得。",
    note: "效果因人而異；非醫療宣稱。是否包含針清：待商戶提供。",
    href: "/services/hydrafacial",
  },
  {
    sku: "hydrafacial-single",
    kind: "single",
    nameZh: "Hydrafacial 單次護理",
    nameEn: "Hydrafacial Single Session",
    tagline: "單次明碼，適合想維持護理、唔想簽套票嘅客人。",
    price: "688",
    priceNum: 688,
    duration: "約 [時長] 分鐘（待商戶提供）",
    include: ["Hydrafacial 單次標準步驟", "護理後簡易護膚建議"],
    exclude: ["套票（見 10 次套票，詳見店內條款）", "非菜單公開項目"],
    eligibility: "單次可做，無需承諾套票。唔買套票都得。",
    note: "效果因人而異；非醫療宣稱。是否包含針清：待商戶提供。",
    href: "/services/hydrafacial",
  },
  {
    sku: "laser-trial",
    kind: "trial",
    nameZh: "激光脫毛體驗",
    nameEn: "Laser Hair Removal Trial",
    tagline: "單部位體驗價公開，先試再決定。",
    price: "288",
    priceNum: 288,
    duration: "約 [時長] 分鐘（待商戶提供）",
    include: ["單部位激光脫毛體驗（部位待商戶提供）", "到店安全說明"],
    exclude: ["未列明之加購項目", "醫療診斷或治療宣稱"],
    eligibility: "限新客／每人一次（細節待商戶提供）。可只做一次，唔買套票都得。",
    note: "效果因人而異；非醫療宣稱。費用喺店內收取。",
    href: "/services/laser-hair-removal",
  },
  {
    sku: "package-10",
    kind: "package",
    nameZh: "10 次套票",
    nameEn: "10-Session Package",
    tagline: "固定 10 次套票，總價網上公開。適用療程、有效期同退款詳見店內條款。",
    price: "8,800",
    priceNum: 8800,
    duration: "每次約 [時長] 分鐘（待商戶提供）",
    include: ["10 次護理（適用項目詳見店內條款）"],
    exclude: ["未列明之加購項目"],
    eligibility: "按條款購買；唔買套票都得，單次一樣歡迎。",
    note: "適用療程、有效期同退款：詳見店內條款。",
    href: "/packages",
  },
];

export function getService(sku: string): ServiceSku | undefined {
  return SERVICES.find((s) => s.sku === sku);
}

/** Trial landing pages only (hydrafacial free + laser). */
export const TRIALS: ServiceSku[] = SERVICES.filter((s) => s.kind === "trial");

/** Bookable services in /book select — all four SKUs. */
export const BOOKABLE: ServiceSku[] = SERVICES;

export type PackageSku = {
  id: string;
  nameZh: string;
  nameEn: string;
  sessions: string;
  totalPrice: string;
  validity: string;
  refundSummary: string;
  treatment: string;
};

export const PACKAGES: PackageSku[] = [
  {
    id: "package-10",
    nameZh: "10 次套票",
    nameEn: "10-Session Package",
    sessions: "10",
    totalPrice: "8,800",
    treatment: "詳見店內條款",
    validity: "詳見店內條款",
    refundSummary: "詳見店內條款",
  },
];

export type PriceRow = {
  sku: string;
  nameZh: string;
  nameEn: string;
  /** Single display price for this menu row */
  price: string;
  note?: string;
  href: string;
};

/** /prices table — same four SKUs, one price column each. */
export const PRICE_ROWS: PriceRow[] = SERVICES.map((s) => ({
  sku: s.sku,
  nameZh: s.nameZh,
  nameEn: s.nameEn,
  price: s.price,
  note: s.note,
  href: s.href,
}));

/** Old scaffold SKUs → canonical trial */
export const LEGACY_TRIAL_REDIRECT: Record<string, string> = {
  "aqua-peel": "hydrafacial-trial",
  cleanse: "hydrafacial-trial",
  lift: "laser-trial",
};

/** Canonical public service URLs for former /trial/* landings. */
export const TRIAL_TO_SERVICE_PATH: Record<string, string> = {
  "hydrafacial-trial": "/services/hydrafacial",
  "laser-trial": "/services/laser-hair-removal",
  "aqua-peel": "/services/hydrafacial",
  cleanse: "/services/hydrafacial",
  lift: "/services/laser-hair-removal",
};

/** Legacy package id used in early scaffold */
export const LEGACY_PACKAGE_REDIRECT: Record<string, string> = {
  "ten-session": "package-10",
};

export type FaqItem = { q: string; a: string };

export const HYDRAFACIAL_FAQS: FaqItem[] = [
  {
    q: "體驗要幾耐？",
    a: "時長約 [時長] 分鐘，確實分鐘數待商戶提供。到店後店員會說明當日流程。",
  },
  {
    q: "點樣改期？",
    a: "請於預約時間前至少 24 小時透過 WhatsApp 或本站聯絡方式申請改期／取消。免費體驗唔收訂金；如未提前 24 小時取消，就當用咗個優惠。",
  },
  {
    q: "做完可唔可以化妝？",
    a: "護理後嘅化妝同護膚建議因人而異，請以到店說明為準。本站不作醫療建議。",
  },
  {
    q: "懷孕可唔可以預約？",
    a: "如你懷孕、計劃懷孕或有健康顧慮，請喺預約前先諮詢同告知店員。本站不作醫療建議。",
  },
  {
    q: "遲到或者改期點計？",
    a: "改期請提前至少 24 小時申請。遲到可能影響可做時長，具體安排待商戶提供。",
  },
];

export const LASER_FAQS: FaqItem[] = [
  {
    q: "體驗要幾耐？",
    a: "時長約 [時長] 分鐘，確實分鐘數同體驗部位待商戶提供。到店後店員會說明當日流程。",
  },
  {
    q: "點樣改期？",
    a: "請於預約時間前至少 24 小時透過 WhatsApp 或本站聯絡方式申請改期／取消。體驗費 HK$288 喺店內收取；網上訂金是否收取待商戶決定。",
  },
  {
    q: "做完可唔可以化妝？",
    a: "護理後嘅化妝同護膚建議因人而異，請以到店說明為準。本站不作醫療建議。",
  },
  {
    q: "懷孕可唔可以預約？",
    a: "如你懷孕、計劃懷孕或有健康顧慮，請喺預約前先諮詢同告知店員。本站不作醫療建議。",
  },
  {
    q: "遲到或者改期點計？",
    a: "改期請提前至少 24 小時申請。遲到可能影響可做時長，具體安排待商戶提供。",
  },
];

export type DemoTherapist = {
  id: string;
  name: string;
  focus: string;
  variant: "amber" | "stone";
};

/** Demo placeholders only — not real staff. No licences, tenure or testimonials. */
export const DEMO_THERAPISTS: DemoTherapist[] = [
  {
    id: "demo-a",
    name: "示範護理師 A",
    focus: "面部護理（示範佔位）",
    variant: "amber",
  },
  {
    id: "demo-b",
    name: "示範護理師 B",
    focus: "儀器護理（示範佔位）",
    variant: "stone",
  },
];
