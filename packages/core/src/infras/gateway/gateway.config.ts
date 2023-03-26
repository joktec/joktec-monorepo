import { ValidationPipeOptions } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const DEFAULT_GATEWAY_PORT = 9010;

export interface GatewayConfig {
  port: number;
  contextPath?: string;
  staticPath?: string;
  viewPath?: string;
  swagger?:
    | 'off'
    | {
        title?: string;
        description?: string;
        version?: string;
        server?: string;
      };
  pipes?: ValidationPipeOptions;
  csrf?: boolean;
  cors?: CorsOptions;
}
