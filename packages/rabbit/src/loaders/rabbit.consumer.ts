import { DEFAULT_CON_ID, Injectable, OnModuleInit, Reflector } from '@joktec/core';
import { Type } from '@nestjs/common';
import { RabbitConsumeOptions, RabbitMessage } from '../models';
import { RabbitService } from '../rabbit.service';

export const RABBIT_CONSUME_METADATA = 'rabbit:consume';

export function RabbitConsume<T extends (msg: RabbitMessage, ...args: any[]) => any>(
  queue: string,
  options: RabbitConsumeOptions = {},
  conId: string = DEFAULT_CON_ID,
) {
  return function <U extends T>(target: any, key: string, descriptor: TypedPropertyDescriptor<U>) {
    Reflect.defineMetadata(RABBIT_CONSUME_METADATA, { queue, options, conId }, descriptor.value);
  };
}

@Injectable()
export class RabbitConsumerLoader implements OnModuleInit {
  constructor(
    private readonly rabbitService: RabbitService,
    private readonly reflector: Reflector,
  ) {}

  async onModuleInit() {
    const providers = Reflect.getMetadataKeys(global) || [];
    providers.forEach((provider: Type<any>) => {
      const instance = global[provider.name] as any;
      if (!instance) return;

      const prototype = Object.getPrototypeOf(instance);
      const methods = Object.getOwnPropertyNames(prototype);

      methods.forEach(methodName => {
        const method = instance[methodName];
        const metadata = this.reflector.get<{
          queue: string;
          options: RabbitConsumeOptions;
          conId?: string;
        }>(RABBIT_CONSUME_METADATA, method);

        if (metadata) {
          this.rabbitService.consume(metadata.queue, method.bind(instance), metadata.options, metadata.conId);
        }
      });
    });
  }
}
