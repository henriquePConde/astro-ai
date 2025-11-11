'use client';

import React from 'react';
import type { Components } from 'react-markdown';
import type { MarkdownRendererViewProps } from './markdown-renderer.types';
import { styles, getContainerClasses } from './markdown-renderer.styles';

interface MarkdownRendererViewInternalProps extends MarkdownRendererViewProps {
  ReactMarkdownComponent: React.ComponentType<any>;
}

export function MarkdownRendererView({
  content,
  colorMode,
  config,
  ReactMarkdownComponent,
}: MarkdownRendererViewInternalProps) {
  const containerClasses = getContainerClasses(colorMode, config);

  const markdownComponents: Components = {
    h1: ({ children }) => {
      const { className, style } = styles.h1(colorMode, config);
      return (
        <h1 className={className} style={style}>
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      const { className, style } = styles.h2(colorMode, config);
      return (
        <h2 className={className} style={style}>
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const { className, style } = styles.h3(colorMode, config);
      return (
        <h3 className={className} style={style}>
          {children}
        </h3>
      );
    },
    p: ({ children }) => {
      const { className, style } = styles.p(colorMode, config);
      return (
        <p className={className} style={style}>
          {children}
        </p>
      );
    },
    ul: ({ children }) => {
      const { className, style } = styles.ul(colorMode, config);
      return (
        <ul className={className} style={style}>
          {children}
        </ul>
      );
    },
    ol: ({ children }) => {
      const { className, style } = styles.ol(colorMode, config);
      return (
        <ol className={className} style={style}>
          {children}
        </ol>
      );
    },
    li: ({ children }) => {
      const { className, style } = styles.li(colorMode, config);
      return (
        <li className={className} style={style}>
          {children}
        </li>
      );
    },
    strong: ({ children }) => {
      const { className, style } = styles.strong(colorMode, config);
      return (
        <strong className={className} style={style}>
          {children}
        </strong>
      );
    },
    em: ({ children }) => {
      const { className, style } = styles.em(colorMode, config);
      return (
        <em className={className} style={style}>
          {children}
        </em>
      );
    },
    blockquote: ({ children }) => {
      const { className, style } = styles.blockquote(colorMode, config);
      return (
        <blockquote className={className} style={style}>
          {children}
        </blockquote>
      );
    },
  };

  return (
    <div className={containerClasses}>
      <ReactMarkdownComponent components={markdownComponents}>{content}</ReactMarkdownComponent>
    </div>
  );
}
