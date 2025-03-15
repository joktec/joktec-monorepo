import { CompressionTypes, ProducerBatch, ProducerConfig, ProducerRecord } from 'kafkajs';

export type KafkaPublishConfig = {
  consumer?: ProducerConfig;
  record?: {
    acks?: number;
    timeout?: number;
    compression?: CompressionTypes;
  };
  array?: {
    mode?: 'combine' | 'split';
    chunkSize?: number;
    flatten?: boolean;
  };
};

export interface ProducerTopic extends ProducerRecord {
  producerKey?: string;
}

export interface ProducerManyTopic extends ProducerBatch {
  producerKey: string;
}
