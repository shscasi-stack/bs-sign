import type { CSSProperties } from 'react';
import Image from 'next/image';
import type { PortfolioItem } from '@/lib/data/portfolio';
import { PALETTE } from '@/lib/kTheme';

/** K안 스타일 작업 사진 카드 (품목 페이지·제작 사례 공용). imageUrl 이 있는 항목만 넘긴다. */
export function WorkCard({ item, background }: { item: PortfolioItem; background: string }) {
  const photos = [item.imageUrl!, ...(item.extraImageUrls ?? [])];
  const count = photos.length;
  const layout = count === 1 ? 'single' : (item.photoLayout ?? 'columns');
  const contain = item.imageFit === 'contain';

  const gridStyle: CSSProperties =
    layout === 'columns'
      ? { gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }
      : layout === 'rows'
        ? { gridTemplateRows: `repeat(${count}, minmax(0, 1fr))` }
        : layout === 'feature'
          ? { gridTemplateColumns: '3fr 2fr', gridTemplateRows: `repeat(${count - 1}, minmax(0, 1fr))` }
          : {};
  if (contain) gridStyle.background = item.imageBg ?? '#171717';

  // rendered width of each photo, so the browser fetches a sharp enough variant
  const sizesFor = (index: number) => {
    if (layout === 'columns') return `(min-width: 1024px) ${Math.round(380 / count)}px, ${Math.round(90 / count)}vw`;
    if (layout === 'feature') return index === 0 ? '(min-width: 1024px) 230px, 55vw' : '(min-width: 1024px) 150px, 36vw';
    return '(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw';
  };

  return (
    <figure className="m-0 flex flex-col gap-3 rounded-[32px] p-3.5" style={{ background }}>
      <div className="relative grid h-[250px] gap-1.5 overflow-hidden rounded-[22px]" style={gridStyle}>
        {photos.map((src, index) => (
          <div
            key={src}
            className="relative"
            style={layout === 'feature' && index === 0 ? { gridRow: `1 / span ${count - 1}` } : undefined}
          >
            <Image
              src={src}
              alt={count > 1 ? `${item.title} (${index + 1}/${count})` : item.title}
              fill
              quality={90}
              sizes={sizesFor(index)}
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
