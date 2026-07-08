import { GemIcon, LightbulbIcon, PanelTopIcon, ScissorsIcon, type LucideIcon } from 'lucide-react';

export type CategorySlug = 'led-neon' | 'rubber-scasi' | 'acrylic' | 'formex';

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  gradientClassName: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: 'led-neon',
    name: 'LED네온',
    tagline: '나만의 문구로 만드는 감성 조명',
    description:
      '매장 간판부터 웨딩·이벤트 소품까지, 원하는 문구와 색상으로 실시간 견적을 받아 제작하는 LED 네온사인입니다.',
    icon: LightbulbIcon,
    gradientClassName: 'from-fuchsia-500 to-rose-500',
  },
  {
    slug: 'rubber-scasi',
    name: '고무스카시',
    tagline: '입체감 있는 고무 컷팅 레터링',
    description:
      '간판 글자, 로고 등을 고무 소재로 정밀 컷팅해 실내외 사인물에 포인트를 더하는 고무스카시 가공입니다.',
    icon: ScissorsIcon,
    gradientClassName: 'from-amber-500 to-orange-600',
  },
  {
    slug: 'acrylic',
    name: '아크릴가공',
    tagline: '깔끔하고 고급스러운 아크릴 제작',
    description:
      '아크릴 로고, 스탠드, 간판 함체 등 다양한 두께와 컬러로 재단·가공하는 아크릴 전문 제작 서비스입니다.',
    icon: GemIcon,
    gradientClassName: 'from-sky-500 to-indigo-600',
  },
  {
    slug: 'formex',
    name: '포맥스',
    tagline: '가볍고 튼튼한 실내외 사인 소재',
    description:
      '가볍고 방수에 강한 포맥스 보드로 제작하는 실내 간판, 안내판, 행사용 사인물입니다.',
    icon: PanelTopIcon,
    gradientClassName: 'from-emerald-500 to-teal-600',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}
