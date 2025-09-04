import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { stationApi } from './api';
import type {
  Site,
  Station,
  StationsBySite,
  CacheStatus,
} from './types';

// Query Keys
export const stationKeys = {
  all: ['stations'] as const,
  sites: () => [...stationKeys.all, 'sites'] as const,
  stations: () => [...stationKeys.all, 'list'] as const,
  stationsBySite: (site: string) => [...stationKeys.stations(), site] as const,
  cache: () => [...stationKeys.all, 'cache'] as const,
};

// Base Queries
export const useSites = (
  options?: UseQueryOptions<string[]>
) => {
  return useQuery<string[]>({
    queryKey: stationKeys.sites(),
    queryFn: async () => {
      const response = await stationApi.getSites();
      return response.sites;
    },
    ...options,
  });
};

export const useStationsBySite = (
  site: string,
  options?: UseQueryOptions<string[]>
) => {
  return useQuery<string[]>({
    queryKey: stationKeys.stationsBySite(site),
    queryFn: async () => {
      const response = await stationApi.getStationsBySite(site);
      return response.stations;
    },
    enabled: !!site,
    ...options,
  });
};

export const useAllStations = (
  options?: UseQueryOptions<StationsBySite[]>
) => {
  return useQuery<StationsBySite[]>({
    queryKey: stationKeys.stations(),
    queryFn: async () => {
      const response = await stationApi.getAllStations();
      return response.data;
    },
    ...options,
  });
};

// Cache Management
export const useCacheStatus = (
  options?: UseQueryOptions<CacheStatus>
) => {
  return useQuery<CacheStatus>({
    queryKey: stationKeys.cache(),
    queryFn: async () => {
      const response = await stationApi.getCacheStatus();
      return response.data;
    },
    ...options,
  });
};

export const useRefreshCache = (
  options?: UseMutationOptions<void, Error, void>
) => {
  return useMutation({
    mutationFn: async () => {
      await stationApi.refreshCache();
    },
    ...options,
  });
};
