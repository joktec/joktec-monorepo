import { Message, ReceiveMessageCommandInput } from '@aws-sdk/client-sqs';
import { Clazz } from '@joktec/core';
import { SqsAssertOptions } from './sqs-base.model';

export type ConsumerInfoType = {
  [key: string]: { serviceClazz: Clazz; serviceName: string; methodName: string }[];
};

export interface SqsMessage extends Message {}

export interface SqsConsumeOptions extends Omit<ReceiveMessageCommandInput, 'QueueUrl'>, SqsAssertOptions {
  /**
   * Whether to automatically delete (acknowledge) the message from the queue after successful processing.
   * If `true`, the message will be deleted from SQS once the callback completes without error.
   * If `false`, the message will remain in the queue and must be manually deleted via `deleteMessage`.
   * @default true
   */
  AutoCommit?: boolean;
}

export interface SqsConsumeDecoratorOptions extends SqsConsumeOptions {
  UseEnv?: boolean;
}
