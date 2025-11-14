import React from 'react';
import { Controller } from 'react-hook-form';
import { TextField, Autocomplete, CircularProgress, Box } from '@mui/material';
import { styles } from '../../birth-data-form.styles';
import type { Control, FieldErrors } from 'react-hook-form';
import { useWatch } from 'react-hook-form';
import type { BirthDataFormValues } from '../../birth-data-form.schema';
import type { BIRTH_DATA_FORM_CONFIG } from '../../birth-data-form.config';

interface LocationFieldsProps {
  control: Control<BirthDataFormValues, any, BirthDataFormValues>;
  errors: FieldErrors<BirthDataFormValues>;
  config: typeof BIRTH_DATA_FORM_CONFIG;
  nationOptions: string[];
  nationInputValue: string;
  onNationInputChange: (v: string, reason?: string) => void;
  onNationChange: (v: string) => void;
  onNationOpen: () => void;
  onNationClose: () => void;
  nationOpen: boolean;
  nationLoading?: boolean;
  cityOptions: string[];
  cityInputValue: string;
  onCityInputChange: (v: string, reason?: string) => void;
  onCityChange: (v: string) => void;
  onCityOpen: () => void;
  onCityClose: () => void;
  cityOpen: boolean;
  cityLoading?: boolean;
}

export function LocationFields({
  control,
  errors,
  config,
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
}: LocationFieldsProps) {
  const nationValue = useWatch({
    control,
    name: config.fields.nation.name,
  }) as string | undefined;
  const isCityDisabled = !nationValue || nationValue.trim().length === 0;
  return (
    <Box sx={styles.group()}>
      <Controller
        name={config.fields.nation.name}
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
              onInputChange={(_, newInputValue, reason) => {
                onNationInputChange(newInputValue, reason);
              }}
              onChange={(_, newValue) => {
                const value = typeof newValue === 'string' ? newValue : newValue || '';
                field.onChange(value);
                onNationChange(value);
              }}
              filterOptions={(x) => x}
              getOptionLabel={(option) => (typeof option === 'string' ? option : String(option))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={config.copy.fields.country.label}
                  error={!!errors.nation}
                  helperText={errors.nation?.message}
                  autoComplete="new-password"
                  required
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {nationLoading ? (
                          <CircularProgress color="inherit" size={config.ui.loading.spinnerSize} />
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
        name={config.fields.city.name}
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
              onInputChange={(_, newInputValue, reason) => {
                onCityInputChange(newInputValue, reason);
              }}
              onChange={(_, newValue) => {
                const value = typeof newValue === 'string' ? newValue : newValue || '';
                field.onChange(value);
                onCityChange(value);
              }}
              disabled={isCityDisabled}
              filterOptions={(x) => x}
              getOptionLabel={(option) => (typeof option === 'string' ? option : String(option))}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={config.copy.fields.city.label}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  autoComplete="new-password"
                  required
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <>
                        {cityLoading ? (
                          <CircularProgress color="inherit" size={config.ui.loading.spinnerSize} />
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
  );
}
