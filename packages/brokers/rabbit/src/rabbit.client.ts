import { Client } from '@joktec/core';
import { ChannelModel, ConfirmChannel } from 'amqplib';
import {
  RabbitMessage,
  RabbitConsumeOptions,
  RabbitProduceOptions,
  RabbitProduceResult,
  RabbitPublishOptions,
  RabbitPublishResult,
} from './models';
import { RabbitConfig } from './rabbit.config';

export interface RabbitClient extends Client<RabbitConfig, ChannelModel> {
  /**
   * Sends one or more messages directly to a specified RabbitMQ queue.
   * @param queue - The name of the target queue
   * @param messages - An array of string messages to send
   * @param opts - Optional publish options (e.g., persistent, priority)
   * @param conId - Optional RabbitMQ connection identifier
   * @returns Promise resolving to the result of the send operation
   */
  sendToQueue(
    queue: string,
    messages: string[],
    opts?: RabbitProduceOptions,
    conId?: string,
  ): Promise<RabbitProduceResult>;

  /**
   * Publishes one or more messages to an exchange with a specific routing key.
   * @param exchange - The name of the exchange to publish to
   * @param messages - Array of messages with routing keys and contents
   * @param opts - Optional publish options (e.g., persistent, priority)
   * @param conId - Optional RabbitMQ connection identifier
   * @returns Promise resolving to the result of the publish operation
   */
  publish(
    exchange: string,
    messages: { key: string; content: string }[],
    opts?: RabbitPublishOptions,
    conId?: string,
  ): Promise<RabbitPublishResult>;

  /**
   * Starts consuming messages from a specified queue.
   * Supports auto-acknowledgment or manual acknowledgment based on options.
   * @param queue - The name of the queue to consume from
   * @param callback - Handler function invoked for each received message
   * @param options - Consumer configuration options (e.g., prefetch count, auto-commit)
   * @param conId - Optional RabbitMQ connection identifier
   */
  consume(
    queue: string,
    callback: (msg: RabbitMessage) => Promise<void>,
    options: RabbitConsumeOptions,
    conId: string,
  ): Promise<void>;
}

/**
 * Internal structure for managing RabbitMQ communication channels and related hooks.
 */
export interface RabbitProp {
  /**
   * Active channels mapped by their channel key.
   */
  channels: { [channelKey: string]: ConfirmChannel };

  /**
   * Lifecycle hooks to run after a channel is created or reset, mapped by channel key.
   */
  hooks: { [channelKey: string]: ((channel: ConfirmChannel) => Promise<void>)[] };
}
