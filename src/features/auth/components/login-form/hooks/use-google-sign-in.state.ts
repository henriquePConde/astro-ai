import { useCallback } from 'react';
import { useSignInWithGoogleMutation } from '@/features/auth/services/auth.mutations';

export interface UseGoogleSignInReturn {
  handleGoogleSignIn: () => void;
  isGoogleLoading: boolean;
  googleError: Error | null;
}

/**
 * Hook that handles Google sign-in action.
 * UI state hook - follows the *.state.ts pattern.
 */
export function useGoogleSignIn(): UseGoogleSignInReturn {
  const googleSignInMutation = useSignInWithGoogleMutation();

  const handleGoogleSignIn = useCallback(() => {
    googleSignInMutation.mutate(undefined);
  }, [googleSignInMutation]);

  return {
    handleGoogleSignIn,
    isGoogleLoading: googleSignInMutation.isPending,
    googleError: googleSignInMutation.error instanceof Error ? googleSignInMutation.error : null,
  };
}
