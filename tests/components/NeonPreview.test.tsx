import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { NeonPreview } from '@/components/configurator/NeonPreview';

describe('NeonPreview', () => {
  it('shows a hint instead of a board when board dimensions are not entered', () => {
    const html = renderToStaticMarkup(
      <NeonPreview
        displayText="OPEN"
        fontFamily="Arial"
        siliconeColorCode="red"
        boardWidthMm={0}
        boardHeightMm={0}
        textWidthMm={0}
        textHeightMm={0}
      />
    );

    expect(html).toContain('베이스판 가로/세로를 입력하면 미리보기가 표시됩니다');
    expect(html).not.toContain('<svg');
  });

  it('draws the board at the entered mm dimensions and sizes the text to the entered text mm', () => {
    const html = renderToStaticMarkup(
      <NeonPreview
        displayText="OPEN"
        fontFamily="Arial"
        siliconeColorCode="red"
        boardWidthMm={600}
        boardHeightMm={300}
        textWidthMm={400}
        textHeightMm={150}
      />
    );

    expect(html).toContain('viewBox="0 0 600 300"'); // board aspect ratio = real mm
    expect(html).toContain('font-size="150"'); // text height in mm
    expect(html).toContain('textLength="400"'); // text width in mm
    expect(html).toContain('fill="#e53935"'); // selected silicone color (red)
    expect(html).toContain('>OPEN</text>');
  });

  it('falls back to a proportional font size when text dimensions are not entered', () => {
    const html = renderToStaticMarkup(
      <NeonPreview
        displayText="OPEN"
        fontFamily="Arial"
        siliconeColorCode="red"
        boardWidthMm={600}
        boardHeightMm={300}
        textWidthMm={0}
        textHeightMm={0}
      />
    );

    expect(html).toContain('font-size="75"'); // 25% of board height
    expect(html).not.toContain('textLength');
  });
});
