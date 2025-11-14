import { useState, useMemo, useEffect, useCallback } from 'react';
import { useCitiesQuery } from '../services/location.queries';

interface UseCityAutocompleteOptions {
  currentValue?: string;
  selectedCountry?: string;
  minQueryLength?: number;
  debounceMs?: number;
}

export interface UseCityAutocompleteReturn {
  options: string[];
  inputValue: string;
  isLoading: boolean;
  isOpen: boolean;
  onInputChange: (value: string, reason?: string) => void;
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
  debounceMs = 350,
}: UseCityAutocompleteOptions = {}): UseCityAutocompleteReturn {
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { data: results = [], isLoading } = useCitiesQuery(query, selectedCountry);

  const options = useMemo(() => {
    const names = results.map((c: any) => (typeof c === 'string' ? c : c.name)).filter(Boolean);
    const seen = new Set<string>();
    const deduped: string[] = [];
    for (const n of names) {
      const key = String(n).trim().toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        deduped.push(String(n));
      }
    }
    return deduped;
  }, [results]);

  // Sync input value with form value
  useEffect(() => {
    if (currentValue) {
      setInputValue(currentValue);
    }
  }, [currentValue]);

  // Debounce query updates based on inputValue and selectedCountry
  useEffect(() => {
    // If no country selected, keep closed and avoid querying
    if (!selectedCountry) {
      setIsOpen(false);
      setQuery('');
      setIsTyping(false);
      return;
    }
    const handler = setTimeout(() => {
      setQuery(inputValue);
      if (isTyping) {
        if (inputValue.length >= minQueryLength) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      }
    }, debounceMs);
    return () => clearTimeout(handler);
  }, [inputValue, minQueryLength, debounceMs, selectedCountry, isTyping]);

  // Auto-open when results (or loading) are present after typing pause
  useEffect(() => {
    if (!selectedCountry) return;
    if (!isTyping) return;
    if (inputValue.length >= minQueryLength && (isLoading || options.length > 0)) {
      setIsOpen(true);
    }
  }, [options, isLoading, inputValue, minQueryLength, selectedCountry, isTyping]);

  const handleInputChange = useCallback((value: string, reason?: string) => {
    setInputValue(value);
    setIsTyping(reason === 'input');
  }, []);

  const handleChange = useCallback((value: string) => {
    setInputValue(value);
    setIsOpen(false);
    setIsTyping(false);
  }, []);

  const handleOpen = useCallback(() => {
    if (inputValue.length >= minQueryLength) {
      setIsOpen(true);
    }
  }, [inputValue, minQueryLength]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setIsTyping(false);
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
