import { PublishCommandInput, PublishCommandOutput } from '@aws-sdk/client-sns';
import { SqsAssertTopicOptions } from './sqs-base.model';

export interface SnsPublishOptions extends SqsAssertTopicOptions, Omit<PublishCommandInput, 'TopicArn' | 'Message'> {}

export interface SnsPublishDecoratorOptions extends SnsPublishOptions {
  UseEnv?: boolean;
}

export interface SnsPublishResult extends PublishCommandOutput {}
