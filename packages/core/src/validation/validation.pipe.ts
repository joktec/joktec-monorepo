import { ArgumentMetadata, Injectable, PipeTransform, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { isEmpty } from 'lodash';
import { ValidateException } from './validate.exception';
import { buildError } from './validator';

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
      const formatError = buildError(validationErrors);
      throw new ValidateException(formatError);
    }
    return value;
  }

  protected toValidate(metadata: ArgumentMetadata): boolean {
    const { metatype } = metadata;
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type || metatype === new type());
  }
}
