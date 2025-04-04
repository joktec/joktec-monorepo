export interface RedcastStreamOptions {
  /**
   * Name of the consumer group. Required when using XREADGROUP.
   */
  groupId?: string;

  /**
   * Unique consumer ID within the group.
   */
  consumerId?: string;

  /**
   * Whether to automatically acknowledge (XACK) after processing.
   * @default true
   */
  autoAck?: boolean;

  /**
   * Blocking timeout in milliseconds. Use 0 to block indefinitely.
   * @default 0
   */
  timeout?: number;

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
   * Queue name for failed messages
   * @default ${stream}:dead-letter
   */
  deadLetterQueue?: string;

  /**
   * Time to live for messages in dead letter queue (in seconds)
   * @default 86400 (24 hours)
   */
  deadLetterTTL?: number;

  /**
   * Number of messages to process in each batch
   * @default 1
   */
  batchSize?: number;

  /**
   *
   */
  maxLength?: number;
}
