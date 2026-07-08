'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BASE_BOARD_PRICE_PER_PANEL_KRW } from '@/lib/pricing/pricing.constants';
import type { BaseBoardThicknessCode } from '@/lib/pricing/pricing.types';

interface BaseBoardThicknessSelectProps {
  value: BaseBoardThicknessCode;
  onChange: (value: BaseBoardThicknessCode) => void;
}

export function BaseBoardThicknessSelect({ value, onChange }: BaseBoardThicknessSelectProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="base-board-thickness">LED 베이스판 두께 (실리콘 두께와 별개 옵션)</Label>
      <Select value={value} onValueChange={(v) => onChange(v as BaseBoardThicknessCode)}>
        <SelectTrigger id="base-board-thickness" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(BASE_BOARD_PRICE_PER_PANEL_KRW) as BaseBoardThicknessCode[]).map((code) => (
            <SelectItem key={code} value={code}>
              {code} — {BASE_BOARD_PRICE_PER_PANEL_KRW[code].toLocaleString('ko-KR')}원/패널(300×300mm)
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
