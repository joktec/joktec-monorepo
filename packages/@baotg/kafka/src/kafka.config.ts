import {
  ClientConfig,
  IsString,
  IsOptional,
  ArrayNotEmpty,
  IsBoolean,
  IsArray,
  IsEnum,
  IsPositive,
  LogService,
} from '@baotg/core';
import {
  KafkaConfig,
  EachBatchPayload,
  EachMessagePayload,
  SASLOptions,
  RetryOptions,
  ISocketFactory,
  logLevel,
  logCreator,
  ProducerRecord,
  ProducerBatch,
} from 'kafkajs';

export interface ProducerTopic extends ProducerRecord {
  producerKey?: string;
}

export interface ProducerManyTopic extends ProducerBatch {
  producerKey: string;
}

export type ConsumerRunCfg = {
  autoCommit?: boolean;
  autoCommitInterval?: number | null;
  autoCommitThreshold?: number | null;
  eachBatchAutoResolve?: boolean;
  partitionsConsumedConcurrently?: number;
};

export type ConsumerBatchRunConfig = ConsumerRunCfg & {
  eachBatch: (payload: EachBatchPayload) => Promise<void>;
};

export type ConsumerMessageRunConfig = ConsumerRunCfg & {
  eachMessage: (payload: EachMessagePayload) => Promise<void>;
};

export class KafkaClientConfig extends ClientConfig implements KafkaConfig {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  brokers: string[];

  @IsOptional()
  @IsBoolean()
  ssl?: boolean;

  sasl?: SASLOptions;

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsPositive()
  connectionTimeout?: number;

  @IsOptional()
  @IsPositive()
  authenticationTimeout?: number;

  @IsOptional()
  @IsPositive()
  reauthenticationThreshold?: number;

  @IsOptional()
  @IsPositive()
  requestTimeout?: number;

  @IsOptional()
  @IsBoolean()
  enforceRequestTimeout?: boolean;

  retry?: RetryOptions;
  socketFactory?: ISocketFactory;

  @IsOptional()
  @IsEnum(logLevel)
  logLevel?: logLevel;

  logCreator?: logCreator;

  constructor(props: KafkaClientConfig) {
    super(props);
    this.brokers = props.brokers;
    this.ssl = props.ssl ?? false;
    this.sasl = props.sasl;
    this.clientId = props.clientId ?? 'kafkajs';
    this.connectionTimeout = props.connectionTimeout ?? 1000;
    this.authenticationTimeout = props.authenticationTimeout;
    this.reauthenticationThreshold = props.reauthenticationThreshold;
    this.enforceRequestTimeout = props.enforceRequestTimeout;
    this.requestTimeout = props.requestTimeout ?? 30000;
    this.retry = props.retry;
    this.socketFactory = props.socketFactory;
    this.logLevel = props.logLevel ?? logLevel.INFO;
  }

  log(logService: LogService) {
    const pinoLog = {
      [logLevel.WARN]: logService.warn.bind(logService),
      [logLevel.ERROR]: logService.error.bind(logService),
      [logLevel.INFO]: logService.info.bind(logService),
      [logLevel.DEBUG]: logService.debug.bind(logService),
    };

    this.logCreator =
      level =>
      ({ namespace, level, log }) => {
        const { timestamp, logger, message, ...extra } = log;
        pinoLog[level](extra, '[`%s` %s] %s}', this.conId, namespace, message);
      };
  }
}
