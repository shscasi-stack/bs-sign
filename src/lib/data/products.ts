import type { CategorySlug } from './categories';

export interface Product {
  slug: string;
  category: CategorySlug;
  name: string;
  description: string;
  /** 대표 소재 (예: '투명 아크릴'). */
  material: string;
  /** 대표 가공 방식 (예: 'CNC 가공'). */
  method: string;
}

export const PRODUCTS: Product[] = [
  // 고무스카시
  {
    slug: 'rubber-scasi-sign-lettering',
    category: 'rubber-scasi',
    name: '간판 고무스카시 레터링',
    description: '간판 글자를 고무 소재로 입체 컷팅해 시인성을 높이는 레터링.',
    material: '고무',
    method: '정밀 컷팅',
  },
  {
    slug: 'rubber-scasi-logo-cutting',
    category: 'rubber-scasi',
    name: '로고 스카시 컷팅',
    description: '브랜드 로고 형태를 정밀하게 오려내는 고무 스카시 가공.',
    material: '고무',
    method: '로고 컷팅',
  },
  {
    slug: 'rubber-scasi-accent',
    category: 'rubber-scasi',
    name: '사인물 포인트 소재',
    description: '기존 사인물에 부착해 입체감을 더하는 고무스카시 포인트 소재.',
    material: '고무',
    method: '입체 가공',
  },

  // 아크릴 가공
  {
    slug: 'acrylic-logo',
    category: 'acrylic',
    name: '아크릴 로고',
    description: '두께·컬러를 선택해 제작하는 입체 아크릴 로고.',
    material: '투명·유색 아크릴',
    method: '레이저 가공',
  },
  {
    slug: 'acrylic-stand',
    category: 'acrylic',
    name: '아크릴 스탠드·거치대',
    description: '매장 안내, 메뉴판 등에 쓰이는 아크릴 스탠드 및 거치대.',
    material: '투명 아크릴',
    method: '재단·절곡',
  },
  {
    slug: 'acrylic-sign-box',
    category: 'acrylic',
    name: '아크릴 간판 함체',
    description: 'LED 모듈과 결합하는 아크릴 간판 함체 제작.',
    material: '유색 아크릴',
    method: '재단·조립',
  },

  // 포맥스 가공
  {
    slug: 'formex-dombo',
    category: 'formex',
    name: '포맥스 돔보',
    description: '입체감을 살린 포맥스 돔보 문자·로고 가공.',
    material: '포맥스',
    method: 'CNC 가공',
  },
  {
    slug: 'formex-indoor-sign',
    category: 'formex',
    name: '포맥스 문자·간판',
    description: '가볍고 다루기 쉬운 포맥스 소재로 제작한 문자·간판.',
    material: '포맥스',
    method: 'CNC 가공',
  },
  {
    slug: 'formex-banner-board',
    category: 'formex',
    name: '포맥스 게시판',
    description: '방수에 강한 포맥스 소재로 제작하는 게시판·안내판.',
    material: '포맥스',
    method: '재단 가공',
  },

  // LED 네온
  {
    slug: 'led-neon-logo',
    category: 'led-neon',
    name: '로고 LED 네온',
    description: '브랜드 로고를 다양한 색상의 LED 네온으로 제작.',
    material: 'LED 실리콘 네온',
    method: '벤딩 제작',
  },
  {
    slug: 'led-neon-lettering',
    category: 'led-neon',
    name: '문구 LED 네온',
    description: '원하는 문구를 다양한 색상의 LED 네온으로 제작.',
    material: 'LED 실리콘 네온',
    method: '벤딩 제작',
  },
  {
    slug: 'led-neon-custom',
    category: 'led-neon',
    name: '맞춤 LED 네온',
    description: '사이즈·색상·단선/복선까지 온라인 견적으로 바로 확인.',
    material: 'LED 실리콘 네온',
    method: '맞춤 제작',
  },
];

export function getProductsByCategory(category: CategorySlug): Product[] {
  return PRODUCTS.filter((product) => product.category === category);
}
