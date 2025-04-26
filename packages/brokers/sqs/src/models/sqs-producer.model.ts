import { SendMessageCommandInput, SendMessageCommandOutput } from '@aws-sdk/client-sqs';
import { SqsAssertOptions } from './sqs-base.model';

export interface SqsProduceOptions
  extends SqsAssertOptions,
    Omit<SendMessageCommandInput, 'QueueUrl' | 'MessageBody'> {}

export interface SqsProduceResult extends SendMessageCommandOutput {}

export interface SqsProduceDecoratorOptions extends SqsProduceOptions {
  UseEnv?: boolean;
}
