"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";

export function BookCta({
  href = "/book",
  source,
  className,
}: {
  href?: string;
  source: string;
  className?: string;
}) {
  const { t } = useLang();
  return (
    <Link
      href={href}
      className={
        className ??
        "inline-flex items-center justify-center rounded-full bg-orange-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-orange-700"
      }
      onClick={() => track("click_book_cta", { source })}
    >
      {t("cta_book")}
    </Link>
  );
}
