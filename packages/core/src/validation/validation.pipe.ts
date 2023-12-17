import { ArgumentMetadata, Injectable, Optional, PipeTransform, ValidationPipe } from '@nestjs/common';
import { ClassTransformOptions, instanceToPlain, plainToInstance } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { isNil, isObject } from 'lodash';
import { toBool } from '../utils';
import { ValidationException } from './validation.exception';
import { buildError } from './validation.utils';

interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  transformOptions?: ClassTransformOptions;
  validateCustomDecorators?: boolean;
}

export const DEFAULT_PIPE_OPTIONS: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: false,
  skipMissingProperties: false,
};

@Injectable()
export class BaseValidationPipe extends ValidationPipe implements PipeTransform {
  protected isTransformEnabled: boolean;
  protected transformOptions: ClassTransformOptions;
  protected validatorOptions: ValidationPipeOptions;
  protected validateCustomDecorators: boolean;

  constructor(@Optional() options?: ValidationPipeOptions) {
    super(Object.assign({}, DEFAULT_PIPE_OPTIONS, options));

    this.validatorOptions = Object.assign({}, DEFAULT_PIPE_OPTIONS, options);
    this.isTransformEnabled = toBool(this.validatorOptions.transform, true);
    this.transformOptions = this.validatorOptions.transformOptions;
    this.validateCustomDecorators = toBool(this.validatorOptions.validateCustomDecorators, false);
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metadata)) {
      return this.isTransformEnabled ? this.transformPrimitive(value, metadata) : value;
    }

    const originalValue = value;
    value = this.toEmptyIfNil(value);

    const isNil = value !== originalValue;
    const isPrimitive = this.isPrimitive(value);
    this.stripProtoKeys(value);
    let object = plainToInstance(metatype, value, this.transformOptions);

    const originalEntity = object;
    const isCtorNotEqual = object.constructor !== metatype;

    if (isCtorNotEqual && !isPrimitive) object.constructor = metatype;
    else if (isCtorNotEqual) object = { constructor: metatype };

    const validationErrors = await this.validate(object, this.validatorOptions);
    if (validationErrors.length > 0) {
      const formatError = buildError(validationErrors);
      throw new ValidationException(formatError, ValidationPipe.name);
    }

    if (isPrimitive) object = originalEntity;
    if (this.isTransformEnabled) return object;
    if (isNil) return originalValue;

    return Object.keys(this.validatorOptions).length > 0 ? instanceToPlain(object, this.transformOptions) : value;
  }

  protected stripProtoKeys(value: Record<string, any>) {
    delete value.__proto__;
    Object.keys(value)
      .filter(key => isObject(value[key]) && value[key])
      .forEach(key => this.stripProtoKeys(value[key]));
  }

  protected isPrimitive(value: unknown): boolean {
    return ['number', 'boolean', 'string'].includes(typeof value);
  }

  protected transformPrimitive(value: any, metadata: ArgumentMetadata) {
    if (!metadata.data) return value;
    const { type, metatype } = metadata;
    if (type !== 'param' && type !== 'query') return value;
    if (metatype === Boolean) return value === true || value === 'true';
    if (metatype === Number) return +value;
    return value;
  }

  protected toEmptyIfNil<T = any, R = any>(value: T): R | {} {
    return isNil(value) ? {} : value;
  }

  protected toValidate(metadata: ArgumentMetadata): boolean {
    const { metatype, type } = metadata;
    if (type === 'custom' && !this.validateCustomDecorators) return false;
    const types = [String, Boolean, Number, Array, Object, Buffer];
    return !types.some(type => metatype === type) && !isNil(metatype);
  }

  protected validate(
    object: object,
    validatorOptions?: ValidatorOptions,
  ): Promise<ValidationError[]> | ValidationError[] {
    return validate(object, validatorOptions);
  }
}
