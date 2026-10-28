import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactButtons } from '@/components/home/ContactButtons';
import { PagedWorkGrid } from '@/components/portfolio/PagedWorkGrid';
import { CATEGORIES } from '@/lib/data/categories';
import { getPortfolioByCategory } from '@/lib/data/portfolio';
import { CATEGORY_PASTEL, PALETTE } from '@/lib/kTheme';

export const metadata: Metadata = {
  title: '제작 사례 | 백송사인',
  description: '고무스카시 · 아크릴 가공 · 포맥스 가공 · LED 네온 제작 사례 모음',
};

export default function PortfolioPage() {
  const allGroups = CATEGORIES.map((category) => ({
    category,
    items: getPortfolioByCategory(category.slug).filter((item) => item.imageUrl),
  }));
  const groups = allGroups.filter((g) => g.items.length > 0);
  const pending = allGroups.filter((g) => g.items.length === 0).map((g) => g.category);

  return (
    <main className="flex flex-1 flex-col" style={{ color: PALETTE.ink }}>
      <section style={{ background: PALETTE.band }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pt-14 pb-12 sm:px-6">
          <h1 className="text-5xl leading-[1.15] font-extrabold tracking-tight sm:text-6xl">제작 사례</h1>
          <p className="max-w-xl text-lg leading-relaxed font-medium" style={{ color: PALETTE.inkSub }}>
            백송사인이 직접 만든 작업들이에요.
          </p>
          <nav className="flex flex-wrap gap-2">
            {allGroups.map(({ category, items }) => (
              <a
                key={category.slug}
                href={items.length > 0 ? `#${category.slug}` : `/products/${category.slug}`}
                className="rounded-full px-4 py-2 text-sm font-bold"
                style={{ background: CATEGORY_PASTEL[category.slug] }}
              >
                {category.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div style={{ background: PALETTE.soft }}>
        {groups.map(({ category, items }) => (
          <section key={category.slug} id={category.slug} className="scroll-mt-20">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{category.name}</h2>
                <Link
                  href={`/products/${category.slug}`}
                  className="text-base font-bold underline underline-offset-4"
                >
                  {category.name} 자세히 보기 →
                </Link>
              </div>
              <PagedWorkGrid items={items} backgrounds={[CATEGORY_PASTEL[category.slug]]} />
            </div>
          </section>
        ))}

        {pending.length > 0 && (
          <div className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
            <p className="rounded-[32px] bg-white px-6 py-8 text-center text-lg font-medium">
              {pending.map((c) => c.name).join(' · ')} 작업 사진은 준비하고 있어요.
              <br />
              <span className="text-base" style={{ color: PALETTE.inkSub }}>
                제작 가능 여부는 도면·시안을 보내주시면 바로 안내드려요.
              </span>
            </p>
          </div>
        )}
      </div>

      <section style={{ background: PALETTE.cta }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
          <h2 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            사진만 보내주세요,
            <br />
            나머진 저희가!
          </h2>
          <ContactButtons
            className="justify-center"
            quoteClassName="bg-white text-[#2B2840]"
            phoneClassName="bg-[#2B2840] text-white"
          />
        </div>
      </section>
    </main>
  );
}
