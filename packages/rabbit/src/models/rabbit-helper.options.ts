import amqp, { Options } from 'amqplib';

export interface RabbitBaseOptions {
  channelKey?: string;
}

export interface RabbitRejectOptions {
  channelKey?: string;
  requeue?: boolean;
}

export interface RabbitAssertOptions extends Options.AssertQueue {
  channelKey?: string;
  requeue?: boolean;
}

export type RabbitAssertQueue = amqp.Replies.AssertQueue;

export interface RabbitAssertExchangeOptions extends Options.AssertExchange {
  channelKey?: string;
  requeue?: boolean;
}

export interface RabbitBindingOptions {
  channelKey?: string;
  queueOptions?: RabbitAssertOptions;
  exchangeOptions?: RabbitAssertExchangeOptions;
}

export type RabbitAssertExchange = amqp.Replies.AssertExchange;

export type RabbitPurgeQueue = amqp.Replies.PurgeQueue;

export type RabbitEmpty = amqp.Replies.Empty;
