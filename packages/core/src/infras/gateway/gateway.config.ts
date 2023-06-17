import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { HelmetOptions } from 'helmet';

export const DEFAULT_GATEWAY_PORT = 9010;

export interface GatewayConfig {
  port: number;
  contextPath?: string;
  static?: { staticPath?: string; excludePath?: string[]; viewPath?: string };
  swagger?: 'off' | { title?: string; description?: string; version?: string; server?: string };
  csrf?: boolean;
  cors?: CorsOptions;
  helmet?: HelmetOptions;
}
