import { Clazz } from '@joktec/core';
import { KafkaBatchMessage, KafkaEachMessage } from './kafka-message.model';

export type ConsumerInfoType = {
  [key: string]: { serviceClazz: Clazz; serviceName: string; methodName: string }[];
};

export interface ConsumerRunCfg {
  autoCommit?: boolean;
  autoCommitInterval?: number | null;
  autoCommitThreshold?: number | null;
  eachBatchAutoResolve?: boolean;
  partitionsConsumedConcurrently?: number;
}

export type ConsumerMessageRunConfig = ConsumerRunCfg & {
  eachMessage: (payload: KafkaEachMessage) => Promise<void>;
};

export type ConsumerBatchRunConfig = ConsumerRunCfg & {
  eachBatch: (payload: KafkaBatchMessage) => Promise<void>;
};
