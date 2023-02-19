import {
  ClientConfig,
  IsString,
  IsOptional,
  IsPositive,
  IsInt,
  IsNotEmpty,
  IsTypes,
  LogService,
  toInt,
} from '@joktec/core';
import { AxiosRequestConfig, AxiosBasicCredentials as Auth, AxiosError } from 'axios';
import { RetryConfig } from 'retry-axios';
import mergeDeep from 'merge-deep';

const defaultRetryConfig = {
  retry: 0,
  retryDelay: 1000,
  httpMethodsToRetry: ['GET', 'POST'],
};

class AxiosBasicCredentials {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(props: AxiosBasicCredentials) {
    this.username = props.username;
    this.password = props.password;
  }
}

export class ElasticConfig extends ClientConfig implements AxiosRequestConfig {
  @IsOptional()
  @IsString()
  protocol?: string;

  @IsOptional()
  @IsString()
  host?: string;

  @IsOptional()
  @IsInt()
  port?: number;

  @IsOptional()
  @IsPositive()
  timeout: number = 30000;

  @IsOptional()
  @IsString()
  timeoutErrorMessage?: string;

  @IsOptional()
  @IsTypes([AxiosBasicCredentials])
  auth: Auth;

  @IsOptional()
  @IsInt()
  @IsPositive()
  maxRedirects: number = 3;

  @IsOptional()
  headers?: any;

  @IsOptional()
  params?: any;

  @IsOptional()
  raxConfig?: RetryConfig;

  constructor(props: ElasticConfig) {
    super(props);
    mergeDeep(this, props, {
      protocol: props?.protocol || 'http',
      host: props?.host || 'localhost',
      port: toInt(props?.port, 9200),
    });
    if (!props.raxConfig) this.raxConfig = defaultRetryConfig;
    if (!props.headers) this.headers = { accept: 'application/json' };
    if (!props.params) this.params = {};
  }

  onRetryAttempt(log: LogService) {
    this.raxConfig.onRetryAttempt = (err: AxiosError) => {
      const { method, url, raxConfig } = err.config;
      log.error('%s %s error, currentRetryAttempt: %s', method, url, raxConfig.currentRetryAttempt);
    };
  }

  public buildUrl(index: string): string {
    const { protocol, host, port } = this;
    return `${protocol}://${host}:${port}/${index}`;
  }
}
