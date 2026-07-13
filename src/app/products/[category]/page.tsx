import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/motion/FadeIn';
import { CATEGORIES, getCategoryBySlug } from '@/lib/data/categories';
import { getProductsByCategory } from '@/lib/data/products';
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

  const products = getProductsByCategory(category.slug);
  const isLedNeon = category.slug === 'led-neon';

  return (
    <main className="flex flex-1 flex-col bg-ink text-white">
      {/* 히어로 */}
      <section className="border-b border-white/10">
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
            <p className="mt-4 max-w-xl text-white/70">{category.description}</p>
          </FadeIn>
        </div>
      </section>

      {/* 제품 그리드 */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <FadeIn key={product.slug} delay={index * 0.06}>
                <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-2">
                  {/* TODO: 제품 클로즈업 이미지 교체 — /public/images/product-{slug}.jpg
                      (측면 두께·절단면·소재 질감이 보이는 컷) */}
                  <div
                    className={`flex h-40 items-center justify-center bg-gradient-to-br ${category.gradientClassName}`}
                  >
                    <category.icon className="size-9 text-white/90" />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h2 className="font-heading text-lg font-semibold">{product.name}</h2>
                    <p className="flex-1 text-sm leading-relaxed text-white/60">
                      {product.description}
                    </p>
                    <dl className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-xs">
                      <div>
                        <dt className="text-white/40">소재</dt>
                        <dd className="mt-0.5 text-white/80">{product.material}</dd>
                      </div>
                      <div>
                        <dt className="text-white/40">가공 방식</dt>
                        <dd className="mt-0.5 text-white/80">{product.method}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 카테고리별 CTA */}
      <section id="contact" className="border-t border-white/10 bg-ink-2">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-16 text-center">
          <h2 className="text-xl font-bold sm:text-2xl">{category.name} 제작을 문의하세요</h2>
          <p className="text-white/70">
            도면과 시안, 규격을 보내주시면 제작 가능 여부와 견적, 납기를 빠르게 안내해 드립니다.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            {isLedNeon && (
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/configurator" />}
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
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
