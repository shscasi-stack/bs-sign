import type { Metadata } from 'next';
import { ConfiguratorForm } from '@/components/configurator/ConfiguratorForm';
import { CATEGORY_PASTEL, PALETTE } from '@/lib/kTheme';

export const metadata: Metadata = {
  title: 'LED네온 단가 계산 | 백송사인',
  description: '크기·두께·문구를 넣으면 LED네온 참고 견적을 바로 계산해 드려요.',
};

export default function ConfiguratorPage() {
  return (
    <main className="flex flex-1 flex-col" style={{ color: PALETTE.ink }}>
      <section style={{ background: CATEGORY_PASTEL['led-neon'] }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 pt-14 pb-12 sm:px-6">
          <span className="self-start rounded-full bg-white/70 px-4 py-1.5 text-sm font-bold">
            참고용 견적
          </span>
          <h1 className="text-5xl leading-[1.15] font-extrabold tracking-tight sm:text-6xl">
            LED네온 단가 계산
          </h1>
          <p className="max-w-xl text-lg leading-relaxed font-medium" style={{ color: PALETTE.inkSub }}>
            크기와 두께, 문구를 넣으면 가격이 바로 계산돼요. 정확한 금액은 시안을 확정한 뒤
            안내드려요.
          </p>
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
