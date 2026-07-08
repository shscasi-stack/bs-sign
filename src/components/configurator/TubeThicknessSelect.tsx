'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TUBE_PRICE_PER_METER_KRW } from '@/lib/pricing/pricing.constants';
import type { TubeThicknessCode } from '@/lib/pricing/pricing.types';

interface TubeThicknessSelectProps {
  value: TubeThicknessCode;
  onChange: (value: TubeThicknessCode) => void;
}

export function TubeThicknessSelect({ value, onChange }: TubeThicknessSelectProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="tube-thickness">실리콘 튜브 두께</Label>
      <Select value={value} onValueChange={(v) => onChange(v as TubeThicknessCode)}>
        <SelectTrigger id="tube-thickness" className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(TUBE_PRICE_PER_METER_KRW) as TubeThicknessCode[]).map((code) => (
            <SelectItem key={code} value={code}>
              {code} — {TUBE_PRICE_PER_METER_KRW[code].toLocaleString('ko-KR')}원/m
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
