import type { QuoteFormValues } from '@/lib/validation/quoteSchema';

/**
 * 견적 요청 제출 지점. 현재는 백엔드/이메일이 없어 콘솔에 출력만 한다
 * (지시서: "실제 API가 없으면 제출 데이터를 콘솔에 출력하고 성공 상태를 표시").
 *
 * TODO: 이메일 전송 또는 견적 접수 API가 준비되면 이 함수 안에서
 *   fetch('/api/quote', { method: 'POST', body: ... }) 형태로 교체한다.
 *   파일은 FormData로 함께 전송한다.
 */
export function submitQuoteRequest(values: QuoteFormValues, files: File[]): void {
  console.log('[견적 요청]', {
    ...values,
    files: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
  });
}
