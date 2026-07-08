export type TubeThicknessCode = '6T' | '12T';
export type BaseBoardThicknessCode = '6T' | '8T';
export type LineTypeCode = 'single' | 'double';

export interface NeonPriceInput {
  widthMm: number;
  heightMm: number;
  tubeThickness: TubeThicknessCode;
  baseBoardThickness: BaseBoardThicknessCode;
  siliconeColorCode: string;
  /** 단선(single) or 복선(double) — double-line applies LINE_TYPE_MULTIPLIER to the tube unit price. */
  lineType: LineTypeCode;
  isOutdoor: boolean;
  displayText: string;
  fontFamily: string;
  /** Declared bounding size of the text/design itself (mm) — drives the text-size fee and the outline font size used for tube length. */
  textWidthMm: number;
  textHeightMm: number;
  /** Staff-confirmed exact tube length (mm), overrides the outline-length calculation when present. */
  tubeLengthMmOverride?: number;
  /** 부자재 — selected quantity (number of sets/units) per ACCESSORY_OPTIONS code. */
  accessoryQuantities: Record<string, number>;
}

export interface AccessoryLineCost {
  code: string;
  quantity: number;
  cost: number;
}

export interface NeonPriceBreakdown {
  basePanelCount: number;
  baseBoardCost: number;
  textSizeCost: number;
  tubeLengthM: number;
  tubeCost: number;
  waterproofCost: number;
  accessoriesCost: number;
  accessoryLines: AccessoryLineCost[];
  subtotal: number;
  total: number;
  warnings: string[];
}
