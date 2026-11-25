import Link from "next/link";
import { DEMO_THERAPISTS, type DemoTherapist } from "@/lib/site";

function AbstractAvatar({ variant }: { variant: DemoTherapist["variant"] }) {
  if (variant === "amber") {
    return (
      <svg
        viewBox="0 0 80 80"
        className="h-16 w-16"
        aria-hidden="true"
        role="img"
      >
        <rect width="80" height="80" rx="40" fill="#1c1917" />
        <circle cx="40" cy="32" r="14" fill="#d4a017" opacity="0.9" />
        <path d="M18 70c4-16 14-24 22-24s18 8 22 24" fill="#b45309" />
        <rect x="28" y="14" width="24" height="6" rx="3" fill="#faf7f2" opacity="0.35" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 80 80"
      className="h-16 w-16"
      aria-hidden="true"
      role="img"
    >
      <rect width="80" height="80" rx="40" fill="#292524" />
      <polygon points="40,12 64,40 40,68 16,40" fill="#d4a017" opacity="0.85" />
      <circle cx="40" cy="40" r="10" fill="#faf7f2" />
    </svg>
  );
}

export function TherapistTrust({
  heading = "護理團隊（示範內容）",
  showLink = false,
}: {
  heading?: string;
  showLink?: boolean;
}) {
  return (
    <section>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-stone-950">{heading}</h2>
          <p className="mt-1 text-sm text-stone-600">
            以下係示範佔位，並非本店真實護理師，亦唔係真人相片。真實團隊資料待商戶提供。
          </p>
        </div>
        {showLink ? (
          <Link href="/therapists" className="shrink-0 text-sm text-orange-700 hover:underline">
            信任頁 →
          </Link>
        ) : null}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {DEMO_THERAPISTS.map((card) => (
          <article
            key={card.id}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className="overflow-hidden rounded-full border border-amber-400/40">
                <AbstractAvatar variant={card.variant} />
              </div>
              <span className="rounded-full border border-amber-400/60 bg-amber-50 px-2 py-0.5 text-[11px] font-medium tracking-wide text-amber-800">
                示範內容
              </span>
            </div>
            <h3 className="mt-3 font-semibold text-stone-950">{card.name}</h3>
            <p className="text-sm text-stone-600">{card.focus}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
