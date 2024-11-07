import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  toArray,
  toBool,
  toInt,
} from '@joktec/core';
import { TIMEZONE } from './job.constant';

export class JobWorkerConfig {
  @IsNotEmpty()
  @IsString()
  type!: string;

  @IsNotEmpty()
  @IsBoolean()
  enable!: boolean;

  @IsNotEmpty()
  @IsBoolean()
  startFromScratch!: boolean;

  @IsNotEmpty()
  @IsBoolean()
  cleanUpOnStart!: boolean;

  @IsOptional()
  @IsInt()
  concurrent?: number;

  @IsOptional()
  @IsInt()
  batchSize?: number;

  @IsOptional()
  @IsInt()
  retries?: number;

  @IsOptional()
  @IsInt()
  failedIdleTimeout?: number;

  @IsOptional()
  @IsInt()
  resetTimeout?: number;

  @IsOptional()
  @IsDate()
  fromDate?: Date;

  @IsOptional()
  @IsDate()
  toDate?: Date;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dependsOn?: string[];

  @IsOptional()
  @IsString()
  conId?: string;

  @IsOptional()
  @IsString()
  timezone?: string;

  constructor(props: Partial<JobWorkerConfig>) {
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
      timezone: props?.timezone || TIMEZONE,
      dependsOn: toArray<string>(props?.dependsOn),
    });
  }
}
