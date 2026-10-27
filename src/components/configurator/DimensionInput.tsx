'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { countBoardPieces } from '@/lib/pricing/calculateBasePanels';
import { MAX_HEIGHT_MM, MAX_WIDTH_MM } from '@/lib/pricing/pricing.constants';

interface DimensionInputProps {
  widthMm: number;
  heightMm: number;
  onChange: (dims: { widthMm: number; heightMm: number }) => void;
}

export function DimensionInput({ widthMm, heightMm, onChange }: DimensionInputProps) {
  const pieces = countBoardPieces(widthMm, heightMm);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="width-mm">베이스판 가로 (mm)</Label>
          <Input
            id="width-mm"
            type="number"
            min={1}
            value={widthMm}
            onChange={(e) => onChange({ widthMm: Number(e.target.value), heightMm })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="height-mm">베이스판 세로 (mm)</Label>
          <Input
            id="height-mm"
            type="number"
            min={1}
            value={heightMm}
            onChange={(e) => onChange({ widthMm, heightMm: Number(e.target.value) })}
          />
        </div>
      </div>

      <p className="text-xs leading-relaxed text-neutral-500">
        판 한 장은 최대 가로 {MAX_WIDTH_MM.toLocaleString('ko-KR')} × 세로{' '}
        {MAX_HEIGHT_MM.toLocaleString('ko-KR')}mm예요. 이보다 크면 판을 나눠서 이어 붙여 제작해요.
      </p>

      {pieces > 1 && (
        <p className="rounded-2xl bg-[#FFE9A8] px-4 py-3 text-sm leading-relaxed font-medium text-[#2B2840]">
          ⚠️ 판 한 장 크기를 넘어서 <strong>{pieces}조각</strong>으로 나눠 제작해야 해요. 조각을 이어 붙이는
          자리에 이음매가 생길 수 있어요.
        </p>
      )}
    </div>
  );
}
