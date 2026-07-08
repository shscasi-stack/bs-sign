'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FONT_OPTIONS } from '@/lib/pricing/pricing.constants';

interface TextFontInputProps {
  displayText: string;
  fontFamily: string;
  textWidthMm: number;
  textHeightMm: number;
  onDisplayTextChange: (text: string) => void;
  onFontFamilyChange: (font: string) => void;
  onTextSizeChange: (size: { textWidthMm: number; textHeightMm: number }) => void;
}

export function TextFontInput({
  displayText,
  fontFamily,
  textWidthMm,
  textHeightMm,
  onDisplayTextChange,
  onFontFamilyChange,
  onTextSizeChange,
}: TextFontInputProps) {
  const selectedFont = FONT_OPTIONS.find((f) => f.code === fontFamily);

  return (
    <div className="space-y-3">
      <div className="space-y-1.5">
        <Label htmlFor="display-text">문자 텍스트</Label>
        <Input
          id="display-text"
          maxLength={40}
          placeholder="예: OPEN 24H"
          value={displayText}
          onChange={(e) => onDisplayTextChange(e.target.value)}
          style={{ fontFamily: selectedFont?.cssFontFamily }}
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="font-family">폰트</Label>
        <Select value={fontFamily} onValueChange={(v) => v && onFontFamilyChange(v)}>
          <SelectTrigger id="font-family" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONT_OPTIONS.map((font) => (
              <SelectItem key={font.code} value={font.code} style={{ fontFamily: font.cssFontFamily }}>
                {font.labelKo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="text-width-mm">글씨 가로 (mm)</Label>
          <Input
            id="text-width-mm"
            type="number"
            min={1}
            value={textWidthMm}
            onChange={(e) => onTextSizeChange({ textWidthMm: Number(e.target.value), textHeightMm })}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="text-height-mm">글씨 세로 (mm)</Label>
          <Input
            id="text-height-mm"
            type="number"
            min={1}
            value={textHeightMm}
            onChange={(e) => onTextSizeChange({ textWidthMm, textHeightMm: Number(e.target.value) })}
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        글씨 크기는 텍스트 사이즈 비용(가로×세로 기준)과 튜브 길이 계산에 사용됩니다.
      </p>
    </div>
  );
}
