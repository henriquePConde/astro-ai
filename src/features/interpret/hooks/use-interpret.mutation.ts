import { useMutation } from '@tanstack/react-query';
import { interpret } from '../services/interpret.service';

export function useInterpret() {
  return useMutation<string, unknown, { message: string; context?: Record<string, unknown>; chatHistory?: unknown[] }>({
    mutationFn: (payload) => interpret(payload),
  });
}


