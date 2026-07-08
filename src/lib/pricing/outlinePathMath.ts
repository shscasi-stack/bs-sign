import type { Path } from 'opentype.js';

function distance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.hypot(x2 - x1, y2 - y1);
}

function cubicBezierLength(
  x0: number, y0: number,
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
  steps = 12
): number {
  let length = 0;
  let px = x0;
  let py = y0;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const mt = 1 - t;
    const x = mt * mt * mt * x0 + 3 * mt * mt * t * x1 + 3 * mt * t * t * x2 + t * t * t * x3;
    const y = mt * mt * mt * y0 + 3 * mt * mt * t * y1 + 3 * mt * t * t * y2 + t * t * t * y3;
    length += distance(px, py, x, y);
    px = x;
    py = y;
  }
  return length;
}

function quadraticBezierLength(
  x0: number, y0: number,
  x1: number, y1: number,
  x2: number, y2: number,
  steps = 10
): number {
  let length = 0;
  let px = x0;
  let py = y0;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const mt = 1 - t;
    const x = mt * mt * x0 + 2 * mt * t * x1 + t * t * x2;
    const y = mt * mt * y0 + 2 * mt * t * y1 + t * t * y2;
    length += distance(px, py, x, y);
    px = x;
    py = y;
  }
  return length;
}

/**
 * Total length of every contour in a glyph outline path — i.e. the same
 * "outline total path length" you'd get from Illustrator's Create Outlines,
 * flattened here by sampling bezier segments rather than solving them analytically.
 */
export function pathLength(path: Path): number {
  let length = 0;
  let cx = 0;
  let cy = 0;
  let sx = 0;
  let sy = 0;

  for (const cmd of path.commands) {
    switch (cmd.type) {
      case 'M':
        cx = cmd.x;
        cy = cmd.y;
        sx = cx;
        sy = cy;
        break;
      case 'L':
        length += distance(cx, cy, cmd.x, cmd.y);
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'C':
        length += cubicBezierLength(cx, cy, cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'Q':
        length += quadraticBezierLength(cx, cy, cmd.x1, cmd.y1, cmd.x, cmd.y);
        cx = cmd.x;
        cy = cmd.y;
        break;
      case 'Z':
        length += distance(cx, cy, sx, sy);
        cx = sx;
        cy = sy;
        break;
    }
  }

  return length;
}
