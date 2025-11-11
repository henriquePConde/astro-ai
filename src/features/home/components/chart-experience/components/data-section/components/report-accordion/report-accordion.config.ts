export const REPORT_ACCORDION_CONFIG = {
  copy: {
    generating: 'Generating your report...',
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
