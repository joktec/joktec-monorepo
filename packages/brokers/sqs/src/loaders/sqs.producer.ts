import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { SqsSendOptions } from '../models';
import { SqsService } from '../sqs.service';

export function SqsSend<T = any>(
  queue: string,
  options: SqsSendOptions = {},
  conId: string = DEFAULT_CON_ID,
): MethodDecorator {
  const sqsOptions: SqsSendOptions = options || {};
  const sqsConId: string = conId || DEFAULT_CON_ID;

  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services } = options;
      const sqsService: SqsService = services.sqsService;

      try {
        const result: T = await method(...args);
        if (!result || (Array.isArray(result) && !result.length)) return result;

        const msgArray = toArray(result).map((msg: T) => JSON.stringify(msg));
        await sqsService.send(queue, msgArray, sqsOptions, sqsConId);
        return result;
      } catch (error) {
        services.pinoLogger.error(error, `[SqsSend] Failed to send message to queue:`, error);
        throw error;
      }
    },
    [SqsService],
  );
}
