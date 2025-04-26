import {
  ConfigService,
  DEFAULT_CON_ID,
  Injectable,
  LogService,
  ModuleRef,
  OnModuleInit,
  Reflector,
} from '@joktec/core';
import { RedcastConsumeDecoratorOptions, RedcastMessage, SubscriberInfoType } from '../models';
import { RedcastService } from '../redcast.service';

const consumerInfos: SubscriberInfoType = {};

const REDCAST_CONSUME_METADATA = 'redcast:consume';

export function RedcastConsume<T extends (payload: RedcastMessage, ...args: any[]) => any>(
  queue: string,
  options: RedcastConsumeDecoratorOptions = { timeout: 0, reliable: false, useEnv: false, mode: 'list' },
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
    private readonly configService: ConfigService,
    private readonly logService: LogService,
    private readonly redcastService: RedcastService,
    private readonly reflector: Reflector,
    private readonly moduleRef: ModuleRef,
  ) {
    this.logService.info(RedcastConsumerLoader.name);
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
        options: RedcastConsumeDecoratorOptions;
        conId?: string;
      }>(REDCAST_CONSUME_METADATA, method);

      if (metadata) {
        const options: RedcastConsumeDecoratorOptions = metadata.options;

        let queueName = metadata.queue;
        if (options.useEnv) {
          queueName = this.configService.resolveConfigValue(metadata.queue, false);
          if (!queueName) {
            this.logService.warn("`%s` Can't resolve queue name from config: %s", metadata.conId, metadata.queue);
            queueName = metadata.queue;
          }
        }

        const runner =
          options.mode === 'stream'
            ? this.redcastService.consumeStream.bind(this.redcastService)
            : this.redcastService.consume.bind(this.redcastService);
        const cb = async (queue: string, message: string) => method.call(serviceInstance, { message, queue });
        await runner(queueName, cb, options, metadata.conId);
      }
    }
  }
}
