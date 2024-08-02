import { Catch, ConfigService, LogService, MicroExceptionFilter } from '@joktec/core';

@Catch()
export class CustomExceptionFilter extends MicroExceptionFilter {
  constructor(
    protected cfg: ConfigService,
    protected logger: LogService,
  ) {
    super(cfg, logger);
  }
}
