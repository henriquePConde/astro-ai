'use client';

import { Box } from '@mui/material';
import { BirthDataFormContainer } from '@/features/birth-data';

export function FormWrapperView({ onFormSubmit }: { onFormSubmit: (data: any) => Promise<void> }) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <BirthDataFormContainer onSubmit={onFormSubmit} />
    </Box>
  );
}

