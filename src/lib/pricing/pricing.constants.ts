import type { BaseBoardThicknessCode, LineTypeCode, TubeThicknessCode } from './pricing.types';

export const TUBE_PRICE_PER_METER_KRW: Record<TubeThicknessCode, number> = {
  '6T': 25000,
  '12T': 30000,
};

/** 복선(double-line) multiplies the tube unit price relative to 단선(single-line). */
export const LINE_TYPE_MULTIPLIER: Record<LineTypeCode, number> = {
  single: 1,
  double: 1.5,
};

export interface LineTypeOption {
  code: LineTypeCode;
  labelKo: string;
}

export const LINE_TYPE_OPTIONS: LineTypeOption[] = [
  { code: 'single', labelKo: '단선' },
  { code: 'double', labelKo: '복선' },
];

export const BASE_BOARD_PRICE_PER_PANEL_KRW: Record<BaseBoardThicknessCode, number> = {
  '6T': 15000,
  '8T': 20000,
};

export const BASE_BOARD_PANEL_MM = { width: 300, height: 300 } as const;

export const WATERPROOF_PRICE_PER_METER_KRW = 5000;

export const MAX_WIDTH_MM = 1200;
export const MAX_HEIGHT_MM = 2400;

/** Text-size fee: TEXT_SIZE_UNIT_PRICE_KRW per (TEXT_SIZE_UNIT_MM x TEXT_SIZE_UNIT_MM) of declared text bounding size. */
export const TEXT_SIZE_UNIT_MM = 100;
export const TEXT_SIZE_UNIT_PRICE_KRW = 20000;

export interface SiliconeColorOption {
  code: string;
  labelKo: string;
  hex: string;
}

export const SILICONE_COLORS: SiliconeColorOption[] = [
  { code: 'red', labelKo: '빨강', hex: '#e53935' },
  { code: 'yellow', labelKo: '노랑', hex: '#fdd835' },
  { code: 'dark_yellow', labelKo: '진한 노랑', hex: '#f9a825' },
  { code: 'orange', labelKo: '주황', hex: '#fb8c00' },
  { code: 'green', labelKo: '녹색', hex: '#43a047' },
  { code: 'blue', labelKo: '청색', hex: '#1e88e5' },
  { code: 'sky_blue', labelKo: '하늘색', hex: '#4fc3f7' },
  { code: 'pink', labelKo: '핑크색', hex: '#ec407a' },
  { code: 'purple', labelKo: '보라색', hex: '#8e24aa' },
  { code: 'white', labelKo: '흰색', hex: '#ffffff' },
  { code: 'warm_white', labelKo: '전구색', hex: '#ffd8a8' },
];

export interface FontOption {
  code: string;
  labelKo: string;
  cssFontFamily: string;
}

export const FONT_OPTIONS: FontOption[] = [
  { code: 'Arial', labelKo: '고딕 (Arial)', cssFontFamily: 'Arial, sans-serif' },
  { code: 'Noto Sans KR', labelKo: '본고딕 (Noto Sans KR)', cssFontFamily: '"Noto Sans KR", sans-serif' },
  { code: 'Pacifico', labelKo: '필기체 (Pacifico)', cssFontFamily: 'Pacifico, cursive' },
  { code: 'Dancing Script', labelKo: '손글씨 (Dancing Script)', cssFontFamily: '"Dancing Script", cursive' },
];

export interface AccessoryOption {
  code: string;
  labelKo: string;
  priceKrw: number;
}

/** 부자재 — optional add-ons, each priced per set/unit and bundled separately from the neon sign itself. */
export const ACCESSORY_OPTIONS: AccessoryOption[] = [
  { code: 'ceiling_hook', labelKo: '천정고리 1세트(2개)', priceKrw: 10000 },
  { code: 'dabo', labelKo: '다보 1세트(4개)', priceKrw: 8000 },
  { code: 'wireless_dimmer_60w', labelKo: '무선 디밍기 (60W용)', priceKrw: 10000 },
];
