export async function interpretStream(payload: {
  message: string;
  context?: Record<string, unknown>;
  chatHistory?: unknown[];
}) {
  const res = await fetch('/api/calculate/interpret', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok || !res.body) throw new Error('Failed to start interpretation');
  return res.body.getReader();
}

export async function interpret(payload: {
  message: string;
  context?: Record<string, unknown>;
  chatHistory?: unknown[];
}) {
  const reader = await interpretStream(payload);
  const decoder = new TextDecoder();
  let fullText = '';
  // Read to completion
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    fullText += decoder.decode(value, { stream: true });
  }
  fullText += new TextDecoder().decode();
  return fullText;
}
