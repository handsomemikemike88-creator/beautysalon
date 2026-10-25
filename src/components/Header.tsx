"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";
import { STORE_NAME } from "@/lib/site";
import { track } from "@/lib/analytics";

export function Header() {
  const pathname = usePathname();
  const { lang, setLang, t } = useLang();
  if (pathname?.startsWith("/staff") || pathname?.startsWith("/account")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-stone-800/10 bg-[#faf7f2]/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="min-w-0">
          <span className="block truncate text-sm font-semibold tracking-wide text-stone-950">
            {STORE_NAME}
          </span>
          <span className="block text-[11px] text-amber-800/80">香港美容院 · 明碼 · 不硬銷</span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm text-stone-700 md:flex" aria-label="Main">
          <Link href="/" className="hover:text-orange-700">{t("nav_home")}</Link>
          <Link href="/services" className="hover:text-orange-700">{t("nav_services")}</Link>
          <Link href="/trial/hydrafacial-trial" className="hover:text-orange-700">{t("nav_trial")}</Link>
          <Link href="/prices" className="hover:text-orange-700">{t("nav_prices")}</Link>
          <Link href="/packages" className="hover:text-orange-700">{t("nav_packages")}</Link>
          <Link href="/therapists" className="hover:text-orange-700">{t("nav_therapists")}</Link>
          <Link href="/contact" className="hover:text-orange-700">{t("nav_contact")}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <div className="flex rounded-full border border-stone-300 bg-white text-xs">
            <button
              type="button"
              className={`px-2 py-1 rounded-l-full ${lang === "zh" ? "bg-stone-950 text-amber-100" : "text-stone-600"}`}
              onClick={() => setLang("zh")}
              aria-pressed={lang === "zh"}
            >
              繁
            </button>
            <button
              type="button"
              className={`px-2 py-1 rounded-r-full ${lang === "en" ? "bg-stone-950 text-amber-100" : "text-stone-600"}`}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
          </div>
          <Link
            href="/book"
            className="rounded-full bg-orange-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-orange-700"
            onClick={() => track("click_book_cta", { source: "header" })}
          >
            {t("cta_book")}
          </Link>
        </div>
      </div>
      <nav className="flex gap-3 overflow-x-auto border-t border-stone-200 px-4 py-2 text-xs text-stone-600 md:hidden" aria-label="Mobile">
        <Link href="/services">{t("nav_services")}</Link>
        <Link href="/trial/hydrafacial-trial">{t("nav_trial")}</Link>
        <Link href="/prices">{t("nav_prices")}</Link>
        <Link href="/packages">{t("nav_packages")}</Link>
        <Link href="/therapists">{t("nav_therapists")}</Link>
        <Link href="/book">{t("nav_book")}</Link>
        <Link href="/contact">{t("nav_contact")}</Link>
      </nav>
    </header>
  );
}
