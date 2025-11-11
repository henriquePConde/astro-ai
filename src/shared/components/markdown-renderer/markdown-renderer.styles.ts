import type { ColorMode } from './markdown-renderer.types';
import type { MARKDOWN_RENDERER_CONFIG } from './markdown-renderer.config';

export const getTextClasses = (colorMode: ColorMode, config: typeof MARKDOWN_RENDERER_CONFIG) => {
  return colorMode === 'dark' ? '' : config.classes.text.light.primary;
};

export const getTextSoftClasses = (
  colorMode: ColorMode,
  config: typeof MARKDOWN_RENDERER_CONFIG,
) => {
  return colorMode === 'dark' ? '' : config.classes.text.light.soft;
};

export const getTextColorStyle = (
  colorMode: ColorMode,
  config: typeof MARKDOWN_RENDERER_CONFIG,
) => {
  return colorMode === 'dark' ? { color: config.styles.dark.textColor } : {};
};

export const getBlockquoteClasses = (
  colorMode: ColorMode,
  config: typeof MARKDOWN_RENDERER_CONFIG,
) => {
  const base = config.classes.blockquote.base;
  const light = colorMode === 'dark' ? '' : config.classes.blockquote.light;
  return `${base} ${light}`.trim();
};

export const getBlockquoteColorStyle = (
  colorMode: ColorMode,
  config: typeof MARKDOWN_RENDERER_CONFIG,
) => {
  return colorMode === 'dark' ? { color: config.styles.dark.textColor } : {};
};

export const getContainerClasses = (
  colorMode: ColorMode,
  config: typeof MARKDOWN_RENDERER_CONFIG,
) => {
  const base = config.classes.container.base;
  const invert = colorMode === 'dark' ? config.classes.container.invert : '';
  return `${base} ${invert}`.trim();
};

export const styles = {
  h1: (colorMode: ColorMode, config: typeof MARKDOWN_RENDERER_CONFIG) => ({
    className: `text-2xl font-bold mb-4 ${getTextClasses(colorMode, config)}`,
    style: getTextColorStyle(colorMode, config),
  }),
  h2: (colorMode: ColorMode, config: typeof MARKDOWN_RENDERER_CONFIG) => ({
    className: `text-xl font-bold mb-3 ${getTextClasses(colorMode, config)}`,
    style: getTextColorStyle(colorMode, config),
  }),
  h3: (colorMode: ColorMode, config: typeof MARKDOWN_RENDERER_CONFIG) => ({
    className: `text-lg font-bold mb-2 ${getTextClasses(colorMode, config)}`,
    style: getTextColorStyle(colorMode, config),
  }),
  p: (colorMode: ColorMode, config: typeof MARKDOWN_RENDERER_CONFIG) => ({
    className: `mb-4 leading-relaxed ${getTextSoftClasses(colorMode, config)}`,
    style: getTextColorStyle(colorMode, config),
  }),
  ul: (colorMode: ColorMode, config: typeof MARKDOWN_RENDERER_CONFIG) => ({
    className: `list-disc pl-6 mb-4 space-y-2 ${getTextSoftClasses(colorMode, config)}`,
    style: getTextColorStyle(colorMode, config),
  }),
  ol: (colorMode: ColorMode, config: typeof MARKDOWN_RENDERER_CONFIG) => ({
    className: `list-decimal pl-6 mb-4 space-y-2 ${getTextSoftClasses(colorMode, config)}`,
    style: getTextColorStyle(colorMode, config),
  }),
  li: (colorMode: ColorMode, config: typeof MARKDOWN_RENDERER_CONFIG) => ({
    className: getTextSoftClasses(colorMode, config),
    style: getTextColorStyle(colorMode, config),
  }),
  strong: (colorMode: ColorMode, config: typeof MARKDOWN_RENDERER_CONFIG) => ({
    className: `font-bold ${getTextClasses(colorMode, config)}`,
    style: getTextColorStyle(colorMode, config),
  }),
  em: (colorMode: ColorMode, config: typeof MARKDOWN_RENDERER_CONFIG) => ({
    className: `italic ${getTextClasses(colorMode, config)}`,
    style: getTextColorStyle(colorMode, config),
  }),
  blockquote: (colorMode: ColorMode, config: typeof MARKDOWN_RENDERER_CONFIG) => ({
    className: getBlockquoteClasses(colorMode, config),
    style: getBlockquoteColorStyle(colorMode, config),
  }),
};
