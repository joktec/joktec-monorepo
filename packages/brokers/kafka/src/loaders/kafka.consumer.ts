import {
  ConfigService,
  DEFAULT_CON_ID,
  Injectable,
  LogService,
  ModuleRef,
  OnModuleInit,
  Reflector,
} from '@joktec/core';
import { toArray } from '@joktec/utils';
import { KafkaService } from '../kafka.service';
import { ConsumerInfoType, KafkaBatchMessage, KafkaConsumeDecoratorOptions, KafkaEachMessage } from '../models';

const consumerInfos: ConsumerInfoType = {};

export const KAFKA_CONSUME_METADATA = 'kafka:consume';

export function KafkaConsume<T extends (msg: KafkaEachMessage, ...args: any[]) => any>(
  topics: string | string[],
  groupId: string,
  options: KafkaConsumeDecoratorOptions = { useEnv: false, mode: 'each' },
  conId: string = DEFAULT_CON_ID,
) {
  return function <U extends T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<U>) {
    const serviceName = target.constructor.name;
    const methodName = propertyKey.toString();
    const code = `${serviceName}.${methodName}`;

    if (!consumerInfos[code]) consumerInfos[code] = [];
    Reflect.defineMetadata(KAFKA_CONSUME_METADATA, { topics, groupId, options, conId }, descriptor.value);
    consumerInfos[code].push({ serviceClazz: target.constructor, serviceName, methodName });
  };
}

@Injectable()
export class KafkaConsumerLoader implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly logService: LogService,
    private readonly kafkaService: KafkaService,
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {
    this.logService.setContext(KafkaConsumerLoader.name);
  }

  async onModuleInit() {
    setTimeout(() => this.init(), 5000);
  }

  private async init() {
    const infos = Object.values(consumerInfos).flat();
    for (const { serviceClazz, methodName } of infos) {
      const serviceInstance = this.moduleRef.get(serviceClazz, { strict: false });
      const method = serviceInstance[methodName];

      const metadata = this.reflector.get<{
        topics: string | string[];
        groupId: string;
        options: KafkaConsumeDecoratorOptions;
        conId?: string;
      }>(KAFKA_CONSUME_METADATA, method);

      if (metadata) {
        const options: KafkaConsumeDecoratorOptions = metadata.options;

        let topicNames = toArray(metadata.topics);
        if (options.useEnv) {
          const newTopicNames: string[] = [];
          for (const topicKey of toArray(metadata.topics)) {
            const resolveTopic = this.configService.resolveConfigValue(topicKey, false);
            if (!resolveTopic) {
              this.logService.warn("`%s` Can't resolve topic name from config: %s", metadata.conId, topicKey);
              continue;
            }
            newTopicNames.push(resolveTopic);
          }
          topicNames = newTopicNames;
        }

        if (!topicNames.length) {
          this.logService.error("`%s` Topics are empty or can't resolve any topic names", metadata.conId);
          return;
        }

        const runner =
          options.mode === 'batch'
            ? this.kafkaService.consumeBatch.bind(this.kafkaService)
            : this.kafkaService.consume.bind(this.kafkaService);

        const handler =
          options.mode === 'batch'
            ? async (payload: KafkaBatchMessage, ...args: any[]) => method.call(serviceInstance, payload, ...args)
            : async (payload: KafkaEachMessage, ...args: any[]) => method.call(serviceInstance, payload, ...args);

        await runner(topicNames, metadata.groupId, handler, options, metadata.conId);
      }
    }
  }
}
