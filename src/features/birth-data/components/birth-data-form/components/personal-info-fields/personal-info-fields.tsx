import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField, Box } from '@mui/material';
import { styles } from '../../birth-data-form.styles';
import type { Control, FieldErrors } from 'react-hook-form';
import type { BirthDataFormValues } from '../../birth-data-form.schema';
import type { BIRTH_DATA_FORM_CONFIG } from '../../birth-data-form.config';

interface PersonalInfoFieldsProps {
  control: Control<BirthDataFormValues, any, BirthDataFormValues>;
  errors: FieldErrors<BirthDataFormValues>;
  config: typeof BIRTH_DATA_FORM_CONFIG;
}

export function PersonalInfoFields({ control, errors, config }: PersonalInfoFieldsProps) {
  return (
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
          />
        )}
      />
    </Box>
  );
}
