import type { 
  BaseResponse,
  CategoryCount,
  PickingStatistics,
  DetectionStatistics,
  TrendData
} from '@/shared/api';

// Base Stats Params
interface BaseStatsParams {
  /** 스테이션 ID 목록 (기본: 전체) */
  station_ids?: string[] | null;
}

interface BaseStatsResponse extends BaseResponse {
  /** 픽업 시도 통계 */
  picking_attempts: PickingStatistics;
  /** 감지 객체 통계 */
  detected_objects: DetectionStatistics;
}

// Daily Stats Types
export interface GetDailyStatsParams extends BaseStatsParams {
  /** 날짜 (YYYY-MM-DD) */
  date: string;
}

export interface GetDailyStatsResponse extends BaseStatsResponse {
  /** 시간별 트렌드 데이터 */
  hourly_trends: any[];
}

// Weekly Stats Types
export interface GetWeeklyStatsParams extends BaseStatsParams {
  /** 주차 시작일 (YYYY-MM-DD) */
  start_date: string;
}

export interface GetWeeklyStatsResponse extends BaseStatsResponse {
  /** 일별 트렌드 데이터 */
  daily_trends: any[];
}

// Monthly Stats Types
export interface GetMonthlyStatsParams extends BaseStatsParams {
  /** 년월 (YYYY-MM) */
  month: string;
}

export interface GetMonthlyStatsResponse extends BaseStatsResponse {
  /** 일별 트렌드 데이터 */
  daily_trends: any[];
}

// Yearly Stats Types
export interface GetYearlyStatsParams extends BaseStatsParams {
  /** 년도 (YYYY) */
  year: string;
}

export interface GetYearlyStatsResponse extends BaseStatsResponse {
  /** 월별 트렌드 데이터 */
  monthly_trends: any[];
}

// Custom Period Stats Types
export interface GetCustomPeriodStatsParams extends GetPeriodStatisticsParams {}
export interface GetCustomPeriodStatsResponse extends GetPeriodStatisticsResponse {}

// Stats Comparison Types
export interface GetStatsComparisonParams {
  /** 비교 기간 1 */
  period1: GetPeriodStatisticsParams;
  /** 비교 기간 2 */
  period2: GetPeriodStatisticsParams;
}

export interface GetStatsComparisonResponse extends BaseResponse {
  /** 기간 1 통계 */
  period1_stats: GetPeriodStatisticsResponse;
  /** 기간 2 통계 */
  period2_stats: GetPeriodStatisticsResponse;
}

// Stats Trends Types
export interface GetStatsTrendsParams extends GetPeriodStatisticsParams {}
export interface GetStatsTrendsResponse extends GetPeriodStatisticsResponse {}

// Stats Breakdown Types
export interface GetStatsBreakdownParams extends GetPeriodStatisticsParams {}
export interface GetStatsBreakdownResponse extends GetPeriodStatisticsResponse {}

// Period Statistics Types
export interface GetPeriodStatisticsParams {
  /** 시작 날짜 (YYYY-MM-DDTHH:MM:SS) */
  start_date: string;
  /** 종료 날짜 (YYYY-MM-DDTHH:MM:SS) */
  end_date: string;
  /** 스테이션 ID 목록 (기본: 전체) */
  station_ids?: string[] | null;
  /** 집계 단위 (daily/hourly) */
  granularity?: 'daily' | 'hourly';
}

export interface GetPeriodStatisticsResponse extends BaseResponse {
  /** 요청 기간 정보 */
  period: GetPeriodStatisticsParams;
  /** 기간 내 총 픽업 시도 통계 */
  picking_attempts: PickingStatistics;
  /** 기간 내 총 감지 객체 통계 */
  detected_objects: DetectionStatistics;
  /** 일별 트렌드 데이터 */
  daily_trends?: any[];
  /** 시간별 트렌드 데이터 */
  hourly_trends?: any[];
}

// Daily Reports Types
export interface GetDailyReportsParams {
  /** 시작 날짜 */
  start_date: string;
  /** 종료 날짜 */
  end_date: string;
  /** 스테이션 ID 필터 */
  station_id?: string | null;
  /** 페이지 번호 */
  page?: number;
  /** 페이지당 문서 수 */
  limit?: number;
}

export interface GenerateDailyReportsParams {
  /** 시작 날짜 */
  start_date: string;
  /** 종료 날짜 */
  end_date: string;
  /** 스테이션 ID 목록 */
  station_ids?: string[] | null;
}

// Hourly Reports Types
export interface GetHourlyReportsParams {
  /** 시작 시간 */
  start_datetime: string;
  /** 종료 시간 */
  end_datetime: string;
  /** 스테이션 ID 필터 */
  station_id?: string | null;
  /** 페이지 번호 */
  page?: number;
  /** 페이지당 문서 수 */
  limit?: number;
}

export interface GenerateHourlyReportsParams {
  /** 시작 시간 */
  start_datetime: string;
  /** 종료 시간 */
  end_datetime: string;
  /** 스테이션 ID 목록 */
  station_ids?: string[] | null;
}

// Summary Types
export interface GetTodaySummaryParams {
  /** 스테이션 ID 목록 */
  station_ids?: string[] | null;
}

export interface GetWeekSummaryParams {
  /** 스테이션 ID 목록 */
  station_ids?: string[] | null;
}

export interface GetMonthSummaryParams {
  /** 스테이션 ID 목록 */
  station_ids?: string[] | null;
}

// Detailed Response Types based on OpenAPI schema



// Daily Report interface
interface DailyReport {
  date: string;
  station_id: string;
  picking_total: number;
  detection_total: number;
  picking_rate: number;
  [key: string]: any;
}

// Hourly Report interface
interface HourlyReport {
  hour: string;
  station_id: string;
  picking_total: number;
  detection_total: number;
  picking_rate: number;
  [key: string]: any;
}

// Pagination interface
interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

// Summary Response interfaces
interface TodaySummaryData {
  date: string;
  total_picking_attempts: number;
  total_detected_objects: number;
  picking_rate: number;
  picking_attempts: PickingStatistics;
  detected_objects: DetectionStatistics;
  stations_summary: string[];
}

interface WeekSummaryData {
  week_start: string;
  week_end: string;
  total_picking_attempts: number;
  total_detected_objects: number;
  picking_rate: number;
  picking_attempts: PickingStatistics;
  detected_objects: DetectionStatistics;
  daily_trends: TrendData[];
  stations_summary: string[];
}

interface MonthSummaryData {
  month: string;
  month_start: string;
  month_end: string;
  total_picking_attempts: number;
  total_detected_objects: number;
  picking_rate: number;
  average_daily_picking: number;
  average_daily_detection: number;
  picking_attempts: PickingStatistics;
  detected_objects: DetectionStatistics;
  daily_trends: TrendData[];
  stations_summary: string[];
}

export interface GetTodaySummaryResponse extends BaseResponse {
  data: TodaySummaryData;
}

export interface GetWeekSummaryResponse extends BaseResponse {
  data: WeekSummaryData;
}

export interface GetMonthSummaryResponse extends BaseResponse {
  data: MonthSummaryData;
}

// Reports Response interfaces
export interface GetDailyReportsResponse extends BaseResponse {
  pagination: PaginationInfo;
  data: DailyReport[];
}

export interface GetHourlyReportsResponse extends BaseResponse {
  pagination: PaginationInfo;
  data: HourlyReport[];
}

interface CacheStatusData {
  cache_size: number;
  hit_rate: number;
  miss_rate: number;
  keys_count: number;
  [key: string]: any;
}

// Cache Status Response
export interface GetCacheStatusResponse extends BaseResponse {
  data: CacheStatusData;
}

// Operation Response types
export interface PostDailyReportsResponse extends BaseResponse {}
export interface PostHourlyReportsResponse extends BaseResponse {}
export interface PostCacheClearResponse extends BaseResponse {}
export interface PostCacheInvalidateDateRangeResponse extends BaseResponse {}
export interface PostCacheInvalidateStationResponse extends BaseResponse {}

// Legacy type alias for backward compatibility
export type GetPeriodReponse = GetPeriodStatisticsResponse;