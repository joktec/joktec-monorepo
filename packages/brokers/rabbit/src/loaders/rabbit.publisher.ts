import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { RabbitPublishDecoratorOptions } from '../models';
import { RabbitService } from '../rabbit.service';

export function RabbitExchange<T = any>(
  exchange: string,
  routingKey: string,
  options: RabbitPublishDecoratorOptions = { useEnv: false },
  conId: string = DEFAULT_CON_ID,
): MethodDecorator {
  const rmqOptions: RabbitPublishDecoratorOptions = options || {};

  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services } = options;
      const rabbitService: RabbitService = services.rabbitService;

      try {
        const result: T = await method(...args);
        if (!result || (Array.isArray(result) && !result.length)) return result;

        let exchangeName = exchange;
        let routingKeyName = routingKey;

        if (rmqOptions.useEnv) {
          const useEnvExchange = typeof rmqOptions.useEnv === 'boolean' ? true : !!rmqOptions.useEnv.exchange;
          const useEnvRoutingKey = typeof rmqOptions.useEnv === 'boolean' ? true : !!rmqOptions.useEnv.routingKey;

          if (useEnvExchange) {
            const resolved = services.configService.resolveConfigValue(exchange, false);
            if (resolved) exchangeName = resolved;
            else services.pinoLogger.warn('`%s` Cannot resolve exchange name from config/env: %s', conId, exchange);
          }

          if (useEnvRoutingKey) {
            const resolved = services.configService.resolveConfigValue(routingKey, false);
            if (resolved) routingKeyName = resolved;
            else services.pinoLogger.warn('`%s` Cannot resolve routing key from config/env: %s', conId, routingKey);
          }
        }

        const messages = toArray(result).map((msg: T) => ({
          key: routingKeyName,
          content: JSON.stringify(msg),
        }));

        await rabbitService.publish(exchangeName, messages, rmqOptions, conId);
        return result;
      } catch (error) {
        services.pinoLogger.error(error, `[RabbitPublish] Failed to publish message:`, error);
        throw error;
      }
    },
    [RabbitService],
  );
}
