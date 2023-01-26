import { Client } from '@baotg/core';
import { Consumer, ConsumerConfig, ConsumerSubscribeTopic, Kafka, Producer, ProducerConfig } from 'kafkajs';
import {
  ConsumerBatchRunConfig,
  ConsumerMessageRunConfig,
  KafkaClientConfig,
  ProducerTopic,
  ProducerManyTopic,
} from './kafka.config';

export interface KafkaClient extends Client<KafkaClientConfig, Kafka> {
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
