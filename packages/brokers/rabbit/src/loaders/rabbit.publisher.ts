import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID } from '@joktec/core';
import { RabbitPublishOptions } from '../models';
import { RabbitService } from '../rabbit.service';
import { toArray } from '@joktec/utils';

export function RabbitPublish(queue: string, options?: RabbitPublishOptions, conId?: string): MethodDecorator;

export function RabbitPublish(
  exchange: string,
  routingKey?: string,
  options?: RabbitPublishOptions,
  conId?: string,
): MethodDecorator;

export function RabbitPublish<T = any>(
  exchangeOrQueue: string,
  routingKeyOrOptions?: string | RabbitPublishOptions,
  optionsOrConnectionId?: string | RabbitPublishOptions,
  conId?: string,
): MethodDecorator {
  let queue: string | undefined;
  let exchange: string | undefined;
  let routingKey: string | undefined;
  let rmqOptions: RabbitPublishOptions = {};
  let rmqConId: string = conId || DEFAULT_CON_ID;

  if (typeof routingKeyOrOptions === 'string') {
    exchange = exchangeOrQueue;
    routingKey = routingKeyOrOptions;

    if (typeof optionsOrConnectionId === 'object') {
      rmqOptions = optionsOrConnectionId || {};
    } else if (typeof optionsOrConnectionId === 'string') {
      rmqConId = optionsOrConnectionId;
    }
  } else {
    queue = exchangeOrQueue;
    rmqOptions = routingKeyOrOptions || {};

    if (typeof optionsOrConnectionId === 'string') {
      rmqConId = optionsOrConnectionId;
    }
  }

  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services } = options;
      const rabbitService: RabbitService = services.rabbitService;

      try {
        const result: T = await method(...args);
        if (!result || (Array.isArray(result) && !result.length)) return result;

        const messages = toArray(result);

        if (queue) {
          const msgArray = messages.map((msg: T) => JSON.stringify(msg));
          await rabbitService.sendToQueue(queue, msgArray, rmqOptions, rmqConId);
          return result;
        }

        if (exchange && routingKey) {
          const msgArray = messages.map((msg: T) => ({ key: routingKey, content: JSON.stringify(msg) }));
          await rabbitService.publish(exchange, msgArray, rmqOptions, rmqConId);
          return result;
        }
      } catch (error) {
        services.pinoLogger.error(error, `[RabbitPublish] Failed to publish message:`, error);
        throw error;
      }

      return null;
    },
    [RabbitService],
  );
}
