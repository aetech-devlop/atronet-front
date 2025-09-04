import { BaseResponse } from '@/shared/api/types';

// 기본 응답 타입
export interface StationResponse extends BaseResponse {
  data: any;
}

// 사이트 정보
export interface Site {
  id: string;
  name: string;
  description?: string;
}

// 호기 정보
export interface Station {
  id: string;
  site_id: string;
  name: string;
  description?: string;
  status: 'active' | 'inactive';
}

// 사이트별 호기 목록
export interface StationsBySite {
  site: string;
  stations: Station[];
}

// 캐시 상태
export interface CacheStatus {
  last_updated: string;
  is_valid: boolean;
  size: number;
}

// API 응답 타입들
export interface SitesResponse extends BaseResponse {
  sites: string[];
  count: number;
  cached: boolean;
  last_updated: string;
}

export interface StationsBySiteResponse extends BaseResponse {
  site: string;
  stations: string[];
  count: number;
  cached: boolean;
  last_updated: string;
}

export interface AllStationsResponse extends BaseResponse {
  data: StationsBySite[];
}

export interface CacheStatusResponse extends BaseResponse {
  data: CacheStatus;
}

// API 요청 파라미터 타입들
export interface StationFilters {
  site?: string;
  status?: 'active' | 'inactive';
}
