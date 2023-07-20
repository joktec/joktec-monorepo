import { Logger } from '@nestjs/common';
import async, { QueueObject } from 'async';

export class QueueConfig<T> {
  consume: (d: T[]) => Promise<void>;
  concurrent: number = 1;
  batchSize: number = 1;
  maxRetries: number = 3;
  failedIdleTimeout: number = 15000;

  constructor(props: Partial<QueueConfig<T>>) {
    Object.assign(this, props);
  }
}

class QueueMessage<T> {
  retries: number = 0;
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}

export class CronQueue<T> {
  private queue: QueueObject<QueueMessage<T>>;
  private readonly logger = new Logger(CronQueue.name);
  private config: QueueConfig<T>;

  constructor(config: Partial<QueueConfig<T>>, private context?: string) {
    this.config = new QueueConfig<T>(config);
    this.init();
  }

  init() {
    this.queue = async.cargoQueue<QueueMessage<T>>(
      (messages: QueueMessage<T>[], callback) => {
        const startedAt = new Date().getTime();
        this.config
          .consume(messages.map(msg => msg.data))
          .then(_ => callback())
          .catch(err => {
            this.logger.error(
              `The message is processed, wait for ${this.config.failedIdleTimeout} to be re-processed`,
              err?.stack || err,
              this.context,
            );
            setTimeout(() => callback(err), this.config.failedIdleTimeout);
          })
          .finally(() =>
            this.logger.log(
              `${messages.length} messages is processed within ${(new Date().getTime() - startedAt) / 1000} secs`,
              this.context,
            ),
          );
      },
      this.config.concurrent,
      this.config.batchSize,
    );
  }

  push(data: T[]) {
    for (const d of data) {
      const msg = new QueueMessage(d);
      this._push(msg);
    }
  }

  unshift(d: T) {
    const msg = new QueueMessage(d);
    this._push(msg, true);
  }

  private _push(msg: QueueMessage<T>, priority = false) {
    const push = priority ? this.queue.unshift.bind(this.queue) : this.queue.push.bind(this.queue);
    push(msg, async err => {
      if (err) {
        if (msg.retries === this.config.maxRetries) {
          this.logger.error(
            `The message is reached max retries config, it is stopped and committed`,
            err.stack,
            this.context,
          );
        }
        msg.retries++;
        this._push(msg, true);
      }
    });
  }

  async drain(): Promise<void> {
    await this.queue.drain();
  }

  async pushAndWaitForCompleted(data: T[]) {
    this.push(data);
    await this.drain();
  }

  getMessages() {
    return {
      running: this.queue.workersList(),
      // waiting: [...this.queue],
    };
  }

  async kill() {
    await this.queue.kill();
  }

  async reset() {
    await this.queue.kill();
    await this.init();
  }

  static async batchProcess<I, O>(
    data: I[],
    eachBatch: (data: I[]) => Promise<O[]>,
    opts?: {
      concurrent?: number;
      batchSize?: number;
      maxRetries?: number;
      retryTimeout?: number;
    },
    context?: string,
  ): Promise<O[]> {
    const res: O[] = [];
    const queue = new CronQueue<I>(
      {
        consume: async (d: I[]) => {
          const out = await eachBatch(d);
          res.push(...out);
        },
        concurrent: opts.concurrent ?? 1,
        batchSize: opts.batchSize ?? 1,
        maxRetries: opts.maxRetries,
        failedIdleTimeout: opts.retryTimeout,
      },
      context,
    );

    await queue.pushAndWaitForCompleted(data);
    // await queue.kill();
    return res;
  }
}
