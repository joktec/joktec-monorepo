import {
  ClientConfig,
  HttpMethod,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsTypes,
  LogService,
} from '@joktec/core';
import { AxiosBasicCredentials, AxiosError, AxiosProxyConfig } from 'axios';
import mergeDeep from 'merge-deep';
import { RetryConfig } from 'retry-axios';

const defaultRetryConfig: RetryConfig = {
  retry: 0,
  retryDelay: 1000,
  httpMethodsToRetry: [HttpMethod.GET, HttpMethod.POST],
};

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
  @IsNumber()
  port!: number;

  @IsOptional()
  @IsTypes([BasicCredentials])
  auth?: BasicCredentials;

  @IsOptional()
  @IsString()
  protocol?: string;

  constructor(props: HttpProxyConfig) {
    Object.assign(this, props);
  }
}

export class HttpConfig extends ClientConfig {
  @IsOptional()
  @IsString()
  url?: string;

  /**
   * HTTP Method
   */
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
  @IsTypes([BasicCredentials])
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
  raxConfig?: RetryConfig = defaultRetryConfig;

  @IsOptional()
  @IsTypes([HttpProxyConfig])
  proxy?: HttpProxyConfig;

  constructor(props: HttpConfig) {
    super(props);
    mergeDeep(this, {
      ...props,
      headers: Object.assign({ accept: 'application/json' }, props?.headers),
    });
    if (props.proxy) this.proxy = new HttpProxyConfig(props.proxy);
  }

  onRetryAttempt(log: LogService) {
    this.raxConfig.onRetryAttempt = (err: AxiosError<any, any>) => {
      const { method, url, raxConfig } = err.config;
      log.error('%s %s error, currentRetryAttempt: %s', method, url, raxConfig.currentRetryAttempt);
    };
  }
}
