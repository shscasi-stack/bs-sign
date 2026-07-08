import { BASE_BOARD_PANEL_MM } from './pricing.constants';

export function calculateBasePanels(widthMm: number, heightMm: number): number {
  const panelsAcross = Math.ceil(widthMm / BASE_BOARD_PANEL_MM.width);
  const panelsDown = Math.ceil(heightMm / BASE_BOARD_PANEL_MM.height);
  return panelsAcross * panelsDown;
}
