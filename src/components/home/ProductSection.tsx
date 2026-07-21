import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { FadeIn } from '@/components/motion/FadeIn';
import { CATEGORIES } from '@/lib/data/categories';

export function ProductSection() {
  return (
    <section id="products" className="scroll-mt-16 bg-ink-light text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <FadeIn>
          <h2 className="text-2xl font-bold sm:text-3xl">소재별 제작 품목과 가공방식</h2>
          <p className="mt-3 max-w-2xl text-neutral-600">
            소재마다 가능한 가공방식과 주로 발주하는 고객을 정리했습니다. 광고사·간판업체가
            반복 발주하기 편하도록 품목별로 나눴습니다.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category, index) => (
            <FadeIn key={category.slug} delay={index * 0.06}>
              <Link
                href={`/products/${category.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-lg"
              >
                {/* TODO: 제품 클로즈업 이미지 교체 — /public/images/product-{slug}.jpg */}
                <div
                  className={`flex h-40 items-center justify-center bg-gradient-to-br ${category.gradientClassName}`}
                >
                  <category.icon className="size-10 text-white/90 transition-transform group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-lg font-semibold">{category.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {category.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {category.methods.map((method) => (
                      <span
                        key={method}
                        className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 flex-1 text-xs text-neutral-500">
                    <span className="font-medium text-neutral-600">주문 고객</span> · {category.customers}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-point">
                    {category.name} 보기
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
