import type { BaseResponse } from '@/shared/api';

// Parameter types based on OpenAPI schema
export interface GetCurrentOperationStatusParams {
  /** 조회할 스테이션 ID들 (쉼표로 구분) */
  station_ids?: string | null;
}

export interface GetTodayOperationSummaryParams {
  /** 특정 스테이션 ID 필터 */
  station_id?: string | null;
}

export interface GetWeekOperationSummaryParams {
  /** 특정 스테이션 ID 필터 */
  station_id?: string | null;
}

export interface GetMonthOperationSummaryParams {
  /** 특정 스테이션 ID 필터 */
  station_id?: string | null;
}

export interface GetPeriodOperationStatisticsParams {
  /** 시작 날짜 (YYYY-MM-DDTHH:MM:SS) */
  start_date: string;
  /** 종료 날짜 (YYYY-MM-DDTHH:MM:SS) */
  end_date: string;
  /** 특정 스테이션 ID 필터 */
  station_id?: string | null;
  /** 통계 세분성 (summary/daily/hourly) */
  granularity?: string;
}

// Response types based on OpenAPI schema
// Note: OpenAPI responses are defined as {} (empty schema), so using generic structure
/** 스테이션 운영 상태 정보 */
interface StationOperationStatus {
  /** 스테이션 ID */
  station_id: string;
  /** 현재 운영 상태 */
  current_state: boolean;
  /** 마지막 업데이트 시간 */
  last_updated: string;
  /** 상태 메시지 */
  status: '운영중' | '정지';
}

/** 스테이션 운영 상태 맵 */
type StationsStatusMap = {
  [K in 'JSW' | 'R&T1' | 'R&T2' | 'R&T3' | 'SUNGNAM1' | 'SUNGNAM2' | 'SUNGNAM3']: StationOperationStatus;
};

/** 현재 운영 상태 응답 데이터 */
interface CurrentOperationStatusData {
  /** 현재 시간 */
  current_time: string;
  /** 스테이션별 상태 정보 */
  stations: StationsStatusMap;
}

export interface GetCurrentOperationStatusResponse extends BaseResponse {
  data: CurrentOperationStatusData;
}

/** 기간 정보 */
interface OperationPeriodInfo {
  /** 시작 시간 */
  start: string;
  /** 종료 시간 */
  end: string;
  /** 전체 시간 (hours) */
  total_hours: number;
}

/** 스테이션별 운영 통계 */
interface StationOperationStats {
  /** 스테이션 ID */
  station_id: string;
  /** 가동 시간 (hours) */
  uptime_hours: number;
  /** 정지 시간 (hours) */
  downtime_hours: number;
  /** 가동률 (%) */
  uptime_percentage: number;
  /** 상태 변경 횟수 */
  state_changes: number;
  /** 전체 집계 시간 (hours) */
  total_period_hours: number;
}

/** 스테이션별 운영 통계 맵 */
type StationOperationStatsMap = {
  [K in 'JSW' | 'R&T1' | 'R&T2' | 'R&T3' | 'SUNGNAM1' | 'SUNGNAM2' | 'SUNGNAM3']?: StationOperationStats;
};

/** 전체 운영 통계 */
interface TotalOperationStats {
  /** 전체 가동 시간 (hours) */
  total_uptime_hours: number;
  /** 전체 정지 시간 (hours) */
  total_downtime_hours: number;
  /** 전체 가동률 (%) */
  uptime_percentage: number;
  /** 전체 상태 변경 횟수 */
  total_state_changes: number;
  /** 활성 스테이션 수 */
  active_stations: number;
}

/** 운영 통계 데이터 기본 구조 */
interface OperationSummaryData {
  /** 기간 정보 */
  period: OperationPeriodInfo;
  /** 스테이션별 통계 */
  station_stats: StationOperationStatsMap;
  /** 전체 통계 */
  total_stats: TotalOperationStats;
}

/** 일간 운영 통계 데이터 */
type TodayOperationSummaryData = OperationSummaryData;

/** 주간 운영 통계 데이터 */
type WeekOperationSummaryData = OperationSummaryData;

/** 월간 운영 통계 데이터 */
type MonthOperationSummaryData = OperationSummaryData;

export interface GetTodayOperationSummaryResponse extends BaseResponse {
  data: TodayOperationSummaryData;
}

export interface GetWeekOperationSummaryResponse extends BaseResponse {
  data: WeekOperationSummaryData;
}

export interface GetMonthOperationSummaryResponse extends BaseResponse {
  data: MonthOperationSummaryData;
}

/** 기간별 운영 통계 데이터 */
type PeriodOperationStatisticsData = OperationSummaryData;

export interface GetPeriodOperationStatisticsResponse extends BaseResponse {
  data: PeriodOperationStatisticsData;
}


/** 서비스 헬스 체크 응답 */
export interface OperationStatisticsHealthResponse {
  /** 성공 여부 */
  success: boolean;
  /** 서비스 이름 */
  service: string;
  /** 서비스 상태 */
  status: 'healthy' | 'unhealthy';
  /** 에러 메시지 (실패 시) */
  error?: string;
}

// Legacy interfaces for backward compatibility (can be removed if not used)
export interface OperationStatsFilters {
  station_ids?: string;
  start_date?: string;
  end_date?: string;
  station_id?: string;
  granularity?: 'summary' | 'daily' | 'hourly';
}