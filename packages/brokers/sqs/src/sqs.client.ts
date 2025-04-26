import { SNS } from '@aws-sdk/client-sns';
import { SQS } from '@aws-sdk/client-sqs';
import { Client } from '@joktec/core';
import {
  SnsPublishOptions,
  SnsPublishResult,
  SqsAssertOptions,
  SqsAssertTopicOptions,
  SqsBindingOptions,
  SqsConsumeOptions,
  SqsMessage,
  SqsProduceOptions,
  SqsProduceResult,
} from './models';
import { SqsConfig } from './sqs.config';

export interface SqsInstance {
  dispatcher: SQS;
  broadcaster: SNS;
}

export interface SqsClient extends Client<SqsConfig, SqsInstance> {
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
   * Ensures the SNS topic exists and returns the full topic ARN.
   * If the topic does not exist, it will be created automatically.
   *
   * @param topic - The name of the SNS topic
   * @param options - Optional configuration for creating the topic
   * @param conId - Optional connection ID
   * @returns The full TopicArn
   */
  assertTopic(topic: string, options?: SqsAssertTopicOptions, conId?: string): Promise<string>;

  /**
   * Sends one or more messages to the specified SQS queue.
   *
   * @param queue - The name of the target SQS queue
   * @param messages - An array of message strings to send
   * @param options - Optional message-level options such as delay, message attributes, etc.
   * @param conId - Optional connection ID for multi-connection environments
   * @returns An array of results for each message sent, including MessageId and metadata
   */
  sendToQueue(
    queue: string,
    messages: string[],
    options?: SqsProduceOptions,
    conId?: string,
  ): Promise<SqsProduceResult[]>;

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

  /**
   * Publishes one or more messages to the specified SNS topic.
   * Supports optional message attributes.
   *
   * @param topic - The name of the SNS topic
   * @param messages - Array of messages to publish
   * @param options - Optional publish options (e.g., message attributes, subject, etc.)
   * @param conId - Optional connection ID
   * @returns An array of results for each publish operation
   */
  publish(topic: string, messages: string[], options?: SnsPublishOptions, conId?: string): Promise<SnsPublishResult[]>;

  /**
   * Binds an SQS queue to an SNS topic.
   * Automatically subscribes the queue to receive messages from the topic.
   */
  bindQueueToTopic(topic: string, queue: string, options?: SqsBindingOptions, conId?: string): Promise<string>;
}
