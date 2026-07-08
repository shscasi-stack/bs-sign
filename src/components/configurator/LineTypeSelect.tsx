'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LINE_TYPE_MULTIPLIER, LINE_TYPE_OPTIONS } from '@/lib/pricing/pricing.constants';
import type { LineTypeCode } from '@/lib/pricing/pricing.types';

const LINE_TYPE_LABEL_BY_CODE: Record<LineTypeCode, string> = Object.fromEntries(
  LINE_TYPE_OPTIONS.map((option) => [option.code, option.labelKo])
) as Record<LineTypeCode, string>;

interface LineTypeSelectProps {
  value: LineTypeCode;
  onChange: (value: LineTypeCode) => void;
}

export function LineTypeSelect({ value, onChange }: LineTypeSelectProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="line-type">단선/복선</Label>
      <Select value={value} onValueChange={(v) => v && onChange(v as LineTypeCode)}>
        <SelectTrigger id="line-type" className="w-full">
          <SelectValue>{(v: LineTypeCode) => LINE_TYPE_LABEL_BY_CODE[v]}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          {LINE_TYPE_OPTIONS.map((option) => (
            <SelectItem key={option.code} value={option.code}>
              {option.labelKo}
              {option.code !== 'single' && ` (×${LINE_TYPE_MULTIPLIER[option.code]})`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
