import Image from 'next/image';
import type { PortfolioItem } from '@/lib/data/portfolio';
import { PALETTE } from '@/lib/kTheme';

/** K안 스타일 작업 사진 카드 (품목 페이지·제작 사례 공용). imageUrl 이 있는 항목만 넘긴다. */
export function WorkCard({ item, background }: { item: PortfolioItem; background: string }) {
  return (
    <figure className="m-0 flex flex-col gap-3 rounded-[32px] p-3.5" style={{ background }}>
      <div
        className={`relative h-[250px] overflow-hidden rounded-[22px] ${
          item.imageFit === 'contain' ? 'bg-neutral-900' : ''
        }`}
      >
        <Image
          src={item.imageUrl!}
          alt={item.title}
          fill
          quality={90}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
          className={item.imageFit === 'contain' ? 'object-contain' : 'object-cover'}
        />
      </div>
      <figcaption className="flex flex-col gap-1 px-2 pb-1.5">
        <span className="text-xl font-extrabold">{item.title}</span>
        <span className="text-sm" style={{ color: PALETTE.inkSub }}>
          {item.material} · {item.method}
        </span>
      </figcaption>
    </figure>
  );
}
