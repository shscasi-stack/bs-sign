import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PriceBreakdownTable } from './PriceBreakdownTable';
import type { NeonPriceBreakdown } from '@/lib/pricing/pricing.types';
import { cn } from '@/lib/utils';

interface LivePricePreviewProps {
  breakdown: NeonPriceBreakdown | null;
  isStale: boolean;
}

export function LivePricePreview({ breakdown, isStale }: LivePricePreviewProps) {
  return (
    <Card className={cn('sticky top-4 transition-opacity', isStale && 'opacity-70')}>
      <CardHeader>
        <CardTitle>실시간 견적</CardTitle>
        <CardDescription>한글 6cm, 영문 4cm 이상 작업 가능</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {breakdown ? (
          <>
            <div className="text-3xl font-semibold">{breakdown.total.toLocaleString('ko-KR')}원</div>
            <PriceBreakdownTable breakdown={breakdown} />
            {breakdown.warnings.map((warning) => (
              <Badge key={warning} variant="secondary" className="block w-fit text-xs font-normal whitespace-normal">
                {warning}
              </Badge>
            ))}
            <p className="text-xs text-muted-foreground">
              이 견적은 참고용입니다. 정확한 금액은 시안을 확정해야 알 수 있습니다.
            </p>
          </>
        ) : (
          <div className="text-sm text-muted-foreground">가격 계산 중...</div>
        )}
      </CardContent>
    </Card>
  );
}
