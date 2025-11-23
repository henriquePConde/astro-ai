import type { Theme } from '@mui/material';

export const accordionSectionStyles = {
  root: (isOpen: boolean) => (theme: Theme) => ({
    maxHeight: isOpen ? '9999px' : '0px',
    overflow: 'hidden',
    transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
  }),
};
