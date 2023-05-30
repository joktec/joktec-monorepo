import { Injectable } from '@nestjs/common';
import { ConfigService as JsConfigService, NoInferType } from '@nestjs/config';
import { Constructor } from '../models';
import { ConfigGetOptions } from '@nestjs/config/dist/config.service';

@Injectable()
export class ConfigService extends JsConfigService {
  parse<T = Record<string, unknown>>(
    clazz: Constructor<T>,
    propertyPath: string,
    defaultValue?: NoInferType<T>,
    options?: ConfigGetOptions,
  ): T {
    const cfgData = this.get(propertyPath, defaultValue, options);
    return new clazz(cfgData);
  }
}
