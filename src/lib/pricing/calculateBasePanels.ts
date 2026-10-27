import { BASE_BOARD_PANEL_MM, MAX_HEIGHT_MM, MAX_WIDTH_MM } from './pricing.constants';

export function calculateBasePanels(widthMm: number, heightMm: number): number {
  const panelsAcross = Math.ceil(widthMm / BASE_BOARD_PANEL_MM.width);
  const panelsDown = Math.ceil(heightMm / BASE_BOARD_PANEL_MM.height);
  return panelsAcross * panelsDown;
}

/** 판 한 장(최대 MAX_WIDTH_MM × MAX_HEIGHT_MM)을 넘으면 몇 조각으로 나눠 만들어야 하는지. */
export function countBoardPieces(widthMm: number, heightMm: number): number {
  return Math.max(1, Math.ceil(widthMm / MAX_WIDTH_MM)) * Math.max(1, Math.ceil(heightMm / MAX_HEIGHT_MM));
}
