import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { ACCESSORY_OPTIONS } from '@/lib/pricing/pricing.constants';
import type { NeonPriceBreakdown } from '@/lib/pricing/pricing.types';

function formatKrw(value: number): string {
  return `${Math.round(value).toLocaleString('ko-KR')}원`;
}

function accessoryLabel(code: string): string {
  return ACCESSORY_OPTIONS.find((option) => option.code === code)?.labelKo ?? code;
}

interface PriceBreakdownTableProps {
  breakdown: NeonPriceBreakdown;
}

export function PriceBreakdownTable({ breakdown }: PriceBreakdownTableProps) {
  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell className="text-muted-foreground">LED 베이스판 ({breakdown.basePanelCount}장)</TableCell>
          <TableCell className="text-right">{formatKrw(breakdown.baseBoardCost)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-muted-foreground">텍스트 사이즈 비용</TableCell>
          <TableCell className="text-right">{formatKrw(breakdown.textSizeCost)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-muted-foreground">
            실리콘 튜브 ({breakdown.tubeLengthM.toFixed(2)}m)
          </TableCell>
          <TableCell className="text-right">{formatKrw(breakdown.tubeCost)}</TableCell>
        </TableRow>
        {breakdown.waterproofCost > 0 && (
          <TableRow>
            <TableCell className="text-muted-foreground">방수 처리</TableCell>
            <TableCell className="text-right">{formatKrw(breakdown.waterproofCost)}</TableCell>
          </TableRow>
        )}
        {breakdown.accessoryLines.map((line) => (
          <TableRow key={line.code}>
            <TableCell className="text-muted-foreground">
              {accessoryLabel(line.code)} × {line.quantity}
            </TableCell>
            <TableCell className="text-right">{formatKrw(line.cost)}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell className="font-medium">합계</TableCell>
          <TableCell className="text-right font-medium">{formatKrw(breakdown.total)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
