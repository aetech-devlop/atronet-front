import React from 'react';
import { StatusBar } from '../components/StatusBar';
import { ProcessingLineFlow } from '../components/ProcessingLineFlow';
import { SystemLogs } from '../components/SystemLogs';
import { useGetSystemHealthOnly, useGetMachineHealthOnly } from '@/entities/health-stats/queries';
import type { GetSystemHealthOnlyResponse, GetMachineHealthOnlyResponse } from '@/entities/health-stats/types';
import { useAtom } from 'jotai';
import { languageAtom, selectedSiteAtom } from '@/shared/store/dashboardStore';
import type { UseQueryOptions } from '@tanstack/react-query';

export const MonitoringTab: React.FC = () => {
  const [language] = useAtom(languageAtom);
  const [selectedSite] = useAtom(selectedSiteAtom);
  
  // Get today's date range for health stats
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).toISOString();
  
  const systemHealthStatsQuery = useGetSystemHealthOnly(
    { 
      start_date: startOfDay,
      end_date: endOfDay,
      station_ids: null  // 모든 station의 데이터를 가져오기
    },
    {
      enabled: !!selectedSite,
      refetchInterval: 5000, // 5초마다 데이터 갱신
      staleTime: 0, // 항상 최신 데이터 사용
    } as UseQueryOptions<GetSystemHealthOnlyResponse>
  );

  const machineHealthStatsQuery = useGetMachineHealthOnly(
    {
      start_date: startOfDay,
      end_date: endOfDay,
      station_ids: null  // 모든 station의 데이터를 가져오기
    },
    {
      enabled: !!selectedSite,
      refetchInterval: 5000, // 5초마다 데이터 갱신
      staleTime: 0, // 항상 최신 데이터 사용
    } as UseQueryOptions<GetMachineHealthOnlyResponse>
  );

  // Show site selection UI if no site is selected
  if (!selectedSite) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'ko' ? '모니터링' : 'Monitoring'}
          </h1>
        </div>
        
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center space-y-4">
            <div className="text-6xl text-muted-foreground">🏭</div>
            <h2 className="text-2xl font-semibold text-foreground">
              {language === 'ko' ? '사이트를 선택해주세요' : 'Please select a site'}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              {language === 'ko' 
                ? '상단의 사이트 선택기를 사용하여 모니터링할 사이트를 선택하세요.' 
                : 'Use the site selector at the top to choose a site for monitoring.'
              }
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          {language === 'ko' ? '모니터링' : 'Monitoring'}
        </h1>
        <div className="text-sm text-muted-foreground">
          {language === 'ko' ? '실시간 하드웨어 모니터링' : 'Real-time Hardware Monitoring'} - {selectedSite}
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar 
        systemHealthData={systemHealthStatsQuery?.data}
        machineHealthData={machineHealthStatsQuery?.data}
        hasRealData={{
          systemHealth: !!systemHealthStatsQuery?.data,
          machineHealth: !!machineHealthStatsQuery?.data,
          objectLogs: false,
          alerts: false,
          operationState: false
        }}
        selectedSite={selectedSite}
      />

      {/* Processing Line Flow */}
      <ProcessingLineFlow 
        objectLogsData={undefined}
        operationStateData={undefined}
        alertsData={undefined}
        machineHealthData={undefined}
        hasRealData={{
          systemHealth: false,
          machineHealth: false,
          objectLogs: false,
          alerts: false,
          operationState: false
        }}
        selectedSite={selectedSite}
      />

      {/* System Logs */}
      <SystemLogs 
        objectLogsData={undefined}
        alertsData={undefined}
        machineHealthData={undefined}
        hasRealData={{
          systemHealth: false,
          machineHealth: false,
          objectLogs: false,
          alerts: false,
          operationState: false
        }}
        selectedSite={selectedSite}
      />
    </div>
  );
};