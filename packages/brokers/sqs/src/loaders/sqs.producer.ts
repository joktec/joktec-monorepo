import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { SqsProduceDecoratorOptions } from '../models';
import { SqsService } from '../sqs.service';

export function SqsSend<T = any>(
  queue: string,
  options: SqsProduceDecoratorOptions = { UseEnv: false },
  conId: string = DEFAULT_CON_ID,
): MethodDecorator {
  const sqsOptions: SqsProduceDecoratorOptions = options || {};

  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services } = options;
      const sqsService: SqsService = services.sqsService;

      try {
        const result: T = await method(...args);
        if (!result || (Array.isArray(result) && !result.length)) return result;

        let queueName = queue;
        if (sqsOptions?.UseEnv) {
          queueName = services.configService.resolveConfigValue(queue, false);
          if (!queueName) {
            services.pinoLogger.warn("`%s` Can't resolve queue name from config: %s", conId, queue);
            queueName = queue;
          }
        }

        const msgArray = toArray(result).map((msg: T) => JSON.stringify(msg));
        await sqsService.send(queueName, msgArray, sqsOptions, conId);
        return result;
      } catch (error) {
        services.pinoLogger.error(error, `[SqsSend] Failed to send message to queue:`, error);
        throw error;
      }
    },
    [SqsService],
  );
}
