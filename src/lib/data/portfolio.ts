import type { CategorySlug } from './categories';

export interface PortfolioItem {
  slug: string;
  category: CategorySlug;
  title: string;
  description: string;
  /** Set this to a path under /public (e.g. "/portfolio/led-neon-1.jpg") once a real photo is ready. */
  imageUrl?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: 'led-neon-store-sign-case',
    category: 'led-neon',
    title: '매장 로고 네온사인',
    description: '카페 입구 쇼윈도에 설치한 브랜드 로고형 LED 네온사인.',
  },
  {
    slug: 'led-neon-wedding-case',
    category: 'led-neon',
    title: '웨딩 포토존 네온사인',
    description: '청첩장 촬영용 문구 네온사인, 실내 포토존 설치.',
  },
  {
    slug: 'rubber-scasi-sign-case',
    category: 'rubber-scasi',
    title: '간판 고무스카시 레터링',
    description: '입간판 글자를 고무 소재로 입체 컷팅해 시인성을 높인 사례.',
  },
  {
    slug: 'rubber-scasi-logo-case',
    category: 'rubber-scasi',
    title: '로고 스카시 컷팅',
    description: '매장 브랜드 로고를 정밀하게 오려낸 고무 스카시 가공.',
  },
  {
    slug: 'acrylic-logo-case',
    category: 'acrylic',
    title: '아크릴 로고 제작',
    description: '두께와 컬러를 조합해 제작한 입체 아크릴 로고.',
  },
  {
    slug: 'acrylic-stand-case',
    category: 'acrylic',
    title: '아크릴 스탠드 거치대',
    description: '매장 안내용으로 제작한 아크릴 스탠드.',
  },
  {
    slug: 'formex-indoor-sign-case',
    category: 'formex',
    title: '포맥스 실내 간판',
    description: '가볍고 시공이 간편한 포맥스 소재의 실내 간판.',
  },
  {
    slug: 'formex-event-guide-case',
    category: 'formex',
    title: '행사장 안내판',
    description: '설치와 철거가 간편한 행사·전시용 포맥스 안내판.',
  },
];

export function getPortfolioByCategory(category: CategorySlug): PortfolioItem[] {
  return PORTFOLIO_ITEMS.filter((item) => item.category === category);
}
