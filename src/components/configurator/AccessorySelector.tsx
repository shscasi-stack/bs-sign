'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ACCESSORY_OPTIONS } from '@/lib/pricing/pricing.constants';

interface AccessorySelectorProps {
  quantities: Record<string, number>;
  onChange: (updater: (prev: Record<string, number>) => Record<string, number>) => void;
}

export function AccessorySelector({ quantities, onChange }: AccessorySelectorProps) {
  function changeQuantity(code: string, delta: number) {
    // Uses a functional update so rapid clicks (before a re-render lands)
    // compose correctly instead of both reading the same stale quantity.
    onChange((prev) => ({ ...prev, [code]: Math.max(0, (prev[code] ?? 0) + delta) }));
  }

  return (
    <div className="space-y-1.5">
      <Label>부자재</Label>
      <div className="space-y-2 rounded-lg border p-3">
        {ACCESSORY_OPTIONS.map((option) => {
          const quantity = quantities[option.code] ?? 0;
          return (
            <div key={option.code} className="flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{option.labelKo}</p>
                <p className="text-xs text-muted-foreground">{option.priceKrw.toLocaleString('ko-KR')}원</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={() => changeQuantity(option.code, -1)}
                  disabled={quantity <= 0}
                >
                  −
                </Button>
                <span className="w-6 text-center text-sm">{quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  onClick={() => changeQuantity(option.code, 1)}
                >
                  +
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
