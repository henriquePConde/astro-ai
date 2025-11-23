import { useEffect } from 'react';
import { useIsDesktop } from '@/shared/hooks/use-is-desktop';

interface UseSectionControlsProps {
  introFinished: boolean;
  currentSection: number;
  scrolling: boolean;
  setScrolling: (value: boolean) => void;
  setCurrentSection: (value: number | ((prev: number) => number)) => void;
}

export function useSectionControls({
  introFinished,
  currentSection,
  scrolling,
  setScrolling,
  setCurrentSection,
}: UseSectionControlsProps) {
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!introFinished || !isDesktop) {
      // Cleanup: remove listener if intro not finished or on non-desktop devices
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      if (scrolling) return;

      // If we're in section 2 (form/chart), prevent section changes
      if (currentSection === 2) {
        return;
      }

      setScrolling(true);
      e.preventDefault();

      setCurrentSection((prev) => {
        const direction = e.deltaY > 0 ? 1 : -1;
        // Only allow scrolling between sections 0 and 1 if not in section 2
        const newSection = Math.max(0, Math.min(prev + direction, 1));
        return newSection;
      });

      setTimeout(() => setScrolling(false), 800);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [scrolling, introFinished, currentSection, setScrolling, setCurrentSection, isDesktop]);
}
