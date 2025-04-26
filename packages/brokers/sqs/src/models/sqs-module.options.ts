import { SqsBindingOptions } from './sqs-base.model';

export const SQS_AUTO_BINDING = 'SQS_AUTO_BINDING';

export interface SqsAutoBinding {
  queue: string;
  topic: string;
  opts?: SqsBindingOptions;
}

export interface SqsModuleOptions {
  autoBinding?: SqsAutoBinding[];
  conId?: string;
}

export interface SqsAutoBindingRegistry {
  [conId: string]: SqsAutoBinding[];
}
