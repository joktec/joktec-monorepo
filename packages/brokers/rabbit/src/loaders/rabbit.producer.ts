import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { RabbitProduceDecoratorOptions } from '../models';
import { RabbitService } from '../rabbit.service';

export function RabbitSend<T = any>(
  queue: string,
  options: RabbitProduceDecoratorOptions = { useEnv: false },
  conId: string = DEFAULT_CON_ID,
): MethodDecorator {
  const rmqOptions: RabbitProduceDecoratorOptions = options || {};

  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services } = options;
      const rabbitService: RabbitService = services.rabbitService;

      try {
        const result: T = await method(...args);
        if (!result || (Array.isArray(result) && !result.length)) return result;

        let queueName = queue;
        if (rmqOptions?.useEnv) {
          queueName = services.configService.resolveConfigValue(queue, false);
          if (!queueName) {
            services.pinoLogger.warn("`%s` Can't resolve queue name from config: %s", conId, queue);
            queueName = queue;
          }
        }

        const msgArray = toArray(result).map((msg: T) => JSON.stringify(msg));
        await rabbitService.sendToQueue(queueName, msgArray, rmqOptions, conId);
        return result;
      } catch (error) {
        services.pinoLogger.error(error, `[RabbitSend] Failed to send message to queue:`, error);
        throw error;
      }
    },
    [RabbitService],
  );
}
