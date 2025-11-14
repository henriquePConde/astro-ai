'use client';

import { AppHeaderContainer } from '@/shared/components/app-header/app-header.container';
import { GeocentricSystem } from '@/shared/components/solar-system/geocentric-system';
import { IntroSection } from '../intro-section';
import { ChartExperienceContainer } from '../chart-experience/chart-experience.container';
import { useIntroSectionState } from '../intro-section/hooks/use-intro-section-state';
import { useSectionControls } from '../intro-section/hooks/use-section-controls';
import { useHomePageHandlers } from './hooks/use-home-page-handlers.state';
import { useProtectedRoute } from './hooks/use-protected-route.state';
import { HomePageView } from './home-page.view';

export function HomePageContainer() {
  const { shouldRender } = useProtectedRoute();

  const {
    currentSection,
    introFinished,
    setIntroFinished,
    handleSkipIntro,
    scrolling,
    setScrolling,
    setCurrentSection,
  } = useIntroSectionState();

  useSectionControls({
    introFinished,
    currentSection,
    scrolling,
    setScrolling,
    setCurrentSection,
  });

  const { handleIntroEnd, handleNewChart } = useHomePageHandlers({
    setIntroFinished,
    setCurrentSection,
  });

  // Don't render content if user is not authenticated
  if (!shouldRender) {
    return null;
  }

  return (
    <HomePageView
      headerContent={<AppHeaderContainer />}
      solarSystemContent={<GeocentricSystem onIntroEnd={handleIntroEnd} />}
      introContent={
        <IntroSection
          currentSection={currentSection}
          introFinished={introFinished}
          onSkip={handleSkipIntro}
        />
      }
      chartExperienceContent={
        <ChartExperienceContainer
          currentSection={currentSection}
          introFinished={introFinished}
          onNewChart={handleNewChart}
        />
      }
      currentSection={currentSection}
    />
  );
}
