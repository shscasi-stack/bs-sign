'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface IndoorOutdoorToggleProps {
  isOutdoor: boolean;
  onChange: (isOutdoor: boolean) => void;
}

export function IndoorOutdoorToggle({ isOutdoor, onChange }: IndoorOutdoorToggleProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-input px-3 py-2.5">
      <div>
        <Label htmlFor="indoor-outdoor">실외 설치</Label>
        <p className="text-xs text-muted-foreground">실외 선택 시 방수 처리비가 추가됩니다 (5,000원/m)</p>
      </div>
      <Switch id="indoor-outdoor" checked={isOutdoor} onCheckedChange={onChange} />
    </div>
  );
}
