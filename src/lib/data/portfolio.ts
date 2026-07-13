import type { CategorySlug } from './categories';

export interface PortfolioItem {
  slug: string;
  category: CategorySlug;
  title: string;
  description: string;
  /** 대표 소재. */
  material: string;
  /** 제작 방식. */
  method: string;
  /** 두께 — 실제 확인 후 채우는 값. 미입력이면 '문의'로 표시(임의 작성 금지). */
  thickness?: string;
  /** 크기 — 실제 확인 후 채우는 값. 미입력이면 '문의'로 표시. */
  size?: string;
  /** Set this to a path under /public (e.g. "/portfolio/led-neon-1.jpg") once a real photo is ready. */
  imageUrl?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: 'led-neon-store-sign-case',
    category: 'led-neon',
    title: '매장 로고 네온사인',
    description: '카페 브랜드 로고형 LED 네온사인 제작.',
    material: 'LED 실리콘 네온',
    method: '벤딩 제작',
  },
  {
    slug: 'led-neon-lettering-case',
    category: 'led-neon',
    title: '문구 LED 네온',
    description: '포토존용 문구 LED 네온사인 제작.',
    material: 'LED 실리콘 네온',
    method: '벤딩 제작',
  },
  {
    slug: 'rubber-scasi-sign-case',
    category: 'rubber-scasi',
    title: '간판 고무스카시 레터링',
    description: '입간판 글자를 고무 소재로 입체 컷팅한 사례.',
    material: '고무',
    method: '정밀 컷팅',
  },
  {
    slug: 'rubber-scasi-logo-case',
    category: 'rubber-scasi',
    title: '로고 스카시 컷팅',
    description: '브랜드 로고를 정밀하게 오려낸 고무 스카시 가공.',
    material: '고무',
    method: '로고 컷팅',
  },
  {
    slug: 'acrylic-logo-case',
    category: 'acrylic',
    title: '아크릴 로고 제작',
    description: '두께와 컬러를 조합해 제작한 입체 아크릴 로고.',
    material: '투명·유색 아크릴',
    method: '레이저 가공',
  },
  {
    slug: 'acrylic-stand-case',
    category: 'acrylic',
    title: '아크릴 스탠드 거치대',
    description: '매장 안내용으로 제작한 아크릴 스탠드.',
    material: '투명 아크릴',
    method: '재단·절곡',
  },
  {
    slug: 'formex-dombo-case',
    category: 'formex',
    title: '포맥스 돔보 문자',
    description: '입체감을 살린 포맥스 돔보 문자 가공.',
    material: '포맥스',
    method: 'CNC 가공',
  },
  {
    slug: 'formex-indoor-sign-case',
    category: 'formex',
    title: '포맥스 실내 간판',
    description: '가볍고 다루기 쉬운 포맥스 소재로 제작한 실내 간판.',
    material: '포맥스',
    method: 'CNC 가공',
  },
];

export function getPortfolioByCategory(category: CategorySlug): PortfolioItem[] {
  return PORTFOLIO_ITEMS.filter((item) => item.category === category);
}
