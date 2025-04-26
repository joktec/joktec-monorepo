import {
  ConfigService,
  DEFAULT_CON_ID,
  Injectable,
  LogService,
  ModuleRef,
  OnModuleInit,
  Reflector,
} from '@joktec/core';
import { toBool, toInt } from '@joktec/utils';
import {
  ConsumerInfoType,
  RabbitAssertOptions,
  RabbitConsumeDecoratorOptions,
  RabbitConsumeOptions,
  RabbitMessage,
} from '../models';
import { RabbitService } from '../rabbit.service';

const consumerInfos: ConsumerInfoType = {};

export const RABBIT_CONSUME_METADATA = 'rabbit:consume';

export function RabbitConsume<T extends (msg: RabbitMessage, ...args: any[]) => any>(
  queue: string,
  options: RabbitConsumeDecoratorOptions = { useEnv: false },
  conId: string = DEFAULT_CON_ID,
) {
  return function <U extends T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<U>) {
    const serviceName = target.constructor.name;
    const methodName = propertyKey.toString();
    const code = `${serviceName}.${methodName}`;

    if (!consumerInfos[code]) consumerInfos[code] = [];
    Reflect.defineMetadata(RABBIT_CONSUME_METADATA, { queue, options, conId }, descriptor.value);
    consumerInfos[code].push({ serviceClazz: target.constructor, serviceName, methodName });
  };
}

@Injectable()
export class RabbitConsumerLoader implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly logService: LogService,
    private readonly rabbitService: RabbitService,
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {
    this.logService.setContext(RabbitConsumerLoader.name);
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
        options: RabbitConsumeDecoratorOptions;
        conId?: string;
      }>(RABBIT_CONSUME_METADATA, method);

      if (metadata) {
        const options: RabbitConsumeDecoratorOptions = metadata.options;

        let queueName = metadata.queue;
        if (options.useEnv) {
          queueName = this.configService.resolveConfigValue(metadata.queue, false);
          if (!queueName) {
            this.logService.warn("`%s` Can't resolve queue name from config: %s", metadata.conId, metadata.queue);
            queueName = metadata.queue;
          }
        }

        const assertOptions: RabbitAssertOptions = {
          channelKey: options.channelKey,
          durable: toBool(options.durable, true),
        };

        const consumeOptions: RabbitConsumeOptions = {
          ...options,
          autoCommit: toBool(options.autoCommit, true),
          prefetchMessages: toInt(options.prefetchMessages, 1),
          requeue: toBool(options.requeue, true),
        };

        const callback = async (msg: RabbitMessage, ...args: any[]) => method.call(serviceInstance, msg, ...args);
        await this.rabbitService.assert(queueName, assertOptions, metadata.conId);
        await this.rabbitService.consume(queueName, callback, consumeOptions, metadata.conId);
      }
    }
  }
}
