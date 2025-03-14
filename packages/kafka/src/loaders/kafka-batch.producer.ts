import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID } from '@joktec/core';
import { Message } from 'kafkajs';
import { KafkaService } from '../kafka.service';
import { KafkaPublishConfig, ProducerManyTopic } from '../models';

export function KafkaBatchPublish(topic: string[], producerKey: string, conId?: string): MethodDecorator;
export function KafkaBatchPublish(
  topic: string[],
  producerKey: string,
  publishConfig?: KafkaPublishConfig,
  conId?: string,
): MethodDecorator;

export function KafkaBatchPublish<T = any>(
  topics: string[],
  producerKey: string,
  publishConfigOrConId?: KafkaPublishConfig | string,
  conId?: string,
): MethodDecorator {
  let publishConfig: KafkaPublishConfig = {};
  let connectionId: string = DEFAULT_CON_ID;

  if (typeof publishConfigOrConId === 'object') publishConfig = publishConfigOrConId;
  else if (typeof publishConfigOrConId === 'string') connectionId = publishConfigOrConId;

  if (conId) connectionId = conId;

  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services } = options;
      const [conId = DEFAULT_CON_ID] = args;
      const kafkaService: KafkaService = services.kafkaService;

      try {
        const result: T = await method(...args);
        if (!result) return null;

        const messages: Message[] = [{ value: JSON.stringify(result) }];
        const batch: ProducerManyTopic = {
          producerKey,
          topicMessages: topics.map(topic => ({ topic, messages })),
          ...publishConfig.record,
        };

        await kafkaService.publishBatch(batch, publishConfig.consumer, connectionId);
        return result;
      } catch (error) {
        services.pinoLogger.error(error, '`%s` [KafkaBatchPublish] Failed to publish message', conId);
        throw error;
      }
    },
    [KafkaService],
  );
}
