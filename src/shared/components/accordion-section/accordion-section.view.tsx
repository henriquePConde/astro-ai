'use client';

import { Box, useTheme } from '@mui/material';
import type { ReactNode } from 'react';
import { accordionSectionStyles } from './accordion-section.styles';

export interface AccordionSectionProps {
  isOpen: boolean;
  children: ReactNode;
}

/**
 * Generic accordion section wrapper that animates open/close by
 * adjusting max-height. Used anywhere we need a simple show/hide
 * section with smooth height transition.
 */
export function AccordionSection({ isOpen, children }: AccordionSectionProps) {
  const theme = useTheme();

  return (
    <Box sx={accordionSectionStyles.root(isOpen)(theme)} aria-hidden={!isOpen}>
      {/* inner box gets full width; padding-bottom should be applied by caller */}
      <Box sx={{ width: '100%' }}>{children}</Box>
    </Box>
  );
}
