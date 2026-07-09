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

  it('draws the board at the entered mm dimensions with the text on it', () => {
    const html = render();

    expect(html).toContain('viewBox="0 0 600 300"'); // board aspect ratio = real mm
    expect(html).toContain('>OPEN</text>');
  });

  it('renders 단선 as a filled solid glyph (one continuous tube, not an outline)', () => {
    const html = render({ lineType: 'single' });

    expect(html).toContain('fill="#e53935"'); // filled with the silicone color
    expect(html).toContain('stroke="none"'); // no outline → not a double-line look
    expect(html).toContain('font-weight="normal"');
  });

  it('renders 복선 as a bold stroke-only outline (two parallel tubes)', () => {
    const html = render({ lineType: 'double', tubeThickness: '12T' });

    expect(html).toContain('fill="none"'); // outline only
    expect(html).toContain('stroke="#e53935"');
    expect(html).toContain('stroke-width="12"'); // tube thickness in real mm
    expect(html).toContain('font-weight="bold"');
  });

  it('maps tube thickness to the outline stroke width for 복선', () => {
    expect(render({ lineType: 'double', tubeThickness: '6T' })).toContain('stroke-width="6"');
    expect(render({ lineType: 'double', tubeThickness: '12T' })).toContain('stroke-width="12"');
  });
});
