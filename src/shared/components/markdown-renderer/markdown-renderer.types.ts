import type { MARKDOWN_RENDERER_CONFIG } from './markdown-renderer.config';

export type ColorMode = 'dark' | 'light';

export interface MarkdownRendererContainerProps {
  content: string;
  colorMode?: ColorMode;
}

export interface MarkdownRendererViewProps {
  content: string;
  colorMode: ColorMode;
  config: typeof MARKDOWN_RENDERER_CONFIG;
}
