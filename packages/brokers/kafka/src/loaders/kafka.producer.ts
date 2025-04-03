import { BaseMethodDecorator, CallbackMethodOptions, DEFAULT_CON_ID } from '@joktec/core';
import { toArray } from '@joktec/utils';
import { Message } from 'kafkajs';
import { merge } from 'lodash';
import { KafkaService } from '../kafka.service';
import { KafkaPublishConfig, ProducerTopic } from '../models';

export function KafkaPublish(topic: string, conId?: string): MethodDecorator;
export function KafkaPublish(topic: string, producerKey?: string, conId?: string): MethodDecorator;
export function KafkaPublish(topic: string, publishConfig?: KafkaPublishConfig, conId?: string): MethodDecorator;
export function KafkaPublish(
  topic: string,
  producerKey?: string,
  publishConfig?: KafkaPublishConfig,
  conId?: string,
): MethodDecorator;

export function KafkaPublish<T = any>(
  topic: string,
  producerKeyOrConfigOrConId?: string | KafkaPublishConfig,
  publishConfigOrConId?: KafkaPublishConfig | string,
  conId?: string,
): MethodDecorator {
  let producerKey: string | undefined;
  let publishConfig: KafkaPublishConfig = { consumer: {}, record: {} };
  let connectionId: string = DEFAULT_CON_ID;

  if (typeof producerKeyOrConfigOrConId === 'string' && !topic) connectionId = producerKeyOrConfigOrConId;
  else if (typeof producerKeyOrConfigOrConId === 'string') producerKey = producerKeyOrConfigOrConId;
  else if (typeof producerKeyOrConfigOrConId === 'object')
    publishConfig = merge(publishConfig, producerKeyOrConfigOrConId);

  if (typeof publishConfigOrConId === 'object') publishConfig = merge(publishConfig, publishConfigOrConId);
  else if (typeof publishConfigOrConId === 'string') connectionId = publishConfigOrConId;

  if (conId) connectionId = conId;

  return BaseMethodDecorator(
    async (options: CallbackMethodOptions): Promise<T> => {
      const { method, args, services } = options;
      const [conId = DEFAULT_CON_ID] = args;
      const kafkaService: KafkaService = services.kafkaService;

      try {
        const result: T = await method(...args);
        if (!result || (Array.isArray(result) && !result.length)) return result;

        const messages: Message[] = toArray(result).map(value => ({ value: JSON.stringify(value) }));
        const record: ProducerTopic = { producerKey, topic, messages, ...publishConfig.record };
        await kafkaService.publish(record, publishConfig.consumer, connectionId);

        return result;
      } catch (error) {
        services.pinoLogger.error(error, '`%s` [KafkaPublish] Failed to publish message', conId);
        throw error;
      }
    },
    [KafkaService],
  );
}
