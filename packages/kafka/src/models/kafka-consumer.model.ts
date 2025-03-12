import { EachBatchPayload, EachMessagePayload } from 'kafkajs';

export interface ConsumerRunCfg {
  autoCommit?: boolean;
  autoCommitInterval?: number | null;
  autoCommitThreshold?: number | null;
  eachBatchAutoResolve?: boolean;
  partitionsConsumedConcurrently?: number;
}

export type ConsumerBatchRunConfig = ConsumerRunCfg & {
  eachBatch: (payload: EachBatchPayload) => Promise<void>;
};

export type ConsumerMessageRunConfig = ConsumerRunCfg & {
  eachMessage: (payload: EachMessagePayload) => Promise<void>;
};
