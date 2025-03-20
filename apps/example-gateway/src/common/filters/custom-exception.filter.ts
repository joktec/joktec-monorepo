import {
  ArgumentsHost,
  Catch,
  ConfigService,
  GatewayExceptionsFilter,
  IResponseDto,
  IValidationProperty,
  LogService,
} from '@joktec/core';
import { toArray } from '@joktec/utils';
import { I18nContext } from 'nestjs-i18n';

@Catch()
export class CustomExceptionFilter extends GatewayExceptionsFilter {
  constructor(
    protected cfg: ConfigService,
    protected logger: LogService,
  ) {
    super(cfg, logger);
    this.logger.setContext(GatewayExceptionsFilter.name);
  }

  minify(host: ArgumentsHost, errorBody: IResponseDto): IResponseDto {
    const error = super.minify(host, errorBody);
    const i18n = I18nContext.current(host);
    if (i18n) {
      if (error.title) error.title = i18n.t(error.title);
      if (error.message) error.message = i18n.t(error.message);
      if (error.error) {
        const validateError = error.error;
        if (validateError.scope === 'ValidationPipe' && validateError.validate) {
          const validateData = validateError.validate as IValidationProperty[];
          validateError.validate = validateData.map(validateItem => {
            const message: string[] = toArray<string>(validateItem.message).map(msg => i18n.t(msg));
            return { ...validateItem, message };
          });
          error['validate'] = validateError.validate;
          delete error.error;
        }
      }
    }
    delete error.path;
    delete error.method;
    delete error.body;
    delete error.params;
    delete error.query;
    return error;
  }
}
