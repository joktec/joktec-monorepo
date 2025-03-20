import { validateSync, ValidationError, ValidatorOptions } from '@joktec/utils';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigGetOptions, ConfigService as JsConfigService, NoInferType } from '@nestjs/config';
import { ExceptionMessage, InvalidClientConfigException, IValidationProperty } from '../../exceptions';
import { Constructor } from '../../models';
import { buildError } from '../../utils';
import { AppConfig, initConfig } from './config.factory';

@Injectable()
export class ConfigService extends JsConfigService implements OnModuleInit {
  private _appConfig: AppConfig;

  onModuleInit() {
    if (!this._appConfig) {
      this._appConfig = initConfig();
    }
  }

  get appConfig(): AppConfig {
    return this._appConfig;
  }

  exist(propertyPath: string): boolean {
    return !!this.get(propertyPath, null);
  }

  parse<T extends object = Record<string, any>>(
    clazz: Constructor<T>,
    propertyPath: string,
    defaultValue?: NoInferType<T>,
    options?: ConfigGetOptions,
  ): T {
    const cfgData = this.get(propertyPath, options) || defaultValue;
    return new clazz(cfgData);
  }

  parseOrThrow<T extends object = Record<string, any>>(
    clazz: Constructor<T>,
    propertyPath: string,
    defaultValue?: NoInferType<T>,
    options?: { infer?: true } & ValidatorOptions,
  ): T {
    const getOpts = options?.infer && ({ infer: true } as ConfigGetOptions);
    const cfgInstance = this.parse(clazz, propertyPath, defaultValue, getOpts);
    const flatErrors = this.validate(cfgInstance, options);
    if (flatErrors.length) {
      throw new InvalidClientConfigException(ExceptionMessage.INVALID_CONFIG, { error: flatErrors });
    }
    return cfgInstance;
  }

  validate(value: object, options?: ValidatorOptions): IValidationProperty[] {
    const errors: ValidationError[] = validateSync(value, options);
    if (!errors.length) return [];
    return buildError(errors);
  }
}
