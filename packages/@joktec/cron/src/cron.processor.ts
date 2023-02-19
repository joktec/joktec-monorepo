import { ConfigService, Inject, LogService } from '@joktec/core';
import { CronModel } from './models';
import { CronProcessorConfig } from './cron.processor.config';

export abstract class CronProcessor<I, O> {
  @Inject() protected logService: LogService;
  @Inject() protected configService: ConfigService;

  private config: CronProcessorConfig;

  protected constructor(protected context: string, protected configKey: string) {}

  getConfig(): CronProcessorConfig {
    const def = new CronProcessorConfig(this.configService.get<CronProcessorConfig>(this.configKey as any));
    return (this.config = this.config ?? def);
  }

  abstract process(data: I[] | I, job?: CronModel): Promise<O[] | O>;
}
