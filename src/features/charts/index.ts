/**
 * Public API for the charts feature.
 *
 * Responsibilities:
 * - List and fetch persisted charts (list/detail)
 * - Provide the entry container for the /charts/[id] page (`ChartViewContainer`)
 *
 * The *interactive* chart experience UI (wheel, AI tabs, report, layout)
 * lives in the home feature (`ChartExperienceContainer`). This feature only
 * adapts persisted chart detail data into that shared experience.
 */
export { ChartsListContainer } from './components/charts-list/charts-list.container';
export { ChartViewContainer } from './components/chart-view/chart-view.container';
export { useCharts, useChart } from './services/charts.queries';
export type {
  ChartsListFilters,
  ChartsListResponse,
  ChartDetailResponse,
} from './services/charts.service';
