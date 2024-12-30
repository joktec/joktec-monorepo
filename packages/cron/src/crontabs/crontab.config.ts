import { IsBoolean, IsInt, IsOptional, IsString, toBool, toInt } from '@joktec/core';

export class CrontabConfig {
  @IsOptional()
  @IsBoolean()
  enable?: boolean;

  @IsOptional()
  @IsInt()
  initIdleTimeout?: number;

  @IsOptional()
  @IsString()
  prefix?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  constructor(props?: Partial<CrontabConfig>) {
    Object.assign(this, {
      ...props,
      enable: toBool(props?.enable, true),
      initIdleTimeout: toInt(props?.initIdleTimeout, 5000),
      prefix: props?.prefix || 'joktec:cron',
      timezone: props?.timezone || 'UTC',
    });
  }
}
