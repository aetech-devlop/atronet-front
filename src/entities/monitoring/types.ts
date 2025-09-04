import type { PaginatedResponse } from '@/shared/api';

// Object Logs Types
export interface GetObjectLogsParams {
  /** 스테이션 ID 필터 */
  station_id?: string | null;
  /** 주요 카테고리 필터 */
  major_category?: string | null;
  /** 픽업 여부 필터 */
  is_picked?: boolean | null;
  /** 시작 시간 (YYYY-MM-DDTHH:MM:SS) */
  start_time?: string | null;
  /** 종료 시간 (YYYY-MM-DDTHH:MM:SS) */
  end_time?: string | null;
  /** 페이지 번호 */
  page?: number;
  /** 페이지당 문서 수 */
  limit?: number;
}

// System Health Types
export interface GetSystemHealthParams {
  /** 스테이션 ID 필터 */
  station_id?: string | null;
  /** 시작 시간 */
  start_time?: string | null;
  /** 종료 시간 */
  end_time?: string | null;
  /** 페이지 번호 */
  page?: number;
  /** 페이지당 문서 수 */
  limit?: number;
}

// Alerts Types
export interface GetAlertsParams {
  /** 스테이션 ID 필터 */
  station_id?: string | null;
  /** 심각도 필터 (warning/critical) */
  severity?: string | null;
  /** 알람 타입 필터 */
  alert_type?: string | null;
  /** 시작 시간 */
  start_time?: string | null;
  /** 종료 시간 */
  end_time?: string | null;
  /** 페이지 번호 */
  page?: number;
  /** 페이지당 문서 수 */
  limit?: number;
}

// Operation State Types
export interface GetOperationStateParams {
  /** 스테이션 ID 필터 */
  station_id?: string | null;
  /** 작동 상태 필터 */
  state?: boolean | null;
  /** 시작 시간 */
  start_time?: string | null;
  /** 종료 시간 */
  end_time?: string | null;
  /** 페이지 번호 */
  page?: number;
  /** 페이지당 문서 수 */
  limit?: number;
}

// Machine Health Types
export interface GetMachineHealthParams {
  /** 스테이션 ID 필터 */
  station_id?: string | null;
  /** 시작 시간 */
  start_time?: string | null;
  /** 종료 시간 */
  end_time?: string | null;
  /** 페이지 번호 */
  page?: number;
  /** 페이지당 문서 수 */
  limit?: number;
}

// Response Types
/** 객체 감지 로그 데이터 */
interface ObjectLog {
  /** 타임스탬프 */
  timestamp: string;
  /** 메타데이터 */
  metadata: {
    /** 스테이션 ID */
    station_id: string;
  };
  /** 수집 시간 */
  _collected_at: string;
  /** 주요 카테고리 */
  major_category: string;
  /** 높이 */
  height: number;
  /** 너비 */
  width: number;
  /** 문서 ID */
  _id: string;
  /** 세부 카테고리 */
  sub_category: string;
  /** 픽업 여부 */
  is_picked: boolean;
  /** 면적 */
  area: number;
  /** 깊이 */
  depth: number;
  /** 배치 ID */
  _batch_id: string;
}

export type GetObjectLogsResponse = PaginatedResponse<ObjectLog>;
/** 시스템 헬스 데이터 */
interface SystemHealth {
  /** 타임스탬프 */
  timestamp: string;
  /** 메타데이터 */
  metadata: {
    /** 스테이션 ID */
    station_id: string;
  };
  /** 사용량 정보 */
  usage: {
    /** CPU 사용률 (%) */
    cpu: number;
    /** GPU 사용률 (%) */
    gpu: number;
    /** RAM 사용률 (%) */
    ram: number;
  };
  /** 문서 ID */
  _id: string;
  /** 온도 정보 */
  temp: {
    /** CPU 온도 (°C) */
    cpu: number;
    /** GPU 온도 (°C) */
    gpu: number;
    /** 좌측 카메라 온도 (°C) */
    camera_left: number;
    /** 우측 카메라 온도 (°C) */
    camera_right: number;
  };
  /** 배치 ID */
  _batch_id: string;
  /** 수집 시간 */
  _collected_at: string;
}

export type GetSystemHealthResponse = PaginatedResponse<SystemHealth>;
/** 알람 상세 정보 */
interface AlertDetails {
  /** 컴포넌트 이름 */
  component: string;
  /** 현재 사용률 (%) */
  current_usage?: number;
  /** 임계 사용률 (%) */
  threshold_usage?: number;
  /** 현재 온도 (°C) */
  current_temp?: number;
  /** 임계 온도 (°C) */
  threshold_temp?: number;
  /** 현재 좌측 온도 (°C) */
  current_left?: number;
  /** 임계 좌측 온도 (°C) */
  threshold_left?: number;
  /** 현재 우측 온도 (°C) */
  current_right?: number;
  /** 임계 우측 온도 (°C) */
  threshold_right?: number;
}

/** 알람 데이터 */
interface Alert {
  /** 문서 ID */
  _id: string;
  /** 타임스탬프 */
  timestamp: string;
  /** 스테이션 ID */
  station_id: string;
  /** 심각도 */
  severity: 'warning' | 'critical';
  /** 알람 타입 */
  type: 'high_usage' | 'high_temperature';
  /** 상세 정보 */
  details: AlertDetails;
  /** 배치 ID */
  _batch_id?: string;
  /** 수집 시간 */
  _collected_at?: string;
}

export type GetAlertsResponse = PaginatedResponse<Alert>;
/** 운영 상태 데이터 */
interface OperationState {
  /** 문서 ID */
  _id: string;
  /** 타임스탬프 */
  timestamp: string;
  /** 스테이션 ID */
  station_id: string;
  /** 운영 상태 */
  state: boolean;
  /** 배치 ID */
  _batch_id?: string;
  /** 수집 시간 */
  _collected_at?: string;
}

export type GetOperationStateResponse = PaginatedResponse<OperationState>;
/** 머신 헬스 데이터 */
interface MachineHealth {
  /** 타임스탬프 */
  timestamp: string;
  /** 문서 ID */
  _id: string;
  /** 스테이션 ID */
  station_id: string;
  /** 진공 압력 (kPa) */
  vacuum: number;
  /** 컨베이어 속도 (m/s) */
  conveyor_speed: number;
  /** 배치 ID */
  _batch_id: string;
  /** 수집 시간 */
  _collected_at: string;
}

export type GetMachineHealthResponse = PaginatedResponse<MachineHealth>;