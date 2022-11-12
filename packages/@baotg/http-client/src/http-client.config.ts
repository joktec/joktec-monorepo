import { AxiosRequestConfig, Method, AxiosBasicCredentials as Auth, AxiosError } from 'axios';
import { RetryConfig } from 'retry-axios';
import {
  IsString,
  IsOptional,
  IsPositive,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsTypes,
  LogService,
  ClientConfig,
} from '@baotg/core';
import { HttpMethod } from './models';
import mergeDeep from 'merge-deep';

const defaultRetryConfig = {
  retry: 3,
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

export class HttpClientConfig extends ClientConfig implements AxiosRequestConfig {
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsEnum(HttpMethod)
  method?: Method;

  @IsOptional()
  @IsString()
  baseURL?: string;

  headers?: any;
  params?: any;

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

  raxConfig: RetryConfig = defaultRetryConfig;

  constructor(props: HttpClientConfig) {
    super(props);
    mergeDeep(this, props);
  }

  onRetryAttempt(log: LogService) {
    this.raxConfig.onRetryAttempt = (err: AxiosError) => {
      const { method, url, raxConfig } = err.config;
      log.error('%s %s error, currentRetryAttempt: %s', method, url, raxConfig.currentRetryAttempt);
    };
  }
}
