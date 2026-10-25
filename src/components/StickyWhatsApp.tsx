"use client";

import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/site";
import { WhatsAppLink } from "./WhatsAppLink";

export function StickyWhatsApp() {
  const pathname = usePathname();
  if (pathname?.startsWith("/staff") || pathname?.startsWith("/account")) return null;
  return (
    <WhatsAppLink
      href={whatsappUrl("你好，我想預約體驗。")}
      className="fixed bottom-4 right-4 z-50 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-105 md:bottom-6 md:right-6"
    >
      WhatsApp 預約
    </WhatsAppLink>
  );
}
