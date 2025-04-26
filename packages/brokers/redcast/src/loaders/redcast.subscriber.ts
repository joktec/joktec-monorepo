import {
  ConfigService,
  DEFAULT_CON_ID,
  Injectable,
  LogService,
  ModuleRef,
  OnModuleInit,
  Reflector,
} from '@joktec/core';
import { RedcastMessage, RedcastSubscribeDecoratorOptions, SubscriberInfoType } from '../models';
import { RedcastService } from '../redcast.service';

const subscriberInfos: SubscriberInfoType = {};

const REDCAST_SUBSCRIBE_METADATA = 'redcast:subscribe';

export function RedcastSubscribe<T extends (payload: RedcastMessage, ...args: any[]) => any>(
  channel: string,
  options: RedcastSubscribeDecoratorOptions = { useEnv: false },
  conId: string = DEFAULT_CON_ID,
) {
  return function <U extends T>(target: any, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<U>) {
    const serviceName = target.constructor.name;
    const methodName = propertyKey.toString();
    const code = `${serviceName}.${methodName}`;

    if (!subscriberInfos[code]) subscriberInfos[code] = [];
    Reflect.defineMetadata(REDCAST_SUBSCRIBE_METADATA, { channel, options, conId }, descriptor.value);
    subscriberInfos[code].push({ serviceClazz: target.constructor, serviceName, methodName });
  };
}

@Injectable()
export class RedcastSubscriberLoader implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly logService: LogService,
    private readonly redcastService: RedcastService,
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {
    this.logService.setContext(RedcastSubscriberLoader.name);
  }

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
        options: RedcastSubscribeDecoratorOptions;
        conId?: string;
      }>(REDCAST_SUBSCRIBE_METADATA, method);

      if (metadata) {
        const options: RedcastSubscribeDecoratorOptions = metadata.options;

        let channelName = metadata.channel;
        if (options.useEnv) {
          channelName = this.configService.resolveConfigValue(metadata.channel, false);
          if (!channelName) {
            this.logService.warn("`%s` Can't resolve channel name from config: %s", metadata.conId, metadata.channel);
            channelName = metadata.channel;
          }
        }

        const runner = options.pattern
          ? this.redcastService.pSubscribe.bind(this.redcastService)
          : this.redcastService.subscribe.bind(this.redcastService);

        const handler = options.pattern
          ? async (pattern: string, channel: string, message: string) =>
              method.call(serviceInstance, { message, channel, pattern })
          : async (channel: string, message: string) => method.call(serviceInstance, { message, channel });

        await runner(channelName, handler, metadata.conId);
      }
    }
  }
}
