import { MicroserviceOptions } from '@nestjs/microservices';

export const DEFAULT_MICRO_PORT = 8010;

export interface MicroConfig {
  port: number;
  filePattern?: string;
  inheritAppConfig?: boolean;
  tcp?: {
    host?: string;
    port?: number;
    retryAttempts?: number;
    retryDelay?: number;
  };
  gRPC: {
    filePattern?: string;
  };
}

export interface IMicroserviceConfig {
  name: string;
  microserviceOptions: MicroserviceOptions[];
}
