import { Injectable } from '@nestjs/common';
import { ConfigGetOptions, ConfigService as JsConfigService, NoInferType } from '@nestjs/config';
import { ValidatorOptions } from 'class-validator';
import { ExceptionMessage } from '../exceptions';
import { Constructor } from '../models';
import { buildError, validateSync, ValidationError } from '../validation';
import { ConfigException } from './config.exception';

@Injectable()
export class ConfigService extends JsConfigService {
  parse<T extends object = Record<string, unknown>>(
    clazz: Constructor<T>,
    propertyPath: string,
    defaultValue?: NoInferType<T>,
    options?: ConfigGetOptions,
  ): T {
    const cfgData = this.get(propertyPath, defaultValue, options);
    return new clazz(cfgData);
  }

  parseOrThrow<T extends object = Record<string, unknown>>(
    clazz: Constructor<T>,
    propertyPath: string,
    defaultValue?: NoInferType<T>,
    options?: { infer?: true } & ValidatorOptions,
  ): T {
    const getOpts = options?.infer && ({ infer: true } as ConfigGetOptions);
    const cfgInstance = this.parse(clazz, propertyPath, defaultValue, getOpts);
    const flatErrors = this.validate(cfgInstance, options);
    if (flatErrors.length) {
      throw new ConfigException(ExceptionMessage.INVALID_CONFIG, flatErrors);
    }
    return cfgInstance;
  }

  validate(value: object, options?: ValidatorOptions): string[] {
    const errors: ValidationError[] = validateSync(value, options);
    if (!errors.length) return [];
    const formatError = buildError(errors);
    return Object.values(formatError).flat();
  }
}
