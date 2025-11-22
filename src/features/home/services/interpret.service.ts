// src/features/home/services/interpret.service.ts

import { getAuthHeaders } from '@/shared/services/http/client';
import { normalizeHttpError, type HttpError } from '@/shared/services/http/error';
import type { ChatMessage } from './interpret.types';

export interface InterpretChartPayload {
  message: string;
  context: any;
  chatHistory: ChatMessage[];
  chartId?: string;
}

/**
 * Prepares request headers using the axios client's auth mechanism.
 * This ensures we use the same auth headers as other axios requests.
 * Uses the shared getAuthHeaders function from the axios client.
 */
async function prepareRequestHeaders(): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'text/plain',
  };

  // Get auth headers using the same mechanism as axios client interceptors
  const authHeaders = await getAuthHeaders();
  Object.assign(headers, authHeaders);

  return headers;
}

/**
 * Calls the /api/calculate/interpret endpoint.
 *
 * - Backend expects: { message: string, context: any, chatHistory: ChatMessage[] }
 * - Backend always responds as a text stream (ReadableStream of chunks).
 *
 * Uses the axios client's auth mechanism (via getAuthHeaders) to ensure
 * consistent authentication with other axios requests. However, the actual
 * HTTP request uses fetch instead of axios because:
 * 1. Axios doesn't support streaming responses in browser environments
 * 2. We need to process the response as a stream chunk-by-chunk
 * 3. Fetch's ReadableStream API is the standard way to handle streaming in browsers
 *
 * The request uses the same auth headers that the axios client would use,
 * ensuring consistency across the application.
 *
 * If `onChunk` is provided, we stream and feed chunks into it.
 * Otherwise we just accumulate everything and return the full text.
 */
export async function interpretChart(
  payload: InterpretChartPayload,
  onChunk?: (chunk: string) => void,
): Promise<string> {
  const { message, context, chatHistory, chartId } = payload;

  const body: any = {
    message,
    context,
    chatHistory,
  };
  if (chartId) {
    body.chartId = chartId;
  }

  // Prepare request headers using axios client's auth mechanism
  // This ensures we get the same auth headers as other axios requests
  const headers = await prepareRequestHeaders();

  // Use fetch for streaming (axios doesn't support streaming in browser)
  // but with the headers prepared by the axios client's auth mechanism
  // Note: This is a Next.js API route (relative path), not the external API
  const res = await fetch('/api/calculate/interpret', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    // Normalize error to match axios client error shape
    const errorText = await res.text().catch(() => 'Unknown error');
    const normalized: HttpError = {
      status: res.status,
      message:
        res.status === 401
          ? 'Unauthorized: please sign in to use the interpreter.'
          : errorText || `Interpret API error: ${res.status}`,
      data: errorText,
    };
    throw normalizeHttpError(normalized);
  }

  // The route always streams text/plain
  const reader = res.body?.getReader();
  if (!reader) {
    // Fallback: no stream for some reason, just get text
    const fallback = await res.text();
    if (onChunk && fallback) onChunk(fallback);
    return fallback;
  }

  const decoder = new TextDecoder();
  let full = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      if (!chunk) continue;

      full += chunk;
      if (onChunk) {
        onChunk(chunk);
      }
    }
  } finally {
    reader.releaseLock();
  }

  return full;
}
