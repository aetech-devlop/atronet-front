// Response Types
export interface RootResponse {
  /** API 서버 메시지 */
  message: string;
  /** API 버전 */
  version: string;
  /** API 서버 상태 */
  status: string;
  /** API 문서 경로 */
  docs: string;
  /** ReDoc 문서 경로 */
  redoc: string;
}

export interface HealthCheckResponse {
  /** 서버 상태 */
  status: 'healthy' | 'unhealthy';
  /** 데이터베이스 상태 */
  database: 'connected' | 'disconnected';
  /** 타임스탬프 */
  timestamp: string;
}