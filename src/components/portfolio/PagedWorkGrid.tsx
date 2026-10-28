'use client';

import { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { FadeIn } from '@/components/motion/FadeIn';
import type { PortfolioItem } from '@/lib/data/portfolio';
import { PALETTE } from '@/lib/kTheme';
import { WorkCard } from './WorkCard';

/** 3 × 3 grid per page. */
const PAGE_SIZE = 9;

interface PagedWorkGridProps {
  items: PortfolioItem[];
  /** Card backgrounds, cycled by position on the page. */
  backgrounds: readonly string[];
}

/** Work photo grid that shows nine cards at a time with numbered pages below. */
export function PagedWorkGrid({ items, backgrounds }: PagedWorkGridProps) {
  const [page, setPage] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);
  const pageCount = Math.ceil(items.length / PAGE_SIZE);
  const visible = items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const goTo = (next: number) => {
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={topRef} className="flex scroll-mt-24 flex-col gap-8">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item, index) => (
          <FadeIn key={item.slug} delay={(index % 3) * 0.12}>
            <WorkCard item={item} background={backgrounds[index % backgrounds.length]} />
          </FadeIn>
        ))}
      </div>

      {pageCount > 1 && (
        <nav aria-label="작업 사례 페이지" className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            aria-label="이전 페이지"
            className="flex size-11 items-center justify-center rounded-full bg-white disabled:opacity-30"
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-current={i === page ? 'page' : undefined}
              className="flex size-11 items-center justify-center rounded-full text-base font-extrabold"
              style={i === page ? { background: PALETTE.ink, color: '#fff' } : { background: '#fff' }}
            >
              {i + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page === pageCount - 1}
            aria-label="다음 페이지"
            className="flex size-11 items-center justify-center rounded-full bg-white disabled:opacity-30"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </nav>
      )}
    </div>
  );
}
