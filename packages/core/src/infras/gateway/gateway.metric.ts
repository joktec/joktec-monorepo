import { makeCounterProvider, makeHistogramProvider } from '@willsoto/nestjs-prometheus';

export const GATEWAY_DURATION_METRIC = 'http_call_duration';
export const GATEWAY_TOTAL_METRIC = 'http_call_total';

export enum GatewayStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export const gatewayDuration = makeHistogramProvider({
  name: GATEWAY_DURATION_METRIC,
  help: 'Gateway Duration By Path',
  labelNames: ['path'],
});

export const gatewayTotal = makeCounterProvider({
  name: GATEWAY_TOTAL_METRIC,
  help: `Gateway Call Total`,
  labelNames: ['path', 'status', 'statusCode', 'className'],
});
