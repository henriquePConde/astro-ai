'use client';

import { useState, useEffect, useCallback } from 'react';

type Listener = (value: string) => void;

let aiInputState = '';
const listeners = new Set<Listener>();

function setGlobalAIInput(value: string) {
  aiInputState = value;
  for (const listener of listeners) listener(value);
}

/**
 * Shared AI input state hook.
 *
 * - `aiInput`: current value
 * - `setAIInput(value)`: updates global input (all subscribers see it)
 *
 * This is intentionally app-wide so other components
 * (e.g. "Ask AI about this planet") can prefill the interpreter input.
 */
export function useAIInput() {
  const [aiInput, setLocal] = useState<string>(aiInputState);

  useEffect(() => {
    const listener: Listener = (value) => setLocal(value);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const setAIInput = useCallback((value: string) => {
    setGlobalAIInput(value);
  }, []);

  return {
    aiInput,
    setAIInput,
  };
}
