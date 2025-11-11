import { useState, useMemo, useEffect, useCallback } from 'react';
import { useCitiesQuery } from '../services/location.queries';

interface UseCityAutocompleteOptions {
  currentValue?: string;
  selectedCountry?: string;
  minQueryLength?: number;
}

export interface UseCityAutocompleteReturn {
  options: string[];
  inputValue: string;
  isLoading: boolean;
  isOpen: boolean;
  onInputChange: (value: string) => void;
  onChange: (value: string) => void;
  onOpen: () => void;
  onClose: () => void;
}

/**
 * Hook for managing city autocomplete state and logic.
 * Single responsibility: handle city autocomplete input, query, options, and dropdown state.
 */
export function useCityAutocomplete({
  currentValue,
  selectedCountry,
  minQueryLength = 2,
}: UseCityAutocompleteOptions = {}): UseCityAutocompleteReturn {
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { data: results = [], isLoading } = useCitiesQuery(query, selectedCountry);

  const options = useMemo(() => {
    return results.map((c: any) => (typeof c === 'string' ? c : c.name)).filter(Boolean);
  }, [results]);

  // Sync input value with form value
  useEffect(() => {
    if (currentValue) {
      setInputValue(currentValue);
    }
  }, [currentValue]);

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      setQuery(value);
      // Open dropdown when user types minimum characters
      if (value.length >= minQueryLength) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    },
    [minQueryLength],
  );

  const handleChange = useCallback((value: string) => {
    setInputValue(value);
    setIsOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    if (inputValue.length >= minQueryLength) {
      setIsOpen(true);
    }
  }, [inputValue, minQueryLength]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Compute if dropdown should be open (must have input >= min chars AND either loading or has options)
  const shouldOpen =
    isOpen && inputValue.length >= minQueryLength && (isLoading || options.length > 0);

  return {
    options,
    inputValue,
    isLoading,
    isOpen: shouldOpen,
    onInputChange: handleInputChange,
    onChange: handleChange,
    onOpen: handleOpen,
    onClose: handleClose,
  };
}
