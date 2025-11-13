'use client';

import React from 'react';
import { Box } from '@mui/material';
import { styles } from './birth-data-form.styles';
import type { BirthDataFormViewProps } from './birth-data-form.types';
import {
  FormShell,
  FormHeader,
  FormUsage,
  PersonalInfoFields,
  LocationFields,
  FormSubmitButton,
} from './components';

export function BirthDataFormView({
  control,
  formState,
  handleSubmit,
  usage,
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
  config,
}: BirthDataFormViewProps) {
  const { errors, isSubmitting } = formState;

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <FormShell>
        <FormHeader config={config} />
        {usage && <FormUsage usage={usage} config={config} />}

        <Box sx={styles.grid()}>
          <PersonalInfoFields control={control} errors={errors} config={config} />
          <LocationFields
            control={control}
            errors={errors}
            config={config}
            nationOptions={nationOptions}
            nationInputValue={nationInputValue}
            onNationInputChange={onNationInputChange}
            onNationChange={onNationChange}
            onNationOpen={onNationOpen}
            onNationClose={onNationClose}
            nationOpen={nationOpen}
            nationLoading={nationLoading}
            cityOptions={cityOptions}
            cityInputValue={cityInputValue}
            onCityInputChange={onCityInputChange}
            onCityChange={onCityChange}
            onCityOpen={onCityOpen}
            onCityClose={onCityClose}
            cityOpen={cityOpen}
            cityLoading={cityLoading}
          />
        </Box>
        <FormSubmitButton
          isSubmitting={isSubmitting}
          isChartLimitReached={usage ? usage.charts.used >= usage.charts.limit : false}
          config={config}
        />
      </FormShell>
    </form>
  );
}
