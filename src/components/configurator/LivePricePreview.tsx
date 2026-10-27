import Link from 'next/link';
import { PriceBreakdownTable } from './PriceBreakdownTable';
import type { NeonPriceBreakdown } from '@/lib/pricing/pricing.types';
import { PALETTE } from '@/lib/kTheme';
import { cn } from '@/lib/utils';

interface LivePricePreviewProps {
  breakdown: NeonPriceBreakdown | null;
  isStale: boolean;
  isOutdoor: boolean;
}

export function LivePricePreview({ breakdown, isStale, isOutdoor }: LivePricePreviewProps) {
  return (
    <div
      className={cn('sticky top-20 space-y-4 rounded-[32px] p-6 transition-opacity', isStale && 'opacity-70')}
      style={{ background: PALETTE.heroBg }}
    >
      <div>
        <h2 className="text-xl font-extrabold tracking-tight">내 네온 예상 가격</h2>
        <p className="mt-1 text-sm" style={{ color: PALETTE.inkSub }}>
          한글 6cm, 영문 4cm 이상 작업 가능
          <br />
          20각 이하는 복선 작업 불가
        </p>
      </div>
      {breakdown ? (
        <>
          <div className="text-5xl font-extrabold tracking-tight">
            {breakdown.total.toLocaleString('ko-KR')}
            <span className="text-2xl">원</span>
          </div>
          {breakdown.tubeLengthM === 0 && (
            <p className="rounded-2xl bg-white px-4 py-3 text-sm leading-relaxed font-medium">
              👉 <strong>글씨 가로·세로</strong>를 넣어 주세요. 실리콘 튜브
              {isOutdoor ? '와 실외 방수 처리' : ''} 비용은 글씨 크기로 계산돼요.
            </p>
          )}
          <div className="rounded-[22px] bg-white px-4 py-2">
            <PriceBreakdownTable breakdown={breakdown} isOutdoor={isOutdoor} />
          </div>
          {breakdown.warnings.map((warning) => (
            <p
              key={warning}
              className="rounded-2xl px-4 py-2 text-sm font-medium"
              style={{ background: PALETTE.badge }}
            >
              {warning}
            </p>
          ))}
          <p className="text-xs" style={{ color: PALETTE.inkSub }}>
            이 견적은 참고용입니다. 정확한 금액은 시안을 확정해야 알 수 있습니다.
          </p>
          <Link
            href="/quote"
            className="flex items-center justify-center rounded-full bg-[#2B2840] px-6 py-3.5 text-base font-bold text-white"
          >
            도면·시안 보내고 견적받기
          </Link>
        </>
      ) : (
        <div className="text-sm" style={{ color: PALETTE.inkSub }}>
          가격 계산 중...
        </div>
      )}
    </div>
  );
}
