import { LogService } from '@joktec/core';
import { getTimeString, toInt } from '@joktec/utils';
import async, { QueueObject } from 'async';

export class QueueConfig<T> {
  consume: (d: T[]) => Promise<void>;
  concurrent?: number = 1;
  batchSize?: number = 1;
  maxRetries?: number = 3;
  retryTimeout?: number = 15000;

  constructor(props: Partial<QueueConfig<T>>) {
    Object.assign(this, props);
  }
}

export class QueueMessage<T> {
  retries: number = 0;
  data: T;

  constructor(data: T) {
    this.data = data;
  }
}

export class JobQueue<T> {
  private readonly logService?: LogService;
  private queue: QueueObject<QueueMessage<T>>;
  private config: QueueConfig<T>;

  constructor(config: Partial<QueueConfig<T>>, logService?: LogService) {
    this.config = new QueueConfig<T>(config);
    this.logService = logService;
    this.init();
  }

  init(): void {
    this.queue = async.cargoQueue<QueueMessage<T>>(
      (messages: QueueMessage<T>[], callback) => {
        const startedAt = new Date().getTime();
        this.config
          .consume(messages.map(msg => msg.data))
          .then(_ => callback())
          .catch(err => {
            const timeout = this.config.retryTimeout;
            if (this.logService) {
              const msg = `The message is processed, wait for %s to be re-processed`;
              this.logService.error(err, msg, getTimeString(timeout));
            }
            setTimeout(() => callback(err), timeout);
          })
          .finally(() => {
            if (this.logService) {
              const timeExec = new Date().getTime() - startedAt;
              this.logService.info(`%s messages is processed within %s`, messages.length, getTimeString(timeExec));
            }
          });
      },
      this.config.concurrent,
      this.config.batchSize,
    );
  }

  push(data: T[]): void {
    for (const d of data) {
      const msg = new QueueMessage(d);
      this._push(msg);
    }
  }

  unshift(d: T): void {
    const msg = new QueueMessage(d);
    this._push(msg, true);
  }

  private _push(msg: QueueMessage<T>, priority = false) {
    const push = priority ? this.queue.unshift.bind(this.queue) : this.queue.push.bind(this.queue);
    push(msg, async err => {
      if (err) {
        if (msg.retries === this.config.maxRetries && this.logService) {
          this.logService.error(err, `The message is reached max retries config, it is stopped and committed`);
        }
        msg.retries++;
        this._push(msg, true);
      }
    });
  }

  async drain(): Promise<void> {
    await this.queue.drain();
  }

  async pushAndWaitForCompleted(data: T[]): Promise<void> {
    this.push(data);
    await this.drain();
  }

  getMessages() {
    return this.queue.workersList();
  }

  async kill(): Promise<void> {
    this.queue.kill();
  }

  async reset(): Promise<void> {
    this.queue.kill();
    this.init();
  }

  async batchProcess<I, O>(
    data: I[],
    eachBatch: (data: I[]) => Promise<O[]>,
    opts?: { concurrent?: number; batchSize?: number; maxRetries?: number; retryTimeout?: number },
    logService?: LogService,
  ): Promise<O[]> {
    const res: O[] = [];
    const queue = new JobQueue<I>(
      {
        consume: async (d: I[]) => {
          const out = await eachBatch(d);
          res.push(...out);
        },
        concurrent: toInt(opts.concurrent, 1),
        batchSize: toInt(opts.batchSize, 1),
        maxRetries: toInt(opts.maxRetries, 3),
        retryTimeout: toInt(opts.retryTimeout, 15000),
      },
      logService,
    );

    await queue.pushAndWaitForCompleted(data);
    // await queue.kill();
    return res;
  }
}
