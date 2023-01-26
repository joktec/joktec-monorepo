import { makeCounterProvider, makeHistogramProvider } from '@willsoto/nestjs-prometheus';
import { startCase } from 'lodash';

export { Counter, Histogram } from 'prom-client';
export { InjectMetric } from '@willsoto/nestjs-prometheus';
export * from './metric.module';

export const CounterProviders = (
  options: {
    name: string;
    label: string[];
  }[],
) => {
  return options.map(option =>
    makeCounterProvider({
      name: option.name,
      help: startCase(option.name),
      labelNames: option.label,
    }),
  );
};

export const HistogramProviders = (
  options: {
    name: string;
    label: string[];
  }[],
) => {
  return options.map(option =>
    makeHistogramProvider({
      name: option.name,
      help: startCase(option.name),
      labelNames: option.label,
    }),
  );
};
