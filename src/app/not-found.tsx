import Link from "next/link";
import { STORE_NAME } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <p className="text-xs uppercase tracking-widest text-orange-700">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-stone-950">搵唔到呢一頁</h1>
      <p className="mt-3 text-sm text-stone-600">
        {STORE_NAME}：連結可能已過期，或者頁面尚未上線。你可以返去首頁繼續預約體驗。
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-700"
        >
          返首頁
        </Link>
        <Link
          href="/book"
          className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-800"
        >
          預約體驗
        </Link>
        <Link href="/packages" className="rounded-full border border-stone-300 px-5 py-2.5 text-sm">
          睇套票價目
        </Link>
      </div>
    </div>
  );
}
