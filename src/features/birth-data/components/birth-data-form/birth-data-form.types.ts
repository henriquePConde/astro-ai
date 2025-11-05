import type { BirthDataFormValues } from './birth-data-form.schema';

export interface BirthDataFormViewProps {
    values: BirthDataFormValues;
    onSubmit: (v: BirthDataFormValues) => void;
}


