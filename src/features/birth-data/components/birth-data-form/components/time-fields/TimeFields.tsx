'use client';

import React from 'react';
import {
  Box,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormSetValue,
  type UseFormWatch,
} from 'react-hook-form';
import type { BirthDataFormValues } from '../../birth-data-form.schema';
import { styles } from '../../birth-data-form.styles';
import { BIRTH_DATA_FORM_CONFIG } from '../../birth-data-form.config';
import { Autocomplete } from '@mui/material';

type TimeFieldsProps = {
  control: Control<BirthDataFormValues, any, BirthDataFormValues>;
  errors: FieldErrors<BirthDataFormValues>;
  watch: UseFormWatch<BirthDataFormValues>;
  setValue: UseFormSetValue<BirthDataFormValues>;
  disabled?: boolean;
  tooltipMessage?: string;
};

export function TimeFields({
  control,
  errors,
  watch,
  setValue,
  disabled = false,
  tooltipMessage,
}: TimeFieldsProps) {
  const timeSystem = watch('timeSystem') ?? '24h';
  const amPm = watch('amPm') ?? 'AM';
  const hour = watch(BIRTH_DATA_FORM_CONFIG.fields.hour.name);
  const minute = watch(BIRTH_DATA_FORM_CONFIG.fields.minute.name);

  const handleTimeSystemChange = (_: any, next: '12h' | '24h' | null) => {
    if (!next) return;
    if (next === timeSystem) return;
    // Convert hour to match the next system if possible
    const currentHour = typeof hour === 'number' ? hour : undefined;
    if (next === '12h') {
      // 24h -> 12h
      if (currentHour !== undefined) {
        if (currentHour === 0) {
          setValue(BIRTH_DATA_FORM_CONFIG.fields.hour.name, 12, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('amPm', 'AM', { shouldDirty: true, shouldValidate: true });
        } else if (currentHour === 12) {
          setValue(BIRTH_DATA_FORM_CONFIG.fields.hour.name, 12, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('amPm', 'PM', { shouldDirty: true, shouldValidate: true });
        } else if (currentHour > 12) {
          setValue(BIRTH_DATA_FORM_CONFIG.fields.hour.name, currentHour - 12, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('amPm', 'PM', { shouldDirty: true, shouldValidate: true });
        } else {
          setValue(BIRTH_DATA_FORM_CONFIG.fields.hour.name, currentHour, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setValue('amPm', 'AM', { shouldDirty: true, shouldValidate: true });
        }
      } else {
        setValue('amPm', 'AM', { shouldDirty: true, shouldValidate: true });
      }
    } else {
      // 12h -> 24h
      const current12h = typeof hour === 'number' ? hour : undefined;
      if (current12h !== undefined) {
        let h = current12h;
        if (amPm === 'AM') {
          if (h === 12) h = 0;
        } else {
          if (h < 12) h = h + 12;
        }
        setValue(BIRTH_DATA_FORM_CONFIG.fields.hour.name, h, {
          shouldDirty: true,
          shouldValidate: true,
        });
      }
    }
    setValue('timeSystem', next, { shouldDirty: true, shouldValidate: true });
  };

  const hourOptions = React.useMemo(
    () =>
      timeSystem === '12h'
        ? Array.from({ length: 12 }, (_, i) => i + 1)
        : Array.from({ length: 24 }, (_, i) => i),
    [timeSystem],
  );
  const minuteOptions = React.useMemo(() => Array.from({ length: 60 }, (_, i) => i), []);

  const fields = (
    <Box sx={styles.group()}>
      {/* Row 1: time system toggle */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Controller
          name="timeSystem"
          control={control}
          render={({ field }) => (
            <ToggleButtonGroup
              exclusive
              value={field.value ?? '24h'}
              onChange={(e, val) => {
                field.onChange(val);
                handleTimeSystemChange(e, val);
              }}
              aria-label="Time System"
              disabled={disabled}
            >
              <ToggleButton value="24h" aria-label="24-hour">
                24h
              </ToggleButton>
              <ToggleButton value="12h" aria-label="12-hour">
                12h
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        />
      </Stack>

      {/* Row 2: hour, minute, and AM/PM (if 12h) */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems="flex-start"
        sx={{ mt: 2 }}
      >
        <Controller
          name={BIRTH_DATA_FORM_CONFIG.fields.hour.name}
          control={control}
          render={({ field }) => {
            const currentValue =
              typeof field.value === 'number'
                ? field.value
                : field.value && !isNaN(Number(field.value))
                  ? Number(field.value)
                  : undefined;
            return (
              <Autocomplete
                options={hourOptions}
                getOptionLabel={(opt) => String(opt ?? '')}
                isOptionEqualToValue={(o, v) => o === v}
                value={currentValue ?? null}
                onChange={(_, val) => field.onChange(val ?? undefined)}
                freeSolo
                disabled={disabled}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={BIRTH_DATA_FORM_CONFIG.copy.fields.hour.label}
                    error={!!errors.hour}
                    helperText={errors.hour?.message}
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

        <Controller
          name={BIRTH_DATA_FORM_CONFIG.fields.minute.name}
          control={control}
          render={({ field }) => {
            const currentValue =
              typeof field.value === 'number'
                ? field.value
                : field.value && !isNaN(Number(field.value))
                  ? Number(field.value)
                  : undefined;
            return (
              <Autocomplete
                options={minuteOptions}
                getOptionLabel={(opt) => String(opt ?? '')}
                isOptionEqualToValue={(o, v) => o === v}
                value={currentValue ?? null}
                onChange={(_, val) => field.onChange(val ?? undefined)}
                freeSolo
                disabled={disabled}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={BIRTH_DATA_FORM_CONFIG.copy.fields.minute.label}
                    error={!!errors.minute}
                    helperText={errors.minute?.message}
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

        {timeSystem === '12h' && (
          <Controller
            name="amPm"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="ampm-label">AM/PM</InputLabel>
                <Select
                  labelId="ampm-label"
                  label="AM/PM"
                  value={field.value ?? 'AM'}
                  onChange={(e) => field.onChange(e.target.value)}
                  disabled={disabled}
                >
                  <MenuItem value="AM">AM</MenuItem>
                  <MenuItem value="PM">PM</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        )}
      </Stack>
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
        <span>{fields}</span>
      </Tooltip>
    );
  }

  return fields;
}
