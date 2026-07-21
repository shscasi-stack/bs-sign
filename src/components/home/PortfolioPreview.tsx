import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/motion/FadeIn';
import { getCategoryBySlug } from '@/lib/data/categories';
import { PORTFOLIO_ITEMS } from '@/lib/data/portfolio';

// 카테고리당 하나씩만 미리보기로 노출 (전체는 /portfolio).
const PREVIEW_ITEMS = PORTFOLIO_ITEMS.filter(
  (item, index, all) => all.findIndex((i) => i.category === item.category) === index
);

export function PortfolioPreview() {
  return (
    <section className="bg-ink-light text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">제작 사례</h2>
              <p className="mt-3 max-w-2xl text-neutral-600">
                백송사인이 제작한 다양한 사인물과 가공 결과물을 확인해보세요.
              </p>
            </div>
            <Button
              variant="outline"
              nativeButton={false}
              render={<Link href="/portfolio" />}
            >
              제작 사례 전체보기
              <ArrowRightIcon />
            </Button>
          </div>
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PREVIEW_ITEMS.map((item, index) => {
            const category = getCategoryBySlug(item.category);
            return (
              <FadeIn key={item.slug} delay={index * 0.06}>
                <Link
                  href="/portfolio"
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg"
                >
                  {/* TODO: 제작 사례 실제 사진 교체 — /public/portfolio/{slug}.jpg */}
                  <div
                    className={`flex h-36 items-center justify-center bg-gradient-to-br ${category?.gradientClassName ?? 'from-neutral-400 to-neutral-600'}`}
                  >
                    {category ? (
                      <category.icon className="size-8 text-white/90 transition-transform group-hover:scale-105" />
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="text-xs font-medium text-point">{category?.name}</span>
                    <h3 className="mt-1 font-medium">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
