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
  const color = SILICONE_COLORS.find((c) => c.code === siliconeColorCode);
  const hex = color?.hex ?? '#ffffff';
  const text = displayText.trim();

  const hasBoard = boardWidthMm > 0 && boardHeightMm > 0;

  if (!hasBoard) {
    return (
      <div className="flex min-h-32 items-center justify-center rounded-lg bg-neutral-900 px-4 py-8">
        <span className="text-center text-sm text-neutral-400">
          베이스판 가로/세로를 입력하면 미리보기가 표시됩니다
        </span>
      </div>
    );
  }

  // viewBox is in real mm, so the board's aspect ratio, the text-to-board
  // size ratio, and the tube stroke width are all physically accurate.
  const fontSizeMm = textHeightMm > 0 ? textHeightMm : boardHeightMm * 0.25;
  const tubeMm = TUBE_THICKNESS_MM[tubeThickness];
  const glowMm = Math.max(fontSizeMm * 0.08, 1);
  const cornerMm = Math.min(boardWidthMm, boardHeightMm) * 0.03;

  // 단선(single): solid glyphs fattened by the tube stroke.
  // 복선(double): stroke-only glyph outlines — each letter stroke reads as
  // two parallel tube lines, matching how double-line neon is bent.
  const isDouble = lineType === 'double';

  return (
    <div className="flex items-center justify-center rounded-lg bg-neutral-900 p-4">
      <svg
        viewBox={`0 0 ${boardWidthMm} ${boardHeightMm}`}
        className="h-auto w-full"
        style={{ maxHeight: 280 }}
        role="img"
        aria-label={`네온사인 미리보기: ${text || '문구 없음'}`}
      >
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={glowMm} result="blur1" />
            <feGaussianBlur stdDeviation={glowMm * 3} result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
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
          <text
            x={boardWidthMm / 2}
            y={boardHeightMm / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={fontSizeMm}
            fontWeight="bold"
            fill={isDouble ? 'none' : hex}
            stroke={hex}
            strokeWidth={tubeMm}
            strokeLinejoin="round"
            strokeLinecap="round"
            paintOrder="stroke"
            filter="url(#neon-glow)"
            style={{ fontFamily: font?.cssFontFamily }}
            {...(textWidthMm > 0
              ? { textLength: textWidthMm, lengthAdjust: 'spacingAndGlyphs' as const }
              : {})}
          >
            {text}
          </text>
        )}
      </svg>
    </div>
  );
}
