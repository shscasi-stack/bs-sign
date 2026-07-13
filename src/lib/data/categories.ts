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

// B2B 제작·가공 파트너 포지셔닝. 순서는 지시서 Section 2(고무스카시→아크릴→포맥스→LED네온)를 따른다.
export const CATEGORIES: Category[] = [
  {
    slug: 'rubber-scasi',
    name: '고무스카시',
    tagline: '정밀 컷팅 입체 문자',
    description: '다양한 두께와 색상으로 정밀하게 제작하는 입체 문자입니다.',
    icon: ScissorsIcon,
    gradientClassName: 'from-amber-500 to-orange-600',
  },
  {
    slug: 'acrylic',
    name: '아크릴 가공',
    tagline: '시안 맞춤 아크릴 정밀 가공',
    description: '투명, 유색, 미러 아크릴을 시안에 맞춰 정밀 가공합니다.',
    icon: GemIcon,
    gradientClassName: 'from-sky-500 to-indigo-600',
  },
  {
    slug: 'formex',
    name: '포맥스 가공',
    tagline: '돔보·문자·로고 포맥스 가공',
    description: '돔보, 문자, 로고 등 다양한 형태의 포맥스 가공을 진행합니다.',
    icon: PanelTopIcon,
    gradientClassName: 'from-emerald-500 to-teal-600',
  },
  {
    slug: 'led-neon',
    name: 'LED 네온',
    tagline: '로고·문구 LED 네온 제작',
    description: '로고와 문구를 다양한 색상의 LED 네온으로 제작합니다.',
    icon: LightbulbIcon,
    gradientClassName: 'from-fuchsia-500 to-rose-500',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}
