// src/features/home/services/interpret.service.ts

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

/**
 * Calls the /api/calculate/interpret endpoint.
 *
 * - Backend expects:
 *   { message: string, context: any, chatHistory: ChatMessage[] }
 * - Backend always responds as a text stream (ReadableStream of chunks).
 *
 * If `onChunk` is provided, we stream and feed chunks into it.
 * Otherwise we just accumulate everything and return the full text.
 */
export async function interpretChart(
  message: string,
  context: any,
  history: ChatMessage[],
  onChunk?: (chunk: string) => void,
): Promise<string> {
  const body = {
    message,
    context,
    chatHistory: history,
  };

  const res = await fetch('/api/calculate/interpret', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    // Surface 401 nicely (user must be logged in)
    if (res.status === 401) {
      throw new Error('Unauthorized: please sign in to use the interpreter.');
    }
    throw new Error(`Interpret API error: ${res.status}`);
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

  return full;
}
