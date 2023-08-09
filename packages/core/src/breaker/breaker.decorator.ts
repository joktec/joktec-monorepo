import { Inject } from '@nestjs/common';
import { isEmpty, isObject } from 'lodash';
import CircuitBreaker from 'opossum';
import { ConfigService } from '../config';
import { LogService } from '../log';
import { BreakerConfig } from './breaker.config';

export const Breaker = (
  opts: BreakerConfig | string = {},
  fallback: (error: Error) => any = _ => null,
): MethodDecorator => {
  const injectConfigService = Inject(ConfigService);
  const injectLogService = Inject(LogService);

  return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    injectConfigService(target, 'configService');
    injectLogService(target, 'logService');

    const originMethod = descriptor.value;
    const newMethod = (instance, args) => originMethod.apply(instance, args);
    let breaker: CircuitBreaker = null;
    CircuitBreaker.isOurError(new Error()); // $ExpectType boolean

    descriptor.value = async function (...args: any[]) {
      const logger: LogService = this.logService;
      logger.setContext(Breaker.name);
      try {
        if (isEmpty(breaker)) {
          const configService: ConfigService = this.configService;
          const option: BreakerConfig = isObject(opts) ? opts : configService.get<BreakerConfig>(opts as string) || {};
          breaker = new CircuitBreaker(newMethod, option);
          logger.debug(option, '`%s` breaker opts', propertyKey);
          logger.info('`%s` breaker is created', propertyKey);
        }
        logger.debug(breaker.toJSON(), '`%s` breaker current state is', propertyKey);
        return await breaker.fire(this, args);
      } catch (error) {
        logger.error(error, '`%s` breaker error', propertyKey);
        return fallback(error);
      }
    };

    return descriptor;
  };
};
