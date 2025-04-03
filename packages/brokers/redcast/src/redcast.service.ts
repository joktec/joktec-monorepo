import {
  AbstractClientService,
  DEFAULT_CON_ID,
  Inject,
  Injectable,
  InternalServerException,
  Retry,
} from '@joktec/core';
import { sleep, toBool, toInt } from '@joktec/utils';
import { RedisOptions } from 'ioredis/built/redis/RedisOptions';
import { has } from 'lodash';
import {
  RedcastConsumeCallback,
  RedcastConsumeOptions,
  RedcastPSubscribeCallback,
  RedcastStreamOptions,
  RedcastSubscribeCallback,
} from './models';
import { Redcast, RedcastClient, RedcastProp } from './redcast.client';
import { RedcastConfig } from './redcast.config';
import { RedcastMetricService, RedcastMetricStatus, RedcastSendMetric } from './redcast.metric';

const INFINITY_LOOP = true;
const RETRY_OPTS = 'redcast.retry';

@Injectable()
export class RedcastService extends AbstractClientService<RedcastConfig, Redcast> implements RedcastClient {
  private props: { [conId: string]: RedcastProp } = {};

  constructor(@Inject() private redcastMetricService: RedcastMetricService) {
    super('redcast', RedcastConfig);
  }

  @Retry(RETRY_OPTS)
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
    const version = await this.checkVersion(conId);
    this.logService.info('`%s` redcast ping response: %s (Redis version: %s)', conId, pong, version);
  }

  protected async stop(client: Redcast, conId: string = DEFAULT_CON_ID): Promise<void> {
    const { publisher, subscriber } = this.props[conId];
    await publisher.quit();
    await subscriber.quit();
    delete this.props[conId];
    this.logService.info('`%s` redcast connections closed', conId);
  }

  async checkVersion(conId: string = DEFAULT_CON_ID): Promise<string> {
    const client = this.getClient(conId);
    const info = await client.info('server');
    const versionLine = info.split('\n').find(line => line.startsWith('redis_version'));
    return versionLine?.split(':')[1].trim();
  }

  @RedcastSendMetric()
  async publish(channel: string, messages: string[], conId: string = DEFAULT_CON_ID): Promise<number> {
    const { publisher } = this.props[conId];

    let subscribers: number = 0;
    for (const msg of messages) {
      subscribers = await publisher.publish(channel, msg);
    }

    return subscribers;
  }

  async subscribe(channel: string, callback: RedcastSubscribeCallback, conId: string = DEFAULT_CON_ID): Promise<void> {
    const { subscriber } = this.props[conId];

    const onMessageFn = async (ch: string, msg: string): Promise<void> => {
      try {
        this.logService.debug('`%s` [%s] redcast consumed message: %s', conId, channel, msg);
        await callback(ch, msg);
        this.redcastMetricService.receive('subscribe', RedcastMetricStatus.SUCCESS, channel, conId);
      } catch (error) {
        this.logService.error(error, '`%s` [%s] redcast handle message fail', conId, channel);
        this.redcastMetricService.receive('subscribe', RedcastMetricStatus.ERROR, channel, conId);
      }
    };

    subscriber.on('message', onMessageFn);
    await subscriber.subscribe(channel);
  }

  async pSubscribe(
    pattern: string,
    callback: RedcastPSubscribeCallback,
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const { subscriber } = this.props[conId];

    const onPatternMessageFn = async (pat: string, ch: string, msg: string): Promise<void> => {
      try {
        this.logService.debug('`%s` [%s] redcast pattern matched message: %s', conId, pattern, msg);
        await callback(pat, ch, msg);
        this.redcastMetricService.receive('pSubscribe', RedcastMetricStatus.SUCCESS, pattern, conId);
      } catch (error) {
        this.logService.error(error, '`%s` [%s] redcast handle pattern message fail', conId, pattern);
        this.redcastMetricService.receive('pSubscribe', RedcastMetricStatus.ERROR, pattern, conId);
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

  @RedcastSendMetric()
  async sendToQueue(queue: string, messages: string[], conId: string = DEFAULT_CON_ID): Promise<number> {
    const { publisher } = this.props[conId];
    return publisher.rpush(queue, ...messages);
  }

  async consume(
    queue: string,
    callback: RedcastConsumeCallback,
    options: RedcastConsumeOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const { subscriber } = this.props[conId];
    const reliable = options.reliable === true;
    const timeout = options.timeout || 0;
    const processingQueue = `${queue}:processing`;

    const brpop = async (): Promise<void> => {
      const res = await subscriber.brpop(queue, timeout);
      if (res && res[1]) {
        this.logService.debug('`%s` redcast consumed message from queue [%s]: %s', conId, queue, res[1]);
        try {
          await callback(res[0], res[1]);
          this.redcastMetricService.receive('consume', RedcastMetricStatus.SUCCESS, queue, conId);
        } catch (error) {
          this.logService.error(error, '`%s` redcast handle consume message fail', conId, queue);
          this.redcastMetricService.receive('consume', RedcastMetricStatus.ERROR, queue, conId);
        }
      }
    };

    const rpoplpush = async (): Promise<void> => {
      const msg = await subscriber.rpoplpush(queue, processingQueue);
      if (msg) {
        const logMsg = '`%s` redcast reliably consumed from [%s] → [%s]: %s';
        this.logService.debug(logMsg, conId, queue, processingQueue, msg);
        try {
          await callback(queue, msg);
          this.redcastMetricService.receive('consume', RedcastMetricStatus.SUCCESS, queue, conId);
          await subscriber.lrem(processingQueue, 1, msg);
        } catch (error) {
          this.logService.error(error, '`%s` redcast handle consume message fail', conId, queue);
          this.redcastMetricService.receive('consume', RedcastMetricStatus.ERROR, queue, conId);
        }
      } else {
        await sleep(timeout * 1000);
      }
    };

    const loop = async () => {
      while (INFINITY_LOOP) {
        try {
          await (reliable ? rpoplpush() : brpop());
        } catch (error) {
          this.logService.error(error, '`%s` redcast failed to consume from queue [%s]', conId, queue);
          await sleep(1000);
        }
      }
    };

    loop().catch(err => {
      this.logService.error(err, '`%s` redcast consumer loop crashed for queue [%s]', conId, queue);
    });
  }

  @RedcastSendMetric()
  async sendToStream(streamKey: string, messages: string[], conId: string = DEFAULT_CON_ID): Promise<number> {
    const redisVersion = await this.checkVersion(conId);
    if (!redisVersion || parseFloat(redisVersion) < 5.0) {
      const logMsg = `Redis version must be >= 5.0 to use Streams. Current version: ${redisVersion}`;
      throw new InternalServerException(logMsg);
    }

    const { publisher } = this.props[conId];
    let count = 0;
    for (const message of messages) {
      await publisher.xadd(streamKey, '*', 'message', message);
      count++;
    }
    return count;
  }

  async consumeStream(
    stream: string,
    callback: RedcastConsumeCallback,
    streamOpts: RedcastStreamOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const { subscriber } = this.props[conId];
    const groupId = streamOpts.groupId || 'default-group';
    const consumerId = streamOpts.consumerId || 'consumer-' + Math.random().toString(36).substring(2);
    const autoAck = toBool(streamOpts.autoAck, true);
    const timeout = toInt(streamOpts.timeout, 0);

    try {
      await subscriber.xgroup('CREATE', stream, groupId, '$', 'MKSTREAM');
    } catch (err: any) {
      if (!err?.message?.includes('BUSYGROUP')) throw err;
    }

    const loop = async () => {
      while (INFINITY_LOOP) {
        try {
          const streams = await subscriber.xreadgroup(
            'GROUP',
            groupId,
            consumerId,
            'COUNT',
            1,
            'BLOCK',
            timeout * 1000,
            'STREAMS',
            stream,
            '>',
          );
          if (!streams) continue;

          for (const streamEntry of streams as [string, [string, string[]][]][]) {
            const [streamKey, entries] = streamEntry;
            for (const [id, fields] of entries) {
              const msg = fields[1];
              this.logService.debug('`%s` redcast consumed from stream [%s]: %s', conId, stream, msg);
              try {
                await callback(streamKey, msg);
                if (autoAck) {
                  await subscriber.xack(stream, groupId, id);
                }
                this.redcastMetricService.receive('consumeStream', RedcastMetricStatus.SUCCESS, stream, conId);
              } catch (error) {
                this.logService.error(error, '`%s` redcast handle stream consume message fail', conId, stream);
                this.redcastMetricService.receive('consumeStream', RedcastMetricStatus.ERROR, stream, conId);
              }
            }
          }
        } catch (error) {
          this.logService.error(error, '`%s` redcast failed to consume from stream [%s]', conId, stream);
          await sleep(1000);
        }
      }
    };

    loop().catch(err => {
      this.logService.error(err, '`%s` redcast stream consumer loop crashed for stream [%s]', conId, stream);
    });
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
