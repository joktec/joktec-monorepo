import { AbstractClientService, DEFAULT_CON_ID, Inject, Injectable, Retry } from '@joktec/core';
import amqp, { ConfirmChannel, Connection, Options } from 'amqplib';
import { has } from 'lodash';
import {
  RabbitMessage,
  RabbitPublishOptions,
  RabbitConsumeOptions,
  RabbitAssertQueue,
  RabbitAssertExchange,
  RabbitPurgeQueue,
  RabbitEmpty,
} from './models';
import { RabbitClient } from './rabbit.client';
import { RabbitConfig } from './rabbit.config';
import { RabbitMetric, RabbitMetricService } from './rabbit.metric';

const RETRY_OPTS = 'rabbit.retry';

@Injectable()
export class RabbitService extends AbstractClientService<RabbitConfig, Connection> implements RabbitClient {
  private channels: { [conId: string]: ConfirmChannel } = {};
  private hooks: { [conId: string]: ((conId: string) => Promise<void>)[] } = {};

  @Inject() private rabbitMetricService: RabbitMetricService;

  constructor() {
    super('rabbit', RabbitConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: RabbitConfig): Promise<Connection> {
    if (!has(this.hooks, config.conId)) this.hooks[config.conId] = [];
    const connection = await amqp.connect(config);

    connection.on(
      'error',
      (async (error: Error) => {
        this.logService.error(error, '`%s` rabbit connection error', config.conId);
        await this.clientInit(config, false);
      }).bind(this),
    );

    return connection;
  }

  @Retry(RETRY_OPTS)
  private async createChannel(channelId: string = DEFAULT_CON_ID, conId: string = DEFAULT_CON_ID): Promise<void> {
    if (!has(this.hooks, channelId)) {
      this.hooks[channelId] = [];
    }

    this.channels[channelId] = await this.getClient(conId).createConfirmChannel();
    this.logService.info('`%s` rabbit create confirmChannel `%s` success', conId, channelId);

    this.channels[conId]?.on(
      'error',
      (async (error: Error) => {
        this.logService.error(error, '`%s` rabbit confirmChannel error', conId);
        await this.createChannel(conId);
      }).bind(this),
    );

    for (const hook of this.hooks[conId]) await hook(conId);
  }

  @RabbitMetric()
  async sendToQueue(
    queue: string,
    messages: string[] = [],
    opts?: RabbitPublishOptions,
    conId: string = DEFAULT_CON_ID,
  ) {
    for (const msg of messages) {
      this.channels[conId].sendToQueue(queue, Buffer.from(msg), opts);
    }
    await this.channels[conId].waitForConfirms();
  }

  @RabbitMetric()
  async publish(
    exchange: string,
    messages: { key: string; content: string }[],
    opts?: RabbitPublishOptions,
    conId: string = DEFAULT_CON_ID,
  ) {
    for (const { key, content } of messages) {
      this.channels[conId].publish(exchange, key, Buffer.from(content), opts);
    }
    await this.channels[conId].waitForConfirms();
  }

  async consume(
    queue: string,
    callback: (msg: RabbitMessage) => Promise<void>,
    options: RabbitConsumeOptions = {},
    conId: string = DEFAULT_CON_ID,
  ) {
    const hook = async (conId: string) => {
      await this.channels[conId].prefetch(options.prefetchMessages ?? 10);
      await this.channels[conId].consume(
        queue,
        async (msg: RabbitMessage) => {
          try {
            this.logService.debug('`%s` rabbit consumed message: %s', conId, msg.content?.toString());
            await callback(msg);
            options.autoCommit && (await this.commit(msg, conId));
            this.rabbitMetricService.consume('SUCCESS', queue, conId);
          } catch (error) {
            this.logService.error(error, '`%s` rabbit handle message fail', conId);
            this.rabbitMetricService.consume('ERROR', queue, conId);
            await this.reject(msg, options.requeue ?? true, conId);
          }
        },
        options,
      );
    };

    this.hooks[conId].push(hook);
    await hook(conId);
  }

  async commit(msg: RabbitMessage, conId: string = DEFAULT_CON_ID) {
    this.channels[conId].ack(msg);
    await this.channels[conId].waitForConfirms();
  }

  async reject(msg: RabbitMessage, requeue?: boolean, conId: string = DEFAULT_CON_ID) {
    this.channels[conId].reject(msg, requeue ?? true);
    await this.channels[conId].waitForConfirms();
  }

  async queue(name: string, options?: Options.AssertQueue, conId: string = DEFAULT_CON_ID): Promise<RabbitAssertQueue> {
    return await this.channels[conId].assertQueue(name, options);
  }

  async check(name: string, conId: string = DEFAULT_CON_ID): Promise<RabbitAssertQueue> {
    return await this.channels[conId].checkQueue(name);
  }

  async purge(name: string, conId: string = DEFAULT_CON_ID): Promise<RabbitPurgeQueue> {
    return this.channels[conId].purgeQueue(name);
  }

  async cancel(consumerTag: string, conId: string = DEFAULT_CON_ID): Promise<RabbitEmpty> {
    return this.channels[conId].cancel(consumerTag);
  }

  async exchange(
    name: string,
    options?: Options.AssertExchange,
    conId: string = DEFAULT_CON_ID,
  ): Promise<RabbitAssertExchange> {
    return await this.channels[conId].assertExchange(name, 'topic', options);
  }

  async binding(
    exchange: string,
    queue: string,
    routingKey: string,
    exchangeOptions?: Options.AssertExchange,
    queueOptions?: Options.AssertQueue,
    conId: string = DEFAULT_CON_ID,
  ) {
    await this.exchange(exchange, exchangeOptions, conId);
    await this.queue(queue, queueOptions, conId);
    await this.channels[conId].bindQueue(queue, exchange, routingKey);
  }

  protected async start(client: Connection, conId: string = DEFAULT_CON_ID): Promise<void> {
    await this.createChannel(conId);
  }

  protected async stop(client: Connection, conId: string = DEFAULT_CON_ID): Promise<void> {
    await client.close();
  }
}
