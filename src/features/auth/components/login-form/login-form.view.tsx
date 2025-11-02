'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Stack, Alert, Typography, Link, Box } from '@mui/material';
import { LoginFormSchema, type LoginFormValues } from './login-form.schema';
import type { LoginFormViewProps } from './login-form.types';
import { styles } from './login-form.styles';

export function LoginFormView({ onSubmit, isLoading, error }: LoginFormViewProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Box sx={styles.root()}>
      <Typography variant="h1" component="h1">
        Log in
      </Typography>
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
              />
            )}
          />
          <Button type="submit" variant="contained" disabled={isLoading} fullWidth>
            {isLoading ? 'Logging in...' : 'Log in'}
          </Button>
          {error && (
            <Alert severity="error" sx={styles.error()}>
              {error}
            </Alert>
          )}
        </Stack>
      </form>
      <Box sx={styles.linkContainer()}>
        <Typography variant="body2">
          Don&apos;t have an account? <Link href="/signup">Sign up</Link>
        </Typography>
      </Box>
    </Box>
  );
}
