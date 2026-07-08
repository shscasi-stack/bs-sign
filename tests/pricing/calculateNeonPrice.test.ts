import { describe, expect, it } from 'vitest';
import { calculateNeonPrice } from '@/lib/pricing/calculateNeonPrice';
import type { NeonPriceInput } from '@/lib/pricing/pricing.types';

const baseInput: NeonPriceInput = {
  widthMm: 600,
  heightMm: 600,
  tubeThickness: '6T',
  baseBoardThickness: '6T',
  siliconeColorCode: 'red',
  lineType: 'single',
  isOutdoor: false,
  displayText: 'HELLO',
  fontFamily: 'Arial',
  textWidthMm: 200,
  textHeightMm: 100,
  accessoryQuantities: {},
};

const TUBE_LENGTH_MM = 2000; // 2m, fixed so tests don't depend on the outline estimator

describe('calculateNeonPrice', () => {
  it('computes indoor pricing: board + text size + tube, no waterproofing', () => {
    const result = calculateNeonPrice(baseInput, TUBE_LENGTH_MM);

    expect(result.basePanelCount).toBe(4); // ceil(600/300) * ceil(600/300)
    expect(result.baseBoardCost).toBe(60000); // 4 * 15000
    expect(result.textSizeCost).toBe(60000); // (200/100)*20000 + (100/100)*20000 = 40000 + 20000
    expect(result.tubeLengthM).toBe(2);
    expect(result.tubeCost).toBe(50000); // 2 * 25000
    expect(result.waterproofCost).toBe(0);
    expect(result.total).toBe(170000); // 60000 + 60000 + 50000
  });

  it('adds waterproofing cost per meter of tube when outdoor', () => {
    const result = calculateNeonPrice({ ...baseInput, isOutdoor: true }, TUBE_LENGTH_MM);

    expect(result.waterproofCost).toBe(10000); // 2m * 5000
    expect(result.total).toBe(180000);
  });

  it('uses 12T tube and 8T board rates when selected', () => {
    const result = calculateNeonPrice(
      { ...baseInput, tubeThickness: '12T', baseBoardThickness: '8T' },
      TUBE_LENGTH_MM
    );

    expect(result.baseBoardCost).toBe(80000); // 4 * 20000
    expect(result.tubeCost).toBe(60000); // 2m * 30000
    expect(result.total).toBe(200000); // 80000 + 60000 + 60000
  });

  it('multiplies the tube cost by 1.5 when lineType is double (복선)', () => {
    const single = calculateNeonPrice(baseInput, TUBE_LENGTH_MM);
    const double = calculateNeonPrice({ ...baseInput, lineType: 'double' }, TUBE_LENGTH_MM);

    expect(single.tubeCost).toBe(50000); // 2m * 25000 * 1
    expect(double.tubeCost).toBeCloseTo(75000); // 2m * 25000 * 1.5
    expect(double.total).toBeCloseTo(single.total + 25000);
  });

  it('prices width and height independently and sums them, not as an area', () => {
    const result = calculateNeonPrice({ ...baseInput, textWidthMm: 100, textHeightMm: 100 }, TUBE_LENGTH_MM);
    expect(result.textSizeCost).toBe(40000); // (100/100)*20000 + (100/100)*20000

    const wide = calculateNeonPrice({ ...baseInput, textWidthMm: 400, textHeightMm: 100 }, TUBE_LENGTH_MM);
    expect(wide.textSizeCost).toBe(100000); // (400/100)*20000 + (100/100)*20000 = 80000 + 20000
  });

  it('has no accessories cost by default', () => {
    const result = calculateNeonPrice(baseInput, TUBE_LENGTH_MM);
    expect(result.accessoriesCost).toBe(0);
    expect(result.accessoryLines).toEqual([]);
  });

  it('prices selected 부자재 (accessories) and lists only the ones with quantity > 0', () => {
    const result = calculateNeonPrice(
      { ...baseInput, accessoryQuantities: { ceiling_hook: 2, dabo: 0, wireless_dimmer_60w: 1 } },
      TUBE_LENGTH_MM
    );

    expect(result.accessoriesCost).toBe(30000); // 2*10000 (ceiling_hook) + 1*10000 (dimmer), dabo excluded (qty 0)
    expect(result.accessoryLines).toEqual([
      { code: 'ceiling_hook', quantity: 2, cost: 20000 },
      { code: 'wireless_dimmer_60w', quantity: 1, cost: 10000 },
    ]);
    expect(result.total).toBe(170000 + 30000); // base total (no accessories) + accessoriesCost
  });

  it('warns when tube length came from the outline estimate rather than an override', () => {
    const result = calculateNeonPrice(baseInput, 1500, { isEstimated: true });

    expect(result.tubeLengthM).toBe(1.5);
    expect(result.warnings).toContain('실리콘 튜브 길이는 문자 윤곽선 기반 자동 계산 값입니다.');
  });

  it('warns when a fallback font was used for missing glyphs', () => {
    const result = calculateNeonPrice(baseInput, 1500, { isEstimated: true, usedFallbackFont: true });
    expect(result.warnings).toContain('선택한 폰트가 일부 문자를 지원하지 않아 대체 폰트로 길이를 계산했습니다.');
  });

  it('does not warn when tube length is a staff-confirmed override', () => {
    const result = calculateNeonPrice(baseInput, TUBE_LENGTH_MM);
    expect(result.warnings).toEqual([]);
  });

  it('warns when requested size exceeds the max dimensions', () => {
    const result = calculateNeonPrice({ ...baseInput, widthMm: 1300, heightMm: 2500 }, TUBE_LENGTH_MM);
    expect(result.warnings.some((w) => w.includes('초과'))).toBe(true);
  });
});
