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
        description?: string;
        version?: string;
        baseHost?: string;
        useSSL?: boolean;
      };
  pipes?: ValidationPipeOptions;
  csrf?: boolean;
  cors?: CorsOptions;
}
