import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ContactButtons } from '@/components/home/ContactButtons';
import { PagedWorkGrid } from '@/components/portfolio/PagedWorkGrid';
import { CATEGORIES, getCategoryBySlug } from '@/lib/data/categories';
import { getPortfolioByCategory } from '@/lib/data/portfolio';
import { CARD_PASTELS, CATEGORY_PASTEL, PALETTE } from '@/lib/kTheme';

type PageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.name} | 백송사인`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const portfolio = getPortfolioByCategory(category.slug).filter((item) => item.imageUrl);
  const isLedNeon = category.slug === 'led-neon';

  return (
    <main className="flex flex-1 flex-col" style={{ color: PALETTE.ink }}>
      {/* 히어로 — 품목 대표 파스텔 */}
      <section style={{ background: CATEGORY_PASTEL[category.slug] }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-14 pb-16 sm:px-6 lg:pt-20 lg:pb-20">
          <span className="self-start rounded-full bg-white/70 px-4 py-1.5 text-sm font-bold">
            {category.tagline}
          </span>
          <h1 className="text-5xl leading-[1.15] font-extrabold tracking-tight sm:text-6xl">
            {category.name}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed font-medium" style={{ color: PALETTE.inkSub }}>
            {category.description}
          </p>
          <ul className="flex flex-wrap gap-2">
            {category.methods.map((method) => (
              <li key={method} className="rounded-full bg-white/65 px-4 py-2 text-sm font-semibold">
                {method}
              </li>
            ))}
          </ul>
          {/* 다른 품목으로 바로 이동 — 지금 보고 있는 품목은 진하게 */}
          <nav aria-label="다른 품목 보기" className="mt-2 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-bold" style={{ color: PALETTE.inkSub }}>
              다른 품목
            </span>
            {CATEGORIES.map((c) =>
              c.slug === category.slug ? (
                <span
                  key={c.slug}
                  aria-current="page"
                  className="rounded-full border-2 border-[#2B2840] bg-[#2B2840] px-4 py-2 text-sm font-bold text-white"
                >
                  {c.name}
                </span>
              ) : (
                <Link
                  key={c.slug}
                  href={`/products/${c.slug}`}
                  className="rounded-full border-2 border-white px-4 py-2 text-sm font-bold transition-transform hover:-translate-y-0.5"
                  style={{ background: CATEGORY_PASTEL[c.slug] }}
                >
                  {c.name}
                </Link>
              )
            )}
          </nav>
          <ContactButtons quoteClassName="bg-[#2B2840] text-white" phoneClassName="bg-white" />
        </div>
      </section>

      {/* 작업 사례 */}
      <section style={{ background: PALETTE.soft }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{category.name} 작업 사례</h2>
          {portfolio.length > 0 ? (
            <PagedWorkGrid items={portfolio} backgrounds={CARD_PASTELS} />
          ) : (
            <p className="rounded-[32px] bg-white px-6 py-14 text-center text-lg leading-relaxed font-medium">
              {category.name} 작업 사진을 준비하고 있어요.
              <br />
              <span style={{ color: PALETTE.inkSub }}>
                제작 가능 여부는 도면·시안을 보내주시면 바로 안내드려요.
              </span>
            </p>
          )}
        </div>
      </section>

      {/* 문의 */}
      <section id="contact" className="scroll-mt-16" style={{ background: PALETTE.cta }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
          <h2 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-5xl">
            {category.name}, 사진만 보내주세요
          </h2>
          <p className="text-base" style={{ color: PALETTE.inkSub }}>
            도면·시안과 원하는 크기를 보내주시면 제작 가능 여부와 견적, 납기를 안내드려요.
          </p>
          <ContactButtons
            className="justify-center"
            quoteClassName="bg-white text-[#2B2840]"
            phoneClassName="bg-[#2B2840] text-white"
          />
          {isLedNeon && (
            <Link href="/configurator" className="text-base font-bold underline underline-offset-4">
              네온 가격, 직접 계산해보기 →
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
