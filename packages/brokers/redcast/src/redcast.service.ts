import { AbstractClientService, DEFAULT_CON_ID, Inject, Injectable } from '@joktec/core';
import { toBool, toInt } from '@joktec/utils';
import { RedisOptions } from 'ioredis/built/redis/RedisOptions';
import { has } from 'lodash';
import { PSubscribeCallback, SubscribeCallback } from './models';
import { Redcast, RedcastClient, RedcastProp } from './redcast.client';
import { RedcastConfig } from './redcast.config';
import { RedcastMetricService, RedcastPublishMetric, RedcastPublishStatus } from './redcast.metric';

@Injectable()
export class RedcastService extends AbstractClientService<RedcastConfig, Redcast> implements RedcastClient {
  private props: { [conId: string]: RedcastProp } = {};

  constructor(@Inject() private redcastMetricService: RedcastMetricService) {
    super('redcast', RedcastConfig);
  }

  protected async init(config: RedcastConfig): Promise<Redcast> {
    const redisOptions: RedisOptions = {
      ...config,
      host: config.host || 'localhost',
      port: toInt(config.port, 6379),
      db: config.database,
      readOnly: toBool(config.readonly, false),
      password: config?.password ? String(config.password) : undefined,
    };

    if (!has(this.props, config.conId)) {
      this.props[config.conId] = { publisher: new Redcast(redisOptions), subscriber: new Redcast(redisOptions) };
    }
    return this.props[config.conId].publisher;
  }

  protected async start(client: Redcast, conId: string = DEFAULT_CON_ID): Promise<void> {
    const pong = await client.ping();
    this.logService.info('`%s` redcast ping response: %s', conId, pong);
  }

  protected async stop(client: Redcast, conId: string = DEFAULT_CON_ID): Promise<void> {
    const { publisher, subscriber } = this.props[conId];
    await publisher.quit();
    await subscriber.quit();
    delete this.props[conId];
    this.logService.info('`%s` redcast connections closed', conId);
  }

  @RedcastPublishMetric()
  async publish(channel: string, messages: string[], conId: string = DEFAULT_CON_ID): Promise<number> {
    const { publisher } = this.props[conId];

    let subscribers: number = 0;
    for (const msg of messages) {
      subscribers = await publisher.publish(channel, msg);
    }

    return subscribers;
  }

  async subscribe(channel: string, callback: SubscribeCallback, conId: string = DEFAULT_CON_ID): Promise<void> {
    const { subscriber } = this.props[conId];

    const onMessageFn = async (ch: string, msg: string): Promise<void> => {
      try {
        this.logService.debug('`%s` [%s] redcast consumed message: %s', conId, channel, msg);
        await callback(ch, msg);
        this.redcastMetricService.consume(RedcastPublishStatus.SUCCESS, channel, conId);
      } catch (error) {
        this.logService.error(error, '`%s` [%s] redcast handle message fail', conId, channel);
        this.redcastMetricService.consume(RedcastPublishStatus.ERROR, channel, conId);
      }
    };

    subscriber.on('message', onMessageFn);
    await subscriber.subscribe(channel);
  }

  async pSubscribe(pattern: string, callback: PSubscribeCallback, conId: string = DEFAULT_CON_ID): Promise<void> {
    const { subscriber } = this.props[conId];

    const onPatternMessageFn = async (pat: string, ch: string, msg: string): Promise<void> => {
      try {
        this.logService.debug('`%s` [%s] redcast pattern matched message: %s', conId, pattern, msg);
        await callback(pat, ch, msg);
        this.redcastMetricService.consume(RedcastPublishStatus.SUCCESS, pattern, conId);
      } catch (error) {
        this.logService.error(error, '`%s` [%s] redcast handle pattern message fail', conId, pattern);
        this.redcastMetricService.consume(RedcastPublishStatus.ERROR, pattern, conId);
      }
    };

    subscriber.on('pmessage', onPatternMessageFn);
    await subscriber.psubscribe(pattern);
  }

  async unsubscribe(channel: string, conId: string = DEFAULT_CON_ID): Promise<void> {
    const { subscriber } = this.props[conId];
    await subscriber.unsubscribe(channel);
  }

  async pUnsubscribe(pattern: string, conId: string = DEFAULT_CON_ID): Promise<void> {
    const { subscriber } = this.props[conId];
    await subscriber.punsubscribe(pattern);
  }

  async quit(conId: string = DEFAULT_CON_ID): Promise<void> {
    const { publisher, subscriber } = this.props[conId];
    await publisher.quit();
    await subscriber.quit();
  }

  async reset(conId: string = DEFAULT_CON_ID): Promise<void> {
    const config = this.getConfig(conId);
    await this.quit(conId);
    await this.clientInit(config, true);
  }
}
