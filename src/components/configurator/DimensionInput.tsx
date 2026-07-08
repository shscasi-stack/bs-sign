'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MAX_HEIGHT_MM, MAX_WIDTH_MM } from '@/lib/pricing/pricing.constants';

interface DimensionInputProps {
  widthMm: number;
  heightMm: number;
  onChange: (dims: { widthMm: number; heightMm: number }) => void;
}

export function DimensionInput({ widthMm, heightMm, onChange }: DimensionInputProps) {
  const widthExceeded = widthMm > MAX_WIDTH_MM;
  const heightExceeded = heightMm > MAX_HEIGHT_MM;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-1.5">
        <Label htmlFor="width-mm">베이스판 가로 (mm)</Label>
        <Input
          id="width-mm"
          type="number"
          min={1}
          max={MAX_WIDTH_MM}
          value={widthMm}
          aria-invalid={widthExceeded}
          onChange={(e) => onChange({ widthMm: Number(e.target.value), heightMm })}
        />
        {widthExceeded && (
          <p className="text-xs text-destructive">최대 {MAX_WIDTH_MM}mm까지 가능합니다</p>
        )}
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="height-mm">베이스판 세로 (mm)</Label>
        <Input
          id="height-mm"
          type="number"
          min={1}
          max={MAX_HEIGHT_MM}
          value={heightMm}
          aria-invalid={heightExceeded}
          onChange={(e) => onChange({ widthMm, heightMm: Number(e.target.value) })}
        />
        {heightExceeded && (
          <p className="text-xs text-destructive">최대 {MAX_HEIGHT_MM}mm까지 가능합니다</p>
        )}
      </div>
    </div>
  );
}
