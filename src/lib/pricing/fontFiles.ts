/**
 * Maps a font option's code (see FONT_OPTIONS in pricing.constants.ts) to a
 * static TTF file under /public/fonts used for real glyph-outline extraction.
 *
 * 'Arial' and 'Noto Sans KR' both point at Nanum Gothic — Arial itself has no
 * redistributable file and no Hangul coverage, so Nanum Gothic (open license,
 * full Korean coverage) stands in for outline calculation for both options.
 */
export const FONT_FILES: Record<string, string> = {
  Arial: 'NanumGothic-Regular.ttf',
  'Noto Sans KR': 'NanumGothic-Regular.ttf',
  Pacifico: 'Pacifico-Regular.ttf',
  'Dancing Script': 'DancingScript-Variable.ttf',
};

/** Used when the selected font's glyph table has no entry for a character (e.g. Hangul in a Latin-only script font). */
export const FALLBACK_FONT_CODE = 'Noto Sans KR';
