export const REPORT_ACCORDION_CONFIG = {
  copy: {
    generatingTitle: 'Generating your report...',
    generatingSubtitle:
      'This can take a few minutes while we analyze your chart in depth. You can explore the AI interpreter while you wait.',
    generatingCta: 'Go to AI interpreter',
    downloadingTitle: 'Preparing your PDF download...',
    downloadingSubtitle:
      'We are rendering your chart and insights into a high-quality PDF. This can take up to a few minutes — feel free to read your report below or interact with the AI interpreter while you wait.',
    downloadingCta: 'Go to AI interpreter',
    noBirthData: 'Provide your birth details above to generate a personalized report.',
    sectionLabels: {
      introduction: 'Introduction',
      personalityAndIdentity: 'Personality & Identity',
      emotionalNeedsAndSecurity: 'Emotional Needs & Security',
      communicationAndThinking: 'Communication & Thinking',
      loveAndRelationships: 'Love & Relationships',
      driveAndAmbition: 'Drive & Ambition',
      growthAndChallenges: 'Growth & Challenges',
      transformationAndHealing: 'Transformation & Healing',
      lifeThemesAndGuidance: 'Life Themes & Guidance',
    },
  },
  ui: {
    accordion: {
      icon: '▶',
      transition: {
        duration: '0.4s',
        easing: 'cubic-bezier(0.4,0,0.2,1)',
        iconDuration: '0.2s',
      },
    },
  },
} as const;
