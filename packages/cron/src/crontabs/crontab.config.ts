import { toBool, toInt } from '@joktec/core';

export class CrontabConfig {
  enable?: boolean;
  initIdleTimeout?: number;
  prefix?: string;

  constructor(props?: Partial<CrontabConfig>) {
    Object.assign(this, {
      ...props,
      enable: toBool(props?.enable, true),
      initIdleTimeout: toInt(props?.initIdleTimeout, 5000),
      prefix: props?.prefix || 'joktec:cron',
    });
  }
}
