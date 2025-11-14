'use client';

import React, { useMemo } from 'react';
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormSetValue,
  type UseFormWatch,
} from 'react-hook-form';
import { Autocomplete, Box, Stack, TextField } from '@mui/material';
import type { BirthDataFormValues } from '../../birth-data-form.schema';
import { BIRTH_DATA_FORM_CONFIG } from '../../birth-data-form.config';
import { styles } from '../../birth-data-form.styles';
import { getDaysInMonth } from './date-utils';

const MONTHS = [
  { label: 'January', value: 1 },
  { label: 'February', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
];

type DateFieldsProps = {
  control: Control<BirthDataFormValues, any, BirthDataFormValues>;
  errors: FieldErrors<BirthDataFormValues>;
  watch: UseFormWatch<BirthDataFormValues>;
  setValue: UseFormSetValue<BirthDataFormValues>;
};

export function DateFields({ control, errors, watch, setValue }: DateFieldsProps) {
  const year = watch(BIRTH_DATA_FORM_CONFIG.fields.year.name);
  const month = watch(BIRTH_DATA_FORM_CONFIG.fields.month.name);
  const maxDays = useMemo(() => getDaysInMonth(year, month), [year, month]);
  const currentYear = new Date().getFullYear();

  // If month/year changes and current day exceeds maxDays, clear it
  const day = watch(BIRTH_DATA_FORM_CONFIG.fields.day.name);
  React.useEffect(() => {
    if (day && maxDays && day > maxDays) {
      setValue(BIRTH_DATA_FORM_CONFIG.fields.day.name, maxDays, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [day, maxDays, setValue]);

  return (
    <Box sx={styles.group()}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 120 } }}>
          <Controller
            name={BIRTH_DATA_FORM_CONFIG.fields.year.name}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label={BIRTH_DATA_FORM_CONFIG.copy.fields.year.label}
                error={!!errors.year}
                helperText={errors.year?.message}
                fullWidth
                autoComplete="off"
                required
                inputProps={{ min: 1900, max: currentYear }}
                sx={{
                  '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
                    {
                      WebkitAppearance: 'none',
                      margin: 0,
                    },
                  '& input[type=number]': {
                    MozAppearance: 'textfield',
                  },
                }}
                value={field.value ?? ''}
                onChange={(e) => {
                  const val = e.target.value === '' ? undefined : Number(e.target.value);
                  field.onChange(val);
                }}
              />
            )}
          />
        </Box>
        <Box sx={{ flex: 2, minWidth: { xs: '100%', sm: 260 } }}>
          <Controller
            name={BIRTH_DATA_FORM_CONFIG.fields.month.name}
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={MONTHS}
                getOptionLabel={(opt) => opt.label}
                value={MONTHS.find((m) => m.value === field.value) ?? null}
                onChange={(_, opt) => field.onChange(opt?.value)}
                disabled={typeof year !== 'number' || isNaN(year)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={BIRTH_DATA_FORM_CONFIG.copy.fields.month.label}
                    error={!!errors.month}
                    helperText={errors.month?.message}
                    fullWidth
                    autoComplete="off"
                    required
                  />
                )}
                fullWidth
              />
            )}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 140 } }}>
          <Controller
            name={BIRTH_DATA_FORM_CONFIG.fields.day.name}
            control={control}
            render={({ field }) => {
              const dayOptions = Array.from({ length: maxDays }, (_, i) => i + 1);
              const currentValue =
                typeof field.value === 'number'
                  ? field.value
                  : field.value && !isNaN(Number(field.value))
                    ? Number(field.value)
                    : undefined;
              return (
                <Autocomplete
                  options={dayOptions}
                  getOptionLabel={(opt) => String(opt ?? '')}
                  isOptionEqualToValue={(o, v) => o === v}
                  value={currentValue ?? null}
                  onChange={(_, val) => field.onChange(val ?? undefined)}
                  freeSolo
                  disabled={typeof month !== 'number' || isNaN(month)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={BIRTH_DATA_FORM_CONFIG.copy.fields.day.label}
                      error={!!errors.day}
                      helperText={
                        errors.day?.message ?? (month && year ? `Max ${maxDays}` : undefined)
                      }
                      fullWidth
                      autoComplete="off"
                      required
                      onChange={(e) => {
                        const raw = e.target.value.trim();
                        const num = raw === '' ? undefined : Number(raw);
                        if (num === undefined) {
                          field.onChange(undefined);
                          return;
                        }
                        if (!Number.isNaN(num)) {
                          field.onChange(num);
                        }
                      }}
                    />
                  )}
                  fullWidth
                />
              );
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}
