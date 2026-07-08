import Link from 'next/link';
import {
  ArrowRightIcon,
  ClockIcon,
  PackageCheckIcon,
  ShieldCheckIcon,
  TruckIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CATEGORIES } from '@/lib/data/categories';
import { getProductsByCategory } from '@/lib/data/products';

const TRUST_POINTS = [
  { icon: ClockIcon, label: '당일 상담 · 빠른 견적' },
  { icon: ShieldCheckIcon, label: '실내외 시공 가능' },
  { icon: PackageCheckIcon, label: '소량 제작 가능' },
  { icon: TruckIcon, label: '전국 배송' },
];

const HIGHLIGHT_PRODUCTS = CATEGORIES.map(
  (category) => getProductsByCategory(category.slug)[0]
);

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="border-b bg-gradient-to-b from-muted/50 to-background px-4 py-20 text-center">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
          <h1 className="text-3xl font-semibold sm:text-4xl">
            LED네온 · 고무스카시 · 아크릴가공 · 포맥스
          </h1>
          <p className="text-muted-foreground">
            가로/세로, 두께, 색상, 실내/실외까지 직접 골라 실시간으로 견적을 확인하세요.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/configurator" />}>
              맞춤 견적 시작하기
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="#categories" />}
            >
              카테고리 둘러보기
            </Button>
          </div>
        </div>
      </section>

      <section id="categories" className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-semibold">카테고리별로 살펴보세요</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((category) => (
              <Link key={category.slug} href={`/products/${category.slug}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="flex flex-col gap-3">
                    <div
                      className={`flex size-11 items-center justify-center rounded-lg bg-gradient-to-br text-white ${category.gradientClassName}`}
                    >
                      <category.icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-heading font-medium">{category.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {category.tagline}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30 px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST_POINTS.map((point) => (
            <div key={point.label} className="flex items-center gap-3">
              <point.icon className="size-5 shrink-0 text-primary" />
              <span className="text-sm font-medium">{point.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-xl font-semibold">제작 사례 미리보기</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HIGHLIGHT_PRODUCTS.map((product) => (
              <Link key={product.slug} href={`/products/${product.category}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <div
                    className={`h-28 bg-gradient-to-br ${
                      CATEGORIES.find((c) => c.slug === product.category)
                        ?.gradientClassName
                    }`}
                  />
                  <CardContent className="flex flex-col gap-1">
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.description}
                    </p>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {product.priceLabel}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl bg-primary px-6 py-12 text-center text-primary-foreground">
          <h2 className="text-2xl font-semibold">지금 바로 무료 견적을 받아보세요</h2>
          <p className="text-primary-foreground/80">
            원하는 문구와 사이즈만 입력하면 실시간으로 가격을 확인할 수 있어요.
          </p>
          <Button
            size="lg"
            variant="secondary"
            nativeButton={false}
            render={<Link href="/configurator" />}
          >
            맞춤 견적 시작하기
            <ArrowRightIcon />
          </Button>
        </div>
      </section>
    </main>
  );
}
