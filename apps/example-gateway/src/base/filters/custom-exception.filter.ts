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
    const i18n = I18nContext.current(host);
    if (i18n) {
      // error.message = i18n.t(error.message);
      // error.title = i18n.t(error.title);
    }
    return error;
  }
}
