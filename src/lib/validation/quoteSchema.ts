import { z } from 'zod';

/** 지시서 Section 7 — 제작 품목 셀렉트 선택지. */
export const QUOTE_PRODUCT_TYPES = [
  '고무스카시',
  '아크릴 가공',
  '포맥스 가공',
  '포맥스 돔보',
  'LED 네온',
  '기타 문의',
] as const;

/** 첨부 가능 파일 (지시서 Section 7). */
export const ACCEPTED_FILE_EXTENSIONS = ['.ai', '.pdf', '.jpg', '.jpeg', '.png', '.cad', '.dxf'];
export const ACCEPTED_FILE_LABEL = 'AI, PDF, JPG, PNG, CAD, DXF';

export const quoteSchema = z.object({
  // 필수
  companyName: z.string().trim().min(1, '업체명을 입력해 주세요'),
  contactName: z.string().trim().min(1, '담당자명을 입력해 주세요'),
  phone: z.string().trim().min(8, '연락처를 정확히 입력해 주세요'),
  email: z.string().trim().email('올바른 이메일을 입력해 주세요'),
  productType: z.enum(QUOTE_PRODUCT_TYPES, { message: '제작 품목을 선택해 주세요' }),
  // 선택
  widthMm: z.string().trim().optional(),
  heightMm: z.string().trim().optional(),
  thickness: z.string().trim().optional(),
  quantity: z.string().trim().optional(),
  material: z.string().trim().optional(),
  color: z.string().trim().optional(),
  dueDate: z.string().trim().optional(),
  deliveryRegion: z.string().trim().optional(),
  message: z.string().trim().max(2000, '요청사항은 2000자 이내로 입력해 주세요').optional(),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
