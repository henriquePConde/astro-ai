'use client';

import { Controller } from 'react-hook-form';
import { TextField, Button, Stack, Alert, Typography, Box } from '@mui/material';
import type { OtpAuthFormViewProps } from './otp-auth-form.types';
import { styles } from './otp-auth-form.styles';

export function OtpAuthFormView({
  onSubmit,
  isLoading,
  isAuthenticated,
  email,
  onSignOut,
  message,
  control,
  handleSubmit,
  errors,
  config,
  headerConfig,
}: OtpAuthFormViewProps) {
  if (isAuthenticated) {
    return (
      <Box sx={styles.root()}>
        <Typography
          variant={config.ui.signedInTitle.variant}
          component={config.ui.signedInTitle.component}
          gutterBottom={config.ui.signedInTitle.gutterBottom}
        >
          {config.copy.title.signedIn}
        </Typography>
        <Typography
          variant={config.ui.signedInMessage.variant}
          paragraph={config.ui.signedInMessage.paragraph}
        >
          {config.copy.messages.signedInPrefix} {email}
        </Typography>
        <Button variant={config.ui.button.signOut.variant} onClick={onSignOut}>
          {headerConfig.copy.button.signOut}
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={styles.root()}>
      <Typography variant={config.ui.title.variant} component={config.ui.title.component}>
        {config.copy.title.signIn}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} sx={styles.form()}>
          <Controller
            name={config.fields.email.name}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={config.copy.fields.email.label}
                type={config.fields.email.type}
                error={!!errors.email}
                helperText={errors.email?.message}
                required
                fullWidth
              />
            )}
          />
          <Button
            type={config.ui.button.submit.type}
            variant={config.ui.button.submit.variant}
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? config.copy.button.loading : config.copy.button.default}
          </Button>
          {message && (
            <Alert severity={config.ui.alert.severity} sx={styles.message()}>
              {message}
            </Alert>
          )}
        </Stack>
      </form>
    </Box>
  );
}
