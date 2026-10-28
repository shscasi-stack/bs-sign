import Image from 'next/image';
import type { PortfolioItem } from '@/lib/data/portfolio';
import { PALETTE } from '@/lib/kTheme';

/** K안 스타일 작업 사진 카드 (품목 페이지·제작 사례 공용). imageUrl 이 있는 항목만 넘긴다. */
export function WorkCard({ item, background }: { item: PortfolioItem; background: string }) {
  const photos = [item.imageUrl!, item.secondImageUrl].filter((src): src is string => Boolean(src));
  const isPair = photos.length > 1;
  const stacked = isPair && item.pairLayout === 'rows';
  const contain = item.imageFit === 'contain';

  const grid = !isPair ? 'grid-cols-1' : stacked ? 'grid-cols-1 grid-rows-2' : 'grid-cols-2';
  // side-by-side photos are half the card wide; stacked or single ones span the full width
  const sizes =
    isPair && !stacked
      ? '(min-width: 1024px) 190px, (min-width: 640px) 23vw, 45vw'
      : '(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw';

  return (
    <figure className="m-0 flex flex-col gap-3 rounded-[32px] p-3.5" style={{ background }}>
      <div
        className={`relative grid h-[250px] gap-1.5 overflow-hidden rounded-[22px] ${grid}`}
        style={contain ? { background: item.imageBg ?? '#171717' } : undefined}
      >
        {photos.map((src, index) => (
          <div key={src} className="relative">
            <Image
              src={src}
              alt={isPair ? `${item.title} (${index + 1}/${photos.length})` : item.title}
              fill
              quality={90}
              sizes={sizes}
              className={contain ? 'object-contain' : 'object-cover'}
            />
          </div>
        ))}
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
