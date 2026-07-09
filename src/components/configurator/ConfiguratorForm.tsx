'use client';

import { useState } from 'react';
import { AccessorySelector } from './AccessorySelector';
import { BaseBoardThicknessSelect } from './BaseBoardThicknessSelect';
import { DimensionInput } from './DimensionInput';
import { IndoorOutdoorToggle } from './IndoorOutdoorToggle';
import { LineTypeSelect } from './LineTypeSelect';
import { LivePricePreview } from './LivePricePreview';
import { NeonPreview } from './NeonPreview';
import { SiliconeColorPicker } from './SiliconeColorPicker';
import { TextFontInput } from './TextFontInput';
import { TubeThicknessSelect } from './TubeThicknessSelect';
import { useNeonPrice } from '@/hooks/useNeonPrice';
import { FONT_OPTIONS, SILICONE_COLORS } from '@/lib/pricing/pricing.constants';
import type { NeonPriceInput } from '@/lib/pricing/pricing.types';

const initialState: NeonPriceInput = {
  widthMm: 0,
  heightMm: 0,
  tubeThickness: '6T',
  baseBoardThickness: '6T',
  siliconeColorCode: SILICONE_COLORS[0].code,
  lineType: 'single',
  isOutdoor: false,
  displayText: 'OPEN',
  fontFamily: FONT_OPTIONS[0].code,
  textWidthMm: 0,
  textHeightMm: 0,
  accessoryQuantities: {},
};

export function ConfiguratorForm() {
  const [form, setForm] = useState<NeonPriceInput>(initialState);
  const { breakdown, isStale } = useNeonPrice(form);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="space-y-6">
        <DimensionInput
          widthMm={form.widthMm}
          heightMm={form.heightMm}
          onChange={(dims) => setForm((f) => ({ ...f, ...dims }))}
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <TubeThicknessSelect
            value={form.tubeThickness}
            onChange={(v) => setForm((f) => ({ ...f, tubeThickness: v }))}
          />
          <BaseBoardThicknessSelect
            value={form.baseBoardThickness}
            onChange={(v) => setForm((f) => ({ ...f, baseBoardThickness: v }))}
          />
          <LineTypeSelect
            value={form.lineType}
            onChange={(v) => setForm((f) => ({ ...f, lineType: v }))}
          />
        </div>
        <SiliconeColorPicker
          value={form.siliconeColorCode}
          onChange={(code) => setForm((f) => ({ ...f, siliconeColorCode: code }))}
        />
        <IndoorOutdoorToggle
          isOutdoor={form.isOutdoor}
          onChange={(isOutdoor) => setForm((f) => ({ ...f, isOutdoor }))}
        />
        <TextFontInput
          displayText={form.displayText}
          fontFamily={form.fontFamily}
          textWidthMm={form.textWidthMm}
          textHeightMm={form.textHeightMm}
          onDisplayTextChange={(displayText) => setForm((f) => ({ ...f, displayText }))}
          onFontFamilyChange={(fontFamily) => setForm((f) => ({ ...f, fontFamily }))}
          onTextSizeChange={(size) => setForm((f) => ({ ...f, ...size }))}
        />
        <AccessorySelector
          quantities={form.accessoryQuantities}
          onChange={(updater) => setForm((f) => ({ ...f, accessoryQuantities: updater(f.accessoryQuantities) }))}
        />
      </div>

      <div className="space-y-4">
        <NeonPreview
          displayText={form.displayText}
          fontFamily={form.fontFamily}
          siliconeColorCode={form.siliconeColorCode}
          boardWidthMm={form.widthMm}
          boardHeightMm={form.heightMm}
          textWidthMm={form.textWidthMm}
          textHeightMm={form.textHeightMm}
          tubeThickness={form.tubeThickness}
          lineType={form.lineType}
        />
        <LivePricePreview breakdown={breakdown} isStale={isStale} />
      </div>
    </div>
  );
}
