import { Catch, ConfigService, GatewayExceptionsFilter, LogService } from '@joktec/core';

@Catch()
export class CustomExceptionFilter extends GatewayExceptionsFilter {
  constructor(
    protected cfg: ConfigService,
    protected log: LogService,
  ) {
    super(cfg, log);
  }
}
