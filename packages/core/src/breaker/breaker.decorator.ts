import { Inject } from '@nestjs/common';
import { isEmpty, isObject } from 'lodash';
import { ConfigService } from '../config';
import { LogService } from '../log';
import { BreakerConfig } from './breaker.config';
const CircuitBreaker = require('opossum');

export const Breaker = (
  option: BreakerConfig | string,
  fallback: (error: Error) => any = _ => null,
): MethodDecorator => {
  const injectConfigService = Inject(ConfigService);
  const injectLogService = Inject(LogService);

  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    injectConfigService(target, 'configService');
    injectLogService(target, 'logService');
    const originMethod = descriptor.value;
    const newMethod = (instance, args) => originMethod.apply(instance, args);
    let breaker: typeof CircuitBreaker = null;
    descriptor.value = async function (...args: any[]) {
      const logger: LogService = this.logService;
      logger.setContext(Breaker.name);
      try {
        if (isEmpty(breaker)) {
          const configService: ConfigService = this.configService;
          option = isObject(option) ? option : configService.get<any>(option as any) || {};
          breaker = new CircuitBreaker(newMethod, option);
          logger.debug(breaker.options, '`%s` breaker opts', propertyKey);
          logger.info('`%s` breaker is created', propertyKey);
        }
        logger.debug(breaker.stats, '`%s` breaker statistics is', propertyKey);
        return await breaker.fire(this, args);
      } catch (error) {
        logger.error(error, '`%s` breaker error', propertyKey);
        return fallback(error);
      }
    };

    return descriptor;
  };
};
