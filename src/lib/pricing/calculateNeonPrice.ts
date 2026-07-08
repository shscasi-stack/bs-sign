import { calculateBasePanels } from './calculateBasePanels';
import {
  ACCESSORY_OPTIONS,
  BASE_BOARD_PRICE_PER_PANEL_KRW,
  LINE_TYPE_MULTIPLIER,
  MAX_HEIGHT_MM,
  MAX_WIDTH_MM,
  TEXT_SIZE_UNIT_MM,
  TEXT_SIZE_UNIT_PRICE_KRW,
  TUBE_PRICE_PER_METER_KRW,
  WATERPROOF_PRICE_PER_METER_KRW,
} from './pricing.constants';
import type { AccessoryLineCost, NeonPriceBreakdown, NeonPriceInput } from './pricing.types';

export interface CalculateNeonPriceOptions {
  /** True when tubeLengthMm came from the outline estimator rather than a staff-confirmed override. */
  isEstimated?: boolean;
  /** True when the outline estimator had to substitute a fallback font for one or more characters. */
  usedFallbackFont?: boolean;
}

/**
 * Pure pricing math. Tube length must already be resolved by the caller —
 * either from a staff-confirmed `input.tubeLengthMmOverride` or from the
 * async outline-length estimator (see estimateOutlineTubeLength.client/server.ts) —
 * since real font outline extraction is inherently async and shouldn't live inside this function.
 */
export function calculateNeonPrice(
  input: NeonPriceInput,
  tubeLengthMm: number,
  options: CalculateNeonPriceOptions = {}
): NeonPriceBreakdown {
  const warnings: string[] = [];

  if (input.widthMm > MAX_WIDTH_MM || input.heightMm > MAX_HEIGHT_MM) {
    warnings.push(`요청하신 크기가 최대 ${MAX_WIDTH_MM}×${MAX_HEIGHT_MM}mm를 초과했습니다.`);
  }

  const basePanelCount = calculateBasePanels(input.widthMm, input.heightMm);
  const baseBoardCost = basePanelCount * BASE_BOARD_PRICE_PER_PANEL_KRW[input.baseBoardThickness];

  // Width and height are priced independently (each as a linear multiple of
  // the 100mm unit rate) and summed, rather than multiplied as an area.
  const textSizeCost =
    (input.textWidthMm / TEXT_SIZE_UNIT_MM) * TEXT_SIZE_UNIT_PRICE_KRW +
    (input.textHeightMm / TEXT_SIZE_UNIT_MM) * TEXT_SIZE_UNIT_PRICE_KRW;

  const tubeLengthM = tubeLengthMm / 1000;
  const tubeCost =
    tubeLengthM * TUBE_PRICE_PER_METER_KRW[input.tubeThickness] * LINE_TYPE_MULTIPLIER[input.lineType];
  const waterproofCost = input.isOutdoor ? tubeLengthM * WATERPROOF_PRICE_PER_METER_KRW : 0;

  const accessoryLines: AccessoryLineCost[] = ACCESSORY_OPTIONS.map((option) => {
    const quantity = input.accessoryQuantities[option.code] ?? 0;
    return { code: option.code, quantity, cost: quantity * option.priceKrw };
  }).filter((line) => line.quantity > 0);
  const accessoriesCost = accessoryLines.reduce((sum, line) => sum + line.cost, 0);

  if (options.isEstimated) {
    warnings.push('실리콘 튜브 길이는 문자 윤곽선 기반 자동 계산 값입니다.');
  }
  if (options.usedFallbackFont) {
    warnings.push('선택한 폰트가 일부 문자를 지원하지 않아 대체 폰트로 길이를 계산했습니다.');
  }

  const subtotal = baseBoardCost + textSizeCost + tubeCost + waterproofCost + accessoriesCost;
  const total = Math.round(subtotal);

  return {
    basePanelCount,
    baseBoardCost,
    textSizeCost,
    tubeLengthM,
    tubeCost,
    waterproofCost,
    accessoriesCost,
    accessoryLines,
    subtotal,
    total,
    warnings,
  };
}
