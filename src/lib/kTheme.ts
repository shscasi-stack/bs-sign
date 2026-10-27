import type { CategorySlug } from '@/lib/data/categories';

/** K안(파스텔) 공용 색. 메인과 품목 페이지가 같이 쓴다. */
export const PALETTE = {
  ink: '#2B2840',
  inkSub: '#4E4A66',
  heroBg: '#E8E0FF',
  highlight: '#FFC2D6',
  badge: '#FFE9A8',
  band: '#D4F2E6',
  soft: '#FFF7F0',
  cta: '#D9E8FF',
} as const;

/** 품목별 대표 파스텔 (메인 품목 타일과 품목 페이지 히어로). */
export const CATEGORY_PASTEL: Record<CategorySlug, string> = {
  'rubber-scasi': '#E8E0FF',
  acrylic: '#D9E8FF',
  formex: '#FFE0D1',
  'led-neon': '#FFD6E2',
};

/** 사진 카드 배경으로 돌아가며 쓰는 파스텔. */
export const CARD_PASTELS = ['#FFD6E2', '#D9E8FF', '#D4F2E6', '#FFEBC2', '#E8E0FF', '#FFE0D1'] as const;
