import type { QuoteFormValues } from '@/lib/validation/quoteSchema';

/** 견적 접수 수신 이메일. */
export const QUOTE_RECIPIENT_EMAIL = 'moon9291@naver.com';

const FIELD_LABELS: Record<keyof QuoteFormValues, string> = {
  companyName: '업체명',
  contactName: '담당자명',
  phone: '연락처',
  email: '이메일',
  productType: '제작 품목',
  widthMm: '가로 크기',
  heightMm: '세로 크기',
  thickness: '두께',
  quantity: '수량',
  material: '소재',
  color: '색상',
  dueDate: '희망 납기',
  deliveryRegion: '배송 지역',
  message: '요청사항',
};

function buildEmailBody(values: QuoteFormValues, files: File[]): string {
  const lines = (Object.keys(FIELD_LABELS) as (keyof QuoteFormValues)[])
    .filter((key) => values[key])
    .map((key) => `${FIELD_LABELS[key]}: ${values[key]}`);

  if (files.length > 0) {
    lines.push('', `첨부 파일: ${files.map((f) => f.name).join(', ')}`);
    lines.push('(※ 첨부 파일은 이 메일에 직접 담아 보내주세요.)');
  }

  return lines.join('\n');
}

/**
 * 견적 요청 제출. mailto로 고객의 메일 앱을 열어 수신자·제목·본문을 채운다.
 * (정적 배포 환경이라 서버 발송이 없어 mailto 방식 사용 — 파일 첨부는 메일 앱에서 직접.)
 *
 * TODO: 서버 발송(API + Resend/SMTP)이 준비되면 이 함수 안을
 *   fetch('/api/quote', { method: 'POST', body: FormData })로 교체한다.
 */
export function submitQuoteRequest(values: QuoteFormValues, files: File[]): void {
  const subject = `[견적문의] ${values.productType} - ${values.companyName}`;
  const body = buildEmailBody(values, files);
  const mailto = `mailto:${QUOTE_RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  if (typeof window !== 'undefined') {
    window.location.href = mailto;
  }
}
