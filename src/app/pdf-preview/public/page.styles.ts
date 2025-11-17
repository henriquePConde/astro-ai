import type { Theme } from '@mui/material';

export const styles = {
  centerPage: () => (theme: Theme) => ({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    py: 8,
  }),

  textCenter: () => (_theme: Theme) => ({
    textAlign: 'center',
  }),

  title: () => (theme: Theme) => ({
    marginBottom: theme.spacing(1),
    fontWeight: 600,
  }),

  subtitle: () => (theme: Theme) => ({
    color: theme.palette.text.secondary,
  }),

  previewContainer: () => (_theme: Theme) => ({
    m: 0,
    p: 0,
    minHeight: '100vh',
    bgcolor: 'common.white',

    '& *': {
      boxShadow: 'none !important',
    },

    '@media print': {
      /* Root should not force extra pages */
      minHeight: 'auto !important',
      margin: '0 !important',
      padding: '0 !important',

      /* 1) Normalize all breaks: no forced breaks anywhere by default */
      /* 2) Anti-clipping + anti-layerization */
      '&, & *': {
        breakBefore: 'auto !important',
        breakAfter: 'auto !important',
        breakInside: 'auto !important',
        pageBreakBefore: 'auto !important',
        pageBreakAfter: 'auto !important',
        pageBreakInside: 'auto !important',
        overflow: 'visible !important',
        height: 'auto !important',
        maxHeight: 'none !important',
        filter: 'none !important',
        backdropFilter: 'none !important',
        contain: 'none !important',
        // 🚫 DO NOT reset transform here – it breaks D3 / layout-based transforms
        // transform: 'none !important',
      },

      /* 3) Neutralize flex/grid so long text can split */
      '&, & .MuiGrid-root, & [class*="MuiGrid"], & [class*="Grid"], & .MuiBox-root, & [class*="MuiBox"], & [class*="flex"], & [class*="grid"]':
        {
          display: 'block !important',
        },

      /* 4) Flowing content can split; avoid clipping */
      '& section, & article, & main, & .section, & .report-section, & .content, & .prose, & .MuiCard-root, & .MuiPaper-root, & .MuiCardContent-root, & div, & p, & ul, & ol':
        {
          display: 'block !important',
        },

      /* 5) Keep headings with following content (but don’t force a new page after them) */
      '& h1, & h2, & h3': {
        breakAfter: 'avoid-page !important',
        breakInside: 'avoid !important',
      },

      /* 6) Atomic blocks should not split mid-element */
      '& table, & img, & svg, & figure, & pre, & code, & blockquote': {
        breakInside: 'avoid !important',
        pageBreakInside: 'avoid !important',
      },

      /* 7) Only .page-break should create a page break */
      '& .page-break, & .pagebreak': {
        breakAfter: 'page !important',
        pageBreakAfter: 'always !important',
      },

      /* 8) Kill phantom breaks at the very end and empty break divs anywhere */
      '& > .page-break:last-child, & > .pagebreak:last-child': {
        breakAfter: 'auto !important',
        pageBreakAfter: 'auto !important',
        display: 'none !important',
      },
      '& .page-break:empty, & .pagebreak:empty': {
        display: 'none !important',
      },
      /* If someone injected a style attribute forcing a break, neutralize it */
      '& *[style*="page-break-after"]:last-child, & *[style*="break-after"]:last-child': {
        breakAfter: 'auto !important',
        pageBreakAfter: 'auto !important',
      },

      /* 9) Collapse trailing spacing so it can’t push a blank page */
      '& > :last-child, & > :last-child *:last-child': {
        marginBottom: '0 !important',
        paddingBottom: '0 !important',
      },

      /* Chart circle (from previous fix) */
      '& .chart-section img[alt="Astro Chart"], & .astro-chart, & .astro-wheel, & .chart-wheel': {
        borderRadius: '50% !important',
        clipPath: 'circle(50% at 50% 50%)',
        overflow: 'hidden !important',
        aspectRatio: '1 / 1',
      },

      /* Preserve colors */
      '& svg, & img': {
        printColorAdjust: 'exact',
        WebkitPrintColorAdjust: 'exact',
      },
    },
  }),
};
