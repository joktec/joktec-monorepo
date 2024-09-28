import {
  ClientConfig,
  HttpMethod,
  Is2DIntArray,
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsTypes,
  LogService,
  toBool,
} from '@joktec/core';
import { AxiosBasicCredentials, AxiosError, AxiosProxyConfig, type AxiosRequestConfig } from 'axios';
import axiosRetry, { IAxiosRetryConfig } from 'axios-retry';
import { chain, inRange, sum } from 'lodash';
import mergeDeep from 'merge-deep';
import { IHttpRetryConfig } from './models';

export class HttpRetryConfig implements IHttpRetryConfig {
  @IsOptional()
  @IsInt()
  retries?: number = 3;

  @IsOptional()
  @IsBoolean()
  shouldResetTimeout?: boolean = true;

  @IsOptional()
  @IsInt()
  retryDelay?: number = 1000;

  @IsOptional()
  @IsArray()
  @IsEnum(HttpMethod, { each: true })
  httpMethodsToRetry?: HttpMethod[] = [];

  @IsOptional()
  @IsArray()
  @Is2DIntArray()
  statusCodesToRetry?: number[][] = [];

  constructor(props?: Partial<HttpRetryConfig>) {
    Object.assign(this, {
      ...props,
      statusCodesToRetry: chain(props?.statusCodesToRetry || [])
        .uniqBy((o: number[]) => sum(o))
        .orderBy('0', 'asc')
        .value(),
    });
  }
}

class BasicCredentials implements AxiosBasicCredentials {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  constructor(props: BasicCredentials) {
    Object.assign(this, props);
  }
}

export class HttpProxyConfig implements AxiosProxyConfig {
  @IsNotEmpty()
  @IsString()
  host!: string;

  @IsNotEmpty()
  @IsInt()
  port!: number;

  @IsOptional()
  @IsTypes(BasicCredentials)
  auth?: BasicCredentials;

  @IsOptional()
  @IsString()
  protocol?: string;

  @IsOptional()
  @IsBoolean()
  keepAlive?: boolean = true;

  @IsOptional()
  @IsInt()
  timeout?: number;

  @IsOptional()
  @IsInt()
  maxSockets?: number;

  constructor(props: HttpProxyConfig) {
    Object.assign(this, props);
  }
}

export class HttpConfig extends ClientConfig {
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsEnum(HttpMethod)
  method?: HttpMethod = HttpMethod.GET;

  @IsOptional()
  @IsString()
  baseURL?: string;

  @IsOptional()
  @IsPositive()
  timeout?: number = 30000;

  @IsOptional()
  @IsString()
  timeoutErrorMessage?: string;

  @IsOptional()
  @IsTypes(BasicCredentials)
  auth?: BasicCredentials;

  @IsOptional()
  @IsInt()
  @IsPositive()
  maxRedirects?: number = 3;

  @IsOptional()
  @IsObject()
  headers?: Record<string, any>;

  @IsOptional()
  @IsObject()
  params?: Record<string, any> = {};

  @IsOptional()
  @IsBoolean()
  curlirize?: boolean = false;

  @IsOptional()
  @IsTypes(HttpRetryConfig)
  retryConfig?: HttpRetryConfig;

  @IsOptional()
  @IsTypes(HttpProxyConfig)
  proxy?: HttpProxyConfig;

  constructor(props: HttpConfig) {
    super(props);
    mergeDeep(this, {
      ...props,
      headers: Object.assign({ accept: 'application/json' }, props?.headers),
      curlirize: toBool(props.curlirize, false),
      retryConfig: new HttpRetryConfig(props.retryConfig),
    });
    if (props.proxy) this.proxy = new HttpProxyConfig(props.proxy);
  }

  getRetryConfig(log: LogService): IAxiosRetryConfig {
    const { retryConfig } = this;
    return {
      retries: retryConfig.retries,
      shouldResetTimeout: retryConfig.shouldResetTimeout,
      validateResponse: null,
      retryDelay: (retryCount: number, _: AxiosError) => retryConfig.retryDelay * retryCount,
      retryCondition: (error: AxiosError): boolean => {
        const { status, config } = error;
        const { httpMethodsToRetry, statusCodesToRetry } = retryConfig;

        if (!httpMethodsToRetry?.length && !statusCodesToRetry?.length) {
          return axiosRetry.isNetworkOrIdempotentRequestError(error);
        }

        const isNetworkError = axiosRetry.isNetworkError(error);
        const isMethodRetryable = httpMethodsToRetry?.length
          ? httpMethodsToRetry.includes(config.method as HttpMethod)
          : true;
        const isStatusRetryable = statusCodesToRetry?.length
          ? statusCodesToRetry.some(([min, max]) => inRange(status, min, max))
          : true;

        return isNetworkError || (isMethodRetryable && isStatusRetryable);
      },
      onRetry: (retryCount: number, err: AxiosError, _: AxiosRequestConfig) => {
        const { method, url } = err.config;
        log.error('%s %s error, retry count: %s', method, url, retryCount);
      },
      onMaxRetryTimesExceeded: (err: AxiosError, retryCount: number) => {
        if (retryCount) {
          const { method, url } = err.config;
          log.error('%s %s error, reach max retry times exceeded. Last count: %s', method, url, retryCount);
        }
      },
    };
  }
}
