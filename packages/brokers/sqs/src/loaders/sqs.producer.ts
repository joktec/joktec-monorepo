import { BaseMethodDecorator, CallbackMethodOptions, ConfigService, DEFAULT_CON_ID } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { SqsSendDecoratorOptions } from '../models';
import { SqsService } from '../sqs.service';

export function SqsSend<T = any>(
  queue: string,
  options: SqsSendDecoratorOptions = {},
  conId: string = DEFAULT_CON_ID,
): MethodDecorator {
  const sqsOptions: SqsSendDecoratorOptions = options || {};

  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services } = options;
      const configService: ConfigService = services.configService;
      const sqsService: SqsService = services.sqsService;

      try {
        const result: T = await method(...args);
        if (!result || (Array.isArray(result) && !result.length)) return result;

        let queueName = queue;
        if (sqsOptions?.UseEnv) {
          queueName = configService.resolveConfigValue(queueName);
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
