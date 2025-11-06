'use client';

import React from 'react';
import { Controller, type Control, type FormState } from 'react-hook-form';
import {
  TextField,
  Button,
  Stack,
  Autocomplete,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';
import type { BirthDataFormValues } from './birth-data-form.schema';
import { styles } from './birth-data-form.styles';
import { useDailyUsage } from '@/features/reports/hooks/use-daily-usage.query';

interface Props {
  control: Control<BirthDataFormValues>;
  formState: FormState<BirthDataFormValues>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => void;
  setValue: (name: keyof BirthDataFormValues, value: any) => void;
  watch: (name: keyof BirthDataFormValues) => any;
  nationOptions: string[];
  nationInputValue: string;
  onNationInputChange: (v: string) => void;
  onNationChange: (v: string) => void;
  onNationOpen: () => void;
  onNationClose: () => void;
  nationOpen: boolean;
  nationLoading?: boolean;
  cityOptions: string[];
  cityInputValue: string;
  onCityInputChange: (v: string) => void;
  onCityChange: (v: string) => void;
  onCityOpen: () => void;
  onCityClose: () => void;
  cityOpen: boolean;
  cityLoading?: boolean;
}

export function BirthDataFormView({
  control,
  formState,
  handleSubmit,
  setValue,
  watch,
  nationOptions,
  nationInputValue,
  onNationInputChange,
  onNationChange,
  onNationOpen,
  onNationClose,
  nationOpen,
  nationLoading,
  cityOptions,
  cityInputValue,
  onCityInputChange,
  onCityChange,
  onCityOpen,
  onCityClose,
  cityOpen,
  cityLoading,
}: Props) {
  const { errors, isSubmitting } = formState;

  const { data: usage } = useDailyUsage();

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Box sx={styles.shell()}>
        <Box sx={styles.stars()} />
        <Box sx={styles.glassOverlay()} />
        <Box sx={styles.content()}>
          <Box sx={styles.header()}>
            <Typography component="h2" sx={styles.headerTitle()}>
              Birth Chart Calculator
            </Typography>
            <Typography component="p" sx={styles.headerSub()}>
              Enter your birth details to reveal your astrological blueprint
            </Typography>
          </Box>
          {usage && (
            <Typography sx={{ color: '#555', fontWeight: 500, mb: 1 }}>
              You have generated {usage.used} of {usage.limit} charts today.
            </Typography>
          )}

          <Box sx={styles.grid()}>
            <Box sx={styles.group()}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Year"
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
                  name="month"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Month"
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
                  name="day"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Day"
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
                  name="hour"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Hour"
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
                  name="minute"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="number"
                      label="Minute"
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

            <Box sx={styles.group()}>
              <Controller
                name="nation"
                control={control}
                render={({ field }) => {
                  return (
                    <Autocomplete
                      freeSolo
                      options={nationOptions}
                      value={field.value || ''}
                      inputValue={nationInputValue}
                      open={nationOpen}
                      onOpen={onNationOpen}
                      onClose={onNationClose}
                      onInputChange={(_, newInputValue) => {
                        onNationInputChange(newInputValue);
                      }}
                      onChange={(_, newValue) => {
                        const value = typeof newValue === 'string' ? newValue : newValue || '';
                        field.onChange(value);
                        onNationChange(value);
                      }}
                      filterOptions={(x) => x}
                      getOptionLabel={(option) =>
                        typeof option === 'string' ? option : String(option)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Country"
                          error={!!errors.nation}
                          helperText={errors.nation?.message}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {nationLoading ? (
                                  <CircularProgress color="inherit" size={16} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  );
                }}
              />
              <Controller
                name="city"
                control={control}
                render={({ field }) => {
                  return (
                    <Autocomplete
                      freeSolo
                      options={cityOptions}
                      value={field.value || ''}
                      inputValue={cityInputValue}
                      open={cityOpen}
                      onOpen={onCityOpen}
                      onClose={onCityClose}
                      onInputChange={(_, newInputValue) => {
                        onCityInputChange(newInputValue);
                      }}
                      onChange={(_, newValue) => {
                        const value = typeof newValue === 'string' ? newValue : newValue || '';
                        field.onChange(value);
                        onCityChange(value);
                      }}
                      filterOptions={(x) => x}
                      getOptionLabel={(option) =>
                        typeof option === 'string' ? option : String(option)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="City"
                          error={!!errors.city}
                          helperText={errors.city?.message}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {cityLoading ? (
                                  <CircularProgress color="inherit" size={16} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      )}
                    />
                  );
                }}
              />
            </Box>
          </Box>
          <Box sx={styles.submitRow()}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Continue
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
}
