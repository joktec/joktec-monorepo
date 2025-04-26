import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { SnsPublishDecoratorOptions } from '../models';
import { SqsService } from '../sqs.service';

export function SqsPublish<T = any>(
  topic: string,
  options: SnsPublishDecoratorOptions = { UseEnv: false },
  conId: string = DEFAULT_CON_ID,
): MethodDecorator {
  const sqsOptions: SnsPublishDecoratorOptions = options || {};

  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services } = options;
      const sqsService: SqsService = services.sqsService;

      try {
        const result: T = await method(...args);
        if (!result || (Array.isArray(result) && !result.length)) return result;

        let topicName = topic;
        if (sqsOptions?.UseEnv) {
          topicName = services.configService.resolveConfigValue(topic, false);
          if (!topicName) {
            services.pinoLogger.warn("`%s` Can't resolve topic name from config: %s", conId, topic);
            topicName = topic;
          }
        }

        const msgArray = toArray(result).map((msg: T) => JSON.stringify(msg));
        await sqsService.publish(topicName, msgArray, sqsOptions, conId);
        return result;
      } catch (error) {
        services.pinoLogger.error(error, `[SqsPublish] Failed to send message to topic:`, error);
        throw error;
      }
    },
    [SqsService],
  );
}
