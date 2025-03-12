import { CompressionTypes, ProducerBatch, ProducerConfig, ProducerRecord } from 'kafkajs';

export type KafkaPublishConfig = {
  record?: { acks?: number; timeout?: number; compression?: CompressionTypes };
  consumer?: ProducerConfig;
};

export interface ProducerTopic extends ProducerRecord {
  producerKey?: string;
}

export interface ProducerManyTopic extends ProducerBatch {
  producerKey: string;
}
