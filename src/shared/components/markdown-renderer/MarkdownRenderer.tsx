'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ReactMarkdown = dynamic(() => import('react-markdown'), { ssr: false });

interface MarkdownRendererProps {
  content: string;
  colorMode?: 'dark' | 'light';
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  colorMode = 'light',
}) => {
  // Choose classes based on color mode
  // For PDF (dark mode), use rgba(13, 12, 34, 0.8) for text
  const textClass = colorMode === 'dark' ? '' : 'text-white/90';
  const textSoftClass = colorMode === 'dark' ? '' : 'text-white/80';
  const textColorStyle = colorMode === 'dark' ? { color: 'rgba(13, 12, 34, 0.8)' } : {};
  const blockquoteClass =
    colorMode === 'dark'
      ? 'border-l-4 border-[rgba(138,43,226,0.3)] pl-4 my-4 italic'
      : 'border-l-4 border-[rgba(138,43,226,0.3)] pl-4 my-4 italic text-white/70';
  const blockquoteColorStyle = colorMode === 'dark' ? { color: 'rgba(13, 12, 34, 0.8)' } : {};

  return (
    <div className={`markdown prose max-w-none ${colorMode === 'dark' ? 'prose-invert' : ''}`}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className={`text-2xl font-bold mb-4 ${textClass}`} style={textColorStyle}>
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className={`text-xl font-bold mb-3 ${textClass}`} style={textColorStyle}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className={`text-lg font-bold mb-2 ${textClass}`} style={textColorStyle}>
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className={`mb-4 leading-relaxed ${textSoftClass}`} style={textColorStyle}>
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className={`list-disc pl-6 mb-4 space-y-2 ${textSoftClass}`} style={textColorStyle}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              className={`list-decimal pl-6 mb-4 space-y-2 ${textSoftClass}`}
              style={textColorStyle}
            >
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className={textSoftClass} style={textColorStyle}>
              {children}
            </li>
          ),
          strong: ({ children }) => (
            <strong className={`font-bold ${textClass}`} style={textColorStyle}>
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className={`italic ${textClass}`} style={textColorStyle}>
              {children}
            </em>
          ),
          blockquote: ({ children }) => (
            <blockquote className={blockquoteClass} style={blockquoteColorStyle}>
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
