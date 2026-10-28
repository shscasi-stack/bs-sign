import Image from 'next/image';
import Link from 'next/link';
import { CountUp } from '@/components/motion/CountUp';
import { FadeIn } from '@/components/motion/FadeIn';
import { PopIn } from '@/components/motion/PopIn';
import { CATEGORY_PASTEL, PALETTE } from '@/lib/kTheme';
import { ContactButtons } from './ContactButtons';

/**
 * 메인페이지 K안 (파스텔 버전).
 * 디자인 시안 "K안 · 도파민 컬러"의 pastel 테마를 그대로 옮긴 것.
 * 색은 src/lib/kTheme.ts 에서 관리한다.
 */

const STATS = [
  { count: 34, unit: '년', small: '아버지와 아들, 2대째' },
  { big: '1~3일', small: '보통 걸리는 시간' },
  { count: 200, unit: '곳', suffix: ' 이상', small: '믿고 맡기는 업체' },
  { big: '시공은\n직접', small: '완성품으로 보내드려요, 설치는 직접 해주세요', compact: true },
] as const;

/**
 * containBg: 사진 전체를 보여 줄 때(잘리면 안 되는 사진) 남는 자리를 채울 배경.
 * focus: 꽉 채워 자를 때 사진의 어느 쪽을 보여 줄지 (CSS object-position).
 */
const WORKS: { src: string; alt: string; caption: string; bg: string; containBg?: string; focus?: string }[] = [
  { src: '/images/work/neon-spring-night.jpg', alt: '하트 문구 LED네온', caption: '하트 문구 네온', bg: '#FFD6E2' },
  {
    src: '/images/work/neon-cider-star.jpg',
    alt: '음료 브랜드 별 로고 LED네온',
    caption: '음료 브랜드 별 로고',
    bg: '#D4F2E6',
    containBg: '#0c0b0c',
  },
  {
    src: '/images/work/formex-food-pop-stands.jpg',
    alt: '식품 진열 POP 스탠드 (포맥스 돔보)',
    caption: '식품 진열 POP 스탠드',
    bg: '#FFEBC2',
    // very wide photo: show the large stands on the left rather than a thin strip
    focus: '12% 50%',
  },
];

const ITEMS = [
  { slug: 'rubber-scasi', name: '고무스카시', desc: '고무 + 알루미늄 입체 문자', bg: CATEGORY_PASTEL['rubber-scasi'] },
  { slug: 'acrylic', name: '아크릴', desc: '투명 · 유색 · 미러 · 백색 · 검정 무광', bg: CATEGORY_PASTEL.acrylic },
  { slug: 'formex', name: '포맥스 가공 · 돔보', desc: '실사 외곽선 그대로', bg: CATEGORY_PASTEL.formex },
  { slug: 'led-neon', name: 'LED네온', desc: '6mm · 12mm 실리콘 네온', bg: CATEGORY_PASTEL['led-neon'] },
] as const;

export function KHome() {
  return (
    <div className="w-full" style={{ color: PALETTE.ink }}>
      {/* 히어로 */}
      <section style={{ background: PALETTE.heroBg }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pt-14 pb-20 sm:px-6 lg:flex-row lg:items-center lg:pt-20 lg:pb-24">
          {/* Hero copy and photo render immediately (no entrance) so the first
              screen never waits on JavaScript; only the stickers pop. */}
          <div className="flex flex-1 flex-col gap-6">
            <h1 className="text-5xl leading-[1.15] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
              스카시부터
              <br />
              <span
                className="inline-block rounded-2xl px-4"
                style={{ background: PALETTE.highlight }}
              >
                네온까지
              </span>
              <br />
              직접 만듭니다
            </h1>
            <p className="max-w-lg text-lg leading-relaxed font-medium" style={{ color: PALETTE.inkSub }}>
              부천 2대째 34년. LED네온 · 스카시 · 아크릴 · 포맥스를 보통 1~3일이면 완성품으로
              보내드려요.
            </p>
            <ContactButtons quoteClassName="bg-[#2B2840] text-white" phoneClassName="bg-white" showCalculator />
          </div>

          <div className="relative mx-auto h-[360px] w-full max-w-md sm:h-[440px] lg:mx-0 lg:flex-1">
            <div className="absolute inset-x-4 top-4 bottom-10 -rotate-3 overflow-hidden rounded-[36px] border-[6px] border-white shadow-[0_24px_50px_rgba(0,0,0,0.18)]">
              <Image
                src="/images/work/neon-frog.jpg"
                alt="개구리 캐릭터 LED네온"
                fill
                priority
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover"
              />
            </div>
            {/* 숫자 스티커 — "우리 이 정도다". 사진 뒤에 하나씩 튀어나온다. */}
            <PopIn
              delay={0.5}
              className="absolute top-0 left-0 -rotate-6 rounded-2xl border-4 border-white px-4 py-2.5 text-center leading-tight shadow-[0_10px_24px_rgba(0,0,0,0.15)]"
              style={{ background: PALETTE.band }}
            >
              <span className="block text-xs font-bold sm:text-sm">업계 종사</span>
              <span className="block text-2xl font-black sm:text-3xl">34년</span>
            </PopIn>
            <PopIn
              delay={0.7}
              className="absolute bottom-0 left-0 rotate-3 rounded-2xl border-4 border-white px-4 py-2.5 text-center leading-tight shadow-[0_10px_24px_rgba(0,0,0,0.15)]"
              style={{ background: PALETTE.highlight }}
            >
              <span className="block text-xs font-bold sm:text-sm">거래처</span>
              <span className="block text-2xl font-black sm:text-3xl">200곳+</span>
            </PopIn>
            <PopIn
              delay={0.95}
              from={0.3}
              className="absolute right-0 -bottom-4 flex size-32 rotate-12 flex-col items-center justify-center rounded-full border-[5px] border-white text-center leading-none shadow-[0_14px_30px_rgba(0,0,0,0.2)] sm:size-40"
              style={{ background: PALETTE.badge }}
            >
              <span className="text-sm font-bold sm:text-base">납기 지연</span>
              <span className="mt-1 text-5xl font-black tracking-tight sm:text-6xl">0건</span>
            </PopIn>
          </div>
        </div>
      </section>

      {/* 숫자 띠 — 숫자가 0부터 올라간다 */}
      <section style={{ background: PALETTE.band }}>
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <FadeIn key={s.small} delay={i * 0.1} className="rounded-[28px] bg-white/65 p-6">
              <p
                className={`m-0 font-extrabold tracking-tight whitespace-pre-line ${
                  'compact' in s ? 'text-3xl leading-tight' : 'text-5xl'
                }`}
              >
                {'count' in s ? (
                  <>
                    <CountUp to={s.count} />
                    {s.unit}
                  </>
                ) : (
                  s.big
                )}
                {'suffix' in s && <span className="text-2xl">{s.suffix}</span>}
              </p>
              <p className="mt-1 text-base">{s.small}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 함께한 기업 */}
      <section id="work" className="scroll-mt-16" style={{ background: PALETTE.soft }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6">
          <FadeIn>
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">백송과 함께한 기업들</h2>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WORKS.map((w, i) => (
              <FadeIn key={w.src} delay={i * 0.12}>
                <figure
                  className="m-0 flex flex-col gap-3 rounded-[32px] p-3.5 transition-transform duration-300 hover:-translate-y-1.5"
                  style={{ background: w.bg }}
                >
                  <div
                    className="relative h-[250px] overflow-hidden rounded-[22px]"
                    style={w.containBg ? { background: w.containBg } : undefined}
                  >
                    <Image
                      src={w.src}
                      alt={w.alt}
                      fill
                      quality={90}
                      sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                      className={`${w.containBg ? 'object-contain' : 'object-cover'} transition-transform duration-500 hover:scale-105`}
                      style={w.focus ? { objectPosition: w.focus } : undefined}
                    />
                  </div>
                  <figcaption className="px-2 pb-1.5 text-xl font-extrabold">{w.caption}</figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
          <Link href="/portfolio" className="self-start text-base font-bold underline underline-offset-4">
            제작 사례 전체 보기 →
          </Link>
        </div>
      </section>

      {/* 제작 품목 */}
      <section id="products" className="scroll-mt-16 bg-white">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-20 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {ITEMS.map((it, i) => (
            <FadeIn key={it.slug} delay={i * 0.1}>
              <Link
                href={`/products/${it.slug}`}
                className="flex h-full flex-col gap-2.5 rounded-[32px] p-7 transition-transform hover:-translate-y-1"
                style={{ background: it.bg }}
              >
                <h3 className="text-2xl font-extrabold tracking-tight break-keep sm:text-3xl lg:text-2xl">{it.name}</h3>
                <p className="leading-relaxed">{it.desc}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 문의 */}
      <section id="contact" className="scroll-mt-16" style={{ background: PALETTE.cta }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
          <PopIn from={0.85}>
            <h2 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-6xl">
              사진만 보내주세요,
              <br />
              나머진 저희가!
            </h2>
          </PopIn>
          <FadeIn delay={0.15} className="flex flex-col items-center gap-6">
            <p className="text-base" style={{ color: PALETTE.inkSub }}>
              AI · PDF · JPG · CAD 모두 받아요. 웹하드 계정은 전화로 안내드려요.
            </p>
            <ContactButtons
              className="justify-center"
              quoteClassName="bg-white text-[#2B2840]"
              phoneClassName="bg-[#2B2840] text-white"
            />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
