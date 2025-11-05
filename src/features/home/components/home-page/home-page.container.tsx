'use client';

import { AppHeaderContainer } from '@/shared/components/app-header/app-header.container';
import { GeocentricSystem } from '@/shared/components/solar-system/geocentric-system';
import { IntroSection } from '../intro-section';
import { ChartExperienceContainer } from '../chart-experience/chart-experience.container';
import { useIntroSectionState } from '../intro-section/hooks/use-intro-section-state';
import { useSectionControls } from '../intro-section/hooks/use-section-controls';
import { HomePageView } from './home-page.view';

export function HomePageContainer() {
  const {
    currentSection,
    introFinished,
    hasSeenIntro,
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

  const handleIntroEnd = () => {
    console.log('[HomePageContainer] Animation completed, setting introFinished to true');
    setIntroFinished(true);
  };

  const handleNewChart = () => {
    if (hasSeenIntro) {
      setCurrentSection(2);
    } else {
      setCurrentSection(0);
      setIntroFinished(false);
    }
  };

  console.log('[HomePageContainer] Render:', {
    currentSection,
    introFinished,
    hasSeenIntro,
  });

  return (
    <HomePageView
      headerContent={<AppHeaderContainer />}
      solarSystemContent={<GeocentricSystem onIntroEnd={handleIntroEnd} />}
      introContent={
        !hasSeenIntro ? (
          <IntroSection
            currentSection={currentSection}
            introFinished={introFinished}
            onSkip={handleSkipIntro}
          />
        ) : null
      }
      chartExperienceContent={
        <ChartExperienceContainer
          currentSection={currentSection}
          introFinished={introFinished}
          hasSeenIntro={hasSeenIntro}
          onNewChart={handleNewChart}
        />
      }
    />
  );
}
