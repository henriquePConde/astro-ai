import { interpretChart } from '../infra/openai.service';
import type { ChartContext, Message } from '../domain/interpretation.entities';
import { isValidMessage, isValidChartContext } from '../domain/interpretation.entities';
import { badRequest } from '@/backend/core/errors/http-errors';

export async function* interpretChartUseCase(
  message: string,
  context: ChartContext,
  chatHistory: Message[] = [],
): AsyncGenerator<string, void, unknown> {
  if (!isValidMessage(message)) {
    throw badRequest('Message cannot be empty');
  }

  if (!isValidChartContext(context)) {
    throw badRequest('Invalid chart context');
  }

  yield* interpretChart(message, context, chatHistory);
}
