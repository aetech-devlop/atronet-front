import { useQuery, useMutation, UseQueryOptions } from '@tanstack/react-query';
import { operationStatsApi } from './api';
import type {
  GetCurrentOperationStatusParams,
  GetCurrentOperationStatusResponse,
  GetTodayOperationSummaryParams,
  GetTodayOperationSummaryResponse,
  GetWeekOperationSummaryParams,
  GetWeekOperationSummaryResponse,
  GetMonthOperationSummaryParams,
  GetMonthOperationSummaryResponse,
  GetPeriodOperationStatisticsParams,
  GetPeriodOperationStatisticsResponse,
  ClearOperationCacheResponse,
  InvalidateOperationCacheResponse,
  OperationStatisticsHealthResponse,
} from './types';

// Query Keys
const baseKey = ['operation-stats'] as const;

export const operationStatsKeys = {
  all: baseKey,
  currentStatus: (params: GetCurrentOperationStatusParams) => [...baseKey, 'current-status', params] as const,
  todaySummary: (params: GetTodayOperationSummaryParams) => [...baseKey, 'today-summary', params] as const,
  weekSummary: (params: GetWeekOperationSummaryParams) => [...baseKey, 'week-summary', params] as const,
  monthSummary: (params: GetMonthOperationSummaryParams) => [...baseKey, 'month-summary', params] as const,
  periodStats: (params: GetPeriodOperationStatisticsParams) => [...baseKey, 'period', params] as const,
  health: [...baseKey, 'health'] as const,
};

// Queries based on OpenAPI schema
export const useGetCurrentOperationStatus = (
  params: GetCurrentOperationStatusParams,
  options?: UseQueryOptions<GetCurrentOperationStatusResponse>,
) => {
  return useQuery({
    queryKey: operationStatsKeys.currentStatus(params),
    queryFn: () => operationStatsApi.getCurrentOperationStatus(params),
    staleTime: 1000 * 60, // 1분
    ...options,
  });
};

export const useGetTodayOperationSummary = (
  params: GetTodayOperationSummaryParams,
  options?: UseQueryOptions<GetTodayOperationSummaryResponse>,
) => {
  return useQuery({
    queryKey: operationStatsKeys.todaySummary(params),
    queryFn: () => operationStatsApi.getTodayOperationSummary(params),
    staleTime: 1000 * 60 * 5, // 5분 (캐시 TTL에 맞춤)
    ...options,
  });
};

export const useGetWeekOperationSummary = (
  params: GetWeekOperationSummaryParams,
  options?: UseQueryOptions<GetWeekOperationSummaryResponse>,
) => {
  return useQuery({
    queryKey: operationStatsKeys.weekSummary(params),
    queryFn: () => operationStatsApi.getWeekOperationSummary(params),
    staleTime: 1000 * 60 * 10, // 10분 (캐시 TTL에 맞춤)
    ...options,
  });
};

export const useGetMonthOperationSummary = (
  params: GetMonthOperationSummaryParams,
  options?: UseQueryOptions<GetMonthOperationSummaryResponse>,
) => {
  return useQuery({
    queryKey: operationStatsKeys.monthSummary(params),
    queryFn: () => operationStatsApi.getMonthOperationSummary(params),
    staleTime: 1000 * 60 * 15, // 15분 (캐시 TTL에 맞춤)
    ...options,
  });
};

export const useGetPeriodOperationStatistics = (
  params: GetPeriodOperationStatisticsParams,
  options?: UseQueryOptions<GetPeriodOperationStatisticsResponse>,
) => {
  return useQuery({
    queryKey: operationStatsKeys.periodStats(params),
    queryFn: () => operationStatsApi.getPeriodOperationStatistics(params),
    staleTime: 1000 * 60 * 5, // 5분
    ...options,
  });
};

export const useGetOperationStatisticsHealth = (
  options?: UseQueryOptions<OperationStatisticsHealthResponse>,
) => {
  return useQuery({
    queryKey: operationStatsKeys.health,
    queryFn: () => operationStatsApi.getOperationStatisticsHealth(),
    staleTime: 1000 * 60, // 1분
    ...options,
  });
};

// Mutations for cache management
export const useClearOperationCache = () => {
  return useMutation<ClearOperationCacheResponse, Error, void>({
    mutationFn: () => operationStatsApi.clearOperationCache(),
  });
};

export const useInvalidateOperationCache = () => {
  return useMutation<InvalidateOperationCacheResponse, Error, { cache_key: string }>({
    mutationFn: (params: { cache_key: string }) => operationStatsApi.invalidateOperationCache(params.cache_key),
  });
};
