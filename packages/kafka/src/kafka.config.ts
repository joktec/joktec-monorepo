import {
  ArrayNotEmpty,
  ClientConfig,
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  LogService,
} from '@joktec/core';
import {
  EachBatchPayload,
  EachMessagePayload,
  ISocketFactory,
  logCreator,
  logLevel,
  ProducerBatch,
  ProducerRecord,
  SASLOptions,
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

  socketFactory?: ISocketFactory;
  logCreator?: logCreator;

  constructor(props: KafkaConfig) {
    super(props);
    Object.assign(this, props);
    this.socketFactory = props?.socketFactory;
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
