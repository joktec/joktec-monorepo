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
  RedcastDeadLetterOptions,
  RedcastProcessMessageOptions,
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

    const redcast = new Redcast(redisOptions);
    if (!has(this.props, config.conId)) {
      this.props[config.conId] = {
        publisher: redcast.duplicate(),
        subscriber: redcast.duplicate(),
        consumer: redcast.duplicate(),
      };
    }
    return this.props[config.conId].publisher;
  }

  protected async start(client: Redcast, conId: string = DEFAULT_CON_ID): Promise<void> {
    const pong = await client.ping();
    const version = await this.getVersion(conId);
    this.logService.info('`%s` redcast ping response: %s (Redis version: %s)', conId, pong, version);
  }

  protected async stop(client: Redcast, conId: string = DEFAULT_CON_ID): Promise<void> {
    const { publisher, subscriber } = this.props[conId];
    await publisher.quit();
    await subscriber.quit();
    delete this.props[conId];
    this.logService.info('`%s` redcast connections closed', conId);
  }

  async getVersion(conId: string = DEFAULT_CON_ID): Promise<string> {
    const client = this.getClient(conId);
    const info = await client.info('server');
    const versionLine = info.split('\n').find(line => line.startsWith('redis_version'));
    return versionLine?.split(':')[1].trim();
  }

  async checkVersion(conId: string = DEFAULT_CON_ID): Promise<void> {
    const version = await this.getVersion(conId);
    if (!version || parseFloat(version) < 5.0) {
      const logMsg = `Redis version must be >= 5.0 to use Streams. Current version: ${version}`;
      throw new InternalServerException(logMsg);
    }
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

  private setupGracefulShutdown(isShuttingDown: { value: boolean }): void {
    process.on('SIGTERM', () => {
      isShuttingDown.value = true;
    });
  }

  private async moveToDeadLetter(
    consumer: Redcast,
    message: string,
    error: Error,
    options: RedcastDeadLetterOptions,
  ): Promise<void> {
    const { deadLetterQueue, deadLetterTTL, queue, groupId, consumerId } = options;
    const deadLetterKey = `${deadLetterQueue}:${Date.now()}`;

    const deadLetterMessage = {
      message,
      error: error.message,
      timestamp: Date.now(),
      originalQueue: queue,
      ...(groupId && { groupId }),
      ...(consumerId && { consumerId }),
    };

    await consumer.rpush(deadLetterQueue, JSON.stringify(deadLetterMessage));
    await consumer.expire(deadLetterKey, deadLetterTTL);
  }

  private async processMessage(
    consumer: Redcast,
    message: string,
    options: RedcastProcessMessageOptions,
  ): Promise<void> {
    const { queue, groupId, consumerId, streamKey, messageId } = options;
    const { callback, maxRetries, retryDelay, autoAck } = options;
    const { deadLetterQueue, deadLetterTTL } = options;

    let retries = 0;
    while (retries < maxRetries) {
      try {
        await callback(queue, message);
        if (streamKey && groupId && messageId && autoAck) {
          await consumer.xack(streamKey, groupId, messageId);
        }
        this.redcastMetricService.receive(
          streamKey ? 'consumeStream' : 'consume',
          RedcastMetricStatus.SUCCESS,
          queue,
          DEFAULT_CON_ID,
        );
        break;
      } catch (error) {
        retries++;
        if (retries === maxRetries) {
          const deadLetterOpts = { deadLetterQueue, deadLetterTTL, queue, groupId, consumerId };
          await this.moveToDeadLetter(consumer, message, error, deadLetterOpts);
          this.redcastMetricService.receive(
            streamKey ? 'consumeStream' : 'consume',
            RedcastMetricStatus.ERROR,
            queue,
            DEFAULT_CON_ID,
          );
        } else {
          await sleep(retryDelay * retries);
        }
      }
    }
  }

  private async processBatch(
    consumer: Redcast,
    messages: string[],
    options: RedcastProcessMessageOptions,
  ): Promise<void> {
    for (const msg of messages) {
      await this.processMessage(consumer, msg, options);
    }
  }

  private async brpopMessages(consumer: Redcast, queue: string, batchSize: number, timeout: number): Promise<string[]> {
    const messages = [];
    for (let i = 0; i < batchSize; i++) {
      const res = await consumer.brpop(queue, timeout);
      if (res && res[1]) {
        messages.push(res[1]);
      }
    }
    return messages;
  }

  private async rpoplpushMessages(
    consumer: Redcast,
    queue: string,
    processingQueue: string,
    batchSize: number,
  ): Promise<string[]> {
    const messages = [];
    for (let i = 0; i < batchSize; i++) {
      const msg = await consumer.rpoplpush(queue, processingQueue);
      if (msg) {
        messages.push(msg);
      }
    }
    return messages;
  }

  async consume(
    queue: string,
    callback: RedcastConsumeCallback,
    options: RedcastConsumeOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const { consumer } = this.props[conId];
    const reliable = toBool(options.reliable, false);
    const timeout = toInt(options.timeout, 0);
    const processingQueue = `${queue}:processing`;
    const deadLetterQueue = options.deadLetterQueue || `${queue}:dead-letter`;
    const maxRetries = toInt(options.maxRetries, 3);
    const retryDelay = toInt(options.retryDelay, 1000);
    const deadLetterTTL = toInt(options.deadLetterTTL, 86400);
    const batchSize = toInt(options.batchSize, 1);
    const isShuttingDown = { value: false };

    if (options.gracefulShutdown) {
      this.setupGracefulShutdown(isShuttingDown);
    }

    const processOpts = { queue, callback, maxRetries, retryDelay, deadLetterQueue, deadLetterTTL };

    const brpop = async (): Promise<void> => {
      const messages = await this.brpopMessages(consumer, queue, batchSize, timeout);
      if (messages.length > 0) {
        await this.processBatch(consumer, messages, processOpts);
      }
    };

    const rpoplpush = async (): Promise<void> => {
      const messages = await this.rpoplpushMessages(consumer, queue, processingQueue, batchSize);
      if (messages.length > 0) {
        await this.processBatch(consumer, messages, processOpts);
        await consumer.del(processingQueue);
      } else {
        await sleep(timeout * 1000);
      }
    };

    const loop = async () => {
      while (INFINITY_LOOP && !isShuttingDown.value) {
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
    await this.checkVersion(conId);

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
    await this.checkVersion(conId);

    const { subscriber } = this.props[conId];
    const groupId = streamOpts.groupId || 'default-group';
    const consumerId = streamOpts.consumerId || 'consumer-' + Math.random().toString(36).substring(2);
    const autoAck = toBool(streamOpts.autoAck, true);
    const timeout = toInt(streamOpts.timeout, 0);
    const maxRetries = toInt(streamOpts.maxRetries, 3);
    const retryDelay = toInt(streamOpts.retryDelay, 1000);
    const deadLetterQueue = streamOpts.deadLetterQueue || `${stream}:dead-letter`;
    const deadLetterTTL = toInt(streamOpts.deadLetterTTL, 86400);
    const batchSize = toInt(streamOpts.batchSize, 1);
    const isShuttingDown = { value: false };

    if (streamOpts.gracefulShutdown) {
      this.setupGracefulShutdown(isShuttingDown);
    }

    try {
      await subscriber.xgroup('CREATE', stream, groupId, '$', 'MKSTREAM');
    } catch (err: any) {
      if (!err?.message?.includes('BUSYGROUP')) throw err;
    }

    const processOpts = {
      queue: stream,
      callback,
      maxRetries,
      retryDelay,
      deadLetterQueue,
      deadLetterTTL,
      groupId,
      consumerId,
      autoAck,
    };

    const loop = async () => {
      while (INFINITY_LOOP && !isShuttingDown.value) {
        try {
          const streams = await subscriber.xreadgroup(
            'GROUP',
            groupId,
            consumerId,
            'COUNT',
            batchSize,
            'BLOCK',
            timeout * 1000,
            'STREAMS',
            stream,
            '>',
          );

          if (!streams) continue;

          for (const [streamKey, entries] of streams as [string, [string, string[]][]][]) {
            const messages = entries.map(([id, fields]) => ({ message: fields[1], id, streamKey })).map(m => m.message);
            await this.processBatch(subscriber, messages, { ...processOpts, streamKey });
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
