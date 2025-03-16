import { DEFAULT_CON_ID, Injectable, ModuleRef, OnModuleInit, Reflector, toBool, toInt } from '@joktec/core';
import { ConsumerInfoType, RabbitAssertOptions, RabbitConsumeOptions, RabbitMessage } from '../models';
import { RabbitService } from '../rabbit.service';

const consumerInfos: ConsumerInfoType = {};

export const RABBIT_CONSUME_METADATA = 'rabbit:consume';

export function RabbitConsume<T extends (msg: RabbitMessage, ...args: any[]) => any>(
  queue: string,
  options: RabbitConsumeOptions & { durable?: boolean } = {},
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
    private readonly rabbitService: RabbitService,
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {}

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
        options: RabbitConsumeOptions & { durable?: boolean };
        conId?: string;
      }>(RABBIT_CONSUME_METADATA, method);

      if (metadata) {
        const { queue, options = {}, conId = DEFAULT_CON_ID } = metadata;

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

        const callback = async (msg: RabbitMessage, ...args: any[]) => {
          await method.call(serviceInstance, msg, ...args);
        };

        await this.rabbitService.assert(queue, assertOptions, conId);
        await this.rabbitService.consume(queue, callback, consumeOptions, conId);
      }
    }
  }
}
