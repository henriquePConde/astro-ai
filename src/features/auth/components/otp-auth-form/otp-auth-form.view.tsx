'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Stack, Alert, Typography, Box } from '@mui/material';
import { z } from 'zod';
import type { OtpAuthFormViewProps } from './otp-auth-form.types';
import { styles } from './otp-auth-form.styles';

const OtpAuthFormSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

type OtpAuthFormValues = z.infer<typeof OtpAuthFormSchema>;

export function OtpAuthFormView({
  onSubmit,
  isLoading,
  isAuthenticated,
  email,
  onSignOut,
  message,
}: OtpAuthFormViewProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpAuthFormValues>({
    resolver: zodResolver(OtpAuthFormSchema),
    defaultValues: {
      email: '',
    },
  });

  if (isAuthenticated) {
    return (
      <Box sx={styles.root()}>
        <Typography variant="h1" component="h1" gutterBottom>
          Signed in
        </Typography>
        <Typography variant="body1" paragraph>
          Signed in as {email}
        </Typography>
        <Button variant="outlined" onClick={onSignOut}>
          Sign out
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={styles.root()}>
      <Typography variant="h1" component="h1">
        Sign in
      </Typography>
      <form onSubmit={handleSubmit((values) => onSubmit(values.email))}>
        <Stack spacing={2} sx={styles.form()}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                required
                fullWidth
              />
            )}
          />
          <Button type="submit" variant="contained" disabled={isLoading} fullWidth>
            {isLoading ? 'Sending...' : 'Send magic link'}
          </Button>
          {message && (
            <Alert severity="info" sx={styles.message()}>
              {message}
            </Alert>
          )}
        </Stack>
      </form>
    </Box>
  );
}
