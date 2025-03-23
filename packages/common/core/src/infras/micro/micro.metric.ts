import { makeCounterProvider, makeGaugeProvider } from '@willsoto/nestjs-prometheus';

export const MICRO_LATENCY_METRIC = 'micro_call_latency';
export const MICRO_TOTAL_METRIC = 'micro_call_total';

export enum MicroStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export const microLatency = makeGaugeProvider({
  name: MICRO_LATENCY_METRIC,
  help: `Micro Call Latency`,
  labelNames: ['service', 'status'],
});

export const totalMicroCounter = makeCounterProvider({
  name: MICRO_TOTAL_METRIC,
  help: `Total Micro Call Counter`,
  labelNames: ['service'],
});
