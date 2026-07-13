import type { Metadata } from 'next';
import { QuoteForm } from '@/components/quote/QuoteForm';

export const metadata: Metadata = {
  title: '견적 문의 | 백송사인',
  description:
    '도면과 시안을 보내주시면 제작 가능 여부, 예상 견적, 납기를 안내드립니다. 고무스카시·아크릴·포맥스·LED 네온 제작 견적 문의.',
};

export default function QuotePage() {
  return (
    <main className="flex flex-1 flex-col bg-ink-light">
      <section className="bg-point text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/70">GET A QUOTE</p>
          <h1 className="mt-3 text-2xl font-bold sm:text-3xl">도면·시안 보내고 견적받기</h1>
          <p className="mt-3 text-white/80">
            아래 정보를 보내주시면 제작 가능 여부, 예상 견적, 납기를 확인해드립니다.
          </p>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-3xl">
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
