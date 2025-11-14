'use client';

import { Typography, Box } from '@mui/material';
import type { AuthCallbackViewProps } from './auth-callback.types';
import { styles } from './auth-callback.styles';

export function AuthCallbackView({ error, isLoading, config }: AuthCallbackViewProps) {
  return (
    <Box sx={styles.container()}>
      <Typography variant="h1" sx={styles.title()}>
        {error ? config.copy.title.error : config.copy.title.loading}
      </Typography>
      {error ? (
        <>
          <Typography variant="body1" sx={styles.error()}>
            {error}
          </Typography>
          <Typography variant="body2" sx={styles.message()}>
            {config.copy.message.redirecting}
          </Typography>
        </>
      ) : (
        <Typography variant="body1" sx={styles.message()}>
          {config.copy.message.loading}
        </Typography>
      )}
    </Box>
  );
}
