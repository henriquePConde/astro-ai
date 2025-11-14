export const MARKDOWN_RENDERER_CONFIG = {
  colorMode: {
    default: 'light' as const,
    dark: 'dark' as const,
    light: 'light' as const,
  },
  styles: {
    dark: {
      textColor: 'rgba(13, 12, 34, 0.8)',
    },
  },
  classes: {
    container: {
      base: 'markdown prose max-w-none',
      invert: 'prose-invert',
    },
    text: {
      light: {
        primary: 'text-white/90',
        soft: 'text-white/80',
      },
    },
    blockquote: {
      base: 'border-l-4 border-[rgba(138,43,226,0.3)] pl-4 my-4 italic',
      light: 'text-white/70',
    },
  },
} as const;
