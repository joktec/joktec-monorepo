import { RabbitBindingOptions, RabbitExchangeType } from './rabbit.model';

export const RABBIT_AUTO_BINDING = 'RABBIT_AUTO_BINDING';

export interface RabbitAutoBinding {
  queue: string;
  exchangeKey: string;
  routingKey: string;
  channelKey?: string;
  type?: RabbitExchangeType | string;
  opts?: RabbitBindingOptions;
}

export interface RabbitModuleOptions {
  autoBinding?: RabbitAutoBinding[];
  conId?: string;
}

export interface RabbitAutoBindingRegistry {
  [conId: string]: RabbitAutoBinding[];
}
