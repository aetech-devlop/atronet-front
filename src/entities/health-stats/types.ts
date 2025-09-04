import type { 
  BaseResponse, 
  AlertsStats, 
  SystemHealthStats, 
  MachineHealthStats,
  PickingStatistics,
  DetectionStatistics,
  AlertDetails,
  TrendData
} from '@/shared/api';

// Period Health Statistics Types
export interface GetPeriodHealthStatisticsParams {
  /** 시작 날짜 (YYYY-MM-DDTHH:MM:SS) */
  start_date: string;
  /** 종료 날짜 (YYYY-MM-DDTHH:MM:SS) */
  end_date: string;
  /** 스테이션 ID 목록 (기본: 전체) */
  station_ids?: string[] | null;
}

export interface GetPeriodHealthStatisticsResponse extends BaseResponse {
  /** 조회 기간 정보 */
  period_info: any;
  /** 시스템 헬스 통계 */
  system_health: SystemHealthStats;
  /** 머신 헬스 통계 */
  machine_health: MachineHealthStats;
  /** 알람 통계 */
  alerts: AlertsStats;
}

// Summary Types
export interface GetTodayHealthSummaryParams {
  /** 스테이션 ID 목록 */
  station_ids?: string[] | null;
}

export interface GetWeekHealthSummaryParams {
  /** 스테이션 ID 목록 */
  station_ids?: string[] | null;
}

export interface GetMonthHealthSummaryParams {
  /** 스테이션 ID 목록 */
  station_ids?: string[] | null;
}

// Component-specific Types
export interface GetSystemHealthOnlyParams {
  /** 시작 날짜 */
  start_date: string;
  /** 종료 날짜 */
  end_date: string;
  /** 스테이션 ID 목록 */
  station_ids?: string[] | null;
}

export interface GetMachineHealthOnlyParams {
  /** 시작 날짜 */
  start_date: string;
  /** 종료 날짜 */
  end_date: string;
  /** 스테이션 ID 목록 */
  station_ids?: string[] | null;
}

export interface GetAlertsStatsOnlyParams {
  /** 시작 날짜 */
  start_date: string;
  /** 종료 날짜 */
  end_date: string;
  /** 스테이션 ID 목록 */
  station_ids?: string[] | null;
}

// Response Types based on OpenAPI schema

// Daily Trend interface
type DailyTrend = TrendData;

// Base Health Summary interface
interface BaseHealthSummary {
  total_picking_attempts: number;
  total_detected_objects: number;
  picking_rate: number;
  picking_attempts: PickingStatistics;
  detected_objects: DetectionStatistics;
  stations_summary: string[];
}

// Today Health Summary Data interface
interface TodayHealthSummaryData extends BaseHealthSummary {
  date: string;
}

// Week Health Summary Data interface
interface WeekHealthSummaryData extends BaseHealthSummary {
  week_start: string;
  week_end: string;
  daily_trends: DailyTrend[];
}

// Month Health Summary Data interface
interface MonthHealthSummaryData extends BaseHealthSummary {
  month: string;
  month_start: string;
  month_end: string;
  daily_trends: DailyTrend[];
  average_daily_picking: number;
  average_daily_detection: number;
}


export interface SystemHealthData {
  timestamp: {
    $date: string;
  };
  metadata: {
    station_id: string;
  };
  _id: {
    $oid: string;
  };
  usage: {
    cpu: number;
    gpu: number;
    ram: number;
  };
  temp: {
    cpu: number;
    gpu: number;
    camera_left: number;
    camera_right: number;
  };
}

export interface MachineHealthData {
  timestamp: {
    $date: string;
  };
  station_id: string;
  vacuum: number;
  conveyor_speed: number;
  _id: {
    $oid: string;
  };
}


interface AlertStats {
  _id: {
    $oid: string;
  };
  timestamp: {
    $date: string;
  };
  station_id: string;
  severity: 'warning' | 'critical' | 'info';
  type: string;
  details: AlertDetails;
}


// Summary Response interfaces based on OpenAPI
export interface GetTodayHealthSummaryResponse extends BaseResponse {
  data: TodayHealthSummaryData;
}

export interface GetWeekHealthSummaryResponse extends BaseResponse {
  data: WeekHealthSummaryData;
}

export interface GetMonthHealthSummaryResponse extends BaseResponse {
  data: MonthHealthSummaryData;
}

// Component-specific Response interfaces based on OpenAPI
export interface GetSystemHealthOnlyResponse extends BaseResponse {
  results: SystemHealthData[];
}

export interface GetMachineHealthOnlyResponse extends BaseResponse {
  results: MachineHealthData[];
}

export interface GetAlertsStatsOnlyResponse extends BaseResponse {
  results: AlertStats[];
}