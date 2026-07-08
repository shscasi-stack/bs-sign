import fs from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'opentype.js';
import type { Font } from 'opentype.js';
import { describe, expect, it } from 'vitest';
import { computeOutlineTubeLengthMm } from '@/lib/pricing/outlineTubeLengthCore';
import { FONT_FILES } from '@/lib/pricing/fontFiles';

// Bypasses estimateOutlineTubeLength.server.ts (which imports the 'server-only'
// marker package that throws outside a Next.js server-component build) by
// loading the same font files directly from disk for this test.
const fontCache = new Map<string, Promise<Font>>();
function loadFont(code: string): Promise<Font> {
  const filename = FONT_FILES[code] ?? FONT_FILES['Noto Sans KR'];
  let cached = fontCache.get(filename);
  if (!cached) {
    cached = fs
      .readFile(path.join(process.cwd(), 'public', 'fonts', filename))
      .then((buf) => parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)));
    fontCache.set(filename, cached);
  }
  return cached;
}

describe('computeOutlineTubeLengthMm (real font outlines)', () => {
  it('produces a much longer length than a bounding-width heuristic would for Korean text', async () => {
    // "백송스카시" at 150mm — bounding-box advance width is ~705mm (~0.7m);
    // real outline path length should be several times that.
    const { lengthMm, usedFallbackFont } = await computeOutlineTubeLengthMm(
      '백송스카시',
      'Noto Sans KR',
      150,
      loadFont
    );

    expect(usedFallbackFont).toBe(false);
    expect(lengthMm).toBeGreaterThan(2000); // real outline length is roughly 4x-6x the bounding width
  });

  it('scales roughly linearly with font size', async () => {
    const at150 = await computeOutlineTubeLengthMm('OPEN', 'Arial', 150, loadFont);
    const at300 = await computeOutlineTubeLengthMm('OPEN', 'Arial', 300, loadFont);

    expect(at300.lengthMm).toBeCloseTo(at150.lengthMm * 2, 0);
  });

  it('returns 0 for empty/whitespace text', async () => {
    const result = await computeOutlineTubeLengthMm('   ', 'Arial', 150, loadFont);
    expect(result.lengthMm).toBe(0);
  });

  it('falls back to a Korean font and flags it when the chosen font lacks the glyph', async () => {
    // Pacifico is Latin-script only — Korean characters should fall back to Noto Sans KR (Nanum Gothic file).
    const result = await computeOutlineTubeLengthMm('가', 'Pacifico', 150, loadFont);

    expect(result.usedFallbackFont).toBe(true);
    expect(result.lengthMm).toBeGreaterThan(0);
  });
});
