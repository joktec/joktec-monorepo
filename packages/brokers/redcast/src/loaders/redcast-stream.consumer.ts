import { DEFAULT_CON_ID, Injectable, ModuleRef, OnModuleInit, Reflector } from '@joktec/core';
import { RedcastConsumeCallback, RedcastMessagePayload, RedcastStreamOptions, SubscriberInfoType } from '../models';
import { RedcastService } from '../redcast.service';

const consumerInfos: SubscriberInfoType = {};

export const REDCAST_STREAM_METADATA = 'redcast:stream';

export function RedcastConsumeStream<T extends (payload: RedcastMessagePayload, ...args: any[]) => any>(
  stream: string,
  options: RedcastStreamOptions = { timeout: 0 },
  conId: string = DEFAULT_CON_ID,
) {
  return function <U extends T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<U>) {
    const serviceName = target.constructor.name;
    const methodName = propertyKey.toString();
    const code = `${serviceName}.${methodName}`;

    if (!consumerInfos[code]) consumerInfos[code] = [];
    Reflect.defineMetadata(REDCAST_STREAM_METADATA, { stream, options, conId }, descriptor.value);
    consumerInfos[code].push({ serviceClazz: target.constructor, serviceName, methodName });
  };
}

@Injectable()
export class RedcastStreamerLoader implements OnModuleInit {
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
        stream: string;
        options: RedcastStreamOptions;
        conId?: string;
      }>(REDCAST_STREAM_METADATA, method);

      if (metadata) {
        const { stream, options, conId } = metadata;
        const cb: RedcastConsumeCallback = async (sKey: string, msg: string): Promise<void> => {
          const payload: RedcastMessagePayload = { message: msg, streamKey: sKey };
          await method.call(serviceInstance, payload);
        };
        await this.redcastService.consumeStream(stream, cb, options, conId);
      }
    }
  }
}
