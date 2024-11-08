import { IsInt, IsOptional } from '@joktec/core';

export class JobProcessorConfig {
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

  constructor(props?: Partial<JobProcessorConfig>) {
    Object.assign(this, props);
  }
}
