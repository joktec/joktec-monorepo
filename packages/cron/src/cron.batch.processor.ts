import { CronProcessor } from './cron.processor';
import { CronQueue } from './cron.queue';
import { CronModel } from './models';

export abstract class CronBatchProcessor<I, O> extends CronProcessor<I, O> {
  protected constructor(
    protected context: string,
    protected configKey: string,
  ) {
    super(context, configKey);
  }

  async process(items: I[], cron?: CronModel): Promise<O[]> {
    if (!items.length) {
      return [];
    }

    return await this.batchExec(
      items,
      async data => await this.batchProcess(data, cron),
      this.getConfig(),
      this.context,
    );
  }

  protected abstract batchProcess(data: I[], cron: CronModel): Promise<O[]>;

  private async batchExec<I, O>(
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
        concurrent: opts.concurrent,
        batchSize: opts.batchSize,
        maxRetries: opts.maxRetries,
        failedIdleTimeout: opts.retryTimeout,
      },
      context,
    );

    await queue.pushAndWaitForCompleted(data);
    // await queue.kill();
    return res;
  }

  async sleep(ms): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
