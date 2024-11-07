import { ConfigService, Inject, LogService } from '@joktec/core';
import { JobModel } from '../job.model';
import { JobProcessorConfig } from './job.processor.config';

export abstract class JobProcessor<I, O> {
  @Inject() protected logService: LogService;
  @Inject() protected configService: ConfigService;

  private config: JobProcessorConfig;

  protected constructor(protected configKey: string) {
    this.logService.setContext(this.constructor.name);
  }

  getConfig(): JobProcessorConfig {
    const def = new JobProcessorConfig(this.configService.get<JobProcessorConfig>(this.configKey as any));
    return (this.config = this.config ?? def);
  }

  abstract process(data: I[] | I, job?: JobModel): Promise<O[] | O>;
}
