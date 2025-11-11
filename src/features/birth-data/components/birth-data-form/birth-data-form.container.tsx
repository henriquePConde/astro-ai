'use client';

import React from 'react';
import { BirthDataFormView } from './birth-data-form.view';
import { useBirthDataForm } from '../../hooks/use-birth-data-form.state';
import { useBirthDataAutocomplete } from '../../hooks/use-birth-data-autocomplete.state';
import { useDailyUsage } from '@/features/reports/services/reports.queries';
import { BIRTH_DATA_FORM_CONFIG } from './birth-data-form.config';
import type { BirthDataFormContainerProps } from './birth-data-form.types';

export function BirthDataFormContainer({ onSubmit }: BirthDataFormContainerProps) {
  const { form, handleSubmit } = useBirthDataForm(onSubmit);
  const autocompleteState = useBirthDataAutocomplete({ watch: form.watch });
  const { data: usage } = useDailyUsage();

  return (
    <BirthDataFormView
      control={form.control}
      handleSubmit={handleSubmit}
      formState={form.formState}
      usage={usage ?? undefined}
      {...autocompleteState}
      config={BIRTH_DATA_FORM_CONFIG}
    />
  );
}
