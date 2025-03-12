import {
  ArrayNotEmpty,
  ClientConfig,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  LogService,
  RetryOptions,
} from '@joktec/core';
import { ISocketFactory, logCreator, logLevel, SASLOptions } from 'kafkajs';

export class KafkaRetryConfig implements RetryOptions {
  @IsOptional()
  @IsNumber()
  maxRetryTime?: number;

  @IsOptional()
  @IsNumber()
  initialRetryTime?: number;

  @IsOptional()
  @IsNumber()
  factor?: number;

  @IsOptional()
  @IsNumber()
  multiplier?: number;

  @IsOptional()
  @IsNumber()
  retries?: number;

  restartOnFailure?: (e: Error) => Promise<boolean>;

  constructor(props: KafkaRetryConfig) {
    Object.assign(this, {
      ...props,
      restartOnFailure: props?.restartOnFailure,
    });
  }
}

export class KafkaConfig extends ClientConfig {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  brokers: string[];

  @IsOptional()
  @IsBoolean()
  ssl?: boolean = false;

  @IsOptional()
  sasl?: SASLOptions;

  @IsOptional()
  @IsString()
  clientId?: string = 'kafkajs';

  @IsOptional()
  @IsPositive()
  connectionTimeout?: number = 1000;

  @IsOptional()
  @IsPositive()
  authenticationTimeout?: number;

  @IsOptional()
  @IsPositive()
  reauthenticationThreshold?: number;

  @IsOptional()
  @IsPositive()
  requestTimeout?: number = 30000;

  @IsOptional()
  @IsBoolean()
  enforceRequestTimeout?: boolean;

  @IsOptional()
  @IsEnum(logLevel)
  logLevel?: logLevel = logLevel.INFO;

  @IsOptional()
  @IsObject()
  retry?: KafkaRetryConfig;

  socketFactory?: ISocketFactory;
  logCreator?: logCreator;

  constructor(props: KafkaConfig) {
    super(props);
    Object.assign(this, {
      ...props,
      retry: new KafkaRetryConfig(props.retry),
      socketFactory: props?.socketFactory,
    });
  }

  log(logService: LogService) {
    const pinoLog = {
      [logLevel.WARN]: logService.warn.bind(logService),
      [logLevel.ERROR]: logService.error.bind(logService),
      [logLevel.INFO]: logService.info.bind(logService),
      [logLevel.DEBUG]: logService.debug.bind(logService),
    };

    this.logCreator =
      (level: logLevel) =>
      ({ namespace, level, log }) => {
        const { timestamp, logger, message, ...extra } = log;
        pinoLog[level](extra, '[`%s` %s] %s}', this.conId, namespace, message);
      };
  }
}
