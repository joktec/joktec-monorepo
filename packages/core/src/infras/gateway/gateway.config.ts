import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { HelmetOptions } from 'helmet';
import { SwaggerConfig } from '../../swagger';

export const DEFAULT_GATEWAY_PORT = 9010;

export interface StaticConfig {
  staticPath?: string;
  excludePath?: string[];
  viewPath?: string;
}

export interface GatewayConfig {
  port: number;
  contextPath?: string;
  static?: StaticConfig;
  swagger?: 'off' | SwaggerConfig;
  csrf?: boolean;
  cors?: CorsOptions;
  helmet?: HelmetOptions;
}
