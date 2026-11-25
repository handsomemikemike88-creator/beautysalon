import type { Metadata } from "next";
import type { ReactNode } from "react";
import { STORE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `價目表＋收費承諾｜${STORE_NAME}` },
  description:
    "標準價目：Hydrafacial 免費體驗 HK$0、單次 HK$688、激光脫毛體驗 HK$288、10 次套票 HK$8,800。冇隱藏收費，唔買套票都得。",
};

export default function PricesLayout({ children }: { children: ReactNode }) {
  return children;
}
