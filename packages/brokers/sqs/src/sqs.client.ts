import { SQS } from '@aws-sdk/client-sqs';
import { Client } from '@joktec/core';
import { SqsAssertOptions, SqsMessage, SqsConsumeOptions, SqsProduceOptions, SqsProduceResult } from './models';
import { SqsConfig } from './sqs.config';

export interface SqsClient extends Client<SqsConfig, SQS> {
  /**
   * Ensures the SQS queue exists and returns the full queue URL.
   * If the queue does not exist, it will be created with the provided options.
   *
   * @param queue - The name of the SQS queue
   * @param options - Optional configuration for creating the queue (e.g., delay, FIFO, etc.)
   * @param conId - Optional connection ID for multi-connection environments
   * @returns The full queue URL
   */
  assert(queue: string, options?: SqsAssertOptions, conId?: string): Promise<string>;

  /**
   * Sends one or more messages to the specified SQS queue.
   *
   * @param queue - The name of the target SQS queue
   * @param messages - An array of message strings to send
   * @param options - Optional message-level options such as delay, message attributes, etc.
   * @param conId - Optional connection ID for multi-connection environments
   * @returns An array of results for each message sent, including MessageId and metadata
   */
  send(queue: string, messages: string[], options?: SqsProduceOptions, conId?: string): Promise<SqsProduceResult[]>;

  /**
   * Continuously receives and processes messages from the specified SQS queue.
   * Automatically resolves the full queue URL using the queue name.
   * Messages will be deleted from the queue upon successful processing by the callback.
   *
   * @param queue - The name of the SQS queue to consume from
   * @param callback - Async function to handle each message body
   * @param options - Optional polling and visibility options
   * @param conId - Optional connection ID for multi-connection environments
   */
  consume(
    queue: string,
    callback: (message: SqsMessage) => Promise<void>,
    options?: SqsConsumeOptions,
    conId?: string,
  ): Promise<void>;
}
