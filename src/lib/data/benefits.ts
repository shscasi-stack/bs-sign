import {
  BadgeCheckIcon,
  RepeatIcon,
  SettingsIcon,
  TruckIcon,
  ZapIcon,
  type LucideIcon,
} from 'lucide-react';

export interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

/** 지시서 Section 3 — 광고사·간판업체가 백송사인을 선택하는 이유 5항목. */
export const BENEFITS: Benefit[] = [
  {
    title: '전문 가공 기술',
    description: '34년 가공 경험을 바탕으로 시안에 맞는 사인물을 정밀하게 제작합니다.',
    icon: SettingsIcon,
  },
  {
    title: '빠른 견적과 납기',
    description: '시안과 규격을 기준으로 제작 가능 여부와 견적을 신속하게 안내합니다.',
    icon: ZapIcon,
  },
  {
    title: '일정한 품질 관리',
    description: '반복 발주에서도 품질 차이가 발생하지 않도록 제작 기준을 관리합니다.',
    icon: BadgeCheckIcon,
  },
  {
    title: '전국 포장·출고',
    description: '안전한 포장과 출고 방식으로 전국 거래처에 제품을 전달합니다.',
    icon: TruckIcon,
  },
  {
    title: 'B2B 반복 발주 대응',
    description:
      '광고사와 인테리어업체, 간판업체가 지속적으로 발주할 수 있도록 거래처별 제작 정보를 관리합니다.',
    icon: RepeatIcon,
  },
];
