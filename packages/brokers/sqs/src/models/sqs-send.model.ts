import { SendMessageCommandInput, SendMessageCommandOutput } from '@aws-sdk/client-sqs';
import { SqsAssertOptions } from './sqs-assert.model';

export interface SqsSendOptions extends Omit<SendMessageCommandInput, 'QueueUrl' | 'MessageBody'>, SqsAssertOptions {}

export interface SqsSendResult extends SendMessageCommandOutput {}
