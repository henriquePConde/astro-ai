'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MarkdownRendererView } from './markdown-renderer.view';
import { MARKDOWN_RENDERER_CONFIG } from './markdown-renderer.config';
import type { MarkdownRendererContainerProps } from './markdown-renderer.types';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

export function MarkdownRendererContainer({
  content,
  colorMode = MARKDOWN_RENDERER_CONFIG.colorMode.default,
}: MarkdownRendererContainerProps) {
  return (
    <MarkdownRendererView
      content={content}
      colorMode={colorMode}
      config={MARKDOWN_RENDERER_CONFIG}
      ReactMarkdownComponent={ReactMarkdown as React.ComponentType<any>}
    />
  );
}
