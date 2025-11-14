/**
 * Hook for computing PDF section data.
 * Component-level hook for derived state only.
 */
export function usePdfSections(reportData: Record<string, string>) {
  const sectionEntries = Object.entries(reportData).filter(([key]) => key !== 'introduction');
  const allSectionKeys = ['introduction', ...sectionEntries.map(([key]) => key)];
  const totalPages = allSectionKeys.length + 1;

  return {
    sectionEntries,
    allSectionKeys,
    totalPages,
  };
}
