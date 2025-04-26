import { Clazz } from '@joktec/core';
import { ConsumerConfig, EachBatchPayload, EachMessagePayload } from 'kafkajs';

export type ConsumerInfoType = {
  [key: string]: { serviceClazz: Clazz; serviceName: string; methodName: string }[];
};

export interface KafkaEachMessage extends EachMessagePayload {}

export interface KafkaBatchMessage extends EachBatchPayload {}

export interface KafkaConsumeConfig extends Omit<ConsumerConfig, 'groupId'> {}

export interface KafkaConsumeRunConfig {
  autoCommit?: boolean;
  autoCommitInterval?: number | null;
  autoCommitThreshold?: number | null;
  eachBatchAutoResolve?: boolean;
  partitionsConsumedConcurrently?: number;
}

export interface KafkaConsumeOptions {
  fromBeginning?: boolean;
  config?: KafkaConsumeConfig;
  runConfig?: KafkaConsumeRunConfig;
}

export interface KafkaConsumeDecoratorOptions extends KafkaConsumeOptions {
  useEnv?: boolean;
  mode?: 'each' | 'batch';
}
