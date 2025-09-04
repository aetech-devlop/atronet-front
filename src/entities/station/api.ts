import { BaseResponse, httpClient } from '@/shared/api';
import type {
  SitesResponse,
  StationsBySiteResponse,
  AllStationsResponse,
  CacheStatusResponse,
} from './types';

const BASE_URL = '/api/v1/station-metadata';

export const stationApi = {
  // 전체 사이트 목록 조회
  getSites: async () => {
    const response = await httpClient.get<SitesResponse>(`${BASE_URL}/sites`);
    return response.data;
  },

  // 사이트별 호기 목록 조회
  getStationsBySite: async (site: string) => {
    const response = await httpClient.get<StationsBySiteResponse>(`${BASE_URL}/stations/${site}`);
    return response.data;
  },

  // 전체 사이트별 호기 목록 조회
  getAllStations: async () => {
    const response = await httpClient.get<AllStationsResponse>(`${BASE_URL}/stations`);
    return response.data;
  },

  // 캐시 수동 갱신
  refreshCache: async () => {
    const response = await httpClient.post<BaseResponse>(`${BASE_URL}/refresh-cache`);
    return response.data;
  },

  // 캐시 상태 확인
  getCacheStatus: async () => {
    const response = await httpClient.get<CacheStatusResponse>(`${BASE_URL}/cache-status`);
    return response.data;
  }
};
