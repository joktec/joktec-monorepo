import { DEFAULT_CON_ID, Injectable, ModuleRef, OnModuleInit, Reflector, toArray } from '@joktec/core';
import { KafkaService } from '../kafka.service';
import { ConsumerInfoType, ConsumerRunCfg, KafkaBatchMessage } from '../models';

const consumerBatchInfos: ConsumerInfoType = {};

export const KAFKA_CONSUME_BATCH_METADATA = 'kafka:consume:batch';

export function KafkaBatchConsume<T extends (msg: KafkaBatchMessage, ...args: any[]) => any>(
  topics: string | string[],
  groupId: string,
  runConfig?: ConsumerRunCfg,
  conId: string = DEFAULT_CON_ID,
) {
  return function <U extends T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<U>) {
    const serviceName = target.constructor.name;
    const methodName = propertyKey.toString();
    const code = `${serviceName}.${methodName}`;

    if (!consumerBatchInfos[code]) consumerBatchInfos[code] = [];
    Reflect.defineMetadata(KAFKA_CONSUME_BATCH_METADATA, { topics, groupId, runConfig, conId }, descriptor.value);
    consumerBatchInfos[code].push({ serviceClazz: target.constructor, serviceName, methodName });
  };
}

@Injectable()
export class KafkaBatchConsumerLoader implements OnModuleInit {
  constructor(
    private readonly kafkaService: KafkaService,
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    setTimeout(() => this.init(), 5000);
  }

  private async init() {
    Object.values(consumerBatchInfos)
      .flat()
      .map(({ serviceClazz, methodName }) => {
        const serviceInstance = this.moduleRef.get(serviceClazz, { strict: false });
        const method = serviceInstance[methodName];

        const metadata = this.reflector.get<{
          topics: string | string[];
          groupId: string;
          runConfig: ConsumerRunCfg;
          conId?: string;
        }>(KAFKA_CONSUME_BATCH_METADATA, method);

        if (metadata) {
          const eachBatch = async (payload: KafkaBatchMessage, ...args: any[]) => {
            await method.bind(serviceInstance, payload, ...args);
          };

          this.kafkaService.consumeBatch(
            { topics: toArray(metadata.topics) },
            { groupId: metadata.groupId },
            { ...metadata.runConfig, eachBatch },
            metadata.conId,
          );
        }
      });
  }
}
