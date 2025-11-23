'use client';

import { useEffect } from 'react';
import { AppHeaderContainer } from '@/shared/components/app-header/app-header.container';
import { GeocentricSystem } from '@/shared/components/solar-system/geocentric-system';
import { IntroSection } from '../intro-section';
import { ChartExperienceContainer } from '../chart-experience/chart-experience.container';
import { useIntroSectionState } from '../intro-section/hooks/use-intro-section-state';
import { useSectionControls } from '../intro-section/hooks/use-section-controls';
import { useHomePageHandlers } from './hooks/use-home-page-handlers.state';
import { useHomeStartSection } from './hooks/use-home-start-section.state';
import { HomePageView } from './home-page.view';

export function HomePageContainer() {
  const {
    currentSection,
    introFinished,
    setIntroFinished,
    handleSkipIntro,
    scrolling,
    setScrolling,
    setCurrentSection,
  } = useIntroSectionState();

  const { startAtForm } = useHomeStartSection();

  // If we arrive on the home page in \"start at form\" mode (e.g. from the chart detail page),
  // immediately skip the intro and show the birth chart form section.
  useEffect(() => {
    if (startAtForm) {
      handleSkipIntro();
    }
  }, [startAtForm, handleSkipIntro]);

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
