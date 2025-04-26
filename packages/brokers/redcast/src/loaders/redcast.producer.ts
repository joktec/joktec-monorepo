import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { RedcastProduceDecoratorOptions } from '../models';
import { RedcastService } from '../redcast.service';

export function RedcastSend<T = any>(
  queue: string,
  options: RedcastProduceDecoratorOptions = { useEnv: false, mode: 'list' },
  conId: string = DEFAULT_CON_ID,
): MethodDecorator {
  const redOptions: RedcastProduceDecoratorOptions = options || {};

  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services } = options;
      const redcastService: RedcastService = services.redcastService;

      try {
        const result: T = await method(...args);
        if (!result || (Array.isArray(result) && !result.length)) return result;

        let queueName = queue;
        if (redOptions?.useEnv) {
          queueName = services.configService.resolveConfigValue(queue, false);
          if (!queueName) {
            services.pinoLogger.warn("`%s` Can't resolve queue name from config: %s", conId, queue);
            queueName = queue;
          }
        }

        const messages = toArray(result).map(value => JSON.stringify(value));
        const runner =
          redOptions.mode === 'stream'
            ? redcastService.sendToStream.bind(redcastService)
            : redcastService.sendToQueue.bind(redcastService);
        await runner(queueName, messages, conId);
        return result;
      } catch (error) {
        services.pinoLogger.error(error, '[RedcastSend] Failed to send to queue:');
        throw error;
      }
    },
    [RedcastService],
  );
}
