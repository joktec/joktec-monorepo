import { Client } from '@joktec/core';
import { Consumer, Kafka, Message, Producer } from 'kafkajs';
import { KafkaConfig } from './kafka.config';
import {
  KafkaBatchMessage,
  KafkaConsumeOptions,
  KafkaEachMessage,
  KafkaProduceBatch,
  KafkaProduceBatchOptions,
  KafkaProducerOptions,
} from './models';

export interface KafkaClient extends Client<KafkaConfig, Kafka> {
  /**
   * Subscribes to one or more topics and consumes incoming messages individually (each message handler).
   * @param topics - List of topic names or RegExp patterns to subscribe to.
   * @param groupId - Consumer group ID.
   * @param callback - Function to handle each received message.
   * @param options - Optional consumer configurations.
   * @param conId - Optional Kafka connection ID (default: DEFAULT_CON_ID).
   */
  consume(
    topics: (string | RegExp)[],
    groupId: string,
    callback: (payload: KafkaEachMessage) => Promise<void>,
    options?: KafkaConsumeOptions,
    conId?: string,
  ): Promise<void>;

  /**
   * Subscribes to one or more topics and consumes incoming messages in batches (batch message handler).
   * @param topics - List of topic names or RegExp patterns to subscribe to.
   * @param groupId - Consumer group ID.
   * @param callback - Function to handle each received batch of messages.
   * @param options - Optional consumer configurations.
   * @param conId - Optional Kafka connection ID (default: DEFAULT_CON_ID).
   */
  consumeBatch(
    topics: (string | RegExp)[],
    groupId: string,
    callback: (payload: KafkaBatchMessage) => Promise<void>,
    options?: KafkaConsumeOptions,
    conId?: string,
  ): Promise<void>;

  /**
   * Sends multiple messages to a single topic.
   * @param topic - Target topic name.
   * @param messages - List of messages to send.
   * @param options - Optional producer configurations.
   * @param conId - Optional Kafka connection ID (default: DEFAULT_CON_ID).
   */
  send(
    topic: string,
    messages: (string | Buffer | Message)[],
    options?: KafkaProducerOptions,
    conId?: string,
  ): Promise<void>;

  /**
   * Sends batches of messages to multiple topics.
   * @param batch - Batch payload including multiple topic/messages.
   * @param options - Optional batch producer configurations.
   * @param conId - Optional Kafka connection ID (default: DEFAULT_CON_ID).
   */
  sendBatch(batch: KafkaProduceBatch, options: KafkaProduceBatchOptions, conId?: string): Promise<void>;
}

/**
 * Kafka internal properties used for managing producers and consumers.
 */
export interface KafkaProp {
  /**
   * Registered producer instances, keyed by producerKey.
   */
  producers: { [producerKey: string]: Producer };

  /**
   * Registered consumer instances, keyed by groupId.
   */
  consumers: { [groupId: string]: Consumer };
}
