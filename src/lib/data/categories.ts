import { GemIcon, LightbulbIcon, PanelTopIcon, ScissorsIcon, type LucideIcon } from 'lucide-react';

export type CategorySlug = 'led-neon' | 'rubber-scasi' | 'acrylic' | 'formex';

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  /** 소재별 가능한 가공방식 (아트시스산업 벤치마킹 — 소재마다 무엇을 할 수 있는지). */
  methods: string[];
  /** 주로 발주하는 고객군. */
  customers: string;
  icon: LucideIcon;
  gradientClassName: string;
}

// B2B 제작·가공 파트너 포지셔닝. 순서는 지시서 Section 2(고무스카시→아크릴→포맥스→LED네온)를 따른다.
export const CATEGORIES: Category[] = [
  {
    slug: 'rubber-scasi',
    name: '고무스카시',
    tagline: '정밀 컷팅 입체 문자',
    description: '다양한 두께와 색상으로 정밀하게 제작하는 입체 문자입니다.',
    methods: ['정밀 컷팅', '두께·색상 선택', '문자·로고 제작'],
    customers: '간판업체 · 광고사 · 인테리어업체',
    icon: ScissorsIcon,
    gradientClassName: 'from-amber-500 to-orange-600',
  },
  {
    slug: 'acrylic',
    name: '아크릴 가공',
    tagline: '시안 맞춤 아크릴 정밀 가공',
    description: '투명, 유색, 미러 아크릴을 시안에 맞춰 정밀 가공합니다.',
    methods: ['CNC 커팅', '레이저 커팅', '문자·판재 가공'],
    customers: '광고사 · 인테리어업체 · 실사출력업체',
    icon: GemIcon,
    gradientClassName: 'from-sky-500 to-indigo-600',
  },
  {
    slug: 'formex',
    name: '포맥스 가공',
    tagline: '돔보·문자·로고 포맥스 가공',
    description: '실사 부착 후 인쇄 외곽선에 맞춰 CNC 돔보 가공까지 진행합니다.',
    methods: ['CNC 커팅', '돔보 가공', '문자·로고 제작'],
    customers: '간판업체 · 실사출력업체 · 인테리어업체',
    icon: PanelTopIcon,
    gradientClassName: 'from-emerald-500 to-teal-600',
  },
  {
    slug: 'led-neon',
    name: 'LED 네온',
    tagline: '로고·문구 LED 네온 제작',
    description: '아크릴 배면에 LED 네온을 결합해 로고·문구를 제작합니다.',
    methods: ['아크릴 배면 가공', 'LED 네온 조립', '실내·주문제작'],
    customers: '광고사 · 인테리어업체 · 카페·매장',
    icon: LightbulbIcon,
    gradientClassName: 'from-fuchsia-500 to-rose-500',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}
