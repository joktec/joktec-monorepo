import { AbstractClientService, DEFAULT_CON_ID, Injectable } from '@joktec/core';
import { ConsumerConfig, ConsumerSubscribeTopic, Kafka, ProducerConfig } from 'kafkajs';
import { KafkaClient, KafkaProp } from './kafka.client';
import {
  ConsumerBatchRunConfig,
  ConsumerMessageRunConfig,
  KafkaConfig,
  ProducerManyTopic,
  ProducerTopic,
} from './kafka.config';
import { PublishKafkaMetric } from './kafka.metric';

@Injectable()
export class KafkaService extends AbstractClientService<KafkaConfig, Kafka> implements KafkaClient {
  private props: { [conId: string]: KafkaProp } = {};

  constructor() {
    super('kafka', KafkaConfig);
  }

  async init(config: KafkaConfig): Promise<Kafka> {
    config.log(this.logService);
    this.props[config.conId] = { producers: {}, consumers: {} };
    return new Kafka(config);
  }

  async start(client: Kafka, conId: string = DEFAULT_CON_ID): Promise<void> {
    // TODO: Do nothing
  }

  async pause(topic: string, conId: string = DEFAULT_CON_ID): Promise<void> {
    // TODO: Do nothing
  }

  async resume(topic: string, conId: string = DEFAULT_CON_ID): Promise<void> {
    // TODO: Do nothing
  }

  async stop(client: Kafka, conId: string = DEFAULT_CON_ID): Promise<void> {
    Object.keys(this.props).map(key => {
      const props: KafkaProp = this.props[key];
      Object.keys(props.producers).map(producerKey => props.producers[producerKey].disconnect());
      Object.keys(props.consumers).map(consumerKey => props.consumers[consumerKey].disconnect());
    });
  }

  async initProducer(key: string, producerConfig: ProducerConfig = {}, conId: string = DEFAULT_CON_ID) {
    let producer = this.props[conId].producers[key];
    if (!producer) {
      this.props[conId].producers[key] = producer = this.getClient(conId).producer(producerConfig);
      this.logService.info(producerConfig, '[`%s` %s-producer] created', conId, key);

      await producer.connect();
      this.logService.info('[`%s` %s-producer] connected', conId, key);
    }
    return producer;
  }

  async initConsumer(groupId: string, consumerCfg: ConsumerConfig, conId: string = DEFAULT_CON_ID) {
    let consumer = this.props[conId].consumers[groupId];

    if (!consumer) {
      this.props[conId].consumers[groupId] = consumer = this.getClient(conId).consumer(consumerCfg);
      this.logService.info(consumerCfg, '[`%s` %s-consumer] created', conId, groupId);

      await consumer.connect();
      this.logService.info('[`%s` %s-consumer] connected', conId, groupId);
    }
    return consumer;
  }

  async consume(
    consumerSubscribeTopic: ConsumerSubscribeTopic,
    consumerCfg: ConsumerConfig,
    consumerRunConfig: ConsumerBatchRunConfig | ConsumerMessageRunConfig,
    conId: string = DEFAULT_CON_ID,
  ) {
    const { topic } = consumerSubscribeTopic;
    const { groupId } = consumerCfg;
    const consumer = await this.initConsumer(groupId, consumerCfg, conId);

    await consumer.subscribe(consumerSubscribeTopic);
    this.logService.info('[`%s` %s-consumer] of topic `%s` ready to consume', conId, groupId, topic);

    await consumer.run(consumerRunConfig);
  }

  @PublishKafkaMetric()
  async publish(record: ProducerTopic, producerConfig: ProducerConfig = {}, conId: string = DEFAULT_CON_ID) {
    const key = record.producerKey ?? record.topic;
    const producer = await this.initProducer(key, producerConfig, conId);
    await producer.send(record);
  }

  @PublishKafkaMetric()
  async publishManyTopic(
    batch: ProducerManyTopic,
    producerConfig: ProducerConfig = {},
    conId: string = DEFAULT_CON_ID,
  ) {
    const producer = await this.initProducer(batch.producerKey, producerConfig, conId);
    await producer.sendBatch(batch);
  }
}
