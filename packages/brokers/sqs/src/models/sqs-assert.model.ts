import { GetQueueUrlCommandInput } from '@aws-sdk/client-sqs';

export interface SqsAssertOptions extends Omit<GetQueueUrlCommandInput, 'QueueName'> {}
