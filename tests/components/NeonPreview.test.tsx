import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { NeonPreview } from '@/components/configurator/NeonPreview';
import type { LineTypeCode, TubeThicknessCode } from '@/lib/pricing/pricing.types';

function render(overrides: Partial<Parameters<typeof NeonPreview>[0]> = {}) {
  return renderToStaticMarkup(
    <NeonPreview
      displayText="OPEN"
      fontFamily="Arial"
      siliconeColorCode="red"
      boardWidthMm={600}
      boardHeightMm={300}
      textWidthMm={400}
      textHeightMm={150}
      tubeThickness={'6T' as TubeThicknessCode}
      lineType={'single' as LineTypeCode}
      {...overrides}
    />
  );
}

describe('NeonPreview', () => {
  it('shows a hint instead of a board when board dimensions are not entered', () => {
    const html = render({ boardWidthMm: 0, boardHeightMm: 0 });

    expect(html).toContain('베이스판 가로/세로를 입력하면 미리보기가 표시됩니다');
    expect(html).not.toContain('<svg');
  });

  it('draws the board at the entered mm dimensions and sizes the text to the entered text mm', () => {
    const html = render();

    expect(html).toContain('viewBox="0 0 600 300"'); // board aspect ratio = real mm
    expect(html).toContain('font-size="150"'); // text height in mm
    expect(html).toContain('textLength="400"'); // text width in mm
    expect(html).toContain('stroke="#e53935"'); // selected silicone color (red)
    expect(html).toContain('>OPEN</text>');
  });

  it('falls back to a proportional font size when text dimensions are not entered', () => {
    const html = render({ textWidthMm: 0, textHeightMm: 0 });

    expect(html).toContain('font-size="75"'); // 25% of board height
    expect(html).not.toContain('textLength');
  });

  it('maps tube thickness to the stroke width in real mm', () => {
    expect(render({ tubeThickness: '6T' })).toContain('stroke-width="6"');
    expect(render({ tubeThickness: '12T' })).toContain('stroke-width="12"');
  });

  it('renders both line types as thin stroke-only tube, distinguished by glyph weight', () => {
    const single = render({ lineType: 'single' });
    expect(single).toContain('fill="none"'); // not a solid filled block
    expect(single).toContain('stroke="#e53935"');
    expect(single).toContain('font-weight="normal"'); // thin glyph → one line

    const double = render({ lineType: 'double' });
    expect(double).toContain('fill="none"');
    expect(double).toContain('stroke="#e53935"');
    expect(double).toContain('font-weight="bold"'); // fat glyph → two parallel lines
  });
});
