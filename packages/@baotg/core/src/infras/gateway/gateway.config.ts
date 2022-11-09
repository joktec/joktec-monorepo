import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';

export const DEFAULT_GATEWAY_PORT = 9010;

export interface GatewayConfig {
  port: number;
  contextPath?: string;
  swagger?: 'off';
  pipes?: 'off' | ValidationPipeOptions;
  csrf?: boolean;
}
