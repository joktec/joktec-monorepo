import { DEFAULT_CON_ID, Injectable, OnModuleInit, Reflector } from '@joktec/core';
import { EachMessagePayload } from 'kafkajs';
import { KafkaService } from '../kafka.service';
import { ConsumerRunCfg } from '../models';

export const KAFKA_CONSUME_METADATA = 'kafka:consume';

export function KafkaConsume<T extends (msg: EachMessagePayload, ...args: any[]) => any>(
  topics: string | string[],
  groupId: string,
  runConfig: ConsumerRunCfg,
  conId: string = DEFAULT_CON_ID,
) {
  return function <U extends T>(target: any, key: string, descriptor: TypedPropertyDescriptor<U>) {
    Reflect.defineMetadata(KAFKA_CONSUME_METADATA, { topics, groupId, runConfig, conId }, descriptor.value);
  };
}

@Injectable()
export class KafkaConsumerLoader implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly reflector: Reflector,
  ) {}

  async onModuleInit() {
    const providers = Reflect.getMetadataKeys(global) || [];
    for (const provider of providers) {
      const instance = global[provider.name] as any;
      if (!instance) continue;

      const prototype = Object.getPrototypeOf(instance);
      const methods = Object.getOwnPropertyNames(prototype);

      for (const methodName of methods) {
        const method = instance[methodName];

        const metadata = this.reflector.get<{
          topics: string | string[];
          groupId: string;
          runConfig: ConsumerRunCfg;
          conId?: string;
        }>(KAFKA_CONSUME_METADATA, method);

        if (metadata) {
          await this.kafkaService.consume(
            { topics: Array.isArray(metadata.topics) ? metadata.topics : [metadata.topics] },
            { groupId: metadata.groupId },
            { ...metadata.runConfig, eachMessage: method.bind(instance) },
            metadata.conId,
          );
        }
      }
    }
  }
}
