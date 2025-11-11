// src/features/home/components/chart-experience/components/astro-interpreter/hooks/use-interpreter.ts

'use client';

import { useCallback } from 'react';
import { useAstroChat } from '../hooks/use-astro-chat';

import type { ChartData as WheelChartData } from '@/shared/components/astro-chart/types';
import { calculatePlanetPositions } from '@/shared/components/astro-chart/utils/planetUtils';
import { calculateChartAspects } from '../utils/aspectUtils';
import { buildInterpretationContext } from '../utils/contextBuilder';
import { useInterpretChartMutation } from '@/features/home/services/interpret.mutations';
import { useAIInput } from './use-ai-input.state';

export function useInterpreter(chartData: WheelChartData | null) {
  const { messages, isLoading, addMessage, setMessages, setIsLoading } = useAstroChat();
  const { aiInput: input, setAIInput } = useAIInput();
  const interpretMutation = useInterpretChartMutation();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!chartData) return;

      const trimmed = input.trim();
      if (!trimmed) return;

      const userMessage = { role: 'user' as const, content: trimmed };

      // optimistic append user message
      addMessage(userMessage);
      setAIInput('');

      // build context from current chart
      const planetPositions = calculatePlanetPositions(chartData);
      const aspects = calculateChartAspects(planetPositions);
      const context = buildInterpretationContext(chartData, planetPositions, aspects);

      setIsLoading(true);

      try {
        let accumulated = '';
        const baseHistory = [...messages, userMessage];

        await interpretMutation.mutateAsync({
          message: trimmed,
          context,
          chatHistory: baseHistory,
          onChunk: (chunk) => {
            accumulated += chunk;
            const aiMessage = { role: 'assistant' as const, content: accumulated };
            setMessages([...baseHistory, aiMessage]);
          },
        });

        // If for some reason no chunks came through, keep at least one reply
        if (!accumulated) {
          const fallback = {
            role: 'assistant' as const,
            content:
              "I've processed your chart data. Ask me anything specific you'd like to explore about your placements, aspects, or life themes.",
          };
          setMessages([...baseHistory, fallback]);
        }
      } catch (err: unknown) {
        console.error('Interpreter error', err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Something went wrong while interpreting your chart.';
        const aiMessage = {
          role: 'assistant' as const,
          content: `I'm sorry, I couldn't complete that request.\n\n${errorMessage}`,
        };
        setMessages([...messages, userMessage, aiMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [
      chartData,
      input,
      messages,
      addMessage,
      setMessages,
      setIsLoading,
      setAIInput,
      interpretMutation,
    ],
  );

  return {
    input,
    setInput: setAIInput,
    isLoading: isLoading || interpretMutation.isPending,
    messages,
    handleSubmit,
  };
}
