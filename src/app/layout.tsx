import type { Metadata } from "next";
import "./globals.css";
import { AppChrome } from "@/components/AppChrome";
import { JsonLd } from "@/components/JsonLd";
import { LangProvider } from "@/lib/i18n";
import { beautySalonJsonLd } from "@/lib/schema";
import { STORE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: `${STORE_NAME}｜香港美容院｜預約體驗`,
    template: `%s｜${STORE_NAME}`,
  },
  description:
    "香港獨立美容院：單次都可以，價錢網上睇到，唔硬銷。預約體驗、標準價目與套票。店名、地址同營業時間待商戶提供。",
  openGraph: {
    title: `${STORE_NAME}｜單次 · 明碼 · 不硬銷`,
    description: "預約體驗｜睇套票價目｜WhatsApp 預約",
    locale: "zh_HK",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-HK">
      <body className="min-h-screen antialiased">
        <LangProvider>
          <JsonLd data={beautySalonJsonLd()} />
          <AppChrome>{children}</AppChrome>
        </LangProvider>
      </body>
    </html>
  );
}
