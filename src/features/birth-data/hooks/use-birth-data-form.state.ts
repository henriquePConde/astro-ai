import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  BirthDataFormSchema,
  type BirthDataFormValues,
} from '../components/birth-data-form/birth-data-form.schema';

export function useBirthDataForm(onSubmit?: (v: BirthDataFormValues) => void) {
  const form = useForm<BirthDataFormValues, any, BirthDataFormValues>({
    resolver: zodResolver(BirthDataFormSchema) as any,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      timeSystem: '24h',
      amPm: 'AM',
      year: undefined as unknown as number | undefined,
      month: undefined as unknown as number | undefined,
      day: undefined as unknown as number | undefined,
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
        year: v.year !== undefined ? Number(v.year) : undefined,
        month: v.month !== undefined ? Number(v.month) : undefined,
        day: v.day !== undefined ? Number(v.day) : undefined,
        hour: v.hour !== undefined ? Number(v.hour) : undefined,
        minute: v.minute !== undefined ? Number(v.minute) : undefined,
      };
      // Normalize to 24h for submission if 12h format is selected
      if (v.timeSystem === '12h' && typeof transformedValues.hour === 'number') {
        const isPM = v.amPm === 'PM';
        let h = transformedValues.hour;
        if (isPM && h < 12) h += 12;
        if (!isPM && h === 12) h = 0;
        transformedValues.hour = h;
      }
      onSubmit(transformedValues as BirthDataFormValues);
    }
  };

  return {
    form,
    handleSubmit: form.handleSubmit(handleSubmit),
  };
}
