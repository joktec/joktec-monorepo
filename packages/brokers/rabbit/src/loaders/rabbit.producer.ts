import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { RabbitPublishOptions } from '../models';
import { RabbitService } from '../rabbit.service';

export function RabbitSend<T = any>(
  queue: string,
  options?: RabbitPublishOptions,
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

        const msgArray = toArray(result).map((msg: T) => JSON.stringify(msg));
        await rabbitService.sendToQueue(queue, msgArray, rmqOptions, rmqConId);
        return result;
      } catch (error) {
        services.pinoLogger.error(error, `[RabbitSend] Failed to send message to queue:`, error);
        throw error;
      }
    },
    [RabbitService],
  );
}
