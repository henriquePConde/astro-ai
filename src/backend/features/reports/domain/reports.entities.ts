/**
 * Domain entities and business rules for the reports feature.
 */

export type ReportContent = {
  introduction: string;
  personalityAndIdentity: string;
  emotionalNeedsAndSecurity: string;
  communicationAndThinking: string;
  loveAndRelationships: string;
  driveAndAmbition: string;
  growthAndChallenges: string;
  transformationAndHealing: string;
  lifeThemesAndGuidance: string;
};

export type Report = {
  id: string;
  userId: string;
  personName: string;
  birthData: any;
  content: ReportContent;
  createdAt: Date;
  updatedAt: Date;
};

export type ReportJobStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export type ReportJobMeta = {
  // Serialized context for generation steps (e.g., transformed chart data)
  transformedData?: any;
};

export type ReportJob = {
  id: string;
  userId: string;
  personName: string;
  birthData: any;
  status: ReportJobStatus;
  currentStep: number;
  totalSteps: number;
  progress: number;
  errorMessage?: string | null;
  partialContent?: Partial<ReportContent> | null;
  meta?: ReportJobMeta | null;
  reportId?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Validates report content structure.
 */
export function isValidReportContent(content: any): content is ReportContent {
  return (
    typeof content === 'object' &&
    typeof content.introduction === 'string' &&
    typeof content.personalityAndIdentity === 'string' &&
    typeof content.emotionalNeedsAndSecurity === 'string' &&
    typeof content.communicationAndThinking === 'string' &&
    typeof content.loveAndRelationships === 'string' &&
    typeof content.driveAndAmbition === 'string' &&
    typeof content.growthAndChallenges === 'string' &&
    typeof content.transformationAndHealing === 'string' &&
    typeof content.lifeThemesAndGuidance === 'string'
  );
}
