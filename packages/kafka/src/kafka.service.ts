import { AbstractClientService, DEFAULT_CON_ID, Inject, Injectable, Retry } from '@joktec/core';
import {
  Consumer,
  ConsumerConfig,
  ConsumerSubscribeTopics,
  EachBatchHandler,
  EachMessageHandler,
  Kafka,
  Partitioners,
  Producer,
  ProducerConfig,
} from 'kafkajs';
import { KafkaClient, KafkaProp } from './kafka.client';
import { KafkaConfig } from './kafka.config';
import { KafkaConsumeType, KafkaMetricService, KafkaPublishMetric, KafkaPublishStatus } from './kafka.metric';
import {
  ConsumerBatchRunConfig,
  ConsumerMessageRunConfig,
  KafkaBatchMessage,
  KafkaEachMessage,
  ProducerManyTopic,
  ProducerTopic,
} from './models';

const RETRY_OPTS = 'kafka.retry';

@Injectable()
export class KafkaService extends AbstractClientService<KafkaConfig, Kafka> implements KafkaClient {
  private props: { [conId: string]: KafkaProp } = {};

  constructor(@Inject() private kafkaMetricService: KafkaMetricService) {
    super('kafka', KafkaConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: KafkaConfig): Promise<Kafka> {
    config.log(this.logService);
    this.props[config.conId] = { producers: {}, consumers: {} };
    return new Kafka({ ...config });
  }

  protected async start(client: Kafka, conId: string = DEFAULT_CON_ID): Promise<void> {
    // TODO: Do nothing
  }

  protected async stop(client: Kafka, conId: string = DEFAULT_CON_ID): Promise<void> {
    const props: KafkaProp = this.props[conId];

    for (const producerKey of Object.keys(props.producers)) {
      await props.producers[producerKey].disconnect();
      this.logService.info('`%s` [%s] disconnect', conId, producerKey);
    }

    for (const consumerKey of Object.keys(props.consumers)) {
      await props.consumers[consumerKey].disconnect();
      this.logService.info('`%s` [%s] disconnect', conId, consumerKey);
    }
  }

  private async initProducer(key: string, cfg: ProducerConfig = {}, conId: string = DEFAULT_CON_ID): Promise<Producer> {
    let producer = this.props[conId].producers[key];
    if (!producer) {
      this.props[conId].producers[key] = producer = this.getClient(conId).producer({
        createPartitioner: Partitioners.LegacyPartitioner,
        ...cfg,
      });
      this.logService.info(cfg, '`%s` [%s] created', conId, key);

      await producer.connect();
      this.logService.info('`%s` [%s] connected', conId, key);
    }
    return producer;
  }

  private async initConsumer(groupId: string, cfg: ConsumerConfig, conId: string = DEFAULT_CON_ID): Promise<Consumer> {
    let consumer = this.props[conId].consumers[groupId];
    if (!consumer) {
      this.props[conId].consumers[groupId] = consumer = this.getClient(conId).consumer({
        ...cfg,
      });
      this.logService.info(cfg, '`%s` [%s] created', conId, groupId);

      await consumer.connect();
      this.logService.info('`%s` [%s] connected', conId, groupId);
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
    topics.map(t => this.logService.info('`%s` [%s] of topic `%s` ready to consume', conId, groupId, t));

    const onMessageFn: EachMessageHandler = async (payload: KafkaEachMessage) => {
      const key = `${payload.topic}-${payload.partition}`;
      const content = payload.message.value?.toString();
      try {
        this.logService.debug('`%s` [%s] kafka consumed message: %s', conId, groupId, content);
        await runConfig.eachMessage(payload);
        this.kafkaMetricService.consume(KafkaConsumeType.EACH, KafkaPublishStatus.SUCCESS, key, conId);
      } catch (error) {
        this.logService.error(error, '`%s` [%s] kafka handle message fail', conId, groupId);
        this.kafkaMetricService.consume(KafkaConsumeType.EACH, KafkaPublishStatus.ERROR, key, conId);
      }
    };

    await consumer.run({ ...runConfig, eachMessage: onMessageFn });
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
    topics.map(t => this.logService.info('`%s` [%s] of topic `%s` ready to batch consume', conId, groupId, t));

    const onMessageFn: EachBatchHandler = async (payload: KafkaBatchMessage) => {
      const key = `${payload.batch.topic}-${payload.batch.partition}`;
      const totalContent = payload.batch.messages.length;
      try {
        this.logService.debug('`%s` [%s] kafka consumed %s message(s)', conId, groupId, totalContent);
        await runConfig.eachBatch(payload);
        this.kafkaMetricService.consume(KafkaConsumeType.BATCH, KafkaPublishStatus.SUCCESS, key, conId);
      } catch (error) {
        const msg = '`%s` [%s] kafka handle %s message(s) fail';
        this.logService.error(error, msg, conId, groupId, totalContent);
        this.kafkaMetricService.consume(KafkaConsumeType.BATCH, KafkaPublishStatus.ERROR, key, conId);
      }
    };

    await consumer.run({ ...runConfig, eachBatch: onMessageFn });
  }

  @KafkaPublishMetric()
  async publish(
    record: ProducerTopic,
    producerConfig: ProducerConfig = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const key = record.producerKey ?? record.topic;
    const producer = await this.initProducer(key, producerConfig, conId);
    await producer.send(record);
  }

  @KafkaPublishMetric()
  async publishBatch(
    batch: ProducerManyTopic,
    producerConfig: ProducerConfig = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const producer = await this.initProducer(batch.producerKey, producerConfig, conId);
    await producer.sendBatch(batch);
  }
}
