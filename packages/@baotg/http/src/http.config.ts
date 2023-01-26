import {
  ClientConfig,
  IsString,
  IsOptional,
  IsPositive,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsTypes,
  LogService,
} from '@baotg/core';
import { AxiosRequestConfig, Method, AxiosBasicCredentials as Auth, AxiosError } from 'axios';
import { RetryConfig } from 'retry-axios';
import mergeDeep from 'merge-deep';
import { HttpMethod } from './models';

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

export class HttpConfig extends ClientConfig implements AxiosRequestConfig {
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsEnum(HttpMethod)
  method?: Method;

  @IsOptional()
  @IsString()
  baseURL?: string;

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

  constructor(props: HttpConfig) {
    super(props);
    mergeDeep(this, props);
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
}
