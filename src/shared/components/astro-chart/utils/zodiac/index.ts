// src/shared/components/astro-chart/utils/zodiac/index.ts
import * as d3 from 'd3';
import type { ZodiacGroup } from './helpers';
import { renderFallbackZodiacIcon } from './fallbackIcons';
import { renderAriesIcon } from './aries';
import { renderTaurusIcon } from './taurus';
import { renderGeminiIcon } from './gemini';
import { renderCancerIcon } from './cancer';
import { renderLeoIcon } from './leo';
import { renderVirgoIcon } from './virgo';
import { renderLibraIcon } from './libra';
import { renderScorpioIcon } from './scorpio';
import { renderSagittariusIcon } from './sagittarius';
import { renderCapricornIcon } from './capricorn';
import { renderAquariusIcon } from './aquarius';
import { renderPiscesIcon } from './pisces';

// Configure per-sign "extra scale" if you want some signs larger
const EXTRA_SCALE: Partial<Record<number, number>> = {
  0: 1.25, // Aries
  1: 1.25, // Taurus (match Aries)
  // others default to 1
};

type SignRenderer = (root: ZodiacGroup, color: string) => void;

const SIGN_RENDERERS: Partial<Record<number, SignRenderer>> = {
  0: (root) => renderAriesIcon(root),
  1: (root) => renderTaurusIcon(root),
  2: (root) => renderGeminiIcon(root),
  3: (root) => renderCancerIcon(root),
  4: (root) => renderLeoIcon(root),
  5: (root) => renderVirgoIcon(root),
  6: (root) => renderLibraIcon(root),
  7: (root) => renderScorpioIcon(root),
  8: (root) => renderSagittariusIcon(root),
  9: (root) => renderCapricornIcon(root),
  10: (root) => renderAquariusIcon(root),
  11: (root) => renderPiscesIcon(root),
  // Add more: 2: renderGeminiIcon, etc.
};

/**
 * Draws a zodiac icon into the given group.
 * The group is assumed to already be translated to the desired (x, y).
 */
export function renderZodiacIcon(
  group: ZodiacGroup,
  signIndex: number,
  sizePx: number,
  color: string,
) {
  const baseScale = sizePx / 24;
  const extraScale = 1.25;
  const scale = baseScale * extraScale;

  const root = group.append('g').attr('class', 'zodiac-icon').attr('transform', `scale(${scale})`);

  const strokeWidth = 1.4;
  const commonAttrs = {
    fill: 'none',
    stroke: color,
    'stroke-width': strokeWidth,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  } as const;

  const applyAttrs = (sel: d3.Selection<SVGPathElement, unknown, null, undefined>) => {
    Object.entries(commonAttrs).forEach(([k, v]) => sel.attr(k, v as any));
    return sel;
  };

  const renderer = SIGN_RENDERERS[signIndex];

  if (renderer) {
    // Custom coin renderer (Aries, Taurus, etc.)
    renderer(root, color);
  } else {
    // Fallback procedural glyphs
    renderFallbackZodiacIcon(root, signIndex, strokeWidth, color, applyAttrs);
  }

  // Invisible hit area for pointer events
  const hitRadius = 12 * extraScale;
  root
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', hitRadius)
    .attr('fill', 'transparent');
}
