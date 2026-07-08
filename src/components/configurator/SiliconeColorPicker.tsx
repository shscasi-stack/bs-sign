'use client';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { SILICONE_COLORS } from '@/lib/pricing/pricing.constants';

interface SiliconeColorPickerProps {
  value: string;
  onChange: (code: string) => void;
}

export function SiliconeColorPicker({ value, onChange }: SiliconeColorPickerProps) {
  return (
    <div className="space-y-1.5">
      <Label>실리콘 색상 (가격 영향 없음)</Label>
      <div className="flex flex-wrap gap-2">
        {SILICONE_COLORS.map((color) => (
          <button
            key={color.code}
            type="button"
            title={color.labelKo}
            aria-label={color.labelKo}
            aria-pressed={value === color.code}
            onClick={() => onChange(color.code)}
            className={cn(
              'size-8 rounded-full ring-1 ring-foreground/15 transition-all',
              value === color.code && 'ring-2 ring-offset-2 ring-primary'
            )}
            style={{ backgroundColor: color.hex }}
          />
        ))}
      </div>
    </div>
  );
}
