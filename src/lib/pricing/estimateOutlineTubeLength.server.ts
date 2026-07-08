import 'server-only';
import fs from 'node:fs/promises';
import path from 'node:path';
import { parse } from 'opentype.js';
import type { Font } from 'opentype.js';
import { FONT_FILES, FALLBACK_FONT_CODE } from './fontFiles';
import { computeOutlineTubeLengthMm, type OutlineTubeLengthResult } from './outlineTubeLengthCore';

const fontCache = new Map<string, Promise<Font>>();

function loadFont(code: string): Promise<Font> {
  const filename = FONT_FILES[code] ?? FONT_FILES[FALLBACK_FONT_CODE];
  let cached = fontCache.get(filename);
  if (!cached) {
    cached = fs
      .readFile(path.join(process.cwd(), 'public', 'fonts', filename))
      .then((buf) => parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)));
    fontCache.set(filename, cached);
  }
  return cached;
}

/**
 * Server-side outline length estimation — reads font files from disk so
 * order/quote totals can be independently re-derived from (text, font, size)
 * rather than trusting a client-submitted tube length.
 */
export function estimateOutlineTubeLengthMm(
  text: string,
  fontCode: string,
  fontSizeMm: number
): Promise<OutlineTubeLengthResult> {
  return computeOutlineTubeLengthMm(text, fontCode, fontSizeMm, loadFont);
}
