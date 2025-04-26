import { AbstractClientService, DEFAULT_CON_ID, Inject, Injectable, Retry } from '@joktec/core';
import { toBool } from '@joktec/utils';
import { Consumer, EachBatchHandler, EachMessageHandler, Kafka, Message, Partitioners, Producer } from 'kafkajs';
import { isBuffer, isString } from 'lodash';
import { KafkaClient, KafkaProp } from './kafka.client';
import { KafkaConfig } from './kafka.config';
import { KafkaMetricService, KafkaMetricStatus, KafkaSendMetric } from './kafka.metric';
import {
  KafkaBatchMessage,
  KafkaConsumeConfig,
  KafkaConsumeOptions,
  KafkaEachMessage,
  KafkaProduceBatch,
  KafkaProduceBatchOptions,
  KafkaProduceConfig,
  KafkaProducerOptions,
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

  private async initProducer(
    key: string,
    cfg: KafkaProduceConfig = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<Producer> {
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

  private async initConsumer(
    groupId: string,
    cfg: KafkaConsumeConfig = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<Consumer> {
    let consumer = this.props[conId].consumers[groupId];
    if (!consumer) {
      this.props[conId].consumers[groupId] = consumer = this.getClient(conId).consumer({
        ...cfg,
        groupId,
      });
      this.logService.info(cfg, '`%s` [%s] created', conId, groupId);

      await consumer.connect();
      this.logService.info('`%s` [%s] connected', conId, groupId);
    }
    return consumer;
  }

  async consume(
    topics: (string | RegExp)[],
    groupId: string,
    callback: (payload: KafkaEachMessage) => Promise<void>,
    options: KafkaConsumeOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const consumer = await this.initConsumer(groupId, options.config, conId);
    await consumer.subscribe({ topics, fromBeginning: toBool(options.fromBeginning, false) });
    topics.map(t => this.logService.info('`%s` [%s] of topic `%s` ready to consume', conId, groupId, t));

    const onMessageFn: EachMessageHandler = async (payload: KafkaEachMessage) => {
      const key = `${payload.topic}-${payload.partition}`;
      const content = payload.message.value?.toString();
      try {
        this.logService.debug('`%s` [%s] kafka consumed message: %s', conId, groupId, content);
        await callback(payload);
        this.kafkaMetricService.receive('consume', KafkaMetricStatus.SUCCESS, key, conId);
      } catch (error) {
        this.logService.error(error, '`%s` [%s] kafka handle message fail', conId, groupId);
        this.kafkaMetricService.receive('consume', KafkaMetricStatus.ERROR, key, conId);
      }
    };

    await consumer.run({ ...options.runConfig, eachMessage: onMessageFn });
  }

  async consumeBatch(
    topics: (string | RegExp)[],
    groupId: string,
    callback: (payload: KafkaBatchMessage) => Promise<void>,
    options: KafkaConsumeOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const consumer = await this.initConsumer(groupId, options.config, conId);
    await consumer.subscribe({ topics, fromBeginning: toBool(options.fromBeginning, false) });
    topics.map(t => this.logService.info('`%s` [%s] of topic `%s` ready to batch consume', conId, groupId, t));

    const onMessageFn: EachBatchHandler = async (payload: KafkaBatchMessage) => {
      const key = `${payload.batch.topic}-${payload.batch.partition}`;
      const totalContent = payload.batch.messages.length;
      try {
        this.logService.debug('`%s` [%s] kafka consumed %s message(s)', conId, groupId, totalContent);
        await callback(payload);
        this.kafkaMetricService.receive('consumeBatch', KafkaMetricStatus.SUCCESS, key, conId);
      } catch (error) {
        const msg = '`%s` [%s] kafka handle %s message(s) fail';
        this.logService.error(error, msg, conId, groupId, totalContent);
        this.kafkaMetricService.receive('consumeBatch', KafkaMetricStatus.ERROR, key, conId);
      }
    };

    await consumer.run({ ...options.runConfig, eachBatch: onMessageFn });
  }

  @KafkaSendMetric()
  async send(
    topic: string,
    messages: (string | Buffer | Message)[],
    options: KafkaProducerOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const key = options.record?.producerKey ?? topic;
    const producer = await this.initProducer(key, options.config, conId);
    await producer.send({
      ...options.record,
      topic,
      messages: messages.map(msg => (isBuffer(msg) || isString(msg) ? { value: msg } : msg) as Message),
    });
  }

  @KafkaSendMetric()
  async sendBatch(
    batch: KafkaProduceBatch,
    options: KafkaProduceBatchOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const producer = await this.initProducer(batch.producerKey, options.config, conId);
    await producer.sendBatch(batch);
  }
}
