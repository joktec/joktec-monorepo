import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString, Type } from '@joktec/utils';
import dayjs from 'dayjs';
import { snakeCase } from 'lodash';
import { FORMAT, TIMEZONE } from './job.constant';

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
  autoStart?: boolean = true;

  @IsOptional()
  @IsBoolean()
  autoExit?: boolean = true;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  fromDate?: Date = null;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  toDate?: Date = null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  dependsOn?: string[] = [];

  @IsOptional()
  @IsString()
  timezone?: string = TIMEZONE;

  constructor(props: Partial<JobWorkerConfig>) {
    Object.assign(this, props);
    if (this.type) this.type = snakeCase(this.type).toUpperCase();
  }

  get dateRange(): string[] {
    const fromDate = this.fromDate || dayjs().tz(this.timezone).endOf('days').toDate();
    const toDate = this.toDate || fromDate;

    const start = dayjs(fromDate);
    const end = dayjs(toDate);
    const ranges = [];
    do {
      ranges.push(start.format(FORMAT));
      start.add(1, 'day');
    } while (start.isSameOrBefore(end, 'day'));
    return ranges;
  }
}
