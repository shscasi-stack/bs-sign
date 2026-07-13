import type { Metadata } from 'next';
import { PortfolioCard } from '@/components/portfolio/PortfolioCard';
import { FadeIn } from '@/components/motion/FadeIn';
import { CATEGORIES } from '@/lib/data/categories';
import { getPortfolioByCategory } from '@/lib/data/portfolio';

export const metadata: Metadata = {
  title: '제작 사례 | 백송사인',
  description: '고무스카시 · 아크릴 가공 · 포맥스 가공 · LED 네온 제작 사례 모음',
};

export default function PortfolioPage() {
  return (
    <main className="flex flex-1 flex-col bg-ink text-white">
      <section className="border-b border-white/10 px-4 py-16 text-center">
        <FadeIn>
          <p className="text-xs font-semibold tracking-[0.2em] text-point">PORTFOLIO</p>
          <h1 className="mt-3 text-3xl font-bold">제작 사례</h1>
          <p className="mt-3 text-white/70">
            백송사인이 제작한 다양한 사인물과 가공 결과물을 확인해보세요.
          </p>
        </FadeIn>
      </section>

      {CATEGORIES.map((category) => {
        const items = getPortfolioByCategory(category.slug);
        if (items.length === 0) return null;

        return (
          <section key={category.slug} className="border-b border-white/10 px-4 py-14 last:border-b-0">
            <div className="mx-auto max-w-6xl">
              <FadeIn>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex size-8 items-center justify-center rounded-lg bg-gradient-to-br text-white ${category.gradientClassName}`}
                  >
                    <category.icon className="size-4" />
                  </div>
                  <h2 className="text-xl font-bold">{category.name}</h2>
                </div>
              </FadeIn>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, index) => (
                  <FadeIn key={item.slug} delay={index * 0.06}>
                    <PortfolioCard item={item} category={category} />
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
