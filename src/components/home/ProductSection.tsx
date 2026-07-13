import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { FadeIn } from '@/components/motion/FadeIn';
import { CATEGORIES } from '@/lib/data/categories';

export function ProductSection() {
  return (
    <section id="products" className="scroll-mt-16 bg-ink-light text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <FadeIn>
          <h2 className="text-2xl font-bold sm:text-3xl">백송사인의 제작 품목</h2>
          <p className="mt-3 max-w-2xl text-neutral-600">
            광고사와 간판업체가 반복 발주하기 편하도록 품목별 제작 기준과 사례를 정리했습니다.
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
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                    {category.description}
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
