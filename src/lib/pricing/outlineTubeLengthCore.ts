import type { Font } from 'opentype.js';
import { FALLBACK_FONT_CODE } from './fontFiles';
import { pathLength } from './outlinePathMath';

export interface OutlineTubeLengthResult {
  lengthMm: number;
  /** True if one or more characters weren't in the selected font and a Korean fallback font supplied the glyph instead. */
  usedFallbackFont: boolean;
}

/**
 * Sums the real outline-path length (mm) of every character's glyph at the
 * given font size — the neon-tube equivalent of Illustrator's
 * "Create Outlines" total path length, not just the text's bounding width.
 */
export async function computeOutlineTubeLengthMm(
  text: string,
  fontCode: string,
  fontSizeMm: number,
  loadFont: (code: string) => Promise<Font>
): Promise<OutlineTubeLengthResult> {
  const trimmed = text.trim();
  if (!trimmed || fontSizeMm <= 0) {
    return { lengthMm: 0, usedFallbackFont: false };
  }

  const primaryFont = await loadFont(fontCode);
  let fallbackFont: Font | null = null;
  let usedFallbackFont = false;
  let total = 0;

  for (const ch of trimmed) {
    if (/\s/.test(ch)) continue;

    let glyph = primaryFont.charToGlyph(ch);
    if (glyph.index === 0) {
      fallbackFont ??= await loadFont(FALLBACK_FONT_CODE);
      const fallbackGlyph = fallbackFont.charToGlyph(ch);
      if (fallbackGlyph.index !== 0) {
        glyph = fallbackGlyph;
        usedFallbackFont = true;
      }
    }

    total += pathLength(glyph.getPath(0, 0, fontSizeMm));
  }

  return { lengthMm: total, usedFallbackFont };
}
