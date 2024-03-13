import { makeCounterProvider, makeHistogramProvider } from '@willsoto/nestjs-prometheus';
import { startCase } from 'lodash';

export type MetricOption = { name: string; label: string[] };

export const CounterProviders = (options: MetricOption[]) => {
  return options.map(option =>
    makeCounterProvider({ name: option.name, help: startCase(option.name), labelNames: option.label }),
  );
};

export const HistogramProviders = (options: MetricOption[]) => {
  return options.map(option =>
    makeHistogramProvider({ name: option.name, help: startCase(option.name), labelNames: option.label }),
  );
};
