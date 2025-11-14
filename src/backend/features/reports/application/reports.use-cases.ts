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
import type { ReportContent } from '../domain/reports.entities';
import { reportDto, reportsListDto } from '../http/reports.schemas';
import { notFound } from '@/backend/core/errors/http-errors';
import { env } from '@/backend/core/config/env';
import { getMockReportSections } from '../infra/report.mocks';

const USE_REPORT_MOCKS = (env.REPORTS_USE_MOCKS ?? '').toLowerCase() === 'true';

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

  // Calculate chart
  const chartData = await calculateChart(birthData);

  // Transform data for report generation
  const transformedData = transformChartData(chartData);

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

  for await (const chunk of generateIntroduction(transformedData)) {
    sections.introduction += chunk;
  }

  for await (const chunk of generatePersonalityAndIdentity(transformedData)) {
    sections.personalityAndIdentity += chunk;
  }

  for await (const chunk of generateEmotionalNeedsAndSecurity(transformedData)) {
    sections.emotionalNeedsAndSecurity += chunk;
  }

  for await (const chunk of generateCommunicationAndThinking(transformedData)) {
    sections.communicationAndThinking += chunk;
  }

  for await (const chunk of generateLoveAndRelationships(transformedData)) {
    sections.loveAndRelationships += chunk;
  }

  for await (const chunk of generateDriveAndAmbition(transformedData)) {
    sections.driveAndAmbition += chunk;
  }

  for await (const chunk of generateGrowthAndChallenges(transformedData)) {
    sections.growthAndChallenges += chunk;
  }

  for await (const chunk of generateTransformationAndHealing(transformedData)) {
    sections.transformationAndHealing += chunk;
  }

  for await (const chunk of generateLifeThemesAndGuidance(transformedData)) {
    sections.lifeThemesAndGuidance += chunk;
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
