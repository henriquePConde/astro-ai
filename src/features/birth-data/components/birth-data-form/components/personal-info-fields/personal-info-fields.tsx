import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField, Stack, Box } from '@mui/material';
import { styles } from '../../birth-data-form.styles';
import type { Control, FieldErrors } from 'react-hook-form';
import type { BirthDataFormValues } from '../../birth-data-form.schema';
import type { BIRTH_DATA_FORM_CONFIG } from '../../birth-data-form.config';

interface PersonalInfoFieldsProps {
  control: Control<BirthDataFormValues>;
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
          />
        )}
      />
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Controller
          name={config.fields.year.name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type={config.fields.year.type}
              label={config.copy.fields.year.label}
              error={!!errors.year}
              helperText={errors.year?.message}
              fullWidth
              value={field.value ?? ''}
              onChange={(e) => {
                const val = e.target.value === '' ? undefined : Number(e.target.value);
                field.onChange(val);
              }}
            />
          )}
        />
        <Controller
          name={config.fields.month.name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type={config.fields.month.type}
              label={config.copy.fields.month.label}
              error={!!errors.month}
              helperText={errors.month?.message}
              fullWidth
              value={field.value ?? ''}
              onChange={(e) => {
                const val = e.target.value === '' ? undefined : Number(e.target.value);
                field.onChange(val);
              }}
            />
          )}
        />
        <Controller
          name={config.fields.day.name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type={config.fields.day.type}
              label={config.copy.fields.day.label}
              error={!!errors.day}
              helperText={errors.day?.message}
              fullWidth
              value={field.value ?? ''}
              onChange={(e) => {
                const val = e.target.value === '' ? undefined : Number(e.target.value);
                field.onChange(val);
              }}
            />
          )}
        />
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Controller
          name={config.fields.hour.name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type={config.fields.hour.type}
              label={config.copy.fields.hour.label}
              error={!!errors.hour}
              helperText={errors.hour?.message}
              fullWidth
              value={field.value ?? ''}
              onChange={(e) => {
                const val = e.target.value === '' ? undefined : Number(e.target.value);
                field.onChange(val);
              }}
            />
          )}
        />
        <Controller
          name={config.fields.minute.name}
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              type={config.fields.minute.type}
              label={config.copy.fields.minute.label}
              error={!!errors.minute}
              helperText={errors.minute?.message}
              fullWidth
              value={field.value ?? ''}
              onChange={(e) => {
                const val = e.target.value === '' ? undefined : Number(e.target.value);
                field.onChange(val);
              }}
            />
          )}
        />
      </Stack>
    </Box>
  );
}
