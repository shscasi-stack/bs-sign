'use client';

import { useEffect, useState } from 'react';
import { FONT_OPTIONS, SILICONE_COLORS } from '@/lib/pricing/pricing.constants';
import type { LineTypeCode, TubeThicknessCode } from '@/lib/pricing/pricing.types';

interface NeonPreviewProps {
  displayText: string;
  fontFamily: string;
  siliconeColorCode: string;
  boardWidthMm: number;
  boardHeightMm: number;
  /** 가격 계산용. 미리보기는 폰트 비율을 유지하고 세로로만 크기를 정한다. */
  textWidthMm: number;
  textHeightMm: number;
  tubeThickness: TubeThicknessCode;
  lineType: LineTypeCode;
}

const TUBE_THICKNESS_MM: Record<TubeThicknessCode, number> = {
  '6T': 6,
  '12T': 12,
};

// Reference font size used only for measuring the text's ink bounds;
// the glyphs are then scaled uniformly to the requested letter height.
const REF_FONT = 100;

// Generous mask region in the text's local units (text origin at 0,0, REF_FONT size).
const MASK_AREA = { x: -100000, y: -100000, width: 200000, height: 200000 };

/** Ink bounds around the text origin (start anchor, alphabetic baseline), at REF_FONT size. */
interface InkBox {
  left: number;
  right: number;
  ascent: number;
  descent: number;
}

function measureInk(text: string, fontSpec: string): InkBox | null {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return null;
  ctx.font = fontSpec;
  const m = ctx.measureText(text);
  const box = {
    left: m.actualBoundingBoxLeft,
    right: m.actualBoundingBoxRight,
    ascent: m.actualBoundingBoxAscent,
    descent: m.actualBoundingBoxDescent,
  };
  return box.left + box.right > 0 && box.ascent + box.descent > 0 ? box : null;
}

export function NeonPreview({
  displayText,
  fontFamily,
  siliconeColorCode,
  boardWidthMm,
  boardHeightMm,
  textHeightMm,
  tubeThickness,
  lineType,
}: NeonPreviewProps) {
  const font = FONT_OPTIONS.find((f) => f.code === fontFamily);
  const hex = SILICONE_COLORS.find((c) => c.code === siliconeColorCode)?.hex ?? '#ffffff';
  const text = displayText.trim();
  const hasBoard = boardWidthMm > 0 && boardHeightMm > 0;
  const isDouble = lineType === 'double';
  const fontSpec = `${isDouble ? 800 : 400} ${REF_FONT}px ${font?.cssFontFamily ?? 'sans-serif'}`;

  // Measure the text's actual ink bounds (not the font's em box, which adds
  // empty space above/below Latin caps) so it can be sized by real height.
  // A measurement only counts for the text/font it was taken with.
  const inkKey = `${fontSpec}|${text}`;
  const [inkState, setInkState] = useState<{ key: string; box: InkBox | null } | null>(null);
  const ink = text && hasBoard && inkState?.key === inkKey ? inkState.box : null;

  useEffect(() => {
    if (!text || !hasBoard) return;
    let cancelled = false;
    const measure = () => {
      if (!cancelled) setInkState({ key: inkKey, box: measureInk(text, fontSpec) });
    };
    const frame = requestAnimationFrame(measure);
    // Web fonts may finish loading after the first measurement.
    document.fonts?.load(fontSpec, text).then(measure, () => {});
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [text, fontSpec, hasBoard, inkKey]);

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

  // 글씨 세로 sets the size; letters keep the font's own proportions. Stretching
  // them into a 가로×세로 box made Latin letters (narrower than Hangul) look
  // flattened. Then shrink uniformly if needed to sit on the board.
  const measured = ink !== null;
  const inkW = measured ? ink.left + ink.right : 1;
  const inkH = measured ? ink.ascent + ink.descent : 1;
  const targetH = textHeightMm > 0 ? textHeightMm : boardHeightMm * 0.25;
  const scale = measured
    ? Math.min(targetH / inkH, (boardWidthMm * 0.92) / inkW, (boardHeightMm * 0.92) / inkH)
    : 1;
  // Centre of the ink box relative to the text origin (start / alphabetic baseline).
  const inkCx = measured ? (ink.right - ink.left) / 2 : 0;
  const inkCy = measured ? (ink.descent - ink.ascent) / 2 : 0;
  // Tube width in the text's local units, so 6T/12T reads at real mm scale
  // relative to the letters (the board viewBox is in mm).
  const tubeLocal = tubeMm / scale;

  // 복선(double): a heavy glyph outlined by the tube, leaving the letter's
  // center hollow — the tube runs around each letter like a real 복선 sign.
  const textProps = {
    x: 0,
    y: 0,
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
              transform={`translate(${cx} ${cy}) scale(${scale}) translate(${-inkCx} ${-inkCy})`}
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
                <text {...textProps} fill={hex} stroke="none">
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
