import { toInt } from '@joktec/core';

export class CronProcessorConfig {
  batchSize: number;
  concurrent: number;
  retries: number;
  retryTimeout: number;

  constructor(props: Partial<CronProcessorConfig>) {
    Object.assign(this, {
      batchSize: toInt(props?.batchSize, 1),
      concurrent: toInt(props?.concurrent, 1),
      retries: toInt(props?.retries, 3),
      retryTimeout: toInt(props?.retries, 15000),
    });
  }
}
