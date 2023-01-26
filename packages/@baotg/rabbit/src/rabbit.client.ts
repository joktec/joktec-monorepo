import { Client } from '@baotg/core';
import { ConfirmChannel, Connection } from 'amqplib';
import { RabbitConfig } from './rabbit.config';
import { RabbitMessage, RabbitConsumeOptions, RabbitPublishOptions } from './models';

export interface RabbitClient extends Client<RabbitConfig, Connection> {
  sendToQueue(queue: string, messages: string[], opts?: RabbitPublishOptions, conId?: string): Promise<void>;

  publish(
    exchange: string,
    messages: { key: string; content: string }[],
    opts?: RabbitPublishOptions,
    conId?: string,
  ): Promise<void>;

  consume(
    queue: string,
    callback: (msg: RabbitMessage) => Promise<void>,
    options: RabbitConsumeOptions,
    conId: string,
  ): Promise<void>;
}

export interface RabbitHook {
  channel?: ConfirmChannel;
  hooks?: ((conId: string) => Promise<void>)[];
}
