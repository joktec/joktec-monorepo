import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { KafkaService } from '../kafka.service';
import { KafkaProduceDecoratorOptions } from '../models';

export function KafkaSend<T = any>(
  topic: string,
  options: KafkaProduceDecoratorOptions = { useEnv: false },
  conId: string = DEFAULT_CON_ID,
): MethodDecorator {
  const kafkaOptions: KafkaProduceDecoratorOptions = options || {};

  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services } = options;
      const kafkaService: KafkaService = services.kafkaService;

      try {
        const result: T = await method(...args);
        if (!result || (Array.isArray(result) && !result.length)) return result;

        let topicName = topic;
        if (kafkaOptions?.useEnv) {
          topicName = services.configService.resolveConfigValue(topic, false);
          if (!topicName) {
            services.pinoLogger.warn("`%s` Can't resolve topic name from config: %s", conId, topic);
            topicName = topic;
          }
        }

        const messages: string[] = toArray(result).map(value => JSON.stringify(value));
        await kafkaService.send(topicName, messages, kafkaOptions, conId);
        return result;
      } catch (error) {
        services.pinoLogger.error(error, '`%s` [KafkaPublish] Failed to publish message', conId);
        throw error;
      }
    },
    [KafkaService],
  );
}
