import { DEFAULT_CON_ID, Injectable, ModuleRef, OnModuleInit, Reflector } from '@joktec/core';
import { PSubscribeCallback, RedcastSubscribeOptions, SubscribeCallback, SubscriberInfoType } from '../models';
import { RedcastService } from '../redcast.service';

const subscriberInfos: SubscriberInfoType = {};

export const REDCAST_CONSUME_METADATA = 'redcast:subscribe';

export function RedcastSubscribe<T extends (msg: string, ...args: any[]) => any>(
  channel: string,
  options: RedcastSubscribeOptions = {},
  conId: string = DEFAULT_CON_ID,
) {
  return function <U extends T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<U>) {
    const serviceName = target.constructor.name;
    const methodName = propertyKey.toString();
    const code = `${serviceName}.${methodName}`;

    if (!subscriberInfos[code]) subscriberInfos[code] = [];
    Reflect.defineMetadata(REDCAST_CONSUME_METADATA, { channel, options, conId }, descriptor.value);
    subscriberInfos[code].push({ serviceClazz: target.constructor, serviceName, methodName });
  };
}

@Injectable()
export class RedcastSubscriberLoader implements OnModuleInit {
  constructor(
    private readonly redcastService: RedcastService,
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {}

  async onModuleInit() {
    setTimeout(() => this.init(), 5000);
  }

  async init() {
    const infos = Object.values(subscriberInfos).flat();
    for (const { serviceClazz, methodName } of infos) {
      const serviceInstance = this.moduleRef.get(serviceClazz, { strict: false });
      const method = serviceInstance[methodName];

      const metadata = this.reflector.get<{
        channel: string;
        options: RedcastSubscribeOptions;
        conId?: string;
      }>(REDCAST_CONSUME_METADATA, method);

      if (metadata) {
        const { channel, options = {}, conId = DEFAULT_CON_ID } = metadata;
        if (options.pattern) {
          const cb: PSubscribeCallback = async (pattern: string, channel: string, message: string): Promise<void> => {
            await method.call(serviceInstance, pattern, channel, message);
          };
          await this.redcastService.pSubscribe(channel, cb, conId);
          return;
        }

        const cb: SubscribeCallback = async (channel: string, message: string): Promise<void> => {
          await method.call(serviceInstance, channel, message);
        };
        await this.redcastService.subscribe(channel, cb, conId);
      }
    }
  }
}
