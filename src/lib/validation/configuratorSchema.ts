import { z } from 'zod';
import { MAX_HEIGHT_MM, MAX_WIDTH_MM, SILICONE_COLORS } from '@/lib/pricing/pricing.constants';

const siliconeColorCodes = SILICONE_COLORS.map((c) => c.code) as [string, ...string[]];

export const configuratorSchema = z.object({
  widthMm: z.number().int().min(1).max(MAX_WIDTH_MM),
  heightMm: z.number().int().min(1).max(MAX_HEIGHT_MM),
  tubeThickness: z.enum(['6T', '12T']),
  baseBoardThickness: z.enum(['6T', '8T']),
  siliconeColorCode: z.enum(siliconeColorCodes),
  lineType: z.enum(['single', 'double']),
  isOutdoor: z.boolean(),
  displayText: z.string().trim().min(1, '텍스트를 입력해 주세요').max(40, '최대 40자까지 입력 가능합니다'),
  fontFamily: z.string().min(1),
  textWidthMm: z.number().min(1),
  textHeightMm: z.number().min(1),
  accessoryQuantities: z.record(z.string(), z.number().int().min(0)),
});

export type ConfiguratorFormValues = z.infer<typeof configuratorSchema>;
