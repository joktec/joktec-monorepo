import { DEFAULT_CON_ID, Injectable, ModuleRef, OnModuleInit, Reflector, toArray } from '@joktec/core';
import { KafkaService } from '../kafka.service';
import { ConsumerInfoType, ConsumerRunCfg, KafkaEachMessage } from '../models';

const consumerInfos: ConsumerInfoType = {};

export const KAFKA_CONSUME_METADATA = 'kafka:consume';

export function KafkaConsume<T extends (msg: KafkaEachMessage, ...args: any[]) => any>(
  topics: string | string[],
  groupId: string,
  runConfig?: ConsumerRunCfg,
  conId: string = DEFAULT_CON_ID,
) {
  return function <U extends T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<U>) {
    const serviceName = target.constructor.name;
    const methodName = propertyKey.toString();
    const code = `${serviceName}.${methodName}`;

    if (!consumerInfos[code]) consumerInfos[code] = [];
    Reflect.defineMetadata(KAFKA_CONSUME_METADATA, { topics, groupId, runConfig, conId }, descriptor.value);
    consumerInfos[code].push({ serviceClazz: target.constructor, serviceName, methodName });
  };
}

@Injectable()
export class KafkaConsumerLoader implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    setTimeout(() => this.init(), 5000);
  }

  private async init() {
    Object.values(consumerInfos)
      .flat()
      .map(({ serviceClazz, methodName }) => {
        const serviceInstance = this.moduleRef.get(serviceClazz, { strict: false });
        const method = serviceInstance[methodName];

        const metadata = this.reflector.get<{
          topics: string | string[];
          groupId: string;
          runConfig: ConsumerRunCfg;
          conId?: string;
        }>(KAFKA_CONSUME_METADATA, method);

        if (metadata) {
          const eachMessage = async (payload: KafkaEachMessage) => {
            await method.call(serviceInstance, payload);
          };

          this.kafkaService.consume(
            { topics: toArray(metadata.topics) },
            { groupId: metadata.groupId },
            { ...metadata.runConfig, eachMessage },
            metadata.conId,
          );
        }
      });
  }
}
