import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { RabbitPublishOptions } from '../models';
import { RabbitService } from '../rabbit.service';

export function RabbitExchange<T = any>(
  exchange: string,
  routingKey: string,
  options: RabbitPublishOptions = {},
  conId: string = DEFAULT_CON_ID,
): MethodDecorator {
  const rmqOptions: RabbitPublishOptions = options || {};
  const rmqConId: string = conId || DEFAULT_CON_ID;

  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services } = options;
      const rabbitService: RabbitService = services.rabbitService;

      try {
        const result: T = await method(...args);
        if (!result || (Array.isArray(result) && !result.length)) return result;

        const messages = toArray(result).map((msg: T) => ({
          key: routingKey,
          content: JSON.stringify(msg),
        }));

        await rabbitService.publish(exchange, messages, rmqOptions, rmqConId);
        return result;
      } catch (error) {
        services.pinoLogger.error(error, `[RabbitPublish] Failed to publish message:`, error);
        throw error;
      }
    },
    [RabbitService],
  );
}
