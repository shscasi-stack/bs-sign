import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/motion/FadeIn';
import { PortfolioCard } from '@/components/portfolio/PortfolioCard';
import { CATEGORIES, getCategoryBySlug } from '@/lib/data/categories';
import { getPortfolioByCategory } from '@/lib/data/portfolio';
import { QUOTE_CTA } from '@/lib/data/navigation';

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
    <main className="flex flex-1 flex-col bg-white text-neutral-900">
      {/* 히어로 */}
      <section className="border-b border-neutral-200 bg-ink-light">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.2em] text-point">
              SIGN MANUFACTURING
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div
                className={`flex size-12 items-center justify-center rounded-lg bg-gradient-to-br ${category.gradientClassName}`}
              >
                <category.icon className="size-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">{category.name}</h1>
            </div>
            <p className="mt-4 max-w-xl text-neutral-600">{category.description}</p>
          </FadeIn>
        </div>
      </section>

      {/* 제작 사례 */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <h2 className="text-2xl font-bold">{category.name} 제작 사례</h2>
          </FadeIn>
          {portfolio.length > 0 ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {portfolio.map((item, index) => (
                <FadeIn key={item.slug} delay={index * 0.06}>
                  <PortfolioCard item={item} category={category} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-xl border border-dashed border-neutral-300 px-6 py-12 text-center text-neutral-500">
              {category.name} 작업 사진을 준비하고 있어요.
              <br />
              제작 가능 여부는 도면·시안을 보내주시면 바로 안내드려요.
            </p>
          )}
        </div>
      </section>

      {/* 카테고리별 CTA */}
      <section id="contact" className="border-t border-neutral-200 bg-ink-light">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
          <h2 className="text-xl font-bold sm:text-2xl">{category.name} 제작을 문의하세요</h2>
          <p className="text-neutral-600">
            도면과 시안, 규격을 보내주시면 제작 가능 여부와 견적, 납기를 빠르게 안내해 드립니다.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {isLedNeon && (
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/configurator" />}
              >
                실시간 견적 계산기
              </Button>
            )}
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={QUOTE_CTA.href} />}
              className="font-semibold"
            >
              {QUOTE_CTA.label}
              <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
