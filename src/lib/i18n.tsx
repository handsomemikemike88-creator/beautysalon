"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "zh" | "en";

type Dict = Record<string, { zh: string; en: string }>;

export const dict: Dict = {
  nav_home: { zh: "首頁", en: "Home" },
  nav_services: { zh: "服務", en: "Services" },
  nav_trial: { zh: "體驗", en: "Trials" },
  nav_prices: { zh: "價目", en: "Prices" },
  nav_packages: { zh: "套票", en: "Packages" },
  nav_therapists: { zh: "信任", en: "Trust" },
  nav_book: { zh: "預約", en: "Book" },
  nav_contact: { zh: "聯絡", en: "Contact" },
  cta_book: { zh: "預約體驗", en: "Book a trial" },
  cta_packages: { zh: "睇套票價目", en: "View packages & prices" },
  cta_whatsapp: { zh: "WhatsApp 預約", en: "Book via WhatsApp" },
  hero_line: {
    zh: "單次都可以。價錢網上睇到，唔硬銷。",
    en: "Single visits welcome. Prices online. No hard sell.",
  },
  prices_title: { zh: "標準價目", en: "Standard price list" },
  prices_note: {
    zh: "以下為商戶指定示範標準菜單（四項）。只按公開項目收費，唔做個人化報價。",
    en: "Merchant demo standard menu (four items only). Public prices; no custom quotes.",
  },
  book_title: { zh: "預約體驗", en: "Book a trial" },
  book_deposit: { zh: "訂金說明", en: "Deposit" },
  book_reschedule: { zh: "改期／取消（24 小時）", en: "Reschedule / cancel (24h)" },
  book_pics: {
    zh: "我已閱讀並明白《收集個人資料聲明》，同意本店為處理預約而使用我的稱呼、電話及電郵（如有）。（必填）",
    en: "I have read the PICS and agree to use of my name, phone and email (if any) for booking. (Required)",
  },
  book_marketing: {
    zh: "（選填）我同意本店以 WhatsApp／短訊向我發送護理及套票資訊。我可隨時免費取消（回覆「STOP」）。不剔選不影響預約。",
    en: "(Optional) I agree to receive promo WhatsApp/SMS. Opt out anytime (reply STOP). Not required to book.",
  },
  book_submit: { zh: "確認預約（示範）", en: "Confirm booking (demo)" },
  terms_title: { zh: "條款及細則", en: "Terms" },
  terms_cooling: {
    zh: "本店自願冷靜期政策（如有）並非法定冷靜期。[待商戶]",
    en: "Any voluntary cooling-off is not a statutory cooling-off period. [Pending merchant]",
  },
  col_service: { zh: "服務", en: "Service" },
  col_price: { zh: "價錢", en: "Price" },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
};

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("zh");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("hk-salon-lang");
      if (saved === "en" || saved === "zh") setLangState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem("hk-salon-lang", l);
      document.documentElement.lang = l === "zh" ? "zh-HK" : "en";
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback(
    (key: keyof typeof dict) => dict[key][lang] ?? dict[key].zh,
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang outside LangProvider");
  return ctx;
}
