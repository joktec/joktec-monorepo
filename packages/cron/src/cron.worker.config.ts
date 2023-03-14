import { toArray, toBool, toInt } from '@joktec/core';

export class CronWorkerConfig {
  type: string;
  enable: boolean;
  startFromScratch: boolean;
  cleanUpOnStart: boolean;
  concurrent?: number;
  batchSize?: number;
  retries?: number;
  failedIdleTimeout?: number;
  resetTimeout?: number;
  fromDate?: Date;
  toDate?: Date;
  dependsOn?: string[];
  conId?: string;

  constructor(props: Partial<CronWorkerConfig>) {
    Object.assign(this, {
      ...props,
      enable: toBool(props?.enable, false),
      startFromScratch: toBool(props?.startFromScratch, false),
      cleanUpOnStart: toBool(props?.cleanUpOnStart, false),
      concurrent: toInt(props?.concurrent, 1),
      batchSize: toInt(props?.batchSize, 10),
      retries: toInt(props?.retries, 3),
      failedIdleTimeout: toInt(props?.failedIdleTimeout, 15000),
      resetTimeout: toInt(props?.resetTimeout, 30 * 1000),
      dependsOn: toArray<string>(props?.dependsOn),
    });
  }
}
