import { Clazz } from '@joktec/core';
import { ConsumeMessage } from 'amqplib';
import { Options } from 'amqplib/properties';

export type ConsumerInfoType = {
  [key: string]: { serviceClazz: Clazz; serviceName: string; methodName: string }[];
};

export interface RabbitConsumeOptions extends Options.Consume {
  channelKey?: string;
  autoCommit?: boolean;
  prefetchMessages?: number;
  requeue?: boolean;
}

export interface RabbitConsumeDecoratorOptions extends RabbitConsumeOptions {
  durable?: boolean;
  useEnv?: boolean;
}

export interface RabbitMessage extends ConsumeMessage {}
