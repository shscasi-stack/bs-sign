import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CATEGORIES, getCategoryBySlug } from '@/lib/data/categories';
import { getProductsByCategory } from '@/lib/data/products';

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
    title: `${category.name} | 백송LED네온`,
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

  return (
    <main className="flex flex-1 flex-col">
      <section
        className={`bg-gradient-to-br px-4 py-16 text-white ${category.gradientClassName}`}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-3">
          <div className="flex size-12 items-center justify-center rounded-lg bg-white/20">
            <category.icon className="size-6" />
          </div>
          <h1 className="text-3xl font-semibold">{category.name}</h1>
          <p className="max-w-xl text-white/90">{category.description}</p>
        </div>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.slug} className="flex h-full flex-col">
                <div
                  className={`h-32 bg-gradient-to-br ${category.gradientClassName}`}
                />
                <CardContent className="flex flex-1 flex-col gap-2">
                  <p className="font-medium">{product.name}</p>
                  <p className="flex-1 text-sm text-muted-foreground">
                    {product.description}
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {product.priceLabel}
                  </p>
                  <Button
                    nativeButton={false}
                    render={<Link href={product.ctaHref} />}
                    className="mt-2"
                  >
                    {product.ctaLabel}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="border-t bg-muted/30 px-4 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h2 className="text-xl font-semibold">
            {category.name} 제작이 궁금하신가요?
          </h2>
          <p className="text-muted-foreground">
            사이즈, 수량, 원하는 디자인을 알려주시면 담당자가 빠르게 견적을 안내해
            드립니다.
          </p>
          {category.slug === 'led-neon' ? (
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/configurator" />}
            >
              맞춤 견적 시작하기
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">
              전화 및 이메일 문의처는 준비 중입니다. 우선 LED네온 견적 도구로
              대략적인 제작 규모를 가늠해 보셔도 좋아요.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
