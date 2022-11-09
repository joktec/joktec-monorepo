import { isObject, merge } from 'lodash';
import { RetryOptions } from './retry.config';
import { BaseMethodDecorator, CallbackDecoratorOptions } from '../decorators';

const retry = require('async-retry');

export const Retry = (retryOptions: RetryOptions | string = {}): MethodDecorator => {
  return BaseMethodDecorator(async (options: CallbackDecoratorOptions): Promise<any> => {
    const { method, args, services, target, propertyKey } = options;
    const msgError = `${Reflect.get(target, 'constructor').name} ${propertyKey as string} error`;
    return await retry(
      async () => {
        return await method(...args);
      },
      merge(
        {
          onRetry: (e: Error, attempt: number): void => {
            services.pinoLogger.error(e, msgError + `, retry ${attempt} times`);
          },
        },
        isObject(retryOptions) ? retryOptions : services.configService.get(retryOptions as string) || {},
      ),
    );
  });
};
