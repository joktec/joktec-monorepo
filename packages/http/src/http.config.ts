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
  IsArray,
} from '@joktec/core';
import { AxiosRequestConfig, AxiosBasicCredentials, AxiosError } from 'axios';
import mergeDeep from 'merge-deep';
import { RetryConfig } from 'retry-axios';
import { HttpMethod } from './models';

const defaultRetryConfig = {
  retry: 0,
  retryDelay: 1000,
  httpMethodsToRetry: ['GET', 'POST'],
};

export enum ApiKeyType {
  HEADER = 'header',
  PARAM = 'param',
}

export class ApiKeyCredentials {
  @IsEnum(ApiKeyType)
  @IsNotEmpty()
  type: ApiKeyType = ApiKeyType.HEADER;

  @IsString()
  @IsNotEmpty()
  key!: string;

  @IsString()
  @IsNotEmpty()
  value!: string;

  constructor(props: ApiKeyCredentials) {
    Object.assign(this, props);
  }
}

export class BasicCredentials implements AxiosBasicCredentials {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  constructor(props: BasicCredentials) {
    Object.assign(this, props);
  }
}

export class HttpConfig extends ClientConfig implements AxiosRequestConfig {
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsEnum(HttpMethod)
  method?: HttpMethod;

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
  @IsTypes([BasicCredentials])
  auth?: AxiosBasicCredentials;

  @IsOptional()
  @IsArray()
  @IsTypes([ApiKeyCredentials], { each: true })
  apiKeys?: ApiKeyCredentials[];

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
    mergeDeep(this, {
      ...props,
      method: props?.method || HttpMethod.GET,
      raxConfig: props?.raxConfig || defaultRetryConfig,
      headers: props?.headers || { accept: 'application/json' },
      params: props?.params || {},
    });

    if (props?.apiKeys?.length) {
      props.apiKeys.map(item => {
        const apiKey = { [item.key]: item.value };
        if (!item.type || item.type === ApiKeyType.HEADER) Object.assign(this.headers, apiKey);
        if (item.type === ApiKeyType.PARAM) Object.assign(this.params, apiKey);
      });
    }
  }

  onRetryAttempt(log: LogService) {
    this.raxConfig.onRetryAttempt = (err: AxiosError<any, any>) => {
      const { method, url, raxConfig } = err.config;
      log.error('%s %s error, currentRetryAttempt: %s', method, url, raxConfig.currentRetryAttempt);
    };
  }
}
