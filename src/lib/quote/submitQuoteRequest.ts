import type { QuoteFormValues } from '@/lib/validation/quoteSchema';

/** 견적 접수 수신 이메일 (안내용). */
export const QUOTE_RECIPIENT_EMAIL = 'moon9291@naver.com';

/**
 * Formspree 폼 엔드포인트 (moon9291@naver.com 수신).
 * 폼을 새로 만들면 이 주소만 교체하면 된다.
 */
export const FORM_ENDPOINT = 'https://formspree.io/f/xgogegbw';

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

/**
 * 견적 요청을 Formspree로 전송(메일 앱을 열지 않고 서버가 moon9291@naver.com으로 메일 발송).
 * 텍스트 항목 + 첨부 파일(FormData)을 함께 보낸다. 무료 플랜은 파일 첨부가 없으므로
 * 파일명을 별도 항목으로도 담아 메일 본문에 남는다.
 *
 * @returns 전송 성공 여부
 */
export async function submitQuoteRequest(
  values: QuoteFormValues,
  files: File[]
): Promise<{ ok: boolean }> {
  if (!FORM_ENDPOINT) {
    return { ok: false };
  }

  const formData = new FormData();
  // 한글 라벨로 담아 메일에서 읽기 쉽게
  (Object.keys(FIELD_LABELS) as (keyof QuoteFormValues)[]).forEach((key) => {
    if (values[key]) formData.append(FIELD_LABELS[key], String(values[key]));
  });
  formData.append('_subject', `[견적문의] ${values.productType} - ${values.companyName}`);
  if (files.length > 0) {
    formData.append('첨부파일명', files.map((f) => f.name).join(', '));
    files.forEach((file) => formData.append('attachment', file));
  }

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
