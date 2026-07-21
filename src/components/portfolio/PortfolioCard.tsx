import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import type { Category } from '@/lib/data/categories';
import type { PortfolioItem } from '@/lib/data/portfolio';

interface PortfolioCardProps {
  item: PortfolioItem;
  category: Category;
}

export function PortfolioCard({ item, category }: PortfolioCardProps) {
  const specs = [
    { label: '소재', value: item.material },
    { label: '두께', value: item.thickness ?? '문의' },
    { label: '크기', value: item.size ?? '문의' },
    { label: '제작 방식', value: item.method },
  ];

  const card = (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-2 transition-colors group-hover:border-white/25">
      {item.imageUrl ? (
        <div className="relative h-44 w-full">
          <Image src={item.imageUrl} alt={item.title} fill className="object-cover" />
        </div>
      ) : (
        // TODO: 제작 사례 실제 사진 교체 — /public/portfolio/{slug}.jpg
        <div
          className={`flex h-44 flex-col items-center justify-center gap-2 bg-gradient-to-br text-white ${category.gradientClassName}`}
        >
          <category.icon className="size-8" />
          <span className="text-xs text-white/80">사진 준비 중</span>
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <span className="text-xs font-medium text-point">{category.name}</span>
          <h3 className="mt-1 font-heading font-semibold text-white">{item.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-white/60">{item.description}</p>
        </div>
        <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-2 border-t border-white/10 pt-3 text-xs">
          {specs.map((spec) => (
            <div key={spec.label}>
              <dt className="text-white/40">{spec.label}</dt>
              <dd className="mt-0.5 text-white/80">{spec.value}</dd>
            </div>
          ))}
        </dl>
        {item.caseStudy && (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-point">
            사례 자세히 보기
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        )}
      </div>
    </div>
  );

  if (!item.caseStudy) return card;

  return (
    <Link href={`/portfolio/${item.slug}`} className="group block h-full">
      {card}
    </Link>
  );
}
