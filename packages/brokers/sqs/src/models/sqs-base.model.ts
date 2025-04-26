import { CreateTopicCommandInput } from '@aws-sdk/client-sns';
import { GetQueueUrlCommandInput } from '@aws-sdk/client-sqs';

export interface SqsAssertOptions extends Omit<GetQueueUrlCommandInput, 'QueueName'> {}

export interface SqsAssertTopicOptions extends Omit<CreateTopicCommandInput, 'Name'> {}

export interface SqsBindingOptions {
  assert?: SqsAssertOptions;
  assertTopic?: SqsAssertTopicOptions;
}
