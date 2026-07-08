import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '제작 사례 | 백송LED네온',
  description: 'LED네온 · 고무스카시 · 아크릴가공 · 포맥스 제작 사례 모음',
};

export default function PortfolioPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="border-b px-4 py-16 text-center">
        <h1 className="text-3xl font-semibold">제작 사례</h1>
        <p className="mt-3 text-muted-foreground">
          완료된 프로젝트 사진을 이곳에 순차적으로 올려드릴 예정입니다.
        </p>
      </section>

      <section className="px-4 py-12">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex aspect-square items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground"
            >
              사진 준비 중
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
