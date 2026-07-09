import type { CategorySlug } from './categories';

export interface Product {
  slug: string;
  category: CategorySlug;
  name: string;
  description: string;
  priceLabel: string;
  ctaHref: string;
  ctaLabel: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: 'led-neon-store-sign',
    category: 'led-neon',
    name: 'LED네온',
    description: '매장 입구나 쇼윈도에 다는 브랜드 로고형 LED 네온사인.',
    priceLabel: '가격 문의',
    ctaHref: '/configurator',
    ctaLabel: '맞춤 견적 시작하기',
  },
  {
    slug: 'led-neon-wedding-event',
    category: 'led-neon',
    name: '웨딩·이벤트 네온사인',
    description: '청첩장 포토존, 돌잔치, 팝업스토어용 문구 네온사인.',
    priceLabel: '가격 문의',
    ctaHref: '/configurator',
    ctaLabel: '맞춤 견적 시작하기',
  },
  {
    slug: 'led-neon-interior',
    category: 'led-neon',
    name: '인테리어 소품 네온사인',
    description: '카페·홈 인테리어용 소형 문구·아이콘 네온사인.',
    priceLabel: '가격 문의',
    ctaHref: '/configurator',
    ctaLabel: '맞춤 견적 시작하기',
  },
  {
    slug: 'rubber-scasi-sign-lettering',
    category: 'rubber-scasi',
    name: '고무스카시',
    description: '간판 글자를 고무 소재로 입체 컷팅해 시인성을 높이는 레터링.',
    priceLabel: '가격 문의',
    ctaHref: '/products/rubber-scasi#contact',
    ctaLabel: '상담 문의하기',
  },
  {
    slug: 'rubber-scasi-logo-cutting',
    category: 'rubber-scasi',
    name: '로고 스카시 컷팅',
    description: '브랜드 로고 형태를 정밀하게 오려내는 고무 스카시 가공.',
    priceLabel: '가격 문의',
    ctaHref: '/products/rubber-scasi#contact',
    ctaLabel: '상담 문의하기',
  },
  {
    slug: 'rubber-scasi-accent',
    category: 'rubber-scasi',
    name: '사인물 포인트 소재',
    description: '기존 사인물에 부착해 입체감을 더하는 고무스카시 포인트 소재.',
    priceLabel: '가격 문의',
    ctaHref: '/products/rubber-scasi#contact',
    ctaLabel: '상담 문의하기',
  },
  {
    slug: 'acrylic-logo',
    category: 'acrylic',
    name: '아크릴 가공',
    description: '두께·컬러를 선택해 제작하는 입체 아크릴 로고.',
    priceLabel: '가격 문의',
    ctaHref: '/products/acrylic#contact',
    ctaLabel: '상담 문의하기',
  },
  {
    slug: 'acrylic-stand',
    category: 'acrylic',
    name: '아크릴 스탠드·거치대',
    description: '매장 안내, 메뉴판 등에 쓰이는 아크릴 스탠드 및 거치대.',
    priceLabel: '가격 문의',
    ctaHref: '/products/acrylic#contact',
    ctaLabel: '상담 문의하기',
  },
  {
    slug: 'acrylic-sign-box',
    category: 'acrylic',
    name: '아크릴 간판 함체',
    description: 'LED 모듈과 결합하는 아크릴 간판 함체 제작.',
    priceLabel: '가격 문의',
    ctaHref: '/products/acrylic#contact',
    ctaLabel: '상담 문의하기',
  },
  {
    slug: 'formex-indoor-sign',
    category: 'formex',
    name: '포맥스 가공',
    description: '가볍고 시공이 쉬운 포맥스 소재의 실내 간판.',
    priceLabel: '가격 문의',
    ctaHref: '/products/formex#contact',
    ctaLabel: '상담 문의하기',
  },
  {
    slug: 'formex-banner-board',
    category: 'formex',
    name: '포맥스 배너·게시판',
    description: '방수에 강해 실외에도 사용 가능한 포맥스 배너 게시판.',
    priceLabel: '가격 문의',
    ctaHref: '/products/formex#contact',
    ctaLabel: '상담 문의하기',
  },
  {
    slug: 'formex-event-guide',
    category: 'formex',
    name: '행사장 안내판',
    description: '설치·철거가 간편한 행사·전시용 포맥스 안내판.',
    priceLabel: '가격 문의',
    ctaHref: '/products/formex#contact',
    ctaLabel: '상담 문의하기',
  },
];

export function getProductsByCategory(category: CategorySlug): Product[] {
  return PRODUCTS.filter((product) => product.category === category);
}
