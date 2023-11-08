import { Client } from '@joktec/core';
import { Consumer, ConsumerConfig, ConsumerSubscribeTopic, Kafka, Producer, ProducerConfig } from 'kafkajs';
import {
  ConsumerBatchRunConfig,
  ConsumerMessageRunConfig,
  KafkaConfig,
  ProducerManyTopic,
  ProducerTopic,
} from './kafka.config';

export interface KafkaClient extends Client<KafkaConfig, Kafka> {
  consume(
    consumerSubscribeTopic: ConsumerSubscribeTopic,
    consumerCfg: ConsumerConfig,
    consumerRunConfig: ConsumerBatchRunConfig | ConsumerMessageRunConfig,
    conId: string,
  ): Promise<void>;

  publish(record: ProducerTopic, producerConfig: ProducerConfig, conId: string): Promise<void>;

  publishManyTopic(batch: ProducerManyTopic, producerConfig: ProducerConfig, conId: string): Promise<void>;
}

export interface KafkaProp {
  producers: { [producerKey: string]: Producer };
  consumers: { [groupId: string]: Consumer };
}
