import { AbstractClientService, DEFAULT_CON_ID, Inject, Injectable, Retry } from '@joktec/core';
import { toArray, toInt } from '@joktec/utils';
import amqp, { ChannelModel, ConfirmChannel } from 'amqplib';
import { has } from 'lodash';
import {
  RABBIT_AUTO_BINDING,
  RabbitAssertExchange,
  RabbitAssertExchangeOptions,
  RabbitAssertOptions,
  RabbitAssertQueue,
  RabbitAutoBindingRegistry,
  RabbitBaseOptions,
  RabbitBindingOptions,
  RabbitConsumeOptions,
  RabbitEmpty,
  RabbitExchangeType,
  RabbitMessage,
  RabbitPublishOptions,
  RabbitPublishResult,
  RabbitPurgeQueue,
  RabbitRejectOptions,
} from './models';
import { RabbitClient, RabbitProp } from './rabbit.client';
import { RabbitConfig } from './rabbit.config';
import { RabbitMetricService, RabbitPublishMetric, RabbitPublishStatus } from './rabbit.metric';

const RETRY_OPTS = 'rabbit.retry';

@Injectable()
export class RabbitService extends AbstractClientService<RabbitConfig, ChannelModel> implements RabbitClient {
  private props: { [conId: string]: RabbitProp } = {};

  constructor(
    @Inject(RABBIT_AUTO_BINDING) private autoBindingRegistry: RabbitAutoBindingRegistry,
    @Inject() private rabbitMetricService: RabbitMetricService,
  ) {
    super('rabbit', RabbitConfig);
  }

  @Retry(RETRY_OPTS)
  protected async init(config: RabbitConfig): Promise<ChannelModel> {
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

  protected async start(client: ChannelModel, conId: string = DEFAULT_CON_ID): Promise<void> {
    if (has(this.autoBindingRegistry, conId)) {
      const autoBinding = toArray(this.autoBindingRegistry[conId]);
      for (const { queue, exchangeKey, routingKey, type, opts } of autoBinding) {
        await this.binding(queue, { exchangeKey, routingKey, type }, opts, conId);
      }
    }
  }

  protected async stop(client: ChannelModel, conId: string = DEFAULT_CON_ID): Promise<void> {
    const props: RabbitProp = this.props[conId];
    Object.keys(props.channels).map(channelKey => props.channels[channelKey].close());
  }

  @Retry(RETRY_OPTS)
  private async createChannel(key: string, conId: string = DEFAULT_CON_ID): Promise<ConfirmChannel> {
    let channel = this.props[conId].channels[key];
    if (!channel) {
      if (!this.props[conId].hooks[key]) this.props[conId].hooks[key] = [];
      this.props[conId].channels[key] = channel = await this.getClient(conId).createConfirmChannel();
      this.logService.info('`%s` rabbit create confirmChannel `%s` success', conId, key);

      channel?.on(
        'error',
        (async (error: Error) => {
          this.logService.error(error, '`%s` rabbit confirmChannel error', conId);
          await this.createChannel(conId);
        }).bind(this, key, conId),
      );

      const hooks = this.props[conId].hooks[key];
      for (const hook of hooks) {
        await hook(this.props[conId].channels[key]);
      }
    }

    return channel;
  }

  @RabbitPublishMetric()
  async sendToQueue(
    queue: string,
    messages: string[],
    opts: RabbitPublishOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<RabbitPublishResult> {
    const { channelKey = DEFAULT_CON_ID } = opts;
    const channel = await this.createChannel(channelKey, conId);

    const result: RabbitPublishResult = { success: 0, failed: 0 };
    for (const msg of messages) {
      const success = channel.sendToQueue(queue, Buffer.from(msg), opts);
      if (success) result.success++;
      else result.failed++;
    }
    await channel.waitForConfirms();

    return result;
  }

  @RabbitPublishMetric()
  async publish(
    exchange: string,
    messages: { key: string; content: string }[],
    opts: RabbitPublishOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<RabbitPublishResult> {
    const { channelKey = DEFAULT_CON_ID } = opts;
    const channel = await this.createChannel(channelKey, conId);

    const result: RabbitPublishResult = { success: 0, failed: 0 };
    for (const { key, content } of messages) {
      const success = channel.publish(exchange, key, Buffer.from(content), opts);
      if (success) result.success++;
      else result.failed++;
    }
    await channel.waitForConfirms();

    return result;
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
        this.logService.debug('`%s` [%s] rabbit consumed message: %s', conId, channelKey, msg.content?.toString());
        await callback(msg);
        opts.autoCommit && (await this.commit(msg, opts, conId));
        this.rabbitMetricService.consume(RabbitPublishStatus.SUCCESS, queue, conId);
      } catch (error) {
        this.logService.error(error, '`%s` [%s] rabbit handle message fail', conId, channelKey);
        this.rabbitMetricService.consume(RabbitPublishStatus.ERROR, queue, conId);
        await this.reject(msg, opts, conId);
      }
    };

    const hook = async (_channel: ConfirmChannel) => {
      await _channel.prefetch(toInt(opts.prefetchMessages, 1));
      await _channel.consume(queue, onMessageFn, opts);
    };

    this.props[conId].hooks[channelKey].push(hook);
    await hook(channel);
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
    return await channel.assertQueue(name, { durable: true, ...opts });
  }

  async assertExchange(
    name: string,
    type: RabbitExchangeType | string = RabbitExchangeType.TOPIC,
    opts: RabbitAssertExchangeOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<RabbitAssertExchange> {
    const { channelKey = DEFAULT_CON_ID } = opts;
    const channel = await this.createChannel(channelKey, conId);
    return await channel.assertExchange(name, type, { durable: true, ...opts });
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

  async binding(
    queue: string,
    exchange: { exchangeKey: string; routingKey: string; type?: RabbitExchangeType | string },
    opts: RabbitBindingOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<RabbitEmpty> {
    const { channelKey = DEFAULT_CON_ID, queueOptions = {}, exchangeOptions = {} } = opts;
    const exchangeType = exchange.type || RabbitExchangeType.TOPIC;

    if (!queueOptions.channelKey) queueOptions.channelKey = channelKey;
    if (!exchangeOptions.channelKey) exchangeOptions.channelKey = channelKey;

    const channel = await this.createChannel(channelKey, conId);

    await this.assertExchange(exchange.exchangeKey, exchangeType, exchangeOptions, conId);
    await this.assert(queue, queueOptions, conId);
    return channel.bindQueue(queue, exchange.exchangeKey, exchange.routingKey);
  }
}
