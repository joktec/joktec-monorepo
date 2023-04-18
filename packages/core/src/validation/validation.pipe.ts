import { ArgumentMetadata, Injectable, PipeTransform, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { isEmpty } from 'lodash';
import { IValidateError, ValidateException } from './validate.exception';

export const DEFAULT_PIPE_OPTIONS: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: false,
  skipMissingProperties: false,
};

@Injectable()
export class BaseValidationPipe extends ValidationPipe implements PipeTransform {
  private customOptions: ValidationPipeOptions = {};

  constructor(options?: ValidationPipeOptions) {
    super(Object.assign({}, DEFAULT_PIPE_OPTIONS, options));
    Object.assign(this.customOptions, DEFAULT_PIPE_OPTIONS, options);
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    if (isEmpty(value)) {
      return value;
    }

    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metadata)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const validationErrors = await validate(object, { ...this.customOptions });
    if (validationErrors.length > 0) {
      const formatError = this.buildError(validationErrors);
      throw new ValidateException(formatError);
    }
    return value;
  }

  protected toValidate(metadata: ArgumentMetadata): boolean {
    const { metatype } = metadata;
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type || metatype === new type());
  }

  private buildError(errors: ValidationError[]): IValidateError {
    const result: IValidateError = {};
    errors.forEach(error => (result[error.property] = Object.values(error.constraints)));
    return result;
  }
}
