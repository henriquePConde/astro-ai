import type {
  Control,
  FormState,
  UseFormWatch,
  UseFormSetValue,
  UseFormGetValues,
} from 'react-hook-form';
import type { BirthDataFormValues } from './birth-data-form.schema';
import type { BIRTH_DATA_FORM_CONFIG } from './birth-data-form.config';
import type { DailyUsage } from '@/features/reports/services/reports.service';

export interface BirthDataFormViewProps {
  control: Control<BirthDataFormValues, any, any>;
  formState: FormState<BirthDataFormValues>;
  handleSubmit: (e?: React.BaseSyntheticEvent) => void;
  watch: UseFormWatch<BirthDataFormValues>;
  setValue: UseFormSetValue<BirthDataFormValues>;
  usage?: DailyUsage;
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
  isLoading?: boolean;
  config: typeof BIRTH_DATA_FORM_CONFIG;
}

export interface BirthDataFormContainerProps {
  onSubmit?: (v: BirthDataFormValues) => void;
  isLoading?: boolean;
}
