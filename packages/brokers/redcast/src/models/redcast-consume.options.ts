import { RedcastConsumeCallback } from './redcast.model';

export interface RedcastConsumeOptions {
  /**
   * Timeout for blocking pop operations (e.g. BRPOP, BRPOPLPUSH).
   * Unit: seconds.
   * @default 0 (block indefinitely)
   */
  timeout?: number;

  /**
   * Enable reliable consumption using RPOPLPUSH.
   * @default false (use BRPOP instead)
   */
  reliable?: boolean;

  /**
   * Queue name for failed messages
   * @default ${queue}:dead-letter
   */
  deadLetterQueue?: string;

  /**
   * Time to live for messages in dead letter queue (in seconds)
   * @default 86400 (24 hours)
   */
  deadLetterTTL?: number;

  /**
   * Maximum number of retries for failed message processing
   * @default 3
   */
  maxRetries?: number;

  /**
   * Delay between retries in milliseconds
   * @default 1000
   */
  retryDelay?: number;

  /**
   * Number of messages to process in each batch
   * @default 1
   */
  batchSize?: number;
}

export interface RedcastProcessMessageOptions {
  queue: string;
  callback: RedcastConsumeCallback;
  maxRetries?: number;
  retryDelay?: number;
  deadLetterQueue?: string;
  deadLetterTTL?: number;
  groupId?: string;
  consumerId?: string;
  streamKey?: string;
  messageId?: string;
  autoAck?: boolean;
  maxLength?: number;
}
