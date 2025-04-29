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

  /**
   * Name of the consumer group. Required when using XREADGROUP.
   * Use with mode `stream`
   */
  groupId?: string;

  /**
   * Unique consumer ID within the group.
   * Use with mode `stream`
   */
  consumerId?: string;

  /**
   * Whether to automatically acknowledge (XACK) after processing.
   * Use with mode `stream`
   * @default true
   */
  autoAck?: boolean;
}

export interface RedcastConsumeDecoratorOptions extends RedcastConsumeOptions {
  useEnv?: boolean;
  mode?: 'list' | 'stream';
}

export interface RedcastProcessMessageOptions {
  queue: string;
  callback: (queue: string, message: string) => Promise<void>;
  maxRetries?: number;
  retryDelay?: number;
  groupId?: string;
  consumerId?: string;
  messageId?: string;
  autoAck?: boolean;
  conId?: string;
  deadLetterQueue?: string;
  deadLetterTTL?: number;
}
