import { DEFAULT_CON_ID, Injectable, ModuleRef, OnModuleInit, Reflector } from '@joktec/core';
import { RedcastConsumeCallback, RedcastConsumeOptions, RedcastMessagePayload, SubscriberInfoType } from '../models';
import { RedcastService } from '../redcast.service';

const consumerInfos: SubscriberInfoType = {};

export const REDCAST_CONSUME_METADATA = 'redcast:consume';

export function RedcastConsume<T extends (payload: RedcastMessagePayload, ...args: any[]) => any>(
  queue: string,
  options: RedcastConsumeOptions = { timeout: 0, reliable: false },
  conId: string = DEFAULT_CON_ID,
) {
  return function <U extends T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<U>) {
    const serviceName = target.constructor.name;
    const methodName = propertyKey.toString();
    const code = `${serviceName}.${methodName}`;

    if (!consumerInfos[code]) consumerInfos[code] = [];
    Reflect.defineMetadata(REDCAST_CONSUME_METADATA, { queue, options, conId }, descriptor.value);
    consumerInfos[code].push({ serviceClazz: target.constructor, serviceName, methodName });
  };
}

@Injectable()
export class RedcastConsumerLoader implements OnModuleInit {
  constructor(
    private readonly redcastService: RedcastService,
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
        options: RedcastConsumeOptions;
        conId?: string;
      }>(REDCAST_CONSUME_METADATA, method);

      if (metadata) {
        const { queue, options, conId } = metadata;
        const cb: RedcastConsumeCallback = async (q: string, msg: string): Promise<void> => {
          const payload: RedcastMessagePayload = { message: msg, queue: q };
          await method.call(serviceInstance, payload);
        };
        await this.redcastService.consume(queue, cb, options, conId);
      }
    }
  }
}
