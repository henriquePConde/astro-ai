import type { Control, FormState } from 'react-hook-form';
import type { BirthDataFormValues } from './birth-data-form.schema';
import type { BIRTH_DATA_FORM_CONFIG } from './birth-data-form.config';
import type { DailyUsage } from '@/features/reports/services/reports.service';

export interface BirthDataFormViewProps {
  control: Control<BirthDataFormValues>;
  formState: FormState<BirthDataFormValues>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => void;
  usage?: DailyUsage;
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
  config: typeof BIRTH_DATA_FORM_CONFIG;
}

export interface BirthDataFormContainerProps {
  onSubmit?: (v: BirthDataFormValues) => void;
}
