import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField, Box, Tooltip } from '@mui/material';
import { styles } from '../../birth-data-form.styles';
import type { Control, FieldErrors } from 'react-hook-form';
import type { BirthDataFormValues } from '../../birth-data-form.schema';
import type { BIRTH_DATA_FORM_CONFIG } from '../../birth-data-form.config';

interface PersonalInfoFieldsProps {
  control: Control<BirthDataFormValues, any, BirthDataFormValues>;
  errors: FieldErrors<BirthDataFormValues>;
  config: typeof BIRTH_DATA_FORM_CONFIG;
  disabled?: boolean;
  tooltipMessage?: string;
}

export function PersonalInfoFields({
  control,
  errors,
  config,
  disabled = false,
  tooltipMessage,
}: PersonalInfoFieldsProps) {
  const field = (
    <Box sx={styles.group()}>
      <Controller
        name={config.fields.name.name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={config.copy.fields.name.label}
            error={!!errors.name}
            helperText={errors.name?.message}
            autoComplete="new-password"
            required
            disabled={disabled}
          />
        )}
      />
    </Box>
  );

  if (disabled && tooltipMessage) {
    return (
      <Tooltip
        title={tooltipMessage}
        slotProps={{
          tooltip: {
            sx: {
              fontSize: '0.95rem',
            },
          },
        }}
      >
        <span>{field}</span>
      </Tooltip>
    );
  }

  return field;
}
