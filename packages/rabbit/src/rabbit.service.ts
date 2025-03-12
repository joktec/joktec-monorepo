import { AbstractClientService, DEFAULT_CON_ID, Inject, Injectable, Retry, toInt } from '@joktec/core';
import amqp, { ConfirmChannel, Connection } from 'amqplib';
import { has } from 'lodash';
import {
  RabbitAssertExchange,
  RabbitAssertExchangeOptions,
  RabbitAssertOptions,
  RabbitAssertQueue,
  RabbitBaseOptions,
  RabbitBindingOptions,
  RabbitConsumeOptions,
  RabbitEmpty,
  RabbitMessage,
  RabbitPublishOptions,
  RabbitPurgeQueue,
  RabbitRejectOptions,
} from './models';
import { RabbitClient, RabbitProp } from './rabbit.client';
import { RabbitConfig } from './rabbit.config';
import { RabbitMetric, RabbitMetricService } from './rabbit.metric';

const RETRY_OPTS = 'rabbit.retry';

@Injectable()
export class RabbitService extends AbstractClientService<RabbitConfig, Connection> implements RabbitClient {
  private props: { [conId: string]: RabbitProp } = {};

  @Inject() private rabbitMetricService: RabbitMetricService;

  constructor() {
    super('rabbit', RabbitConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: RabbitConfig): Promise<Connection> {
    if (!has(this.props, config.conId)) {
      this.props[config.conId] = { channels: {}, hooks: {} };
    }

    const connection = await amqp.connect(config);
    connection.on(
      'error',
      (async (error: Error) => {
        this.logService.error(error, '`%s` rabbit connection error', config.conId);
        await this.clientInit(config, false);
      }).bind(this, config),
    );

    return connection;
  }

  protected async start(client: Connection, conId: string = DEFAULT_CON_ID): Promise<void> {
    // TODO: Do nothing
  }

  protected async stop(client: Connection, conId: string = DEFAULT_CON_ID): Promise<void> {
    const props: RabbitProp = this.props[conId];
    Object.keys(props.channels).map(channelKey => props.channels[channelKey].close());
  }

  @Retry(RETRY_OPTS)
  private async createChannel(key: string, conId: string = DEFAULT_CON_ID): Promise<ConfirmChannel> {
    let channel = this.props[conId].channels[key];
    if (!channel) {
      this.props[conId].hooks[key] = [];
      this.props[conId].channels[key] = channel = await this.getClient(conId).createConfirmChannel();
      this.logService.info('`%s` rabbit create confirmChannel `%s` success', conId, key);

      channel?.on(
        'error',
        (async (error: Error) => {
          this.logService.error(error, '`%s` rabbit confirmChannel error', conId);
          await this.createChannel(conId);
        }).bind(this, key, conId),
      );
    }

    const hooks = this.props[conId].hooks[key];
    for (const hook of hooks) {
      await hook();
    }

    return channel;
  }

  @RabbitMetric()
  async sendToQueue(
    queue: string,
    messages: string[] = [],
    opts: RabbitPublishOptions = {},
    conId: string = DEFAULT_CON_ID,
  ) {
    const { channelKey = DEFAULT_CON_ID } = opts;
    const channel = await this.createChannel(channelKey, conId);
    for (const msg of messages) {
      channel.sendToQueue(queue, Buffer.from(msg), opts);
    }
    await channel.waitForConfirms();
  }

  @RabbitMetric()
  async publish(
    exchange: string,
    messages: { key: string; content: string }[],
    opts: RabbitPublishOptions = {},
    conId: string = DEFAULT_CON_ID,
  ) {
    const { channelKey = DEFAULT_CON_ID } = opts;
    const channel = await this.createChannel(channelKey, conId);
    for (const { key, content } of messages) {
      channel.publish(exchange, key, Buffer.from(content), opts);
    }
    await channel.waitForConfirms();
  }

  async consume(
    queue: string,
    callback: (msg: RabbitMessage) => Promise<void>,
    opts: RabbitConsumeOptions = {},
    conId: string = DEFAULT_CON_ID,
  ) {
    const { channelKey = DEFAULT_CON_ID } = opts;
    const channel = await this.createChannel(channelKey, conId);

    const onMessageFn = async (msg: RabbitMessage): Promise<void> => {
      try {
        this.logService.debug('`%s` rabbit consumed message: %s', conId, msg.content?.toString());
        await callback(msg);
        opts.autoCommit && (await this.commit(msg, opts, conId));
        this.rabbitMetricService.consume('SUCCESS', queue, conId);
      } catch (error) {
        this.logService.error(error, '`%s` rabbit handle message fail', conId);
        this.rabbitMetricService.consume('ERROR', queue, conId);
        await this.reject(msg, opts, conId);
      }
    };

    const hook = async () => {
      await channel.prefetch(toInt(opts.prefetchMessages) ?? 1);
      await channel.consume(queue, onMessageFn, opts);
    };

    this.props[conId].hooks[channelKey].push(hook);
    await hook();
  }

  async commit(msg: RabbitMessage, opts: RabbitBaseOptions = {}, conId: string = DEFAULT_CON_ID) {
    const { channelKey = DEFAULT_CON_ID } = opts;
    const channel = await this.createChannel(channelKey, conId);
    channel.ack(msg);
    await channel.waitForConfirms();
  }

  async reject(msg: RabbitMessage, opts: RabbitRejectOptions = {}, conId: string = DEFAULT_CON_ID) {
    const { channelKey = DEFAULT_CON_ID, requeue = true } = opts;
    const channel = await this.createChannel(channelKey, conId);
    channel.reject(msg, requeue);
    await channel.waitForConfirms();
  }

  async assert(
    name: string,
    opts: RabbitAssertOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<RabbitAssertQueue> {
    const { channelKey = DEFAULT_CON_ID } = opts;
    const channel = await this.createChannel(channelKey, conId);
    return await channel.assertQueue(name, opts);
  }

  async check(name: string, opts: RabbitBaseOptions = {}, conId: string = DEFAULT_CON_ID): Promise<RabbitAssertQueue> {
    const { channelKey = DEFAULT_CON_ID } = opts;
    const channel = await this.createChannel(channelKey, conId);
    return await channel.checkQueue(name);
  }

  async purge(name: string, opts: RabbitBaseOptions = {}, conId: string = DEFAULT_CON_ID): Promise<RabbitPurgeQueue> {
    const { channelKey = DEFAULT_CON_ID } = opts;
    const channel = await this.createChannel(channelKey, conId);
    return await channel.purgeQueue(name);
  }

  async cancel(
    consumerTag: string,
    opts: RabbitBaseOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<RabbitEmpty> {
    const { channelKey = DEFAULT_CON_ID } = opts;
    const channel = await this.createChannel(channelKey, conId);
    return channel.cancel(consumerTag);
  }

  async assertExchange(
    name: string,
    opts: RabbitAssertExchangeOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<RabbitAssertExchange> {
    const { channelKey = DEFAULT_CON_ID } = opts;
    const channel = await this.createChannel(channelKey, conId);
    return await channel.assertExchange(name, 'topic', opts);
  }

  async binding(
    queue: string,
    exchange: { exchangeKey: string; routingKey: string },
    opts: RabbitBindingOptions = {},
    conId: string = DEFAULT_CON_ID,
  ) {
    const { channelKey = DEFAULT_CON_ID, queueOptions = {}, exchangeOptions = {} } = opts;
    const channel = await this.createChannel(channelKey, conId);

    if (!queueOptions.channelKey) queueOptions.channelKey = channelKey;
    if (!exchangeOptions.channelKey) exchangeOptions.channelKey = channelKey;

    await this.assertExchange(exchange.exchangeKey, exchangeOptions, conId);
    await this.assert(queue, queueOptions, conId);
    await channel.bindQueue(queue, exchange.exchangeKey, exchange.routingKey);
  }
}
