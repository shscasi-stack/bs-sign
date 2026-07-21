import Link from 'next/link';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/motion/FadeIn';
import { CATEGORIES } from '@/lib/data/categories';
import { QUOTE_CTA } from '@/lib/data/navigation';

const HERO_BADGES = ['자체 CNC·레이저 보유', '소량·대량 제작', '빠른 납기', '전국 택배'];

export function HeroSection() {
  return (
    <section className="bg-ink text-white">
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
            <p className="mt-5 text-base font-medium text-white/90">
              고무스카시 · 아크릴문자 · 포맥스가공 · 포맥스돔보 · LED네온
            </p>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-white/70">
              도면과 시안을 보내주시면 제작 가능 여부와 견적을 빠르게 안내드립니다.
            </p>

            {/* 신뢰 배지 (애드에어 벤치마킹 — 공장 직영·강점 먼저 노출) */}
            <ul className="mt-6 flex flex-wrap gap-2">
              {HERO_BADGES.map((badge) => (
                <li
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-sm text-white/85"
                >
                  <CheckIcon className="size-3.5 text-point" />
                  {badge}
                </li>
              ))}
            </ul>

            {/* 포지셔닝: 시공업체와 경쟁하지 않는 전문 제작 파트너 */}
            <p className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">
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
                className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                제작 사례 보기
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            {/* TODO: 대표 제품 이미지 교체 — /public/images/hero-main.jpg
                (고무스카시·아크릴·포맥스·LED네온이 조합된 클로즈업, 측면 두께·LED 점등이 보이는 컷) */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-ink-2">
              <div className="absolute inset-0 bg-gradient-to-br from-point/20 via-transparent to-neon/20" />
              <div className="grid h-full grid-cols-2 gap-3 p-4">
                {CATEGORIES.map((category) => (
                  <div
                    key={category.slug}
                    className="flex flex-col justify-between rounded-lg border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div
                      className={`flex size-9 items-center justify-center rounded-md bg-gradient-to-br ${category.gradientClassName}`}
                    >
                      <category.icon className="size-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-white/90">{category.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Hero 하단 품목 메뉴 */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-4">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/products/${category.slug}`}
              className="flex items-center gap-3 bg-ink px-5 py-5 transition-colors hover:bg-ink-2"
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
