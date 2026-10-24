export const STORE_NAME = "[待商戶]";
export const STORE_AREA = "[待商戶地區]"; // e.g. 觀塘／尖沙咀
export const PHONE_DISPLAY = "9447 4720";
export const PHONE_E164 = "85294474720";
export const WHATSAPP_URL_BASE = `https://wa.me/${PHONE_E164}`;
export const ADDRESS = "[待商戶]";
export const HOURS = "[待商戶]";
export const LEGAL_ENTITY = "[待商戶]";
export const CONTACT_EMAIL = "nkcmike115@gmail.com";

export function whatsappUrl(prefill: string) {
  return `${WHATSAPP_URL_BASE}?text=${encodeURIComponent(prefill)}`;
}

export const RESCHEDULE_RULE =
  "請於預約時間前至少 24 小時透過 WhatsApp 或本站聯絡方式申請改期／取消。少於 24 小時改期／取消或爽約之訂金處理：[待商戶]。";

export const DEPOSIT_EXPLAIN =
  "預約時可能需支付訂金以保留時段；免費體驗（Hydrafacial Free Trial HK$0）之訂金規則為 [待商戶規則]，或可為 HK$0。其餘項目訂金金額：[待商戶]。訂金可於當日消費抵扣。支付方式稍後接 Stripe TEST 或 FPS。";

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
    duration: "約 [待商戶] 分鐘",
    include: ["Hydrafacial 體驗步驟（標準菜單）", "到店護理說明", "體驗後唔強制入銷售室（若商戶真實執行）"],
    exclude: ["套票／額外加購（另按價目）", "非菜單公開項目"],
    eligibility: "限新客／每人一次（細節 [待商戶]）",
    note: "效果因人而異；非醫療宣稱",
  },
  {
    sku: "hydrafacial-single",
    kind: "single",
    nameZh: "Hydrafacial 單次護理",
    nameEn: "Hydrafacial Single Session",
    tagline: "單次明碼，適合想維持護理、唔想簽套票嘅客人。",
    price: "688",
    priceNum: 688,
    duration: "約 [待商戶] 分鐘",
    include: ["Hydrafacial 單次標準步驟", "護理後簡易護膚建議"],
    exclude: ["套票優惠（見 10 次套票）", "非菜單公開項目"],
    eligibility: "單次可做，無需承諾套票",
    note: "效果因人而異；非醫療宣稱",
  },
  {
    sku: "laser-trial",
    kind: "trial",
    nameZh: "激光脫毛體驗",
    nameEn: "Laser Hair Removal Trial",
    tagline: "單部位體驗價公開，先試再決定。",
    price: "288",
    priceNum: 288,
    duration: "約 [待商戶] 分鐘",
    include: ["單部位激光脫毛體驗（部位 [待商戶]）", "到店安全說明"],
    exclude: ["全套多次療程（見套票）", "醫療級診斷或治療宣稱"],
    eligibility: "限新客／每人一次（細節 [待商戶]）",
    note: "效果因人而異；非醫療宣稱",
  },
  {
    sku: "package-10",
    kind: "package",
    nameZh: "10 次套票",
    nameEn: "10-Session Package",
    tagline: "固定 10 次套票，總價網上公開。",
    price: "8,800",
    priceNum: 8800,
    duration: "每次約 [待商戶] 分鐘",
    include: ["10 次護理（適用項目 [待商戶]）", "購買確認與有效期說明"],
    exclude: ["未列明之加購項目", "法定冷靜期（本店自願政策另述）"],
    eligibility: "按條款購買；詳見 /packages 與 /terms",
    note: "有效期／退款／適用項目：[待商戶]",
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
  perSession: string;
  validity: string;
  refundSummary: string;
};

export const PACKAGES: PackageSku[] = [
  {
    id: "package-10",
    nameZh: "10 次套票",
    nameEn: "10-Session Package",
    sessions: "10",
    totalPrice: "8,800",
    perSession: "880",
    validity: "購買起計 [待商戶] 個月內有效",
    refundSummary: "退款／轉讓按條款；詳見 /terms。[待商戶]",
  },
];

export type PriceRow = {
  sku: string;
  nameZh: string;
  nameEn: string;
  /** Single display price for this menu row */
  price: string;
  note?: string;
};

/** /prices table — same four SKUs, one price column each. */
export const PRICE_ROWS: PriceRow[] = SERVICES.map((s) => ({
  sku: s.sku,
  nameZh: s.nameZh,
  nameEn: s.nameEn,
  price: s.price,
  note: s.note,
}));

/** Old scaffold SKUs → canonical trial */
export const LEGACY_TRIAL_REDIRECT: Record<string, string> = {
  "aqua-peel": "hydrafacial-trial",
  cleanse: "hydrafacial-trial",
  lift: "laser-trial",
};

/** Legacy package id used in early scaffold */
export const LEGACY_PACKAGE_REDIRECT: Record<string, string> = {
  "ten-session": "package-10",
};
