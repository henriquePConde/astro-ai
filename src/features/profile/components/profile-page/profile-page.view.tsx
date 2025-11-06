'use client';

import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import type { User } from '../../services/user.service';

export function ProfilePageView({
  me,
  usage,
  loading,
  error,
}: {
  me: User | null;
  usage: { used: number; limit: number } | null;
  loading?: boolean;
  error?: { message?: string } | null;
}) {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>
      {loading && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CircularProgress size={20} />
          <Typography>Loading…</Typography>
        </Box>
      )}
      {error && <Alert severity="error">{error.message || 'Failed to load profile'}</Alert>}
      {me && (
        <Box sx={{ mb: 3 }}>
          <Typography>Name: {me.name ?? '-'}</Typography>
          <Typography>Email: {me.email ?? '-'}</Typography>
        </Box>
      )}
      {usage && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Daily Usage
          </Typography>
          <Typography>
            You have generated {usage.used} of {usage.limit} charts today.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
