'use client';

import { AppHeaderContainer } from '@/shared/components/app-header/app-header.container';
import { GeocentricSystem } from '@/shared/components/solar-system/geocentric-system';
import { IntroSection } from '../intro-section';
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
    />
  );
}
