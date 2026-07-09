import type { Metadata } from 'next';
import { PortfolioCard } from '@/components/portfolio/PortfolioCard';
import { CATEGORIES } from '@/lib/data/categories';
import { getPortfolioByCategory } from '@/lib/data/portfolio';

export const metadata: Metadata = {
  title: '제작 사례 | 백송LED네온',
  description: 'LED네온 · 고무스카시 · 아크릴가공 · 포맥스 제작 사례 모음',
};

export default function PortfolioPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="border-b px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold">제작 사례</h1>
        <p className="mt-3 text-muted-foreground">
          완료된 프로젝트 사진을 이곳에 순차적으로 올려드릴 예정입니다.
        </p>
      </section>

      {CATEGORIES.map((category) => {
        const items = getPortfolioByCategory(category.slug);
        if (items.length === 0) return null;

        return (
          <section key={category.slug} className="border-b px-4 py-12 last:border-b-0">
            <div className="mx-auto max-w-6xl">
              <div className="flex items-center gap-2">
                <div
                  className={`flex size-8 items-center justify-center rounded-lg bg-gradient-to-br text-white ${category.gradientClassName}`}
                >
                  <category.icon className="size-4" />
                </div>
                <h2 className="text-xl font-semibold">{category.name}</h2>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <PortfolioCard key={item.slug} item={item} category={category} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
