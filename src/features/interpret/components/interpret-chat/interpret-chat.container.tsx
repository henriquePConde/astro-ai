'use client';

import { useState } from 'react';
import { InterpretChatView } from './interpret-chat.view';
import { useInterpret } from '../../hooks/use-interpret.mutation';

export function InterpretChatContainer() {
  const [message, setMessage] = useState('Explain my Sun and Moon.');
  const [output, setOutput] = useState('');
  const interpret = useInterpret();

  const handleSend = async () => {
    const text = await interpret.mutateAsync({ message });
    setOutput(text);
  };

  return (
    <InterpretChatView
      message={message}
      setMessage={setMessage}
      output={output}
      loading={interpret.isPending}
      onSend={handleSend}
    />
  );
}


