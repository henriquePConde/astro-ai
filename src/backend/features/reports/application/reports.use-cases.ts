import { makeReportsRepo } from '../infra/reports.repo';
import { transformChartData, toSimpleChartData } from '../infra/report-data-transform.service';
import {
  generateIntroduction,
  generatePersonalityAndIdentity,
  generateEmotionalNeedsAndSecurity,
  generateCommunicationAndThinking,
  generateLoveAndRelationships,
  generateDriveAndAmbition,
  generateGrowthAndChallenges,
  generateTransformationAndHealing,
  generateLifeThemesAndGuidance,
} from '../infra/report-generation.service';
import { calculateChart } from '@/backend/features/calculate';
import { checkDailyLimit } from '@/backend/features/limits';
import type { BirthData } from '@/backend/features/calculate/domain/calculate.entities';
import type { ReportContent, ReportJob } from '../domain/reports.entities';
import { reportDto, reportsListDto } from '../http/reports.schemas';
import { notFound } from '@/backend/core/errors/http-errors';
import { env } from '@/backend/core/config/env';
import { getMockReportSections } from '../infra/report.mocks';

const USE_REPORT_MOCKS = (env.REPORTS_USE_MOCKS ?? '').toLowerCase() === 'true';

const SECTION_ORDER: Array<keyof ReportContent> = [
  'introduction',
  'personalityAndIdentity',
  'emotionalNeedsAndSecurity',
  'communicationAndThinking',
  'loveAndRelationships',
  'driveAndAmbition',
  'growthAndChallenges',
  'transformationAndHealing',
  'lifeThemesAndGuidance',
];

async function generateSectionText(
  key: keyof ReportContent,
  transformedData: any,
): Promise<string> {
  let text = '';

  switch (key) {
    case 'introduction':
      for await (const chunk of generateIntroduction(transformedData)) {
        text += chunk;
      }
      break;
    case 'personalityAndIdentity':
      for await (const chunk of generatePersonalityAndIdentity(transformedData)) {
        text += chunk;
      }
      break;
    case 'emotionalNeedsAndSecurity':
      for await (const chunk of generateEmotionalNeedsAndSecurity(transformedData)) {
        text += chunk;
      }
      break;
    case 'communicationAndThinking':
      for await (const chunk of generateCommunicationAndThinking(transformedData)) {
        text += chunk;
      }
      break;
    case 'loveAndRelationships':
      for await (const chunk of generateLoveAndRelationships(transformedData)) {
        text += chunk;
      }
      break;
    case 'driveAndAmbition':
      for await (const chunk of generateDriveAndAmbition(transformedData)) {
        text += chunk;
      }
      break;
    case 'growthAndChallenges':
      for await (const chunk of generateGrowthAndChallenges(transformedData)) {
        text += chunk;
      }
      break;
    case 'transformationAndHealing':
      for await (const chunk of generateTransformationAndHealing(transformedData)) {
        text += chunk;
      }
      break;
    case 'lifeThemesAndGuidance':
      for await (const chunk of generateLifeThemesAndGuidance(transformedData)) {
        text += chunk;
      }
      break;
    default:
      break;
  }

  return text;
}

async function prepareReportContext(birthData: BirthData) {
  const chartData = await calculateChart(birthData);
  const transformedData = transformChartData(chartData);
  return { chartData, transformedData };
}

export async function generateReport(userId: string, birthData: BirthData, personName: string) {
  // Respect existing rate-limit logic (your own ID is already bypassed via env)
  await checkDailyLimit(userId);

  // ✅ Mock mode: no OpenAI, no streaming, just deterministic fake content
  if (USE_REPORT_MOCKS) {
    const mockSections: ReportContent = getMockReportSections();

    const repo = makeReportsRepo();
    const mockReport = await repo.create(userId, personName, birthData, mockSections);

    return reportDto.parse(mockReport);
  }

  // ✅ Real mode (unchanged): uses OpenAI to stream/generate real sections
  const { transformedData } = await prepareReportContext(birthData);

  // Generate all sections sequentially
  const sections: ReportContent = {
    introduction: '',
    personalityAndIdentity: '',
    emotionalNeedsAndSecurity: '',
    communicationAndThinking: '',
    loveAndRelationships: '',
    driveAndAmbition: '',
    growthAndChallenges: '',
    transformationAndHealing: '',
    lifeThemesAndGuidance: '',
  };

  for (const key of SECTION_ORDER) {
    const text = await generateSectionText(key, transformedData);
    sections[key] = text;
  }

  const repo = makeReportsRepo();
  const report = await repo.create(userId, personName, birthData, sections);

  return reportDto.parse(report);
}

export async function listReports(userId: string) {
  const repo = makeReportsRepo();
  const reports = await repo.findAllForUser(userId);
  return reportsListDto.parse(reports);
}

export async function getReportById(id: string) {
  const repo = makeReportsRepo();
  const report = await repo.findById(id);

  if (!report) {
    throw notFound('Report not found');
  }

  return reportDto.parse(report);
}

export async function getReportWithChart(id: string) {
  const report = await getReportById(id);
  const chartResult = await calculateChart(report.birthData as BirthData);
  const chartData = toSimpleChartData(chartResult);

  return {
    content: report.content,
    chartData,
  };
}

// === Job-based, step-wise report generation ===

export async function createReportJob(userId: string, birthData: BirthData, personName: string) {
  // Enforce daily limit at job creation time
  await checkDailyLimit(userId);

  const repo = makeReportsRepo();
  const job = await repo.createJob(userId, personName, birthData);
  return job;
}

export async function getReportJob(jobId: string): Promise<ReportJob> {
  const repo = makeReportsRepo();
  const job = await repo.getJob(jobId);
  if (!job) {
    throw notFound('Report job not found');
  }
  return job;
}

export async function continueReportJob(job: ReportJob): Promise<ReportJob> {
  const repo = makeReportsRepo();

  if (job.status === 'completed' || job.status === 'failed') {
    return job;
  }

  const totalSteps = job.totalSteps || 1 + SECTION_ORDER.length;
  const partialContent: Partial<ReportContent> = job.partialContent ?? {};
  const meta = job.meta ?? {};

  // Step 0: prepare context
  if (job.currentStep === 0) {
    const { transformedData } = await prepareReportContext(job.birthData as BirthData);

    const updated = await repo.updateJob(job.id, {
      status: 'in_progress',
      currentStep: 1,
      totalSteps,
      progress: 1 / totalSteps,
      meta: {
        ...meta,
        transformedData,
      },
    });

    return updated;
  }

  // Steps 1..N: generate sections
  const stepIndex = job.currentStep - 1; // section index

  if (stepIndex >= SECTION_ORDER.length) {
    // Nothing left to do
    return job;
  }

  const sectionKey = SECTION_ORDER[stepIndex];
  const transformedData = (meta as any).transformedData;

  if (!transformedData) {
    throw new Error('Report job missing transformedData context');
  }

  const text = await generateSectionText(sectionKey, transformedData);

  const updatedPartial: Partial<ReportContent> = {
    ...partialContent,
    [sectionKey]: (partialContent as any)[sectionKey]
      ? `${(partialContent as any)[sectionKey]}${text}`
      : text,
  };

  const nextStep = job.currentStep + 1;
  // Last step corresponds to the last section in SECTION_ORDER
  const isLastStep = stepIndex === SECTION_ORDER.length - 1;

  const updatePayload: any = {
    currentStep: nextStep,
    totalSteps,
    progress: Math.min(1, nextStep / totalSteps),
    partialContent: updatedPartial,
    status: 'in_progress',
  };

  if (isLastStep) {
    const fullContent: ReportContent = {
      introduction: updatedPartial.introduction ?? '',
      personalityAndIdentity: updatedPartial.personalityAndIdentity ?? '',
      emotionalNeedsAndSecurity: updatedPartial.emotionalNeedsAndSecurity ?? '',
      communicationAndThinking: updatedPartial.communicationAndThinking ?? '',
      loveAndRelationships: updatedPartial.loveAndRelationships ?? '',
      driveAndAmbition: updatedPartial.driveAndAmbition ?? '',
      growthAndChallenges: updatedPartial.growthAndChallenges ?? '',
      transformationAndHealing: updatedPartial.transformationAndHealing ?? '',
      lifeThemesAndGuidance: updatedPartial.lifeThemesAndGuidance ?? '',
    };

    const report = await repo.create(job.userId, job.personName, job.birthData, fullContent);

    updatePayload.status = 'completed';
    updatePayload.reportId = report.id;
    updatePayload.progress = 1;
  }

  const updatedJob = await repo.updateJob(job.id, updatePayload);
  return updatedJob;
}
