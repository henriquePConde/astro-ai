import { useState } from 'react';

/**
 * Manages error and success message state for authentication forms.
 * Pure UI state hook with no I/O - follows the *.state.ts pattern.
 * Co-located in login-form since it's the primary form; other forms import from here.
 */
export function useAuthFormState() {
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  const setErrorMessage = (message: string | null) => {
    setError(message);
    setSuccessMessage(null);
  };

  const setSuccessMessage_ = (message: string | null) => {
    setSuccessMessage(message);
    setError(null);
  };

  return {
    error,
    successMessage,
    setError: setErrorMessage,
    setSuccessMessage: setSuccessMessage_,
    clearMessages,
  };
}
