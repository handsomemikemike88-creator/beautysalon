import Link from "next/link";
import { BookCta } from "@/components/BookCta";
import { WhatsAppLink } from "@/components/WhatsAppLink";
import { whatsappUrl } from "@/lib/site";

export function ServiceCtas({
  source,
  bookHref = "/book",
  whatsappPrefill = "你好，我想預約體驗。",
}: {
  source: string;
  bookHref?: string;
  whatsappPrefill?: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <BookCta href={bookHref} source={source} />
      <Link
        href="/prices"
        className="inline-flex items-center justify-center rounded-full border border-amber-700/40 bg-white px-5 py-2.5 text-sm font-medium text-stone-900 hover:border-orange-400"
      >
        睇套票價目
      </Link>
      <WhatsAppLink
        href={whatsappUrl(whatsappPrefill)}
        className="inline-flex items-center justify-center rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-5 py-2.5 text-sm font-medium text-emerald-800"
      >
        WhatsApp 預約
      </WhatsAppLink>
    </div>
  );
}
