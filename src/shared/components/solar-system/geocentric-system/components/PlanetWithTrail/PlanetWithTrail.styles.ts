export const styles = {
  tooltip: () => ({
    background: 'rgba(0, 0, 0, 0.75)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    pointerEvents: 'none' as const,
    whiteSpace: 'nowrap' as const,
  }),
} as const;
