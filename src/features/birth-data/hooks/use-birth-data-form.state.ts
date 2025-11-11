import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BirthDataFormSchema,
  type BirthDataFormValues,
} from '../components/birth-data-form/birth-data-form.schema';

export function useBirthDataForm(onSubmit?: (v: BirthDataFormValues) => void) {
  const form = useForm<BirthDataFormValues>({
    resolver: zodResolver(BirthDataFormSchema),
    defaultValues: {
      name: '',
      year: new Date().getFullYear(),
      month: 1,
      day: 1,
      hour: 0,
      minute: 0,
      nation: '',
      city: '',
    },
  });

  const handleSubmit = (v: BirthDataFormValues) => {
    if (onSubmit) {
      // Ensure all numeric values are properly converted
      const transformedValues = {
        ...v,
        year: Number(v.year),
        month: Number(v.month),
        day: Number(v.day),
        hour: Number(v.hour),
        minute: Number(v.minute),
      };
      onSubmit(transformedValues);
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
}
