// astro-ai-fullstack/src/features/home/components/chart-experience/components/data-section/components/report-accordion/report-accordion.styles.ts

import { Theme } from '@mui/material';

export const styles = {
  generatingBox: () => (theme: Theme) => ({
    mt: 2,
    minHeight: 160,
    borderRadius: 2,
    border: '1px solid rgba(255,255,255,0.12)',
    bgcolor: 'rgba(10,10,25,0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  }),

  noBirthDataBox: () => (theme: Theme) => ({
    mt: 2,
    minHeight: 160,
    borderRadius: 2,
    border: '1px solid rgba(255,255,255,0.08)',
    bgcolor: 'rgba(10,10,25,0.9)',
    p: 2,
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  }),

  container: () => (theme: Theme) => ({
    mt: 2,
    mb: 2,
    borderRadius: 2,
    border: '1px solid rgba(255,255,255,0.12)',
    bgcolor: 'rgba(10,10,25,0.9)',
    p: 2,
  }),

  sectionItem: () => (theme: Theme) => ({
    mb: 1.5,
    pb: 1.5,
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    '&:last-of-type': {
      borderBottom: 'none',
      pb: 0,
      mb: 0,
    },
  }),

  sectionButton: () => (theme: Theme) => ({
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    border: 'none',
    background: 'transparent',
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontWeight: 600,
    cursor: 'pointer',
    py: 0.75,
  }),

  sectionContent: () => (theme: Theme) => ({
    fontSize: 18,
    lineHeight: 1.5,
    color: 'rgba(255,255,255,0.78)',
    paddingBottom: theme.spacing(2), // <- gives breathing room so last line isn't chopped
  }),

  // Simpler accordion: no measuring, just animate max-height between 0 and something huge
  accordionSection: (isOpen: boolean) => (theme: Theme) => ({
    maxHeight: isOpen ? '9999px' : '0px',
    overflow: 'hidden',
    transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
  }),

  icon: (isOpen: boolean) => ({
    display: 'inline-block',
    transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
  }),
};
