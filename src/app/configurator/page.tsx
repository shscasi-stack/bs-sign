import type { Metadata } from 'next';
import { ConfiguratorForm } from '@/components/configurator/ConfiguratorForm';
import { CATEGORY_PASTEL, PALETTE } from '@/lib/kTheme';

export const metadata: Metadata = {
  title: 'LED네온 가격 직접 계산 | 백송사인',
  description: '크기·두께·문구만 넣으면 LED네온 가격이 바로 나와요. 상담 전에 직접 계산해 보세요.',
};

const HOW_TO = ['크기 넣기', '문구·색 고르기', '가격 바로 확인'];

export default function ConfiguratorPage() {
  return (
    <main className="flex flex-1 flex-col" style={{ color: PALETTE.ink }}>
      <section style={{ background: CATEGORY_PASTEL['led-neon'] }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 pt-14 pb-12 sm:px-6">
          <span className="self-start rounded-full bg-white/70 px-4 py-1.5 text-sm font-bold">
            상담 없이 바로 · 참고용 견적
          </span>
          <h1 className="text-4xl leading-[1.2] font-extrabold tracking-tight break-keep sm:text-6xl">
            우리 가게 네온,
            <br />
            <span className="inline-block rounded-2xl px-4" style={{ background: PALETTE.badge }}>
              직접
            </span>{' '}
            계산해 보세요
          </h1>
          <p className="max-w-xl text-lg leading-relaxed font-medium break-keep" style={{ color: PALETTE.inkSub }}>
            크기와 문구만 넣으면 가격이 바로 나와요. 미리보기로 모양도 확인하고, 마음에 들면 그대로
            견적 요청하세요.
          </p>
          <ol className="flex flex-wrap gap-2">
            {HOW_TO.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-2 rounded-full bg-white/70 py-1.5 pr-4 pl-1.5 text-sm font-bold"
              >
                <span
                  className="flex size-7 items-center justify-center rounded-full text-white"
                  style={{ background: PALETTE.ink }}
                >
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="flex-1" style={{ background: PALETTE.soft }}>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <ConfiguratorForm />
        </div>
      </section>
    </main>
  );
}
