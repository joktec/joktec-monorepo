import {
  ConfigService,
  DEFAULT_CON_ID,
  Injectable,
  LogService,
  ModuleRef,
  OnModuleInit,
  Reflector,
} from '@joktec/core';
import { toBool } from '@joktec/utils';
import { ConsumerInfoType, SqsConsumeDecoratorOptions, SqsConsumeOptions, SqsMessage } from '../models';
import { SqsService } from '../sqs.service';

const consumerInfos: ConsumerInfoType = {};

export const SQS_CONSUME_METADATA = 'sqs:consume';

export function SqsConsume<T extends (msg: SqsMessage, ...args: any[]) => any>(
  queue: string,
  options: SqsConsumeDecoratorOptions = {},
  conId: string = DEFAULT_CON_ID,
) {
  return function <U extends T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<U>) {
    const serviceName = target.constructor.name;
    const methodName = propertyKey.toString();
    const code = `${serviceName}.${methodName}`;

    if (!consumerInfos[code]) consumerInfos[code] = [];
    Reflect.defineMetadata(SQS_CONSUME_METADATA, { queue, options, conId }, descriptor.value);
    consumerInfos[code].push({ serviceClazz: target.constructor, serviceName, methodName });
  };
}

@Injectable()
export class SqsConsumerLoader implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly logService: LogService,
    private readonly sqsService: SqsService,
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {
    this.logService.setContext(SqsConsumerLoader.name);
  }

  async onModuleInit() {
    setTimeout(() => this.init(), 5000);
  }

  async init() {
    const infos = Object.values(consumerInfos).flat();
    for (const { serviceClazz, methodName } of infos) {
      const serviceInstance = this.moduleRef.get(serviceClazz, { strict: false });
      const method = serviceInstance[methodName];

      const metadata = this.reflector.get<{
        queue: string;
        options: SqsConsumeDecoratorOptions;
        conId?: string;
      }>(SQS_CONSUME_METADATA, method);

      if (metadata) {
        const { options = {}, conId = DEFAULT_CON_ID } = metadata;

        let queueName = metadata.queue;
        if (options?.UseEnv) {
          queueName = this.configService.resolveConfigValue(metadata.queue);
        }

        const consumeOptions: SqsConsumeOptions = { ...options, AutoCommit: toBool(options.AutoCommit, true) };
        const callback = async (msg: SqsMessage, ...args: any[]) => {
          await method.call(serviceInstance, msg, ...args);
        };
        await this.sqsService.consume(queueName, callback, consumeOptions, conId);
      }
    }
  }
}
