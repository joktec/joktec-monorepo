import { ClientConfig, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, toBool, toInt } from '@joktec/core';

const DEFAULT_AUTO_RETRY = true;
const DEFAULT_MAX_RETRIES = 5;

export class BigQueryConfig extends ClientConfig {
  @IsString()
  @IsNotEmpty()
  keyFilename: string;

  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsString()
  @IsNotEmpty()
  datasetId: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsBoolean()
  @IsOptional()
  autoRetry?: boolean;

  @IsInt()
  @IsOptional()
  maxRetries?: number;

  @IsString()
  @IsOptional()
  defaultTable?: string;

  constructor(props: BigQueryConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      autoRetry: toBool(props?.autoRetry, DEFAULT_AUTO_RETRY),
      maxRetries: toInt(props?.maxRetries, DEFAULT_MAX_RETRIES),
    });
  }

  public getTableName(tableId: string): string {
    return [this.projectId, this.datasetId, tableId].join('.');
  }
}
