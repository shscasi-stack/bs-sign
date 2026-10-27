'use client';

import { useState, type ReactNode } from 'react';
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

const STEP_BADGE_COLORS = ['#E8E0FF', '#D9E8FF', '#D4F2E6', '#FFEBC2', '#FFE0D1'];

function Step({ number, title, children }: { number: number; title: string; children: ReactNode }) {
  return (
    <section className="rounded-[28px] bg-white p-5 sm:p-6">
      <h2 className="mb-4 flex items-center gap-3 text-xl font-extrabold tracking-tight">
        <span
          className="flex size-8 items-center justify-center rounded-full text-sm"
          style={{ background: STEP_BADGE_COLORS[(number - 1) % STEP_BADGE_COLORS.length] }}
        >
          {number}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function ConfiguratorForm() {
  const [form, setForm] = useState<NeonPriceInput>(initialState);
  const { breakdown, isStale } = useNeonPrice(form);

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <div className="space-y-5">
        <Step number={1} title="베이스판 크기">
          <DimensionInput
            widthMm={form.widthMm}
            heightMm={form.heightMm}
            onChange={(dims) => setForm((f) => ({ ...f, ...dims }))}
          />
        </Step>
        <Step number={2} title="두께 · 선 종류">
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
        </Step>
        <Step number={3} title="색상 · 설치 장소">
          <div className="space-y-4">
            <SiliconeColorPicker
              value={form.siliconeColorCode}
              onChange={(code) => setForm((f) => ({ ...f, siliconeColorCode: code }))}
            />
            <IndoorOutdoorToggle
              isOutdoor={form.isOutdoor}
              onChange={(isOutdoor) => setForm((f) => ({ ...f, isOutdoor }))}
            />
          </div>
        </Step>
        <Step number={4} title="문구 · 폰트">
          <TextFontInput
            displayText={form.displayText}
            fontFamily={form.fontFamily}
            textWidthMm={form.textWidthMm}
            textHeightMm={form.textHeightMm}
            onDisplayTextChange={(displayText) => setForm((f) => ({ ...f, displayText }))}
            onFontFamilyChange={(fontFamily) => setForm((f) => ({ ...f, fontFamily }))}
            onTextSizeChange={(size) => setForm((f) => ({ ...f, ...size }))}
          />
        </Step>
        <Step number={5} title="부자재">
          <AccessorySelector
            quantities={form.accessoryQuantities}
            onChange={(updater) => setForm((f) => ({ ...f, accessoryQuantities: updater(f.accessoryQuantities) }))}
          />
        </Step>
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
        <LivePricePreview breakdown={breakdown} isStale={isStale} isOutdoor={form.isOutdoor} />
      </div>
    </div>
  );
}
