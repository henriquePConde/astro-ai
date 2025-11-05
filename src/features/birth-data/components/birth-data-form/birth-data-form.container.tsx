'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BirthDataFormSchema, type BirthDataFormValues } from './birth-data-form.schema';
import { BirthDataFormView } from './birth-data-form.view';
import { useState, useMemo, useEffect } from 'react';
import { useCountries } from '../../hooks/use-countries.query';
import { useCities } from '../../hooks/use-cities.query';

export function BirthDataFormContainer({
  onSubmit,
}: {
  onSubmit?: (v: BirthDataFormValues) => void;
}) {
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

  const [countryQuery, setCountryQuery] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [nationInputValue, setNationInputValue] = useState('');
  const [cityInputValue, setCityInputValue] = useState('');
  const [nationOpen, setNationOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);

  const { data: countryResults = [], isLoading: loadingCountries } = useCountries(countryQuery);
  const nationOptions = useMemo(() => {
    return countryResults.map((c: any) => (typeof c === 'string' ? c : c.name)).filter(Boolean);
  }, [countryResults]);

  const selectedNation = form.watch('nation') || undefined;
  const { data: cityResults = [], isLoading: loadingCities } = useCities(cityQuery, selectedNation);
  const cityOptions = useMemo(() => {
    return cityResults.map((c: any) => (typeof c === 'string' ? c : c.name)).filter(Boolean);
  }, [cityResults]);

  // Sync input values with form values
  const currentNation = form.watch('nation');
  const currentCity = form.watch('city');

  useEffect(() => {
    if (currentNation) setNationInputValue(currentNation);
  }, [currentNation]);

  useEffect(() => {
    if (currentCity) setCityInputValue(currentCity);
  }, [currentCity]);

  const handleNationInputChange = (value: string) => {
    setNationInputValue(value);
    setCountryQuery(value);
    // Open dropdown when user types 2+ characters
    if (value.length >= 2) {
      setNationOpen(true);
    } else {
      setNationOpen(false);
    }
  };

  const handleCityInputChange = (value: string) => {
    setCityInputValue(value);
    setCityQuery(value);
    // Open dropdown when user types 2+ characters
    if (value.length >= 2) {
      setCityOpen(true);
    } else {
      setCityOpen(false);
    }
  };

  const handleNationChange = (value: string) => {
    setNationInputValue(value);
    setNationOpen(false);
  };

  const handleCityChange = (value: string) => {
    setCityInputValue(value);
    setCityOpen(false);
  };

  const handleNationOpen = () => {
    if (nationInputValue.length >= 2) {
      setNationOpen(true);
    }
  };

  const handleNationClose = () => {
    setNationOpen(false);
  };

  const handleCityOpen = () => {
    if (cityInputValue.length >= 2) {
      setCityOpen(true);
    }
  };

  const handleCityClose = () => {
    setCityOpen(false);
  };

  // Compute if dropdown should be open (must have input >= 2 chars AND either loading or has options)
  const shouldNationOpen =
    nationOpen && nationInputValue.length >= 2 && (loadingCountries || nationOptions.length > 0);
  const shouldCityOpen =
    cityOpen && cityInputValue.length >= 2 && (loadingCities || cityOptions.length > 0);

  return (
    <BirthDataFormView
      control={form.control}
      handleSubmit={form.handleSubmit(handleSubmit)}
      formState={form.formState}
      setValue={form.setValue}
      watch={form.watch}
      nationOptions={nationOptions}
      nationInputValue={nationInputValue}
      onNationInputChange={handleNationInputChange}
      onNationChange={handleNationChange}
      onNationOpen={handleNationOpen}
      onNationClose={handleNationClose}
      nationOpen={shouldNationOpen}
      nationLoading={loadingCountries}
      cityOptions={cityOptions}
      cityInputValue={cityInputValue}
      onCityInputChange={handleCityInputChange}
      onCityChange={handleCityChange}
      onCityOpen={handleCityOpen}
      onCityClose={handleCityClose}
      cityOpen={shouldCityOpen}
      cityLoading={loadingCities}
    />
  );
}
