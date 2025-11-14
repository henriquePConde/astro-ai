import type { UseFormWatch } from 'react-hook-form';
import type { BirthDataFormValues } from '../components/birth-data-form/birth-data-form.schema';
import { useNationAutocomplete } from './use-nation-autocomplete.state';
import { useCityAutocomplete } from './use-city-autocomplete.state';

interface UseBirthDataAutocompleteOptions {
  watch: UseFormWatch<BirthDataFormValues>;
}

/**
 * Hook that composes nation and city autocomplete hooks.
 * Single responsibility: orchestrate both autocomplete hooks and provide unified interface.
 */
export function useBirthDataAutocomplete({ watch }: UseBirthDataAutocompleteOptions) {
  const currentNation = watch('nation');
  const currentCity = watch('city');
  const selectedNation = currentNation || undefined;

  const nationAutocomplete = useNationAutocomplete({
    currentValue: currentNation,
  });

  const cityAutocomplete = useCityAutocomplete({
    currentValue: currentCity,
    selectedCountry: selectedNation,
  });

  return {
    // Nation autocomplete
    nationOptions: nationAutocomplete.options,
    nationInputValue: nationAutocomplete.inputValue,
    onNationInputChange: nationAutocomplete.onInputChange,
    onNationChange: nationAutocomplete.onChange,
    onNationOpen: nationAutocomplete.onOpen,
    onNationClose: nationAutocomplete.onClose,
    nationOpen: nationAutocomplete.isOpen,
    nationLoading: nationAutocomplete.isLoading,

    // City autocomplete
    cityOptions: cityAutocomplete.options,
    cityInputValue: cityAutocomplete.inputValue,
    onCityInputChange: cityAutocomplete.onInputChange,
    onCityChange: cityAutocomplete.onChange,
    onCityOpen: cityAutocomplete.onOpen,
    onCityClose: cityAutocomplete.onClose,
    cityOpen: cityAutocomplete.isOpen,
    cityLoading: cityAutocomplete.isLoading,
  };
}
