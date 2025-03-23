import retry from 'async-retry';
import { isObject, merge } from 'lodash';
import { BaseMethodDecorator, CallbackMethodOptions } from '../../decorators';
import { RetryOptions } from './retry.config';

export const Retry = (retryOptions: RetryOptions | string = {}): MethodDecorator => {
  return BaseMethodDecorator(async (options: CallbackMethodOptions): Promise<any> => {
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
        isObject(retryOptions) ? retryOptions : services.configService.get<RetryOptions>(retryOptions as string) || {},
      ),
    );
  });
};
