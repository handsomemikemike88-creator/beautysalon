import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

/** Demo visuals — always show AI-generated badge; never present as real salon photos. */
export function AiDemoImage({ src, alt, className = "", priority }: Props) {
  return (
    <figure className={`relative overflow-hidden rounded-2xl border border-amber-200/60 bg-stone-900 ${className}`}>
      <Image
        src={src}
        alt={`${alt}（AI 生成示範圖 / AI-generated demo visual）`}
        width={1200}
        height={800}
        className="h-full w-full object-cover"
        priority={priority}
      />
      <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-3 pb-2.5 pt-8 text-[11px] font-medium tracking-wide text-amber-200">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-black/60 px-2.5 py-0.5">
          <span aria-hidden>✦</span>
          AI 生成示範圖 · AI-generated demo visual
        </span>
      </figcaption>
    </figure>
  );
}
