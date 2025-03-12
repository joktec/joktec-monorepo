import { AbstractClientService, DEFAULT_CON_ID, Injectable, Retry } from '@joktec/core';
import { Consumer, ConsumerConfig, ConsumerSubscribeTopics, Kafka, Producer, ProducerConfig } from 'kafkajs';
import { KafkaClient, KafkaProp } from './kafka.client';
import { KafkaConfig } from './kafka.config';
import { PublishKafkaMetric } from './kafka.metric';
import { ConsumerBatchRunConfig, ConsumerMessageRunConfig, ProducerManyTopic, ProducerTopic } from './models';

const RETRY_OPTS = 'kafka.retry';

@Injectable()
export class KafkaService extends AbstractClientService<KafkaConfig, Kafka> implements KafkaClient {
  private props: { [conId: string]: KafkaProp } = {};

  constructor() {
    super('kafka', KafkaConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: KafkaConfig): Promise<Kafka> {
    config.log(this.logService);
    this.props[config.conId] = { producers: {}, consumers: {} };
    return new Kafka(config);
  }

  protected async start(client: Kafka, conId: string = DEFAULT_CON_ID): Promise<void> {
    // TODO: Do nothing
  }

  protected async stop(client: Kafka, conId: string = DEFAULT_CON_ID): Promise<void> {
    const props: KafkaProp = this.props[conId];
    Object.keys(props.producers).map(producerKey => props.producers[producerKey].disconnect());
    Object.keys(props.consumers).map(consumerKey => props.consumers[consumerKey].disconnect());
  }

  private async initProducer(
    key: string,
    producerConfig: ProducerConfig = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<Producer> {
    let producer = this.props[conId].producers[key];
    if (!producer) {
      this.props[conId].producers[key] = producer = this.getClient(conId).producer(producerConfig);
      this.logService.info(producerConfig, '[`%s` %s-producer] created', conId, key);

      await producer.connect();
      this.logService.info('[`%s` %s-producer] connected', conId, key);
    }
    return producer;
  }

  private async initConsumer(groupId: string, cfg: ConsumerConfig, conId: string = DEFAULT_CON_ID): Promise<Consumer> {
    let consumer = this.props[conId].consumers[groupId];
    if (!consumer) {
      this.props[conId].consumers[groupId] = consumer = this.getClient(conId).consumer(cfg);
      this.logService.info(cfg, '[`%s` %s-consumer] created', conId, groupId);

      await consumer.connect();
      this.logService.info('[`%s` %s-consumer] connected', conId, groupId);
    }

    return consumer;
  }

  async consume(
    consumerTopics: ConsumerSubscribeTopics,
    consumerConfig: ConsumerConfig,
    runConfig: ConsumerMessageRunConfig,
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const { topics } = consumerTopics;
    const { groupId } = consumerConfig;
    const consumer = await this.initConsumer(groupId, consumerConfig, conId);

    await consumer.subscribe(consumerTopics);
    topics.map(t => this.logService.info('[`%s` %s-consumer] of topic `%s` ready to consume', conId, groupId, t));
    await consumer.run(runConfig);
  }

  async consumeBatch(
    consumerTopics: ConsumerSubscribeTopics,
    consumerConfig: ConsumerConfig,
    runConfig: ConsumerBatchRunConfig,
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const { topics } = consumerTopics;
    const { groupId } = consumerConfig;
    const consumer = await this.initConsumer(groupId, consumerConfig, conId);

    await consumer.subscribe(consumerTopics);
    topics.map(t => this.logService.info('[`%s` %s-consumer] of topic `%s` ready to batch consume', conId, groupId, t));
    await consumer.run(runConfig);
  }

  @PublishKafkaMetric()
  async publish(
    record: ProducerTopic,
    producerConfig: ProducerConfig = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const key = record.producerKey ?? record.topic;
    const producer = await this.initProducer(key, producerConfig, conId);
    await producer.send(record);
  }

  @PublishKafkaMetric()
  async publishBatch(
    batch: ProducerManyTopic,
    producerConfig: ProducerConfig = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const producer = await this.initProducer(batch.producerKey, producerConfig, conId);
    await producer.sendBatch(batch);
  }
}
