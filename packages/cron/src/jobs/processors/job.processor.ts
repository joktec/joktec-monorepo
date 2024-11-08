import { ConfigService, Inject, LogService } from '@joktec/core';
import { IJobModel } from '../job.model';
import { JobProcessorConfig } from './job.processor.config';

export abstract class JobProcessor<I, O> {
  @Inject() protected logService: LogService;
  @Inject() protected configService: ConfigService;

  private config: JobProcessorConfig;

  protected constructor(protected configKey: string) {
    this.logService.setContext(this.constructor.name);
  }

  getConfig(): JobProcessorConfig {
    const def = this.configService.parse(JobProcessorConfig, this.configKey);
    return (this.config = this.config ?? def);
  }

  abstract process(data: I[] | I, job?: IJobModel): Promise<O[] | O>;
}
