'use client';

import { useRef, useState } from 'react';
import { CheckCircle2Icon, PaperclipIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ACCEPTED_FILE_EXTENSIONS,
  ACCEPTED_FILE_LABEL,
  QUOTE_PRODUCT_TYPES,
  quoteSchema,
  type QuoteFormValues,
} from '@/lib/validation/quoteSchema';
import { QUOTE_RECIPIENT_EMAIL, submitQuoteRequest } from '@/lib/quote/submitQuoteRequest';

type FormState = Record<keyof QuoteFormValues, string>;

const initialState: FormState = {
  companyName: '',
  contactName: '',
  phone: '',
  email: '',
  productType: '',
  widthMm: '',
  heightMm: '',
  thickness: '',
  quantity: '',
  material: '',
  color: '',
  dueDate: '',
  deliveryRegion: '',
  message: '',
};

const TEXT_FIELDS: { key: keyof FormState; label: string; required?: boolean; placeholder?: string }[] = [
  { key: 'companyName', label: '업체명', required: true },
  { key: 'contactName', label: '담당자명', required: true },
  { key: 'phone', label: '연락처', required: true, placeholder: '010-0000-0000' },
  { key: 'email', label: '이메일', required: true, placeholder: 'name@company.com' },
  { key: 'widthMm', label: '가로 크기', placeholder: 'mm' },
  { key: 'heightMm', label: '세로 크기', placeholder: 'mm' },
  { key: 'thickness', label: '두께', placeholder: 'mm / T' },
  { key: 'quantity', label: '수량', placeholder: '개' },
  { key: 'material', label: '소재' },
  { key: 'color', label: '색상' },
  { key: 'dueDate', label: '희망 납기' },
  { key: 'deliveryRegion', label: '배송 지역' },
];

export function QuoteForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function set<K extends keyof FormState>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list)]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = quoteSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const [key, val] of Object.entries(result.error.flatten().fieldErrors)) {
        fieldErrors[key as keyof FormState] = val?.[0] ?? '';
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitError(false);
    setSubmitting(true);
    const { ok } = await submitQuoteRequest(result.data, files);
    setSubmitting(false);
    if (ok) {
      setSubmitted(true);
    } else {
      setSubmitError(true);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-xl border border-neutral-200 bg-white p-10 text-center">
        <CheckCircle2Icon className="size-12 text-point" />
        <h3 className="text-lg font-semibold text-neutral-900">견적 요청이 접수되었습니다</h3>
        <p className="text-sm text-neutral-600">
          전달해주신 내용을 확인한 뒤 안내드리겠습니다.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            setValues(initialState);
            setFiles([]);
            setSubmitted(false);
          }}
        >
          새 견적 요청 작성
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-neutral-200 bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* 제작 품목 (필수 select) — 앞쪽에 배치 */}
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="productType">
            제작 품목 <span className="text-destructive">*</span>
          </Label>
          <Select value={values.productType} onValueChange={(v) => v && set('productType', v)}>
            <SelectTrigger id="productType" className="w-full">
              <SelectValue placeholder="제작 품목 선택" />
            </SelectTrigger>
            <SelectContent>
              {QUOTE_PRODUCT_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.productType && <p className="text-xs text-destructive">{errors.productType}</p>}
        </div>

        {TEXT_FIELDS.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <Label htmlFor={field.key}>
              {field.label}
              {field.required && <span className="text-destructive"> *</span>}
            </Label>
            <Input
              id={field.key}
              value={values[field.key]}
              placeholder={field.placeholder}
              aria-invalid={Boolean(errors[field.key])}
              onChange={(e) => set(field.key, e.target.value)}
            />
            {errors[field.key] && <p className="text-xs text-destructive">{errors[field.key]}</p>}
          </div>
        ))}

        {/* 요청사항 */}
        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="message">요청사항</Label>
          <Textarea
            id="message"
            rows={4}
            value={values.message}
            placeholder="제작 관련 상세 요청사항을 입력해 주세요."
            onChange={(e) => set('message', e.target.value)}
          />
          {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
        </div>

        {/* 파일 첨부 (드래그앤드롭) */}
        <div className="space-y-1.5 sm:col-span-2">
          <Label>파일 첨부 (도면·시안)</Label>
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              addFiles(e.dataTransfer.files);
            }}
            className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed px-4 py-8 text-center transition-colors ${
              dragging ? 'border-point bg-point/5' : 'border-neutral-300 hover:border-point/60'
            }`}
          >
            <UploadCloudIcon className="size-6 text-neutral-400" />
            <p className="text-sm text-neutral-600">
              파일을 끌어다 놓거나 클릭해 첨부하세요
            </p>
            <p className="text-xs text-neutral-400">{ACCEPTED_FILE_LABEL}</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ACCEPTED_FILE_EXTENSIONS.join(',')}
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
          </div>

          {files.length > 0 && (
            <ul className="mt-2 flex flex-col gap-1.5">
              {files.map((file, index) => (
                <li
                  key={`${file.name}-${index}`}
                  className="flex items-center justify-between gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <PaperclipIcon className="size-3.5 shrink-0 text-neutral-400" />
                    <span className="truncate">{file.name}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="shrink-0 rounded p-0.5 text-neutral-400 hover:text-neutral-900"
                    aria-label={`${file.name} 삭제`}
                  >
                    <XIcon className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="mt-6 w-full font-semibold">
        {submitting ? '전송 중...' : '제작 가능 여부와 견적 확인하기'}
      </Button>
      {submitError && (
        <p className="mt-3 text-center text-sm text-destructive">
          전송에 실패했습니다. 잠시 후 다시 시도하시거나 {QUOTE_RECIPIENT_EMAIL} 으로 직접 보내주세요.
        </p>
      )}
    </form>
  );
}
