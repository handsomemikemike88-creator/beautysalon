import { SERVICES } from "@/lib/site";

const SITE_URL = "http://localhost:3000";

type JsonLd = Record<string, unknown>;

/** BeautySalon + Service/Offer for the four standard prices.
 *  Name, address and opening hours are omitted until the merchant provides them.
 *  No AggregateRating or self-published review stars.
 */
export function beautySalonJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    url: SITE_URL,
    telephone: "+85294474720",
    areaServed: {
      "@type": "Country",
      name: "HK",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "標準價目",
      itemListElement: SERVICES.map((s) => ({
        "@type": "Offer",
        url: `${SITE_URL}${s.href}`,
        price: String(s.priceNum),
        priceCurrency: "HKD",
        itemOffered: {
          "@type": "Service",
          name: s.nameZh,
          description: s.tagline,
        },
      })),
    },
  };
}

export function faqPageJsonLd(faqs: { q: string; a: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
