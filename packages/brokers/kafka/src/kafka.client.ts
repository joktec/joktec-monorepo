import { Client } from '@joktec/core';
import { Consumer, ConsumerConfig, ConsumerSubscribeTopics, Kafka, Producer, ProducerConfig } from 'kafkajs';
import { KafkaConfig } from './kafka.config';
import { ConsumerBatchRunConfig, ConsumerMessageRunConfig, ProducerManyTopic, ProducerTopic } from './models';

export interface KafkaClient extends Client<KafkaConfig, Kafka> {
  consume(
    consumerTopics: ConsumerSubscribeTopics,
    consumerConfig: ConsumerConfig,
    runConfig: ConsumerMessageRunConfig,
    conId: string,
  ): Promise<void>;

  consumeBatch(
    consumerTopics: ConsumerSubscribeTopics,
    consumerConfig: ConsumerConfig,
    runConfig: ConsumerBatchRunConfig,
    conId: string,
  ): Promise<void>;

  publish(record: ProducerTopic, producerConfig: ProducerConfig, conId: string): Promise<void>;

  publishBatch(batch: ProducerManyTopic, producerConfig: ProducerConfig, conId: string): Promise<void>;
}

export interface KafkaProp {
  producers: { [producerKey: string]: Producer };
  consumers: { [groupId: string]: Consumer };
}
