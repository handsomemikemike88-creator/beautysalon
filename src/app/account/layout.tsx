import Link from "next/link";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="border-b border-amber-700/30 bg-stone-950 px-4 py-2 text-center text-xs text-amber-100">
        客戶帳戶 · DEMO · 樣本資料
      </div>
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <Link href="/account" className="font-semibold text-orange-700">
            我的預約
          </Link>
          <nav className="flex gap-3 text-sm">
            <Link href="/account/login" className="text-stone-600 hover:text-orange-700">
              登入
            </Link>
            <Link href="/account/register" className="text-stone-600 hover:text-orange-700">
              註冊
            </Link>
            <Link href="/" className="text-stone-400">
              公開網站
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-6">{children}</main>
    </div>
  );
}
