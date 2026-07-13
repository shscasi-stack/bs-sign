export interface NavItem {
  label: string;
  href: string;
}

/**
 * 헤더/모바일메뉴 공용 내비게이션 (지시서 5항).
 * 1단계에서는 대부분 메인페이지 섹션 앵커로 연결하고, 2단계에서 상세페이지가
 * 생기면 해당 경로로 교체한다(예: /process, /quote, /company).
 */
export const NAV_ITEMS: NavItem[] = [
  { label: '제작 품목', href: '/#products' },
  { label: '제작 사례', href: '/portfolio' },
  { label: '제작 과정', href: '/#process' },
  { label: '제작 안내', href: '/#guide' },
  { label: '견적 문의', href: '/#quote' },
  { label: '회사 소개', href: '/#company' },
];

/** 핵심 전환 CTA — 전화가 아니라 도면·시안 첨부 견적 요청(지시서 13항). */
export const QUOTE_CTA = {
  label: '도면·시안 보내고 견적받기',
  href: '/#quote',
} as const;

export const BRAND_NAME = '백송사인 / LED네온';
