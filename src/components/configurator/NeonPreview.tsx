'use client';

import { useEffect, useRef, useState } from 'react';
import { FONT_OPTIONS, SILICONE_COLORS } from '@/lib/pricing/pricing.constants';
import type { LineTypeCode, TubeThicknessCode } from '@/lib/pricing/pricing.types';

interface NeonPreviewProps {
  displayText: string;
  fontFamily: string;
  siliconeColorCode: string;
  boardWidthMm: number;
  boardHeightMm: number;
  textWidthMm: number;
  textHeightMm: number;
  tubeThickness: TubeThicknessCode;
  lineType: LineTypeCode;
}

const TUBE_THICKNESS_MM: Record<TubeThicknessCode, number> = {
  '6T': 6,
  '12T': 12,
};

// Reference font size used only for measuring the text's natural bounds;
// the glyphs are then scaled to exactly fill the requested text box.
const REF_FONT = 100;

// Generous mask region in the text's local units (text is centered on 0,0 at REF_FONT size).
const MASK_AREA = { x: -100000, y: -100000, width: 200000, height: 200000 };

export function NeonPreview({
  displayText,
  fontFamily,
  siliconeColorCode,
  boardWidthMm,
  boardHeightMm,
  textWidthMm,
  textHeightMm,
  tubeThickness,
  lineType,
}: NeonPreviewProps) {
  const font = FONT_OPTIONS.find((f) => f.code === fontFamily);
  const hex = SILICONE_COLORS.find((c) => c.code === siliconeColorCode)?.hex ?? '#ffffff';
  const text = displayText.trim();
  const hasBoard = boardWidthMm > 0 && boardHeightMm > 0;
  const isDouble = lineType === 'double';

  const textRef = useRef<SVGTextElement>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);

  // Measure the glyphs' natural bounding box (excludes stroke) so the text can
  // be scaled to the requested box without squashing letters into each other.
  useEffect(() => {
    const el = textRef.current;
    if (!el || !text) {
      setNatural(null);
      return;
    }
    try {
      const bb = el.getBBox();
      setNatural(bb.width > 0 && bb.height > 0 ? { w: bb.width, h: bb.height } : null);
    } catch {
      setNatural(null);
    }
  }, [text, fontFamily, hasBoard, isDouble]);

  if (!hasBoard) {
    return (
      <div className="flex min-h-32 items-center justify-center rounded-[28px] bg-neutral-900 px-4 py-8">
        <span className="text-center text-sm text-neutral-400">
          베이스판 가로/세로를 입력하면 미리보기가 표시됩니다
        </span>
      </div>
    );
  }

  // viewBox is in real mm, so board aspect ratio and tube width are accurate.
  const tubeMm = TUBE_THICKNESS_MM[tubeThickness];
  // 복선 outlines are thin lines with dark space between, so they take a wider
  // halo without merging — closer to how a lit 복선 sign photographs.
  const glowMm = isDouble ? Math.max(tubeMm * 0.7, 2.5) : Math.max(tubeMm * 0.3, 1.2);
  const cornerMm = Math.min(boardWidthMm, boardHeightMm) * 0.03;
  const cx = boardWidthMm / 2;
  const cy = boardHeightMm / 2;

  // 글씨 가로/세로 is the size of ONE letter. The whole word is therefore
  // letterCount letters wide at that per-letter proportion, then scaled down
  // uniformly to sit on the board (never squashing letters together).
  const letterCount = Math.max([...text].filter((c) => !/\s/.test(c)).length, 1);
  const perLetterW = textWidthMm > 0 ? textWidthMm : boardHeightMm * 0.25;
  const perLetterH = textHeightMm > 0 ? textHeightMm : boardHeightMm * 0.25;
  const intendedW = letterCount * perLetterW;
  const intendedH = perLetterH;
  const fit = Math.min((boardWidthMm * 0.92) / intendedW, (boardHeightMm * 0.92) / intendedH, 1);

  const measured = natural !== null;
  const scaleX = measured ? (intendedW / natural.w) * fit : 1;
  const scaleY = measured ? (intendedH / natural.h) * fit : 1;
  // Tube width in the text's local units, so 6T/12T reads at real mm scale
  // relative to the letters (the board viewBox is in mm).
  const tubeLocal = tubeMm / Math.sqrt(scaleX * scaleY);

  // 복선(double): a heavy glyph outlined by the tube, leaving the letter's
  // center hollow — the tube runs around each letter like a real 복선 sign.
  const textProps = {
    x: 0,
    y: 0,
    textAnchor: 'middle' as const,
    dominantBaseline: 'central' as const,
    fontSize: REF_FONT,
    fontWeight: isDouble ? 800 : undefined,
    strokeLinejoin: 'round' as const,
    strokeLinecap: 'round' as const,
    style: { fontFamily: font?.cssFontFamily },
  };

  return (
    <div className="flex items-center justify-center rounded-[28px] bg-neutral-900 p-4">
      <svg
        viewBox={`0 0 ${boardWidthMm} ${boardHeightMm}`}
        className="h-auto w-full"
        style={{ maxHeight: 280 }}
        role="img"
        aria-label={`네온사인 미리보기: ${text || '문구 없음'}`}
      >
        <defs>
          {/* Soft single-layer halo: a wide/stacked blur bled color into the
              gaps of dense Hangul, making it look harsh and merged. */}
          <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={glowMm} result="blur" />
            <feComponentTransfer in="blur" result="softBlur">
              <feFuncA type="linear" slope={isDouble ? 0.9 : 0.6} />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="softBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x="0"
          y="0"
          width={boardWidthMm}
          height={boardHeightMm}
          rx={cornerMm}
          fill="#262626"
          stroke="#404040"
          strokeWidth={Math.max(boardWidthMm, boardHeightMm) * 0.004}
        />

        {text && (
          // Glow filter is applied outside the scale so blur stays consistent.
          <g filter="url(#neon-glow)">
            <g
              transform={`translate(${cx} ${cy}) scale(${scaleX} ${scaleY})`}
              style={{ visibility: measured ? 'visible' : 'hidden' }}
            >
              {isDouble ? (
                <>
                  {/* Fonts build glyphs from overlapping contours (e.g. 고), so a
                      plain stroke draws the overlaps inside the letter. Instead the
                      stroke is drawn at double width and the glyph interior is
                      masked away, leaving one tube along the merged outer edge. */}
                  <defs>
                    <mask id="neon-outside" maskUnits="userSpaceOnUse" {...MASK_AREA}>
                      <rect {...MASK_AREA} fill="white" />
                      <text {...textProps} fill="black">
                        {text}
                      </text>
                    </mask>
                    <mask id="neon-core" maskUnits="userSpaceOnUse" {...MASK_AREA}>
                      <rect {...MASK_AREA} fill="white" />
                      <text {...textProps} fill="black" stroke="black" strokeWidth={tubeLocal * 0.7}>
                        {text}
                      </text>
                    </mask>
                  </defs>
                  <text
                    ref={textRef}
                    {...textProps}
                    fill="none"
                    stroke={hex}
                    strokeWidth={tubeLocal * 2}
                    mask="url(#neon-outside)"
                  >
                    {text}
                  </text>
                  {/* Brighter core down the middle of the tube, like lit silicone neon. */}
                  <text
                    {...textProps}
                    aria-hidden
                    fill="none"
                    stroke="#ffffff"
                    strokeOpacity={0.5}
                    strokeWidth={tubeLocal * 1.3}
                    mask="url(#neon-core)"
                  >
                    {text}
                  </text>
                </>
              ) : (
                // 단선(single): filled solid glyph reads as one lit shape.
                <text ref={textRef} {...textProps} fill={hex} stroke="none">
                  {text}
                </text>
              )}
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}
