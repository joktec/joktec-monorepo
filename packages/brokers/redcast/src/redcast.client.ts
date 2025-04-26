import { Client } from '@joktec/core';
import { Redis } from 'ioredis';
import { RedcastConsumeOptions } from './models';
import { RedcastConfig } from './redcast.config';

export class Redcast extends Redis {}

export interface RedcastClient extends Client<RedcastConfig, Redcast> {
  // === Pub/Sub Methods ===

  /**
   * Publishes one or more messages to a channel.
   * All subscribers of the channel will receive the messages.
   * @param channel - The name of the channel to publish to
   * @param messages - An array of string messages
   * @param conId - Optional Redis connection ID
   * @returns Number of subscribers that received the message
   */
  publish(channel: string, messages: string[], conId?: string): Promise<number>;

  /**
   * Subscribes to a channel and receives all published messages.
   * @param channel - Channel to subscribe to
   * @param callback - Callback function to handle each message
   * @param conId - Optional Redis connection ID
   */
  subscribe(
    channel: string,
    callback: (channel: string, message: string) => Promise<void>,
    conId?: string,
  ): Promise<void>;

  /**
   * Unsubscribes from a specific channel.
   * @param channel - Channel to unsubscribe from
   * @param conId - Optional Redis connection ID
   */
  unsubscribe(channel: string, conId?: string): Promise<void>;

  /**
   * Subscribes to channels using a pattern (e.g. news.*).
   * @param pattern - Pattern for channel subscription
   * @param callback - Callback function to handle each message
   * @param conId - Optional Redis connection ID
   */
  pSubscribe(
    pattern: string,
    callback: (pattern: string, channel: string, message: string) => Promise<void>,
    conId?: string,
  ): Promise<void>;

  /**
   * Unsubscribes from a pattern-based subscription.
   * @param pattern - Pattern to unsubscribe
   * @param conId - Optional Redis connection ID
   */
  pUnsubscribe(pattern: string, conId?: string): Promise<void>;

  // === List Queue Methods ===

  /**
   * Pushes one or more messages to a Redis list (as a queue).
   * @param queue - Name of the Redis list
   * @param messages - Array of messages to enqueue
   * @param conId - Optional Redis connection ID
   * @returns Number of messages pushed
   */
  sendToQueue(queue: string, messages: string[], conId?: string): Promise<number>;

  /**
   * Consumes messages from a Redis list (queue).
   * - Uses BRPOP by default.
   * - If `reliable` is true, uses RPOPLPUSH for reliable processing.
   * @param queue - Redis list key
   * @param callback - Function to handle each message
   * @param options - Consumption options
   * @param conId - Optional Redis connection ID
   */
  consume(
    queue: string,
    callback: (queue: string, message: string) => Promise<void>,
    options?: RedcastConsumeOptions,
    conId?: string,
  ): Promise<void>;

  // === Stream Methods ===

  /**
   * Adds one or more messages to a Redis stream.
   * @param queue - Redis stream key
   * @param messages - Messages to add to the stream
   * @param conId - Optional Redis connection ID
   * @returns Number of messages added
   */
  sendToStream(queue: string, messages: string[], conId?: string): Promise<number>;

  /**
   * Consumes messages from a Redis Stream using a consumer group.
   * @param queue - Redis stream key
   * @param callback - Function to process each message
   * @param options - Stream consumption options
   * @param conId - Optional Redis connection ID
   */
  consumeStream(
    queue: string,
    callback: (queue: string, message: string) => Promise<void>,
    options: RedcastConsumeOptions,
    conId?: string,
  ): Promise<void>;

  // === Utility Methods ===

  /**
   * Gracefully shuts down the Redis connection.
   * @param conId - Optional Redis connection ID
   */
  quit(conId?: string): Promise<void>;

  /**
   * Resets the Redis client and clears internal state.
   * @param conId - Optional Redis connection ID
   */
  reset(conId?: string): Promise<void>;
}

export interface RedcastProp {
  publisher: Redcast;
  subscriber: Redcast;
  consumer: Redcast;
}
