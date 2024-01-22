import { ArgumentsHost, Catch, ConfigService, GatewayExceptionsFilter, IResponseDto, LogService } from '@joktec/core';
import { I18nContext } from 'nestjs-i18n';

@Catch()
export class CustomExceptionFilter extends GatewayExceptionsFilter {
  constructor(
    protected cfg: ConfigService,
    protected logger: LogService,
  ) {
    super(cfg, logger);
  }

  minify(host: ArgumentsHost, errorBody: IResponseDto): IResponseDto {
    const error = super.minify(host, errorBody);
    this.logger.info('error %j', error);
    const i18n = I18nContext.current();
    if (i18n) {
      const lang = i18n.lang;
      this.logger.info('Lang: %s', lang);
      error.message = i18n.t(error.message);
    }
    return error;
  }
}
