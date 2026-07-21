import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/motion/FadeIn';
import { CATEGORIES } from '@/lib/data/categories';
import { QUOTE_CTA } from '@/lib/data/navigation';

const HERO_BADGES = ['자체 CNC·레이저 보유', '소량·대량 제작', '빠른 납기', '전국 택배'];

export function HeroSection() {
  return (
    <section className="bg-white text-neutral-900">
      <div className="mx-auto max-w-6xl px-4 py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.2em] text-point">
              B2B SIGN MANUFACTURING PARTNER
            </p>
            <h1 className="mt-4 text-3xl leading-tight font-extrabold sm:text-4xl lg:text-[2.75rem]">
              간판·인테리어·광고업체를 위한
              <br className="hidden sm:block" /> 광고사인물 제작 전문 공장
            </h1>
            <p className="mt-5 text-base font-medium text-neutral-800">
              고무스카시 · 아크릴문자 · 포맥스가공 · 포맥스돔보 · LED네온
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-neutral-600">
              도면과 시안을 보내주시면 제작 가능 여부와 견적을 빠르게 안내드립니다.
            </p>

            {/* 신뢰 배지 (애드에어 벤치마킹 — 공장 직영·강점 먼저 노출) */}
            <ul className="mt-6 flex flex-wrap gap-2">
              {HERO_BADGES.map((badge) => (
                <li
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-sm text-neutral-700"
                >
                  <CheckIcon className="size-3.5 text-point" />
                  {badge}
                </li>
              ))}
            </ul>

            {/* 포지셔닝: 시공업체와 경쟁하지 않는 전문 제작 파트너 */}
            <p className="mt-5 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-500">
              ※ 현장 시공은 진행하지 않으며, 제작·납품에 집중하는 전문 제작 파트너입니다.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                nativeButton={false}
                render={<Link href={QUOTE_CTA.href} />}
                className="font-semibold"
              >
                {QUOTE_CTA.label}
                <ArrowRightIcon />
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/portfolio" />}
              >
                제작 사례 보기
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {/* 실제 작업장 전경 — 자체 CNC 설비와 LED 네온 샘플월 */}
            <figure className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/factory/factory-overview.jpg"
                  alt="백송사인 작업장 전경 — CNC 장비와 LED 네온 샘플"
                  fill
                  priority
                  quality={90}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="border-t border-neutral-200 px-4 py-2.5 text-xs text-neutral-500">
                백송사인 작업장 — 자체 CNC·레이저 설비로 직접 제작합니다
              </figcaption>
            </figure>
          </FadeIn>
        </div>

        {/* Hero 하단 품목 메뉴 */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 sm:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/products/${category.slug}`}
              className="flex items-center gap-3 bg-white px-5 py-5 transition-colors hover:bg-neutral-50"
            >
              <category.icon className="size-5 text-point" />
              <span className="text-sm font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
