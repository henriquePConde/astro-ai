'use client';

import { useState, useEffect, useCallback } from 'react';

type InputListener = (value: string) => void;
type HighlightListener = (shouldHighlight: boolean) => void;

let aiInputState = '';
let highlightState = false;
const inputListeners = new Set<InputListener>();
const highlightListeners = new Set<HighlightListener>();

function setGlobalAIInput(value: string, triggerHighlight = false) {
  const wasEmpty = aiInputState === '';
  const hasNewContent = value !== '' && value !== aiInputState;

  aiInputState = value;

  // Trigger highlight animation if text is being set programmatically with content
  if (triggerHighlight && hasNewContent) {
    highlightState = true;
    for (const listener of highlightListeners) listener(true);

    // Auto-clear highlight after animation duration
    setTimeout(() => {
      highlightState = false;
      for (const listener of highlightListeners) listener(false);
    }, 3000); // 3 seconds highlight duration
  }

  for (const listener of inputListeners) listener(value);
}

/**
 * Shared AI input state hook.
 *
 * - `aiInput`: current value
 * - `setAIInput(value, triggerHighlight?)`: updates global input (all subscribers see it)
 * - `isHighlighted`: whether the input should show highlight animation
 *
 * This is intentionally app-wide so other components
 * (e.g. "Ask AI about this planet") can prefill the interpreter input.
 * When triggerHighlight is true, it will animate the input to draw user attention.
 */
export function useAIInput() {
  const [aiInput, setLocalInput] = useState<string>(aiInputState);
  const [isHighlighted, setLocalHighlight] = useState<boolean>(highlightState);

  useEffect(() => {
    const inputListener: InputListener = (value) => setLocalInput(value);
    const highlightListener: HighlightListener = (highlight) => setLocalHighlight(highlight);

    inputListeners.add(inputListener);
    highlightListeners.add(highlightListener);

    return () => {
      inputListeners.delete(inputListener);
      highlightListeners.delete(highlightListener);
    };
  }, []);

  const setAIInput = useCallback((value: string, triggerHighlight = false) => {
    setGlobalAIInput(value, triggerHighlight);
  }, []);

  return {
    aiInput,
    setAIInput,
    isHighlighted,
  };
}
