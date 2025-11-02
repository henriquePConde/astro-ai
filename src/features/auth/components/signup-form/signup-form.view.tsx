'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Stack, Alert, Typography, Link, Box } from '@mui/material';
import { SignupFormSchema, type SignupFormValues } from './signup-form.schema';
import type { SignupFormViewProps } from './signup-form.types';
import { styles } from './signup-form.styles';

export function SignupFormView({
  onSubmit,
  isLoading,
  error,
  successMessage,
}: SignupFormViewProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <Box sx={styles.container()}>
      <Box sx={styles.root()}>
        <Box sx={styles.header()}>
          <Typography variant="h1" component="h1" sx={styles.title()}>
            Join the Cosmos
          </Typography>
          <Typography sx={styles.subtitle()}>Begin your astrological journey</Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  sx={styles.textField()}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  required
                  fullWidth
                  sx={styles.textField()}
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Confirm password"
                  type="password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  required
                  fullWidth
                  sx={styles.textField()}
                />
              )}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              fullWidth
              sx={styles.button()}
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
            {error && (
              <Alert severity="error" sx={styles.error()}>
                {error}
              </Alert>
            )}
            {successMessage && (
              <Alert severity="success" sx={styles.success()}>
                {successMessage}
              </Alert>
            )}
          </Stack>
        </form>
        <Box sx={styles.linkContainer()}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link href="/login" sx={styles.link()}>
              Log in
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
