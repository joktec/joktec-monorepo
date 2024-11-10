import { ConfigService, Inject, LogService, OnModuleInit } from '@joktec/core';
import { IJobModel } from '../job.model';
import { JobProcessorConfig } from './job.processor.config';

export abstract class JobProcessor<I, O> implements OnModuleInit {
  @Inject() protected logService: LogService;
  @Inject() protected configService: ConfigService;

  private config: JobProcessorConfig;

  protected constructor(protected configKey: string) {}

  onModuleInit() {
    this.logService.setContext(this.constructor.name);
    this.getConfig();
  }

  getConfig(): JobProcessorConfig {
    const def = this.configService.parseOrThrow(JobProcessorConfig, this.configKey);
    return (this.config = this.config ?? def);
  }

  abstract process(data: I[] | I, job?: IJobModel): Promise<O[] | O>;
}
