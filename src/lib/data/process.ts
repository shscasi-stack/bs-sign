export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

/** 지시서 Section 4 — 주문·제작 5단계. */
export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: '시안 전달',
    description: '제작에 필요한 AI 시안과 규격을 전달합니다.',
  },
  {
    step: '02',
    title: '제작 검토',
    description: '소재, 크기, 두께, 수량, 제작 가능 여부를 확인합니다.',
  },
  {
    step: '03',
    title: '견적 안내',
    description: '제작비, 납기, 출고 방식과 필요한 수정사항을 안내합니다.',
  },
  {
    step: '04',
    title: '제작 진행',
    description: '확정된 시안과 규격을 기준으로 정밀 가공을 진행합니다.',
  },
  {
    step: '05',
    title: '검수 및 출고',
    description: '완성품을 검수하고 안전하게 포장해 출고합니다.',
  },
];
