import {
  AbstractClientService,
  DEFAULT_CON_ID,
  Inject,
  Injectable,
  InternalServerException,
  Retry,
} from '@joktec/core';
import { sleep, toBool, toInt } from '@joktec/utils';
import { Command } from 'ioredis';
import { has, pick } from 'lodash';
import { RedcastConsumeOptions, RedcastDeadLetterOptions, RedcastProcessMessageOptions } from './models';
import { Redcast, RedcastClient, RedcastProp } from './redcast.client';
import { RedcastConfig } from './redcast.config';
import { RedcastMetricService, RedcastMetricStatus, RedcastSendMetric } from './redcast.metric';

const RETRY_OPTS = 'redcast.retry';

@Injectable()
export class RedcastService extends AbstractClientService<RedcastConfig, Redcast> implements RedcastClient {
  private readonly INFINITY_LOOP = true;
  private isShuttingDown = false;
  private props: { [conId: string]: RedcastProp } = {};

  constructor(@Inject() private redcastMetricService: RedcastMetricService) {
    super('redcast', RedcastConfig);
    this.setupGracefulShutdown();
  }

  @Retry(RETRY_OPTS)
  protected async init(config: RedcastConfig): Promise<Redcast> {
    const redcast = new Redcast({
      ...config,
      host: config.host || 'localhost',
      port: toInt(config.port, 6379),
      db: config.database,
      readOnly: toBool(config.readonly, false),
      password: config?.password ? String(config.password) : undefined,
    });
    redcast.on('connect', () => this.logService.info('`%s` redcast connected', config.conId));
    redcast.on('ready', () => this.logService.info('`%s` redcast ready', config.conId));
    redcast.on('error', err => this.logService.error(err, '`%s` redcast error', config.conId));
    redcast.on('reconnecting', () => this.logService.warn('`%s` redcast reconnecting', config.conId));
    redcast.on('end', () => this.logService.info('`%s` redcast disconnected', config.conId));

    if (!has(this.props, config.conId)) {
      this.props[config.conId] = {
        publisher: this.duplicate(redcast, config.conId, 'publisher', config.debug),
        subscriber: this.duplicate(redcast, config.conId, 'subscriber', config.debug),
        consumer: this.duplicate(redcast, config.conId, 'consumer', config.debug),
      };
    }

    return redcast;
  }

  protected async start(client: Redcast, conId: string = DEFAULT_CON_ID): Promise<void> {
    const pong = await client.ping();
    const version = await this.getVersion(conId);
    this.logService.info('`%s` redcast ping response: %s (Redis version: %s)', conId, pong, version);
  }

  protected async stop(client: Redcast, conId: string = DEFAULT_CON_ID): Promise<void> {
    this.isShuttingDown = true;
    const { publisher, subscriber, consumer } = this.props[conId];
    await publisher.quit();
    await subscriber.quit();
    await consumer.quit();
    await client.quit();
    delete this.props[conId];
    this.logService.info('`%s` redcast connections closed', conId);
  }

  private duplicate(instance: Redcast, conId: string, role: string, debug: boolean): Redcast {
    const dupInstance = instance.duplicate();
    if (debug) {
      const originalSendCommand = dupInstance.sendCommand.bind(dupInstance);
      dupInstance.sendCommand = (command: Command) => {
        const logMsg = '`%s` [%s] redcast - redis command: "%s %s"';
        this.logService.debug(logMsg, conId, role, command.name, command.args.join(' '));
        return originalSendCommand(command);
      };
    }
    return dupInstance;
  }

  private setupGracefulShutdown(): void {
    process.on('SIGTERM', () => {
      this.isShuttingDown = true;
    });
  }

  private async getVersion(conId: string = DEFAULT_CON_ID): Promise<string> {
    const client = this.getClient(conId);
    const info = await client.info('server');
    const versionLine = info.split('\n').find(line => line.startsWith('redis_version'));
    return versionLine?.split(':')[1].trim();
  }

  private async checkVersion(conId: string = DEFAULT_CON_ID): Promise<void> {
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

  async subscribe(
    channel: string,
    callback: (channel: string, message: string) => Promise<void>,
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    const { subscriber } = this.props[conId];

    const onMessageFn = async (ch: string, msg: string): Promise<void> => {
      try {
        this.logService.debug('`%s` [%s] redcast consumed message: %s', conId, ch, msg);
        await callback(ch, msg);
        this.redcastMetricService.receive('subscribe', RedcastMetricStatus.SUCCESS, ch, conId);
      } catch (error) {
        this.logService.error(error, '`%s` [%s] redcast handle message fail', conId, ch);
        this.redcastMetricService.receive('subscribe', RedcastMetricStatus.ERROR, ch, conId);
      }
    };

    subscriber.on('message', onMessageFn);
    await subscriber.subscribe(channel);
  }

  async pSubscribe(
    pattern: string,
    callback: (pattern: string, channel: string, message: string) => Promise<void>,
    conId: string = DEFAULT_CON_ID,
  ) {
    const { subscriber } = this.props[conId];

    const onMessageFn = async (pat: string, ch: string, msg: string): Promise<void> => {
      try {
        this.logService.debug('`%s` [%s] redcast pattern (%s) matched message: %s', conId, ch, pat, msg);
        await callback(pat, ch, msg);
        this.redcastMetricService.receive('pSubscribe', RedcastMetricStatus.SUCCESS, pat, conId);
      } catch (error) {
        this.logService.error(error, '`%s` [%s] redcast handle pattern (%s)  message fail', conId, ch, pat);
        this.redcastMetricService.receive('pSubscribe', RedcastMetricStatus.ERROR, pat, conId);
      }
    };

    subscriber.on('pmessage', onMessageFn);
    await subscriber.psubscribe(pattern);
  }

  async unsubscribe(channel: string, conId: string = DEFAULT_CON_ID): Promise<void> {
    const { subscriber } = this.props[conId];
    await subscriber.unsubscribe(channel);
    this.logService.debug('`%s` [%s] redcast unsubscribed from channel: %s', conId, channel);
  }

  async pUnsubscribe(pattern: string, conId: string = DEFAULT_CON_ID): Promise<void> {
    const { subscriber } = this.props[conId];
    await subscriber.punsubscribe(pattern);
    this.logService.debug('`%s` [%s] redcast unsubscribed from pattern: %s', conId, pattern);
  }

  @RedcastSendMetric()
  async sendToQueue(queue: string, messages: string[], conId: string = DEFAULT_CON_ID): Promise<number> {
    const { publisher } = this.props[conId];
    return publisher.rpush(queue, ...messages);
  }

  private async moveToDeadLetter(consumer: Redcast, msg: string, err: Error, opts: RedcastDeadLetterOptions) {
    const { deadLetterQueue, queue, groupId, consumerId } = opts;
    const deadLetterKey = `${deadLetterQueue}:${Date.now()}`;
    const deadLetterTTL = toInt(opts.deadLetterTTL, 86400);
    const deadLetterMessage = {
      message: msg,
      error: err.message,
      timestamp: Date.now(),
      originalQueue: queue,
      ...(groupId && { groupId }),
      ...(consumerId && { consumerId }),
    };
    await consumer.rpush(deadLetterKey, JSON.stringify(deadLetterMessage));
    await consumer.expire(deadLetterKey, deadLetterTTL);
  }

  private async processMessage(consumer: Redcast, msg: string, opts: RedcastProcessMessageOptions) {
    const { queue, groupId, consumerId, messageId, callback, conId = DEFAULT_CON_ID } = opts;
    const isStream = queue && groupId && messageId;
    const metricType = isStream ? 'consumeStream' : 'consume';
    const maxRetries = toInt(opts.maxRetries, 3);
    const retryDelay = toInt(opts.retryDelay, 1000);
    const autoAck = toBool(opts.autoAck, true);

    let retries = 0;
    while (retries < maxRetries) {
      try {
        await callback(queue, msg);
        if (isStream && autoAck) await consumer.xack(queue, groupId, messageId);
        this.redcastMetricService.receive(metricType, RedcastMetricStatus.SUCCESS, queue, conId);
        break;
      } catch (error) {
        retries++;
        this.logService.warn('`%s` redcast failed to process message on attempt %s/%s', conId, retries, maxRetries);
        if (retries < maxRetries) {
          await sleep(retryDelay * retries);
          continue;
        }

        const { deadLetterQueue, deadLetterTTL } = opts;
        const deadLetterOpts: RedcastDeadLetterOptions = { deadLetterQueue, deadLetterTTL, queue, groupId, consumerId };
        await this.moveToDeadLetter(consumer, msg, error, deadLetterOpts);
        this.redcastMetricService.receive(metricType, RedcastMetricStatus.ERROR, queue, conId);
      }
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
    callback: (queue: string, message: string) => Promise<void>,
    opts: RedcastConsumeOptions = {},
    conId: string = DEFAULT_CON_ID,
  ) {
    const { consumer } = this.props[conId];
    const timeout = toInt(opts.timeout, 0);
    const processingQueue = `${queue}:processing`;
    const batchSize = toInt(opts.batchSize, 1);

    const processOpts: RedcastProcessMessageOptions = {
      queue,
      callback,
      deadLetterQueue: opts.deadLetterQueue || `${queue}:dead-letter`,
      ...pick(opts, ['maxRetries', 'retryDelay', 'deadLetterTTL']),
      conId,
    };

    const brpop = async (): Promise<void> => {
      const messages = await this.brpopMessages(consumer, queue, batchSize, timeout);
      for (const message of messages) {
        await this.processMessage(consumer, message, processOpts);
      }
    };

    const rpoplpush = async (): Promise<void> => {
      const messages = await this.rpoplpushMessages(consumer, queue, processingQueue, batchSize);
      if (messages.length) {
        for (const message of messages) {
          await this.processMessage(consumer, message, processOpts);
        }
        await consumer.del(processingQueue);
      } else {
        await sleep(timeout * 1000);
      }
    };

    const loop = async () => {
      while (this.INFINITY_LOOP && !this.isShuttingDown) {
        try {
          await (opts.reliable ? rpoplpush() : brpop());
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
  async sendToStream(queue: string, messages: string[], conId: string = DEFAULT_CON_ID): Promise<number> {
    await this.checkVersion(conId);

    const { publisher } = this.props[conId];
    let count = 0;
    for (const message of messages) {
      await publisher.xadd(queue, '*', 'message', message);
      count++;
    }
    return count;
  }

  async consumeStream(
    queue: string,
    callback: (queue: string, message: string) => Promise<void>,
    opts: RedcastConsumeOptions = {},
    conId: string = DEFAULT_CON_ID,
  ): Promise<void> {
    await this.checkVersion(conId);

    const { consumer } = this.props[conId];
    const groupId = opts.groupId || 'default-group';
    const consumerId = opts.consumerId || 'consumer-' + Math.random().toString(36).substring(2);
    const timeout = toInt(opts.timeout, 0);
    const batchSize = toInt(opts.batchSize, 1);

    try {
      await consumer.xgroup('CREATE', queue, groupId, '$', 'MKSTREAM');
    } catch (err: any) {
      if (!err?.message?.includes('BUSYGROUP')) throw err;
    }

    const processOpts: RedcastProcessMessageOptions = {
      queue,
      callback,
      groupId,
      consumerId,
      deadLetterQueue: opts.deadLetterQueue || `${queue}:dead-letter`,
      ...pick(opts, ['maxRetries', 'retryDelay', 'deadLetterTTL', 'autoAck']),
      conId,
    };

    const loop = async () => {
      while (this.INFINITY_LOOP && !this.isShuttingDown) {
        try {
          const streams = await consumer.xreadgroup(
            'GROUP',
            groupId,
            consumerId,
            'COUNT',
            batchSize,
            'BLOCK',
            timeout * 1000,
            'STREAMS',
            queue,
            '>',
          );
          if (!streams) continue;

          for (const [queue, entries] of streams as [string, [string, string[]][]][]) {
            for (const [id, fields] of entries) {
              const msg = fields[1];
              await this.processMessage(consumer, msg, { ...processOpts, messageId: id, queue });
            }
          }
        } catch (error) {
          this.logService.error(error, '`%s` redcast failed to consume from stream [%s]', conId, queue);
          await sleep(1000);
        }
      }
    };

    loop().catch(err => {
      this.logService.error(err, '`%s` redcast stream consumer loop crashed for queue [%s]', conId, queue);
    });
  }

  async quit(conId: string = DEFAULT_CON_ID): Promise<void> {
    this.isShuttingDown = true;
    const { publisher, subscriber, consumer } = this.props[conId];
    await publisher.quit();
    await subscriber.quit();
    await consumer.quit();
    await this.getClient(conId).quit();
  }

  async reset(conId: string = DEFAULT_CON_ID): Promise<void> {
    const config = this.getConfig(conId);
    await this.quit(conId);
    await this.clientInit(config, true);
    this.isShuttingDown = false;
  }
}
