import Link from "next/link";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

const NAV = [
  { href: "/staff", label: "儀表板" },
  { href: "/staff/pipeline", label: "CRM 流程" },
  { href: "/staff/calendar", label: "日曆" },
  { href: "/staff/leads", label: "客戶資料" },
  { href: "/staff/reminders", label: "提醒草稿" },
];

export default function StaffLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <div className="border-b border-amber-700/40 bg-stone-950 px-4 py-2 text-center text-xs text-amber-100">
        DEMO 員工後台 · 樣本資料 · 提醒唔會自動傳送 · 本地 only
      </div>
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link href="/staff" className="font-semibold text-orange-700">
            美容院員工後台
          </Link>
          <nav className="flex flex-wrap gap-3 text-sm">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="text-stone-600 hover:text-orange-700">
                {n.label}
              </Link>
            ))}
            <Link href="/staff/login" className="text-stone-500">
              登入
            </Link>
            <Link href="/" className="text-stone-400">
              公開網站
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
