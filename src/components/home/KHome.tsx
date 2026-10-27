import Image from 'next/image';
import Link from 'next/link';

/**
 * 메인페이지 K안 (파스텔 버전).
 * 디자인 시안 "K안 · 도파민 컬러"의 pastel 테마를 그대로 옮긴 것.
 * 색은 여기 PALETTE 한 곳에서만 관리한다.
 */
const PALETTE = {
  ink: '#2B2840',
  inkSub: '#4E4A66',
  heroBg: '#E8E0FF',
  highlight: '#FFC2D6',
  badge: '#FFE9A8',
  band: '#D4F2E6',
  soft: '#FFF7F0',
  cta: '#D9E8FF',
} as const;

const PHONE = '010-9804-8285';
/** 카카오톡 채널/오픈채팅 주소. 비어 있으면 카카오톡 버튼을 숨긴다. */
const KAKAO_URL = '';

const BUTTON = 'inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-bold sm:text-lg';

/** 도면·시안 견적 → 카카오톡 → 전화 순서의 문의 버튼 줄. */
function ContactButtons({
  quoteClassName,
  phoneClassName,
  className = '',
}: {
  quoteClassName: string;
  phoneClassName: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Link href="/quote" className={`${BUTTON} ${quoteClassName}`}>
        도면·시안 보내고 견적받기
      </Link>
      {KAKAO_URL && (
        <a
          href={KAKAO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${BUTTON} bg-[#FEE500] text-[#191919]`}
        >
          카카오톡 문의
        </a>
      )}
      <a href={`tel:${PHONE}`} className={`${BUTTON} ${phoneClassName}`}>
        {PHONE}
      </a>
    </div>
  );
}

const STATS = [
  { big: '34년', small: '아버지와 아들, 2대째' },
  { big: '1~3일', small: '보통 걸리는 시간' },
  { big: '200곳', suffix: ' 이상', small: '믿고 맡기는 업체' },
  { big: '시공은\n직접', small: '완성품으로 보내드려요, 설치는 직접 해주세요', compact: true },
] as const;

const WORKS = [
  { src: '/images/work/neon-chicken.jpg', alt: '닭 캐릭터 LED네온', caption: '닭갈비집 캐릭터', bg: '#FFD6E2' },
  { src: '/images/work/acrylic-gold-mirror.jpg', alt: '골드 미러 아크릴 레이저 커팅', caption: '골드 미러 아크릴', bg: '#D9E8FF' },
  { src: '/images/work/neon-salad.jpg', alt: '샐러드 가게 LED네온', caption: '샐러드 가게 로고', bg: '#D4F2E6' },
  { src: '/images/work/acrylic-white-cnc.jpg', alt: '흰 아크릴 문자 CNC 가공', caption: '아크릴 문자 CNC', bg: '#FFEBC2' },
  { src: '/images/work/neon-ramen.jpg', alt: '라면 가게 LED네온', caption: '라면 가게 로고', bg: '#E8E0FF' },
  { src: '/images/work/neon-ring-ceiling.jpg', alt: '천장 원형 LED네온', caption: '원형 천장 네온', bg: '#FFE0D1' },
] as const;

const ITEMS = [
  { slug: 'rubber-scasi', name: '고무스카시', desc: '고무 + 알루미늄 입체 문자', bg: '#E8E0FF' },
  { slug: 'acrylic', name: '아크릴', desc: '투명 · 유색 · 미러 · 백색 · 검정 무광', bg: '#D9E8FF' },
  { slug: 'formex', name: '포맥스 가공 · 돔보', desc: '실사 외곽선 그대로', bg: '#FFE0D1' },
  { slug: 'led-neon', name: 'LED네온', desc: '6mm · 12mm 실리콘 네온', bg: '#FFD6E2' },
] as const;

export function KHome() {
  return (
    <div className="w-full" style={{ color: PALETTE.ink }}>
      {/* 히어로 */}
      <section style={{ background: PALETTE.heroBg }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pt-14 pb-20 sm:px-6 lg:flex-row lg:items-center lg:pt-20 lg:pb-24">
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
            <ContactButtons quoteClassName="bg-[#2B2840] text-white" phoneClassName="bg-white" />
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
            <span
              className="absolute right-0 bottom-4 rotate-6 rounded-full px-5 py-3 text-lg font-extrabold"
              style={{ background: PALETTE.badge }}
            >
              납기 지연 0건!
            </span>
          </div>
        </div>
      </section>

      {/* 숫자 띠 */}
      <section style={{ background: PALETTE.band }}>
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.small} className="rounded-[28px] bg-white/65 p-6">
              <p
                className={`m-0 font-extrabold tracking-tight whitespace-pre-line ${
                  'compact' in s ? 'text-3xl leading-tight' : 'text-5xl'
                }`}
              >
                {s.big}
                {'suffix' in s && <span className="text-2xl">{s.suffix}</span>}
              </p>
              <p className="mt-1 text-base">{s.small}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 함께한 기업 */}
      <section id="work" className="scroll-mt-16" style={{ background: PALETTE.soft }}>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 sm:px-6">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">백송과 함께한 기업들</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WORKS.map((w) => (
              <figure
                key={w.src}
                className="m-0 flex flex-col gap-3 rounded-[32px] p-3.5"
                style={{ background: w.bg }}
              >
                <div className="relative h-[250px] overflow-hidden rounded-[22px]">
                  <Image
                    src={w.src}
                    alt={w.alt}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-2 pb-1.5 text-xl font-extrabold">{w.caption}</figcaption>
              </figure>
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
          {ITEMS.map((it) => (
            <Link
              key={it.slug}
              href={`/products/${it.slug}`}
              className="flex flex-col gap-2.5 rounded-[32px] p-7 transition-transform hover:-translate-y-1"
              style={{ background: it.bg }}
            >
              <h3 className="text-2xl font-extrabold tracking-tight break-keep sm:text-3xl lg:text-2xl">{it.name}</h3>
              <p className="leading-relaxed">{it.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 문의 */}
      <section id="contact" className="scroll-mt-16" style={{ background: PALETTE.cta }}>
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6">
          <h2 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-6xl">
            사진만 보내주세요,
            <br />
            나머진 저희가!
          </h2>
          <p className="text-base" style={{ color: PALETTE.inkSub }}>
            AI · PDF · JPG · CAD 모두 받아요. 웹하드 계정은 전화로 안내드려요.
          </p>
          <ContactButtons
            className="justify-center"
            quoteClassName="bg-white text-[#2B2840]"
            phoneClassName="bg-[#2B2840] text-white"
          />
        </div>
      </section>
    </div>
  );
}
