import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { MicroTransport } from '../micro/micro.config';
import { toArray, toBool } from '../../utils';
import mergeDeep from 'merge-deep';
import { camelCase, snakeCase, upperFirst } from 'lodash';

export interface RegisterProxy {
  transport?: MicroTransport;
  name?: string;
  rabbitUrls?: string | string[];
  rabbitQueue?: string;
  rabbitDurable?: boolean;
}

export class ProxyConfig implements RegisterProxy {
  providers?: string[];
  name?: string;
  transport?: MicroTransport;
  rabbitUrls?: string | string[];
  rabbitDurable?: boolean;
  customProviders?: { [key: string]: RegisterProxy };
  registerProviders?: { [key: string]: RegisterProxy };

  constructor(props: ProxyConfig) {
    Object.assign(this, {
      ...props,
      providers: toArray<string>(props.providers),
      rabbitUrls: toArray<string>(props.rabbitUrls),
      rabbitDurable: toBool(props.rabbitDurable, false),
      customProviders: { ...props.customProviders },
      registerProviders: {},
    });
    this.initProviders();
  }

  private initProviders(): { [key: string]: RegisterProxy } {
    if (this.registerProviders.length) {
      return this.registerProviders;
    }

    const autoProviders = this.providers.reduce((obj, key) => {
      obj[key] = {
        transport: MicroTransport.RMQ,
        name: `Jobhopin.${upperFirst(camelCase(key))}Microservice`,
        rabbitUrls: toArray<string>(this.rabbitUrls),
        rabbitQueue: `${snakeCase(key)}_queue`,
        rabbitDurable: toBool(this.rabbitDurable, false),
      } as RegisterProxy;
      return obj;
    }, {});

    const customProviders = Object.keys(this.customProviders || {}).reduce((obj, key: string) => {
      obj[key] = {
        transport: MicroTransport.RMQ,
        name: this.customProviders[key].name || `Jobhopin.${upperFirst(camelCase(key))}Microservice`,
        rabbitUrls: toArray<string>(this.customProviders[key].rabbitUrls || this.rabbitUrls),
        rabbitQueue: this.customProviders[key].rabbitQueue || `${snakeCase(key)}_queue`,
        rabbitDurable: toBool(this.customProviders[key].rabbitDurable ?? this.rabbitDurable, false),
      } as RegisterProxy;
      return obj;
    }, {});

    return (this.registerProviders = mergeDeep(autoProviders, customProviders));
  }

  public getProviders(...services: string[]): ClientProviderOptions[] {
    return Object.keys(this.registerProviders)
      .filter(key => !services.length || services.includes(key))
      .map<ClientProviderOptions>(key => {
        return {
          name: this.registerProviders[key].name,
          transport: Transport.RMQ,
          options: {
            urls: toArray<string>(this.registerProviders[key]?.rabbitUrls),
            queue: this.registerProviders[key].rabbitQueue,
            queueOptions: {
              durable: this.registerProviders[key].rabbitDurable,
            },
          },
        };
      });
  }
}
