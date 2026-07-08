import { parse } from 'opentype.js';
import type { Font } from 'opentype.js';
import { FONT_FILES, FALLBACK_FONT_CODE } from './fontFiles';
import { computeOutlineTubeLengthMm, type OutlineTubeLengthResult } from './outlineTubeLengthCore';

const fontCache = new Map<string, Promise<Font>>();

function loadFont(code: string): Promise<Font> {
  const filename = FONT_FILES[code] ?? FONT_FILES[FALLBACK_FONT_CODE];
  let cached = fontCache.get(filename);
  if (!cached) {
    cached = fetch(`/fonts/${filename}`)
      .then((res) => res.arrayBuffer())
      .then((buf) => parse(buf));
    fontCache.set(filename, cached);
  }
  return cached;
}

/** Browser-side outline length estimation — fetches font files from /public/fonts. */
export function estimateOutlineTubeLengthMm(
  text: string,
  fontCode: string,
  fontSizeMm: number
): Promise<OutlineTubeLengthResult> {
  return computeOutlineTubeLengthMm(text, fontCode, fontSizeMm, loadFont);
}
