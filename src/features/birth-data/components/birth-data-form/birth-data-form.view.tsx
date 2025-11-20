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
import { DateFields } from './components/date-fields/DateFields';
import { TimeFields } from './components/time-fields/TimeFields';
import { useTimeUntilReset } from '@/shared/hooks/use-time-until-reset';

export function BirthDataFormView({
  control,
  formState,
  handleSubmit,
  watch,
  setValue,
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
  isLoading,
  config,
}: BirthDataFormViewProps) {
  const { errors, isSubmitting, isValid } = formState;
  const isButtonLoading = isLoading || isSubmitting;
  const isChartLimitReached = usage ? usage.charts.used >= usage.charts.limit : false;
  const timeRemaining = useTimeUntilReset(usage?.charts.firstGenerationAt);

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <FormShell>
        <FormHeader config={config} />
        {usage && <FormUsage usage={usage} config={config} />}

        <Box sx={styles.grid()}>
          <PersonalInfoFields
            control={control}
            errors={errors}
            config={config}
            disabled={isChartLimitReached}
            tooltipMessage={
              isChartLimitReached
                ? config.copy.button.tooltipLimitReached(timeRemaining)
                : undefined
            }
          />
          <DateFields
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
            disabled={isChartLimitReached}
            tooltipMessage={
              isChartLimitReached
                ? config.copy.button.tooltipLimitReached(timeRemaining)
                : undefined
            }
          />
          <TimeFields
            control={control}
            errors={errors}
            watch={watch}
            setValue={setValue}
            disabled={isChartLimitReached}
            tooltipMessage={
              isChartLimitReached
                ? config.copy.button.tooltipLimitReached(timeRemaining)
                : undefined
            }
          />
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
            disabled={isChartLimitReached}
            tooltipMessage={
              isChartLimitReached
                ? config.copy.button.tooltipLimitReached(timeRemaining)
                : undefined
            }
          />
        </Box>
        <FormSubmitButton
          isSubmitting={isButtonLoading}
          isChartLimitReached={usage ? usage.charts.used >= usage.charts.limit : false}
          isValid={isValid}
          config={config}
        />
      </FormShell>
    </form>
  );
}
