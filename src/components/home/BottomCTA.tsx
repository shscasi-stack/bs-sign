import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/motion/FadeIn';
import { QUOTE_CTA } from '@/lib/data/navigation';

export function BottomCTA() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <FadeIn>
          <div className="rounded-2xl border border-neutral-200 bg-ink-light px-6 py-14 text-center text-neutral-900">
            <h2 className="text-2xl font-bold sm:text-3xl">
              반복 발주가 편한 제작 파트너를 찾고 계신가요?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
              백송사인은 광고사와 간판업체가 필요한 사인물을 안정적으로 제작할 수 있도록
              거래처별 기준을 관리합니다.
            </p>
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={QUOTE_CTA.href} />}
              className="mt-8 font-semibold"
            >
              {QUOTE_CTA.label}
              <ArrowRightIcon />
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
