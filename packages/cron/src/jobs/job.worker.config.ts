import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from '@joktec/core';
import { TIMEZONE } from './job.constant';

export class JobWorkerConfig {
  @IsNotEmpty()
  @IsBoolean()
  enable: boolean = true;

  @IsNotEmpty()
  @IsBoolean()
  isGlobal?: boolean = true;

  @IsNotEmpty()
  @IsString()
  type!: string;

  @IsNotEmpty()
  @IsBoolean()
  startFromScratch: boolean = false;

  @IsNotEmpty()
  @IsBoolean()
  cleanUpOnStart: boolean = false;

  @IsOptional()
  @IsInt()
  concurrent?: number = 1;

  @IsOptional()
  @IsInt()
  batchSize?: number = 1;

  @IsOptional()
  @IsInt()
  maxRetries?: number = 3;

  @IsOptional()
  @IsInt()
  retryTimeout?: number = 15000;

  @IsOptional()
  @IsInt()
  resetTimeout?: number = 30 * 1000;

  @IsOptional()
  @IsBoolean()
  initOnStart?: boolean = true;

  @IsOptional()
  @IsBoolean()
  exitOnDone?: boolean = true;

  @IsOptional()
  @IsDate()
  fromDate?: Date = null;

  @IsOptional()
  @IsDate()
  toDate?: Date = null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dependsOn?: string[] = [];

  @IsOptional()
  @IsString()
  timezone?: string = TIMEZONE;

  constructor(props: Partial<JobWorkerConfig>) {
    Object.assign(this, { ...props });
  }
}
