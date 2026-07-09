import { FONT_OPTIONS, SILICONE_COLORS } from '@/lib/pricing/pricing.constants';

interface NeonPreviewProps {
  displayText: string;
  fontFamily: string;
  siliconeColorCode: string;
}

export function NeonPreview({ displayText, fontFamily, siliconeColorCode }: NeonPreviewProps) {
  const font = FONT_OPTIONS.find((f) => f.code === fontFamily);
  const color = SILICONE_COLORS.find((c) => c.code === siliconeColorCode);
  const hex = color?.hex ?? '#ffffff';
  const text = displayText.trim() || '문구를 입력해 주세요';

  return (
    <div className="flex min-h-32 items-center justify-center overflow-hidden rounded-lg bg-neutral-900 px-4 py-8">
      <span
        className="text-center text-3xl leading-snug font-bold break-words"
        style={{
          color: hex,
          fontFamily: font?.cssFontFamily,
          textShadow: `0 0 4px ${hex}, 0 0 12px ${hex}, 0 0 28px ${hex}`,
        }}
      >
        {text}
      </span>
    </div>
  );
}
